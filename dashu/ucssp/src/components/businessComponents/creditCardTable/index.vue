<template>
  <div id="credit-card-table" class="dialog__table-box">
    <div class="dialog__table-box">
      <div class="table-form-box">
        <ul class="table__box table_box3">
          <li class="table__head">
            <ul class="table__tr">
              <li class="table__th">贷款发放银行</li>
              <li class="table__th">贷款发放金额</li>
              <li class="table__th">贷款发放日期</li>
              <li class="table__th">贷款到期日期</li>
              <li class="table__th">第一期还款日期</li>
              <li class="table__th">贷款状态</li>
              <li class="table__th">贷款结清日期</li>
              <li class="table__th">贷款月还金额</li>
              <li class="table__th">车贷是否有效</li>
              <li class="table__th" v-if="!isDetail&&!ydApproveMode2">操作</li>
            </ul>
          </li>
          <li class="table__body">
            <div class="table__tr" v-for="(item, index) in carList" :key="item.id">
              <ul class="table__tr__top-list" v-show="!item.showFormEle">
                <li class="table__td">{{item.bankCode}}</li>
                <li class="table__td">{{item.loanAmt}}元</li>
                <li class="table__td">{{getTime(item.loanDate)}}</li>
                <li class="table__td">{{getTime(item.dueDate)}}</li>
                <li class="table__td">{{getTime(item.firstRepaymentDate)}}</li>
                <li class="table__td">{{item.loanStatusCode === null ? '' : (item.loanStatusCode === dCode.loanStatusCode.normal) ? '正常' : '结清'}}</li>
                <li class="table__td">{{getTime(item.settlementDate)}}</li>
                <li class="table__td">{{item.monthlyRepaymentAmt}}元</li>
                <li class="table__td">{{(item.availableInd === null) ? '/' : (item.availableInd ? '是' : '否')}}</li>
                <li class="table__td" v-if="!isDetail&&!ydApproveMode2">
                  <div class="operate-box">
                    <i class="icon el-icon-plus cursor__pointer" @click="openAddCar" v-if="index  === (carList.length -1) && !carEditDg"></i>
                    <i class="icon el-icon-minus cursor__pointer" @click="deleteCar(item.id)"></i>
                    <i class="icon icon__edit cursor__pointer" @click="editCarELe(item)"></i>
                  </div>
                </li>
              </ul>
              <el-form :model="carEdit"
                  :rules="carRule" :ref="'carEditForm' + index"
                  class="demo-form-inline" label-position="top" v-show="item.showFormEle"
                  :disabled="isDetail || !openVideo || ydApproveMode2 ">
                <div class="table__tr__bottom-list" >
                  <el-form-item label="" prop="bankCode" class="table__form-item">
                    <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                  </el-form-item>
                  <el-form-item label="" prop="loanAmt" class="table__form-item">
                    <el-input v-model="carEdit.loanAmt" maxlength="20"></el-input>
                  </el-form-item>
                  <el-form-item label="" prop="loanDate" class="table__form-item">
                    <el-date-picker
                      v-model="carEdit.loanDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="" prop="dueDate" class="table__form-item">
                    <el-date-picker
                      v-model="carEdit.dueDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="" prop="firstRepaymentDate" class="table__form-item">
                    <el-date-picker
                      v-model="carEdit.firstRepaymentDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="" prop="loanStatusCode" class="table__form-item">
                    <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carEditForm' + index)">
                      <el-option
                        v-for="item in carLoanStatusCodeLibrary"
                        :key="item.itemCode" :label="item.itemDesc"
                        :value="item.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="" prop="settlementDate" class="table__form-item">
                    <el-date-picker
                      v-model="carEdit.settlementDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp"
                      :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                      :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                    <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                    <!-- <el-input-number class="input__number" v-model="carEdit.monthlyRepaymentAmt" :min="0" :max="99999999" placeholder="请填写贷款月还金额"></el-input-number> -->
                  </el-form-item>
                  <el-form-item label="" class="table__form-item">
                    <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="operate-box text__center" v-if="!isDetail&&!ydApproveMode2">
                    <i class="icon el-icon-check cursor__pointer" @click="saveEditCar('carEditForm' + index, item)" ></i>
                    <i class="icon el-icon-minus cursor__pointer" @click="closeCarEle(item)"></i>
                  </div>
                </div>
              </el-form>
            </div>
          </li>
          <li class="table__body" v-show="carList.length === 0 || carEditDg">
            <div class="table__tr">
              <el-form :model="carEdit"
                  :rules="carRule" ref="carAddForm"
                  class="demo-form-inline" label-position="top"
                  :disabled="isDetail || !openVideo || ydApproveMode2">
                <div class="table__tr__bottom-list" >
                  <el-form-item  prop="bankCode" class="table__form-item">
                    <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                  </el-form-item>
                  <el-form-item  prop="loanAmt" class="table__form-item">
                    <el-input v-model="carEdit.loanAmt" maxlength="20"></el-input>
                  </el-form-item>
                  <el-form-item  prop="loanDate" class="table__form-item">
                    <el-date-picker v-model="carEdit.loanDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item  prop="dueDate" class="table__form-item">
                    <el-date-picker v-model="carEdit.dueDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item  prop="firstRepaymentDate" class="table__form-item">
                    <el-date-picker v-model="carEdit.firstRepaymentDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp" :editable="false"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item  prop="loanStatusCode" class="table__form-item">
                    <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carAddForm')">
                      <el-option v-for="item in carLoanStatusCodeLibrary"
                        :key="item.itemCode" :label="item.itemDesc"
                        :value="item.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="" prop="settlementDate" class="table__form-item">
                    <el-date-picker v-model="carEdit.settlementDate"
                      type="date" format="yyyy/MM/dd"
                      value-format="timestamp"
                      :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                      :editable="false" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                    <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                    <!-- <el-input-number class="input__number" v-model="carEdit.monthlyRepaymentAmt" :min="0" :max="99999999" placeholder="请填写贷款月还金额"></el-input-number> -->
                  </el-form-item>
                  <el-form-item label="" class="table__form-item">
                    <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="operate-box text__center" v-if="!isDetail&&!ydApproveMode2">
                    <i class="icon el-icon-check cursor__pointer" @click="addCar"></i>
                    <i class="icon el-icon-minus cursor__pointer" @click="closeAddCar"></i>
                  </div>
                </div>
              </el-form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {baseApi} from '@system/face2face/js/server';
import { carRule } from '@system/face2face/js/mind';
export default {
  name: 'creditCardTable',
  props: {
    dictLib: {
      type: Object,
      default: () => ({})
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    },
    ydApproveMode2: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => ([])
    },
    nodeStatus: {
      type: String,
      default: 'beforeApprovalAudit'
    }
  },
  data () {
    const carMixRule = {
      settlementDate: [
        {
          validator: (rule, value, callback) => {
            if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.settle && !value) {
              return callback(new Error("请选择贷款结清日期!"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    };
    return {
      carEdit: {settlementDate: ''},
      dCode: this.$getCodeDependent(),
      carLoanStatusCodeLibrary: [], // 贷款状态字典
      carList: [],
      carEditDg: false,
      api: !this.isDetail ? baseApi.pending : baseApi.processed,
      carRule: Object.assign(carRule, carMixRule)
    };
  },
  methods: {
    isEditing(_list) {
      let flag = false;
      for (let i = 0; i < _list.length; i++) {
        if (_list[i].showFormEle) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    // 根据时间搓返回时间
    getTime(time) {
      var str = "/";
      if (time) {
        time = typeof time === "string" ? time.replace(/-/g, "/") : time;
        str = new Date(time).normalizeTime().strDate;
      }
      return str;
    },
    // 获取车供信息列表
    getCarList() {
      this.$MyFetch.post(baseApi.completeProduct.getCarList, {applicationId: this.applicationId})
        .then((data) => {
          data = data || {};
          this.carList = data.list;
          this.carList.forEach((v) => {
            v.dueDate = v.dueDate ? (new Date(v.dueDate.replace(/-/g, "/"))).getTime() : "";
            v.firstRepaymentDate = v.firstRepaymentDate ? (new Date(v.firstRepaymentDate.replace(/-/g, "/"))).getTime() : "";
            v.loanDate = v.loanDate ? (new Date(v.loanDate.replace(/-/g, "/"))).getTime() : "";
            v.settlementDate = v.settlementDate ? (new Date(v.settlementDate.replace(/-/g, "/"))).getTime() : "";
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 新增车贷信息
    addCar() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs.carAddForm.validate(valid => {
        if (valid) {
          this.carEdit.applicationId = this.applicationId;
          this.addCarApi(this.carEdit).then(() => {
            this.carEditDg = false;
            this.getCarList();
          });
        }
      });
    },
    addCarApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(baseApi.completeProduct.addCar, data)
          .then(data => {
            resolve(data);
          }).catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 打开编辑车贷表格
    editCarELe(obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      let isEdit = this.isEditing(this.carList);
      if (this.carEditDg || isEdit) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.$set(obj, 'showFormEle', true);
      this.carEdit = Object.assign({}, obj);
      this.carCurrentEdit = Object.assign({}, obj);
    },
    // 关闭编辑车贷表格
    closeCarEle(obj) {
      this.carCurrentEdit = {};
      this.carEdit = {};
      this.$set(obj, "showFormEle", false);
    },
    // 保存编辑
    saveEditCar(formName, obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          console.log(this.carEdit);
          this.carEdit.applicationId = this.applicationId;
          this.saveEditCarApi(this.carEdit, obj);
        } else {
          console.error("error");
          this.confirmFn('请先完成正在编辑的表格', 'error');
        }
      });
    },
    saveEditCarApi(data, obj) {
      this.$MyFetch
        .post(baseApi.completeProduct.editCar, data)
        .then(() => {
          this.getCarList();
          this.confirmFn("修改成功", "success");
          this.closeCarEle(obj);
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 车贷状态为正常时 结清日期清空
    clearCarDate(formName) {
      if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.normal) {
        this.carEdit.settlementDate = "";
      }
      if (!this.$refs[formName][0]) {
        this.$refs[formName].validateField(['settlementDate']);
      } else {
        this.$refs[formName][0].validateField(['settlementDate']);
      }
    },
    // 删除车供信息
    deleteCar(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.carCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning")
        .then(async () => {
          await this.deleteCarApi(id);
          this.getCarList();
        });
    },
    deleteCarApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.completeProduct.deleteCar + id)
          .then((data = {}) => {
            this.confirmFn('删除成功！', 'success');
            this.carEdit = {settlementDate: ''};
            resolve(data);
          }).catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 打开新增
    openAddCar() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.carCurrentEdit.id) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.carEdit = JSON.parse(JSON.stringify({settlementDate: ''}));
      if (this.carList.length >= 3) {
        this.confirmFn('车贷信用卡满三份，无法继续新增！', 'error');
        return;
      }
      this.carEditDg = true;
    },
    // 关闭新增
    closeAddCar() {
      this.carEditDg = false;
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    }
  },
  created() {
    let selectArr = [
      "car_loan_status_code"
    ];
    this.getMultipleLibrary(selectArr, this.isDetail)
      .then(data => {
        this.carLoanStatusCodeLibrary = data.car_loan_status_code;
      })
      .catch(err => {
        this.confirmFn(err.message);
      });
  },
  mounted() {
    this.getCarList();
  },
  computed: {
    ...mapGetters(['openVideo'])
  }
};
</script>

<style lang="less">
  #credit-card-table {
    .el-form-item {
      margin-bottom: 0px;
    }
    .table__head .table__tr {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-width: 100%;
      border-bottom: 1px solid #d0d0d0;
      background: #f5f5f5;
      .table__th {
        // min-width: 83px;
        line-height: 60px;
        width: 100%;
        display: block;
      }
    }
    .table__tr__bottom-list, .table__tr__top-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      .table__form-item {
        padding: 0 4px;
        .el-date-editor, .el-cascader, .el-select {
          width: 100%;
        }
      }
      li.table__td {
        line-height: 50px;
        // min-width: 83px;
        // max-width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        display: block;
      }
    }
  }
</style>
