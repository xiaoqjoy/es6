<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 v-if="isDispose && !isReadonly" class="title bg__white strong">补件处理</h5>
        <h5 v-if="!isDispose && !isReadonly" class="title bg__white strong">补件复核</h5>
        <h5 v-if="isReadonly" class="title bg__white strong">补件查看</h5>
        <span class="product-title-img">
          <img src="../../../../../assets/img/Group10.png" alt>
        </span>
        <span class="dialog-box-group">
          <el-button v-if="isDispose && !isReadonly" type="text" @click="showimg()">上传影像</el-button>
          <el-button v-else type="text" @click="showimg()">查看影像</el-button>
        </span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="dialog-box__bottom">
        <div class="dialog-box__content">
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件信息</span>
            </div>
            <div class="content__title clearfix">
              <div class="f__left">
                <span class="font-gray">申请任务号:</span>
                <span class="font-black">{{patchMsg.applicationId}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">贷款品种:</span>
                <span class="font-black">{{patchMsg.primaryProductName}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">主借款人姓名:</span>
                <span class="font-black">{{patchMsg.custName}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">主借款人证件号码:</span>
                <span class="font-black">{{patchMsg.certificateNum}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">主借款人联系电话:</span>
                <span class="font-black">{{patchMsg.mobileNum}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">经办机构:</span>
                <span class="font-black">{{patchMsg.subcompanyId}}</span>
              </div>
              <div class="f__left" v-if="patchMsg.custManagerName">
                <span class="font-gray">客户经理姓名:</span>
                <span class="font-black">{{patchMsg.custManagerName}}</span>
              </div>
              <div class="f__left" v-else>
                <span class="font-gray">业务助理姓名:</span>
                <span class="font-black">{{patchMsg.assistantName}}</span>
              </div>
              <div class="f__left" v-if="patchMsg.custManagerPhoneNum">
                <span class="font-gray">客户经理联系电话:</span>
                <span class="font-black">{{patchMsg.custManagerPhoneNum}}</span>
              </div>
              <div class="f__left" v-else>
                <span class="font-gray">业务助理联系电话:</span>
                <span class="font-black">{{patchMsg.assistantPhoneNum}}</span>
              </div>
              <div class="f__left">
                <span class="font-gray">下发时间:</span>
                <span class="font-black">{{patchMsg.createdDate}}</span>
              </div>
            </div>
            <div class="font-black margin-top">问题描述:</div>
            <div class="margin-top" v-for="(item, index) in siDetailTxt" :key="index">
              <div class="head-title">补件{{SectionToChinese(index + 1)}}:</div>
              <p v-html="item" class="font____"></p>
            </div>
          </div>
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件退回原因</span>
            </div>
            <p class="font-black remark">{{patchMsg.siReturnDesc}}</p>
          </div>
          <div class="content" v-if="!isDispose">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件处理备注</span>
            </div>
            <p class="font-black remark">{{patchMsg.handlerRemarkDesc}}</p>
          </div>
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">备注</span>
            </div>
            <el-form :model="ruleForm" v-if="isReadonly" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="remark">
                <el-input :disabled="isReadonly" type="textarea" v-model="patchMsg.handlerRemarkDesc"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="ruleForm" v-else :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-form>
            <!-- <textarea class="content-txt" :disabled="isReadonly" v-model="patchMsg.inspectorRemarkDesc"></textarea> -->
            <transition name="fade">
              <div class="dialog__table-box customer-message">
                <el-tabs v-model="TabActiveName" class="tab-box">
                  <el-tab-pane label="房产共有人信息" name="first"></el-tab-pane>
                  <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                </el-tabs>
                <span
                  class="button font__blue add__btn"
                  v-show="TabActiveName === 'second' && !isReadonly && isDispose"
                  @click="openMessageBox(aaa={})"
                >
                  <span class="icon icon__add">+</span>新增
                </span>
                <transition name="fade">
                  <div class="dialog__table-box" v-show="TabActiveName === 'first'">
                    <div class="dialog__table-form-box">
                      <ul class="table__box">
                        <li class="table__head">
                          <ul class="table__tr">
                            <li class="table__th">共有产权人姓名</li>
                            <li class="table__th">证件类型</li>
                            <li class="table__th">证件号码</li>
                            <li class="table__th">共有房产</li>
                            <li class="table__th">共有产权人联系方式</li>
                            <li class="table__th">共有产权人产权份额</li>
                            <li v-if="!isReadonly && isDispose" class="table__th">操作</li>
                          </ul>
                        </li>
                        <li class="table__body" v-for="(item, index) in coownerList" :key="index">
                          <div class="table__tr">
                            <!-- 展示数据 -->
                            <ul class="table__tr__top-list" v-show="!item.showEle">
                              <li class="table__td">{{item.coownerName}}</li>
                              <li
                                class="table__td"
                              >{{certificateClass[item.certificateTypeCode]}}</li>
                              <li class="table__td">{{item.certificateNum}}</li>
                              <li class="table__td">{{item.estateNum}}</li>
                              <li class="table__td">{{item.contactNum}}</li>
                              <li class="table__td">{{item.propertySharePercent}}%</li>
                              <li v-if="!isReadonly && isDispose" class="table__td">
                                <div class="operate-box">
                                  <i
                                    class="icon el-icon-plus cursor__pointer"
                                    @click="openAddCoowner"
                                    v-if="index === (coownerList.length -1)"
                                  ></i>
                                  <i
                                    class="icon el-icon-minus cursor__pointer"
                                    @click="deleteCoowner(index)"
                                  ></i>
                                  <i
                                    class="icon icon__edit cursor__pointer"
                                    @click="openEditEle(item)"
                                  ></i>
                                </div>
                              </li>
                            </ul>
                            <el-form
                              :model="coownerEdit"
                              :rules="coownerRule"
                              :ref="'coownerEditForm' + index"
                              label-width="100px"
                              class="demo-form-inline"
                              label-position="top"
                            >
                            <!-- 编辑数据 -->
                              <div class="table__tr__bottom-list" v-show="item.showEle">
                                <el-form-item prop="coownerName" class="table__form-item">
                                  <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                                </el-form-item>
                                <el-form-item prop="certificateTypeCode" class="table__form-item">
                                  <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                                    <el-option
                                    v-for="(item, index) in certificateLibrary"
                                    :key="index"
                                    :value="item.itemCode"
                                    :label="item.itemDesc"
                                  ></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item
                                  :prop="'certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')"
                                  class="table__form-item">
                                  <el-input v-model="coownerEdit['certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')]"></el-input>
                                </el-form-item>
                                <el-form-item prop="estateNum" class="table__form-item">
                                  <el-select v-model="coownerEdit.estateNum" placeholder="请选择">
                                    <el-option v-for="(item, index) in estate"
                                    :key="index"
                                    :label="item.addressDesc"
                                    :value="item.estateNum"></el-option>
                                  </el-select>
                                </el-form-item>
                                <!-- <el-form-item prop class="table__form-item"> // 房产证1
                                  <el-input v-model="coownerEdit.estateNum"></el-input>
                                </el-form-item> -->
                                <el-form-item prop="contactNum" class="table__form-item">
                                  <el-input v-model="coownerEdit.contactNum"></el-input>
                                </el-form-item>
                                <el-form-item prop="propertySharePercent" class="table__form-item">
                                  <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                                   <!-- <el-input-number v-model="coownerEdit.propertySharePercent" :precision="2" :max="100" :min="0" :controls="false"></el-input-number> -->
                                </el-form-item>
                                <div class="operate-box text__center">
                                  <i
                                    class="icon el-icon-check cursor__pointer"
                                    @click="saveCoownerEdit('coownerEditForm' + index, index)"
                                  ></i>
                                  <i
                                    class="icon el-icon-minus cursor__pointer"
                                    @click="closeCoownerEdit(item)"
                                  ></i>
                                </div>
                              </div>
                            </el-form>
                          </div>
                        </li>
                        <!-- 新增数据 -->
                        <li class="table__body" v-show="coownerAddDg || (coownerList.length === 0) && !isReadonly && isDispose">
                          <div class="table__tr">
                            <el-form
                              :model="coownerEdit"
                              :rules="coownerRule"
                              ref="coownerAddForm"
                              label-width="100px"
                              class="demo-form-inline"
                              label-position="top"
                            >
                              <div class="table__tr__bottom-list">
                                <el-form-item prop="coownerName" class="table__form-item">
                                  <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                                </el-form-item>
                                <el-form-item prop="certificateTypeCode" class="table__form-item">
                                  <el-select
                                    v-model="coownerEdit.certificateTypeCode"
                                    placeholder="请选择"
                                  >
                                    <el-option
                                    v-for="(item, index) in certificateLibrary"
                                    :key="index"
                                    :value="item.itemCode"
                                    :label="item.itemDesc"
                                  ></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item
                                  :prop="'certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')"
                                  class="table__form-item"
                                >
                                  <el-input
                                    v-model="coownerEdit['certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')]"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item prop="estateNum" class="table__form-item">
                                  <el-select v-model="coownerEdit.estateNum" placeholder="请选择">
                                    <el-option v-for="(item, index) in estate"
                                    :key="index"
                                    :label="item.addressDesc"
                                    :value="item.estateNum"></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item prop="contactNum" class="table__form-item">
                                  <el-input v-model="coownerEdit.contactNum"></el-input>
                                </el-form-item>
                                <el-form-item prop="propertySharePercent" class="table__form-item">
                                  <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                                  <!-- <el-input-number v-model="coownerEdit.propertySharePercent" :precision="2" :max="100" :min="0" :controls="false"></el-input-number> -->
                                </el-form-item>
                                <div class="operate-box text__center">
                                  <i
                                    class="icon el-icon-check cursor__pointer"
                                    @click="saveCoowner"
                                  ></i>
                                  <i
                                    class="icon el-icon-minus cursor__pointer"
                                    @click="closeAddCoowner"
                                  ></i>
                                </div>
                              </div>
                            </el-form>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </transition>
                <transition name="fade">
                  <div class="dialog__table-box">
                    <table v-show="TabActiveName === 'second'">
                      <thead>
                        <tr>
                          <th>担保人编号</th>
                          <th>担保人姓名</th>
                          <th>证件类型</th>
                          <th>证件号码</th>
                          <th>担保人手机号</th>
                          <th>单位联系人姓名</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="table__tr__top-list" v-for="(item, index) in guarantorList" :key="index">
                          <td class="table__td height50">{{item.id}}</td>
                          <td class="table__td height50">{{item.guaranteeName}}</td>
                          <td class="table__td height50">{{certificateClass[item.certificateTypeCode]}}</td>
                          <td class="table__td height50">{{item.certificateNum}}</td>
                          <td class="table__td height50">{{item.contactNum}}</td>
                          <td class="table__td height50">{{item.workContractName}}</td>
                          <td>
                            <div class="operate-box">
                              <i
                                 v-if="!isReadonly && isDispose"
                                class="icon el-icon-minus cursor__pointer"
                                @click="deleteGuarantor(item.id)"
                              ></i>
                              <i
                                v-if="!isReadonly && isDispose"
                                class="icon icon__edit cursor__pointer"
                                @click="openMessageBox(item, index)"
                              ></i>
                              <el-button v-if="isReadonly || !isDispose" @click="openMessageBox(item, index)" type="text">详情</el-button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </div>
        <button class="button__yellow button width200 button__width-200" v-if="!isDispose" @click="alertRT()">退回</button>
        <button class="button__blue button button__width-200" v-if="!isReadonly" @click="submitForm('ruleForm')">提交</button>
      </div>
    </div>
    <transition name="fade">
      <add-guarantor
        v-if="openAddGuarantorDg"
        @close="closeGuarantor"
        :application-id="applicationId"
        :house-id-list="enableHouseIdList"
        :house-id="guarantorHouseId"
        :guarantor-id="guarantorId"
        :has-submit="isRedact"
        :guarantorMsg="guarantorMsg"
        :siTaskId="siTaskId"
        :estate="estate"
        :estateNum="estateNum"
        :getPatchReview="getPatchReview"
        :guarantorIndex="guarantorIndex"
        :siBusinessId="siBusinessId"
      ></add-guarantor>
    </transition>
    <commit :refresh="refresh" v-if="alertCommit" @clsoe_windowAlert="closeCommit"
     :isDispose="isDispose" :siTaskId="siTaskId" :siBusinessId="siBusinessIdA" :remark="ruleForm.remark" @close_ABC="close_ABC"/>
    <returnA :refresh="refresh" v-if="alertReturn" @clsoe_windowAlert="closeReturn" :siBusinessId="siBusinessId"
     :isDispose="isDispose" :siTaskId="siTaskId" :remark="patchMsg.inspectorRemarkDesc" @close_AB="close_AB"/>
  </div>
</template>

<script>
import "@common/css/dialog";
import returnA from "../return/index";
import myRules from "@common/js/rules.js";
import addGuarantor from "../../add_guarantor";
import { patchApi } from "../../../js/server.js";
import commit from "../commit/index";
export default {
  props: [ 'isReadonly', 'isDispose', 'siTaskId', 'siBusinessId', 'applicationId', 'refresh' ],
  data() {
    return {
      isRedact: true,
      guarantorIndex: '',
      siBusinessIdA: '',
      estate: [], // 房产证下拉
      estateNum: '', // 房产证
      guarantorMsg: {}, // 担保人
      siDetailTxt: [], // 补件内容
      alertReturn: false,
      alertCommit: false,
      hasSubmit: this.isReadonly,
      ruleForm: {
        remark: ""
      },
      patchMsg: {},
      url: "",
      TabActiveName: "first",
      openAddGuarantorDg: false,
      rules: {
          remark: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ]},
       // 证件类型字典
          certificateLibrary: [],
          certificateClass: {},
      // 房产共有人字段
      coownerEdit: {},
      coownerList: [],
      coownerRule: {
        coownerName: [
          { required: true, message: "请填写共有人产权姓名", trigger: "blur" },
          { validator: myRules.nameRule, trigger: "blur" }
        ],
        certificateTypeCode: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        estateNum: [
          { required: true, message: "请选择共有房产", trigger: "change" }
        ],
        certificateNum: [
          { required: true, message: "请先选择证件类型", trigger: "blur" }
        ],
        certificateNumInd01: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
          { validator: myRules.identityCardRule, trigger: "blur" }
        ],
        certificateNumInd04: [
          { required: true, message: "请填写军官证号", trigger: "blur" },
          { validator: (rule, value, callback) => {
              const valReg = /^.{0,50}$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写0~50的字符长度'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
        ],
        certificateNumInd06: [
          {
            required: true,
            message: "请填写港澳居民来往内地通行证号",
            trigger: "blur"
          },
          { validator: (rule, value, callback) => {
              const valReg = /^.{0,50}$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写0~50的字符长度'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
          // { validator: myRules.HKMCardRule, trigger: "blur" }
        ],
        certificateNumInd07: [
          {
            required: true,
            message: "请填写台湾同胞来往内地通行证号",
            trigger: "blur"
          },
          { validator: (rule, value, callback) => {
              const valReg = /^.{0,50}$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写0~50的字符长度'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
          // { validator: myRules.TWCardRule, trigger: "blur" }
        ],
        certificateNumInd15: [
          { required: true, message: "请填写护照号", trigger: "blur" },
          { validator: (rule, value, callback) => {
              const valReg = /^.{0,50}$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写0~50的字符长度'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
          // { validator: myRules.passportRule, trigger: "blur" }
        ],
        propertySharePercent: [
          { required: true, message: "请填写共有人产权份额", trigger: "blur" },
          { validator: (rule, value, callback) => {
              const valReg = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请输入0到100的数'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
        ],
        contactNum: [
          {
            required: true,
            message: "请填写共有人产权联系方式",
            trigger: "blur"
          },
          { validator: myRules.phoneRule, trigger: "blur" }
        ]
      },
      coownerAddDg: false,
      // 担保人信息
      guarantorList: [],
      guarantorId: "", // 被选中编辑的列表
      guarantorHouseId: "", // 被选中的列表 房产证号
      guarantorHouseIdList: [], // 已经有担保人的房产证号
      enableHouseIdList: [] // 可被选中的房产证号
    };
  },
  methods: {
    // 获取下拉菜单
        getLibraryApi(name) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(patchApi.commonSelect, {categoryCode: name, getAll: this.isRedact})
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
          });
        },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    // 复核按钮
    patchReview() {
      return new Promise((resolve, reject) => {
        let data = {
          applicationId: this.applicationId,
          siBusinessId: this.siBusinessId
        };
        this.$MyFetch.get(patchApi.review.patchReview, data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
      });
    },
    // 影像
    showimg() {
      if (this.isDispose) {
        if (this.isReadonly) {
           this.$showImage(this.applicationId, "补件处理", {ReadOnly: '0'});
          // this.$showImage(this.applicationId, "补件处理");
        } else {
          this.$showImage(this.applicationId, "补件处理");
        }
      } else {
        this.$showImage(this.applicationId, "补件复核");
      }
    },
    // 退回
    close_AB() {
      this.closeReturn();
      this.close_();
    },
    alertRT() {
      this.alertReturn = true;
    },
    closeReturn() {
      this.alertReturn = false;
    },
    close_ABC() {
      this.close_();
    },
    // 提交
    commit() {
      this.alertCommit = true;
      // if (this.isDispose) {
      //   let data = {
      //     siTaskId: this.siTaskId
      //   }
      //   this.$MyFetch.put(patchApi.dispose.newTasks, data)
      //   .then(data => {
      //     this.close_();
      //   })
      // }
    },
    closeCommit() {
      this.alertCommit = false;
    },
    // 获取信息
    getPatchReview() {
      // if (isDispose) {
      //   let url = patchApi.dispose.patchReview;
      // }
      return new Promise((resolve, reject) => {
        let data = {
        siBusinessId: this.siBusinessId,
        siTaskId: this.siTaskId
      };
      this.$MyFetch.get(patchApi.dispose.patchReview, data)
      .then(data => {
        // resolve(data);
        console.log(data);
        // if (data.handlerRemarkDesc) {
        //   this.formName.remark = data.handlerRemarkDesc;
        // }
        // this.ruleForm.remark = data.inspectorRemarkDesc;
        this.patchMsg = data;
        this.siDetailTxt = this.patchMsg.siDetailTxt.split('|');
        for (let i = 0; i < this.siDetailTxt.length; i++) {
          this.siDetailTxt[i] = this.siDetailTxt[i].replace(/\n/g, "<br/>");
        }
        // console.log(this.siDetailTxt[0]);

        this.coownerList = this.patchMsg.estateCoowner; // 共有人信息
        this.guarantorList = this.patchMsg.estateGuarantee; // 担保人信息
        this.applicationId = data.applicationId;
      })
      .catch(err => {
        this.$message.error(err.message);
      });
      });
    },
    // 担保人信息
    closeGuarantor() {
      // this.getGuarantorList(this.applicationId);
      this.openAddGuarantorDg = false;
    },
    // 删除担保人信息
    deleteGuarantor(id) {
      this.confirmFn("是否删除该条信息？", "warning")
      .then(() => {
        // let data = {
        //   estateGuaranteeId: id,
        //   siTaskId: this.siTaskId
        // };
        this.$MyFetch.delete(patchApi.dispose.guarantees + '?estateGuaranteeId=' + id + '&siTaskId=' + this.siTaskId)
          .then(() => {
            this.confirmFn('删除成功！', 'success');
            this.getPatchReview();
          });
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 担保人信息 新增（编辑窗口）
    openMessageBox(obj, index) {
      this.guarantorIndex = index;
      this.guarantorMsg = JSON.parse(JSON.stringify(obj));
      // this.guarantorMsg = obj;
      this.enableHouseIdList = [];
      this.guarantorId = obj.id;
      this.guarantorHouseId = obj.estateNum;
      console.log(this.guarantorMsg, '打开担保人啊');
      this.openAddGuarantorDg = true;
          // if (this.TabActiveName === 'first') {
            // if (!obj.id && this.houseList.length >= 2) {
            //   this.confirmFn('最多添加两条房产信息！', 'error');
            //   return;
            // }
            // this.openHouseMessageDg = true;
            // this.houseId = obj.id;
          // } else {
            // if (!obj.id && this.guarantorList.length >= 2) {
            //   this.confirmFn('最多添加两条担保人信息！', 'error');
            //   return;
            // } else if (this.houseIdList.length <= 0) {
            //   this.confirmFn('请先添加房产信息！', 'error');
            //   return;
            // }
            // 过滤掉已经有担保人的房产
            // 保证每一条房产只有一个担保人
            // this.houseIdList.forEach((v) => {
            //   this.enableHouseIdList.push(v);
            // });
          // }
        },
    // 共享人信息
      // 获取房产证号
    getEstate() {
      let data = {
        applicationId: this.applicationId
      };
      this.$MyFetch.get(patchApi.dispose.estate, data)
      .then(data => {
        // console.log(data);
        if (data) {
          this.estate = JSON.parse(JSON.stringify(data.list));
          console.log(data.list, 'aaa');
        }
        // console.log(data.list);
      })
      .catch(err => {
        this.$message.error(err.message);
      });
    },
    openAddCoowner() {
      let isEditing = false;
      // if (this.coownerList.length >= 3) {
      //   this.confirmFn("共有产权人数满三人,无法继续新增！", "error");
      //   return;
      // }
      this.coownerList.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.coownerEdit = {};
      this.coownerAddDg = true;
    },
    closeAddCoowner() {
      this.coownerEdit = {};
      this.coownerAddDg = false;
    },
    // 新增共享人
    saveCoowner() {
      this.$refs.coownerAddForm.validate(valid => {
        if (valid) {
          var data = Object.assign(this.coownerEdit);
          data.certificateNum = this.coownerEdit["certificateNum" + this.coownerEdit.certificateTypeCode];
          this.coownerList.push(data);
          console.log(this.coownerEdit, '新增信息');
          let msg = {
            "applicationId": this.applicationId,
            "certificateNum": this.coownerEdit.certificateNum,
            "certificateTypeCode": this.coownerEdit.certificateTypeCode,
            "contactNum": this.coownerEdit.contactNum,
            "coownerName": this.coownerEdit.coownerName,
            "estateNum": this.coownerEdit.estateNum,
            "id": '',
            "propertySharePercent": this.coownerEdit.propertySharePercent,
            "siTaskId": this.siTaskId
          };
          this.$MyFetch.post(patchApi.dispose.coowner, msg)
            .then(data => {
              this.getPatchReview();
              this.coownerEdit = {};
              this.coownerAddDg = false;
            })
            .catch(err => {
              this.$message.error(err.message);
            });
          // JSON.parse(JSON.stringify(a))
          // let msg = coownerEdit;
        } else {
          console.log("不通过");
        }
      });
    },
    // 打开共享人信息编辑窗口
    openEditEle(obj) {
      console.log(this.coownerEdit, '我看');
      let isEditing = false;
      this.coownerList.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (this.coownerAddDg || isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.$set(obj, "showEle", true);
      this.coownerEdit = JSON.parse(JSON.stringify(obj));
      // console.log(this.coownerEdit);
      this.$set(this.coownerEdit, 'certificateNum' + ((this.coownerEdit.certificateTypeCode) ? this.coownerEdit.certificateTypeCode : ''), this.coownerEdit.certificateNum);
    },
    // 关闭共享人编辑窗口
    closeCoownerEdit(obj) {
      this.$set(obj, "showEle", false);
      this.coownerEdit = {};
      console.log(obj);
    },
    // 保存编辑
    saveCoownerEdit(formName, index) {
      this.$refs[formName][0].validate((valid) => {
          if (valid) {
            this.$set(this.coownerEdit, 'certificateNum', this.coownerEdit['certificateNum' + this.coownerEdit.certificateTypeCode]);
            // this.coownerList[index] = JSON.parse(JSON.stringify(this.coownerEdit));
            let data = {
            "applicationId": this.applicationId,
            "certificateNum": this.coownerEdit.certificateNum,
            "certificateTypeCode": this.coownerEdit.certificateTypeCode,
            "contactNum": this.coownerEdit.contactNum,
            "coownerName": this.coownerEdit.coownerName,
            "estateNum": this.coownerEdit.estateNum,
            "id": this.coownerEdit.id,
            "propertySharePercent": this.coownerEdit.propertySharePercent,
            "siTaskId": this.siTaskId
          };
          this.$MyFetch.put(patchApi.dispose.coowner, data)
            .then(data => {
              this.getPatchReview();
            })
            .catch(err => {
              this.$message.error(err.message);
            });
          // this.$set(obj, "showEle", false);
            // this.$set(this.coownerEdit, 'showEle', false);
            // this.coownerList[index] = JSON.parse(JSON.stringify(this.coownerEdit));
            // this.coownerEdit = {};
          } else {
            console.log('error');
          }
        });
      // this.$refs[formName][0].validate(valid => {
      //   if (valid) {
      //     let msg = {
      //       "applicationId": this.applicationId,
      //       "certificateNum": obj.certificateNum,
      //       "certificateTypeCode": obj.certificateTypeCode,
      //       "contactNum": obj.contactNum,
      //       "coownerName": obj.coownerName,
      //       "estateNum": this.estateNum,
      //       "id": obj.id,
      //       "propertySharePercent": obj.propertySharePercent,
      //       "siTaskId": this.siTaskId
      //     };
      //     this.$MyFetch.put(patchApi.dispose.coowner, msg)
      //       .then(data => {
      //         this.getPatchReview();
      //       })
      //       .catch(err => {
      //         this.$message.error(err.message);
      //       });
      //     this.$set(obj, "showEle", false);
      //   } else {
      //     console.log("error");
      //   }
      // });
    },
    // 获取对应字典项目
    getLibraryValue(library, key) {
      return library[key];
    },
    // 删除共享人信息项
    deleteCoowner(index) {
      this.confirmFn('是否删除该条信息！', 'warning')
        .then(() => {
          if (!this.coownerList[index].id) {
            this.coownerList.splice(index, 1);
            return;
          }
          // let msg = {
          //   estateCoownerId: this.coownerList[index].id,
          //   siTaskId: this.siTaskId
          // };
          this.$MyFetch.delete(patchApi.dispose.coowner + '?estateCoownerId=' + this.coownerList[index].id + "&siTaskId=" + this.siTaskId)
            .then(data => {
              this.confirmFn('删除成功', 'success');
              // this.coownerList.splice(index, 1);
              this.getPatchReview();
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    SectionToChinese(section) {
      let chnNumChar = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      // let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
      let chnUnitChar = ["", "十", "百", "千"];
      let strIns = "";
      let chnStr = "";
      let unitPos = 0;
      let zero = true;
      while (section > 0) {
        let v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    }
  },
  created() {
    if (!this.isReadonly && this.isDispose) {
      this.isRedact = false;
    } else {
      this.isRedact = true;
    }
    this.siBusinessIdA = this.siBusinessId;
    if (this.isDispose) {
      this.getPatchReview();
      this.getEstate();
    } else {
      this.patchReview()
      .then(() => {
        this.getPatchReview();
        this.getEstate();
       });
    };
    this.getLibraryApi('certificate_type_code')
          .then(data => {
            this.certificateLibrary = data;
            data.forEach((v) => {
              this.$set(this.certificateClass, v.itemCode, v.itemDesc);
            });
          });
  },
  components: {
    addGuarantor,
    commit,
    returnA
  }
};
</script>

<style lang="less" scoped>
.import-message {
  .height50{
    height: 50px;
  }
  .dialog-box {
    width: 1200px;
    height: 650px;
    .dialog-box__top {
      .product-title-img {
        > img {
          width: 20px;
          height: 20px;
          // margin: 10px auto;
          position: absolute;
          right: 100px;
          top: 20px;
        }
      }
      .dialog-box-group {
        position: absolute;
        right: 40px;
        top: 0;
      }
    }
    .dialog-box__bottom {
      height: 580px;
      .dialog-box__content {
        text-align: left;
        overflow: scroll;
        height: 90%;
        .content {
          // width: 100%;
          .margin-top {
            margin-top: 20px;
          }
          background: #ffffff;
          .boxShadow(20px, 30px);
          border-radius: 4px;
          margin: 20px 30px;
          .content-head {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 20px;
            .blue-title {
              display: inline-block;
              background: #538bf1;
              width: 2px;
              height: 16px;
              // border: 1px solid #538bf1;
            }
            .title-font {
              font-weight: bold;
              font-size: 16px;
              color: #333333;
            }
          }
          .content__title {
            width: 1072px;
            font-size: 0;
          }
          .content__title > div {
            width: 268px;
            margin-top: 20px;
          }
          .head-title {
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
          }
          .font____{
              font-size: 14px;
              margin-top: 10px;
            }
          .dialog__table-box .customer-message {
            position: relative;
          }
          .dialog__table-box {
            /deep/.table__form-item {
              margin: 0 10px;
            }
            position: relative;
            .table-guarantor {
              th {
                min-width: 91px;
              }
            }
            /deep/ .el-form-item__error {
              padding-top: 0;
            }
          }
          .dialog__table-box.customer-message {
            .tab-box {
              height: 40px;
              padding-left: 20px;
              border: 1px solid #e9e9e9;
              border-bottom: none;
              /deep/ .el-tabs__item {
                font-size: 12px;
              }
              /deep/ .el-tabs__nav-wrap::after {
                background: none;
              }
              /deep/ .el-tabs__nav-wrap {
                padding: 0;
              }
            }
            .add__btn {
              position: absolute;
              right: 10px;
              top: 5px;
              padding: 0 12px;
              line-height: 30px;
              font-size: 14px;
              background: @blue-light;
              border-radius: 3px;
              color: #fff;
              .icon__add {
                padding-right: 8px;
                font-size: 20px;
                font-weight: 900;
              }
            }
          }
          /deep/.el-textarea__inner {
            background: #f9fafb;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            width: 1068px;
            height: 120px;
            resize: none;
            margin: 20px 0;
          }
          .remark{
            margin-top: 10px;
          }
        }
      }
      .button__blue {
        color: white;
        height: 40px;
      }
    }
    .strong {
      font-weight: bold;
    }
    .font-gray {
      font-size: 14px;
      color: #999999;
    }
    .font-black {
      font-size: 14px;
      color: #151515;
      line-height: 20px;
    }
  }
}
/deep/ .table__th {
  width: 14.3%;
}
/deep/ .table__td {
  width: 14.3%;
}
/deep/ .dialog-mask {
  z-index: 1001;
}
/deep/ .el-form {
  text-align: left;
}
</style>
