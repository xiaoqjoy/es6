<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    /deep/ .el-input--prefix .el-input__inner{
      padding-left: 8px;
    }
    .dialog-box{
      width: 945px;
      background: #fff;
      .message__list{
        .item{
          width: 33.3%;
          padding-bottom: 14px;
          font-size: 14px;
          line-height: 20px;
          .title{
            display: inline-block;
            padding-right: 10px;
            color: #666;
            font-weight: normal;
          }
          .content{
            display: inline-block;
          }
        }
      }
      .dialog-box__top {
        margin-bottom: 0;
      }
      .orange {
        color: #eeb658;
      }
      .product-type {
        font-size: 16px;
        color: #000;
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
            background: #d0d0d0;
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
          }
        }
        .dialog-box__form__group {
          background: #ececec;
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
        <h5 class="title_type">配置</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="config"
            ref="config"
            label-width="100px"
            :rules="rules"
            label-position="top" >
            <div class="form__block bg__white border__radius-5" >
              <ul class="message__list clearfix">
                <li class="f__left item">
                  <h5 class="title">合作方名称：</h5>
                  <span class="content">{{ config.corpName }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">合作方编号：</h5>
                  <span class="content">{{ config.corpCode }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">资金方：</h5>
                  <span class="content">{{ config.fundName }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">业务模式：</h5>
                  <span class="content">{{ config.businessName }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">产品类型：</h5>
                  <span class="content">{{ config.productTypeName }}</span>
                </li>
              </ul>
              <div class="dialog-box__form__group">
                <p class="product-type">组合结果</p>
                <div class="form__block bg__white border__radius-5" >
                  <div class="dialog-box__middle-top" v-if="config.productTypeName">
                    <h5 class="title"><span class="icon icon__gan"></span>{{ config.productTypeName }}</h5>
                  </div>
                  <ul class="message__list clearfix">
                    <li class="f__left item">
                      <h5 class="title">可用额度： <span class="content orange">{{ config.available }}</span></h5>
                    </li>
                  </ul>
                  <div class="details">
                    <div class="line">
                      <el-form-item label="本组合总额度" prop="limitQuota">
                        <el-col :span='22'>
                        <el-input maxlength="20" v-model="config.limitQuota" @blur="loseBlur"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="可用额度统计口径" prop="quotaType">
                        <el-select clearable v-model="config.quotaType" @change="changeType" placeholder="请选择">
                          <el-option label="发放额" :value="1"></el-option>
                          <el-option label="余额" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="额度生效日期" prop="startDate" class="date">
                        <el-date-picker
                          v-model="config.startDate"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="额度结束日期" prop="endDate">
                        <el-date-picker
                          v-model="config.endDate"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <div class="line">
                      <el-form-item label="是否区分消费和经营" prop="isDistinguish">
                        <el-select clearable v-model="config.isDistinguish" placeholder="请选择">
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="0"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="本组合消费贷个人额度上限" prop="consumerQuota" v-if="config.isDistinguish==1">
                         <el-col :span='22'>
                        <el-input maxlength="20" v-model="config.consumerQuota"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="本组合经营贷个人额度上限" prop="businessQuota" maxlength="20"  v-if="config.isDistinguish==1">
                         <el-col :span='22'>
                        <el-input v-model="config.businessQuota"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="本组合个人额度上限" prop="personalQuota"  v-if="config.isDistinguish!==1">
                         <el-col :span='22'>
                        <el-input maxlength="20" v-model="config.personalQuota"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="状态" prop="status">
                        <el-select clearable v-model="config.status" placeholder="请选择">
                          <el-option label="可用" :value="1"></el-option>
                          <el-option label="暂停" :value="0"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish"  type="primary " @click="finish('config')">确认</el-button>
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
  export default{
    data() {
      return {
        // id: '10021',
        config: {},
        rules: {
          endDate: [
            { required: true, message: '请选择活动结束日期', trigger: 'change' }
          ],
          limitQuota: [
            { required: true, message: '请填写额度', trigger: 'change' },
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          consumerQuota: [
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          businessQuota: [
            { validator: myRules.nonNegative1, trigger: 'blur' }
          ],
          personalQuota: [
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
        multipleSelection: []
      };
    },
    props: {
      data: Object
    },
    methods: {
      loseBlur (event) {
        let limitQuota = event.target.value;
        let json = JSON.parse(JSON.stringify(this.config));
        if (json.quotaType === 1) {
          json.available = limitQuota - json.grantQuota;
        } else {
          json.available = limitQuota - json.grantQuota + json.repaymentQuota;
        }
        this.config = json;
      },
      changeType (value) {
        let json = JSON.parse(JSON.stringify(this.config));
        if (value === 1) {
          json.available = json.limitQuota - json.grantQuota;
        } else {
          json.available = json.limitQuota - json.grantQuota + json.repaymentQuota;
        }
        this.config = json;
      },
      close() {
        this.$emit('close');
      },
      getNewData() {
        this.$emit('getNewData');
      },
      finish(formName) {
        let data = JSON.parse(JSON.stringify(this.config));
        data.startDate = this.$Moment(data.startDate).format('YYYY-MM-DD HH:mm:ss');
        data.endDate = this.$Moment(data.endDate).format('YYYY-MM-DD HH:mm:ss');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认保存修改吗？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$MyFetch.put(quotaApi.Groups, data)
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
          }
        });
      },
      init () {
        let url = `${quotaApi.Groups}/${this.data.id}`;
        this.$MyFetch.get(url)
        .then((data = {}) => {
          if (data.quotaType === 1) {
            data.available = data.limitQuota - data.grantQuota;
          } else {
            data.available = data.limitQuota - data.grantQuota + data.repaymentQuota;
          }
          if (!data.startDate) {
            this.config.startDate = this.$Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          }
          if (!data.endDate) {
            this.config.startDate = this.$Moment(threeDayAfter()).format('YYYY-MM-DD HH:mm:ss');
          }
          this.config = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
      }
    },
    created() {
      this.init();
    }
  };
</script>
