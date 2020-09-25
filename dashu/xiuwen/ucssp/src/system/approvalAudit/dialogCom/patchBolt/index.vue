<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">补件</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="patchBolt_nav">
        <span class="patchBolt_nav_title">补件分类</span>
        <div>
          <el-tree
            :render-content="renderContent"
            :data="patchClassCode"
            show-checkbox
            node-key="configCode"
            default-expand-all
            ref="tree"
            highlight-current
            @check="getCheckedNodes"
            :props="defaultProps"
          ></el-tree>
        </div>
      </div>
      <div class="patchBolt_content_box">
        <div class="patchBolt_content_title clearfloat">
          <div>
            <div class="patchBolt_content_name">
              <span class="gray_font">补件人：</span>
              <span class="black_font">{{PatchHisDto.patchPersonnelId}}</span>
            </div>
            <div class="gray_font patchBolt_content_date">
              <span>下发时间：</span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="patchBolt_content">
          <span class="patchBolt_nav_title">补件内容</span>
          <div
            class="patchBolt_contentA"
            v-for="(item , index) in this.sendPatchBoltValue"
            :key="index"
          >
            <span class="patchBolt_contentA_title">补件{{SectionToChinese(index+1)}}：</span>
            <p class="gray_font patchBolt_line_height">请补充{{item.configTitle}}资料</p>
            <el-form :model="item" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="configDesc">
                <el-input  type="textarea" :disabled="disabled"
                onkeyup="this.value=this.value.replace(/\|/g,'')"
                resize="none"
                class="patchBolt_contentAtextarea"
                rows="5"
                v-model="item.configDesc"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          type="primary"
          @click="returnPatch()"
          :disabled="disabled || isCanClick"
          v-if="isShow || !disabled"
        >退回补件</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import { aprAudApi } from "../../js/server.js";

export default {
  props: [
    "PatchHisDto",
    "patchClassCode",
    "patchStatusCode",
    "disabled",
    "appOrAud",
    "imageExistFlg"
  ],
  data() {
    return {
      url: "",
      newStr: "",
      returnSwitch: true,
      aaa: 0,
      patchBoltValue: [],
      newPatchBoltValue: [],
      sendPatchBoltValue: [],
      configCode: [],
      patchContent: [],
      PatchHisDtoA: this.PatchHisDto, // 历史补件
      patchContentTxt: "",
      defaultProps: {
        children: "childList",
        label: "configTitle"
      },
      rules: {
        configDesc: [
            { required: true, message: '请填写补件内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    renderContent: function(createElement, { node, data, store }) {
      return createElement("span", [
        createElement("span", [
          createElement("span", {
            domProps: {
              innerHTML: node.label
            },
            style: {
              overflow: "hidden",
              "text-overflow": "ellipsis",
              "white-space": "nowrap",
              "font-size": "14px",
              "max-width": "150px",
              display: "block"
            },
            attrs: {
              title: node.label
            }
          })
        ])
      ]);
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
    },
    backPatch(data) {
      for (let i = 0; i < this.sendPatchBoltValue.length; i++) {
        this.configCode.push(this.sendPatchBoltValue[i].configCode);
        this.patchContent.push(this.sendPatchBoltValue[i].configDesc);
        this.patchContentTxt = this.patchContent.join("|");
      }
      return new Promise((resolve, reject) => {
        if (this.appOrAud) {
          this.url = `${aprAudApi.taskDetail.patchOper}/${
            this.$route.query.appID
          }`;
        } else {
          this.url = `${aprAudApi.aud.taskDetail.patchOper}/${
            this.$route.query.appID
          }`;
        }
        let data = {
          patchClassCode: this.configCode,
          patchContentTxt: this.patchContentTxt
        };
        console.log(data);
        this.$MyFetch
          .post(this.url, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
          this.configCode = [];
          this.patchContent = [];
      });
    },
    returnPatch() {
      this.backPatch()
        .then(data => {
          this.close_();
          if (this.appOrAud) {
            this.$router.push({
              name: "approval-pending",
              path: "/approval-pending"
            });
          } else {
            this.$router.push({
              name: "audit-pending",
              path: "/audit-pending"
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    getCheckedNodes() {
      this.patchBoltValue = this.$refs.tree.getCheckedNodes();
      this.newPatchBoltValue = this.listCmputed;
      for (let i = 0; i < this.newPatchBoltValue.length; i++) {
        let obj = this.newPatchBoltValue[i];
        let num = obj.configCode;
        let isExist = false;
        for (let j = 0; j < this.sendPatchBoltValue.length; j++) {
          let aj = this.sendPatchBoltValue[j];
          let n = aj.configCode;
          if (n === num) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          this.sendPatchBoltValue.push(JSON.parse(JSON.stringify(obj)));
        }
      }
      for (let a = 0; a < this.sendPatchBoltValue.length; a++) {
        let obj2 = this.sendPatchBoltValue[a];
        let num2 = obj2.configCode;
        let isExist2 = false;
        for (let k = 0; k < this.newPatchBoltValue.length; k++) {
          let aj = this.newPatchBoltValue[k];
          let n = aj.configCode;
          if (n === num2) {
            isExist2 = true;
            break;
          }
        }
        if (!isExist2) {
          let objIndex = this.sendPatchBoltValue
            .map(item => item.configCode)
            .indexOf(obj2.configCode);
          this.sendPatchBoltValue.splice(objIndex, 1);
          a--;
        }
      }
      console.log(this.configCode, '瞧瞧');
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  },
  computed: {
    isShow() {
      if (this.patchStatusCode === "Underway") {
        return false;
      } else {
        return true;
      }
    },
    isCanClick() {
      if (this.sendPatchBoltValue.length === 0) {
        return true;
      } else {
        let doClick = 0;
        for (let i = 0; i < this.sendPatchBoltValue.length; i++) {
          if (!this.sendPatchBoltValue[i].configDesc) {
            doClick++;
          }
        }
        if (doClick !== 0) {
          return true;
        }
      }
    },
    listCmputed() {
      return this.patchBoltValue.filter(function(item) {
        return item.configDesc != null;
      });
    }
  },
  created() {
    console.log(this.patchClassCode, "补件code");
  }
};
</script>

<style lang="less" scoped>
.import-message{
  .dialog-box {
  background: #f9fafb;
  width: 946px;
  height: 620px;
  .el-button--primary{
    width: 200px;
    height: 40px;
    margin: 20px 0;
  }
  .dialog-box__top{
    margin-bottom: 0;
  }
  /* 字体 */
  .strong_font {
    font-weight: bold;
  }
  .gray_font {
    color: #666;
    font-size: 14px;
  }
  .black_font {
    font-size: 14px;
    color: #151515;
  }
  .product-title {
    height: 60px;
  }
  .product_title_head {
    line-height: 60px;
  }
  .patchBolt_title {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  }
  /* 导航菜单 */
  .patchBolt_nav {
    overflow-y: auto;
    background: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px 0 0 4px;
    width: 230px;
    height: 560px;
    float: left;
  }
  .patchBolt_nav > div {
    height: 500px;
  }
  /deep/.tree {
    width: 80px;
    height: 500px;
  }
  /deep/.el-tree {
    min-width: 100%;
  }
  .patchBolt_nav_title {
    font-size: 12px;
    color: #333333;
    letter-spacing: 1.09px;
    font-weight: bold;
    line-height: 40px;
  }
  /* 内容 */
  .patchBolt_content_box {
    background: #ffffff;
    float: right;
    width: 715px;
    line-height: 50px;
  }
  .patchBolt_content_name {
    float: left;
    margin-left: 20px;
  }
  .patchBolt_content_date {
    float: right;
    margin-right: 20px;
  }
  .patchBolt_content {
    background: #ffffff;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    width: 676px;
    height: 430px;
    margin: 0 20px 0 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .patchBolt_contentA {
    background: #ffffff;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    margin: 0 10px 10px 10px;
    text-align: left;
  }
  .patchBolt_contentA_title {
    font-size: 12px;
    font-weight: bold;
    margin-left: 15px;
  }
  .patchBolt_line_height {
    line-height: 17px;
    margin-left: 15px;
  }
  /deep/ .patchBolt_contentAtextarea {
    resize: none;
    outline: none;
    border: none;
    width: 600px;
  }
  /deep/ .el-form-item__error{
    left: 20px;
  }
  /deep/ .el-textarea__inner{
    border: none;
  }
}
}

</style>
