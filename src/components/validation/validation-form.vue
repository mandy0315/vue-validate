<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import { provide, computed } from "vue";
export default {
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    errorMsgs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    provide("rules", props.rules);
    provide("model", props.model);
    provide("errorMsgs", props.errorMsgs);

    const errorMsgs = computed(() => props.errorMsgs);

    const validate = async (key, val) => {
      let res = {
        isError: false,
        errorMsg: "",
      };

      // 必填
      const filterIsRequired = props.rules[key].filter((rule) => Reflect.has(rule, "required"));
      if (filterIsRequired.length > 0) {
        if (!val) {
          res.isError = true;
          res.errorMsg = filterIsRequired[0]?.errorMsg;
          return res;
        }
      }

      // 驗證
      const filterIsValidate = props.rules[key].filter((rule) => Reflect.has(rule, "validate"));
      if (filterIsValidate.length > 0) {
        const checkresult = await filterIsValidate[0]?.validate(val);
        if (!checkresult) {
          res.isError = true;
          res.errorMsg = filterIsValidate[0]?.errorMsg;
          return res;
        }
      }

      return res;
    };

    // 檢查全部驗證
    const allValidate = () => {
      const rules = props.rules;

      return new Promise((resolve) => {
        let isError = false;
        let count = 0;

        Object.keys(rules).forEach(async (key) => {
          const res = await validate(key, props.model[key]);
          res.errorMsg ? (errorMsgs.value[key] = res.errorMsg) : delete errorMsgs.value[key];

          if (++count === Object.keys(rules).length) {
            isError = Object.keys(errorMsgs.value).length > 0;
            resolve(isError);
          }
        });
      });
    };

    return { allValidate };
  },
};
</script>
