<template>
  <div class="page">
    <div class="page-content">
      <el-form :inline="true"
               :model="queryData"
               ref="checkForm"
               :rules="rules"
               class="demo-form-inline">
        <el-form-item prop="custName">
          <el-input v-model="queryData.custName" placeholder="客户姓名" class="width200"></el-input>
        </el-form-item>
        <el-form-item prop="primaryProductCode">
          <el-select
            v-model="queryData.primaryProductCode"
            collapse-tags
            class="width200"
            clearable
            placeholder="一级产品">
            <el-option
              v-for="(item, index) in library.primaryProductCode"
              :key="index"
              :label="item.codeText"
              :value="item.codeValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="certificateType">
          <el-select
            v-model="queryData.certificateType"
            collapse-tags
            class="width200"
            clearable
            placeholder="证件类型">
            <el-option
              v-for="(item, index) in library.certificateType"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="certificateNum">
          <el-input v-model="queryData.certificateNum" placeholder="证件号码" class="width200"></el-input>
        </el-form-item>
        <el-form-item prop="orgId">
          <el-select
            v-model="queryData.orgId"
            collapse-tags
            class="width200"
            clearable
            placeholder="意向合作机构">
            <el-option
              v-for="(item, index) in library.orgId"
              :key="index"
              :label="item.partnerName"
              :value="item.partnerCd"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ul class="result__list clearfix">
        <li class="item f__left clearfix">
          <h5 class="title f__left">在贷余额:</h5>
          <p class="content f__left font__yellow"></p>
        </li>
        <li class="item f__left clearfix">
          <h5 class="title f__left">可贷余额:</h5>
          <p class="content f__left font__yellow">{{avaBalance}}</p>
        </li>
      </ul>
      <el-button type="primary" @click="checkData" class="button width100 button__blue">查询</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from './js/server';
  import { fileCos } from '../../common/js/fileCos.js';
  export default{
    data() {
      return {
        queryData: {
          custName: '',
          primaryProductCode: '',
          certificateType: '',
          certificateNum: '',
          orgId: ''
        },
        library: {
          certificateType: [],
          primaryProductCode: [],
          orgId: []
        },
        rules: {
          certificateType: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { validator: this.checkCertificateNum, trigger: 'blur' }
          ],
          orgId: [
            { required: true, message: '请选择合作机构', trigger: 'change' }
          ]
        },
        avaBalance: 0
      };
    },
    created() {
      // 查询一级产品项
      this.queryApi(api.productList)
        .then(data => {
          this.library.primaryProductCode = data;
        });
      // 查询证件类型项
      this.queryApi(api.querySysDictItem)
        .then(data => {
          this.library.certificateType = data;
        });
      // 查询合作机构项
      this.queryApi(api.partnerList, {}, 'post')
        .then(data => {
          this.library.orgId = data;
        });
    },
    methods: {
      // 按钮点击查询
      checkData() {
        let hasPass = 0;
        this.$refs.checkForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        if (((this.queryData.primaryProductCode === '040') && (this.queryData.certificateType !== 'Ent02')) || ((this.queryData.primaryProductCode !== '040') && (this.queryData.certificateType === 'Ent02'))) {
          this.confirmFn('一级产品和证件类型冲突！', 'error');
          hasPass += 1;
        }
        if (!hasPass) {
          this.queryApi(api.check, this.queryData, 'post')
            .then(data => {
              this.confirmFn(data.message, 'success');
              this.avaBalance = data.avaBalance;
            });
        }
      },
      // 查询
      queryApi(url, parameter = null, method = 'get') {
        return new Promise((resolve) => {
          this.$MyFetch[method](url, parameter)
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // 证件类型校验
      checkCertificateNum(rule, value, callback) {
        let valReg;
        const valReg2 = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/; // 营业执照
        let errMsg = '请输入正确的';
        switch (this.queryData.certificateType) {
          case 'Ind01':
            errMsg += '身份证';
            valReg = fileCos.checkIdcard(value);
            break;
          case 'Ent02':
            errMsg += '营业执照';
            valReg = valReg2.test(value);
            break;
          default:
            break;
        }
        if (!this.queryData.certificateType) {
          callback(new Error('请先选择证件类型！'));
        } else if (!value) {
          callback(new Error('请填写证件号码'));
        } else if (!valReg) {
          callback(new Error(errMsg));
        } else {
          callback();
        }
      }
    },
    components: {}
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page{
    padding: 20px;
    .page-content{
      min-height: 820px;
      position: relative;
      .boxShadow(20px,31px);
      .result__list{
        padding-bottom: 40px;
        font-size: 14px;
        .item{
          min-width: 220px;
          .title{
            min-width: 70px;
          }
          .content{
            min-width: 150px;
          }
        }
      }
    }
  }
</style>
