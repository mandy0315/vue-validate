import { defineStore } from "pinia";

// 發票、訂單、金流相關
export default defineStore("paymentStore", {
  state: () => {
    return {
      availablePackages: [],
      businessInvoiceList: {
        company: null, // 公司用-公司名稱
        corpId: null, // 公司用-統一編號
      },
      paymentDataSet: {
        // 姓名
        purchaser: null,
        // 手機
        mobilePhone: null,
        // 捐贈發票
        donateCode: null,
      },
      verifyErrorMsg: {},
    };
  },
  getters: {},
  actions: {
    async updatePaymentDataSet(key, val) {
      const $store = this;

      // 更新欄位
      $store.paymentDataSet[key] = val;
    },
  },
});
