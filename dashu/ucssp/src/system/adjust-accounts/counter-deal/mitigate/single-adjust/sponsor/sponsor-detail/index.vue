<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.height_60 {
  height: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 780px;
    width: 1200px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .dialog-box__middle-form {
      height: 720px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        height: 720px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    height: 720px;
    // 表格
    .table_box {
        width: 100%;
        height: 630px;
        overflow: hidden;
        .el-table__row {
          height: 60px;
        }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">交易明细</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark">
                    <el-table-column
                      prop="loanNo"
                      width="180"
                      label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="客户名称">
                    </el-table-column>
                    <el-table-column
                        prop="fundOrgName"
                        label="合作方">
                    </el-table-column>
                        <el-table-column
                        prop="lineIdName"
                        label="资金方">
                    </el-table-column>
                    <el-table-column
                        prop="sterm"
                        label="期次">
                    </el-table-column>
                    <el-table-column
                        prop="payDate"
                        label="应还日期">
                    </el-table-column>
                    <el-table-column
                        prop="payFine"
                        label="应还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="adjustFine"
                        label="调整罚息">
                    </el-table-column>
                    <el-table-column
                        prop="payCompound"
                        label="应还复利">
                    </el-table-column>
                    <el-table-column
                        prop="adjustCompound"
                        label="调整复利">
                    </el-table-column>
                  </el-table>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- <composite v-if="alert_" :save="save" :refer="refer" @clsoe_windowused='close_1' /> -->
    <!-- <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2' /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  // 负组件传来的值
  props: {
    tetail_data: {
      type: Object,
      required: {}
    }
  },
  data() {
    return {
      user_name: '', // 客户姓名
      charge_Off_num: '', // 出账编号
      repayment_num: '', // 还款期次
      value1: '', // 应还日期
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [] // 渲染数据列表
    };
  },
  filters: {
    // 加密 -- 用 * 代替
    encrypt: function(data) {
      let str = '';
      for (let i = 0; i < data.length; i++) {
        str += '*';
      }
      return str;
    }
  },
  created() {
    let queryData = {
      transSerialNo: this.tetail_data.transSerialNo
    };
    this.queryPayInteFineBackBill(queryData);
  },
  methods: {
    // 明细
    queryPayInteFineBackBill(res = {}, current = 1) {
      let url = counterDealApi.queryPayInteFineBackBill + "?current=" + current + "&size=10";
      this.$MyFetch.post(url, res)
      .then((data = {}) => {
        this.for_ = data.records;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 清空按钮
    empty() {
      this.charge_Off_num = '';
      this.repayment_num = '';
      this.value1 = '';
      this.user_name = '';
    },
    // 查询按钮
    refer() {
      console.log('查询');
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    // 打开保存修改配置
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form_a.length !== 0) {
            // this.alert_ = true;
            this.save();
          } else {
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    // composite,
    // stateOfPreservation
  },
  mounted() {
    // this.field_numbers_c(); // 调取优先配置字段列表接口
  }
};
</script>
