<template>
  <div class="ic_info third_part">
    <div class="ic_info_header">
      <h5 class="title"><span class="icon icon__gan"></span>法海信息</h5>
    </div>
    <el-form ref="personForm" :model="personSearch"
      :rules="faHaiPersonRule" :inline="true"
      :disabled="isEdit">
      <el-form-item label prop="name">
        <el-input v-model="personSearch.name" maxlength="30" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label prop="idNo">
        <el-input class="width300" v-model="personSearch.idNo" maxlength="30" placeholder="请输入身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="personBtn" @click="searchPersonList" type="primary" class="small-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="herBox">
      <el-table
        :data="personList"
        max-height="340"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        class="common__table"
        style="width: 100%">
        <el-table-column
          v-for="item in personTabList"
          :type="item.type"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="openDetail(scope.row, 'PL')"
              type="text"
              size="small"
              class="sytCBlue"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form ref="companyForm" :model="companySearch"
      :rules="faHaiCompanyRule" :inline="true"
      :disabled="isEdit" style="margin-top: 20px">
      <el-form-item label prop="name">
        <el-input class="width300" v-model="companySearch.name" placeholder="请输入单位名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="companyBtn" @click="searchCompanyList" type="primary" class="small-btn">查询</el-button>
      </el-form-item>
    </el-form>
     <div class="herBox">
      <el-table
        :data="fahaiEnterprise_T"
        max-height="340"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        class="common__table"
        style="width: 100%">
        <el-table-column
          v-for="item in companyTabList_T"
          :type="item.type"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="openDetail(scope.row, 'ET')"
              type="text"
              size="small"
              class="sytCBlue"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-table
        :data="fahaiEnterprise_L"
        max-height="340"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        class="common__table"
        style="width: 100%">
        <el-table-column
          v-for="item in companyTabList_L"
          :type="item.type"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="openDetail(scope.row, 'EL')"
              type="text"
              size="small"
              class="sytCBlue"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {faHaiApi} from './../js/server.js';
import myRules from '@common/js/rules.js';
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: '',
      faHaiPersonRule: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        idNo: [
          { required: true, message: '请填写身份证号码', trigger: 'blur' },
          { validator: myRules.identityCardRule, message: '请填写正确的身份证号码', trigger: 'blur' }
        ]
      },
      personSearch: {},
      personTabList: [
        {label: '序号', type: 'index', width: 80},
        {label: '姓名', prop: 'name', width: 200},
        {label: '身份证号码', prop: 'idNo'},
        {label: '查询数', prop: 'totalCount', width: 200},
        {label: '查询时间', prop: 'queryTime'}
      ],
      personList: [],
      companySearch: {},
      faHaiCompanyRule: {
        name: [{ required: true, message: '请填写公司名称', trigger: 'blur' }]
      },
      fahaiEnterprise_L: [],
      fahaiEnterprise_T: [],
      companyTabList_T: [
        {label: '序号', type: 'index', width: 80},
        {label: '涉税公司名称', prop: 'name'},
        {label: '查询数', prop: 'totalCount', width: 200},
        {label: '查询时间', prop: 'queryTime'}
      ],
      companyTabList_L: [
        {label: '序号', type: 'index', width: 80},
        {label: '涉诉公司名称', prop: 'name'},
        {label: '查询数', prop: 'totalCount', width: 200},
        {label: '查询时间', prop: 'queryTime'}
      ],
      personBtn: false,
      companyBtn: false
    };
  },
  methods: {
    openDetail(row, type) {
      if (!row.detail) {
        this.$message.error('无详情数据');
        return;
      }
      sessionStorage.setItem('fahaiInfoList', JSON.stringify(row.detail.allList));
      let route = this.$router.resolve({
        name: 'faHaiInfoList',
        query: {
          faHaiType: btoa(encodeURIComponent(`${type}&+&${row.name}`)),
          applicationId: this.applicationId,
          readOnlyFlag: this.isEdit
        }
      });
      window.open(route.href, '_blank');
    },
    searchPersonList() {
      if (!this.formValidate('personForm')) {
        return;
      }
      this.personBtn = true;
      let params = {
        applicationId: this.applicationId,
        dataType: 'PL',
        readOnlyFlag: this.isEdit,
        ...this.personSearch
      };
      this.searchFn(params).then(data => {
        this.personBtn = false;
        this.queryFn();
      }).catch(err => {
        this.$error(err.message);
        this.personBtn = false;
      });
    },
    queryFn() {
      let params = {
        applicationId: this.applicationId,
        readOnlyFlag: this.isEdit
      };
      const sortFn = (itemA, itemB) => {
        let date1 = new Date(itemA.queryTime.replace(/-/g, '/')).getTime();
        let date2 = new Date(itemB.queryTime.replace(/-/g, '/')).getTime();
        return date2 - date1;
      };
      this.$MyFetch.post(faHaiApi.queryApi, params).then(data => {
        this.personList = data.fahaiPerson_L;
        this.fahaiEnterprise_T = data.fahaiEnterprise_T;
        this.fahaiEnterprise_L = data.fahaiEnterprise_L;
        if (data.fahaiPerson_L instanceof Array) {
          this.personList = data.fahaiPerson_L.sort(sortFn);
        }
        if (data.fahaiEnterprise_T instanceof Array) {
          this.fahaiEnterprise_T = data.fahaiEnterprise_T.sort(sortFn);
        }
        if (data.fahaiEnterprise_L instanceof Array) {
          this.fahaiEnterprise_L = data.fahaiEnterprise_L.sort(sortFn);
        }
      });
    },
    searchFn(params) {
      return this.$MyFetch.post(faHaiApi.searchApi, params);
    },
    searchCompanyList() {
      if (!this.formValidate('companyForm')) {
        return;
      }
      let ELparams = {
        applicationId: this.applicationId,
        dataType: 'EL',
        readOnlyFlag: this.isEdit,
        ...this.companySearch
      };
      let ETparams = Object.assign({}, ELparams, {dataType: 'ET'});
      this.companyBtn = true;
      this.searchFn(ELparams).then(_data1 => {
        this.searchFn(ETparams).then(_data2 => {
          this.companyBtn = false;
          this.queryFn();
        });
      }).catch(_err => {
        this.companyBtn = false;
        this.$error(_err.message);
      });
      // let arr = [this.searchFn(ELparams), this.searchFn(ETparams)];
      // Promise.all(arr).then(dataList => {
      //   console.log(dataList);
      //   this.companyBtn = false;
      // }).catch(err => {
      //   console.log(err);
      //   this.companyBtn = false;
      // });
    },
    formValidate(name) {
      let sign = false;
      this.$refs[name].validate(valid => {
        sign = valid;
      });
      return sign;
    }
  },
  mounted() {
    this.queryFn();
  },
  computed: {
    isEdit() {
      return this.disabled;
    }
  }
};
</script>

<style lang="less">
  .third_part {
    .small-btn {
      width: 80px;
      height: 30px;
      background: #fff;
      color: #538Bf1;
      border: 1px solid #538Bf1;
      padding: 0;
      margin-top: 5px;
    }
    .el-form-item {
      width: 300px;
    }
  }
</style>
