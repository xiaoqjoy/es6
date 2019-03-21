<template>
  <section class="add-orders">
    <el-dialog title="办理退房" :visible="true" :before-close="handleClose" width="950px" :close-on-click-modal="false">

      <div class="dialog-box bgceee">
        <el-form ref="checkoutForm" :model="myCheckoutData" :rules="rules" size="mini" label-position="right" label-width="80px">
          <div class="model-border">
            <header class="model-header">
              <el-row>
                <el-col :span="12">
                  <span>收款信息</span>
                </el-col>
                <el-col :span="12">
                  <el-popover ref="addFundsInfo" placement="bottom" width="60" v-model="fundsTypeVisible">
                    <div style="text-align: center; margin: 0">
                      <el-button v-if="!isDeposit" type="text" size="mini" @click="addFundsModel('押金')">押金</el-button>
                    </div>
                    <div style="text-align: center; margin: 0">
                      <el-button type="text" size="mini" @click="addFundsModel('')">其他</el-button>
                    </div>
                  </el-popover>
                  <div class="float-r">
                    <el-button type="text" size="mini" v-popover:addFundsInfo>
                      <i class="icon iconfont icon-tianjia font-14"></i>
                      添加</el-button>
                  </div>
                </el-col>
              </el-row>
            </header>
            <div class="pd-ten">
              <div>
                <el-row :gutter="10" v-if="fundsModel.recordState!=='DELETED'" v-for="(fundsModel, index) in myCheckoutData.fundsFormList" :key="index">
                  <el-col :span="9">
                    <el-form-item label="类型：" :prop="'fundsFormList.' + index + '.itemName'" :rules="[{ required: true, message: '收款类型名称不能为空', trigger: 'blur'}]">
                      <el-input :disabled="fundsModel.id!==''" placeholder="请输入收款金额类型" v-model="fundsModel.itemName">
                        <template v-if="fundsModel.remark" slot="suffix">({{fundsModel.remark}})</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="收款：" :prop="'fundsFormList.' + index + '.itemMoney'" :rules="[{ required: true, message: '收款金额不能为空', trigger: 'blur'},{ type: 'number', message: '收款金额必须为数字值'},{ pattern: /(^(-)?[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^(-)?\d\.\d{1,2}?$)/, message: '请输入0，整数或者1~2位小数的金额数字', trigger: 'blur' }]">
                      <el-input :disabled="fundsModel.id!==''" placeholder="请输入收款金额" v-model.number="fundsModel.itemMoney">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item v-if="fundsModel.payType!=='EXPENDITURE'&& fundsModel.itemMoney>=0" label="支付渠道：" :prop="'fundsFormList.' + index + '.payChannel'" :rules="{ required: true, message: '请选择支付渠道', trigger: 'change' }" label-width="100px">
                      <el-select :disabled="fundsModel.id!==''&&fundsModel.disablePayChannel" placeholder="请选择支付渠道" @change="changePayChannel(fundsModel.payChannelDesc,index)" v-model="fundsModel.payChannelDesc" clearable>
                        <el-option v-for="(val, key) in payChannelEnum" :key="key" :label="val" :value="key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="fundsModel.itemType==='OTHERS'||fundsModel.id===''">
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteFundsModel(index,fundsModel.itemType)"></el-button>
                  </el-col>
                </el-row>
              </div>

              <div class="funds-info">
                <p class="funds-info-item">
                  订单金额：
                  <span class="font-red font-w">{{orderPrice}}</span>
                  元
                </p>
                <p class="funds-info-item">
                  押金：
                  <span class="font-red font-w">{{myDeposit===0?'无':myDeposit}}</span> {{myDeposit===0?'':'元'}}
                </p>
                <p class="funds-info-item">
                  已收金额：
                  <span class="font-red">{{amountReceived}}</span>
                  元
                </p>
                <p class="funds-info-item">
                  <span>{{this.refund>=0?'应退金额：':'未收金额：'}}</span>
                  <span v-if="this.refund>=0" class="font-red">{{Math.abs(amountReceived - orderPrice).toFixed(2)}}</span>
                  <span v-else class="font-red">{{Math.abs(refund)}}</span>
                  元
                </p>
              </div>

              <div v-if="hasRefund">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="退款方式：" prop="refundWay" label-width="100px">
                      <el-select :disabled="+this.refund===0 && +this.myDeposit===0" placeholder="请选择" @change="changeRefundWay" v-model="myCheckoutData.refundWayDesc" clearable>
                        <el-option :label="item" :value="item" v-for="(item, index) in refundWayEnum" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-form-item label="退款备注：">
                      <el-input :disabled="isEdit" placeholder="输入退款备注" v-model="myCheckoutData.refundRemark">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </div>
          </div>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="save('checkoutForm')"> 保存</el-button>
        <el-button size="mini" @click="handleClose('checkoutForm')">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: ['orderNo'],

  data() {
    return {
      rules: {
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          { min: 10, max: 14, message: '长度在 10 到 14 个字符', trigger: 'blur' }
        ],
        refundWay: [
          { required: true, message: '请选择退款方式', trigger: 'change' }
        ],
        roomNo: [
          { required: true, message: '请输入房间号', trigger: 'blur' }
          // { validator: validateRoomNo, trigger: 'blur' }
        ],
        bookedDays: [
          { required: true, message: '请输入正整数', trigger: 'blur' },
          { pattern: /^[1-8][0-9]{0,9}|[9][0]$/, message: '可预定天数为1到90', trigger: 'blur' }
        ],
        custName: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入15或18位身份证号', trigger: 'blur' }
        ]
      },
      payChannelEnum: {},
      refundWayEnum: {},
      isEdit: false,
      payChannel: '',
      checkoutData: {},
      myCheckoutData: {},
      fundsTypeVisible: false,
      isDeposit: false // 收款信息的添加按钮里是否有押金按钮

    };
  },
  mounted() {
    // 获取 所有的枚举状态
    this.$axios.get('security/order/getAllEnum')
      .then((res) => {
        const { result } = res.data;
        this.payChannelEnum = result.PayChannelEnum;
        this.refundWayEnum = result.RefundWayEnum;
      });
    // 办理退房数据
    this.$axios.get('security/order/checkOutInitPage', { params: { orderNo: this.orderNo } })
      .then((res) => {
        this.checkoutData = res.data.result;
        const fundsModelList = this.checkoutData.fundsModelList.slice(0, this.checkoutData.fundsModelList.length);
        this.myCheckoutData = Object.assign({}, this.checkoutData, {
          refundWay: '',
          refundWayDesc: '',
          refundRemark: '',
          fundsFormList: fundsModelList,
          fundsModelList: ''
        });
        // 收款信息的添加 下拉按钮 是否有押金选项
        this.myCheckoutData.fundsFormList.forEach(item => {
          if (item.itemType === 'DEPOSIT' && item.itemMoney === 0) {
            item.recordState = 'DELETED';
            this.isDeposit = true;// 是否有添加删除押金的按钮
          };

          if (item.itemType === 'DEPOSIT' && item.itemMoney > 0) {
            this.isDeposit = true;// 是否有添加删除押金的按钮
          };

          if (item.id !== '' && item.payChannel !== 'NONE') {
            item.disablePayChannel = true; // 如果请求的数据 支付状态是未支付, 那么支付方式 可以改，保存提交后才不可选择
          }
          if (item.payType === 'EXPENDITURE') {
            item.itemMoney = -Math.abs(item.itemMoney);
          }
        });
        // console.log(this.myCheckoutData, '办理退房 构造后的 数据');
      })
      .catch(() => {
        this.$message.error('办理退房 ： 请求接口错误');
      });
  },

  computed: {

    // 是否有退款方式和退款备注
    hasRefund: {
      get() {
        let isRefund = false;
        if (this.refund > 0 || this.myDeposit > 0) {
          isRefund = true;
        }

        return isRefund;
      }
    },

    // 订单金额
    orderPrice: {
      get() {
        let allMoney = 0;
        if (this.myCheckoutData.fundsFormList) {
          this.myCheckoutData.fundsFormList.forEach((val, key) => {
            if (val.itemType !== 'DEPOSIT') {
              allMoney += val.itemMoney;
            }
          });
        }
        return (+allMoney).toFixed(2);
      }
    },

    // 押金
    myDeposit: {
      get() {
        let deposit = 0;
        if (this.myCheckoutData.fundsFormList) {
          this.myCheckoutData.fundsFormList.forEach((val, key) => {
            if (val.itemType === 'DEPOSIT') {
              deposit = val.itemMoney;
            }
          });
        }
        // console.log(deposit);
        return (+deposit).toFixed(2);
      }
    },

    // 已收金额
    amountReceived: {
      get() {
        let allMoney = 0;
        if (this.myCheckoutData.fundsFormList) {
          this.myCheckoutData.fundsFormList.forEach((val, key) => {
            if (val.payType !== 'EXPENDITURE' && val.itemMoney >= 0 && val.payChannel !== 'NONE') {
              allMoney += val.itemMoney;
            }
          });
        }
        return (+allMoney).toFixed(2);
      }
    },
    // 大于0为退款 小于0为未收金额
    refund: {
      get() {
        return this.amountReceived - this.orderPrice - this.myDeposit;
      }
    }
  },

  methods: {

    changeRefundWay(val) {
      Object.entries(this.refundWayEnum).forEach((item) => {
        if (item[1] === val) {
          this.$set(this.myCheckoutData, 'refundWay', item[0]);
        }
      });
    },

    changePayChannel(val, index) {
      this.$set(this.myCheckoutData.fundsFormList[index], 'payChannel', val);
    },

    handleClose(formName) {
      this.$emit('closeCheckout');
      // this.$refs[formName].resetFields();
    },

    save(formName) {
      this.$refs[formName].validate(
        (valid) => {
          // console.log(valid);
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.myCheckoutData));

            params.fundsFormList.forEach((item, index) => {
              item.payType = item.itemMoney > 0 ? 'INCOME' : 'EXPENDITURE';
              item.itemMoney = Math.abs(+item.itemMoney);
              if (item.payType === 'EXPENDITURE') {
                item.payChannel = 'ALIPAY'; // 接口 不允许 payChannel 传 空字符串
              }
            });
            // console.log(this.refund, this.myDeposit, '----------------');
            params.amountReceived = this.amountReceived;
            params.orderPrice = this.orderPrice;
            params.refund = (+this.refund) + (+this.myDeposit);

            this.$axios.post('security/order/handleCheckOut', params)
              .then((res) => {
                // console.log(res, '办理退房 提交返回结果');

                if (res.data.status === 'C0000') {
                  this.$emit('closeCheckout', 'success');

                  this.$message({
                    message: '办理退房成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '办理退房失败' + res.data.message,
                    type: 'error'
                  });
                };
              })
              .catch((err) => {
                console.log(err, '办理退房 err ');
              });
          } else {
            this.$message.error('办理退房页面 修改的内容不符合规则');
          }
        });
    },

    addFundsModel(val) {
      this.fundsTypeVisible = false;
      if (val === '押金') {
        this.isDeposit = true;
        this.myCheckoutData.fundsFormList.push({
          itemName: val,
          itemMoney: '',
          payChannel: '',
          id: '',
          itemType: 'DEPOSIT'
        });
      } else {
        this.myCheckoutData.fundsFormList.push({
          itemName: val,
          itemMoney: '',
          payChannel: '',
          id: '',
          itemType: 'OTHER'
        });
      }
    },

    deleteFundsModel(index, itemType) {
      if (itemType === 'DEPOSIT') {
        this.isDeposit = false;
      }
      // id 为空时代表当前记录为用户手工添加的
      if (this.myCheckoutData.fundsFormList[index].id === '') {
        this.myCheckoutData.fundsFormList.splice(index, 1);
      } else {
        this.$set(this.myCheckoutData.fundsFormList[index], 'recordState', 'DELETED');
      }
    }
  },

  watch: {
    checkout(newVal) {
      this.myCheckout = newVal;
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
  margin: 10px;
}
</style>
