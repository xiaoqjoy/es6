<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input
          class="select_72"
          v-model="applicationId"
          placeholder="申请编号"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="organizationId"
          placeholder="合作机构"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="custName"
          placeholder="客户姓名"
          clearable
        ></el-input>
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="放款日期"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
        <el-input
          class="select_72"
          v-model="certificateNum"
          placeholder="身份证号码"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer(1, true)"
        >查询</el-button>
        <el-button
          class="b_button empty"
          @click="empty()"
        >清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="accountAllotId"
            label="出账编号"
          >
          </el-table-column>
          <el-table-column
            prop="applicationId"
            label="申请编号"
          >
          </el-table-column>
          <el-table-column
            prop="custName"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="certificateNum"
            label="身份证号码"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="authReason"
            label="授权原因">
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="合作方"
          >
          </el-table-column>
          <el-table-column
            prop="fundName"
            label="资金方"
          >
          </el-table-column>
          <el-table-column
            prop="putout_dt"
            label="放款日期"
          >
          </el-table-column>
          <el-table-column
            prop="arcUpalodImager"
            label="提交人"
          >
          </el-table-column>
          <el-table-column
            prop="updatedDate"
            label="提交时间"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="edit_alert(scope.row)"
              >查看影像
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
    </div>
    <particulars
      v-if="alert"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert='close'
      @upDate_msg='refer(1)'
    />
  </div>
</template>

<script type="text/ecmascript-6">
// import addRuleConfig from "../rule-config/addRuleConfig/"; // 新增规则配置组件
// import delRuleConfig from "../rule-config/delRuleConfig/"; // 删除规则配置组件
// import editRuleConfig from "../rule-config/editRuleConfig/"; // 编辑规则配置组件
import particulars from "../pending_lending/particulars/index"; // 编辑规则配置组件
import pagination from "@components/pagination"; // 分页组件
import { loanApi } from "../../../js/server.js"; // 接口
export default {
  data() {
    return {
      organizationId: "", // 合作机构
      certificateNum: "", // 身份证号码
      value: "",
      custName: "", // 客户姓名
      paperArchivesId: "", // 档案编号
      applicationId: "", // 申请编号
      compile_data: "", // 编辑页面数据
      for_: [], // 渲染数据列表
      filiale_data: [], // 合作机构下拉框数据
      alert: false, // 新增规则配置
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 查看影像
    edit_alert(msg) {
      this.$showImage(msg.applicationId, '放款档案补扫', {ReadOnly: '0', selectProductId: msg.productId});
    },
    // 查看详情接口
    submit(msg) {
      let url = loanApi.archives_exist;
      let data = msg.paperArchivesId; // 档案编号
      this.$MyFetch
        .post(url + '?paperArchivesId=' + data)
        .then((data = {}) => {
          this.compile_data = msg.paperArchivesId;
          this.alert = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询数据接口
    refer(pageNum, id) {
      if (this.value === null) {
        this.value = [];
      };
      let url = loanApi.image_archives;
      let data = {
        applicationId: this.applicationId, // 申请编号
        certificateNum: this.certificateNum, // 身份证号
        checkInd: '3', // 已处理
        custName: this.custName, // 客户姓名
        handleStatusInd: "", // 档案处理状态,true-已处理|false-待处理
        orgName: this.organizationId, // 合作机构
        paperArchivesId: this.paperArchivesId, // 档案编号
        putoutEndDate: this.value[1], // 放款结束日期
        putoutStartDate: this.value[0], // 放款开始日期
        pagination: {
          orderBy: "",
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        }
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          if (id) {
            if (data.list.length > 0) {
              this.for_ = data.list;
              for (var prop in this.for_) {
                console.log(this.for_[prop].certificateNum);
                this.for_[prop].certificateNum = this.for_[prop].certificateNum.split('');
                this.for_[prop].certificateNum.splice(6, 8, "********");
                this.for_[prop].certificateNum.join('');
              }
              this.pageConfig.account = data.total;
              this.pageConfig.currentPage = data.pageNum;
            } else {
              this.$alert("无查询结果", {
                confirmButtonText: "确定"
              });
              this.for_ = [];
              this.pageConfig.account = data.total;
              this.pageConfig.currentPage = data.pageNum;
            }
          } else {
            this.for_ = data.list;
            for (var prope in this.for_) {
                this.for_[prope].certificateNum = this.for_[prope].certificateNum.split('');
                this.for_[prope].certificateNum.splice(6, 8, "********");
                this.for_[prope].certificateNum.join('');
              }
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空查询条件
    empty() {
      this.applicationId = ""; // 申请编号
      this.organizationId = ""; // 合作机构
      this.certificateNum = ""; // 身份证号码
      this.custName = ""; // 客户姓名
      this.orgName = ""; // 合作机构
      this.paperArchivesId = ""; // 档案编号
      this.putoutEndDate = ""; // 放款结束日期
      this.putoutStartDate = ""; // 放款开始日期
      this.value = [];
      this.refer(1);
    },
    // 关闭详情页面
    close() {
      this.alert = false;
    }
  },
  components: {
    particulars,
    pagination
  },
  created() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  padding-top: 20px;
  min-height: 800px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    margin: 20px 30px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    text-align: left;
    margin-left: 28px;
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
    }
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
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
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    // height: 600px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .editor {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
    }
    .delete {
      font-size: 14px;
      color: #f55f5f;
      letter-spacing: 0;
      margin-left: 20px;
    }
    .el-table {
      .yincan {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .pagination {
    margin: 70px 30px 20px 0;
  }
}
</style>
