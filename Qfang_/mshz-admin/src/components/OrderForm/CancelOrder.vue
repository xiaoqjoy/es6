<template>
  <section class="add-orders">
    <el-dialog title="取消订单" :visible="myCancelOrder" :before-close="handleClose" width="950px" :close-on-click-modal="false">
      <div class="dialog-box bgceee">
        <el-form ref="cancelOrderform" :model="myCancelOrderData" size="mini" :rules="rules" label-position="right" label-width="100px">
          <div class="model-border">
            <div class="pd-ten">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="取消原因：" prop="cancelReason">
                    <el-select v-model="myCancelOrderData.cancelReason" placeholder="请选择" clearable>
                      <el-option v-for="(val,key) in cancelReasonEnum" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="是否退款：" prop="refundFlag">
                    <el-radio-group v-model="myCancelOrderData.refundFlag">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7" v-if="myCancelOrderData.refundFlag==='1'">
                  <el-form-item label="退款方式:" prop="refundWay">
                    <el-select v-model="myCancelOrderData.refundWay" placeholder="请选择" clearable>
                      <el-option v-for="(val,key) in refundWayEnum" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="退款备注：">
                    <el-input v-model="myCancelOrderData.refundRemark" type="textarea" :maxlength="300" :autosize="{ minRows: 2}" placeholder="请输入要备注的内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="model-border">

            <el-row class="line-h" style="margin-bottom:20px">
              <el-col :span="5" class="font-c">
                收款项
              </el-col>
              <el-col :span="4" class="font-c">
                金额
              </el-col>
              <el-col :span="4" style="padding-left:20px" class="font-c">
                支付
              </el-col>
              <el-col :span="5" style="padding-left:20px" class="font-c">
                退款金额
              </el-col>
              <el-col :span="6" style="padding-left:20px" class="font-c">
                退款说明
              </el-col>
            </el-row>
            <el-row v-if="fundsModel.payType!=='EXPENDITURE'" v-for="(fundsModel, index) in myCancelOrderData.fundsFormList" :key="index">
              <el-col :span="5" class="font-c">
                <el-form-item label=" " :prop="'fundsFormList.' + index + '.itemName'" label-width="10px">
                  <p class="hg-18">{{fundsModel.itemName}}</p>
                  <p class="hg-18 font-default">{{fundsModel.remark}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="font-c">
                <el-form-item label=" " label-width="10px">
                  <el-input :disabled="true" placeholder="请输入收款金额" v-model.number="fundsModel.itemMoneyOld">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="padding-left:20px" class="font-c">
                <el-form-item label=" " label-width="10px">
                  {{fundsModel.payChannelDesc}}
                </el-form-item>
              </el-col>
              <el-col :span="5" style="padding-left:20px" class="font-c">
                <el-form-item label=" " label-width="40px" :prop="'fundsFormList.' + index + '.itemMoney'" :rules="[{ required: true, message: '请输入退款金额', trigger: 'blur' },{ pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/, message: '请输入0，整数或者1~2位小数的金额数字', trigger: 'blur' }]">
                  <el-input :disabled="myCancelOrderData.refundFlag==='0'" v-model.number="fundsModel.itemMoney">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-left:20px;padding-right:20px" class="font-c">
                <el-form-item label-width="10px">
                  <el-input type="textarea" :disabled="myCancelOrderData.refundFlag==='0'" placeholder="请输入退款说明" v-model="fundsModel.refundRemark" :autosize="{ maxRows: 1}" resize="none" size="mini">
                  </el-input>
                </el-form-item>

              </el-col>
            </el-row>
          </div>
          <div>
            <el-row type="flex" justify="end" :gutter="20">
              <el-col :span="6">
                <el-form-item label="合计收款：" prop="reimburseRemark" label-width="100px">
                  <el-input v-model.number="this.allIncome" :disabled="true">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="mgr-20">
                <el-form-item label="合计退款：" prop="reimburseRemark" label-width="100px">
                  <el-input v-model.number="this.allRefound" :disabled="true">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="save('cancelOrderform')" :disabled="isSave">保存</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  props: ['cancelOrder', 'orderNo'],

  data() {
    return {
      rules: {
        cancelReason: [
          { required: true, message: '请选择取消原因', trigger: 'change' }
        ],
        refundWay: [
          { required: true, message: '请选择退款方式', trigger: 'change' }
        ],
        refundFlag: [
          { required: true, message: '请选择是否退款', trigger: 'change' }
        ]

      },
      cancelOrderData: {},
      myCancelOrderData: {},
      cancelReasonEnum: {},
      refundWayEnum: {},
      myCancelOrder: true,
      allIncome: 0,
      isSave: false
    };
  },

  computed: {
    allRefound: {
      get() {
        let result = 0;
        if (this.myCancelOrderData.fundsFormList) {
          this.myCancelOrderData.fundsFormList.forEach((item) => {
            if (item.payType !== 'EXPENDITURE') {
              result += item.itemMoney;
            }
          });
        }
        if (result > this.allIncome) {
          this.$message.error('退款金额不能超过已收金额！');
          this.isSave = true;
        } else {
          this.isSave = false;
        }
        return result;
      }
    }
  },

  created() {

  },
  mounted() {
    this.$axios.get('security/order/getAllEnum')
      .then((res) => {
        const { result } = res.data;
        this.cancelReasonEnum = result.CancelReasonEnum;
        this.refundWayEnum = result.RefundWayEnum;
      });

    this.$axios.get('security/order/cancelOrderInitPage', { params: { orderNo: this.orderNo } })
      .then((res) => {
        // console.log(res, ' 取消订单数据');
        if (res.data.status === 'C0000') {
          this.cancelOrderData = res.data.result;
          const fundsModelList = this.cancelOrderData.fundsModelList.slice(0, this.cancelOrderData.fundsModelList.length);

          this.myCancelOrderData = JSON.parse(JSON.stringify(this.cancelOrderData));

          this.myCancelOrderData = Object.assign({}, this.myCancelOrderData, {
            cancelReason: '',
            refundFlag: 3,
            refundWay: '',
            refundWayDesc: '',
            refundRemark: '',
            fundsFormList: fundsModelList,
            fundsModelList: ''
          });

          this.myCancelOrderData.fundsFormList.forEach((item, index) => {
            if (item.payChannel !== 'NONE') {
              this.allIncome += item.itemMoney;
            }
            // this.$set(item, 'remark', '');
            this.$set(item, 'itemMoneyOld', item.itemMoney);
            this.$set(item, 'itemMoney', 0);
            this.$set(item, 'parentId', item.id);
          });
        } else {
          this.$message.error(' 取消订单： 接口返回数据异常');
        }
      })
      .catch(() => {
        this.$message.error(' 取消订单： 请求接口异常');
      });
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    closeDialog() { },
    handleClose() {
      this.$emit('closeCancelOrder');
    },
    handleSelectionChange() { },
    save(formName) {
      this.$refs[formName].validate(
        (valid) => {
          const params = JSON.parse(JSON.stringify(this.myCancelOrderData));
          if (params.refundFlag === '0') {
            delete params.refundWay;
          }
          let allItemMoney = 0;
          params.fundsFormList.forEach((item) => {
            item.payType = 'EXPENDITURE';
            if (item.payChannel === 'NONE') {
              allItemMoney += item.itemMoney;
            }
          });
          if (allItemMoney > 0) {
            this.$message.error('未支付订单，不能退款');
            return;
          }
          if (valid) {
            this.$axios.post('security/order/cancelOrder', params)
              .then((res) => {
                // console.log(res, '取消订单 提交返回结果');

                if (res.data.status === 'C0000') {
                  this.$emit('closeCancelOrder', 'success');

                  this.$message({
                    message: '取消订单成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  });
                };
              })
              .catch((err) => {
                console.log(err, '取消订单 err ');
              });
          } else {
            this.$message.error('取消订单页面 修改的内容不符合规则');
          }
        });
    }
  },
  watch: {
    cancelOrder(newVal) {
      this.myCancelOrder = newVal;
    },

    orderNo(newVal) {

    }
  }
};
</script>
<style scoped>
/* el-select el-select--mini */
.funds-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #dddddd;
}
.funds-info-item {
  margin-left: 10px;
}
.line-h {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  font-weight: normal;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
}
.hg-18 {
  line-height: 18px;
}
</style>
