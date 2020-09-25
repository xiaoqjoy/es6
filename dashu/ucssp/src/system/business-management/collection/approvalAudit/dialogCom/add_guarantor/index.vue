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
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5" >
                <div class="dialog-box__middle-top">
                  <h5 class="title"><span class="icon icon__gan"></span>基本信息</h5>
                </div>
                <ul class="message__list clearfix" v-if="guarantorId">
                  <li class="f__left item">
                    <h5 class="title">担保号：</h5>
                    <p class="content">{{ guarantorId }}</p>
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
                    <el-input v-model="form.guaranteeName" maxlength="30" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="certificateTypeCode">
                    <el-select v-model="form.certificateTypeCode" placeholder="请选择" :disabled="!!hasSubmit">
                      <el-option
                        v-for="(item, index) in certificateTypeCodeLibrary"
                        :key="index"
                        :value="item.itemCode"
                        :label="item.itemDesc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码"
                                :prop="'certificateNum' + ((form.certificateTypeCode) ? form.certificateTypeCode : '')">
                    <el-input v-model="form['certificateNum' + ((form.certificateTypeCode) ? form.certificateTypeCode : '')]" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="担保人联系手机" prop="contactNum">
                    <el-input v-model="form.contactNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭固话国际区号" prop="houseInternationalCode">
                    <el-input v-model="form.houseInternationalCode" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="区号" prop="houseAreaNum">
                    <el-input v-model="form.houseAreaNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="housePhoneNum">
                    <el-input v-model="form.housePhoneNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="分机" prop="houseBranchNum">
                    <el-input v-model="form.houseBranchNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭住址" prop="houseAddress">
                    <el-input maxlength="100" v-model="form.houseAddress" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form__block bg__white border__radius-5" >
                <div class="dialog-box__middle-top">
                  <h5 class="title"><span class="icon icon__gan"></span>单位信息</h5>
                </div>
                <div class="dialog-box__form__group mgtop">
                  <el-form-item label="单位联系人姓名" prop="workContractName">
                    <el-input maxlength="30" v-model="form.workContractName" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="单位名称" prop="workplaceName">
                    <el-input maxlength="100" v-model="form.workplaceName" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="单位电话国际区号" prop="workInternationalCode">
                    <el-input v-model="form.workInternationalCode" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="区号" prop="workAreaNum">
                    <el-input v-model="form.workAreaNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="单位电话" prop="workPhoneNum">
                    <el-input v-model="form.workPhoneNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="单位分机" prop="workBranchNum">
                    <el-input v-model="form.workBranchNum" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                  <el-form-item label="单位地址" prop="workAddress">
                    <el-input v-model="form.workAddress" maxlength="100" :disabled="!!hasSubmit"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form__bottom">
                <el-button type="primary" @click="finish" class="width200" :disabled="!!hasSubmit">完成</el-button>
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
  import { aprAudApi } from '../../../../js/server';
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
      hasSubmit: {
        default: () => {
          return false;
        }
      }
    },
    data() {
      return {
        certificateTypeCodeLibrary: [],
        id: '10021',
        form: {
          houseInternationalCode: '',
          houseBranchNum: '',
          workBranchNum: '',
          estateNum: this.houseId
        },
        rules: {
          estateNum: [
            { required: true, message: '请选择对应房产证编号', trigger: 'blur' }
          ],
          guaranteeName: [
            { required: true, message: '请填写担保人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '请先选择证件类型', trigger: 'blur' }
          ],
          certificateNumInd01: [
            { required: true, message: '请填身份证号', trigger: 'blur' },
            { validator: myRule.identityCardRule, trigger: 'blur' }
          ],
          certificateNumInd04: [
            { required: true, message: '请填写军官证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd06: [
            { required: true, message: '请填写港澳居民来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd07: [
            { required: true, message: '请填写台湾同胞来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd15: [
            { required: true, message: '请填写护照号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
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
            { validator: myRule.fix_phoneRule, trigger: 'blur' }
          ],
          houseBranchNum: [
            { validator: myRule.nonNegative, trigger: 'blur' }
          ],
          houseAddress: [
            { required: true, message: '请填家庭住址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          workContractName: [
            { required: true, message: '请填写单位联系人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          workplaceName: [
            { required: true, message: '请填写单位名称', trigger: 'blur' },
            { validator: myRule.companyNameRule, trigger: 'blur' }
          ],
          workInternationalCode: [
            { required: true, message: '请填写单位电话国际区号', trigger: 'blur' },
            { validator: myRule.houseInternationalCode1, trigger: 'blur' }
          ],
          workAreaNum: [
            { required: true, message: '请填写电话区号', trigger: 'blur' },
            { validator: myRule.areaNumRule, trigger: 'blur' }
          ],
          workPhoneNum: [
            { required: true, message: '请填写单位电话', trigger: 'blur' },
            { validator: myRule.fix_phoneRule, trigger: 'blur' }
          ],
          workBranchNum: [
            { validator: myRule.nonNegative, trigger: 'blur' }
          ],
          workAddress: [
            { required: true, message: '请填单位地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      if (this.guarantorId) {
        this.getGuarantee(this.guarantorId);
      }
      this.getLibraryApi('certificate_type_code')
        .then(data => {
          this.certificateTypeCodeLibrary = data;
        });
    },
    methods: {
      // 获取字典下拉
      getLibraryApi(name) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(aprAudApi.commonSelect, {categoryCode: name, getAll: this.hasSubmit})
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      close() {
        this.$emit('close');
      },
      finish() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = this.form;
            data.applicationId = this.applicationId;
            data.certificateNum = this.form['certificateNum' + this.form.certificateTypeCode];
            if (!this.guarantorId) {
              this.addGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('新增成功！');
                  this.close();
                });
            } else {
              this.editGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('编辑成功！');
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
          this.$MyFetch.post(aprAudApi.completeProduct.addGuarantee, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.$error(err.message);
            });
        });
      },
      editGuaranteeApi(data) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(aprAudApi.completeProduct.editGuarantee, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.$error(err.message);
            });
        });
      },
      getGuarantee(id) {
        this.$MyFetch.get(aprAudApi.completeProduct.getGuarantee + id)
          .then((data = {}) => {
            data['certificateNum' + data.certificateTypeCode] = data.certificateNum;
            this.form = Object.assign({}, data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 916px;
      .complete-product{
        text-align: left;
      }
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
          box-shadow: 0 2px 6px 0 #d0d0d0;
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
