<template>
    <div class="import-message" >
      <div class="dialog-mask"></div>
      <div class="dialog-box" v-loading='formLoading'>
        <!-- 头部 -->
        <div class="dialog-box__top">
          <h5 class="title bg__white">新增邮箱</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <!-- 主体部分 -->
        <div class="dialog-box__body">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- 单位信息 -->
            <div class="anti-fraud_dialog-box__middle">
              <div class="center">
                <ul class="clearfix">
                  <li class='f__left drop__select-box'>
                    <p class="lab"><span>*</span>合作方名称</p>
                    <el-form-item label="" prop="lineName" ref="lineName">
                      <button class="button"
                        type="button"
                        @click="dropSelectShow1=!dropSelectShow1;dropSelectShow2=false;"
                        :class="{isactive:dropSelectShow1,isValue:!activePartner.partnerName}">
                        {{activePartner.partnerName?activePartner.partnerName:'请选择合作方'}}
                        <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
                      </button>

                      <transition name="el-zoom-in-top">
                        <div class="wrap" v-show="dropSelectShow1">
                          <el-input
                            placeholder="搜索"
                            prefix-icon="el-icon-search"
                            v-model.trim="queryPartner"
                            style='margin: 20px;width: calc(100% - 40px);'>
                          </el-input>
                          <div class="wrap-title clearfix">
                            <span class="wrap-title-no">合作方编号</span>
                            <span class="wrap-title-name">合作方名称</span>
                          </div>
                          <ul class="list">
                            <li class="item clearfix" v-for="(item, index) in lineIds" :key="index" @click="selectedPartner(item)">
                              <span class="wrap-title-no">{{item.partnerCd}}</span>
                              <span class="wrap-title-name">{{item.partnerName}}</span>
                            </li>
                          </ul>
                        </div>
                      </transition>
                    </el-form-item>
                  </li>
                  <li class='f__right drop__select-box'>
                    <p class="lab"><span>*</span>所属分公司</p>
                    <el-form-item label="" prop="linkBranchDesc" ref="linkBranchDesc">
                      <button class="button"
                        type="button"
                        @click="dropSelectShow2=!dropSelectShow2;dropSelectShow1=false;"
                        :class="{isactive:dropSelectShow2,isValue:!activeLinkBranch.organizationName}">
                        {{activeLinkBranch.organizationName?activeLinkBranch.organizationName:'请选择所属分公司'}}
                        <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
                      </button>
                      <transition name="el-zoom-in-top">
                        <div class="wrap wrap-linkBranch" v-show="dropSelectShow2">
                          <el-input
                            placeholder="搜索"
                            prefix-icon="el-icon-search"
                            v-model.trim="queryLinkBranch"
                            style='margin: 20px;width: calc(100% - 40px);'>
                          </el-input>
                          <div class="wrap-title clearfix">
                            <span class="wrap-title-no">机构编号</span>
                            <span class="wrap-title-name">机构名称</span>
                          </div>
                          <ul class="list">
                            <li class="item clearfix" v-for="(item2, index2) in linkBranchDss" :key="index2" @click="selectedLinkBranch(item2)">
                              <span class="wrap-title-no">{{item2.organizationId}}</span>
                              <span class="wrap-title-name">{{item2.organizationName}}</span>
                            </li>
                          </ul>
                        </div>
                      </transition>
                    </el-form-item>
                  </li>
                  <li class="f__left">
                    <p><span>*</span>收件人</p>
                    <el-form-item label="" prop="bankReceiverAddresses" ref="addAddressee">
                      <el-input
                      type="text"
                      class="select_225"
                      placeholder="请填写邮箱地址"
                      v-model="ruleForm.bankReceiverAddresStart">
                      </el-input>
                    </el-form-item>
                    <span class="margin_right_icon">@</span>
                    <el-form-item  label="">
                      <el-input type="text" class="select_148" v-model="ruleForm.bankReceiverAddresEnd"></el-input>
                    </el-form-item>
                    <el-button
                    class="f__right plus"
                    type="text"
                    :disabled="!(ruleForm.bankReceiverAddresEnd&&ruleForm.bankReceiverAddresStart)"
                    @click="addAddressee">
                    </el-button>
                    <p v-if="bankReceiverAddressesList.length>0">收件人邮箱：</p>
                    <div class="email_list" v-if="bankReceiverAddressesList.length>0">
                      <div v-for="(o, i) in bankReceiverAddressesList" :key="i" class="text item" >
                        <span class="_span">{{ o }}</span>
                        <el-button
                        type="text"
                        @click="delAddressee(i)"
                        style="color: #F55F5F;"
                        class="f__right"
                        size="mini">删除</el-button>
                      </div>
                    </div>
                  </li>
                  <li class="f__left">
                    <p class="email_p"><span>*</span>发件人</p>
                    <el-form-item  label="" prop="senderAddress" ref="addAddressor">
                      <el-input type="text" class="select_225" placeholder="请填写邮箱地址" v-model="ruleForm.senderAddressStart"></el-input>
                    </el-form-item>
                    <span class="margin_right_icon">@</span>
                    <el-form-item  label="" >
                      <el-input type="text" class="select_148" v-model="ruleForm.senderAddressEnd"></el-input>
                    </el-form-item>
                    <el-button
                    class="f__right plus"
                    type="text"
                    :disabled="!(ruleForm.senderAddressStart&&ruleForm.senderAddressEnd)"
                    @click='addAddressor'>
                    </el-button>
                    <p v-if="ruleForm.senderAddress">发件人邮箱：</p>
                    <div class="email_list" v-if="ruleForm.senderAddress">
                      <div class="text item" >
                        <span class="_span">{{ ruleForm.senderAddress }}</span>
                      </div>
                    </div>
                  </li>
                  <li class="f__left">
                    <p class="email_p"><span>*</span>发件人密码</p>
                    <el-form-item  label=""  prop="senderPassword">
                      <el-input type="password" class="select_225" placeholder="请填写" v-model="ruleForm.senderPassword"></el-input>
                    </el-form-item>
                  </li>
                  <li class="f__left">
                    <p>抄送人</p>
                    <el-form-item  label=""  prop="copyToAddresses" ref="addRecipient">
                      <el-input type="text" class="select_225" placeholder="请填写邮箱地址" v-model="ruleForm.copyToAddresStart"></el-input>
                    </el-form-item>
                    <span class="margin_right_icon">@</span>
                    <el-form-item  label="" >
                      <el-input type="text" class="select_148" v-model="ruleForm.copyToAddresEnd"></el-input>
                    </el-form-item>
                    <el-button
                    class="f__right plus"
                    type="text"
                    :disabled="!(ruleForm.copyToAddresStart&&ruleForm.copyToAddresEnd)"
                    @click='addRecipient'>
                    </el-button>
                    <p v-if="copyToAddressesList.length>0">抄送人邮箱：</p>
                    <div class="email_list" v-if="copyToAddressesList.length>0">
                      <div v-for="(o, i) in copyToAddressesList" :key="i" class="text item" >
                        <span class="_span">{{ o }}</span>
                        <el-button
                        type="text"
                        @click="delRecipient(i)"
                        style="color: #F55F5F;"
                        class="f__right"
                        size="mini">删除</el-button>
                      </div>
                    </div>
                  </li>
                  <li class="f__left">
                    <p class="email_p"><span>*</span>录入人</p>
                    <el-form-item  label=""  prop="dealUserId">
                      <el-input type="text" disabled class="select_225" placeholder="请填写" v-model="ruleForm.dealUserId"></el-input>
                    </el-form-item>
                  </li>
                  <li class="f__right">
                    <p class="email_p"><span>*</span>录入机构</p>
                    <el-form-item  label=""  prop="dealOrg">
                      <el-input type="text" disabled class="select_225" placeholder="请填写" v-model="ruleForm.dealOrg"></el-input>
                    </el-form-item>
                  </li>
                  <li class="f__left">
                    <p><span>*</span>录入日期</p>
                    <el-form-item  label=""  prop="dealDate">
                      <el-input type="text" disabled class="select_225" placeholder="请填写" v-model="ruleForm.dealDate"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>
        <!-- 底部 -->
        <div class="text-center">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable */
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
import { userInfo } from "@common/js/localStorage";
let userId = JSON.parse(userInfo.getUserInfo())
  ? JSON.parse(userInfo.getUserInfo()).userId
  : "";
export default {
  watch: {
    queryPartner(newVal) {
      this.getPartner();
    },
    queryLinkBranch(newVal) {
      this.getBranch();
    }
  },
  data() {
    return {
      lineIds: [], // 合作机构列表
      queryPartner: "", // 搜索合作机构
      dropSelectShow1: false, // 是否显示合作机构选择框
      activePartner: {}, // 当前选择的合作机构

      linkBranchDss: [], // 分公司列表
      queryLinkBranch: "", // 搜索分公司
      dropSelectShow2: false, // 是否显示分公司选择框
      activeLinkBranch: {}, // 当前选择的分公司

      formLoading: false,
      ruleForm: {
        systemCode: "DSPM", // 系统编码
        lineId: "", // 合作方编码
        lineName: "", // 合作方名称
        linkBranchDs: "", // 大数分公司编号
        linkBranchDesc: "", // 大数分公司名称
        bankReceiverAddresses: "", // 合作机构收件箱地址
        copyToAddresses: "", // 邮件抄送地址
        senderAddress: "", // 大数发件箱地址
        senderPassword: "", // 发件箱密码
        stageType: "CZ", // 阶段类型
        dealDate: new Date().normalizeTime({ format: "" }).strTime,
        dealUserId: userId,
        dealOrg: "大数金融总部"
      },
      bankReceiverAddressesList: [],
      copyToAddressesList: [],
      // 正则验证
      rules: {
        lineName: [
          {
            required: true,
            message: "请选择合作方",
            trigger: "blur"
          }
        ],
        linkBranchDesc: [
          {
            required: true,
            message: "请选择所属分公司",
            trigger: "blur"
          }
        ],
        bankReceiverAddresses: [
          {
            required: true,
            message: "请输入收件人邮箱",
            trigger: "blur"
          }
        ],
        senderAddress: [
          {
            required: true,
            message: "请输入发件人邮箱",
            trigger: "blur"
          }
        ],
        senderPassword: [
          {
            required: true,
            message: "请输入发件人密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getPartner();
    this.getBranch();
  },
  methods: {
    // 选中合作方
    selectedPartner(obj) {
      // console.log(obj);
      this.activePartner = Object.assign(obj);
      this.ruleForm.lineName = this.activePartner.partnerName;
      this.ruleForm.lineId = this.activePartner.partnerCd;
      this.$refs["lineName"].clearValidate();
      this.dropSelectShow1 = false;
    },
    // 查询合作方
    getPartner() {
      let data = {
        partnerName: this.queryPartner
      };
      this.$MyFetch
        .post(accountApi.queryPartnerInfoList, data)
        .then((data = {}) => {
          // console.log(data);
          this.lineIds = data;
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 选中分公司
    selectedLinkBranch(obj) {
      // console.log(obj);
      this.activeLinkBranch = Object.assign(obj);
      this.ruleForm.linkBranchDesc = this.activeLinkBranch.organizationName;
      this.ruleForm.linkBranchDs = this.activeLinkBranch.organizationId;
      this.$refs["linkBranchDesc"].clearValidate();
      this.dropSelectShow2 = false;
    },
    // 查询分公司
    getBranch() {
      let data = {
        organizationName: this.queryLinkBranch
      };
      this.$MyFetch
        .get(accountApi.Organizations, data)
        .then((data = {}) => {
          // console.log(data.list);
          this.linkBranchDss = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增接口
    save() {
      let _that = this;
      // console.log(this.ruleForm.lineName);
      this.$refs["ruleForm"].validate(valid => {
        // console.log(valid);
        if (valid) {
          // console.log(this.ruleForm);
          // 新增->保存按钮
          let data = {
            systemCode: this.ruleForm.systemCode, // 系统编码
            lineId: this.ruleForm.lineId, // 合作方编码
            linkBranchDs: this.ruleForm.linkBranchDs, // 大数分公司
            bankReceiverAddresses: this.ruleForm.bankReceiverAddresses, // 合作机构收件箱地址
            copyToAddresses: this.ruleForm.copyToAddresses, // 邮件抄送地址
            senderAddress: this.ruleForm.senderAddress, // 大数发件箱地址
            senderPassword: this.ruleForm.senderPassword, // 发件箱密码
            stageType: this.ruleForm.stageType, // 阶段类型
            dealUserId: userId, // 录入人
            dealOrg: this.ruleForm.dealOrg // 录入机构
          };
          // console.log(data);
          let url = accountApi.email_config.addLoanSendSet;
          this.formLoading = true;
          this.$MyFetch
            .post(url, data)
            .then(res => {
              // console.log(res);
              this.confirmFn("数据保存成功！", "success");
              this.formLoading = false;
              _that.$parent.getList();
              this.close_();
            })
            .catch(err => {
              // console.log(err);
              this.formLoading = false;
              this.$error(err);
              this.close_();
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    // 增加收件人邮箱
    addAddressee() {
      this.bankReceiverAddressesList.push(
        this.ruleForm.bankReceiverAddresStart +
          "@" +
          this.ruleForm.bankReceiverAddresEnd
      );
      this.ruleForm.bankReceiverAddresses = this.bankReceiverAddressesList.join(
        ";"
      );
      this.ruleForm.bankReceiverAddresStart = "";
      this.$refs["addAddressee"].clearValidate();
    },
    // 删除收件人邮箱
    delAddressee(i) {
      // console.log(i);
      this.bankReceiverAddressesList.splice(i, 1);
      this.ruleForm.bankReceiverAddresses = this.bankReceiverAddressesList.join(
        ";"
      );
    },
    // 增加发件人邮箱
    addAddressor() {
      this.ruleForm.senderAddress =
        this.ruleForm.senderAddressStart + "@" + this.ruleForm.senderAddressEnd;
      this.$refs["addAddressor"].clearValidate();
    },
    // 增加抄送人邮箱
    addRecipient() {
      this.copyToAddressesList.push(
        this.ruleForm.copyToAddresStart + "@" + this.ruleForm.copyToAddresEnd
      );
      this.ruleForm.copyToAddresses = this.copyToAddressesList.join(";");
      this.ruleForm.copyToAddresStart = "";
      this.$refs["addRecipient"].clearValidate();
    },
    // 删除抄送人邮箱
    delRecipient(i) {
      this.copyToAddressesList.splice(i, 1);
      this.ruleForm.copyToAddresses = this.copyToAddressesList.join(";");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 566px;
    background: #FFFFFF;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 640px;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  width: 565px;
  overflow: hidden;
  padding: 10px 0;
  background: #fff;
  border-radius: 4px;
  margin: 0px auto 20px auto;
}
.center {
  text-align: left;
  overflow: hidden;
  margin: 0 36px;
  .select_225 {
    width: 225px;
  }
  .select_148 {
    width: 148px;
  }
  ul {
    .margin_right_icon {
      display: inline-block;
      width: 35px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
    li.drop__select-box {
      position: relative;
      .wrap {
        position: absolute;
        top: 45px;
        width: 400px;
        max-height: 470px;
        padding: 20px 0;
        border: 1px solid @line-color;
        border-radius: 4px;
        background: #fff;
        z-index: 10;
        font-size: 12px;
        box-shadow: 1px 2px 20px #ccc;
        &.wrap-linkBranch {
          right: 0px;
        }
        .wrap-title {
          width: 100%;
          background: #f9fafb;
          padding: 0 20px;
          span {
            float: left;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666;
            letter-spacing: 0;
            text-align: center;
            height: 40px;
            line-height: 40px;
            &.wrap-title-no {
              width: 160px;
            }
            &.wrap-title-name {
              width: 170px;
            }
          }
        }
        .list {
          max-height: 220px;
          overflow-y: auto;
          padding: 0 20px;
          .item {
            position: relative;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            span {
              font-family: PingFang-SC-Regular;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
              text-align: center;
              float: left;
              &.wrap-title-no {
                width: 160px;
              }
              &.wrap-title-name {
                width: 170px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .item:hover {
            background: @blue-hover;
          }
        }
      }
      .is-error.is-required .button {
        border-color: #f56c6c;
      }
      button {
        position: relative;
        width: 225px;
        display: block;
        padding: 0 20px;
        line-height: 40px;
        height: 40px;
        border: 1px solid @line-color;
        text-align: left;
        background: none;
        color: #333333;
        transition: all 0.3s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .icon {
          position: absolute;
          transform: rotateZ(180deg);
          right: 5px;
          top: 0px;
        }
        &.isValue {
          color: #bbbbbb;
        }
      }
    }
    .drop__select-box button.isactive {
      border-color: @blue-light;
      .icon {
        transform: rotateZ(0);
      }
    }
    .drop__select-box button.disabled {
      background: #f5f7fa;
      cursor: not-allowed;
    }
  }
  p {
    color: #bbbbbb;
    font-size: 12px;
    padding-bottom: 10px;
    &.email_p {
      margin-top: 10px;
    }
    span {
      color: #f00;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .email_list {
    margin-bottom: 10px;
    width: 415px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .text.item {
      border-bottom: 1px solid #dcdfe6;
      margin: 0 15px;
      height: 40px;
      line-height: 40px;
      display: block;
      button {
        height: 38px;
        line-height: 28px;
      }
    }
    .text.item:last-child {
      border-bottom: none;
    }
  }
  ._span {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.center > ul > li:nth-child(4) {
  clear: both;
}
// 备注
.input > input {
  width: 520px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 15px;
  margin-left: 15px;
}
.Remarks {
  overflow: hidden;
  margin: 20px 0;
}
.Remarks > input {
  width: 851px;
}
// 保存按钮
.text-center {
  text-align: center;
}
.el-button--primary {
  width: 200px;
  height: 40px;
  margin: 10px 0px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
.plus {
  background: url(../../../../assets/img/icon_plus.png) no-repeat center;
  background-size: 14px;
  height: 40px;
  width: 20px;
  line-height: 18px;
  margin-left: 20px;
}
</style>
