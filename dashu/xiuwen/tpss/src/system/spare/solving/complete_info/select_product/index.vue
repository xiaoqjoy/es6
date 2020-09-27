<template>
  <div class="select-product">
    <div class="dialog-box__middle-1200 bg__white">
      <div class="top__message__list">
        <ul class="message__list clearfix">
          <li class="item f__left">
            <h5 class="title">申请编号:</h5>
            <p class="content">{{ sPInfo.applicationId }}</p>
          </li>
          <li class="item f__left text__center">
            <h5 class="title">客户姓名:</h5>
            <p class="content">{{ sPInfo.custName }}</p>
          </li>
          <li class="item f__left text__right">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{ sPInfo.certificateNum  }}</p>
          </li>
          <li class="item f__left ">
            <h5 class="title">最高可贷额度:</h5>
            <p class="content font__yellow">{{ sPInfo.limitLoanAmt ? sPInfo.limitLoanAmt : 0}}</p>
          </li>
          <li class="item f__left text__center">
            <h5 class="title">额度有效期:</h5>
            <p class="content">{{ sPInfo.limitExpiryDate ? sPInfo.limitExpiryDate : '/'  }}</p>
          </li>
        </ul>
      </div>
      <div class="select-box">
        <el-select v-model="selectInfo.productIdOne"
                   placeholder="请选择产品1"
                   class="margin__right__20"
                   :disabled="!!selectInfo.selectedProduct || hasSubmit">
          <el-option
            v-for="(item, index) in selectInfo.products"
            :label="item.productName"
            :key="index"
            :value="item.productId"></el-option>
        </el-select>
        <el-select v-model="selectInfo.productIdTwo" placeholder="请选择产品2" :disabled="hasSubmit">
          <el-option
            v-for="(item, index) in selectInfo.products"
            :label="item.productName"
            :key="index"
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
          <el-table-column
            prop="productId"
            label="产品ID"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
          >
          </el-table-column>
          <el-table-column
            prop="maxLimitAmt"
            label="单笔上限">
          </el-table-column>
          <el-table-column
            prop="loanTerm"
            label="贷款期限">
          </el-table-column>
        </el-table>
      </div>
      <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
    </div>
    <div class="dialog-box__bottom-1200">
      <el-button class="button__width-200 button__border-blue" @click="preStep">上一步</el-button>
      <el-button type="primary" class="button__width-200" @click="saveSelect">下一步</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../../js/server.js';
  import pagination from '@components/pagination';
    export default{
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
          selectInfo: {}
        };
      },
      created() {
        this.getInfo(this.applicationId);
        this.getTableData(this.applicationId, 1);
        this.getSelectInfo(this.applicationId);
        this.getHasSubmit();
        if (this.isReadonly) {
          this.hasSubmit = true;
        }
      },
      components: {
        pagination
      },
      methods: {
        getHasSubmit() {
//          this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getHasSubmit + this.applicationId)
//            .then((data = false) => {
//              this.hasSubmit = !!data;
//            })
//            .catch(err => {
//              console.log(err);
//            });
        },
        nextStep() {
          this.$emit('next-step');
        },
        preStep() {
          this.$emit('pre-step');
        },
        getTableData(id, pageNum) {
          this.$MyFetch.post(spareApi.solving.completeInfo.selectProduction.getTableData, { applicationId: id, pageNum: pageNum, pageSize: 10 })
            .then((data = {}) => {
              this.tableData = [...data.list];
              this.pageConfig.account = data.total;
              this.pageConfig.currentPage = data.pageNum;
            })
            .catch(err => {
              console.log(err);
            });
        },
        getInfo(id) {
          this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.productInfo + id)
            .then((data = {}) => {
              this.sPInfo = Object.assign({}, data);
            })
            .catch(err => {
              console.log(err);
            });
        },
        // 如果selectedProduct 存在那么 第一个下拉框选中selectedProduct的值，并disabled
        getSelectInfo(id) {
          this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.productSelectList + id)
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
              this.selectInfo = Object.assign(data);
            })
            .catch(err => {
              console.log(err);
            });
        },
        saveSelect() {
          if (this.isReadonly) {
            this.nextStep();
            return;
          }
          if (!this.selectInfo.productIdOne) {
            this.confirmFn('请选择产品1', 'error');
            return;
          }
          if (!this.selectInfo.productIdTwo) {
            this.confirmFn('请选择产品2', 'error');
            return;
          }
          this.selectInfo.applicationId = this.applicationId;
          this.$MyFetch.post(spareApi.solving.completeInfo.selectProduction.saveProductSelect, this.selectInfo)
            .then((data) => {
              this.nextStep();
            })
            .catch(err => {
              console.log(err);
            });
        },
        jump(index) {
          this.getTableData(this.applicationId, index);
        }
      }
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .select-product{
    .top__message__list{
      border-bottom: 1px solid @line-color;
      margin-bottom: 20px;
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
    box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
    .dialog-box__middle-top{
      padding: 20px 0;
      border-bottom: 1px solid  #E5E5E5;
      .title{
        font-size: 16px;
        .icon__gan{
          margin-right: 10px;
        }
      }
    }
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
          padding-bottom: 20px;
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
              background: #F9FAFB;
              line-height: 20px;
              color: #999999;
              min-width: 80px;
              border-bottom: 1px solid #E5E5E5;
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
