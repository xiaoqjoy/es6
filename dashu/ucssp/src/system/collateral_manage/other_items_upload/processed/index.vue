<template>
  <div class="mortgage_review_processed">
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
      <el-form-item prop="applicationId">
        <el-input v-model.trim="searchInfo.applicationId" clearable placeholder="申请编号"></el-input>
      </el-form-item>
      <el-form-item prop="customerName">
        <el-input v-model.trim="searchInfo.customerName" clearable placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item prop="subCompanyId">
        <el-select clearable v-model="searchInfo.subCompanyId" placeholder="分公司" filterable>
          <el-option
            v-for="item in subcompanyList"
            :key="item.organizationId"
            :label="item.organizationName"
            :value="item.organizationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="btn b_button query" type="primary" @click="search">查询</el-button>
        <el-button class="btn b_button empty" type="default" @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table height="600"
      :data="reviewData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        v-for="item in tableCols"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :type="item.type">
        <!-- <template slot-scope="scope">
          <el-popover width="500" trigger="hover" placement="top" v-if="item.showTemp">
              <p>{{ scope.row[item.prop] }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row[item.prop] }}</p>
              </div>
          </el-popover>
          <span v-if="!item.showTemp">{{ scope.row[item.prop] }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination"  @jump-page="getTabData"></pagination>
    <mortageDetail
      @closeDetail="showDetail = false"
      v-if="showDetail"
      :applicationId="applicationId"
      :editState="true"
      :detailUrl="collateralApi.uploadDetail"
      :uploadConfig='uploadConfig'>
    </mortageDetail>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import mortageDetail from './../../mortgage_review/mortageDetail';
import {collateralApi} from './../../js/server';
export default {
  data() {
    return {
      collateralApi,
      searchInfo: {
        applicationId: '',
        customerName: '',
        subCompanyId: '',
        state: 'DONE'
      },
      reviewData: [
        // {applicationId: '123', primaryProductName: '111'},
        // {applicationId: '123', primaryProductName: '111'},
        // {applicationId: '123', primaryProductName: '111'}
      ],
      tableCols: [
        { type: 'index', label: '序号' },
        // { prop: 'index', label: '序号', width: '80px' },
        { label: '一级产品', prop: 'primaryProductName' },
        { label: '申请编号', prop: 'applicationId' },
        { label: '客户姓名', prop: 'customerName' },
        { label: '合作机构', prop: 'orgName', showTemp: true },
        { label: '分公司', prop: 'subCompany' },
        { label: '个贷服务中心', prop: 'serviceName' },
        { label: '办押提交时间', prop: 'mortgageSubmitDate' },
        { label: '抵押专员', prop: 'mortgageSubmitPerson' }
      ],
      uploadConfig: {
        mortageTitle: '他项上传',
        showOtherDate: true,
        showUpload: false, // 展示他项上传
        showImg: true // 展示图片
      },
      applicationId: '',
      showDetail: false,
      subcompanyList: [], // 分公司
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    search() {
      this.getTabData(1);
    },
    clearSearch() {
      this.searchInfo = {
        applicationId: '',
        customerName: '',
        subCompanyId: '',
        state: 'DONE'
      };
    },
    getTabData(currentPage) {
      this.pageConfig.currentPage = currentPage;
      let param = Object.assign({}, this.searchInfo, {
        pageNum: this.pageConfig.currentPage,
        pageSize: this.pageConfig.pageSize
      });
      this.$MyFetch.post(collateralApi.otherList, param)
        .then(_data => {
          if (_data.list.length === 0) {
            this.$message.success('查询结果为空！');
          }
          this.pageConfig.account = _data.total;
          this.pageConfig.currentPage = _data.pageNum;
          _data.list.forEach(ele => {
            if (ele.mortgageType) {
              let numberCN = (ele.mortgageType).toCN();
              numberCN = numberCN === '一' ? '首' : numberCN;
              ele.mortgageTypeCN = `${numberCN}次提交`;
            }
          });
          this.reviewData = _data.list;
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    openDetail(row) {
      this.applicationId = row.applicationId;
      this.showDetail = true;
      console.log(row);
    },
    // 获取分公司
    getOrganizations() {
      this.$MyFetch
        .get(collateralApi.Organizations)
        .then((data = {}) => {
          this.subcompanyList = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  created() {
    this.getOrganizations();
    this.getTabData(1);
  },
  components: {
    pagination,
    mortageDetail
  }
};
</script>

<style lang="less">
  // .mortgage_review_unprocessed {
  //   .clearfix.pagination {
  //     margin-top: 30px;
  //   }
  // }
</style>
