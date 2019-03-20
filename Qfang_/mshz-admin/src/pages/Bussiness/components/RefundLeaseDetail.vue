<template>
  <section>
    <section class="dialog-box">
      <div class="info-box">
        <div class="info-title">
          房间信息
        </div>
        <div class="info-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">楼盘：</span>{{refundLeaseInfo.gardenName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">楼栋：</span>{{refundLeaseInfo.buildingName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">房号：</span>{{refundLeaseInfo.roomNumber}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">房间：</span>{{refundLeaseInfo.bedRoom}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">管家：</span>{{refundLeaseInfo.managerName}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">
          租赁信息
        </div>
        <div class="info-content">
          <el-table :data="refundLeaseInfo.renters"
            stripe
            border
            style="width: 100%">
            <el-table-column prop="renterName"
              label="承租人"
              :min-width="80"
              align="center" />
            <el-table-column prop="certNo"
              label="身份证"
              :min-width="150"
              align="center" />
            <el-table-column prop="phone"
              label="联系方式"
              align="center" />
          </el-table>
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">押金：</span>{{Math.abs(refundLeaseInfo.contractDeposit)}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">支付方式：</span>{{refundLeaseInfo.payTypeDesc}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">租金：</span>{{refundLeaseInfo.contractRent}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="24">
              <p class="info-item">
                <span class="info-item-label">承租时间：</span>{{refundLeaseInfo.startTime}}至{{refundLeaseInfo.endTime}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">
          退租信息
        </div>
        <div class="info-content">
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="24">
              <p class="info-item">
                <span class="info-item-label">退租类型：</span>{{refundLeaseInfo.typeDesc}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="24">
              <p class="info-item">
                <span class="info-item-label">退租原因：</span>{{refundLeaseInfo.reason}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">收付款人：</span>{{refundLeaseInfo.renterName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">开户行：</span>{{refundLeaseInfo.bank}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">账号：</span>{{refundLeaseInfo.account}}
              </p>
            </el-col>
          </el-row>
          <el-table :data="expense"
            stripe
            :show-header="false"
            class="expense-list">
            <el-table-column prop="item"
              label="项目"
              align="center" />
            <el-table-column label="收付"
              align="center">
              <template slot-scope="scope">
                {{scope.row.amount >= 0 ? '应收' : '应退'}}
              </template>
            </el-table-column>
            <el-table-column prop="amount"
              label="金额"
              align="center">
              <template slot-scope="scope">
                {{Math.abs(scope.row.amount)}}元
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </section>
    <slot v-if="checkPermission('LONG_REFUND_CONFIRM') || checkPermission('LONG_REFUND_NOTIFY')">
      <section class="dialog-footer">
        <el-button v-if="checkPermission('LONG_REFUND_CONFIRM') && refundLeaseInfo.status !== 'ALREADY_CONFIRM' && refundLeaseInfo.status !== 'WAIT_PAY'"
          type="primary"
          size="mini"
          @click="handleConfirmation('ALREADY_CONFIRM')">{{refundLeaseInfo.sumMoney >= 0 ?'确认到账' : '确认退款'}}</el-button>
        <el-button v-if="checkPermission('LONG_REFUND_CONFIRM') && refundLeaseInfo.status === 'WAIT_CHECK'"
          size="mini"
          @click="handleConfirmation('NOT_REFUND')">{{refundLeaseInfo.sumMoney >= 0 ? '未到账' : '不退款'}}</el-button>
        <el-button v-if="checkPermission('LONG_REFUND_NOTIFY') && refundLeaseInfo.sumMoney > 0 && refundLeaseInfo.status === 'WAIT_PAY'"
          size="mini"
          @click="handleNotify">催款</el-button>
      </section>
    </slot>

    <el-dialog title="发送账单"
      append-to-body
      top="20vh"
      :visible.sync="rentalDialogVisible"
      :close-on-click-modal="false"
      width="600px">
      <send-notify v-if="rentalDialogVisible"
        @closeRentalDialog="closeRentalDialog"
        :messagesInfo="messagesInfo"
        :refundLeaseNo="refundLeaseInfo.refundLeaseNo">
      </send-notify>
    </el-dialog>

  </section>
</template>
<script>
import SendNotify from './SendNotify';
export default {
  components: {
    SendNotify
  },
  data() {
    return {
      rentalDialogVisible: false,
      messagesInfo: '',
      refundLeaseInfo: {
        account: '',
        bank: '',
        bedRoom: '',
        buildingName: '',
        contractDeposit: 0,
        contractId: '',
        contractRent: 0,
        deposit: 0,
        electricCharges: 0,
        endTime: '',
        gardenName: '',
        gasCharges: 0,
        id: '',
        internetCharges: 0,
        managerName: '',
        payType: '',
        reason: '',
        refundLeaseNo: '',
        rent: 0,
        renterName: '',
        renters: [
          {
            certNo: '',
            phone: '',
            renterName: ''
          }
        ],
        roomId: '',
        roomNumber: '',
        propertyCharges: 0,
        servicePrice: 0,
        startTime: '',
        status: '',
        sumMoney: 0,
        time: '',
        type: '',
        waterCharges: 0
      }
    };
  },
  computed: {
    expense: (vm) => {
      let expense = [{
        item: '租金',
        amount: vm.refundLeaseInfo.rent
      }, {
        item: '押金',
        amount: vm.refundLeaseInfo.deposit
      },
      //  {
      //   item: '物业费',
      //   amount: vm.refundLeaseInfo.propertyCharges
      // },
      {
        item: '服务费',
        amount: vm.refundLeaseInfo.servicePrice
      }, {
        item: '水费',
        amount: vm.refundLeaseInfo.waterCharges
      }, {
        item: '燃气',
        amount: vm.refundLeaseInfo.gasCharges
      }, {
        item: '电费',
        amount: vm.refundLeaseInfo.electricCharges
      }, {
        item: '宽带',
        amount: vm.refundLeaseInfo.internetCharges
      }, {
        item: '总计',
        amount: vm.refundLeaseInfo.sumMoney
      }
      ];

      return expense.filter((x) => {
        return x.amount !== null;
      });

      // // 物业费在某些退租单中存在，需要放在列表的第三位显示
      // if (vm.refundLeaseInfo.propertyCharges !== 0) {
      //   expense.splice(2, 0, {
      //     item: '物业费',
      //     amount: vm.refundLeaseInfo.propertyCharges
      //   });
      // }
      // return expense;
    }
  },
  props: ['refundLeaseNo'],
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/refundlease/pickDetail', {
          params: {
            refundLeaseNo: this.refundLeaseNo
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.refundLeaseInfo = result;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    closeDialog() {
      this.$emit('toggleBillingDialog', false);
    },
    handleConfirmation(action) {
      const h = this.$createElement;

      let msgTitle = '';
      if (action === 'ALREADY_CONFIRM') {
        if (this.refundLeaseInfo.sumMoney >= 0) {
          msgTitle = '确认收款';
        } else {
          msgTitle = '确认退款';
        }
      } else {
        msgTitle = `确定该房源款项${this.refundLeaseInfo.sumMoney >= 0 ? '未到账' : '不退款'}？`;
      }

      this.$confirm(
        h('div', { style: 'margin-left: 20px' }, [
          h('div', { style: 'color: red;font-size: 24px' }, [
            h('i', { class: 'el-icon-question' }, ''),
            h('span', null, msgTitle)
          ]),
          h('div', { style: 'margin: 10px 0 0 32px' }, [
            h('p', null, `${this.refundLeaseInfo.gardenName} ${this.refundLeaseInfo.buildingName} ${this.refundLeaseInfo.roomNumber} ${this.refundLeaseInfo.bedRoom}`),
            h('p', null, `金额：${Math.abs(this.refundLeaseInfo.sumMoney)}元`)
          ])])
        , '操作确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.handleSubmit(action);
        }).catch(() => {
          console.log('取消');
        });
    },
    handleSubmit(action) {
      this.$axios
        .post('security/refundlease/confirm', {
          refundLeaseNo: this.refundLeaseNo,
          status: action
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$message({
              type: 'success',
              message: '操作成功！'
            });
            this.$emit('toggleBillingDialog', true);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleNotify() {
      this.$axios.get(
        '/security/refundlease/billRent', {
          params: {
            refundLeaseNo: this.refundLeaseInfo.refundLeaseNo
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialogVisible = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        // debugger;
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    closeRentalDialog() {
      this.rentalDialogVisible = false;
    }
  }
};
</script>
<style scoped>
.dialog-box {
  background: #eee;
  padding: 15px 20px 0;
}
.info-box {
  border: 1px solid #dddddd;
  margin-bottom: 15px;
  background-color: #fff;
}
.info-title {
  text-align: left;
  font-weight: 600;
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fafafa;
  color: #333;
}
.info-content {
  padding: 20px 20px 0;
}
.info-item {
  padding-bottom: 15px;
  text-align: left;
}
.info-item-lable {
  display: inline-block;
  width: 80px;
  text-align: right;
  color: #999;
}

.expense-list {
  width: 100%;
  margin-top: -20px;
}
/* .expense-list tr {
  background-color: #fafafa;
}
.dialog-box>>>.el-table__row.el-table__row--striped td {
  background-color: #fff;
}
 .dialog-box>>>.el-table .cell {
  padding-left: 50px;
} */
</style>
