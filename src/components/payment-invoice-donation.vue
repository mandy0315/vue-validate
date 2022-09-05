<template>
  <div class="py-10">
    <validation-form-item v-slot="{ errorMsg, isRequired }" type="donateCode" class="py-2 block">
      <div class="flex items-center">
        <p class="w-18"><span v-if="isRequired" class="mx-1 text-red-500">*</span>捐贈碼</p>

        <input v-model="donateCodeFill" type="text" class="flex-grow bg-gray-100 p-2" placeholder="請輸入捐贈碼" />
      </div>
      <p v-if="errorMsg" class="text-red-500">* {{ errorMsg }}</p>
    </validation-form-item>
  </div>
</template>

<script>
import { computed } from "vue";
import { usePaymentStore } from "/src/store";

export default {
  setup() {
    const $paymentStore = usePaymentStore();

    // 捐贈碼
    const donateCodeFill = computed({
      get: () => $paymentStore.paymentDataSet.donateCode,
      set: (val) => {
        $paymentStore.updatePaymentDataSet("donateCode", val);
      },
    });
    return {
      donateCodeFill,
    };
  },
};
</script>
