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
      color: #333;
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
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
        <h5 class="title_type">明细</h5>
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
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                        style="height: 60px"
                        prop="a"
                        label="交易号">
                    </el-table-column>
                    <el-table-column
                        prop="b"
                        style="height: 60px"
                        label="应还日期">
                    </el-table-column>
                    <el-table-column
                        prop="c"
                        label="记账日期">
                    </el-table-column>
                        <el-table-column
                        prop="d"
                        label="期次">
                    </el-table-column>
                    <el-table-column
                        prop="e"
                        label="应还利息">
                    </el-table-column>
                        <el-table-column
                        prop="f"
                        label="应还银行罚息">
                    </el-table-column>
                    <el-table-column
                        prop="g"
                        label="实还银行罚息">
                    </el-table-column>
                    <el-table-column
                        prop="h"
                        label="应还银行复利">
                    </el-table-column>
                    <el-table-column
                        prop="h"
                        label="应还代垫本金">
                    </el-table-column>
                    <el-table-column
                        prop="h"
                        label=". . . . . .">
                    </el-table-column>
                    <el-table-column
                        prop="h"
                        label="费用类型">
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
// import composite from "../composite"; // 保存修改配置组件
// import stateOfPreservation from "../state-of-preservation"; // 是否保存修改配置组件
// import { configApi } from "../../../js/server.js"; // 接口
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
      for_: [
          {
          a: 'ddf5454',
          b: 'ddf54dd54',
          c: 'ddf5ddd454',
          d: 'ddf5454',
          e: 'ddf5454',
          f: 'ddf5ddd454',
          g: 'ddf5法国队454',
          h: 'ddf5454'
          },
          {
          a: '123345',
          b: '123345',
          c: '123345',
          d: '123345',
          e: '123345',
          f: '123345',
          g: '123345',
          h: '123345'
          },
          {
          a: 'ddf5454',
          b: 'ddf5454',
          c: 'ddf5454',
          d: 'ddf5454',
          e: 'ddf5454',
          f: 'ddf5454',
          g: 'ddf5454',
          h: 'ddf5454'
          },
          {
          a: '123345',
          b: '123345',
          c: '123345',
          d: '123345',
          e: '123345',
          f: '123345',
          g: '123345',
          h: '123345'
          },
          {
          a: 'ddf5454',
          b: 'ddf5454',
          c: 'ddf5454',
          d: 'ddf5454',
          e: 'ddf5454',
          f: 'ddf5454',
          g: 'ddf5454',
          h: 'ddf5454'
          },
          {
          a: '123345',
          b: '123345',
          c: '123345',
          d: '123345',
          e: '123345',
          f: '123345',
          g: '123345',
          h: '123345'
          }
      ] // 渲染数据列表
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
  methods: {
    // 选择框选中
    handleSelectionChange (data) {
        console.log(data);
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
