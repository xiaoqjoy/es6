<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 946px;
      background: #fff;
      overflow-y: auto;
      max-height: 700px;
      .dialog-box__top {
        margin-bottom: 0;
      }
      .orange {
        color: #eeb658;
      }
      .product-type {
        font-size: 16px;
        color: #333;
        height: 60px;
        line-height: 60px;
        margin-left: 20px;
      }
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
      }
      .paddingleft {
        padding-left: 30px;
      }
      .mgtop {
        margin-top: 20px;
      }
      .el-form-item {
        width: 21%;
        margin-right: 30px;
      }
      .el-form-item:last-child {
        margin-right: 0;
      }
      .el-form-item .el-select {
        width: 170px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 170px;
      }
      .dialog-box__middle{
        height: 495px;
        .middle{
          .el-select{
            display: block;
          }
          .el-textarea__inner{
            background: #E5E5E5;
          }
        }
      }

      .dialog-box__middle-form{
        height: auto;
        overflow-y: auto;
        padding: 20px 0 0 0;
        background: #fff;
        .form__bottom {
          padding-bottom: 0;
          text-align: center;
        }
        .form__block{
          padding: 0;
          .message__list {
            padding: 20px;
            .title{
               color: #666;
              font-size: 14px;
            }
          }
        }
        .dialog-box__form__group {
          background: #f9fafb;
          .input-group {
            padding: 0 20px 0 20px;
          }
          .details {
            padding: 0 30px;
          }
          .dialog-box__middle-top{
            // background: #ccc;
            padding: 20px 0;
            border-bottom: 1px solid  #E9E9E9;
            .title{
              font-size: 16px;
              padding: 0 30px;
              // color: #666;
              // font-size: 14px;
              .icon__gan{
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="drop_loan exclusive_box">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">新增</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <div class="line paddingleft">
                <el-form
                :model="commonInfo"
                ref="commonInfo"
                label-width="100px"
                :rules="commonRules"
                label-position="top" >
                  <el-form-item label="合作方名称：" prop="corpName">
                    <el-select clearable v-model="commonInfo.corpName" @change="changeCorp" filterable placeholder="请选择" :disabled="disable">
                      <el-option
                        v-for="item in corp"
                        :key="item.corpCode"
                        :label="item.corpName"
                        :value="item.corpName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="合作方编号：" prop="corpCode">
                    <el-select clearable v-model="commonInfo.corpCode" @change="changeCorpCode" filterable placeholder="请选择" :disabled="disable">
                      <el-option
                        v-for="item in corp"
                        :key="item.corpCode"
                        :label="item.corpCode"
                        :value="item.corpCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="资金方名称" prop="fundCode">
                    <el-select @change="changeCondition" clearable v-model="commonInfo.fundCode" filterable placeholder="请选择" :disabled="disable">
                      <el-option
                        v-for="item in fund"
                        :key="item.fundCode"
                        :label="item.fundName"
                        :value="item.fundCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="业务模式" prop="businessCode">
                    <el-select clearable @change="changeCondition"  v-model="commonInfo.businessCode" filterable placeholder="请选择" class="multipleSel" :disabled="disable">
                      <el-option
                        v-for="item in models"
                        :key="item.businessCode"
                        :label="item.businessName"
                        :value="item.businessCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品类别" prop="productTypeCode" class="multipleSel">
                    <span class="clear-select" @click="clearSel" v-if="commonInfo.productTypeCode && commonInfo.productTypeCode.length>0">X</span>
                    <div class="mask" v-if="commonInfo.productTypeCode &&commonInfo.productTypeCode.length > 0">{{selectSpan.join(",")}}</div>
                    <el-select clearable v-model="commonInfo.productTypeCode" filterable placeholder="请选择" multiple @change="changeProduct" :disabled="disable">
                      <el-option
                        v-for="item in types"
                        :key="item.productTypeCode"
                        :label="item.productTypeName"
                        :value="item.productTypeCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div class="dialog-box__form__group">
                <p class="product-type">组合结果</p>
                <div class="form__block bg__white border__radius-5"
                v-for="(item, index) in form"
                :key="item.productTypeCode">
                  <div class="dialog-box__middle-top" v-if="item.productTypeName">
                    <h5 class="title"><span class="icon icon__gan"></span>{{ item.productTypeName }}</h5>
                  </div>
                  <ul class="message__list clearfix">
                    <li class="f__left item">
                      <h5 class="title title999">可用额度： <span class="content orange">{{ item.limitQuota }}</span></h5>
                    </li>
                  </ul>
                  <div class="details">
                    <el-form
                    :model="item"
                    :ref='"form"+index'
                    label-width="100px"
                    :rules="rules"
                    label-position="top" >
                      <div class="line">
                        <el-form-item label="本组合总额度"
                        prop="limitQuota">
                         <el-col :span="22">
                          <el-input maxlength="20" size='medium' v-model="item.limitQuota"></el-input>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="可用额度统计口径" prop="quotaType">
                          <el-select clearable v-model="item.quotaType" placeholder="请选择">
                            <el-option label="发放额" :value="1"></el-option>
                            <el-option label="余额" :value="2"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="额度生效日期" prop="startDate">
                          <el-date-picker
                            v-model="item.startDate"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :default-value="start"
                            placeholder="开始日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item  label="额度结束日期" prop="endDate">
                          <el-date-picker
                            v-model="item.endDate"
                            type="date"
                            :default-value="end"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                      <div class="line">
                        <el-form-item label="是否区分消费和经营" prop="isDistinguish">
                          <el-select clearable v-model="item.isDistinguish" placeholder="请选择">
                            <el-option label="是" :value="1"></el-option>
                            <el-option label="否" :value="0"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="本组合消费贷个人额度上限" prop="consumerQuota" v-if="item.isDistinguish==1">
                          <el-col :span="22">
                          <el-input maxlength="20" v-model="item.consumerQuota"></el-input>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="本组合经营贷个人额度上限" prop="businessQuota"  v-if="item.isDistinguish==1">
                          <el-col :span="22">
                          <el-input maxlength="20" v-model="item.businessQuota"></el-input>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="本组合个人额度上限" prop="personalQuota"  v-if="item.isDistinguish!==1">
                          <el-col :span="22">
                          <el-input maxlength="20" v-model="item.personalQuota"></el-input>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                          <el-select clearable v-model="item.status" placeholder="请选择">
                            <el-option label="可用" :value="1"></el-option>
                            <el-option label="暂停" :value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          <div class="form__bottom">
            <el-button class="add finish"  type="primary " @click="checkData('commonInfo')">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {quotaApi} from '../../js/server.js';
  import myRules from '@common/js/rules.js';
  let threeDayAfter = function () {
    var time = new Date();
    time.setFullYear(time.getFullYear() + 3);
    return time;
  };
  let defaultData = [{
    "businessQuota": "",
    "consumerQuota": "",
    "endDate": threeDayAfter(),
    "isDistinguish": "",
    "limitQuota": "",
    "personalQuota": "",
    "quotaType": "",
    "startDate": new Date(),
    "status": 1,
    productTypeCode: "",
    productTypeName: ''
  }];
  export default{
    data() {
      return {
        selectSpan: [], // 多选框蒙版
        disable: false,
        corp: [],
        types: [],
        models: [],
        fund: [],
        commonInfo: {
          productTypeCode: []
        },
        form: defaultData,
        rules: {
          endDate: [
            { required: true, message: '请选择活动结束日期', trigger: 'change' }
          ],
          limitQuota: [
            { required: true, message: '请填写额度', trigger: 'change' },
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          personalQuota: [
            { required: true, message: '请填写额度', trigger: 'change' },
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          consumerQuota: [
            { required: true, message: '请填写额度', trigger: 'change' },
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          businessQuota: [
            { required: true, message: '请填写额度', trigger: 'change' },
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          quotaType: [
            { required: true, message: '请选择额度统计口径', trigger: 'change' }
          ],
          startDate: [
            { required: true, message: '请选择活动开始日期', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        },
        commonRules: {
          // corpName: [
          //   { required: true, message: '请选择合作方名称', trigger: 'change' }
          // ],
          // corpCode: [
          //   { required: true, message: '请选择合作方编号', trigger: 'change' }
          // ],
          // fundCode: [
          //   { required: true, message: '请选择资金方名称', trigger: 'change' }
          // ],
          // businessCode: [
          //   { required: true, message: '请选择业务模式', trigger: 'change' }
          // ]
        },
        multipleSelection: [],
        start: new Date(),
        end: threeDayAfter()
      };
    },
    methods: {
      changeCondition () {
        let data = {
          businessCode: this.commonInfo.businessCode || "",
          corpCode: this.commonInfo.corpCode || "",
          fundCode: this.commonInfo.fundCode || "",
          productTypeCode: this.commonInfo.productTypeCode || []
        };
        this.disable = true;
        this.$MyFetch.post(quotaApi.ProductsElements, data)
        .then((data = {}) => {
          this.corp = data.partners;
          this.fund = data.funds;
          this.models = data.models;
          this.types = data.types;
          this.disable = false;
        })
        .catch((err) => {
          this.$error(err.message);
          this.disable = false;
        });
      },
      clearSel () {
        this.commonInfo.productTypeCode = [];
        this.form = defaultData;
        this.changeCondition();
      },
      close() {
        this.$emit('close');
      },
      getNewData() {
        this.$emit('getNewData');
      },
      getTypesName (value) {
        let arr = [];
        for (let i = 0; i < this.types.length; i++) {
          for (let k = 0; k < value.length; k++) {
            if (value[k] === this.types[i].productTypeCode) {
              arr.push(this.types[i].productTypeName);
            }
          }
        }
        return arr;
      },
      changeProduct (value) {
        this.changeCondition();
        this.selectSpan = this.getTypesName(JSON.parse(JSON.stringify(value)));
        let commonData = {
          "businessQuota": "",
          "consumerQuota": "",
          "endDate": threeDayAfter(),
          "isDistinguish": "",
          "limitQuota": "",
          "personalQuota": "",
          "quotaType": "",
          "startDate": new Date(),
          "status": 1
        };
        if (value.length === 0) {
          this.form = defaultData;
          return false;
        } else {
          let data = [];
          for (let i = 0; i < value.length; i++) {
            for (let k = 0; k < this.types.length; k++) {
              if (value[i] === this.types[k].productTypeCode) {
                data.push({productTypeCode: value[i], productTypeName: this.types[k].productTypeName});
              }
            }
          }
          for (let i = 0; i < data.length; i++) {
            for (let k = 0; k < this.form.length; k++) {
              if (data[i].productTypeCode === this.form[k].productTypeCode) {
                data[i] = {...this.form[k], ...data[i]};
                data[i].isEx = true;
              }
            }
            if (!data[i].isEx) {
              data[i] = {...commonData, ...data[i]};
            }
          }
          this.form = data;
        }
      },
      changeCorp (value) {
        for (let i = this.corp.length - 1; i >= 0; i--) {
          if (this.corp[i].corpName === value) {
            this.commonInfo.corpCode = this.corp[i].corpCode;
          }
        }
        this.changeCondition();
      },
      changeCorpCode (value) {
        for (let i = this.corp.length - 1; i >= 0; i--) {
          if (this.corp[i].corpCode === value) {
            this.commonInfo.corpName = this.corp[i].corpName;
          }
        }
        this.changeCondition();
      },
      checkData (formName) {
        let hasPass = 0;
        // this.$refs[formName].validate((valid) => {
        //   if (!valid) {
        //      hasPass += 1;
        //    }
        // });
        for (var i = 0; i < this.form.length; i++) {
          if (!this.checkForm('form' + i)) {
            hasPass += 1;
          }
        }
        if (hasPass === 0) {
          this.finish();
        } else {
          return false;
        }
      },
      checkForm (formName) {
        let hasPass = true;
        this.$refs[formName][0].validate((valid) => {
          if (!valid) {
            hasPass = false;
          }
        });
        return hasPass;
      },
      finish() {
        let data = JSON.parse(JSON.stringify(this.form));
        for (let i = 0; i < data.length; i++) {
          data[i] = {...this.commonInfo, ...data[i]};
          data[i].startDate = this.$Moment(data[i].startDate).format('YYYY-MM-DD HH:mm:ss');
          data[i].endDate = this.$Moment(data[i].endDate).format('YYYY-MM-DD HH:mm:ss');
        }

        for (let j = 0; j < data.length; j++) {
          for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].businessCode === data[j].businessCode) {
              data[j].businessName = this.models[i].businessName;
            }
          }
        }
        for (let j = 0; j < data.length; j++) {
          for (let k in data[j]) {
            if (data[j][k] === "") {
              delete data[j][k];
            }
          }
          for (let i = 0; i < this.fund.length; i++) {
            if (this.fund[i].fundCode === data[j].fundCode) {
              data[j].fundName = this.fund[i].fundName;
            }
            delete data[j].isEx;
          }
        }

        this.$confirm('确认保存修改吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$MyFetch.post(quotaApi.Groups, data)
          .then((data = {}) => {
            this.$message({
              message: '保存成功',
              center: true,
              onClose: this.getNewData()
            });
            this.close();
          })
          .catch((err) => {
            this.$error(err.message);
          });
        }).catch(() => {});
      },
      init () {
        this.changeCondition();
      }
    },
    created() {
      this.init();
    }
  };
</script>
