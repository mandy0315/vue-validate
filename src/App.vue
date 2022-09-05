<template>
  <validation-form
    ref="form"
    class="mx-auto max-w-560px"
    :model="paymentDataSet"
    :rules="validateRules"
    :error-msgs="errorMsgs"
  >
    <payment-purchaser-info />
    <payment-invoice-donation />

    <button class="rounded bg-orange-500 text-white p-2" @click.prevent="handleSubmit">送出</button>
  </validation-form>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { usePaymentStore } from "/src/store";
import request from "/src/utils/request";

export default {
  setup() {
    const form = ref(null);
    const paymentStore = usePaymentStore();

    // 驗證帶入資料
    const errorMsgs = reactive({});
    const paymentDataSet = computed(() => paymentStore.paymentDataSet);
    const validateRules = {
      purchaser: [{ required: true, errorMsg: "請填寫姓名" }],
      mobilePhone: [
        { required: true, errorMsg: "請輸入手機" },
        { validate: (val) => /^(09)[0-9]{8}$/.test(val), errorMsg: "請輸入有效手機格式" },
      ],
      donateCode: [
        { required: true, errorMsg: "請輸入捐贈碼" },
        {
          validate: async (val) => {
            const res = await request({
              method: "get",
              url: `/api/ws/Invoice/donationCode/${val}/Validator`,
            });

            return res.data?.data?.isExist;
          },
          errorMsg: "請輸入有效捐贈碼",
        },
      ],
    };

    // 送出
    const handleSubmit = async () => {
      const isError = await form.value.checkAllError();
      console.log(isError);
    };
    return {
      paymentDataSet,
      validateRules,
      errorMsgs,
      handleSubmit,
      form,
    };
  },
};
</script>
