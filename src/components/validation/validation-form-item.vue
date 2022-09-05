<template>
  <label>
    <slot :is-required="isRequired" :error-msg="errorMsg"></slot>
  </label>
</template>

<script>
import { ref, inject, computed, watch } from "vue";
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  setup(prop) {
    const isRequired = ref(true);

    const rules = inject("rules");
    const model = inject("model");
    const errorMsgs = inject("errorMsgs");

    const errorMsg = computed(() => errorMsgs[prop.type] || "");
    const getRule = computed(() => rules[prop.type] || []);
    const getValue = computed(() => model[prop.type] || null);

    const checkIsRequired = () => {
      if (getRule.value.length) {
        getRule.value.every((rule) => {
          isRequired.value = rule.required;
        });
      }
    };
    checkIsRequired();

    const validate = async (key, val) => {
      let res = {
        isError: false,
        errorMsg: "",
      };

      // 必填
      const filterIsRequired = rules[key].filter((rule) => Reflect.has(rule, "required"));
      if (filterIsRequired.length > 0) {
        if (!val) {
          res.isError = true;
          res.errorMsg = filterIsRequired[0]?.errorMsg;
          return res;
        }
      }

      // 驗證
      const filterIsValidate = rules[key].filter((rule) => Reflect.has(rule, "validate"));
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

    watch(
      () => getValue.value,
      async (val) => {
        const res = await validate(prop.type, val);
        res.errorMsg ? (errorMsgs[prop.type] = res.errorMsg) : delete errorMsgs[prop.type];
      },
      { deep: true },
    );

    return {
      isRequired,
      errorMsg,
    };
  },
};
</script>
