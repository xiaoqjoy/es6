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
                <span class="info-item-label">楼盘：</span>{{billInfo.gardenName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">楼栋：</span>{{billInfo.buildingName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">房号：</span>{{billInfo.roomNumber}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">房间：</span>{{billInfo.bedRoomNum}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">管家：</span>{{billInfo.seneschal}}
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
          <el-table :data="billInfo.renters"
            stripe
            border
            style="width: 100%">
            <el-table-column prop="renter"
              label="承租人"
              :min-width="80"
              align="center" />
            <el-table-column prop="idCard"
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
                <span class="info-item-label">押金：</span>{{billInfo.contractDeposit}}元
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">支付方式：</span>{{billInfo.payMethodEnumDesc}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">租金：</span>{{billInfo.contractRent}}元
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">
          费用信息
        </div>
        <div class="info-content">
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
                {{scope.row.amount ? scope.row.amount : 0 }}元
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="billInfo.billFinanceEnum && billInfo.billFinanceEnum === 'ALREADY_CLOSE_BILL'"
        class="info-box">
        <div class="info-title">
          账单关闭原因
        </div>
        <div class="pd-20">
          {{billInfo.closeCause}}
        </div>
      </div>
      <div v-else
        class="info-box">
        <div class="info-title">
          支付信息
        </div>
        <div class="info-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">支付人：</span>{{billInfo.payee}}
              </p>
            </el-col>
            <el-col :span="10">
              <p class="info-item">
                <span class="info-item-label">支付单号：</span>{{billInfo.payOrderNo}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="info-item">
                <span class="info-item-label">支付渠道：</span>{{billInfo.payChannelDesc}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <p class="info-item">
                <span class="info-item-label">支付时间：</span>{{billInfo.payDateDesc}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

    </section>
    <slot v-if="checkPermission('LONG_BILL_CONFIRM') && (billInfo.billFinanceEnum === 'PENDING'  || (billInfo.billFinanceEnum === 'UNCOLLECTED' && billInfo.seneschalEnum === 'ALREADY_COLLECTING_RENT'))">
      <section class="dialog-footer">
        <el-button v-if="billInfo.billFinanceEnum === 'PENDING' || (billInfo.billFinanceEnum === 'UNCOLLECTED' && billInfo.seneschalEnum === 'ALREADY_COLLECTING_RENT')"
          type="primary"
          size="mini"
          @click="handleConfirmation('CONFIRMED')">{{this.billInfo.sumMoney >= 0 ?'确认到账':'确认退款'}}</el-button>
        <el-button v-if="billInfo.billFinanceEnum === 'PENDING'"
          size="mini"
          @click="handleConfirmation('UNCOLLECTED')">未到账</el-button>
      </section>
    </slot>
  </section>
</template>
<script>
export default {
  data() {
    return {
      billInfo: {
        bedRoomNum: '',
        billFinanceEnum: '',
        billFinanceEnumDesc: '',
        billNo: '',
        buildingName: '',
        contractDeposit: 0,
        contractRent: 0,
        createOperatorId: '',
        deposit: 0,
        electricCharges: 0,
        gardenName: '',
        gasCharges: 0,
        id: '',
        internetCharges: 0,
        payChannel: '',
        payChannelDesc: '',
        payDate: 0,
        payDateDesc: '',
        payMethodEnum: '',
        payMethodEnumDesc: '',
        payOrderNo: '',
        payee: '',
        propertyCharges: 0,
        rent: 0,
        renters: [{
          certType: '',
          certTyprDesc: '',
          idCard: '',
          phone: '',
          renter: ''
        }],
        roomLongChamberId: '',
        roomNumber: '',
        seneschal: '',
        servicePrice: 0,
        sumMoney: 0,
        updateOperatorId: '',
        waterCharges: 0
      }
    };
  },
  computed: {
    expense: (vm) => {
      let expense = [{
        item: '租金',
        amount: vm.billInfo.rent
      }, {
        item: '押金',
        amount: vm.billInfo.deposit
      }, {
        item: '服务费',
        amount: vm.billInfo.servicePrice
      }, {
        item: '水费',
        amount: vm.billInfo.waterCharges
      }, {
        item: '燃气',
        amount: vm.billInfo.gasCharges
      }, {
        item: '电费',
        amount: vm.billInfo.electricCharges
      }, {
        item: '宽带',
        amount: vm.billInfo.internetCharges
      }, {
        item: '总计',
        amount: vm.billInfo.sumMoney
      }
      ];

      return expense.filter((x) => {
        return x.amount !== null;
      });
    }
  },
  props: ['billNo'],

  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/bill/selectBillDetail', {
          params: {
            id: this.billNo
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.billInfo = result;
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
      if (action === 'CONFIRMED') {
        if (this.billInfo.sumMoney >= 0) {
          msgTitle = '确认到账';
        } else {
          msgTitle = '确认退款';
        }
      } else {
        msgTitle = '确定该账单款项未到账？';
      }

      this.$confirm(
        h('div', { style: 'margin-left: 20px' }, [
          h('div', { style: 'color: red;font-size: 24px' }, [
            h('i', { class: 'el-icon-question' }, ''),
            h('span', null, msgTitle)
          ]),
          h('div', { style: 'margin: 10px 0 0 32px' }, [
            h('p', null, `${this.billInfo.gardenName} ${this.billInfo.buildingName} ${this.billInfo.roomNumber} ${this.billInfo.bedRoomNum}`),
            h('p', null, [
              h('span', { style: 'display: inline-block;width: 56px;text-align: justify;text-align-last: justify;' }, '金额'),
              h('span', null, `：${Math.abs(this.billInfo.sumMoney)}元`)
            ]),
            h('p', null, [
              h('span', { style: 'display: inline-block;width: 56px;text-align: justify;text-align-last: justify;' }, '支付人'),
              h('span', null, `：${this.billInfo.payee}`)
            ]),

            h('p', null, `支付单号：${this.billInfo.payOrderNo}`),
            h('p', null, `支付渠道：${this.billInfo.payChannelDesc}`),
            h('p', null, `支付时间：${this.billInfo.payDateDesc}`)
          ])])
        , '操作确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.handleSubmit(action);
        }).catch(() => {
        });
    },
    handleSubmit(action) {
      this.$axios
        .post('/security/bill/confirmPayment', {
          billFinanceEnum: action,
          billNo: this.billInfo.billNo
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
