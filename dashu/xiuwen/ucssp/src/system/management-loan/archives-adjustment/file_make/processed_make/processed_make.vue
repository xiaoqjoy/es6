<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input
          class="select_72"
          v-model="paperArchivesId"
          placeholder="档案编号"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="orgName"
          placeholder="合作机构"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="custName"
          placeholder="客户姓名"
          clearable
        ></el-input>
        <!-- <span class="span effective">生效日期</span> -->
        <el-date-picker
          v-model="putoutStartDate"
          class="select_7"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="放款开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="putoutEndDate"
          class="select_7"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="放款结束日期"
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
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="paperArchivesId"
            label="档案编号"
          >
          </el-table-column>
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
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="合作机构"
          >
          </el-table-column>
          <el-table-column
            prop="subcompanyName"
            label="入账机构"
          >
          </el-table-column>
          <el-table-column
            prop="serviceName"
            label="个贷服务中心"
          >
          </el-table-column>
          <el-table-column
            prop="putout_dt"
            label="放款日期"
          >
          </el-table-column>
          <el-table-column
            prop="arcProducer"
            label="档案制作人"
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
              >详情
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
    <!-- <addRuleConfig  :refer="refer" v-if="alert_" @clsoe_windowAlert='close_1' />
    <delRuleConfig  :refer="refer" v-if="alert_d" :compile="compile" @clsoe_windowAlert_d='close_1_d' /> -->
    <particulars
      v-if="alert"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert='close'
    />
  </div>
</template>

<script type="text/ecmascript-6">
// import addRuleConfig from "../rule-config/addRuleConfig/"; // 新增规则配置组件
// import delRuleConfig from "../rule-config/delRuleConfig/"; // 删除规则配置组件
import particulars from "./particulars/index"; // 编辑规则配置组件
import pagination from "@components/pagination"; // 分页组件
import { loanApi } from "../../../js/server.js"; // 接口
export default {
  data() {
    return {
      certificateNum: "", // 身份证号码
      custName: "", // 客户姓名
      orgName: "", // 合作机构
      paperArchivesId: "", // 档案编号
      putoutEndDate: "", // 放款结束日期
      putoutStartDate: "", // 放款开始日期
      compile_data: "", // 编辑页面数据
      for_: [], // 渲染数据列表
      alert: false, // 打开详情页面配置
      alert_d: false, // 删除规则配置
      alert_e: false, // 编辑规则配置
      compile: [], // 传给编辑页面数据
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
    // 详情接口
    edit_alert(data) {
      let url = loanApi.archives_detail;
      let data1 = {
        accountAllotId: data.accountAllotId, // 出账编号
        applicationId: data.applicationId, // 申请编号
        operateType: "", // 操作类型(0制作|1复核))
        paperArchivesId: data.paperArchivesId // 档案编号
      };
      this.$MyFetch
        .get(url, data1)
        .then((datac = {}) => {
          console.log(datac);
          // if (datac.feeListDtos === null) {
          //   datac.feeListDtos = [];
          //   this.compile_data = datac;
          // }
          // if (datac.feeLists === null) {
          //   datac.feeLists = [];
          //   this.compile_data = datac;
          // }
          this.compile_data = datac;
          this.alert = true;
          this.compile_data = datac;
          this.$set(this.compile_data, "paperArchivesId", data.paperArchivesId);
          this.$set(this.compile_data, "arcProducer", data.arcProducer);
          console.log(this.compile_data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭编辑
    close() {
      this.alert = false;
    },
    // 清空查询条件
    empty() {
      this.certificateNum = ""; // 身份证号码
      this.custName = ""; // 客户姓名
      this.orgName = ""; // 合作机构
      this.paperArchivesId = ""; // 档案编号
      this.putoutEndDate = ""; // 放款结束日期
      this.putoutStartDate = ""; // 放款开始日期
      this.refer(1);
    },
    // 查询档案制作
    refer(pageNum, id) {
      let url = loanApi.archives_archives;
      let data = {
        certificateNum: this.certificateNum, // 身份证号
        checkInd: "", // 档案复核状态,2-已复核|1-待复核|0-待处理
        custName: this.custName, // 客户姓名
        handleStatusInd: true, // 档案处理状态,true-已处理|false-待处理
        orgName: this.orgName, // 合作机构
        paperArchivesId: this.paperArchivesId, // 档案编号
        putoutEndDate: this.putoutEndDate, // 放款结束日期
        putoutStartDate: this.putoutStartDate, // 放款开始日期
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
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
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
    min-height: 600px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
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
  }
  .pagination {
    margin: 70px 30px 20px 0;
  }
}
</style>
