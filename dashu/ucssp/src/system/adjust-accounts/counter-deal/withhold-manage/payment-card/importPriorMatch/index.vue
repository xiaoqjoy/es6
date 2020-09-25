<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
/deep/ .el-input__inner {
      width: 170px;
  }
.margin_r_60 {
  margin-right: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    // height: 850px;
    width: 945px;
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
      background: #ffffff;
      // height: 720px;
      // overflow-y: auto;
      // 中间内容区域
      .form__block {
        // height: 550px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      // 按钮
      .form__bottom {
        margin-top: 20px;
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
    height: 722px;
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
        height: 460px;
        margin-top: 21px;
        overflow: auto;
    }
    // 分页
    .pagination {
      margin-top: 20px;
      padding-right: 30px;
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
                 <!-- 合作方编号 -->
                  <el-input class="select_7" v-model="fundOrg" placeholder="合作方编号"></el-input>
                    <!-- 合作方名称 -->
                  <el-select v-model="fundOrgName" class="select_7" placeholder="合作方名称">
                      <el-option v-for="(item, index) in ChannelList"
                      :key="index"
                      :label="item.itemName"
                      :value="item.itemNo">
                      </el-option>
                  </el-select>
                <el-button class="b_button query button" @click="refer()">查询</el-button>
                <el-button class="b_button empty button" @click="empty()">清空</el-button>
              </div>
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  max-height="460"
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
                        prop="itemNo"
                        label="合作方编号">
                    </el-table-column>
                    <el-table-column
                        prop="itemName"
                        label="合作方名称">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="111"
                        label="合作方类型">
                    </el-table-column> -->
                  </el-table>
              </div>
            </div>
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            <div class="form__bottom">
              <el-button class="add finish button" type="primary" @click="finish()">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2' /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import pagination from "@components/pagination"; // 分页条
export default {
  data() {
    return {
      ChannelList: [], // 扣款银行列表
      fundOrg: '', // 合作方编号
      fundOrgName: '', // 合作方名称
      queryData: {}, // 查询数据
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [], // 渲染数据列表
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 一页有几条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      selectedData: {} // 单选选择的那条数据
    };
  },
  mounted() {
      this.ChannelListApi(); // 渠道列表接口
      this.RepayCardChangeImport();
  },
  methods: {
      // 合作方名称下拉
    ChannelListApi(res = {codeNo: "LineNo"}) {
      this.$MyFetch.get(counterDealApi.FundOrgNameList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
     // 还款卡变更-引入
      RepayCardChangeImport(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.RepayCardChangeImport + "?current=" + current + "&size=10";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            if (data.records.length === 0) {
              this.$message('无查询结果');
            };
            this.for_ = data.records;
              // 总条数
              this.pageConfig.account = data.total || 1;
              // 当前页
              this.pageConfig.currentPage = data.current || 1;
              // 一页有几条数据 pageSize
              this.pageConfig.pageSize = data.size || 10;
            })
            .catch((err) => {
              this.$error(err.message);
            });
      },
      // 单笔一般还款引入点击确定查询接口  -- 引入
      counterDealApi(res) {
        this.$MyFetch.post(counterDealApi.PlanDetails, res)
        .then((data = {}) => {
            // 把请求到的引入详情传给新增页面
            this.$emit("importSendData", data);
            // 关闭引入窗口
            this.$emit("clsoe_windowAlert2");
            })
            .catch((err) => {
              this.$error(err.message);
            });
      },
    // 分页
    jump(pageNum) {
      // 当前页
      this.pageConfig.currentPage = pageNum;
      this.RepayCardChangeImport(this.queryData, pageNum);
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
      }
      // 单选选中的数据
      this.selectedData = selection[0];
    },
    select(selection, row) {
        this.checkedRow = row;
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    // 选择框选中
    handleSelectionChange (data, row) {
        // 单选选中的数据
        this.selectedData = data[0];
    },
    // 清空按钮
    empty() {
      this.fundOrgName = '';
      this.fundOrg = '';
      this.queryData = {};
    },
    // 查询按钮
    refer() {
      this.search_refer();
      // if (this.searchNone()) {
      // this.search_refer();
      // } else {
      //     this.$message('请输入查询条件');
      // }
    },
    // 查询为空判断
    searchNone() {
        if (this.fundOrgName !== '') {
            return true;
        } else if (this.fundOrg !== '') {
            return true;
        } else {
            return false;
        }
    },
    // 点击查询执行的函数
    search_refer() {
      this.queryData = {
        fundOrgName: this.fundOrgName,
        fundOrg: this.fundOrg
      };
      // 一般还款应还的还款计划查询接口
      this.RepayCardChangeImport(this.queryData);
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowAlert2");
    },
    // 点击保存，请求一般还款应还的还款计划查询接口
    counterDealQueryData() {
      if (this.selectedData.loan_no) {
        // 获取一般还款应还的还款计划查询接口 的请求参数
        let queryData = {};
        queryData.loan_no = this.selectedData.loan_no;
        queryData.sterm = this.selectedData.sterm;
        // 一般还款应还的还款计划查询接口
        this.counterDealApi(queryData);
      } else {
        // 如果用户没有选择一条引入数据，提示用户
        this.$message('请选择一条引入数据');
      }
    },
    // 保存
    finish(formName) {
      this.$emit('importSendData', this.selectedData);
      this.close();
      // 点击保存，请求一般还款应还的还款计划查询接口
      // this.counterDealQueryData();
    }
  },
  components: {
    pagination
  }
};
</script>
