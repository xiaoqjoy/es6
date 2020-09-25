<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">放弃贷款</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top__message__list">
          <ul class="message__list clearfix">
            <li class="f__left item">
              <h5 class="title">机构名称:</h5>
              <p class="content">{{userInfo.departmentName}}</p>
            </li>
            <li class="f__left item text__center">
              <h5 class="title">录入人:</h5>
              <p class="content">{{userInfo.userName}}</p>
            </li>
            <li class="f__left item text__right">
              <h5 class="title">录入时间:</h5>
              <p class="content">{{(new Date()).normalizeTime().strDate}}</p>
            </li>
          </ul>
        </div>
        <div class="middle">
          <el-form
            ref="ruleForm"
            :model="form"
            :rules="formRule"
            label-width="100px"
            class="demo-ruleForm"
            label-position="top">
            <el-form-item label="放弃原因" prop="abandonType">
              <el-select
                v-model="form.abandonType"
                collapse-tags
                placeholder="请选择">
                <el-option
                  v-for="item in reasonList"
                  :key="item.value"
                  :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="abandonTxt">
              <el-input type="textarea" v-model="form.abandonTxt" rows="5" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <el-button type="primary" class="button" @click="save">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {spareApi} from '../../js/server';
  import { userInfo } from '@common/js/localStorage';
  export default{
    props: ['applicationId'],
    data() {
      return {
        area: '',
        name: '',
        desc: '',
        reasonList: [],
        result: [],
        form: {
          abandonTxt: '',
          abandonType: [],
          applicationId: this.applicationId
        },
        formRule: {
          abandonType: [
            { required: true, message: '请选择原因！', trigger: 'change' }
          ]
        },
        userInfo: JSON.parse(userInfo.getUserInfo())
      };
    },
    components: {},
    methods: {
      close() {
        this.$emit('close');
      },
      getReasonList(type) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: type})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      save() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$MyFetch.post(spareApi.solving.dropLoan, this.form)
              .then((data = {}) => {
                this.confirmFn('贷款放弃成功!', 'success');
                this.close();
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          } else {
            console.log('error');
          }
        });
      }
    },
    created() {
      this.getReasonList('abandon_type').then((data) => {
        this.reasonList = data;
      });
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 570px;
      padding-bottom: 0;
      .dialog-box__middle{
        height: 495px;
        .middle{
          padding-top: 30px;
          /deep/.el-form-item{
            display: block;
            margin-right: 0;
          }
          /deep/.el-textarea__inner{
            background: rgba(229, 229, 229, 0.2);
          }
          /deep/ .el-form-item{
            margin-bottom: 40px;
          }
        }
      }
    }
  }
</style>
