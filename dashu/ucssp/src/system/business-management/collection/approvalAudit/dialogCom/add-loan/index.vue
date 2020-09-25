<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">新增共借人信息</h5>
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
                <div class="dialog-box__form__group">
                  <el-form-item label="共有借款人姓名" prop="coborrowerName">
                    <el-input v-model="form.coborrowerName" maxlength="40" placeholder="请填写"></el-input>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="certificateTypeCode">
                    <el-select v-model="form.certificateTypeCode" placeholder="请选择">
                      <el-option
                        v-for="(item, index) in certificateType"
                        :key="index"
                        :value="item.itemCode"
                        :label="item.itemDesc"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" prop="certificateNum">
                    <el-input v-model="form.certificateNum" maxlength="40" placeholder="请填写"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式（手机）" prop="mobileNum">
                    <el-input v-model="form.mobileNum" maxlength="11" placeholder="请填写"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位" prop="workplaceName">
                    <el-input v-model="form.workplaceName" maxlength="100" placeholder="请填写"></el-input>
                  </el-form-item>
                  <el-form-item label="单位详细地址" prop="workAddressDesc">
                    <el-input v-model="form.workAddressDesc" maxlength="100" placeholder="请填写"></el-input>
                  </el-form-item>
                  <el-form-item label="详细居住地址" prop="houseAddressDesc">
                    <el-input v-model="form.houseAddressDesc" maxlength="200" placeholder="请填写"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form__bottom">
                <el-button type="primary" @click="finish" class="width200">确认</el-button>
              </div>
            </el-form>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import myRule from '@common/js/rules';
  import { aprAudApi } from '../../../../js/server';
  import { mapGetters } from "vuex";
  export default{
    props: {
      applicationId: String,
      row: Object
    },
    computed: {
      ...mapGetters([
        'certificateType'
      ])
    },
    data() {
      let checkCertificateNum = (rule, value, callback) => {
        if (this.form.certificateTypeCode === "Ind01") {
          myRule.identityCardRule(rule, value, callback);
        } else {
          myRule.otherCardRule(rule, value, callback);
        }
      };
      return {
        form: this.row,
        rules: {
          coborrowerName: [
            { required: true, message: '请填写共有借款人姓名', trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkCertificateNum, trigger: 'blur' }
          ],
          mobileNum: [
            { required: true, message: '请填写联系方式（手机）', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ],
          workplaceName: [
            { required: true, message: '请填写工作单位', trigger: 'blur' }
          ],
          workAddressDesc: [
            { required: true, message: '请填写单位详细地址', trigger: 'blur' }
          ],
          houseAddressDesc: [
            { required: true, message: '请填写详细居住地址', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      finish() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let form = Object.assign({}, this.form, {
              applicationId: this.applicationId
            });
            this.$MyFetch.post(aprAudApi.dadao.saveAplCoborrowerInfo, form)
            .then((data) => {
              this.$emit("add-loan", this.form);
              this.close();
            }).catch((e) => {
              this.$error(e);
            });
          }
        });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 770px;
      height: 590px;
      .complete-product{
        text-align: left;
      }
      .mgtop {
        margin-top: 20px;
      }
      .dialog-box__middle-form{
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
              width: 340px;
              margin-right: 0;
              padding-right: 30px;
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
