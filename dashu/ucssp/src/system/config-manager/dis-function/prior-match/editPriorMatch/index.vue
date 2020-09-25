<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    .dialog-box__top {
      margin: 0px;
    }
    width: 946px;
    // height: 765px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 417px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      // height: 709px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      height: 420px;
      overflow-y: auto;
      .form__block {
        // height: 709px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
        .dialog-box__form__group {
          height: 106px;
          display: inline-block;
          padding-top: 20px;
          .effectivity {
            position: relative;
            display: inline-block;
            width: 380px;
            height: 20px;
            .li {
              width: 84px;
              height: 20px;
              display: inline-block;
            }
          }
          .time {
            /deep/ .el-form-item__content{
              height: 45px;
            }
          }
        }
        .message__list {
          display: inline-block;
          padding-bottom: 30px;
          padding-top: 0px;
          li {
            line-height: 20px;
            padding: 0px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
            height: 20px;
          }
        }
        .prevent {
          width: 905px;
          // height: 232px;
          background: #ffffff;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 20px 30px;
          .comptroller {
            width: 94px;
            height: 20px;
            border-left: 2px solid #538bf1;
            span {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              line-height: 20px;
              color: #333333;
              display: block;
              margin-left: 10px;
              width: 100px;
              height: 20px;
            }
          }
        }
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
    .el-form-item {
      width: 118px;
      height: 40px;
      margin-left: 20px;
      .el-form-item__content {
        width: 118px;
        height: 30px;
        // 不进审计详情分类 文字溢出隐藏
        .classification {
          width: 118px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-form-item__content {
        width: 118px;
        height: 30px;
        .el-input-number {
          width: 118px;
          height: 30px;
        }
        .el-input {
          width: 118px;
          height: 30px;
        }
        .el-select {
          width: 118px;
          height: 30px;
          .el-input {
            width: 118px;
            height: 30px;
          }
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__block {
      .dialog-box__middle-top {
        padding-bottom: 20px;
        border-bottom: 1px solid #e9e9e9;
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
            color: #666;
          }
          .content {
            font-size: 14px;
            display: inline-block;
          }
        }
      }
      .dialog-box__form__group {
        margin-right: -40px;
        font-size: 0;
        .el-form-item {
          .el-form-item__content {
            .el-date-editor {
              width: 170px;
            }
          }
        }
      }
      .dialog__table-form-box {
        .table__box {
          .table__body {
            .precedence {
              .el-form-item__content {
                /deep/ .el-input {
                   height: 30px;
                }
              }
            }
            .table__form-item {
              div {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
              }
            }
            .table__tr__top-list {
              .table__td {
                width: 168px;
                height: 40px;
                .el-collapse {
                  border: 0px;
                  /deep/ .el-collapse-item__header {
                    width: 168px;
                    height: 40px;
                    border: 0px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 40px;
                    .el-collapse-item__wrap {
                      border: 0px;
                      .el-collapse-item__content {
                        padding: 0px;
                      }
                    }
                  }
                }
                /deep/.el-collapse-item__wrap {
                  border-bottom: 0px;
                }
                /deep/.el-collapse-item:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
          .table__tr {
            .table__th {
              width: 168px;
              height: 60px;
            }
            .table__form-item-z {
              width: 157px;
              height: 100%;
              margin-left: 0px;
              margin-bottom: 0px;
              margin-right: 15px;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              // white-space: nowrap;
              line-height: 40px;
            }
          }
        }
      }
      .dialog__table-box {
        margin-bottom: 20px;
        position: relative;
        top: 20px;
      }
    }
    .table__list {
      .item {
        padding-top: 20px;
        .dialog__table-box {
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
      }
    }
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
/deep/.el-select-dropdown {
  width: 200px;
  .el-scrollbar {
    .el-select-dropdown__list {
      /deep/ .el-select-dropdown__item {
        width: 200px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
/deep/ .form__block .el-form-item__content .el-select .el-select__tags {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .form__block .el-select .el-select__tags .el-tag {
  margin-top: 10px;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form :model="ruleForm" ref="ruleForm" :rules="time" label-width="100px" class="demo-form-inline" label-position="top">
            <div class="form__block bg__white border__radius-5">
              <ul class="message__list clearfix">
                <li class="f__left item">
                  <h5 class="title">是否有效：</h5>
                  <span class="content">{{compile.statusInd === "停用" ? '否' : '是'}}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">结束日期：</h5>
                  <span class="content">{{ compile.effectiveEndDate }}</span>
                </li>
              </ul>
              <div class="dialog-box__form__group">
                <el-form-item prop="date1" class="time">
                  <el-date-picker v-model="ruleForm.date1" type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" placeholder="选择生效日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="prevent">
                <!-- <div class="comptroller"><span>不进审计条件</span></div> -->
                <div class="dialog__table-box">
                  <div class="dialog__table-form-box">
                    <ul class="table__box">
                      <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th">序号</li>
                          <li class="table__th">优先字段</li>
                          <li class="table__th">详情分类</li>
                          <li class="table__th">优先原因</li>
                          <li class="table__th">操作</li>
                        </ul>
                      </li>
                      <li class="table__body" v-for="(item, index) in form_a" :key="index">
                          <div class="table__tr">
                            <!-- 展示数据 -->
                            <ul class="table__tr__top-list" v-show="!item.showEle">
                              <li class="table__td">{{item.guarantee_name}}</li>
                              <li class="table__td">{{item.certificate_type_code}}</li>
                              <li class="table__td">{{item.contact_num}}</li>
                              <li class="table__td"><el-collapse v-model="activeNames">
                                <el-collapse-item>
                                  <template slot="title">
                                    {{item.house_area_num}}
                                  </template>
                                  <div>{{item.house_area_num}}</div>
                                </el-collapse-item>
                              </el-collapse>
                              </li>
                              <li class="table__td">
                                <div class="operate-box">
                                  <i
                                    class="icon el-icon-plus cursor__pointer"
                                    @click="openAddCoowner"
                                    v-if="index === (form_a.length -1)"
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
                              :model="form"
                              :rules="rules"
                              :ref="'coownerEditForm' + index"
                              label-width="100px"
                              class="demo-form-inline"
                              label-position="top"
                               >
                            <!-- 编辑数据 -->
                              <div class="table__tr__bottom-list" v-show="item.showEle">
                                <el-form-item prop="guarantee_name" class="table__form-item">
                                  <el-input-number :precision="0" :controls="false" :min="1" v-model.number="form.guarantee_name" autocomplete="off"></el-input-number>
                                </el-form-item>
                                <el-form-item prop="certificate_type_code" class="table__form-item">
                                  <el-select v-model="form.certificate_type_code" placeholder="优先字段" @change="cut1(false)">
                                  <el-option v-if="field_numbers.length > 0" v-for="item in field_numbers" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item
                                  prop="contact_num"
                                  class="table__form-item">
                                  <el-select v-model="form.contact_num" multiple collapse-tags placeholder="详情分类">
                                  <el-option v-if="fieldname.length > 0"  v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item prop="estateNum" class="table__form-item">
                                  <el-input type="house_area_num" v-model="form.house_area_num"></el-input>
                                </el-form-item>
                                <div class="operate-box text__center">
                                  <i
                                    class="icon el-icon-check cursor__pointer"
                                    @click="show('coownerEditForm' + index, index)"
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
                      <!-- 表格 -->
                      <li class="table__body" v-if="coownerAddDg || form_a.length === 0">
                          <div class="table__tr">
                            <el-form
                              :model="form"
                              :rules="rules"
                              ref="form"
                              label-width="100px"
                              class="demo-form-inline"
                              label-position="top"
                              >
                              <div class="table__tr__bottom-list">
                                <el-form-item prop="guarantee_name" class="table__form-item">
                                  <el-input-number :precision="0" :controls="false" :min="1" v-model.number="form.guarantee_name" autocomplete="off"></el-input-number>
                                </el-form-item>
                                <el-form-item prop="certificate_type_code" class="table__form-item">
                                  <el-select v-model="form.certificate_type_code" placeholder="优先字段" @change="cut1(false)">
                                  <el-option v-if="field_numbers.length > 0" v-for="item in field_numbers" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item
                                  prop="contact_num"
                                  class="table__form-item">
                                  <el-select v-model="form.contact_num" multiple collapse-tags placeholder="详情分类">
                                  <el-option v-if="fieldname.length > 0" v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item prop="estateNum" class="table__form-item">
                                  <el-input type="house_area_num" v-model="form.house_area_num"></el-input>
                                </el-form-item>
                                <div class="operate-box text__center">
                                  <i
                                    class="icon el-icon-check cursor__pointer"
                                    @click="showa('form')"
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
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="finish('ruleForm')">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_3' @clsoe_windowused_a='close_2' />
    <promSelect v-if="isSelect" @clsoe_windowIsSelect='console_isSelect' />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import stateOfPreservation from "../state-of-preservation"; // 是否保存修改配置组件
import promSelect from "../prom-select"; // 停用提示组件
import { configApi } from "../../../js/server.js"; // 接口
export default {
  props: ["refer", "compile"],
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      head: true,
      write: false,
      head_a: false,
      write_a: true,
      isSelect: false, // 是否选择表格数据
      form_a: [], // 业务优先配置点击勾后显示的数据
      activeNames: ["1"],
      coownerEdit: {},
      coownerAddDg: false,
      id: "",
      ruleForm: {
        // 开始生效日期
        date1: "",
        finish: ""
      },
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: [],
        house_area_num: ""
      },
      // 业务优先配置字段
      field_numbers: [],
      // 业务优先配置详情分类
      fieldname: [],
      // 业务优先配置优先原因
      compileNotDada: [], // 详情分类转化数据
      particulars: [],
      // 设定选择日期区间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      time: {
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      rules: {
        guarantee_name: [
          { required: true, message: "请填写序号" },
          { type: "number", message: "必须为数字值" }
        ],
        certificate_type_code: [
          { required: true, message: "请选择优先字段", trigger: "change" }
        ],
        contact_num: [
          { required: true, message: "请选择详情分类", trigger: "change" }
        ],
        house_area_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    openAddCoowner() {
      let isEditing = false;
      this.form_a.forEach(v => {
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
    openEditEle(obj) {
      console.log(obj);
      console.log(this.form);
      let isEditing = false;
      this.form_a.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (this.coownerAddDg || isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      } else {
        obj.certificate_type_code = this.field_numbers[this.field_numbers.findIndex(i => i.label === obj.certificate_type_code)].value;
        obj.contact_num = obj.contact_nums.split(',');
        this.form = obj;
      }
       this.cut1(true);
      console.log(this.form);
      this.$set(obj, "showEle", true);
    },
    deleteCoowner(index) {
      this.form_a.splice(index, 1);
    },
    // 关闭共享人编辑窗口
    closeCoownerEdit() {
      // this.$set(obj, "showEle", false);
      this.form.guarantee_name = "";
      this.form.certificate_type_code = "";
      this.form.contact_num = [];
      this.form.house_area_num = "";
    },
    closeAddCoowner() {
      this.closeCoownerEdit();
      // this.coownerEdit = {};
      this.coownerAddDg = false;
    },
    // 自己的
    close() {
      this.alert_1 = true;
    },
    console_isSelect() {
      this.isSelect = false;
    },
    // 打开保存修改配置
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form_a.length !== 0) {
            this.save();
          } else {
            this.isSelect = true;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    empty() {
      this.form.guarantee_name = "";
      this.form.certificate_type_code = "";
      this.form.contact_num = [];
      this.form.house_area_num = "";
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
      this.$emit("clsoe_windowAlert");
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert_e");
    },
    close_3() {
      this.alert_1 = false;
    },
    // 关闭业务优先配置的表格 显示字段
    show(formNamea, index) {
      console.log(index);
      this.$refs[formNamea][0].validate(valid => {
        if (valid) {
          let certificateTypeCodea = "";
          let contactNums = [];
          for (let i = 0; i < this.form.contact_num.length; i++) {
            contactNums.push(this.fieldname[this.fieldname.findIndex(index => index.value === this.form.contact_num[i])].label);
          }
          for (let i = 0; i < this.field_numbers.length; i++) {
            if (
              this.field_numbers[i].value === this.form.certificate_type_code
            ) {
              certificateTypeCodea = this.field_numbers[i].label;
            }
          }
          this.form_a[index] = {
                guarantee_name: this.form.guarantee_name,
                certificate_type_code: certificateTypeCodea,
                contact_nums: this.form.contact_num.join(","),
                contact_num: contactNums.join(","),
                house_area_num: this.form.house_area_num,
                columnNum: this.form.certificate_type_code
              };
          console.log(this.form_a);
          this.$set(this.form, 'showEle', false);
          this.form.guarantee_name = "";
          this.form.certificate_type_code = "";
          this.form.contact_num = [];
          this.form.house_area_num = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showa(formNamea) {
      this.$refs[formNamea].validate(valid => {
        if (valid) {
          let certificateTypeCodea = "";
          let contactNums = [];
          for (let i = 0; i < this.form.contact_num.length; i++) {
            contactNums.push(this.fieldname[this.fieldname.findIndex(index => index.value === this.form.contact_num[i])].label);
          }
          for (let i = 0; i < this.field_numbers.length; i++) {
            if (
              this.field_numbers[i].value === this.form.certificate_type_code
            ) {
              certificateTypeCodea = this.field_numbers[i].label;
            }
          }
          this.form_a.push({
                guarantee_name: this.form.guarantee_name,
                certificate_type_code: certificateTypeCodea,
                contact_nums: this.form.contact_num.join(","),
                contact_num: contactNums.join(","),
                house_area_num: this.form.house_area_num,
                columnNum: this.form.certificate_type_code
              });
          console.log(this.form_a);
          this.coownerAddDg = false;
          this.form.guarantee_name = "";
          this.form.certificate_type_code = "";
          this.form.contact_num = [];
          this.form.house_area_num = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除业务优先配置里字段指定数据
    remove(index) {
      this.form_a.splice(index, 1);
    },
    // 调取优先配置字段列表接口
    field_numbers_c() {
      let url = configApi.businessPriority_columns;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.field_numbers.push({
              value: data[i].columnNum,
              label: data[i].columnName
            });
          }
          this.compile_a();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 优先配置字段切换字段名称
    cut1(data1) {
      if (!data1) {
        this.form.contact_num = [];
      }
      console.log(this.form.contact_num);
      this.fieldname = [];
      let url = configApi.businessPriority_column;
      let data = {
        columnNum: this.form.certificate_type_code
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          if (data !== null) {
            for (let i = 0; i < data.length; i++) {
              this.fieldname.push({
                value: data[i].detailCode,
                label: data[i].detailTitle
              });
            }
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 添加表格
    addition(id) {
      this.write = true;
      this.particulars = [];
      this.id = id;
    },
    addition_a(id) {
      console.log(id);
      this.id = id;
      this.write_a = true;
    },
    compile_a() {
      console.log(this.compile);
      let data = { id: this.compile.id };
      let url = `${configApi.businessPriority_detail}/${data.id}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          let contactNum = [];
           for (let i = 0; i < data.listItem.length; i++) {
            data.listItem[i].detailIds = data.listItem[i].detailIds.split(",");
            this.$set(data.listItem[i], "list", []);
             let url = configApi.businessPriority_column;
              let data1 = {
                columnNum: data.listItem[i].columnNum
              };
              this.$MyFetch
                .get(url, data1)
                .then((datat = {}) => {
                  console.log(datat);
                  if (datat !== "") {
                    this.compileNotDada.push.apply(this.compileNotDada, datat);
                    for (let a = 0; a < data.listItem[i].detailIds.length; a++) {
                      data.listItem[i].list.push(this.compileNotDada[this.compileNotDada.findIndex(index => index.detailCode === data.listItem[i].detailIds[a])].detailTitle);
                    }
                      if (this.field_numbers !== 0) {
                        contactNum.push(this.field_numbers[this.field_numbers.findIndex(index => index.value === data.listItem[i].columnNum)].label);
                      }
                      this.form_a.push({
                      id: data.listItem[i].id,
                      guarantee_name: data.listItem[i].itemSort,
                      certificate_type_code: contactNum[i],
                      contact_num: data.listItem[i].list.join(","),
                      contact_nums: data.listItem[i].detailIds.join(","),
                      house_area_num: data.listItem[i].priorityReason,
                      showEle: false
                    });
                    console.log(data.listItem[i].detailIds.join(","));
                    console.log(data.listItem[i].list);
                  }
                })
                .catch(err => {
                  this.$error(err.message);
                });
            }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增保存 调取接口
    save() {
      let isEditing = false;
      this.form_a.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      let url = configApi.businessPriority_save;
      console.log(this.form_a);
      let listItem = [];
      let columnNum = [];
      for (let i = 0; i < this.form_a.length; i++) {
        console.log(this.field_numbers);
        console.log(this.form_a[i].certificate_type_code);
        columnNum.push(this.field_numbers[this.field_numbers.findIndex(index => index.label === this.form_a[i].certificate_type_code)].value);
        listItem.push({
          itemSort: this.form_a[i].guarantee_name,
          columnNum: columnNum[i],
          detailIds: this.form_a[i].contact_nums,
          priorityReason: this.form_a[i].house_area_num
        });
      }
      let data = {
        effectiveStartDate: this.ruleForm.date1,
        listItem
      };
      console.log(data);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.$emit("clsoe_windowAlert_e");
          this.confirmFn("保存成功", "success");
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    stateOfPreservation,
    promSelect
  },
  mounted() {
    this.field_numbers_c(); // 调取优先配置字段列表接口
  }
};
</script>
