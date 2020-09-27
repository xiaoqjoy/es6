<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 15:05:45
 * @LastEditTime: 2019-08-26 17:04:11
 * @LastEditors: Please set LastEditors
 -->

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-table--scrollable-x .el-table__body-wrapper{
  max-height: 550px;
  overflow: auto;
}
/deep/ .dialog-box .el-form-item{
    margin-right: 20px;
    font-size: 0;
    width: 250px;
}
/deep/ .el-button.el-button--primary{
  width: 200px;
  height: 40px;
  margin-left: 317px;
}
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
    height: 500px;
    width: 915px;
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
      height: 440px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        height: 440px;
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
        overflow: hidden;
        .el-table__row {
          height: 60px;
        }
        .serach_row {
            // 输入框和下拉框172*40
            .select_72 {
                width: 160px;
                height: 40px;
                margin-right: 15px;
            }
            // 输入框和下拉框170*40
            .select_7 {
            width: 170px;
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
            margin-left: 18px;
            }
            // 清空单独样式
            .empty {
            background: #ffffff;
            color: #538bf1;
            border: 1px solid #538bf1;
            }
        }
        .sponsor_table_box{
            margin-top: 21px;
            height: 222px;
        }
        .page_box{
            margin-bottom: 10px;
        }
    }
  }
  // icon样式
  .img-icon{
    position:absolute;
    top:50%;
    right:10px;
    width:16px;
    height:16px;
    margin-top:-8px;
    z-index: 2;
  }
}
</style>

<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">{{titleMsg}}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 带全选的表格 -->
              <div class="table_box marketers-detail">
                  <div class="serach_row">
                        <!-- 交易号 -->
                        <el-input clearable class="select_72" v-model="queryDate.custManagerId" placeholder="UM账号"></el-input>
                        <el-input clearable class="select_72" v-model="queryDate.custManagerName" :placeholder="titleMsg"></el-input>
                        <el-button class="b_button query button " @click="refer(1)">查询</el-button>
                        <el-button class="b_button empty button " @click="empty()">清空</el-button>
                    </div>
                    <div class="sponsor_table_box">
                        <el-table
                        height="222"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                        ref="multipleTable"
                        :data="for_"
                        tooltip-effect="dark"
                        style="width: 100%;height:100%;overflow:auto;max-height:600px;"
                        @select-all="clickSelectAll"
                        @select="selectDa"
                        @row-click="rowCheck">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                            prop="custManagerId"
                            label="UM账号">
                        </el-table-column>
                        <el-table-column
                            prop="custManagerName"
                            :label="titleMsg">
                        </el-table-column>
                        <el-table-column
                            v-if="titleMsg=='客户经理'"
                            prop="marketTeamName"
                            label="营销单位">
                        </el-table-column>
                        <el-table-column
                            v-if="titleMsg=='初始客户经理'"
                            prop="initialMarketTeamName"
                            label="初始营销单位">
                        </el-table-column>
                        </el-table>
                    </div>
                    <div class="page_box" :style="{'margin-top':'40px'}">
                        <!-- 分页条 -->
                        <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
                    </div>
                  <el-button type="primary" @click="getTrue">确定</el-button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {marketingApi} from "../js/server"; // 接口
import pagination from "@components/pagination"; // 分页条
import "@common/css/dialog";
export default {
  // 父组件传来的值
  props: ["tetail_data", "titleMsg"],
  data() {
    return {
        selectedData: '',
        select: '',
        queryDate: {
            custManagerId: '',
            custManagerName: ''
        },
        for_: [], // 渲染数据列表
        pageConfig: {
            account: 1, // 总条数
            pageSize: 10, // 当前多少条数据
            currentPage: 1, // 当前页
            showJumpButton: true // 显示跳转按钮
        }
    };
  },
  components: {
      pagination
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit("clsoeMsg");
    },
    detail(current) {
      // 明细
      let currentData = current || 1;
      let queryDate = {};
        if (this.titleMsg === '初始客户经理') {
            this.select = 'initialCustManagerSelect';
            queryDate = {
                pageNum: currentData,
                pageSize: this.pageConfig.pageSize,
                "applicationId": this.tetail_data.applicationId,
                "initialCustManagerId": this.queryDate.custManagerId ? this.queryDate.custManagerId : '',
                "initialCustManagerName": this.queryDate.custManagerName ? this.queryDate.custManagerName : ''
            };
        } else if (this.titleMsg === '客户经理') {
            this.select = 'custManagerSelect';
            queryDate = {
                pageNum: currentData,
                pageSize: this.pageConfig.pageSize,
                "applicationId": this.tetail_data.applicationId,
                "custManagerId": this.queryDate.custManagerId ? this.queryDate.custManagerId : '',
                "custManagerName": this.queryDate.custManagerName ? this.queryDate.custManagerName : ''
            };
        } else if (this.titleMsg === '业务助理') {
            this.select = 'assistantSelect';
            queryDate = {
                pageNum: currentData,
                pageSize: this.pageConfig.pageSize,
                "applicationId": this.tetail_data.applicationId,
                "assistantId": this.queryDate.custManagerId ? this.queryDate.custManagerId : '',
                "assistantName": this.queryDate.custManagerName ? this.queryDate.custManagerName : ''
            };
        };
      this.$MyFetch.post(marketingApi[this.select], queryDate)
      .then((data = {}) => {
            if (this.titleMsg === '初始客户经理') {
                data.list.forEach(element => {
                element.custManagerId = element.initialCustManagerId;
                element.custManagerName = element.initialCustManagerName;
                });
            } else if (this.titleMsg === '业务助理') {
                data.list.forEach(element => {
                element.custManagerId = element.assistantId;
                element.custManagerName = element.assistantName;
                });
            };
          this.for_ = data.list;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.pageNum || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.pageSize || 10;
            console.log(this.pageConfig);
      })
      .catch(err => {
      console.log(err);
      this.$error(err.message);
      });
    },
    jump(pageNum) { // 分页
        this.pageConfig.currentPage = pageNum;
        this.detail(pageNum);
    },
    // 清空按钮
    empty() {
        this.queryDate.custManagerId = '';
        this.queryDate.custManagerName = '';
    },
    // 查询
    refer() {
        this.detail();
    },
    getTrue() { // 确定
        if (this.selectedData) {
            this.$emit('clsoeMsg', {'select': this.select, 'multipleSelection': this.selectedData});
        } else {
            this.$message({message: '请选择一条数据'});
        }
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
      }
      // 单选选中的数据
      this.selectedData = selection[0];
    },
    selectDa(selection, row) {
     if (selection.length === 0) {
            this.selectedData = '';
        } else if (selection.length === 1) {
            this.selectedData = row;
        } else {
            selection.shift();
            this.rowCheck(row);
        }
    },
    rowCheck(row, column, e) {
      console.log('row', row);
      if (!this.selectedData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      } else if (this.selectedData && row.custManagerId === this.selectedData.custManagerId) {
        this.$refs.multipleTable.clearSelection();
        this.selectedData = '';
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      }
    }
  },
  mounted() {
    this.detail();
  }
};
</script>
