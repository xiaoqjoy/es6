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
        .time {
            /deep/ .el-form-item__content{
              height: 45px;
            }
          }
      }
      .dialog__table-form-box {
        .table__box {
          .table__body {
            .table__form-item {
              div {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }
          .table__tr {
            .table__th {
              width: 140px;
              height: 60px;
            }
            .table__form-item-z {
              width: 157px;
              height: 100%;
              margin-left: 0px;
              margin-bottom: 0px;
              margin-right: 15px;
              text-align: center;
              .el-form-item__content {
                .el-collapse {
                  border: 0px;
                  /deep/ .el-collapse-item__header {
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
              }
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
        <h5 class="title_type">新增业务优先配置</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form :model="ruleForm" ref="ruleForm" :rules="time" label-width="100px" class="demo-form-inline" label-position="top">
            <div class="form__block bg__white border__radius-5">
              <ul class="message__list clearfix">
                <li class="f__left item">
                  <h5 class="title">是否有效：</h5>
                  <span class="content">是</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">结束日期：</h5>
                  <span class="content">{{ ruleForm.finish }}</span>
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
                      <li class="table__body" v-if="head" v-for="(item, index) in form_a" :key="index">
                        <div class="table__tr">
                          <div class="table__tr__bottom-list">
                            <el-form-item label="" class="table__form-item-z">
                              <div>{{item.guarantee_name}}</div>
                            </el-form-item>
                            <el-form-item class="table__form-item-z">
                              <div>{{item.certificate_type_code}}</div>
                            </el-form-item>
                            <el-form-item label="" prop="premiumTimesCnt" class="table__form-item-z">
                              <div><span v-for="(items, index) in item.contact_num" :key="index">{{items}}<span v-if="item.contact_num.length !== index+1">,</span></span></div>
                            </el-form-item>
                            <el-form-item label="" prop="premiumTimesCnt" class="table__form-item-z">
                              <el-collapse v-model="activeNames" @change="handleChange">
                                <el-collapse-item>
                                  <template slot="title">
                                    {{item.house_area_num}}
                                  </template>
                                  <div>{{item.house_area_num}}</div>
                                </el-collapse-item>
                              </el-collapse>
                            </el-form-item>
                            <div class="operate-box text__center">
                              <i class="icon el-icon-plus cursor__pointer" @click="addition"></i>
                              <i class="icon el-icon-minus cursor__pointer" @click="remove(index)"></i>
                            </div>
                          </div>
                        </div>
                      </li>
                      <!-- 表格 -->
                      <li class="table__body" v-if="write">
                        <div class="table__tr">
                          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form-inline" label-position="top">
                            <div class="table__tr__bottom-list">
                              <el-form-item prop="guarantee_name" class="table__form-item">
                                <el-input-number type="guarantee_name" :precision="0" :controls="false" :min="1" v-model.number="form.guarantee_name" autocomplete="off"></el-input-number>
                              </el-form-item>
                              <el-form-item prop="certificate_type_code" class="table__form-item">
                                <el-select v-model="form.certificate_type_code" placeholder="优先字段" @change="cut1()">
                                  <el-option v-for="item in field_numbers" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item prop="contact_num" class="table__form-item">
                                <el-select v-model="form.contact_num" multiple collapse-tags placeholder="详情分类">
                                  <el-option v-if="fieldname.length>0" v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item class="table__form-item">
                                <el-input type="house_area_num" v-model="form.house_area_num"></el-input>
                              </el-form-item>
                              <div class="operate-box text__center">
                                <i class="icon el-icon-check cursor__pointer" @click="show('form')"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="empty"></i>
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
    <promSelect v-if="isSelect" @clsoe_windowIsSelect='console_isSelect' />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import promSelect from "../prom-select"; // 停用提示组件
import { configApi } from "../../../js/server.js"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      head: false,
      write: true,
      head_a: false,
      write_a: true,
      isSelect: false, // 是否选择表格数据
      form_a: [], // 业务优先配置点击勾后显示的数据
      activeNames: ["1"],
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
            type: "string",
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
          { required: true, message: "请选择活动资源", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert");
    },
    console_isSelect() {
      this.isSelect = false;
    },
    handleChange(val) {
      console.log(val);
    },
    // 打开保存修改配置
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form_a.length !== 0) {
            // this.alert_ = true;
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
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
      this.$emit("clsoe_windowAlert");
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert");
    },
    // 关闭业务优先配置的表格 显示字段
    show(formNamea) {
      this.$refs[formNamea].validate(valid => {
        if (valid) {
          let certificateTypeCodea = "";
          let contactNums = [];
          for (let i = 0; i < this.form.contact_num.length; i++) {
            contactNums.push(this.fieldname[this.fieldname.findIndex(index => index.value === this.form.contact_num[i])].label);
          }
          console.log(contactNums);
          for (let i = 0; i < this.field_numbers.length; i++) {
            if (
              this.field_numbers[i].value === this.form.certificate_type_code
            ) {
              certificateTypeCodea = this.field_numbers[i].label;
            }
          }
          this.head = true;
          this.write = false;
          // 验证序号是否重复
          if (this.form_a.length > 0) {
            console.log(this.form_a.length);
            let indOf = "";
            for (let i = 0; i < this.form_a.length; i++) {
              if (this.form.guarantee_name === this.form_a[i].guarantee_name) {
                this.confirmFn("序号重复请重新填写");
                return (indOf = 1);
              }
            }
            if (indOf !== 1) {
              this.form_a.push({
                guarantee_name: this.form.guarantee_name,
                certificate_type_code: certificateTypeCodea,
                contact_nums: this.form.contact_num,
                contact_num: contactNums,
                house_area_num: this.form.house_area_num,
                columnNum: this.form.certificate_type_code
              });
            }
          } else {
            this.form_a.push({
              guarantee_name: this.form.guarantee_name,
              certificate_type_code: certificateTypeCodea,
              contact_nums: this.form.contact_num,
              contact_num: contactNums,
              house_area_num: this.form.house_area_num,
              columnNum: this.form.certificate_type_code
            });
          }
          console.log(this.form_a);
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
      this.write = true;
    },
    empty() {
      this.form.guarantee_name = "";
      this.form.certificate_type_code = "";
      this.form.contact_num = "";
      this.form.house_area_num = "";
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
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 优先配置字段切换字段名称
    cut1() {
      this.form.contact_num = [];
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
    addition() {
      this.write = true;
      this.particulars = [];
      this.form = {
        certificate_type_code: "",
        contact_num: [],
        house_area_num: ""
      };
    },
    // 新增保存 调取接口
    save() {
      let url = configApi.businessPriority_save;
      let listItem = [];
      for (let i = 0; i < this.form_a.length; i++) {
        listItem.push({
          itemSort: this.form_a[i].guarantee_name,
          columnNum: this.form_a[i].columnNum,
          detailIds: this.form_a[i].contact_nums.join(","),
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
          this.$emit("clsoe_windowAlert");
          this.confirmFn("保存成功", "success");
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    promSelect
  },
  mounted() {
    this.field_numbers_c(); // 调取优先配置字段列表接口
  }
};
</script>
