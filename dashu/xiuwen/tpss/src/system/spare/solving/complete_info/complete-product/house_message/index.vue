<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">房产基本信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form :model="houseEdit"
                 :rules="houseRule"
                 ref="houseForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top" >
          <div class="form__block bg__white border__radius-5" >
            <div class="dialog-box__middle-top">
              <h5 class="title"><span class="icon icon__gan"></span>房产基本信息</h5>
            </div>
            <div class="dialog-box__form__group">
              <el-form-item label="房产证号" prop="estateNum">
                <el-input
                  @input="inputChange"
                  v-model="houseEdit.estateNum"
                  maxlength="50"
                  :disabled="!!hasSubmit"></el-input>
              </el-form-item>
              <el-form-item label="房产证地址" prop="addressCode">
                <el-cascader
                  @change="inputChange"
                  :disabled="!!hasSubmit"
                  :options="areaList"
                  v-model="houseEdit.addressCode">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" prop="addressDesc">
                <el-input
                  @input="inputChange"
                  v-model="houseEdit.addressDesc"
                  maxlength="100"
                  :disabled="!!hasSubmit"></el-input>
              </el-form-item>
              <el-form-item label="房屋性质" prop="estateTypeCode">
                <el-select
                  @change="inputChange"
                  v-model="houseEdit.estateTypeCode" placeholder="请选择" :disabled="!!hasSubmit">
                  <el-option
                    v-for="(item, index) in estateTypeCodeLibrary"
                    :key="index"
                    :label="item.itemDesc"
                    :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="持有房产时间" prop="obtainDate">
                <el-date-picker
                  :editable="false"
                  v-model="houseEdit.obtainDate"
                  type="date"
                  format="yyyy/MM/dd"
                  :disabled="!!hasSubmit"
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="是否抵押" prop="mortgageInd">
                <el-switch
                  v-model="houseEdit.mortgageInd"
                           :width="50"
                           active-text="是"
                           inactive-text="否"
                           :active-value="true"
                           :inactive-value="false"
                           :disabled="!!hasSubmit"
                ></el-switch>
              </el-form-item>
              <el-form-item label="借款人产权份额（%）" prop="propertySharePercent">
                <el-input
                  v-model="houseEdit.propertySharePercent" :disabled="!!hasSubmit" :readonly="houseEdit.coownersCnt === '1' || houseEdit.coownersCnt === 1"></el-input>
              </el-form-item>
              <el-form-item label="面积（平方米）" prop="houseSizeMeas">
                <el-input
                  v-model="houseEdit.houseSizeMeas" @blur="formatMoney('houseEdit', 'houseSizeMeas')" :disabled="!!hasSubmit" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="共有产权人数" prop="coownersCnt">
                <el-select
                  @change="changeCoowner"
                  v-model="houseEdit.coownersCnt"
                  placeholder="请选择" :disabled="!!hasSubmit">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人工录入均价" prop="inputAverageAmt">
                <el-input v-model="houseEdit.inputAverageAmt" :disabled="!!hasSubmit"></el-input>
              </el-form-item>
              <el-form-item label="世联均价" prop="slAverageAmt">
                <el-input v-model="houseEdit.slAverageAmt" readonly ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>共有人信息</h5>
          </div>
          <div class="dialog__table-box">
            <div class="dialog__table-form-box">
              <ul class="table__box">
                <li class="table__head">
                  <ul class="table__tr">
                    <li class="table__th">共有人产权姓名</li>
                    <li class="table__th">证件类型</li>
                    <li class="table__th width200">证件号</li>
                    <li class="table__th">共有人产权份额</li>
                    <li class="table__th">共有产权人联系方式</li>
                    <li class="table__th">操作</li>
                  </ul>
                </li>
                <li class="table__body" v-for="(item, index) in coownerList" :key="index">
                  <div class="table__tr">
                    <ul class="table__tr__top-list" v-show="!item.showEle">
                      <li class="table__td">{{item.coownerName}}</li>
                      <li class="table__td">{{getLibraryValue(certificateLibrary, item.certificateTypeCode)}}</li>
                      <li class="table__td">{{item.certificateNum}}</li>
                      <li class="table__td">{{item.propertySharePercent}}%</li>
                      <li class="table__td">{{item.contactNum}}</li>
                      <li class="table__td">
                        <div class="operate-box" v-if="!hasSubmit">
                          <i class="icon el-icon-plus cursor__pointer" @click="openAddCoowner" v-if="index === (coownerList.length -1)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="deleteCoowner(index)"></i>
                          <i class="icon icon__edit cursor__pointer" @click="openEditEle(item)"></i>
                        </div>
                      </li>
                    </ul>
                    <el-form :model="coownerEdit"
                             :rules="coownerRule"
                             :ref="'coownerEditForm' + index"
                             label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <div class="table__tr__bottom-list" v-show="item.showEle">
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item, index) in certificateTypeCodeLibrary"
                              :key="index"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          style="flex: 1 1 90px;"
                          prop="certificateNum"
                          class="table__form-item">
                          <el-input v-model="coownerEdit.certificateNum"></el-input>
                        </el-form-item>
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum"></el-input>
                        </el-form-item>
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveCoownerEdit('coownerEditForm' + index, index)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeCoownerEdit(item)"></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
                <li class="table__body" v-show="coownerAddDg || (coownerList.length === 0)">
                  <div class="table__tr">
                    <el-form :model="coownerEdit"
                             :rules="coownerRule"
                             ref="coownerAddForm"
                             label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <div class="table__tr__bottom-list" >
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item, index) in certificateTypeCodeLibrary"
                              :key="index"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          style="flex: 1 1 90px;"
                          prop="certificateNum"
                          class="table__form-item">
                          <el-input v-model="coownerEdit.certificateNum"></el-input>
                        </el-form-item>
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum"></el-input>
                        </el-form-item>
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveCoowner"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner"></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form__bottom">
          <button type="button" @click="saveHouse(true)" class="width200 button__border-blue button" :disabled="!!hasSubmit">保存</button>
          <button type="button" @click="querySl" class="width200 button__yellow button" :disabled="!!hasSubmit">世联查询</button>
          <button type="button" @click="queryResultSl" class="width200 button__green button" :disabled="!!hasSubmit">世联结果查询</button>
          <el-button type="primary" class="width200" @click="saveHouse(false)" :disabled="!!hasSubmit">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import myRule from '@common/js/rules';
  import {spareApi} from '../../../../js/server.js';
  export default{
    props: {
      houseId: {
        type: Number
      },
      areaList: {
        type: Array,
        default: function() {
          return {};
        }
      },
      applicationId: {
        type: String,
        default: () => {
          return '';
        }
      },
      houseIdList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      hasSubmit: {
        default: () => {
          return false;
        }
      }
    },
    data() {
      return {
        // 证件类型字典
        certificateLibrary: {},
        certificateTypeCodeLibrary: [],
        // 住房性质
        estateTypeCodeLibrary: [],
        // 房产共有人字段
        options: [],
        coownerEdit: {
          certificateNum: null,
          certificateTypeCode: null
        },
        coownerList: [],
        coownerRule: {
          coownerName: [
            { required: true, message: '请填写共有人产权姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请填选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { validator: this.checkCard, trigger: 'blur' }
          ],
          propertySharePercent: [
            { required: true, message: '请填写共有人产权份额', trigger: 'blur' },
            { validator: myRule.percentTwoBitRule, trigger: 'blur' }
          ],
          contactNum: [
            { required: true, message: '请填写共有人产权联系方式', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ]
        },
        coownerAddDg: false,
        // 房屋信息字段
        houseRule: {
          estateNum: [
            { required: true, message: '请填写房产证号', trigger: 'blur' },
            { validator: this.checkHasExist, trigger: 'blur' }
          ],
          addressCode: [
            { required: true, message: '请选择房产证地址', trigger: 'change' }
          ],
          addressDesc: [
            { required: true, message: '请填写房产证详细地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          estateTypeCode: [
            { required: true, message: '请选择房屋性质', trigger: 'change' }
          ],
          obtainDate: [
            { required: true, message: '请选择房屋持有时间', trigger: 'change' }
          ],
          propertySharePercent: [
            { required: true, message: '请填写共有人产权份额', trigger: 'blur' },
            { validator: myRule.percentTwoBitRule, trigger: 'blur' }
          ],
          houseSizeMeas: [
            { required: true, message: '请填写房屋面积', trigger: 'blur' },
            { validator: myRule.numTwoBit, trigger: 'blur' }
          ],
          coownersCnt: [
            { required: true, message: '请选择共有产权人数', trigger: 'change' }
          ],
          inputAverageAmt: [
            { validator: myRule.numTwoBit, trigger: 'blur' }
          ]
        },
        houseEdit: {
          estateNum: '',
          addressCode: [],
          addressDesc: '',
          estateTypeCode: '',
          mortgageInd: false,
          propertySharePercent: '',
          coownersCnt: '',
          houseSizeMeas: '',
          inputAverageAmt: '',
          obtainDate: '',
          slAverageAmt: ''
        },
        currentEstateNum: '',
        dCode: this.$getCodeDependent(),
        currentHouseId: this.houseId
      };
    },
    created() {
      if (this.currentHouseId) {
        this.getHouseMessage(this.currentHouseId);
      }
      this.getLibraryApi('estate_type_code')
        .then(data => {
          this.estateTypeCodeLibrary = data;
        });
      this.getLibraryApi('certificate_type_code')
        .then(data => {
          this.certificateTypeCodeLibrary = data;
          data.forEach((v) => {
            this.$set(this.certificateLibrary, v.itemCode, v.itemDesc);
          });
        });
    },
    methods: {
      close() {
        this.coownerEdit = {
          certificateNum: null,
          certificateTypeCode: null
        };
        this.coownerList = [];
        this.$emit('close');
      },
      // 共享人信息
      openAddCoowner() {
        let isEditing = false;
        if (this.coownerList.length >= 3) {
          this.confirmFn('共有产权人数满三人,无法继续新增！', 'error');
          return;
        }
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.coownerEdit = {};
        this.coownerAddDg = true;
      },
      closeAddCoowner() {
        this.coownerEdit = {
          certificateNum: null,
          certificateTypeCode: null
        };
        this.coownerAddDg = false;
      },
      saveCoowner() {
        this.$refs.coownerAddForm.validate((valid) => {
            if (valid) {
              var data = Object.assign(this.coownerEdit);
              this.coownerList.push(data);
              this.coownerEdit = {
                certificateNum: null,
                certificateTypeCode: null
              };
              this.coownerAddDg = false;
            } else {
              console.log('不通过');
            }
        });
      },
      // 打开共享人信息编辑窗口
      openEditEle(obj) {
        let isEditing = false;
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (this.coownerAddDg || isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.$set(obj, 'showEle', true);
        this.coownerEdit = JSON.parse(JSON.stringify(obj));
      },
      // 关闭共享人编辑窗口
      closeCoownerEdit(obj) {
        this.$set(obj, 'showEle', false);
        this.coownerEdit = {
          certificateNum: null,
          certificateTypeCode: null
        };
      },
      // 保存编辑
      saveCoownerEdit(formName, index) {
        this.$refs[formName][0].validate((valid) => {
          if (valid) {
            this.$set(this.coownerEdit, 'showEle', false);
            this.coownerList[index] = JSON.parse(JSON.stringify(this.coownerEdit));
            this.coownerEdit = {
              certificateNum: null,
              certificateTypeCode: null
            };
          } else {
            console.log('error');
          }
        });
      },
      // 删除共享人信息项
      deleteCoowner(index) {
        this.confirmFn('是否删除该条信息！', 'warning')
          .then(() => {
            if (!this.coownerList[index].id) {
              this.coownerList.splice(index, 1);
              return;
            }
            this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.deletCoowner + this.coownerList[index].id)
              .then(data => {
                this.confirmFn('删除成功', 'success');
                this.coownerList.splice(index, 1);
              })
              .catch(err => {
                this.confirmFn(err.message);
              });
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 房屋信息
      // 提交 temporary 用于暂存
      saveHouse(temporary = false) {
        this.$refs.houseForm.validate((valid) => {
          if (valid) {
            if (!this.saveHouseValid()) {
              return;
            }
            if (!this.houseEdit.inputAverageAmt && !this.houseEdit.slAverageAmt && !temporary) {
              this.confirmFn('请输入均价,或查询世联均价', 'error');
              return;
            }
            let data = Object.assign({}, this.houseEdit);
            data.coownerList = Object.assign(this.coownerList);
            data.applicationId = this.applicationId;
            data.mortgageInd = data.mortgageInd ? data.mortgageInd : false;
            this.$set(data, 'addressCode', data.addressCode[data.addressCode.length - 1]);
            console.log(this.currentHouseId);
            if (!this.currentHouseId) {
              this.saveHouseApi(data, temporary);
            } else {
              data.id = this.currentHouseId;
              this.saveEditHouseApi(data, temporary);
            }
          } else {
            console.log('error!');
          }
        });
      },
      saveHouseValid() {
        let isEditing = false;
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if ((this.coownerAddDg && this.houseEdit.coownersCnt !== '0') || isEditing) {
          this.confirmFn('请先完成正在编辑共有人信息表格', 'error');
          return false;
        }
        if (this.coownerList.length !== (this.houseEdit.coownersCnt - 1)) {
          this.confirmFn(`当前房产共有人数为${this.houseEdit.coownersCnt},共有人信息应为${this.houseEdit.coownersCnt - 1}条`, 'error');
          return false;
        }
        let areaPercent = this.houseEdit.propertySharePercent - 0;
        this.coownerList.forEach((v) => {
          areaPercent += v.propertySharePercent - 0;
        });
        if (areaPercent !== 100) {
          this.confirmFn('房产共有人产权份额之和不为100%');
          return false;
        }
        return true;
      },
      saveHouseApi(data, temporary = false) {
       this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.addHouse, data)
         .then((data) => {
           this.confirmFn('保存成功！', 'success');
           console.log(data);
           this.currentHouseId = data;
           !temporary && this.close();
         })
         .catch(err => {
           this.confirmFn(err.message, 'error');
         });
      },
      saveEditHouseApi(data, temporary = false) {
        this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.editHouse, data)
          .then(() => {
            this.confirmFn(temporary ? '保存成功' : '更新成功！', 'success');
            !temporary && this.close();
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 获取房屋信息
      getHouseMessage(id) {
        this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getHourseMessage + id)
          .then((data = {}) => {
            let arr = this.getAddressArr(data.addressCode, this.areaList);
            if (data.obtainDate) {
              data.obtainDate = (new Date(data.obtainDate.replace(/-/g, "/"))).getTime();
            }
            data.addressCode = arr;
            this.houseEdit = data;
            this.coownerList = data.coownerList;
            this.currentEstateNum = this.houseEdit.estateNum;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取对应字典项目
      getLibraryValue(library, key) {
        return library[key];
      },
      // 检查房产证编号是否存在
      checkHasExist(rule, value, callback) {
        var hasExist = false;
        if (this.currentHouseId) {
          this.houseIdList.forEach((v) => {
            if (this.currentEstateNum !== v && v === value) { // 如果不为自己的id 同时又与别人的id 相同
              hasExist = true;
            }
          });
        } else {
          this.houseIdList.forEach((v) => {
            if (value === v) {
              hasExist = true;
            }
          });
        }
        if (hasExist) {
          return callback(new Error('房产证编号已存在!'));
        } else {
          callback();
        }
      },
      querySl() {
        let data = {
          addressCode: this.houseEdit.addressCode[this.houseEdit.addressCode.length - 1],
          addressDesc: this.houseEdit.addressDesc,
          applicationId: this.applicationId,
          estateNum: this.houseEdit.estateNum,
          houseSizeMeas: this.houseEdit.houseSizeMeas - 0,
          number: this.houseEdit.number,
          id: this.currentHouseId
        };
        this.$refs.houseForm.validate((valid) => {
          if (valid) {
            this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getSl, data)
              .then((data) => {
                if (data.isSuccess) {
                  this.confirmFn('查询成功!', 'success');
                } else {
                  this.confirmFn(data.remark);
                }
                this.houseEdit.slAverageAmt = data.unitPrice;
              })
              .catch(err => {
                this.confirmFn(err.message);
              });
          } else {
            this.confirmFn('请完成房产基本信息表单！');
          }
        });
      },
      queryResultSl() {
        let data = {
          addressCode: this.houseEdit.addressCode[this.houseEdit.addressCode.length - 1],
          addressDesc: this.houseEdit.addressDesc,
          applicationId: this.applicationId,
          estateNum: this.houseEdit.estateNum,
          houseSizeMeas: this.houseEdit.houseSizeMeas - 0,
          number: this.houseEdit.number,
          id: this.currentHouseId
        };
        this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getManual, data)
          .then((data) => {
            if (data.isSuccess) {
              this.confirmFn('查询成功！', 'success');
              this.houseEdit.slAverageAmt = data.unitPrice;
            } else {
              this.confirmFn(data.remark);
            }
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      },
      // 输入的数字自动补00
      formatMoney(objName, key) {
        if (!isNaN(this[objName][key])) {
          if (this[objName][key] === '') return;
          this[objName][key] = (Math.round(this[objName][key] * 100) / 100).toString();
          let rs = this[objName][key].indexOf('.');
          if (rs < 0) {
            this[objName][key] += '.00';
          } else {
            while (this[objName][key].length <= (rs + 2)) {
              this[objName][key] += '0';
            }
          }
        }
      },
      changeCoowner() {
        if (this.houseEdit.coownersCnt === '1') {
          this.$set(this.houseEdit, 'propertySharePercent', 100);
        }
      },
      // 获取字典下拉
      getLibraryApi(name) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      // 验证件号
      checkCard(rule, value, callback) {
        if (!this.coownerEdit.certificateTypeCode) {
          callback(new Error('请先选择证件类型！'));
        } else if (!value) {
          callback(new Error('请填写证件号码！'));
        } else if (this.coownerEdit.certificateTypeCode === this.dCode.certificateTypeCode.ID) {
          myRule.identityCardRule(rule, value, callback);
        } else {
          myRule.otherCardRule(rule, value, callback);
        }
      },
      inputChange() {
        this.houseEdit.slAverageAmt = '';
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan {
    .dialog-box {
      width: 916px;
      .mgtop {
        margin-top: 20px;
      }
      .dialog-box__middle {
        height: 542px;
        overflow-y: auto;
        padding: 0 20px;
        .form__block {
          padding: 20px 30px;
          margin-bottom: 20px;
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
          .dialog-box__middle-top {
            padding-bottom: 20px;
            border-bottom: 1px solid #E9E9E9;
            margin-bottom: 20px;
            .title {
              font-size: 16px;
              .icon__gan {
                margin-right: 10px;
              }
            }
          }
          .message__list {
            padding-top: 20px;
            .item {
              margin-right: 60px;
              padding-bottom: 20px;
              font-size: 0;
              .title {
                display: inline-block;
                margin-right: 5px;
                font-size: 14px;
                color: #999;
              }
              .content {
                font-size: 14px;
                display: inline-block;
              }
            }
            .item:last-child {
              margin-right: 0;
            }
          }
          .dialog-box__form__group {
            margin-right: -40px;
            .el-form-item {
              width: 33.333%;
              padding-right: 40px;
              margin-right: 0;
            }
          }
        }
        .form__bottom {
          text-align: center;
          padding-bottom: 20px;
          .button{
            margin-right: 15px;
          }
          .button:disabled{
            cursor: not-allowed;
          }
        }
        .dialog__table-form-box{
          font-size: 12px;
          .table__box{
            border: 1px solid @line-color;
            border-radius: 4px;
            .table__head{
              .table__tr{
                .table__th{
                  min-width: 120px;
                }
              }
            }
            .table__body{
              .table__tr{
                .table__tr__top-list{
                  .table__td{
                    min-width: 135px;
                  }
                }
                .table__tr__bottom-list{
                  .table__form-item{
                    padding: 0 10px;
                  }
                  .operate-box{
                    padding: 0 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
