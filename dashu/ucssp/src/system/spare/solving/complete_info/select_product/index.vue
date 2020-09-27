<template>
  <div class="select-product">
    <div class="dialog-box__middle-1200 bg__white">
      <div class="top__message__list">
        <ul class="message__list clearfix">
          <li class="item f__left">
            <h5 class="title">申请编号:</h5>
            <p class="content">{{ sPInfo.applicationId }}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">客户姓名:</h5>
            <p class="content">{{ sPInfo.custName }}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{ sPInfo.certificateNum  }}</p>
          </li>
          <li class="item f__left ">
            <h5 class="title">最高可贷额度:</h5>
            <p class="content font__yellow">{{ sPInfo.limitLoanAmt ? sPInfo.limitLoanAmt : 0}}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">额度有效期:</h5>
            <p class="content">{{ sPInfo.limitExpiryDate ? sPInfo.limitExpiryDate : '/'  }}</p>
          </li>
          <li class="item f__left" v-if="sPInfo.onlineFaceSwitchInd && !isReadonly">
            <h5 class="title">面签形式:</h5>
            <el-switch
                v-model="selectInfo.onlineFaceInd"
                :width="50"
                active-text="线上面签"
                inactive-text="线下面签"
                :active-value="true"
                :inactive-value="false"
                @change="changeFn"
              ></el-switch>
          </li>
        </ul>
      </div>
      <div class="select-box">
        <el-select
          v-model="selectInfo.productIdOne"
          placeholder="请选择产品1"
          class="margin__right__20"
          :disabled="!!selectInfo.selectedProduct || hasSubmit">
          <el-option
            v-for="(item, index) in productSelectList"
            :label="item.productName"
            :key="index"
            :value="item.productId"></el-option>
        </el-select>
        <el-select v-model="selectInfo.productIdTwo" clearable placeholder="请选择产品2" :disabled="hasSubmit">
          <el-option
            v-for="(item, index) in productSelectList"
            :label="item.productName"
            :key="index"
            clearable
            :value="item.productId"></el-option>
        </el-select>
      </div>
      <div class="dialog-box__table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          cell-class-name="dialog__table__td"
          header-cell-class-name="dialog__table__th"
          height="270px"
          highlight-current-row
          class="dialog__table">
          <el-table-column prop="productId" label="产品ID" width="200"></el-table-column>
          <el-table-column prop="productName" label="产品名称" width="300"></el-table-column>
          <el-table-column prop="maxLimitAmt" label="单笔上限" width="120"></el-table-column>
          <el-table-column prop="riskLevelDesc" label="评分等级" width="120"></el-table-column>
          <el-table-column prop="loanTerm" label="贷款期限" width="120"></el-table-column>
          <el-table-column prop="riskRateLevel" label="定价档次" width="120"></el-table-column>
          <el-table-column prop="pricingGrade" label="定价类型" width="120"></el-table-column>
          <el-table-column label="合作机构年化利率%（年）" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
            </template>
          </el-table-column>
          <el-table-column label="担保费率%（月）" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="评审费率%（一次性收取）" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="保费费率%（一次性收取）" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="咨询费率%（一次性收取）" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column label="管理费率%（月）" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.managementFeeRate !== null">{{scope.row.managementFeeRate  | rounding2}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-box__bottom-1200">
      <el-button v-if="!isReadonly" class="button__width-200 button__border-blue" @click="preStep">上一步</el-button>
      <el-button v-if="!isReadonly" type="primary" class="button__width-200" @click="saveSelect">下一步</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {spareApi} from '../../../js/server.js';
import pagination from '@components/pagination';

export default {
  props: ['applicationId', 'isReadonly'],
  data() {
    return {
      hasSubmit: false,
      sPInfo: {},
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      tableData: [],
      onlineTabData: [],
      offlineTabData: [],
      onlineSelectList: [],
      offlineSelectList: [],
      productSelectList: [],
      selectInfo: {
        onlineFaceInd: false, // 默认线下面签
        productIdOne: '',
        productIdTwo: ''
      }
    };
  },
  created() {
    this.getInfo(this.applicationId);
    this.modifyFn();
  },
  components: {
    pagination
  },
  methods: {
    changeFn(_flag) {
      this.$set(this.selectInfo, 'productIdOne', '');
      this.$set(this.selectInfo, 'productIdTwo', '');
      // true 为线上面签
      if (_flag) {
        this.tableData = this.onlineTabData;
        this.productSelectList = this.onlineSelectList;
      } else {
        this.tableData = this.offlineTabData;
        this.productSelectList = this.offlineSelectList;
      }
    },
    // 是否可以修改
    modifyFn() {
      // hasSubmit 是否提交（待处理页面中的提交按钮）
      // isChangeProduct 是否要重选产品
      let status = {};
      this.getHasSubmit()
        .then(data => {
          status.hasSubmit = data;
        })
        .then(() => {
          return this.getReselectIndApi();
        })
        .then(data => {
          status.isChangeProduct = data;
          this.hasSubmit = (parseInt(status.hasSubmit) > 1 && !status.isChangeProduct) || this.isReadonly;
        });
    },
    // 是否重选产品
    getReselectIndApi() {
      return this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.getReselectInd + this.applicationId);
    },
    getHasSubmit() {
      return this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getSubmitStatus + this.applicationId);
    },
    nextStep() {
      this.$emit('next-step');
    },
    preStep() {
      this.$emit('pre-step');
    },
    getTableData(id) {
      this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.getTableData + id)
        .then((data = {}) => {
          // 过滤支持线上产品
          data.forEach(_item => {
            if (_item.onlineFaceSignInd) {
              this.onlineTabData.push(_item);
            }
            this.offlineTabData.push(_item);
          });
          if (this.sPInfo.onlineFaceInd) {
            this.tableData = this.onlineTabData;
          }
          if (!this.sPInfo.onlineFaceInd) {
            this.tableData = this.offlineTabData;
          }
        })
        .catch(err => {
          this.confirmFn(err.message);
        });
    },
    getInfo(id) {
      this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.productInfo + id)
        .then((data = {}) => {
          this.sPInfo = Object.assign({}, data);
          this.getTableData(this.applicationId, 1);
          this.getSelectInfo(this.applicationId);
        })
        .catch(err => {
          this.$error(err.message);
          console.log(err);
        });
    },
    // 如果selectedProduct 存在那么 第一个下拉框选中selectedProduct的值，并disabled
    getSelectInfo(id) {
      let url = this.isReadonly ? spareApi.solving.completeInfo.selectProduction.productSelectListHasDone : spareApi.solving.completeInfo.selectProduction.productSelectList;
      this.$MyFetch.get(url + id)
        .then((data = {}) => {
          if (data.productCheckeds.length !== 0) {
            data.productCheckeds.forEach((v) => {
              if (v.sortNum === 1) {
                data.productIdOne = v.productId;
              } else if (v.sortNum === 2) {
                data.productIdTwo = v.productId;
              }
            });
          }
          if (data.selectedProduct) {
            data.productIdOne = data.selectedProduct;
          }
          // 过滤支持线上产品
          data.products.forEach(_item => {
            if (_item.onlineFaceSignInd) {
              this.onlineSelectList.push(_item);
            }
            this.offlineSelectList.push(_item);
          });
          if (this.sPInfo.onlineFaceInd) {
            this.productSelectList = this.onlineSelectList;
          }
          if (!this.sPInfo.onlineFaceInd) {
            this.productSelectList = this.offlineSelectList;
          }
          this.selectInfo = Object.assign(data);
          this.selectInfo.onlineFaceInd = this.sPInfo.onlineFaceInd;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async saveSelect() {
      if (this.isReadonly) {
        this.nextStep();
        return;
      }
      if (!this.selectInfo.productIdOne && !this.hasSubmit) {
        this.confirmFn('请选择产品1', 'error');
        return;
      }
      if (!this.hasSubmit && (this.selectInfo.productIdOne === 'P20200513000001' || this.selectInfo.productIdTwo === 'P20200513000001')) {
        const houseList = await this.getHouseList();
        if (houseList.length >= 2) {
          this.confirmFn('太平洋产险-华夏银行(易贷)不接受两套抵押房产业务，请重新选择产品', 'error');
          return;
        }
      }
      if (!this.hasSubmit) {
        this.selectInfo.applicationId = this.applicationId;
        this.$MyFetch.post(spareApi.solving.completeInfo.selectProduction.saveProductSelect, this.selectInfo)
          .then((data) => {
            this.nextStep();
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      } else {
        this.nextStep();
      }
    },
    async getHouseList() {
      const url = spareApi.solving.completeInfo.completeProduct.getHourseList;
      try {
        const { estateInfoList } = await this.$MyFetch.post(url, { applicationId: this.applicationId });
        return estateInfoList || [];
      } catch (error) {
        this.confirmFn(error, "error");
      }
      return [];
    }
  },
  filters: {
    rounding (value) {
      return value.toFixed(6);
    },
    rounding2 (value) {
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .select-product{
    .top__message__list{
      border-bottom: 1px solid @line-color;
      margin-bottom: 20px;
      .message__list{
        .item{
          width: auto;
          padding-right: 50px;
        }
      }
    }
    .select-box{
      margin-bottom: 20px;
    }
    .dialog__table{
      .el-checkbox{
        position: relative;
        left: -30px;
      }
    }
    .pagination{
      margin-top: 20px;
    }
  }
  .dialog-box__middle-1200{
    height: 442px;
    overflow-y: auto;
    margin: 0 20px;
    padding: 25px 30px;
    box-shadow: 0 2px 6px 0 #d0d0d0;
    .dialog-box__middle-top{
      padding: 20px 0;
      border-bottom: 1px solid  #d0d0d0;
      .title{
        font-size: 16px;
        .icon__gan{
          margin-right: 10px;
        }
      }
    }
    /deep/.el-switch .el-switch__label {
      right: -63px;
    }
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
          padding-bottom: 20px;
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
        margin-right: -40px;
        font-size:0;
      }
    }
    /*表格中有表单的奇葩操作*/
    .table__list{
      .item{
        padding-top: 20px;
        .dialog__table{
          table{
            width: 100%;
            border: 1px solid #E9E9E9;
            text-align: center;
            th{
              height: 60px;
              background: #ececec;
              line-height: 20px;
              color: #666;
              min-width: 80px;
              border-bottom: 1px solid #d0d0d0;
              font-size: 12px;
              vertical-align: middle;
            }
            td{
              padding: 0 5px;
              font-size: 14px;
              vertical-align: middle;
              text-align: center;
              .el-form-item{
                height: 70px;
                padding-top: 10px;
                padding-bottom: 15px;
                margin: 0;
                .el-form-item__content{
                  margin-right: 0;
                  text-align: center;
                  line-height: 16px;
                  .el-input{
                    display: inline-block;
                    .el-input__inner{
                      height: 30px;
                      min-width: 80px;
                      max-width: 110px;
                    }
                  }
                }
              }
              .el-date-editor.el-input, .el-date-editor.el-input__inner{
                width: auto;
              }
              .el-input__icon{
                line-height: 30px;
              }
              .el-input__inner{
                font-size: 12px;
              }
              .el-select{
                width: auto;
              }
              .el-switch{
                height: auto;
              }
              .operate-box{

                .icon{
                  line-height: 60px;
                  color: #538BF1;
                  font-weight: 600;
                  padding: 0 1px;
                }
                .icon__edit:after{
                  height: 60px;
                }
              }
            }
            td>.operate-box:last-child{
              height: 70px;
              .icon{
                line-height: 50px;
              }
            }
            td>div:first-child{
              padding-top: 25px;
              min-width: 80px;
              text-align: center;
              height: 60px;
            }
            td>div:first-child.operate-box{
              padding: 0;
            }
            td>div:last-child{

            }
          }
          .tab-box{
            height: 40px;
            padding-left: 20px;
            border: 1px solid #E9E9E9;
            border-bottom: none;
            .el-tabs__item{
              font-size: 12px;
            }
            .el-tabs__nav-wrap::after{
              background: none;
            }
          }
        }
      }
    }

    .form__bottom{
      text-align: center;
      padding-bottom: 20px;
    }
  }
</style>
