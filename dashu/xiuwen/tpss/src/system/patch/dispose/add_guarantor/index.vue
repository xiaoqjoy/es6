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
                    <h5 class="title">担保人编号：</h5>
                    <p class="content">{{ guarantorId }}</p>
                  </li>
                </ul>
                <div class="dialog-box__form__group">
                  <el-form-item label="担保房产" prop="estateNum">
                    <el-select v-model="form.estateNum" placeholder="请选择" :disabled="!!guarantorId">
                      <el-option
                        v-for="(item, index) in estate"
                        :key="index"
                        :label="item.addressDesc"
                        :value="item.estateNum"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="担保人姓名" prop="guaranteeName">
                    <el-input maxlength="30" v-model="form.guaranteeName" :disabled="!!hasSubmit"></el-input>
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
                <div>
                  <!-- {{form['certificateNum' + ((form.certificateTypeCode) ? form.certificateTypeCode : '')]}} -->
                </div>
              </div>
              <div class="form__block bg__white border__radius-5" >
                <div class="dialog-box__middle-top">
                  <h5 class="title"><span class="icon icon__gan"></span>单位信息</h5>
                </div>
                <div class="dialog-box__form__group mgtop">
                  <el-form-item label="单位联系人姓名" prop="workContractName">
                    <el-input v-model="form.workContractName" :disabled="!!hasSubmit"></el-input>
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
                    <el-input v-model="form.workBranchNum" :disabled="!!hasSubmit" maxlength="50"></el-input>
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
  import {patchApi} from '../../js/server.js';
  export default{
    props: [ 'applicationId', 'houseIdList', 'guarantorId', 'houseId', 'hasSubmit', 'guarantorMsg', 'estate', 'estateNum', 'siTaskId', 'getPatchReview', 'guarantorIndex', 'siBusinessId' ],
    updated() {
      console.log(this.form);
    },
    data() {
      return {
        certificateTypeCodeLibrary: [],
        id: '10021',
        showabc: true,
        form: {
          houseInternationalCode: '',
          workInternationalCode: '',
          houseBranchNum: '',
          workBranchNum: '',
          estateNum: this.estateNum,
          certificateTypeCode: '',
          certificateNum: '',
          certificateNum01: '',
          certificateNum02: "",
          certificateNum03: '',
          certificateNum04: '',
          certificateNum05: ''
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
            // { validator: myRule.officialCardRule, trigger: 'blur' }
          ],
          certificateNumInd06: [
            { required: true, message: '请填写港澳居民来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
            // { validator: myRule.HKMCardRule, trigger: 'blur' }
          ],
          certificateNumInd07: [
            { required: true, message: '请填写台湾同胞来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
            // { validator: myRule.TWCardRule, trigger: 'blur' }
          ],
          certificateNumInd15: [
            { required: true, message: '请填写护照号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
            // { validator: myRule.passportRule, trigger: 'blur' }
          ],
          contactNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ],
          houseInternationalCode: [
            // { validator: myRule.houseInternationalCode, trigger: 'blur' }
            { validator: (rule, value, callback) => {
              const valReg = /^[\d-]{0,10}$/gi;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写正确的单位电话国际区号'));
              } else {
                callback();
              }
            },
              trigger: 'blur' }
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
             { validator: myRule.number, trigger: 'blur' }
          ],
          houseAddress: [
            { required: true, message: '请填家庭住址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          workContractName: [
            { required: true, message: '请填写单位联系人姓名', trigger: 'blur' },
           { validator: (rule, value, callback) => {
              const valReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·]{1,30}$/gi;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请输入正确的单位联系人姓名'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
          ],
          workplaceName: [
            { required: true, message: '请填写单位名称', trigger: 'blur' },
            { validator: myRule.companyNameRule, trigger: 'blur' }
          ],
          workInternationalCode: [
            // { required: true, message: '请填写单位电话国际区号', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              const valReg = /^[\d-]{0,10}$/gi;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写正确的单位电话国际区号'));
              } else {
                callback();
              }
            },
              trigger: 'blur' }
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
             { validator: myRule.number, trigger: 'blur' }
          ],
          workAddress: [
            { required: true, message: '请填单位地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      console.log(this.form, '复制前');
      if (this.guarantorId) {
        this.getPatchReviewA(this.guarantorIndex);
        // this.form = JSON.parse(JSON.stringify(this.guarantorMsg));
        // this.form = this.guarantorMsg;
        // this.form['certificateNum' + this.form.certificateTypeCode] = this.form.certificateNum;
        // this.form['certificateNum' + this.form.certificateTypeCode] = this.form.certificateNum;
      }
      this.getLibraryApi('certificate_type_code')
        .then(data => {
          this.certificateTypeCodeLibrary = data;
        });
      // console.log(this.form, '复制后1');
    },
    methods: {
      // 获取字典下拉
      getLibraryApi(name) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(patchApi.commonSelect, {categoryCode: name, getAll: this.hasSubmit})
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      // 获取信息
      getPatchReviewA(index) {
        return new Promise((resolve, reject) => {
          let data = {
          siBusinessId: this.siBusinessId,
          siTaskId: this.siTaskId
        };
        this.$MyFetch.get(patchApi.dispose.patchReview, data)
        .then(data => {
          data.estateGuarantee[index]['certificateNum' + data.estateGuarantee[index].certificateTypeCode] = data.estateGuarantee[index].certificateNum;
          this.form = Object.assign({}, data.estateGuarantee[index]);
        })
        .catch(err => {
          this.$error(err.message);
        });
        });
      },
      close() {
        this.form = {};
        this.$emit('close');
      },
      finish() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = this.form;
            data.applicationId = this.applicationId;
            data.certificateNum = this.form['certificateNum' + this.form.certificateTypeCode];
            data.id = this.guarantorId;
            data.siTaskId = this.siTaskId;
            data.houseInternationalCode = this.form.houseInternationalCode;
            data.workInternationalCode = this.form.workInternationalCode;
            if (!this.guarantorId) {
              this.addGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('新增成功！');
                  this.getPatchReview();
                  this.close();
                });
            } else {
              this.editGuaranteeApi(data)
                .then(() => {
                  this.confirmFn('编辑成功！');
                  this.getPatchReview();
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
          this.$MyFetch.post(patchApi.dispose.guarantees, data)
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
          this.$MyFetch.put(patchApi.dispose.guarantees, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.$error(err.message);
            });
        });
      },
      getGuarantee(id) {
        // this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getGuarantee + id)
        //   .then((data = {}) => {
          // data['certificateNum' + data.certificateTypeCode] = data.certificateNum;
            // this.form['certificateNum' + this.form.certificateTypeCode] = this.form.certificateNum;
        //     this.form = Object.assign({}, data);
        //   })
        //   .catch(err => {
        //     this.$error(err.message);
        //   });
      },
      acs() {
        this.showabc = false;
        // let prop = 'certificateNum' + this.form.certificateTypeCode;
        // let val = this.form['certificateNum' + this.form.certificateTypeCode];
        // this.$set(this.form, 'certificateNum' + this.form.certificateTypeCode, val);
        // console.log(this.form['certificateNum' + this.form.certificateTypeCode]);
        // console.log('certificateNum' + this.form.certificateTypeCode);
        // this.$refs.form.validateField('certificateNum');
        // this.$refs.form.validateField('certificateNum01');
        this.$refs.form.validateField('certificateNum02');
        // this.$refs.form.validateField('certificateNum03');
        // this.$refs.form.validateField('certificateNum04');
        // this.$refs.form.validateField('certificateNum05');
        this.showabc = true;
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
                color: #999;
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
