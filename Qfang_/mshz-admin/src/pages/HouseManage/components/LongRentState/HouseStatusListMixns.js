// 用于长租房态 整租、合租 列表的公用方法。
export const HouseListHandle = {
  data() {
    return {
      areaList: [],
      orgProps: {
        // 'id'
        value: 'name',
        label: 'name',
        children: 'children'
      },
      areaOption: [],
      closeBillData: {
        billModels: []
      },
      closeBill: false // 关闭账单
    };
  },
  methods: {
    // 收款
    handleReceipt(data) {
      this.orderNo = data.orderId;
      this.rentBillDialog = true;
    },

    // 催款
    handleRental(data) {
      // v1.12.0 之前 /security/longOrder/billRent
      this.orderNo = data.orderId;
      this.$axios.get('/security/longOrder/billRentByOrder', {
        params: {
          orderNo: this.orderNo
          // type: 2
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialog = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    // 退房
    handleCheckout(data) {
      // LONG_REFUND_BILL_CLOSE 关闭账单权限
      // 有未支付的生活账单或租金账单
      if (data.existBill || data.existExtraBill) {
        // 是否有权限
        if (this.checkPermission('LONG_REFUND_BILL_CLOSE')) {
          this.handleCheckPurviewBill(data.orderId, data.contractId);
        } else {
          this.$message('该租客有未支付账单待关闭，您没有该操作权限哦~');
        }
      } else {
        this.closeBill = false;
        this.ckeckoutDialog = true;
        this.orderNo = data.orderId;
      }
      // this.ckeckoutDialog = true;
      // this.orderNo = data.orderId;
    },

    // 续签
    handleRenew(data) {
      this.contractId = data.contractId;
      this.AddContDialog = true;
      this.DialogType = 'Renew';
    },

    getChange(data) {
      this.AddContDialog = data;
    },

    closeDialogCheckout(data) {
      this.ckeckoutDialog = false;
      (data === 'refresh') && this.requestData();
    },

    // closeDialog(data) {
    //   if (data === 'LongRentBill') {
    //     this.rentBillDialog = false;
    //   } else if (data === 'MeterReading') {
    //     this.meterDialog = false;
    //   } else if (data === 'speedrental') {
    //     this.rentalDialog = false;
    //   }
    // },

    closeDialog(data) {
      switch (data) {
        case 'LongRentBill':
          this.rentBillDialog = false;
          break;
        case 'MeterReading':
          this.meterDialog = false;
          break;
        case 'speedrental':
          this.rentalDialog = false;
          break;
        case 'ReserveHouse':
          this.reserveDialog = false;
          break;
        default:
          break;
      }
    },

    //  选择价格
    priceChange(val) {
      switch (val) {
        case 'none':
          this.onPrice = undefined;
          this.offPrice = undefined;
          break;
        case 'one':
          this.onPrice = undefined;
          this.offPrice = 1500;
          break;
        case 'two':
          // this.onPrice = 1500;
          // this.offPrice = 2500;

          this.onPrice = 2500;
          this.offPrice = 1500;
          break;
        case 'three':
          // this.onPrice = 2500;
          // this.offPrice = 3500;

          this.onPrice = 3500;
          this.offPrice = 2500;
          break;
        case 'four':
          // this.onPrice = 3500;
          // this.offPrice = 5000;

          this.onPrice = 5000;
          this.offPrice = 3500;
          break;
        case 'five':
          this.onPrice = 5000;
          this.offPrice = undefined;
          break;
        default:
          this.onPrice = undefined;
          this.offPrice = undefined;
      }
    },

    // 请求筛选区域片区数据
    requestAreaList(val) {
      this.$axios.get(
        '/security/roomStatus/contract/queryArea',
        {
          params: {
            city: val
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.areaList = res.data.result;
        } else {
          this.$message.warning('区域信息：' + res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 待关闭账单信息-通过订单号
    handleCheckPurviewBill(orderNo, contractNo) {
      this.$axios.get('/security/refundlease/queryAndCheckPurviewBill', {
        params: {
          orderNo: orderNo,
          contractNo: contractNo
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.closeBillData = res.data.result;
          this.closeBill = true;
          this.ckeckoutDialog = true;
          this.orderNo = orderNo;
        } else {
          this.$message.error(`查询未支付账单:${res.data.message}`);
        }
      }).catch(err => {
        console.log(err);
      });
    }

  }
};
