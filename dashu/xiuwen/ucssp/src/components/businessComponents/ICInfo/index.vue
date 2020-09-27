<template>
  <div class="ic_info">
    <div class="ic_info_header">
      <h5 class="title"><span class="icon icon__gan"></span>工商信息</h5>
    </div>
    <div class="ic_info_top">
      <el-form ref="form" :model="form" :rules="formRule">
        <div v-if="showSpouse">
          <el-input v-model.trim="form.spouseIdNum" readonly ></el-input>
          <el-button type="primary" :disabled="!form.spouseIdNum || disabled" @click="manualQuery(form.spouseIdNum, true)">查询</el-button>
        </div>
        <div>
          <el-form-item prop="workplaceName">
            <el-input v-model="form.workplaceName" placeholder="请输入单位名称" maxlength="50"></el-input>
            <el-button type="primary" @click="manualQuery(form.workplaceName, false)" :disabled="!form.workplaceName || disabled">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="ic_info_main">
      <el-table :data="tableData"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width: 100%"
        height="400" ref="icInfoTab">
        <el-table-column
          v-for="item in tableList" :key="item.prop"
          :prop="item.prop" :label="item.label"
          :width="item.width"
          :type="item.prop">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryCompany(scope.row, true)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {baseApi} from '@common/js/server.js';
// import rules from '@common/js/rules.js';
export default {
  name: 'ICInfo',
  props: {
    showSpouse: {
      type: [Boolean, String],
      default: false
    },
    apiUrl: {
      type: Object,
      default: () => ({})
    },
    applicationId: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    routerPath: {
      type: String,
      default: ''
    },
    taskNodeCode: {
      type: String,
      default: 'faceToFaceTask'
    },
    certId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: 'ICInfo',
      tableData: [],
      tableList: [
        { prop: 'index', label: '序号', width: '50' },
        { prop: 'sourceLabel', label: '来源类型', width: '100' },
        { prop: 'taskLabel', label: '查询阶段', width: '100' },
        { prop: 'enterpriseName', label: '单位名称', width: '' },
        { prop: 'registrationNum', label: '注册号', width: '120' },
        { prop: 'legalPersonName', label: '法人', width: '80' },
        { prop: 'shareholderLabel', label: '占股人员', width: '' },
        { prop: 'enterpriseStatus', label: '经营状态', width: '120' },
        { prop: 'establishDate', label: '成立时间', width: '120' },
        { prop: 'queryDate', label: '查询时间', width: '' }
      ],
      form: {
        spouseIdNum: '',
        workplaceName: ''
      },
      formRule: {}
    };
  },
  methods: {
    // 打开新页面
    openInfo(_res) {
      localStorage.setItem('companyInfo', JSON.stringify(_res));
      let resolve = this.$router.resolve({ path: '/system/ICInfoDetail' });
      window.open(resolve.href, '_blank');
    },
    checkForm() {
      let flag = true;
      this.$refs.form.validate(_v => {
        if (!_v) {
          flag = false;
        }
      });
      return flag;
    },
    // 手动查询
    manualQuery(_name, isPersonal) {
      let name = _name.trim();
      let params = {
        applicationId: this.applicationId,
        taskNodeCode: this.taskNodeCode,
        certId: isPersonal ? name : undefined,
        entName: !isPersonal ? name : undefined
      };
      if (!isPersonal && !this.checkForm()) {
        return;
      }
      this.$MyFetch.post(this.apiUrl.manually, params).then(_res => {
        this.getAllData();
        if (!isPersonal) {
          this.openInfo(_res);
        }
      }).catch(_err => {
        this.confirmFn(_err.message, 'error');
      });
    },
    // 点击详情
    queryCompany(row, openTab) {
      let params = {
        id: row.id,
        entName: row.enterpriseName,
        registrationNum: row.registrationNum
      };
      this.$MyFetch.post(this.apiUrl.enterpriseIc, params).then(_res => {
        // 如果列表项为空的话，查询成功后刷新列表
        if (!row.legalPersonName || !row.queryDate) {
          this.getAllData();
        }
        // 打开新标签页
        this.openInfo(_res);
      }).catch(_err => {
        this.confirmFn(_err.message);
      });
    },
    // 请求列表
    getData() {
      if (!this.apiUrl.enterprise) {
        throw new Error('请求地址apiUrl为空，请确认请求地址');
      }
      let params = {
        applicationId: this.applicationId,
        taskNodeCode: this.taskNodeCode,
        readOnly: this.disabled
      };
      return this.$MyFetch.get(this.apiUrl.enterprise, params);
    },
    // 请求字典
    getDict(list, isReadonly = false) {
      let data = {
        categoryCodes: list,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    },
    // 获取全部数据
    getAllData() {
      let list = ['enterprise_source_type', 'task_def_key', 'contact_relation_code'];
      Promise.all([this.getData(), this.getDict(list, this.isDetail)]).then(res => {
        let tabData = res[0];
        this.tableData = this.tableDataHandle(tabData, res);
      }).catch(err => {
        this.confirmFn(err.message);
      });
    },
    tableDataHandle(tabData, res) {
      let contactList = res[1].contact_relation_code;
      let enterpriseList = res[1].enterprise_source_type;
      let taskList = res[1].task_def_key;
      tabData.forEach(e => {
        // 转码
        enterpriseList.some(_v => {
          if (_v.itemCode === e.sourceTypeCode) {
            e.sourceLabel = _v.itemDesc;
            return _v.itemCode === e.sourceTypeCode;
          }
        });
        taskList.some(_v => {
          if (_v.itemCode === e.taskNode) {
            e.taskLabel = _v.itemDesc;
            return _v.itemCode === e.taskNode;
          }
        });
        if (e.shareholderType) {
          const temp = e.shareholderType.map(_v => {
            let a;
            contactList.some(_o => {
              if (_o.itemCode === _v) {
                a = _o.itemDesc;
              }
            });
            return a;
          });
          e.shareholderLabel = temp.join('/');
        }
      });
      return tabData;
    }
  },
  mounted() {
    this.getAllData();
    console.log(this.certId);
  },
  watch: {
    certId: {
      handler(_new, _old) {
        this.form.spouseIdNum = _new;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less">
  .ic_info {
    > .ic_info_header {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e9e9e9;
      .title {
        .icon.icon__gan {
          margin-right: 10px;
        }
      }
    }
  }
  .ic_info > .ic_info_top {
    form.el-form {
      > div {
        width: 100%;
        text-align: left;
        height: 50px;
        vertical-align: baseline;
        > div.el-form-item {
          display: block;
        }
        .el-input {
          width: 50%;
        }
      }
      > div:last-child {
        height: 65px;
      }
    }
  }
</style>
