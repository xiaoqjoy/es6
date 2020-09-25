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
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #e5e5e5;
        }
      }
    }
    .dialog-box__middle-1200 {
      // height: 709px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      height: 666px;
      overflow-y: auto;
      .form__block {
        // height: 709px;
        padding: 20px 30px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
        // position: absolute;
        left: 50%;
        // margin-left: -100px;
        // bottom: 30px;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
    .el-form-item {
      width: 118px;
      height: 30px;
      margin-left: 40px;
      margin-bottom: 0px;
      /deep/.el-form-item__content {
        width: 98px;
        height: 30px;
        line-height: 30px;
        // 不进审计详情分类 文字溢出隐藏
        .classification {
          max-width: 400px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 20px;
          text-align:left!important;
          li {
            padding-left: 20px;
          }
        }
        .according {
          // margin-left: 26px;
          max-width: 118px;
          text-align:center!important;
          padding: 0px;
        }
      .yincan{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
      }
      .el-form-item__content {
        width: 118px;
        height: 30px;
        line-height: 50px;
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
          // margin-bottom: 30px;
          // left: 50px;
          .el-form-item__content {
            width: 98px;
            .el-date-editor {
              width: 170px;
            }
          }
        }
        .time {
          /deep/ .el-form-item__content {
            height: 57px;
            line-height: 50px;
          }
        }
      }
      .dialog__table-form-box {
        .table__box {
          .table__body {
            width: 100%;
            .table__form-item {
              div {
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
              }
              .ratio {
                width: 100px;
                line-height: 50px;
              }
            }
            .operate-box {
              text-align: center;
              width: 230px;
              .icon{
                line-height: 30px;
              }
              .iconz {
                margin-left: 50px;
              }
            }
            .superset {
              .icon{
                line-height: 50px;
              }
            }
            .table__tr__bottom-list {
              padding-bottom: 10px
            }
          }
          .zi_new {
            padding-bottom: 20px;
          }
          .table__tr {
            .table__tr__bottom-list {
              .el-form-item {
                .father_set {
                  width: 130px;
                  text-align: center;
                  line-height: 50px;
                }
                .father_set1 {
                  width: 180px;
                  text-align: center;
                  line-height: 50px;
                }
              }
            }
            .table__th {
              width: 168px;
              height: 60px;
            }
          }
          .el-collapse-item {
            /deep/.el-collapse-item__arrow {
              position: absolute;
              left: 15px;
            }
            /deep/.el-collapse-item__content {
            padding: 20px;
            background: #F5F5F5;
            border-top: 1px solid #E5E5E5;
            .subset {
              border: 1px solid #E5E5E5;
              border-radius: 4px;
              background-color: #fff;
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
/deep/ .form__block .el-select .el-select__tags {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .form__block .el-select .el-select__tags .el-tag {
  margin-top: 8px;
}
/deep/.el-select-dropdown {
  position: absolute !important;
  left: 0px !important;
  top: 30px !important;
}
/deep/.el-select-dropdown .el-select-dropdown__item {
  padding-right: 40px;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="time"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <ul class="message__list clearfix">
                <li class="f__left item">
                  <h5 class="title">记录编号:</h5>
                  <span class="content">{{ compile.recordNum }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">是否有效：</h5>
                  <span class="content">{{compile.statusInd ? '是' : '否'}}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">结束日期：</h5>
                  <span class="content">{{ ruleForm.finish }}</span>
                </li>
              </ul>
              <div class="dialog-box__form__group">
                <el-form-item
                  prop="date1"
                  class="time"
                >
                  <el-date-picker
                    v-model="ruleForm.date1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    placeholder="选择生效日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="prevent">
                <div class="comptroller"><span>不进审计条件</span></div>
                <div class="dialog__table-box">
                  <div class="dialog__table-form-box">
                    <ul class="table__box">
                      <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th">序号</li>
                          <li class="table__th">分组名称</li>
                          <li class="table__th">审计比例预值</li>
                          <li class="table__th">操作</li>
                        </ul>
                      </li>
                      <el-collapse accordion v-show="coownerAddDg || form_a.length > 0" v-for="(item, index) in form_a" :key="index">
                        <el-collapse-item>
                        <template slot="title">
                        <li v-on:click.native.stop='doSomething' class="table__body">
                          <div class="table__tr">
                            <div class="table__tr__bottom-list" v-show="!item.showEle">
                              <el-form-item>
                                <div class="father_set">{{item.guarantee_name}}</div>
                              </el-form-item>
                              <el-form-item>
                                <div class="father_set1">{{item.group_name}}</div>
                              </el-form-item>
                              <el-form-item prop="insuranceCompanyCode">
                                <div class="father_set1">100%</div>
                              </el-form-item>
                              <div @click.stop.prevent="() => {}" class="operate-box superset">
                                <i class="icon el-icon-plus cursor__pointer" @click="openAddCoowner(item,false)"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="remove(index)"></i>
                                <i class="icon el-icon-edit cursor__pointer" @click="amend(item,false)"></i>
                                <span class="icon cursor__pointer" @click="zi_openAddCoowner(item,false)">新增子集</span>
                              </div>
                            </div>
                            <!-- 编辑表格 -->
                            <li class="table__body">
                                <div class="table__tr">
                                    <el-form :model="fu_form" :rules="rules" :ref="'coownerEditForm' + index" label-width="100px" class="demo-form-inline" label-position="top">
                                        <div class="table__tr__bottom-list" v-show="item.showEle">
                                            <el-form-item class="table__form-item" prop="guarantee_name">
                                                <el-input-number v-on:click.native.stop='() => {}' type="guarantee_name" v-model.number="fu_form.guarantee_name" :precision="0" :controls="false" :min="1" :max="1000000000" autocomplete="off"></el-input-number>
                                            </el-form-item>
                                            <el-form-item prop="group_name" class="table__form-item">
                                              <el-input v-on:click.native.stop='() => {}' v-model="fu_form.group_name" maxlength="10"></el-input>
                                            </el-form-item>
                                            <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                                <div class="ratio"><span>100%</span></div>
                                            </el-form-item>
                                            <div @click.stop.prevent="() => {}" class="operate-box ">
                                                <i class="icon el-icon-check cursor__pointer" @click="show('coownerEditForm' + index, index, item)"></i>
                                                <i class="icon el-icon-minus cursor__pointer" @click="empty"></i>
                                            </div>
                                        </div>
                                    </el-form>
                                </div>
                            </li>
                          </div>
                        </li>
                        </template>
                        <!-- 子集 -->
                        <div class="subset">
                        <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th">字段编号</li>
                          <li class="table__th">不进审计字段名称</li>
                          <li class="table__th">不进审计详情分类</li>
                          <li class="table__th">操作</li>
                        </ul>
                        </li>
                      <!-- 子集表格显示 -->
                      <li class="table__body" v-for="(itemz, a) in item.zi_form_a" :key="a">
                        <div class="table__tr">
                          <div class="table__tr__bottom-list" v-show="!itemz.showEle">
                            <el-form-item class="table__form-item">
                              <div>{{itemz.certificate_type_code}}</div>
                            </el-form-item>
                            <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                              <div>{{itemz.contact_num}}</div>
                            </el-form-item>
                            <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                                <el-popover width="200" trigger="hover" placement="top">
                                    <span v-for="(items, i) in itemz.house_area_num" :key="i">{{items}}<span v-if="itemz.house_area_num.length !== i+1">,</span></span>
                                    <div slot="reference" class="classification according">
                                        <span v-for="(items, i) in itemz.house_area_num" :key="i">{{items}}</span>
                                    </div>
                                </el-popover>
                            </el-form-item>
                            <div class="operate-box ">
                              <i class="icon el-icon-minus cursor__pointer" @click="zi_remove(index, a)"></i>
                              <i class="icon el-icon-edit cursor__pointer" @click="zi_amend(itemz,false)"></i>
                            </div>
                          </div>
                          <!-- 编辑表格 -->
                          <li class="table__body">
                              <div class="table__tr">
                                  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form-inline" label-position="top">
                                      <div class="table__tr__bottom-list" v-show="itemz.showEle">
                                          <el-form-item prop="certificate_type_code" class="table__form-item">
                                              <el-select v-model="form.certificate_type_code" placeholder="字段编号" @change="cut1">
                                                  <el-option v-for="item in field_numbers" :key="item.value" :label="item.label" :value="item.value">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>
                                          <el-form-item prop="contact_num" class="table__form-item">
                                              <el-select v-model="form.contact_num" placeholder="不进审计字段名称" @change="cut2">
                                                  <el-option v-if="fieldname.length > 0" v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>
                                          <el-form-item prop="house_area_num" class="table__form-item comptroller_zz">
                                              <el-select v-model="form.house_area_num" multiple collapse-tags placeholder="不进审计详情分类">
                                                  <!-- <template> -->
                                                   <!-- <el-popover v-for="item in particulars" :key="item.value" placement="top-start" width="380" trigger="hover" :content="item.label"> -->
                                                       <!-- <div slot="reference" class="classification comptroller_zz"> -->
                                                         <el-option class="comptroller_zz " v-for="item in particulars" :key="item.value" :label="item.label" :value="item.value">
                                                          </el-option>
                                                           <!-- <el-option :label="item.label" :value="item.value">
                                                           </el-option> -->
                                                       <!-- </div> -->
                                                   <!-- </el-popover> -->
                                                  <!-- </template> -->
                                              </el-select>
                                          </el-form-item>
                                          <div class="operate-box ">
                                              <i class="icon iconz el-icon-check cursor__pointer" @click="zi_show('form', index, a, itemz)"></i>
                                              <i class="icon el-icon-minus cursor__pointer" @click="zi_empty"></i>
                                          </div>
                                      </div>
                                  </el-form>
                              </div>
                          </li>
                        </div>
                      </li>
                      <!-- 子集新增表格 -->
                      <li class="table__body zi_new" v-if="item.zi_form_a.showEle || item.zi_form_a.length === 0">
                          <div class="table__tr">
                              <el-form :model="form" :rules="rules" :ref="'form' + index" label-width="100px" class="demo-form-inline" label-position="top">
                                  <div class="table__tr__bottom-list">
                                      <el-form-item prop="certificate_type_code" class="table__form-item">
                                          <el-select v-model="form.certificate_type_code" placeholder="字段编号" @change="cut1">
                                              <el-option v-for="item in field_numbers" :key="item.value" :label="item.label" :value="item.value">
                                              </el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item prop="contact_num" class="table__form-item">
                                          <el-select v-model="form.contact_num" placeholder="不进审计字段名称" @change="cut2">
                                              <el-option v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                              </el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item prop="house_area_num" class="table__form-item">
                                          <el-select v-model="form.house_area_num" multiple collapse-tags placeholder="不进审计详情分类">
                                              <!-- <template> -->
                                                <!-- <el-popover v-for="item in particulars" :key="item.value" placement="top-start" trigger="hover" :content="item.label"> -->
                                                  <!-- <div slot="reference" class="classification comptroller_zz"> -->
                                                      <el-option class="comptroller_zz " v-for="item in particulars" :key="item.value" :label="item.label" :value="item.value">
                                                      </el-option>
                                                  <!-- </div> -->
                                                <!-- </el-popover> -->
                                              <!-- </template> -->
                                          </el-select>
                                      </el-form-item>
                                      <div class="operate-box ">
                                          <i class="icon iconz el-icon-check cursor__pointer" @click="zi_notAdvance('form' + index,index)"></i>
                                          <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner(false)"></i>
                                      </div>
                                  </div>
                              </el-form>
                          </div>
                      </li>
                      </div>
                      </el-collapse-item>
                      </el-collapse>
                      <!-- 新增表格 -->
                      <li class="table__body" v-if="coownerAddDg || form_a.length === 0">
                            <div class="table__tr">
                                <el-form :model="fu_form" :rules="rules" ref="fu_form" label-width="100px" class="demo-form-inline" label-position="top">
                                    <div class="table__tr__bottom-list">
                                        <el-form-item prop="guarantee_name" class="table__form-item" placeholder="序号">
                                            <el-input-number v-on:click.native.stop='() => {}' type="guarantee_name" v-model.number="fu_form.guarantee_name" :precision="0" :controls="false" :min="1" :max="1000000000" autocomplete="off" placeholder="序号"></el-input-number>
                                        </el-form-item>
                                        <el-form-item prop="group_name" class="table__form-item">
                                            <el-input v-on:click.native.stop='() => {}' v-model="fu_form.group_name" maxlength="10" placeholder="分组名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                            <div class="ratio"><span>100%</span></div>
                                        </el-form-item>
                                        <div @click.stop.prevent="() => {}" class="operate-box">
                                            <i class="icon iconz el-icon-check cursor__pointer" @click="notAdvance('fu_form')"></i>
                                            <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner(false)"></i>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                        </li>
                  <!-- 表格 -->
                    </ul>
                  </div>
                </div>
              </div>
              <!-- 进件审计 -->
              <div class="prevent">
                <div class="comptroller"><span>进审计条件</span>
                </div>
                  <div class="dialog__table-box">
                      <div class="dialog__table-form-box">
                          <ul class="table__box">
                              <li class="table__head">
                                  <ul class="table__tr">
                                      <li class="table__th">序号</li>
                                      <li class="table__th">分组名称</li>
                                      <li class="table__th">审计比例预值</li>
                                      <li class="table__th">操作</li>
                                  </ul>
                              </li>
                              <el-collapse accordion v-for="(item, index) in orgForm_a" :key="index">
                              <el-collapse-item>
                              <template slot="title">
                              <li v-on:click.native.stop='doSomething' class="table__body">
                                <div class="table__tr">
                                  <div class="table__tr__bottom-list" v-show="!item.showEle">
                                    <el-form-item>
                                      <div class="father_set">{{item.org_contract_name}}</div>
                                    </el-form-item>
                                    <el-form-item>
                                      <div class="father_set1">{{item.group_name}}</div>
                                    </el-form-item>
                                    <el-form-item prop="insuranceCompanyCode">
                                      <div class="father_set1">{{item.org_phone_num}}%</div>
                                    </el-form-item>
                                    <div @click.stop.prevent="() => {}" class="operate-box superset">
                                      <i class="icon el-icon-plus cursor__pointer" @click="openAddCoowner(item,true)"></i>
                                      <i class="icon el-icon-minus cursor__pointer" @click="removej(index)"></i>
                                      <i class="icon el-icon-edit cursor__pointer" @click="amend(item,true)"></i>
                                      <span class="icon cursor__pointer" @click="zi_openAddCoowner(item,true)">新增子集</span>
                                    </div>
                                  </div>
                                  <!-- 编辑表格 -->
                                  <li class="table__body">
                                      <div class="table__tr">
                                          <el-form :model="fu_orgForm" :rules="orgRules" :ref="'fu_orgForm' + index" label-width="100px" class="demo-form-inline" label-position="top">
                                              <div class="table__tr__bottom-list" v-show="item.showEle">
                                                  <el-form-item class="table__form-item" prop="org_contract_name">
                                                      <el-input-number v-on:click.native.stop='() => {}' type="org_contract_name" v-model.number="fu_orgForm.org_contract_name" :precision="0" :controls="false" :min="1" :max="1000000000" autocomplete="off"></el-input-number>
                                                  </el-form-item>
                                                  <el-form-item prop="group_name" class="table__form-item">
                                                    <el-input v-on:click.native.stop='() => {}' v-model="fu_orgForm.group_name" maxlength="10"></el-input>
                                                  </el-form-item>
                                                  <el-form-item label="" prop="org_phone_num" class="table__form-item">
                                                      <el-input-number v-on:click.native.stop='() => {}' type="org_phone_num" :precision="0" :controls="false" :min="1" :max="100" v-model.number="fu_orgForm.org_phone_num" autocomplete="off"></el-input-number>
                                                  </el-form-item>
                                                  <div @click.stop.prevent="() => {}" class="operate-box ">
                                                      <i class="icon el-icon-check cursor__pointer" @click="showj('fu_orgForm' + index, index, item)"></i>
                                                      <i class="icon el-icon-minus cursor__pointer" @click="emptyj"></i>
                                                  </div>
                                              </div>
                                          </el-form>
                                      </div>
                                  </li>
                                </div>
                              </li>
                              </template>
                              <!-- 子集 -->
                              <div class="subset">
                              <li class="table__head">
                              <ul class="table__tr">
                                <li class="table__th">字段编号</li>
                                <li class="table__th">进审计字段名称</li>
                                <li class="table__th">进审计详情分类</li>
                                <li class="table__th">操作</li>
                              </ul>
                              </li>
                            <!-- 子集表格显示 -->
                            <li class="table__body zi_new" v-for="(itemz, a) in item.zi_orgForm_a" :key="a">
                              <div class="table__tr">
                                <div class="table__tr__bottom-list" v-show="!itemz.showEle">
                                  <el-form-item class="table__form-item">
                                    <div>{{itemz.org_name}}</div>
                                  </el-form-item>
                                  <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                                    <div>{{itemz.org_area_num}}</div>
                                  </el-form-item>
                                  <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                                      <el-popover width="200" trigger="hover" placement="top">
                                          <span v-for="(items, i) in itemz.org_address" :key="i">{{items}}<span v-if="itemz.org_address.length !== i+1">,</span></span>
                                          <div slot="reference" class="classification according">
                                              <span v-for="(items, i) in itemz.org_address" :key="i">{{items}}</span>
                                          </div>
                                      </el-popover>
                                  </el-form-item>
                                  <div class="operate-box ">
                                    <i class="icon el-icon-minus cursor__pointer" @click="zi_removej(index, a)"></i>
                                    <i class="icon el-icon-edit cursor__pointer" @click="zi_amend(itemz,true)"></i>
                                  </div>
                                </div>
                                <!-- 编辑表格 -->
                                <li class="table__body">
                                    <div class="table__tr">
                                        <el-form :model="orgForm" :rules="orgRules" ref="orgForm" label-width="100px" class="demo-form-inline" label-position="top">
                                            <div class="table__tr__bottom-list" v-show="itemz.showEle">
                                                <el-form-item prop="org_name" class="table__form-item">
                                                    <el-select v-model="orgForm.org_name" placeholder="字段编号" @change="cut3">
                                                        <el-option v-for="item in field_numbersa_a" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item prop="org_area_num" class="table__form-item">
                                                    <el-select v-model="orgForm.org_area_num" placeholder="不进审计字段名称" @change="cut4">
                                                        <el-option v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item prop="org_address" class="table__form-item comptroller_zz">
                                                    <el-select v-model="orgForm.org_address" multiple collapse-tags placeholder="进审计详情分类">
                                                        <!-- <template>
                                                         <el-popover v-for="item in particulars_a" :key="item.value" placement="top-start" width="380" trigger="hover" :content="item.label">
                                                             <div slot="reference" class="classification comptroller_zz"> -->
                                                                 <!-- <el-option :label="item.label" :value="item.value">
                                                                 </el-option> -->
                                                                 <el-option class="comptroller_zz " v-for="item in particulars_a" :key="item.value" :label="item.label" :value="item.value">
                                                                </el-option>
                                                             <!-- </div>
                                                         </el-popover>
                                                        </template> -->
                                                    </el-select>
                                                </el-form-item>
                                                <div class="operate-box ">
                                                    <i class="icon iconz el-icon-check cursor__pointer" @click="zi_showj('orgForm', index, a, itemz)"></i>
                                                    <i class="icon el-icon-minus cursor__pointer" @click="zi_emptyj"></i>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </li>
                              </div>
                            </li>
                            <!-- 子集新增表格 -->
                            <li class="table__body" v-if="item.zi_orgForm_a.showEle || item.zi_orgForm_a.length === 0">
                                <div class="table__tr">
                                    <el-form :model="orgForm" :rules="orgRules" :ref="'orgForm' + index" label-width="100px" class="demo-form-inline" label-position="top">
                                        <div class="table__tr__bottom-list">
                                            <el-form-item prop="org_name" class="table__form-item">
                                                <el-select v-model="orgForm.org_name" placeholder="字段编号" @change="cut3">
                                                    <el-option v-for="item in field_numbersa_a" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item prop="org_area_num" class="table__form-item">
                                                <el-select v-model="orgForm.org_area_num" placeholder="进审计字段名称" @change="cut4">
                                                    <el-option v-for="item in fieldname" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item prop="org_address" class="table__form-item">
                                                <el-select v-model="orgForm.org_address" multiple collapse-tags placeholder="进审计详情分类">
                                                    <!-- <template> -->
                                                      <!-- <el-popover v-for="item in particulars" :key="item.value" placement="top-start" trigger="hover" :content="item.label"> -->
                                                        <!-- <div slot="reference" class="classification comptroller_zz"> -->
                                                            <el-option class="comptroller_zz " v-for="item in particulars_a" :key="item.value" :label="item.label" :value="item.value">
                                                            </el-option>
                                                        <!-- </div> -->
                                                      <!-- </el-popover> -->
                                                    <!-- </template> -->
                                                </el-select>
                                            </el-form-item>
                                            <div class="operate-box ">
                                                <i class="icon iconz el-icon-check cursor__pointer" @click="zi_advance('orgForm' + index,index)"></i>
                                                <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner(true)"></i>
                                            </div>
                                        </div>
                                    </el-form>
                                </div>
                            </li>
                            </div>
                            </el-collapse-item>
                            </el-collapse>
                              <!-- 新增表格 -->
                              <li class="table__body" v-if="coownerAddDgj || orgForm_a.length === 0">
                                  <div class="table__tr">
                                      <el-form :model="fu_orgForm" :rules="orgRules" ref="fu_orgForm" label-width="100px" class="demo-form-inline" label-position="top">
                                          <div class="table__tr__bottom-list">
                                              <el-form-item prop="org_contract_name" class="table__form-item">
                                                  <el-input-number type="org_contract_name" v-model.number="fu_orgForm.org_contract_name" :precision="0" :controls="false" :min="1" :max="1000000000" autocomplete="off" placeholder="序号"></el-input-number>
                                              </el-form-item>
                                              <el-form-item prop="group_name" class="table__form-item">
                                                  <el-input v-on:click.native.stop='() => {}' v-model="fu_orgForm.group_name" maxlength="10" placeholder="分组名称"></el-input>
                                              </el-form-item>
                                              <el-form-item label="" prop="org_phone_num" class="table__form-item">
                                                  <el-input-number type="org_phone_num" :precision="0" :controls="false" :min="1" :max="100" v-model.number="fu_orgForm.org_phone_num" autocomplete="off" placeholder="审计比例预值"></el-input-number>
                                              </el-form-item>
                                              <div class="operate-box">
                                                  <i class="icon iconz el-icon-check cursor__pointer" @click="advance('fu_orgForm')"></i>
                                                  <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner(true)"></i>
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
          <el-button
            class="add finish"
            type="primary"
            @click="finish('ruleForm')"
          >保存</el-button>
        </div>
      </div>
    </div>
  </div>
<composite
      v-if="alert_"
      :save="save"
      :refer="refer"
      @clsoe_windowused_a='close_2'
      @clsoe_windowused='close_1'
    />
<stateOfPreservation
      v-if="alert_1"
      :form_a="form_a"
      :orgForm_a="orgForm_a"
      :ruleForm="ruleForm"
      @clsoe_windowused_b='close_4'
      @clsoe_windowused='close_3'
      @clsoe_windowused_a='close_2'
    />
</div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import composite from "../composite"; // 保存修改配置组件
import stateOfPreservation from "../state"; // 是否保存修改配置组件
import { configApi } from "../../js/server.js"; // 接口
import rules from "../../../../common/js/rules.js"; // 规则验证
export default {
  props: ["refer", "compile", "compileNotList", "compileList", "compileDada", "compileNotDada"],
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      head: false,
      write: true,
      head_a: false,
      write_a: true,
      isSelect: false, // 是否填写表格数据
      form_a: [], // 不进审计条件点击勾后显示的数据
      orgForm_a: [], // 进审计条件点击勾后显示的数据
      zi_form_a: [],
      zi_orgForm_a: [],
      particulars_j: [],
      notParticulars: [],
      coownerAddDg: false,
      zi_coownerAddDg: false,
      coownerAddDgj: false,
      ruleForm: {
        // 记录编号
        id: "10021",
        // 开始生效日期
        date1: "",
        finish: ""
      },
      // 不进审计父集
      fu_form: {
        guarantee_name: "",
        group_name: ""
      },
      // 不进审计子集
      form: {
        certificate_type_code: "",
        contact_num: "",
        house_area_num: []
      },
      fu_orgForm: {
        org_contract_name: "",
        group_name: "",
        org_phone_num: ""
      },
      orgForm: {
        org_name: "",
        org_area_num: "",
        org_address: []
      },
      // 不进审字段编号
      field_numbers: [],
      // 不进审计字段名称
      fieldname: [],
      // 不进审计详情分类
      particulars: [],
      // 进审字段编号
      field_numbersa_a: [],
      // 进审计字段名称
      fieldname_a: [],
      // 进审计详情分类
      particulars_a: [],
      // 设定选择日期区间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      // 验证生效日期
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
          { validator: rules.nonNegative2, trigger: "change" }
        ],
        group_name: [
          { required: true, message: "请填写分组名称", trigger: "blur" }
        ],
        certificate_type_code: [
          {
            required: true,
            message: "请选择字段编号",
            trigger: "change"
          }
        ],
        contact_num: [
          {
            required: true,
            message: "请选择不进审计字段名称",
            trigger: "change"
          }
        ],
        house_area_num: [
          {
            required: true,
            message: "请选择不进审计详情分类",
            trigger: "change"
          }
        ]
      },
      // zi_rules: {
      //   certificate_type_code: [
      //     {
      //       required: true,
      //       message: "请选择不进审计字段名称",
      //       trigger: "change"
      //     }
      //   ],
      //   contact_num: [
      //     {
      //       required: true,
      //       message: "请选择不进审计字段名称",
      //       trigger: "change"
      //     }
      //   ],
      //   house_area_num: [
      //     {
      //       required: true,
      //       message: "请选择不进审计详情分类",
      //       trigger: "change"
      //     }
      //   ]
      // },
      orgRules: {
        org_contract_name: [
          { required: true, message: "请填写序号" },
          { validator: rules.nonNegative2, trigger: "change" }
        ],
        org_name: [
          { required: true, message: "请选择字段编号", trigger: "change" }
        ],
        org_area_num: [
          { required: true, message: "请选择进审计字段名称", trigger: "change" }
        ],
        org_address: [
          { required: true, message: "请选择进审计详情分类", trigger: "change" }
        ],
        group_name: [
          { required: true, message: "请填写分组名称", trigger: "blur" }
        ],
        org_phone_num: [
          { required: true, message: "请填写审计比例" },
          { type: "number", message: "必须为数字值" }
        ]
      }
    };
  },
  methods: {
    close() {
      this.alert_1 = true;
    },
    // 关闭提示信息组件
    console_isSelect() {
      this.isSelect = false;
    },
    doSomething: function() {
        console.log('阻止事件继续传播');
    },
    // 新增删除
    closeAddCoowner(id) {
      this.zi_closeCoownerEdit(id);
      // this.coownerEdit = {};
      if (id) {
        this.coownerAddDgj = false;
      } else {
        this.coownerAddDg = false;
      }
    },
    // 打开保存修改配置
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form_a);
          console.log(this.orgForm_a);
          let isEditing = false;
          let notisEditing = false;
          let alert = false;
          let alernot = false;
          if (this.form_a.length !== 0 || this.orgForm_a.length !== 0) {
            if (this.form_a.length > 0) {
              for (let i = 0; i < this.form_a.length; i++) {
              if (this.form_a[i].zi_form_a.length > 0) {
                  this.form_a.forEach(v => {
                    if (v.showEle) {
                    notisEditing = true;
                    }
                  });
                  this.form_a.forEach(v => {
                    v.zi_form_a.forEach(i => {
                      if (i.showEle) {
                        notisEditing = true;
                      }
                    });
                  });
                  if (notisEditing) {
                    this.confirmFn("请完成正在编辑的分组或子集");
                  } else {
                    alert = true;
                  }
              } else {
                this.confirmFn('不进审计条件' + this.form_a[i].group_name + '分组未配置条件');
                alert = false;
              }
            }
            } else {
              alert = true;
            }
            if (this.orgForm_a.length > 0) {
              for (let i = 0; i < this.orgForm_a.length; i++) {
              if (this.orgForm_a[i].zi_orgForm_a.length > 0) {
                  this.orgForm_a.forEach(v => {
              if (v.showEle) {
                    isEditing = true;
                  }
              });
              this.orgForm_a.forEach(v => {
                v.zi_orgForm_a.forEach(i => {
                    if (i.showEle) {
                      isEditing = true;
                    }
                  });
                });
                if (isEditing) {
                    this.confirmFn("请完成正在编辑的分组或子集");
                  } else {
                    alernot = true;
                  }
              } else {
                this.confirmFn('进审计条件' + this.orgForm_a[i].group_name + '分组未配置条件');
                alernot = false;
              }
            }
            } else {
              alernot = true;
            }
            if (alert && alernot) {
              this.alert_ = true;
            }
          } else {
            this.confirmFn("请填写一条审计条件");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$emit("clsoe_windowAlert");
    },
    empty() {
      // this.fu_form.guarantee_name = "";
      // this.fu_form.group_name = "";
      this.fu_form = Object.assign({}, this.fu_form, {
        group_name: "",
        guarantee_name: ""
      });
    },
    zi_empty() {
      this.form = {
        certificate_type_code: "",
        contact_num: "",
        house_area_num: []
      };
    },
    emptyj() {
      this.fu_orgForm.group_name = "";
    },
    zi_emptyj() {
      this.orgForm = {
        org_address: []
      };
    },
    // 复核取消
    close_3() {
      this.alert_1 = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_ = false;
      this.$emit("clsoe_windowAlert_e");
    },
    close_1() {
      this.alert_ = false;
    },
    close_4() {
      this.alert_ = true;
    },
    showj(formNamea, index) {
      this.$refs[formNamea][0].validate(valid => {
        if (valid) {
          this.orgForm_a[index] = {
            org_phone_num: this.fu_orgForm.org_phone_num,
            org_contract_name: this.fu_orgForm.org_contract_name,
            group_name: this.fu_orgForm.group_name,
            zi_orgForm_a: this.fu_orgForm.zi_orgForm_a
          };
          this.$set(this.orgForm_a[index], "showEle", false);
          this.$forceUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增进审计条件的表格 显示字段
    zi_showj(formName, b, a, obj) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          let weight = false;
          this.orgForm_a[b].zi_orgForm_a.forEach((i, index) => {
              let oldWeight1 = i.org_name.toString();
              let newWeight1 = this.orgForm.org_name.toString();
              let oldWeight2 = i.list.sort().join();
              let newWeight2 = this.orgForm.org_address.sort().join();
              if (a !== index) {
                if (oldWeight1 === newWeight1 && oldWeight2 === newWeight2) {
                  weight = true;
                }
              }
           });
           if (weight) {
             this.confirmFn("当前条件重复添加", "error");
             return;
           }
          let list = [];
          for (
            let index = 0;
            index < this.orgForm.org_address.length;
            index++
          ) {
            list.push(
              this.particulars_a[this.particulars_a.findIndex(i => i.value === this.orgForm.org_address[index])].label
            );
          }
          this.orgForm_a[b].zi_orgForm_a[a] = Object.assign({}, this.orgForm_a[b].zi_orgForm_a[a], {
            org_name: isNaN(this.orgForm.org_name)
              ? this.orgForm.org_name
              : this.field_numbersa_a[this.orgForm.org_name].label,
            org_area_num: isNaN(this.orgForm.org_area_num)
              ? this.orgForm.org_area_num
              : this.fieldname_a[this.orgForm.org_area_num].label,
            org_address: list,
            list: this.orgForm.org_address,
            id: this.enter_id,
            showEle: false
          });
          this.$forceUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增进审计条件的表格 显示字段
    advance(formNamea) {
      this.$refs[formNamea].validate(valid => {
        if (valid) {
          this.zi_orgForm_a = [];
          this.$set(this.zi_orgForm_a, "showEle", true);
          this.orgForm_a.push({
            org_contract_name: this.fu_orgForm.org_contract_name,
            group_name: this.fu_orgForm.group_name,
            org_phone_num: this.fu_orgForm.org_phone_num,
            zi_orgForm_a: this.zi_orgForm_a
          });
          this.coownerAddDgj = false;
          this.orgForm = {
            org_address: []
          };
          console.log(this.orgForm_a);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增进审计子集
     zi_advance(formNamea, i) {
      this.$refs[formNamea][0].validate(valid => {
        if (valid) {
          let weight = false;
           this.orgForm_a[i].zi_orgForm_a.forEach(i => {
              let oldWeight1 = i.org_name.toString();
              let newWeight1 = this.field_numbersa_a[this.orgForm.org_name].label.toString();
              let oldWeight2 = i.list.sort().join();
              let newWeight2 = this.orgForm.org_address.sort().join();
              if (oldWeight1 === newWeight1 && oldWeight2 === newWeight2) {
                weight = true;
              }
           });
           if (weight) {
             this.confirmFn("当前条件重复添加", "error");
             return;
           }
         let list = [];
          for (
            let index = 0;
            index < this.orgForm.org_address.length;
            index++
          ) {
            list.push(
              this.particulars_a[this.particulars_a.findIndex(i => i.value === this.orgForm.org_address[index])].label
            );
          }
          this.orgForm_a[i].zi_orgForm_a.push({
            org_name: isNaN(this.orgForm.org_name)
              ? this.orgForm.org_name
              : this.field_numbersa_a[this.orgForm.org_name].label,
            org_area_num: isNaN(this.orgForm.org_area_num)
              ? this.orgForm.org_area_num
              : this.fieldname_a[this.orgForm.org_area_num].label,
            org_address: list,
            list: this.orgForm.org_address,
            id: this.enter_id
          });
          this.$set(this.orgForm_a[i].zi_orgForm_a, "showEle", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增不进审计父集
    notAdvance(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.zi_form_a = [];
          this.$set(this.zi_form_a, "showEle", true);
          this.form_a.push({
            guarantee_name: this.fu_form.guarantee_name,
            group_name: this.fu_form.group_name,
            zi_form_a: this.zi_form_a
          });
          this.coownerAddDg = false;
          this.form = {
            house_area_num: []
          };
          console.log(this.form_a);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增不进审计子集
     zi_notAdvance(formName, i) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          let weight = false;
           this.form_a[i].zi_form_a.forEach(i => {
              let oldWeight1 = i.certificate_type_code.toString();
              let newWeight1 = this.field_numbers[this.form.certificate_type_code].label.toString();
              let oldWeight2 = i.list.sort().join();
              let newWeight2 = this.form.house_area_num.sort().join();
              if (oldWeight1 === newWeight1 && oldWeight2 === newWeight2) {
                weight = true;
              }
           });
           if (weight) {
             this.confirmFn("当前条件重复添加", "error");
             return;
           }
          let list = [];
          for (
            let index = 0;
            index < this.form.house_area_num.length;
            index++
          ) {
            list.push(
              this.particulars[this.particulars.findIndex(i => i.value === this.form.house_area_num[index])].label
            );
          }
          this.form_a[i].zi_form_a.push({
            certificate_type_code: isNaN(this.form.certificate_type_code)
              ? this.form.certificate_type_code
              : this.field_numbers[this.form.certificate_type_code].label,
            contact_num: isNaN(this.form.contact_num)
              ? this.form.contact_num
              : this.fieldname[this.form.contact_num].label,
            house_area_num: list,
            list: this.form.house_area_num,
            id: this.id
          });
          console.log(this.form_a[i].zi_form_a);
          this.zi_coownerAddDg = false;
          this.$set(this.form_a[i].zi_form_a, "showEle", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭修改不进审计条件父集的表格 显示字段
    show(formNamea, index, obj) {
      console.log(obj);
      this.$refs[formNamea][0].validate(valid => {
        if (valid) {
          this.form_a[index] = {
            guarantee_name: this.fu_form.guarantee_name,
            group_name: this.fu_form.group_name,
            zi_form_a: this.fu_form.zi_form_a
          };
          this.$set(this.form_a[index], "showEle", false);
          this.$forceUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭修改不进审计条件子集的表格 显示字段
    zi_show(formNamea, b, a, obj) {
      this.$refs[formNamea][0].validate(valid => {
        if (valid) {
          console.log(this.form_a);
          console.log(obj);
          let weight = false;
          this.form_a[b].zi_form_a.forEach((i, index) => {
              let oldWeight1 = i.certificate_type_code.toString();
              let newWeight1 = this.form.certificate_type_code.toString();
              let oldWeight2 = i.list.sort().join();
              let newWeight2 = this.form.house_area_num.sort().join();
              if (a !== index) {
                if (oldWeight1 === newWeight1 && oldWeight2 === newWeight2) {
                  weight = true;
                }
              }
           });
           if (weight) {
             this.confirmFn("当前条件重复添加", "error");
             return;
           }
          let list = [];
          for (
            let index = 0;
            index < this.form.house_area_num.length;
            index++
          ) {
            list.push(
              this.particulars[this.particulars.findIndex(i => i.value === this.form.house_area_num[index])].label
            );
          };
           this.form_a[b].zi_form_a[a] = Object.assign({}, this.form_a[b].zi_form_a[a], {
            certificate_type_code: isNaN(this.form.certificate_type_code)
              ? this.form.certificate_type_code
              : this.field_numbers[this.form.certificate_type_code].label,
            contact_num: isNaN(this.form.contact_num)
              ? this.form.contact_num
              : this.fieldname[this.form.contact_num].label,
            house_area_num: list,
            list: this.form.house_area_num,
            id: this.id,
            showEle: false
            });
            this.$forceUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除新增不进审计条件里字段指定数据
    remove(index) {
      this.form_a.splice(index, 1);
      if (this.form_a.length === 0) {
        this.write = true;
        this.fu_form = {
          group_name: ""
        };
      }
    },
    zi_remove(index, i) {
      this.form_a[index].zi_form_a.splice(i, 1);
      if (this.form_a[index].zi_form_a.length === 0) {
        this.form = {
          certificate_type_code: "",
          contact_num: "",
          house_area_num: []
        };
        this.$set(this.form_a[index].zi_form_a, "showEle", true);
      }
    },
    zi_removej(index, i) {
      this.orgForm_a[index].zi_orgForm_a.splice(i, 1);
      if (this.orgForm_a[index].zi_orgForm_a.length === 0) {
        this.orgForm = {
          org_name: "",
          org_area_num: "",
          org_address: []
        };
        this.$set(this.orgForm_a[index].zi_orgForm_a, "showEle", true);
      }
    },
    // 删除新增进审计条件里字段指定数据
    removej(index) {
      this.orgForm_a.splice(index, 1);
      if (this.orgForm_a.length === 0) {
        this.write_a = true;
        this.fu_orgForm = {
          group_name: ""
        };
      }
    },
    // 修改父集不进审计条件里字段指定数据
    amend(obj, id) {
      if (id) {
        let isEditing = false;
      this.orgForm_a.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
        if (this.coownerAddDgj || isEditing) {
          this.confirmFn("请先完成正在编辑的分组", "error");
          return;
        } else {
          this.fu_orgForm = obj;
        }
      } else {
        let isEditing = false;
        this.form_a.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
        if (this.coownerAddDg || isEditing) {
          this.confirmFn("请先完成正在编辑的分组", "error");
          return;
        } else {
          this.fu_form = obj;
        }
      }
      this.$set(obj, "showEle", true);
      console.log(obj);
    },
    // 修改子集不进审计条件里字段指定数据
    zi_amend(obj, id) {
      console.log(obj);
      let isEditing = false;
      if (id) {
         this.orgForm_a.forEach(v => {
            if (v.zi_orgForm_a.showEle) {
              isEditing = true;
            }
            v.zi_orgForm_a.forEach(i => {
            if (i.showEle) {
                isEditing = true;
              }
            });
        });
        if (this.coownerAddDgj || isEditing) {
          this.confirmFn("请先完成正在编辑的子集", "error");
          return;
        } else {
          this.orgForm = {
            org_name: obj.org_name,
            org_area_num: obj.org_area_num,
            org_address: obj.list
          };
        }
      } else {
        this.form_a.forEach(v => {
          if (v.zi_form_a.showEle) {
            isEditing = true;
          }
          v.zi_form_a.forEach(i => {
            if (i.showEle) {
                isEditing = true;
              }
            });
        });
        if (this.coownerAddDg || isEditing) {
          this.confirmFn("请先完成正在编辑的子集", "error");
          return;
        } else {
          this.form = {
            certificate_type_code: obj.certificate_type_code,
            contact_num: obj.contact_num,
            house_area_num: obj.list
          };
        }
      }
      this.$set(obj, "showEle", true);
    },
    // 调取记录编号接口
    refer_a() {
      let url = configApi.audit_RecordNum;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.ruleForm.id = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 调取不进审计条件的字段编号接口
    field_numbers_c() {
      console.log(111);
      let url = configApi.audit_columns;
      let data = {
        configColumnType: "not_ingress_rule"
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.field_numbers.push({
              value: i,
              label: data[i].columnNum
            });
            this.fieldname.push({
              value: i,
              label: data[i].columnName
            });
          }
          this.field_numbersa_c(); // 调取进审计条件的记录编号接口
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 调取进审计条件的记录编号接口
    field_numbersa_c() {
      let url = configApi.audit_columns;
      let data = {
        configColumnType: "ingress_rule"
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.field_numbersa_a.push({
              value: i,
              label: data[i].columnNum
            });
            this.fieldname_a.push({
              value: i,
              label: data[i].columnName
            });
          }
          this.compile_aj();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 不进行审计点击字段编号切换字段名称
    cut1() {
      this.form.contact_num = this.form.certificate_type_code;
      this.form.house_area_num = [];
    },
    // 不进行审计点击字段名称切换字段编号
    cut2() {
      this.form.certificate_type_code = this.form.contact_num;
      this.form.house_area_num = [];
    },
    // 进行审计点击字段编号切换字段名称
    cut3() {
      this.orgForm.org_area_num = this.orgForm.org_name;
      this.orgForm.org_address = [];
    },
    // 进行审计点击字段名称切换字段编号
    cut4() {
      this.orgForm.org_name = this.orgForm.org_area_num;
      this.orgForm.org_address = [];
    },
    // 添加父集表格判断
    openAddCoowner(obj, id) {
      let ziEditing = false;
      let isEditing = false;
      // 判断父集里面是否有子集 有子集后才能添加父集
            if (id) {
              this.orgForm_a.forEach(v => {
                if (v.zi_orgForm_a.showEle) {
                  ziEditing = true;
                  }
                v.zi_orgForm_a.forEach(i => {
                  if (i.showEle) {
                  ziEditing = true;
                }
                });
              });
              this.orgForm_a.forEach(v => {
                if (v.showEle) {
                  isEditing = true;
                }
              });
              if (isEditing) {
                this.confirmFn("请先完成正在编辑的分组", "error");
                return;
              };
              if (ziEditing) {
                  this.confirmFn("请先完成正在编辑的子集", "error");
                  return;
                };
              if (obj.zi_orgForm_a.length > 0) {
                this.coownerAddDgj = true;
              } else {
                this.confirmFn("请先添加子集", "error");
              }
            } else {
              // 判断父集里是否有编辑状态的表格
              this.form_a.forEach(v => {
                if (v.showEle) {
                  isEditing = true;
                  }
                });
                // 判断子集里是否有编辑状态的表格
              this.form_a.forEach(v => {
                if (v.zi_form_a.showEle) {
                  ziEditing = true;
                  }
                v.zi_form_a.forEach(i => {
                  if (i.showEle) {
                    ziEditing = true;
                    }
                  });
                });
                if (isEditing) {
                  this.confirmFn("请先完成正在编辑的分组", "error");
                  return;
                };
                if (ziEditing) {
                  this.confirmFn("请先完成正在编辑的子集", "error");
                  return;
                };
              if (obj.zi_form_a.length > 0) {
                this.coownerAddDg = true;
              } else {
                this.confirmFn("请先添加子集", "error");
              }
            }
            this.closeCoownerEdit(id);
      console.log(this.form);
    },
    // 添加子集判断
    zi_openAddCoowner(obj, id) {
      console.log(this.$refs);
      console.log(obj);
      let isEditing = false;
      this.form_a.forEach(v => {
        console.log(v.zi_form_a);
        if (v.zi_form_a.showEle) {
          isEditing = true;
        }
      });
      this.form_a.forEach(v => {
        v.zi_form_a.forEach(i => {
          console.log(i);
          if (i.showEle) {
          isEditing = true;
        }
        });
      });
      this.orgForm_a.forEach(v => {
        console.log(v.zi_form_a);
        if (v.zi_orgForm_a.showEle) {
          isEditing = true;
        }
      });
      this.orgForm_a.forEach(v => {
        v.zi_orgForm_a.forEach(i => {
          console.log(i);
          if (i.showEle) {
          isEditing = true;
        }
        });
      });
      if (id) {
        if (isEditing) {
        this.confirmFn("请先完成正在编辑的子集", "error");
      } else {
        this.$set(obj.zi_orgForm_a, "showEle", true);
        this.zi_closeCoownerEdit(id);
      }
      } else {
        if (isEditing) {
        this.confirmFn("请先完成正在编辑的子集", "error");
      } else {
        this.$set(obj.zi_form_a, "showEle", true);
        this.zi_closeCoownerEdit(id);
      }
      }
      // this.$nextTick(() => {
      //   if (id) {
      //     for (let i = 0; i < obj.zi_orgForm_a.length; i++) {
      //       this.$refs.orgForm[i].clearValidate();
      //     }
      //   } else {
      //     for (let i = 0; i < obj.zi_form_a.length; i++) {
      //       this.$refs.form[i].clearValidate();
      //     }
      //   }
      // });
    },
    // 清空子集
    zi_closeCoownerEdit(id) {
      if (id) {
        this.orgForm = {
          org_address: [],
          org_name: "",
          org_area_num: ""
        };
      } else {
        this.form = {
          house_area_num: [],
          certificate_type_code: "",
          contact_num: ""
        };
      }
    },
    // 情空父集
    closeCoownerEdit(id) {
      if (id) {
        this.fu_orgForm = {
          group_name: ""
        };
      } else {
        this.fu_form = {
          group_name: ""
        };
      }
    },
    addition_a() {
      this.orgForm = {
        org_address: [],
        org_name: "",
        // org_contract_name: "",
        org_area_num: ""
      };
      this.write_a = true;
    },
    // 新增保存 调取接口
    save(account) {
      console.log(this.form_a);
      console.log(this.orgForm_a);
      let url = configApi.audit_save;
      let listGroupNotIngress = [];
      let listGroupIngress = [];
      if (this.form_a.length > 0) {
        for (let i = 0; i < this.form_a.length; i++) {
          listGroupNotIngress.push({
            groupName: this.form_a[i].group_name,
            groupSort: this.form_a[i].guarantee_name,
            auditPercent: "100",
            listItem: []
          });
          for (let index = 0; index < this.form_a[i].zi_form_a.length; index++) {
            listGroupNotIngress[i].listItem.push({
              columnNum: this.form_a[i].zi_form_a[index].certificate_type_code,
              detailIds: this.form_a[i].zi_form_a[index].list.join(",")
            });
          }
        }
      }
      if (this.orgForm_a.length > 0) {
        for (let i = 0; i < this.orgForm_a.length; i++) {
          listGroupIngress.push({
            auditPercent: this.orgForm_a[i].org_phone_num,
            groupSort: this.orgForm_a[i].org_contract_name,
            groupName: this.orgForm_a[i].group_name,
            listItem: []
          });
          for (let index = 0; index < this.orgForm_a[i].zi_orgForm_a.length; index++) {
            listGroupIngress[i].listItem.push({
              columnNum: this.orgForm_a[i].zi_orgForm_a[index].org_name,
              detailIds: this.orgForm_a[i].zi_orgForm_a[index].list.join(",")
            });
          }
        }
      }
      let data = {
        checkBy: account.guarantee_name,
        checkByPwd: account.certificate_type_code,
        recordNum: this.ruleForm.id,
        effectiveStartDate: this.ruleForm.date1,
        listGroupNotIngress,
        listGroupIngress
        };
      console.log(data);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.confirmFn("保存成功", "success");
          this.$emit("clsoe_windowAlert_e");
          this.alert_ = false;
          this.refer(1);
          // this.compileNotDada();
          // this.compileDada();
        })
        .catch(err => {
          this.alert_ = false;
          this.$error(err.message);
        });
    },
    compile_aj() {
      console.log(this.compile);
      let data = { id: this.compile.id };
      let url = `${configApi.audit_detail}/${data.id}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          let reminder = [];
          let reminderContent = [];
          let Notreminder = [];
          let NotreminderContent = [];
          console.log(data);
          this.ruleForm.finish = data.effectiveEndDate;
          if (data.listGroupNotIngress.length > 0) {
            let contactNum = [];
            let ziForm = [];
            let notParticulars = [];
            for (let i = 0; i < data.listGroupNotIngress.length; i++) {
              ziForm = [];
              contactNum = [];
              notParticulars = [];
              for (let n = 0; n < data.listGroupNotIngress[i].listItem.length; n++) {
               notParticulars = data.listGroupNotIngress[i].listItem[n].detailIds.split(",");
               this.notParticulars = data.listGroupNotIngress[i].listItem[n].detailIds.split(",");
               this.$set(data.listGroupNotIngress[i].listItem[n], "list", []);
               for (let z = 0; z < this.compileNotList.length; z++) {
                 console.log(data.listGroupNotIngress[i].listItem[n].columnNum);
                 if (this.compileNotList[z].columnNum === data.listGroupNotIngress[i].listItem[n].columnNum) {
                   console.log(this.compileNotList[z].particulars);
                  for (let m = 0; m < notParticulars.length; m++) {
                     if ((this.compileNotList[z].particulars.findIndex(index => index.detailCode === notParticulars[m])) === -1) {
                       Notreminder.push(data.listGroupNotIngress[i].groupSort);
                       NotreminderContent.push(data.listGroupNotIngress[i].listItem[n].columnNum);
                       console.log(notParticulars[m]);
                       console.log(this.compileNotList);
                      console.log(notParticulars[m]);
                      console.log(data.listGroupNotIngress[i]);
                      //  this.confirmFn(data.listGroupNotIngress[i].groupName + "分组下的" + notParticulars[m] + "不存在", "error");
                      this.notParticulars.splice(m, 1);
                    } else {
                      console.log(this.compileNotList.findIndex(index => index.detailCode === notParticulars[m]));
                      console.log(this.compileNotList);
                      console.log(notParticulars[m]);
                      console.log(data.listGroupNotIngress[i].listItem[n].list);
                     data.listGroupNotIngress[i].listItem[n].list.push(this.compileNotList[z].particulars[this.compileNotList[z].particulars.findIndex(index => index.detailCode === notParticulars[m])].detailTitle);
                    }
                  }
                 }
               }
              if (this.fieldname.length !== 0) {
                  contactNum.push(this.fieldname[this.field_numbers.findIndex(j => j.label === data.listGroupNotIngress[i].listItem[n].columnNum)].label);
                }
                ziForm.push({
                  certificate_type_code: data.listGroupNotIngress[i].listItem[n].columnNum,
                  contact_num: contactNum[n],
                  house_area_num: data.listGroupNotIngress[i].listItem[n].list,
                  list: this.notParticulars,
                  showEle: false
                });
                console.log(contactNum[n]);
              }
              console.log(contactNum);
              console.log(ziForm);
              this.form_a.push({
                guarantee_name: data.listGroupNotIngress[i].groupSort,
                group_name: data.listGroupNotIngress[i].groupName,
                zi_form_a: ziForm,
                showEle: false
              });
            }
          }
          if (data.listGroupIngress.length > 0) {
            let contactNum = [];
            let ziForm = [];
            let particulars = [];
            for (let i = 0; i < data.listGroupIngress.length; i++) {
              ziForm = [];
              contactNum = [];
              // particulars = [];
              for (let n = 0; n < data.listGroupIngress[i].listItem.length; n++) {
               this.particulars_j = data.listGroupIngress[i].listItem[n].detailIds.split(",");
               particulars = data.listGroupIngress[i].listItem[n].detailIds.split(",");
               this.$set(data.listGroupIngress[i].listItem[n], "list", []);
               console.log(particulars);
               for (let z = 0; z < this.compileList.length; z++) {
                 if (this.compileList[z].columnNum === data.listGroupIngress[i].listItem[n].columnNum) {
                   for (let m = 0; m < particulars.length; m++) {
                    if ((this.compileList[z].particulars.findIndex(index => index.detailCode === particulars[m])) === -1) {
                       reminder.push(data.listGroupIngress[i].groupSort);
                       console.log(reminder);
                       reminderContent.push(data.listGroupIngress[i].listItem[n].columnNum);
                       this.particulars_j.splice(m, 1);
                    } else {
                       data.listGroupIngress[i].listItem[n].list.push(this.compileList[z].particulars[this.compileList[z].particulars.findIndex(index => index.detailCode === particulars[m])].detailTitle);
                    }
                  }
                 }
               }
              if (this.fieldname_a.length !== 0) {
                  console.log(data.listGroupIngress[i].listItem[n].columnNum);
                  console.log(this.field_numbersa_a);
                  contactNum.push(this.fieldname_a[this.field_numbersa_a.findIndex(j => j.label === data.listGroupIngress[i].listItem[n].columnNum)].label);
                }
                ziForm.push({
                  org_name: data.listGroupIngress[i].listItem[n].columnNum,
                  org_area_num: contactNum[n],
                  org_address: data.listGroupIngress[i].listItem[n].list,
                  list: this.particulars_j,
                  showEle: false
                });
                console.log(contactNum[n]);
              }
              console.log(contactNum);
              console.log(ziForm);
              this.orgForm_a.push({
                org_phone_num: data.listGroupIngress[i].auditPercent,
                org_contract_name: data.listGroupIngress[i].groupSort,
                group_name: data.listGroupIngress[i].groupName,
                zi_orgForm_a: ziForm,
                showEle: false
              });
            }
          }
          if (Notreminder.length > 0 || reminder.length > 0) {
              let error = [];
              let noterror = [];
              for (let i = 0; i < Notreminder.length; i++) {
                  error.push('序号' + Notreminder[i] + '下字段编号为' + NotreminderContent[i]);
              }
              //  this.confirmFn(error.slice(",") + "的不进审计详情分类数据异常", "error");
              for (let i = 0; i < reminder.length; i++) {
                  noterror.push('序号' + reminder[i] + '下字段编号为' + reminderContent[i]);
              }
              //  this.confirmFn(error.slice(",") + "的进审计详情分类数据异常", "error");
              if (error.length > 0) {
                error = error.slice(",") + "的不进审计详情分类数据异常";
                // this.confirmFn(error.slice(","), "error");
              }
              if (noterror.length > 0) {
                noterror = noterror.slice(",") + "的进审计详情分类数据异常";
                // this.confirmFn(error.slice(",") + ',' + noterror.slice(","), "error");
              }
              if (noterror.length > 0 && error.length === 0) {
                this.confirmFn(noterror.slice(","), "error");
              } else if (error.length > 0 && noterror.length === 0) {
                this.confirmFn(error.slice(","), "error");
              } else if (error.length > 0 && noterror.length > 0) {
                this.confirmFn(error.slice(",") + ',' + noterror.slice(","), "error");
              }
            }
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    composite,
    stateOfPreservation
  },
  mounted() {
    this.refer_a(); // 调取记录编号接口
    this.field_numbers_c(); // 调取不进审计条件的字段编号接口
    // this.compile_a();
  },
  watch: {
    // 监控不进审计字段名称变化去修改不进审计详情分类
    "form.certificate_type_code": {
      handler() {
        this.particulars = [];
        console.log(this.form.certificate_type_code);
        if (this.form.certificate_type_code !== "") {
          console.log(111);
          let url = configApi.details_category;
          let data = {
            columnNum: isNaN(this.form.certificate_type_code)
              ? this.form.certificate_type_code
              : this.field_numbers[this.form.certificate_type_code].label,
            configColumnType: "not_ingress_rule"
          };
          this.$MyFetch
            .get(url, data)
            .then((data = {}) => {
              console.log(data);
              if (data !== null) {
                for (let i = 0; i < data.length; i++) {
                  this.particulars.push({
                    value: data[i].detailCode,
                    label: data[i].detailTitle
                  });
                }
              }
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      },
      deep: true
    },
    // 监控不进审计字段名称变化去修改不进审计详情分类
    "orgForm.org_name": {
      handler() {
        this.particulars_a = [];
        if (this.orgForm.org_name !== "") {
          let url = configApi.details_category;
          let data = {
            columnNum: isNaN(this.orgForm.org_name)
              ? this.orgForm.org_name
              : this.field_numbersa_a[this.orgForm.org_name].label,
            configColumnType: "ingress_rule"
          };
          console.log(data);
          this.$MyFetch
            .get(url, data)
            .then((data = {}) => {
              console.log(data);
              if (data !== null) {
                for (let i = 0; i < data.length; i++) {
                  this.particulars_a.push({
                    value: data[i].detailCode,
                    label: data[i].detailTitle
                  });
                }
              }
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      },
      deep: true
    }
  }
};
</script>
