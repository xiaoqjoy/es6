<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    position: relative;
    .dialog-box{
      width: 1200px;
      .dialog-box__middle-form {
        max-height: 580px;
        .demo-form-inline{
          // padding-top: 10px!important;
        }
      }
      .message__list{
        .item{
          // width: 33.3%;
          margin-right: 60px;
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
        width: 20%;
        margin-right: 40px;
      }
      .el-form-item .el-select {
        width: 245px;
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
        overflow-y: auto;
        // padding: 0 20px;
        .form__bottom {
          padding-bottom: 0;
          text-align: center;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
          background: #fff;
          padding-bottom: 5px;
          z-index: 100;
        }
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
            <el-form :model="form"
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5" >
                <ul class="message__list clearfix">
                  <li class="f__left item">
                    <h5 class="title">合作方：</h5>
                    <span class="content">{{ data.corpName }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">资金方：</h5>
                    <span class="content">{{ data.fundName }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">业务模式：</h5>
                    <span class="content">{{ data.businessName }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">产品类型：</h5>
                    <span class="content">{{ data.productTypeName }}</span>
                  </li>
                </ul>
                <div class="dialog-box__form__group">
                  <el-table
                    :data="config.companyResponses"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="58">
                    </el-table-column>
                    <el-table-column
                      prop="branchName"
                      label="公司名称"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="quotaMonth"
                      label="当月月份"
                      width="115">
                    </el-table-column>
                    <el-table-column
                      label="总额度"
                      width="120">
                      <template slot-scope="scope">
                        <el-input maxlength="20" v-model="scope.row.limitQuota" :disabled="!scope.row.disable || (scope.row.isLimit === 0)"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="额度状态"
                      width="120">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.status" placeholder="请选择" :disabled="!scope.row.disable">
                          <el-option label="正常" :value="1"></el-option>
                          <el-option label="暂停" :value="0"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否限额"
                      width="120">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.isLimit" placeholder="请选择" :disabled="!scope.row.disable" @change="changeNextLimit(scope.$index, 'now')">
                          <el-option label="限额" :value="1"></el-option>
                          <el-option label="不限" :value="0"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="nextQuotaMonth"
                      label="次月月份"
                      width="115">
                    </el-table-column>
                    <el-table-column
                      label="总额度"
                      width="120">
                      <template slot-scope="scope">
                        <el-input maxlength="20" v-model="scope.row.nextLimitQuota" :disabled="!scope.row.disable || (scope.row.nextIsLimit === 0)"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="额度状态"
                      width="120">
                      <template slot-scope="scope">
                        <el-select
                        :disabled="!scope.row.disable"
                        v-model="scope.row.nextStatus"
                        placeholder="请选择">
                          <el-option label="正常" :value="1"></el-option>
                          <el-option label="暂停" :value="0"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="是否限额"
                      width="120">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.nextIsLimit" placeholder="请选择" :disabled="!scope.row.disable" @change="changeNextLimit(scope.$index, 'next')">
                          <el-option label="限额" :value="1"></el-option>
                          <el-option label="不限" :value="0"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish"  type="primary " @click="finish">确认</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {quotaApi} from '../../js/server.js';

  export default{
    data() {
      return {
        id: '10021',
        form: {},
        config: {},
        multipleSelection: []
      };
    },
    props: {
      data: Object
    },
    methods: {
      changeNextLimit(index, type) {
        if (type === "next") {
          this.config.companyResponses[index].nextLimitQuota = "";
        } else {
          this.config.companyResponses[index].limitQuota = "";
        }
      },
      handleSelectionChange(val) {
        let selectId = [];
        val.forEach((item, index) => {
          selectId.push(item.branchCode);
        });
        this.config.companyResponses.forEach((item, index) => {
          if (selectId.includes(item.branchCode)) {
            item.disable = true;
          } else {
            item.disable = false;
          }
        });
        this.multipleSelection = val;
      },
      close() {
        this.$emit('close');
      },
      textNumber (val) {
        let ispass = false;
        const valReg = /^[0-9]{1,20}$/;
        if (valReg.test(val) || !val) {
          ispass = true;
        } else {
          ispass = false;
        }
        return ispass;
      },
      finish() {
        if (this.multipleSelection.length === 0) {
          this.$error("请勾选需要保存的数据");
          return false;
        }
        let pass = 0;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          if (!(this.textNumber(this.multipleSelection[i].limitQuota)) || !(this.textNumber(this.multipleSelection[i].nextLimitQuota))) {
            pass += 1;
          }
        }
        console.log(pass);
        if (pass !== 0) {
          this.$error("总额度请填写整数！");
          return false;
        }
        let data = JSON.parse(JSON.stringify(this.config));
        data.companyResponses = this.multipleSelection;
        this.$MyFetch.post(quotaApi.BranchBranchs, data)
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
      },
      getNewData() {
        this.$emit('getNewData');
      },
      init () {
        let data = {
          businessCode: this.data.businessCode,
          corpCode: this.data.corpCode,
          fundCode: this.data.fundCode,
          productTypeCode: this.data.productTypeCode
        };
        this.$MyFetch.post(quotaApi.BranchInitialize, data)
        .then((data = {}) => {
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
