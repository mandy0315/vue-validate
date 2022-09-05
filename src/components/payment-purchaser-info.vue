<template>
  <div class="py-10">
    <validation-form-item v-slot="{ errorMsg, isRequired }" type="purchaser" class="py-2 block">
      <div class="flex items-center">
        <p class="w-18"><span v-if="isRequired" class="mx-1 text-red-500">*</span>姓名</p>
        <input v-model="purchaserFill" type="text" class="flex-grow bg-gray-100 p-2" placeholder="請輸入姓名" />
      </div>
      <p v-if="errorMsg" class="text-red-500">* {{ errorMsg }}</p>
    </validation-form-item>

    <validation-form-item v-slot="{ errorMsg, isRequired }" type="mobilePhone" class="py-2 block">
      <div class="flex items-center">
        <p class="w-18"><span v-if="isRequired" class="mx-1 text-red-500">*</span>手機</p>
        <input v-model="mobilePhoneFill" type="tel" class="flex-grow bg-gray-100 p-2" placeholder="請輸入手機" />
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

    // 姓名
    const purchaserFill = computed({
      get: () => $paymentStore.paymentDataSet.purchaser,
      set: (val) => {
        $paymentStore.updatePaymentDataSet("purchaser", val);
      },
    });

    // 手機
    const mobilePhoneFill = computed({
      get: () => $paymentStore.paymentDataSet.mobilePhone,
      set: (val) => {
        $paymentStore.updatePaymentDataSet("mobilePhone", val);
      },
    });
    return {
      purchaserFill,
      mobilePhoneFill,
    };
  },
};
</script>
