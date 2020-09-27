<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 812px;
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
      height: auto;
      // 中间内容区域
      .form__block {
        height: auto;
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
    // height: 720px;
    // 输入框和下拉框部分样式
    .b_content {
      text-align: left;
      height: 40px;
      // margin-left: 28px;
      // margin-top: 20px;
      // 输入框和下拉框170*40
      .select_7 {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框172*40
      .select_72 {
        width: 160px;
        height: 40px;
        margin-right: 15px;
      }
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
      }
      // 查询单独样式
      .query {
        background: #538bf1;
        color: #ffffff;
      }
      // 清空单独样式
      .empty {
        background: #ffffff;
        color: #538bf1;
        border: 1px solid #538bf1;
      }
      .span {
        position: absolute;
      }
      .effective {
        left: 25.3%;
        top: 8%;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      .transverse {
        left: 35.1%;
        top: 12.5%;
        color: #bbbbbb;
      }
    }
    // 表格
    .table_box {
        width: 100%;
        height: 530px;
        margin: 20px 0;
        overflow: auto;
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
        <h5 class="title_type">引入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 输入框和下拉框 -->
              <div class="b_content">
                <el-input class="select_72" v-model="queryData.loanNo" placeholder="出账编号"></el-input>
                <el-input class="select_72" v-model="queryData.transSerialNo" placeholder="总单号"></el-input>
                <el-button class="b_button query button " @click="refer(1)">查询</el-button>
                <el-button class="b_button empty button " @click="empty()">清空</el-button>
              </div>
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @select="select"
                  @select-all="clickSelectAll"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="loanNo"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="transSerialNo"
                        label="总单号">
                    </el-table-column>
                    <el-table-column
                        prop="transType"
                        label="交易类型">
                    </el-table-column>
                    <el-table-column
                        prop="accDate"
                        label="记账日期">
                    </el-table-column>
                        <el-table-column
                        prop="transAmount"
                        label="交易金额">
                    </el-table-column>
                    <el-table-column
                        prop="createdBy"
                        label="操作人">
                    </el-table-column>
                    <el-table-column
                        prop="createdDate"
                        label="操作日期">
                    </el-table-column>
                  </el-table>
              </div>
              <!-- 分页条 -->
              <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            </div>
            <div class="form__bottom">
              <el-button class="add finis button h" type="primary" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import "@common/css/dialog";
import pagination from "@components/pagination"; // 分页条
export default {
  data() {
    return {
      selectedData: {}, // 单选选择的那条数据
      for_: [], // 渲染数据列表
      queryData: { // 参数
         loanNo: '', // 出账编号
         transSerialNo: '' // 原单号
      },
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 一页有几条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
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
    // 分页
    jump(pageNum) {
      console.log(pageNum);
      // 当前页
      this.pageConfig.currentPage = pageNum;
      this.getintroduce(this.queryData, pageNum);
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
      }
      // 单选选中的数据
      this.selectedData = selection[0];
      console.log("点击all，selecteddata", this.selectedData);
    },
    // 选择框选中
    handleSelectionChange (data, row) {
        console.log(data);
        // 单选选中的数据
        this.selectedData = data[0];
        console.log("点击lll,selecteddata", this.selectedData);
    },
    select(selection, row) {
        this.checkedRow = row;
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    // 清空按钮
    empty() {
      this.queryData.loanNo = ''; // 出账编号
      this.queryData.transSerialNo = ''; // 原单号
    },
    // 查询按钮
    refer() {
      if (this.queryData.loanNo || this.queryData.transSerialNo) {
        this.getintroduce(this.queryData);
      } else {
        this.confirmFn("请输入查询条件");
      }
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowAlert2");
    },
    // 打开保存修改配置
    finish() {
      if (this.selectedData.transSerialNo) {
        this.$MyFetch.post(counterDealApi.checkData, {loanNo: this.selectedData.loanNo, transType: "reverSal", transSerialNo: this.selectedData.transSerialNo})
          .then((data = {}) => {
              console.log(data);
              if (data.success) {
                this.$emit('clsoe_windowAlert2', this.selectedData);
              } else {
                this.confirmFn(data.msg);
              }
          })
          .catch((err) => {
              this.$error(err.message);
          });
        // this.$emit('clsoe_windowAlert2', this.selectedData);
      } else {
        this.confirmFn("请选择一条记录");
      }
    },
    getintroduce(res, current) { // 冲销引入
      res = res || {};
      current = current || 1;
      this.$MyFetch.post(counterDealApi.reversalIntroduce + '?current=' + current + '&size=10', res)
      .then((data = {}) => {
        if (data.records.length) {
          this.for_ = data.records;
           // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        } else {
          this.confirmFn("未找到对应总单记录");
        }
      })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    }
  },
  components: {
    pagination
  },
  mounted() {
  }
};
</script>
