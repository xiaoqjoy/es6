<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">{{accompanyId? "详情" :"新增"}}</h5>
        <span class="el-icon-close button button__close" @click="close(false)"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top__message__list" v-if="accompanyId">
          <ul class="message__list clearfix">
            <li class="f__left item">
              <h5 class="title">个贷服务中心:</h5>
              <p class="content">{{accompanyData.serviceName}}</p>
            </li>
          </ul>
        </div>
        <el-form :inline="true"
                 :model="accompanyData"
                 :rules="accompanyRules"
                 ref="accompanyForm"
                 label-position="top"
                 class="demo-form-inline">
          <div class="middle">
            <el-form-item prop="addressDesc" class="form__item " label="陪查地址">
              <el-input
                maxlength="50"
                v-model="accompanyData.addressDesc"
                placeholder="陪查地址"></el-input>
            </el-form-item>
            <div>
              <div class="drop__select-box el-form-item">
                <p class="lab"><span class="icon icon__star">*</span>联系人1</p>
                <button class="button__wrap"
                        type="button"
                        @click="dropSelectShow1=!dropSelectShow1;"
                        :class="{isactive:dropSelectShow1}"> {{accompanyData.accompanyPersonList[0].accompanyPersonName ? accompanyData.accompanyPersonList[0].accompanyPersonName: '请查询联系人'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
                <transition name="el-zoom-in-top">
                  <div class="wrap table__wrap-max" v-show="dropSelectShow1">
                    <el-form label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <el-form-item
                        style="margin-right:10px; padding-right:0">
                        <el-cascader
                          placeholder="请选择所属分公司"
                          clearable
                          :options="departments"
                          :props="dataConfig"
                          v-model="queryObjOne.departments"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item
                        style="margin-right:10px">
                        <el-input placeholder="请输入联系人姓名" v-model.trim="queryObjOne.userName"></el-input>
                      </el-form-item>
                      <el-button type="primary" class="button button__blue width100" @click="searchOne(queryObjOne,pageConfig1)">查询</el-button>
                    </el-form>
                    <el-table
                      :data="tableList1"
                      height="200"
                      border
                      highlight-current-row
                      style="width: 100%"
                      cell-class-name="dialog__table__td"
                      header-cell-class-name="dialog__table__th"
                      @row-click="selectedHandler1"
                      class="dialog__table">
                      <el-table-column
                        prop="userName"
                        label="姓名"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="departmentName"
                        label="分公司"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="userId"
                        label="um账号">
                      </el-table-column>
                    </el-table>
                    <pagination :page="pageConfig1" style="margin-top: 10px" @jump-page="jump1"></pagination>
                  </div>
                </transition>
              </div>
              <el-form-item prop="accompanyPersonNum1" class="form__item " label="联系方式1">
                <el-input
                  v-model="accompanyData.accompanyPersonNum1"
                  placeholder="请输入联系人联系方式"></el-input>
              </el-form-item>
              <div class="drop__select-box el-form-item">
                <p class="lab">联系人2</p>
                <button class="button__wrap"
                        type="button"
                        @click.prevent="dropSelectShow2=!dropSelectShow2;"
                        :class="{isactive:dropSelectShow2}">
                  {{accompanyData.accompanyPersonList[1].accompanyPersonName ? accompanyData.accompanyPersonList[1].accompanyPersonName: '请查询联系人'}}
                  <i  class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
                  </button>
                <i v-if="!!accompanyData.accompanyPersonList[1].accompanyPersonName" class="el-icon-close button button__close icon__clear" @click.stop="clearSelect()"></i>
                <transition name="el-zoom-in-bottom">
                  <div class="wrap table__wrap-max" style="top: -310px;" v-show="dropSelectShow2">
                    <el-form label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <el-form-item
                        style="margin-right:10px; padding-right:0">
                        <el-cascader
                          placeholder="请选择所属分公司"
                          clearable
                          :options="departments"
                          :props="dataConfig"
                          v-model="queryObjTwo.departments"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item
                        style="margin-right:10px">
                        <el-input placeholder="请输入联系人姓名" v-model.trim="queryObjTwo.userName"></el-input>
                      </el-form-item>
                      <el-button type="primary" class="button button__blue width100" @click="searchTwo(queryObjTwo,pageConfig2)">查询</el-button>
                    </el-form>
                    <el-table
                      :data="tableList2"
                      height="200"
                      border
                      highlight-current-row
                      style="width: 100%"
                      cell-class-name="dialog__table__td"
                      header-cell-class-name="dialog__table__th"
                      @row-click="selectedHandler2"
                      class="dialog__table">
                      <el-table-column
                        prop="userName"
                        label="姓名"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="departmentName"
                        label="分公司"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="userId"
                        label="um账号">
                      </el-table-column>
                    </el-table>
                    <pagination :page="pageConfig2" style="margin-top: 10px" @jump-page="jump1"></pagination>
                  </div>
                </transition>
              </div>
              <el-form-item prop="accompanyPersonNum2" class="form__item " label="联系方式2">
                <el-input
                  v-model="accompanyData.accompanyPersonNum2"
                  placeholder="请输入联系人联系方式"></el-input>
              </el-form-item>
              <el-form-item class="bottom__btn-box text__center" style="width:100%">
                <el-button type="primary" class="button button__blue width200" @click="submitFn">确认</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import api from '../js/server';
  import rules from '@common/js/rules.js';
  import pagination from '@components/pagination';
  export default{
    props: ['accompanyId'],
    data() {
      return {
        accompanyData: {
          serviceName: '',
          addressDesc: '',
          accompanyPersonNum1: '',
          accompanyPersonNum2: '',
          accompanyPersonList: [
            {
              accompanyPersonId: '',
              accompanyPersonName: '',
              accompanyPersonNum: ''
            },
            {
              accompanyPersonId: '',
              accompanyPersonName: '',
              accompanyPersonNum: ''
            }
          ]
        },
        accompanyRules: {
          addressDesc: [
            {required: true, message: '请输入陪查地址', trigger: 'blur'},
            {validator: rules.nameRule3, trigger: 'blur'}
          ],
          accompanyPersonNum1: [
            {required: true, message: '请输入联系人联系方式', trigger: 'blur'},
            {validator: rules.allPhoneRule, trigger: 'blur'}
          ],
          accompanyPersonNum2: [
            {validator: rules.allPhoneRule, trigger: 'blur'}
          ]
        },
        dropSelectShow1: false,
        dropSelectShow2: false,
        tableList1: [],
        tableList2: [],
        pageConfig1: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: false
        },
        pageConfig2: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: false
        },
        queryObjOne: {
          departments: [],
          userName: '',
          currentQuery: {}
        },
        queryObjTwo: {
          departments: [],
          userName: '',
          currentQuery: {}
        },
        departments: [],
        dataConfig: {
          label: 'departmentName',
          children: 'children',
          value: 'departmentId'
        }
      };
    },
    created() {
      if (this.accompanyId) {
        this.getDetail(this.accompanyId);
      }
      this.getAllCompany();
    },
    methods: {
      close(update) {
        this.$emit('close', update);
      },
      getDetail(id) {
        this.$MyFetch.get(`${api.getDetail}/${id}/accompany`)
          .then((data) => {
            this.accompanyData = Object.assign(this.accompanyData, data);
            if (data.accompanyPersonList[0]) {
              this.accompanyData.accompanyPersonNum1 = data.accompanyPersonList[0].accompanyPersonNum;
            } else {
              this.$set(this.accompanyData.accompanyPersonList, 0, {
                accompanyPersonId: '',
                accompanyPersonName: '',
                accompanyPersonNum: ''
              });
            }
            if (data.accompanyPersonList[1]) {
              this.accompanyData.accompanyPersonNum2 = data.accompanyPersonList[1].accompanyPersonNum;
            } else {
              this.$set(this.accompanyData.accompanyPersonList, 1, {
                accompanyPersonId: '',
                accompanyPersonName: '',
                accompanyPersonNum: ''
              });
            }
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      selectedHandler1(obj) {
        this.accompanyData.accompanyPersonList[0].accompanyPersonName = obj.userName;
        this.accompanyData.accompanyPersonList[0].accompanyPersonId = obj.userId;
        this.dropSelectShow1 = false;
      },
      selectedHandler2(obj) {
        this.accompanyData.accompanyPersonList[1].accompanyPersonName = obj.userName;
        this.accompanyData.accompanyPersonList[1].accompanyPersonId = obj.userId;
        this.dropSelectShow2 = false;
      },
      jump1(index) {
        this.queryApi(this.queryObjOne.currentQuery, index)
          .then(data => {
            this.tableList1 = [...data.list];
            this.pageConfig1.account = data.total;
            this.pageConfig1.currentPage = index;
          });
      },
      jump2(index) {
        this.queryApi(this.queryObjTwo.currentQuery, index)
          .then(data => {
            this.tableList1 = [...data.list];
            this.pageConfig2.account = data.total;
            this.pageConfig2.currentPage = index;
          });
      },
      searchOne(queryObj, pageConfig) {
        if (!queryObj.userName && (queryObj.departments.length === 0)) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          queryObj.currentQuery = {
            userName: queryObj.userName,
            departmentId: (queryObj.departments.length > 0) ? queryObj.departments[queryObj.departments.length - 1] : '',
            statusCode: 'N'
          };
          this.queryApi(queryObj.currentQuery, 1)
            .then(data => {
              this.tableList1 = [...data.list];
              pageConfig.account = data.total;
              pageConfig.currentPage = 1;
            });
        }
      },
      searchTwo(queryObj, pageConfig) {
        if (!queryObj.userName && (queryObj.departments.length === 0)) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          queryObj.currentQuery = {
            userName: queryObj.userName,
            departmentId: (queryObj.departments.length > 0) ? queryObj.departments[queryObj.departments.length - 1] : '',
            statusCode: 'N'
          };
          this.queryApi(queryObj.currentQuery, 1)
            .then(data => {
              this.tableList2 = [...data.list];
              pageConfig.account = data.total;
              pageConfig.currentPage = 1;
            });
        }
      },
      // 获取所有分公司
      getAllCompany() {
        this.$MyFetch.get(api.add.getAllDepartments)
          .then(data => {
            data.list.forEach((v) => {
              this.dealDepartments(v);
            });
            this.departments = data.list;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 部门数据中的data（子集没有时 为空数组造成渲染级联时白板）
      dealDepartments(obj) {
        if (obj.data.length > 0) {
          obj.children = obj.data;
          obj.children.forEach((v) => {
            this.dealDepartments(v);
          });
        }
      },
      // 查询api
      queryApi(query, pageNum) {
        query.pageNum = pageNum;
        query.pageSize = 10;
        return new Promise((resolve) => {
          this.$MyFetch.get(api.add.queryUser, query)
            .then((data) => {
              if (data.list) {
                if (data.list.length !== 0) {
                  // 一个人可能有多个部门 要拼接下
                  data.list.forEach((v) => {
                    let departmentName = '';
                    if (v.department) {
                      v.department.forEach((p) => {
                        departmentName += p.departmentName + ',';
                      });
                      departmentName = departmentName.slice(0, -1);
                    }
                    v.departmentName = !departmentName ? '/' : departmentName;
                  });
                } else {
                  this.confirmFn('未查询到相关记录');
                  data.list = [];
                }
              } else {
                this.confirmFn('未查询到相关记录');
                data.list = [];
              }
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // submit
      submitFn() {
        this.$refs.accompanyForm.validate((valid) => {
          if (valid) {
            if (!this.accompanyData.accompanyPersonList[0].accompanyPersonId) {
              this.confirmFn('请选择联系人1', 'error');
              return;
            }
            if (this.accompanyData.accompanyPersonList[1].accompanyPersonId && !this.accompanyData.accompanyPersonNum2) {
              this.confirmFn('请输入联系人2联系方式', 'error');
              return;
            }
            if (!this.accompanyData.accompanyPersonList[1].accompanyPersonId && this.accompanyData.accompanyPersonNum2) {
              this.confirmFn('请选择联系人2', 'error');
              return;
            }
            if (this.accompanyData.accompanyPersonList[1].accompanyPersonId === this.accompanyData.accompanyPersonList[0].accompanyPersonId) {
              this.confirmFn('联系人不可相同', 'error');
              return;
            }
            let data = {
              addressDesc: this.accompanyData.addressDesc,
              accompanyPersonList: [
                {
                  accompanyPersonId: this.accompanyData.accompanyPersonList[0].accompanyPersonId,
                  accompanyPersonName: this.accompanyData.accompanyPersonList[0].accompanyPersonName,
                  accompanyPersonNum: this.accompanyData.accompanyPersonNum1
                }
              ]
            };
            if (this.accompanyData.accompanyPersonList[1].accompanyPersonId) {
              data.accompanyPersonList[1] = {
                accompanyPersonId: this.accompanyData.accompanyPersonList[1].accompanyPersonId,
                accompanyPersonName: this.accompanyData.accompanyPersonList[1].accompanyPersonName,
                accompanyPersonNum: this.accompanyData.accompanyPersonNum2
              };
            }
            if (!this.accompanyId) {
              this.$MyFetch.post(api.add.save, data)
                .then(data => {
                  this.confirmFn('新增成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            } else {
              data.accompanyId = this.accompanyId;
              this.$MyFetch.post(api.add.update, data)
                .then(data => {
                  this.confirmFn('更新成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
          }
        });
      },
      clearSelect(event) {
        this.$set(this.accompanyData.accompanyPersonList, 1, {
          accompanyPersonId: '',
          accompanyPersonName: '',
          accompanyPersonNum: ''
        });
      }
    },
    components: {
      pagination
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 720px;
      padding-bottom: 0;
      overflow: visible;
      .dialog-box__middle{
        font-size: 0;
        overflow: visible;
        .middle{
          margin-right: -40px;
          /deep/.el-form-item{
            width: 50%;
            padding-right: 31px;
            margin-right: 0;
            /deep/ .el-form-item__content{
              width: 100%;
            }
            /deep/ .el-form-item__label{
              padding-bottom: 7px;
            }
          }
          .drop__select-box{
            vertical-align: top;
            .lab{
              padding: 0 0 7px;
              line-height: 17px;
              font-size: 12px;
              color: @font-gray;
              .icon__star{
                color: @red;
                margin-right: 5px;
              }
            }
          }
          .drop__select-box{
            position: relative;
            .button__wrap{
              position: relative;
              min-width: 100%;
              height: 42px;
              padding: 0 20px;
              line-height: 40px;
              border: 1px solid @line-color;
              text-align: left;
              background: none;
              color: @font-light;
              .icon{
                position:absolute;
                transform: rotateZ(180deg);
                right: 5px;
                transition: all 0.3s;
              }
            }
            .icon__clear{
              display: none;
            }
            .button__wrap:hover + .icon__clear, .icon__clear:hover{
              font-size: 10px;
              display: block;
            }
            .el-icon-close{
              position:absolute;
              right: 42px;
              top: 38px;
              z-index: 100;
              background: rgba(0, 0, 0, 0.4);
              border-radius: 50%;
              font-size: 14px;
              color: #fff;
            }
            .button{
              vertical-align: top;
            }
            .wrap{
              position: absolute;
              top: 70px;
              min-width: 100%;
              padding: 20px;
              border: 1px solid @line-color;
              border-radius: 4px;
              background: #fff;
              z-index: 10;
              font-size: 12px;
              /deep/.el-form-item{
                width: 160px;
                padding-right: 0;
                display: inline-block;
              }
            }
            .wrap /deep/ .el-input{
              max-width: 242px;
              margin-bottom: 10px;
            }
            .wrap /deep/ .el-select{
              width: 242px;

            }
            .table__wrap-max{
              width: 610px;
            }
            .table__wrap-min{
              width: 466px;
            }
          }
          .drop__select-box .button__wrap.isactive{
            border-color: @blue-light;
            .icon{
              transform: rotateZ(0);
            }
          }
          .drop__select-box .button__wrap.disabled{
            background: #f5f7fa;
            cursor: not-allowed;
          }
        }
        .bottom{
          bottom: 30px;
        }
      }
    }
  }
</style>
