<template>
  <div>
      <div class="dispose-pending">
        <div class="dis_content">
          <div class="b_content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="select_72 f__left">
              <el-form-item prop="applicationId">
                <el-input placeholder="申请编号" clearable autocomplete="off" v-model="ruleForm.applicationId"></el-input>
              </el-form-item>
              <el-form-item prop="custName">
                <el-input placeholder="客户姓名" clearable autocomplete="off" v-model="ruleForm.custName"></el-input>
              </el-form-item>
              <el-form-item prop="certificateNum">
                <el-input placeholder="证件号码" clearable autocomplete="off" v-model="ruleForm.certificateNum"></el-input>
              </el-form-item>
              <el-form-item prop="workplaceName">
                <el-input placeholder="单位名称" clearable autocomplete="off" v-model="ruleForm.workplaceName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select placeholder="业务来源" filterable v-model="ruleForm.businessSourceCode">
                  <el-option v-for="item in cxPatchUser" :key="item.itemCode"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- <el-input class="select_72" placeholder="客户名称" v-model="certificateNum"></el-input>
            <el-input class="select_72" placeholder="证件号码" v-model="custName"></el-input> -->
            <!-- <span class="span effective">生效日期</span> -->
            <el-button class="b_button query" @click="submitForm('ruleForm')">查询</el-button>
            <el-button class="b_button empty" @click="clearMsg">清空</el-button>
          </div>
          <div class="tables">
            <el-table
              :data="tableList"
              :default-sort = "{prop: 'date', order: 'descending'}"
              :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              >
             <el-table-column
                prop="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="applicationId"
                label="申请编号">
              </el-table-column>
              <el-table-column
                prop="custName"
                label="客户姓名">
              </el-table-column>
                <el-table-column
                prop="applicationSubmitAmt"
                label="贷款金额">
              </el-table-column>
              <el-table-column
                prop="subcompanyId"
                label="所属机构">
              </el-table-column>
                <el-table-column
                prop="serviceId"
                label="个贷服务中心">
              </el-table-column>
              <el-table-column
                prop="businessSourceName"
                label="业务来源">
              </el-table-column>
              <el-table-column
                prop="handlerSubmitDttm"
                label="报送时间">
              </el-table-column>
              <el-table-column
                prop="issueDate"
                label="下发时间">
              </el-table-column>
              <el-table-column
                prop="workplaceName"
                label="单位名称">
              </el-table-column>
              <el-table-column
                prop="inspectorUserId"
                label="补件复核人">
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small"  @click="toPatchDetails(scope.$index, scope.row)">补件查看
                  </el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="siTypeCd"
                label="补件类型">
              </el-table-column> -->
            </el-table>
          </div>
          <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
      </div>
      <patchDetails v-if="alertPatch && !siCategoryCd" @clsoe_windowAlert="close_patchDetails"
      :siTaskId="siTaskId" :siBusinessId="siBusinessId"
       :isReadonly="isReadonly" :isDispose="isDispose"
       :refresh="getTable"
       :applicationId="applicationId"/>
       <easy-loan-path-detail v-if="alertPatch && siCategoryCd" @clsoe_windowAlert="close_patchDetails" :isReadonly="isReadonly" :refresh="getTable"
       :isDispose="isDispose" :siTaskId="siTaskId" :siBusinessId="siBusinessId" :disabled="true" :isDisabled="true" :showRemarkForm="true" :showReview="true"
      :applicationId="applicationId"></easy-loan-path-detail>
  </div>
</template>

<script>
import { userInfo } from '@common/js/localStorage';
import pagination from "@components/pagination"; // 分页条
import {patchApi} from '../../js/server.js';
import patchDetails from "../../dispose/pending/patchDetails/index";
import easyLoanPathDetail from "../../dispose/pending/patchDetails/easy_loan_path_detail.vue";
import myRule from '@common/js/rules';
import {baseApi} from '@common/js/server.js';
export default {
  data () {
    return {
      siCategoryCd: false, // true 需要打开自雇化组件，false 为默认
      isDispose: true,
      isReadonly: true,
      alertPatch: false,
      siTaskId: '',
      siBusinessId: '',
      ruleForm: {
        applicationId: "",
        custName: "",
        certificateNum: "",
        workplaceName: ""
      },
      cxPatchUser: [],
      rules: {
        applicationId: [
          { validator: myRule.numberEnglishRule, trigger: 'change' }
        ],
        custName: [
          { validator: myRule.chineseName, trigger: 'change' }
        ],
        certificateNum: [
          { validator: myRule.identityCardRule, trigger: 'change' }
        ]
      },
      applicationId: '',
      certificateNum: '',
      custName: '',
      tableList: [],
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      }
    };
  },
  computed: {
    userId: function() {
      return this.userInfo.userId;
    }
  },
  created() {
    this.userInfo = JSON.parse(userInfo.getUserInfo());
    this.getTable(1);
    this.getMultiDict(['cx_patch_user']);
  },
  methods: {
    toPatchDetails(index, row) {
      this.siTaskId = row.siTaskId;
      this.siBusinessId = row.siBusinessId;
      this.applicationId = row.applicationId;
      this.siCategoryCd = row.siCategoryCd === '02';
      this.alertPatch = true;
    },
    close_patchDetails() {
      this.alertPatch = false;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getTable(1);
          } else {
            // this.$message({
            //         message: '请输入正确的申请编号',
            //         type: "error"
            //       });
            return false;
          }
        });
      },
    getMultiDict(arr, isReadOnly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadOnly
      };
      this.$MyFetch.get(baseApi.multipleSelect, data).then(res => {
        this.cxPatchUser = res.cx_patch_user;
      }).catch(_err => {
        this.$error(_err.message);
      });
    },
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.getTable(this.pageConfig.currentPage);
    },
    getTable(current) {
      let url = patchApi.review.processed + "?pageNum=" + current + "&pageSize=10";
      let data = {
        'applicationId': this.ruleForm.applicationId,
        'certificateNum': this.ruleForm.certificateNum,
        'custName': this.ruleForm.custName,
        businessSourceCode: this.ruleForm.businessSourceCode,
        workplaceName: this.ruleForm.workplaceName
      };
      this.$MyFetch.post(url, data)
      .then((data) => {
        if (data) {
          this.pageConfig.currentPage = data.pageNum;
          if (data.total === 0) {
            this.$message.success('未查询到结果');
          }
          this.tableList = data.list;
          this.pageConfig.account = data.total;
          if (!(!data.list && typeof (data.list) !== "undefined" && data.list !== 0)) {
          for (let i = 0; i < this.tableList.length; i++) {
            this.tableList[i].index = (i + 1) + (this.pageConfig.currentPage - 1) * this.pageConfig.pageSize;
          }
        }
        }
        console.log(data);
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    clearMsg() {
      this.ruleForm.applicationId = '';
      this.ruleForm.certificateNum = '';
      this.ruleForm.custName = '';
      this.ruleForm.workplaceName = '';
      this.getTable(1);
    }
  },
  components: {
    pagination,
    patchDetails,
    easyLoanPathDetail
  }
};
</script>

<style lang="less" scoped>
.dispose-pending {
  .el-form-item{
    float: left;
 /deep/ .el-form-item__content{
   margin-right: 10px;
    margin-left: 0;
  }
}
  .dis_content {
    min-height: 850px;
    overflow: hidden;
    .boxShadow(0, 0);
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
      height: 40px;
      margin: 20px 0 0 28px;
      // 输入框和下拉框170*40
      .select_7 {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框172*40
      .select_72 {
        // width: 172px;
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
      // height: 400px;
      width: 1622px;
      margin: 0px auto;
      border: 1px solid #d0d0d0;
      margin: 20px 28px;
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
      margin: 40px 30px 0 0;
    }
  }
}
</style>
