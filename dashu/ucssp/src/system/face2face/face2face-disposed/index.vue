<template>
  <div class="face2face-disposed">

    <!-- 详情 -->
    <face2face-detail :dialogVisible="dialogVisible" :subCompanyId='subCompanyId' :applicationId="applicationId" @closeDialog="closeFn"></face2face-detail>

    <div class="table-area">
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input class="width200" v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="customerName">
          <el-input class="width200" v-model.trim="searchInfo.customerName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input class="width200" v-model.trim="searchInfo.idCardNo" placeholder="证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="f2fTime">
          <el-date-picker class="width200" v-model.trim="searchInfo.f2fTime" placeholder="面签日期" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="width100" type="primary" @click="getList(true)">查询</el-button>
          <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" class="common__table">
        <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
        <el-table-column prop="customerName" label="客户姓名" width="200"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="authReasonDesc" label="授权原因" width="200"></el-table-column>
        <el-table-column prop="f2fTypeDesc" label="面签类型" width="200"></el-table-column>
        <el-table-column prop="handleMan" label="处理人" width="200"></el-table-column>
        <el-table-column prop="productName1" label="产品1" width="200"></el-table-column>
        <el-table-column prop="productId1Conclusion" label="产品1 面签结论" width="200"></el-table-column>
        <el-table-column prop="productId1DocumentId" label="产品1 档案编号" width="200">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.productId1DocumentId" placement="top">
              <div class="ellipsis">
                {{scope.row.productId1DocumentId}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="productName2" label="产品2" width="200" v-if="!isXiuwen"></el-table-column>
        <el-table-column prop="productId2Conclusion" label="产品2 面签结论" width="200" v-if="!isXiuwen"></el-table-column>
        <el-table-column prop="productId2DocumentId" label="产品2 档案编号" width="200" v-if="!isXiuwen">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.productId2DocumentId" placement="top">
              <div class="ellipsis">
                {{scope.row.productId2DocumentId}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="overdueInd1" label="产品1是否逾期" width="120">
          <template slot-scope="scope">
            <div>
              {{scope.row.overdueInd1 === null ? '' : scope.row.overdueInd1 ? '是': "否"}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="overdueInd2" label="产品2是否逾期" width="120">
          <template slot-scope="scope">
            <div>
              {{scope.row.overdueInd2 === null ? '' : scope.row.overdueInd2 ? '是': "否"}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="custManagerName" label="客户经理" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row.applicationId, scope.row)">详情</el-button>
            <el-button type="text" @click="loanDataSign(scope.row)">贷后重签</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-page">
        <pagination @jump-page='jump' :page="{currentPage: searchInfo.pageNum,account: total,pageSize: searchInfo.pageSize,showJumpButton: true}"></pagination>
      </div>

      <!-- 贷后重签弹窗选择框 -->
      <div>
        <el-dialog
          title="选择贷后重签产品"
          :visible.sync="loanDialogVisible"
          width="480px"
          top="0"
          center
          @closed="productList = []"
          class="loan-data-sign">
          <div>
            <el-form :rules="loanConfirmRule" ref="loanConfirmForm" :model="loanConfirmForm">
              <el-form-item label="重签产品" prop="productId">
                <el-select @change="getProduct" v-model="loanConfirmForm.productId"
                placeholder="请选择"
                popper-class="loanDataResign"
                clearable>
                  <el-option
                    v-for="item in productList"
                    :key="item.productId"
                    :label="item.productName"
                    :value="item.productId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="loanDataConfirm" class="width200 button-primary">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 贷后重签弹窗选择框  end-->
      <div>
        <data-sign v-if="documentsVisible" :documentsVisible="documentsVisible" @closeDocDialog='closeDocDialog' :selectData="selectData"></data-sign>
      </div>
    </div>
  </div>
</template>
<script>
import { baseApi } from "../js/server.js";
import dataSign from './face2face-dataSign/index'; // 资料重签组件
import pagination from "@components/pagination/index"; // 分页组件
export default {
  name: "face2face-disposed",
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        customerName: "",
        idCardNo: "",
        f2fTime: "",
        pageNum: 1,
        pageSize: 10
      },
      // 表格信息
      tableData: [],
      total: 0, // 数据总数
      dialogVisible: false, // 详情的显示与隐藏
      applicationId: "", // 记录申请编号
      loanConfirmForm: {
        productId: '' // 16704
      },
      documentsVisible: false,
      loanDialogVisible: false,
      productList: [],
      loanConfirmRule: {
        productId: [
          { required: true, message: '请选择贷后重签产品' }
        ]
      },
      subCompanyId: '',
      selectData: {
        applicationId: ''
      }
    };
  },
  components: { pagination, dataSign },
  created() {
    // 获取数据列表
    this.getList();
  },
  methods: {
    closeFn() {
      window.openNum = window.openNum || 0;
      window.openNum--;
      if (window.openNum < 0) {
        window.openNum = 0;
      }
      this.$store.commit('pop_f2fTypeCode');
      this.dialogVisible = false;
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.getList();
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      // 处理日期为null的问题
      this.searchInfo.f2fTime = this.searchInfo.f2fTime || "";

      this.$MyFetch
        .get(baseApi.processed_list, this.searchInfo)
        .then(res => {
          // console.log(res);
          this.tableData = res.list;
          this.total = res.total;
          // this.tableData = [
          //   {
          //     applicationId: "RL20190422000059",
          //     creditReportId: "2019051633135789415492",
          //     customerName: "乐时",
          //     idCardNo: "340823********5066",
          //     orgName1: "宁波通商银行",
          //     orgName2: "兴业消金",
          //     productId1: "P20190101000023",
          //     productId2: "P20190101000073"
          //   },
          //   {
          //     applicationId: "RL20190422000059",
          //     creditReportId: "2019051633135789415492",
          //     customerName: "乐时",
          //     idCardNo: "340823********5066",
          //     orgName1: "宁波通商银行2",
          //     orgName2: "兴业消金2",
          //     productId1: "P20190101000033",
          //     productId2: "P20190101000063"
          //   }
          // ];
          if (flag && this.total === 0) {
            this.confirmFn("无查询结果", "error");
          }
        })
        .catch(err => {
          // console.log('请求失败');
          console.error(err);
          this.confirmFn(err.message, "error");
          // this.tableData = [
          //   {
          //     applicationId: "RL20190422000059",
          //     creditReportId: "2019051633135789415492",
          //     customerName: "乐时",
          //     idCardNo: "340823********5066",
          //     orgName1: "宁波通商银行",
          //     orgName2: "兴业消金",
          //     productId1: "P20190101000023",
          //     productId2: "P20190101000073"
          //   },
          //   {
          //     applicationId: "RL20190422000059",
          //     creditReportId: "2019051633135789415492",
          //     customerName: "乐时",
          //     idCardNo: "340823********5066",
          //     orgName1: "宁波通商银行2",
          //     orgName2: "兴业消金2",
          //     productId1: "P20190101000033",
          //     productId2: "P20190101000063"
          //   }
          // ];
        });
    },
    // 分页
    jump(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.getList();
    },
    // 显示详情
    showDetail(applicationId, row) {
      this.applicationId = applicationId;
      this.subCompanyId = row.subCompanyId;
      window.openNum = window.openNum || 0;
      window.openNum++;
      this.$store.commit('set_f2fTypeCode', row.f2fTypeCode);
      this.dialogVisible = true;
    },
    // 弹出选择产品框
    loanDataSign(_rowData) {
      this.applicationId = _rowData.applicationId;
      this.selectData = { applicationId: _rowData.applicationId };
      this.loanConfirmForm.productId = '';
      if (this.$refs.loanConfirmForm) {
        this.$refs.loanConfirmForm.resetFields();
      }
      this.$MyFetch.get(baseApi.loanProductList + this.applicationId)
        .then(_data => {
          if (_data) {
            this.productList = _data;
          }
          this.loanDialogVisible = true;
        }).catch(_error => {
          this.confirmFn(_error.message, 'error');
        });
      // this.productList = [
      //   { productId: "P20190101000002", productName: "宁波通商银行", productVersion: '001' },
      //   { productId: "P20190101000001", productName: "兴业消金", productVersion: '002' }
      // ];
      // this.loanDialogVisible = true;
    },
    // 产品框确认按钮，
    loanDataConfirm() {
      this.$refs.loanConfirmForm.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loanDialogVisible = false;
        this.documentsVisible = true;
      });
    },
    getProduct(_val) {
      // debugger;
      let selectItem = this.$lodash.find(this.productList, (_e) => {
        return _e.productId === _val;
      });
      this.selectData = Object.assign(this.selectData, selectItem);
    },
    closeDocDialog() {
      this.documentsVisible = false;
    }
  },
  watch: {
  }
};
</script>

<style lang="less" scoped>
.face2face-disposed {
  // 贷后重签确认弹框
  .loan-data-sign {
    /deep/ .el-dialog {
      height: 245px !important;
      margin-top: 0 !important;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-dialog__header {
        height: 60px;
        box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
        span.el-dialog__title {
          font-family: 'PingFangSC-Regular';
          color: #333333;
          letter-spacing: 1.38px;
        }
        button.el-dialog__headerbtn {
          top: 23px;
          i.el-dialog__close.el-icon.el-icon-close {
            font-weight: 600;
          }
        }
      }
      .el-dialog__body {
        background: none;
        padding: 20px 30px 20px 30px;
        .el-form {
          .el-form-item {
            margin-bottom: 0;
            label.el-form-item__label {
              float: none;
              font-family: 'PingFangSC-Regular' !important;
              font-size: 12px;
              color: #BBBBBB;
              letter-spacing: 1.09px;
            }
            .el-form-item__content {
              margin-top: 7px;
              div.el-select {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}

</style>
