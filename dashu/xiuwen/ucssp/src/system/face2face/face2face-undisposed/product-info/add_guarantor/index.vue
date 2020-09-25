<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">担保人信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              :rules="rules"
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top" :disabled="isDetail" >
              <div class="form__block bg__white border__radius-5" >
                <div class="dialog-box__middle-top">
                  <h5 class="title"><span class="icon icon__gan"></span>基本信息</h5>
                </div>
                <ul class="message__list clearfix" v-if="guarantorId">
                  <li class="f__left item">
                    <h5 class="title">担保号：</h5>
                    <p class="content">{{ guarantorId }} </p>
                  </li>
                </ul>
                <div class="dialog-box__form__group">
                  <el-form-item label="房产证号" prop="estateNum">
                    <el-select v-model="form.estateNum" placeholder="请选择" :disabled="!!guarantorId">
                      <el-option
                        v-for="(item, index) in houseIdList"
                        :key="index"
                        :label="item"
                        :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="担保人姓名" prop="guaranteeName">
                    <el-input v-model="form.guaranteeName" maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="certificateTypeCode">
                    <el-select v-model="form.certificateTypeCode" placeholder="请选择">
                      <el-option
                        v-for="(item, index) in certificateTypeCodeLibrary"
                        :key="index"
                        :value="item.itemCode"
                        :label="item.itemDesc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码"
                                prop="certificateNum">
                    <el-input v-model="form.certificateNum"></el-input>
                  </el-form-item>
                  <el-form-item label="担保人联系手机" prop="contactNum">
                    <el-input v-model="form.contactNum"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭固话国际区号" prop="houseInternationalCode">
                    <el-input v-model="form.houseInternationalCode"></el-input>
                  </el-form-item>
                  <el-form-item label="区号" prop="houseAreaNum">
                    <el-input v-model="form.houseAreaNum"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="housePhoneNum">
                    <el-input v-model="form.housePhoneNum"></el-input>
                  </el-form-item>
                  <el-form-item label="分机" prop="houseBranchNum">
                    <el-input v-model="form.houseBranchNum"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭住址" prop="houseAddress">
                    <el-input v-model="form.houseAddress" maxlength="100"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form__block bg__white border__radius-5" >
                <div class="dialog-box__middle-top">
                  <h5 class="title"><span class="icon icon__gan"></span>单位信息</h5>
                </div>
                <div class="dialog-box__form__group mgtop">
                  <el-form-item label="单位联系人姓名" prop="workContractName" >
                    <el-input v-model="form.workContractName" maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="单位名称" prop="workplaceName" >
                    <el-input v-model="form.workplaceName" maxlength="100"></el-input>
                  </el-form-item>
                  <el-form-item label="单位电话国际区号" prop="workInternationalCode">
                    <el-input v-model="form.workInternationalCode"></el-input>
                  </el-form-item>
                  <el-form-item label="区号" prop="workAreaNum">
                    <el-input v-model="form.workAreaNum"></el-input>
                  </el-form-item>
                  <el-form-item label="单位电话" prop="workPhoneNum">
                    <el-input v-model="form.workPhoneNum"></el-input>
                  </el-form-item>
                  <el-form-item label="单位分机" prop="workBranchNum">
                    <el-input v-model="form.workBranchNum"></el-input>
                  </el-form-item>
                  <el-form-item label="单位地址" prop="workAddress">
                    <el-input v-model="form.workAddress" maxlength="100"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form__bottom" v-if="!isDetail">
                <el-button type="primary" @click="finish" class="width200">完成</el-button>
              </div>
            </el-form>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import myRule from '@common/js/rules';
  import '@common/css/dialog';
  import {baseApi} from '../../../js/server.js';
  export default{
    props: {
      applicationId: {
        type: String,
        default: () => {
          return '';
        }
      },
      houseIdList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      guarantorId: {
        default: () => {
          return '';
        }
      },
      houseId: {
        default: () => {
          return '';
        }
      },
      isDetail: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        certificateTypeCodeLibrary: [],
        form: {
          houseInternationalCode: '',
          houseBranchNum: '',
          workBranchNum: '',
          estateNum: this.houseId
        },
        rules: {
          estateNum: [
            { required: true, message: '请选择对应房产证编号', trigger: 'change' }
          ],
          guaranteeName: [
            { required: true, message: '请填写担保人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { validator: this.checkCard, trigger: 'blur' }
          ],
          contactNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ],
          houseInternationalCode: [
            { validator: myRule.houseInternationalCode1, trigger: 'blur' }
          ],
          houseAreaNum: [
            { required: true, message: '请填区号', trigger: 'blur' },
            { validator: myRule.areaNumRule, trigger: 'blur' }
          ],
          housePhoneNum: [
            { required: true, message: '请填写电话', trigger: 'blur' },
            { validator: myRule.fix_only_phoneRule, trigger: 'blur' }
          ],
          houseBranchNum: [
            { validator: myRule.nonNegative, trigger: 'blur' }
          ],
          houseAddress: [
            { required: true, message: '请填写家庭住址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          workContractName: [
            { required: true, message: '请填写单位联系人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          workplaceName: [
            { required: true, message: '请填写单位名称', trigger: 'blur' },
            { validator: myRule.companyNameRule, trigger: "blur" }
          ],
          workInternationalCode: [
            { required: true, message: '请填写单位电话国际区号', trigger: 'blur' },
            { validator: myRule.internationalCode, trigger: 'blur' }
          ],
          workAreaNum: [
            { required: true, message: '请填写电话区号', trigger: 'blur' },
            { validator: myRule.areaNumRule, trigger: 'blur' }
          ],
          workPhoneNum: [
            { required: true, message: '请填写单位电话', trigger: 'blur' },
            { validator: myRule.fix_only_phoneRule, trigger: 'blur' }
          ],
          workBranchNum: [
            { validator: myRule.nonNegative, trigger: 'blur' }
          ],
          workAddress: [
            { required: true, message: '请填单位地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: "blur" }
          ]
        },
        dCode: this.$getCodeDependent()
      };
    },
    created() {
      if (this.guarantorId) {
        this.getGuarantee(this.guarantorId);
      }
      this.$getDictCode('certificate_type_code')
        .then(data => {
          this.certificateTypeCodeLibrary = data;
        });
    },
    methods: {
      close() {
        this.$emit('close');
      },
      finish() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = this.form;
            data.applicationId = this.applicationId;
            if (!this.guarantorId) {
              this.addGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('新增成功！', 'success');
                  this.close();
                });
            } else {
              this.editGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('编辑成功！', 'success');
                  this.close();
                });
            }
          } else {
            console.log('error');
          }
        });
      },
      addGuaranteeApi(data) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(baseApi.completeProduct.addGuarantee, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              console.log(err);
              this.confirmFn(err.message, 'error');
            });
        });
      },
      editGuaranteeApi(data) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(baseApi.completeProduct.editGuarantee, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              console.error(err);
              this.confirmFn(err.message, 'error');
            });
        });
      },
      getGuarantee(id) {
        this.$MyFetch.get(baseApi.completeProduct.getGuarantee + id)
          .then((data = {}) => {
            this.form = Object.assign({}, data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, 'error');
          });
      },
      // 验证件号
      checkCard(rule, value, callback) {
        if (!this.form.certificateTypeCode) {
          callback(new Error('请先选择证件类型！'));
        } else if (!value) {
          callback(new Error('请填写证件号码！'));
        } else if (this.form.certificateTypeCode === this.dCode.certificateTypeCode.ID) {
          myRule.identityCardRule(rule, value, callback);
        } else {
          myRule.otherCardRule(rule, value, callback);
        }
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 916px;
      .mgtop {
        margin-top: 20px;
      }
      .dialog-box__middle-form{
        height: 542px;
        overflow-y: auto;
        padding: 0 20px;
        .form__block{
          padding: 20px 30px;
          margin-bottom: 20px;
          box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
          .dialog-box__middle-top{
            padding-bottom: 20px;
            border-bottom: 1px solid  #E9E9E9;
            .title{
              font-size: 16px;
              .icon__gan{
                margin-right: 10px;
              }
            }
          }
          .message__list{
            padding-top: 20px;
            .item{
              margin-right: 60px;
              font-size: 0;
              .title{
                display: inline-block;
                margin-right: 5px;
                font-size: 14px;
                color: #666;
              }
              .content{
                font-size: 14px;
                display: inline-block;
              }
            }
            .item:last-child{
              margin-right: 0;
            }
          }
          .dialog-box__form__group{
            margin-top: 20px;
             margin-right: -40px;
             font-size:0;
            .el-form-item {
              width: 33.333%;
              margin-right: 0;
              padding-right: 40px;
            }
         }
        }
        .form__bottom{
          text-align: center;
          padding-bottom: 20px;
        }
      }
    }
  }
</style>
