<template>
  <div class="import-message">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <!-- 新增关注名单头部 -->
        <div class="dialog-box__top">
          <h5 class="title">补件</h5>
          <span class="product-title-img"><img src="../../../../assets/img/Group10.png" alt=""></span>
          <span class="dialog-box-group"><el-button :disabled="!imageExistFlg" type="text" @click="showImage()">查看影像</el-button></span>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <!-- 新增关注名单主体部分 -->
        <div class="dialog-box__body">
          <div class="demo-ruleForm">
            <!-- 模块1 -->
            <div class="anti-fraud_dialog-box__middle" v-for="(item , index) in parentData" :key="index">
              <div class="anti-fraud_dialog-box__middle_title">补件{{SectionToChinese(index+1)}}</div>
              <div class="clearfix">
                <div class="top_conten"><span class="top_conten_title">补件人：</span><span class="top_content_font">{{item.patchPersonnelId}}</span></div>
                <div class="top_conten"><span class="top_conten_title">下发补件时间：</span><span class="top_content_font">{{item.patchCreatedDate}}</span></div>
                <div class="top_conten"><span class="top_conten_title">补件复核人：</span><span class="top_content_font">{{item.patchCheckerId}}</span></div>
                <div class="top_conten"><span class="top_conten_title">提交补件时间：</span><span class="top_content_font">{{item.patchSubmitDate}}</span></div>
              </div>
              <div class="anti-fraud_dialog-box__middle_one">
                <span class="blueSpan"></span><span class="blueTitle">补件分类</span>
                <div class="fenlei"><span class="black_font" v-for="(itemc, indexc) in item.codekey" :key="indexc">{{itemc.configTitle}}</span></div>
              </div>
              <div class="anti-fraud_dialog-box__middle_one">
                <span class="blueSpan"></span><span class="blueTitle">补件内容</span>
                <div class="anti-fraud_dialog-box__middle_one_content" v-for="(items , indexs) in item.patchContentTxt" :key="indexs">
                  <p class="patchBolt_line_height">补件{{SectionToChinese(indexs+1)}}：</p>
                  <p v-html="items" class="black_font patchBolt_line_height"></p>
                </div>
              </div>
              <div class="anti-fraud_dialog-box__middle_one noborder">
                <span class="blueSpan"></span><span class="blueTitle">补件回复</span>
                <p class="huifu black_font">{{item.handlerRemarkDesc}}</p>
                <p class="huifu black_font">{{item.inspectorRemarkDesc}}</p>
              </div>
              <div class="center">
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <el-button class="add" :disabled="disabled" type=primary @click="addPatch" v-if="isShow || !disabled">新增补件</el-button>
        </div>
      </div>
      </div>
</template>

<script>
import {aprAudApi} from "../../js/server.js";
  export default {
    props: ['PatchHisDto', 'patchClassCode', 'patchStatusCode', "disabled", 'appOrAud', 'applicationId', 'imageExistFlg'],
    data () {
      return {
        patchContent: [],
        parentData: [],
        fanxianArr: [],
        alertPatchBolt: true,
        url: ''
      };
    },
    methods: {
      // 影像平台
    showImage() {
      if (this.disabled) {
        this.$showImage(this.applicationId, '审批审计', {ReadOnly: '0'});
      } else {
        this.$showImage(this.applicationId, '审批审计');
      }
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
      addPatch() {
        this.$emit('alertPatchBolt');
        this.close_();
      },
      getReason(data) {
        return new Promise((resolve, reject) => {
          this.url = aprAudApi.taskDetail.OperationTranConfig;
          this.$MyFetch.get(this.url, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
        });
      },
      getTreeValue(configValue, mubiao) {
        return new Promise((resolve, reject) => {
            var query = {
            configType: 'patch_reason',
            configValue: configValue
          };
          this.getReason(query)
          .then((data) => {
            this.fanxianArr = data;
            mubiao.codekey = this.fanxianArr;
            // console.log(data);
            resolve(data);
          })
          .catch(err => {
           this.$error(err.message);
          });
        });
      },
      convert() {
        console.log(this.PatchHisDto, '进1');
        for (let i = 0; i < this.PatchHisDto.length; i++) {
          this.getTreeValue(this.PatchHisDto[i].patchClassCode, this.PatchHisDto[i])
          .then((data) => {
            if (this.PatchHisDto[i].patchContentTxt && this.PatchHisDto[i].patchContentTxt.indexOf("|")) {
              let ig = this.PatchHisDto[i].patchContentTxt.split("|");
              this.PatchHisDto[i].patchContentTxt = ig;
              for (let k = 0; k < this.PatchHisDto[i].patchContentTxt.length; k++) {
              this.PatchHisDto[i].patchContentTxt[k] = this.PatchHisDto[i].patchContentTxt[k].replace(/\n/g, "<br/>");
            }
            } else if (this.PatchHisDto[i].patchContentTxt) {
              let omg = this.PatchHisDto[i].patchContentTxt.split();
              this.PatchHisDto[i].patchContentTxt = omg;
            }
            this.parentData = this.PatchHisDto;
          });
        }
        console.log(this.PatchHisDto, '进2');
      },
      close_() {
      this.$emit("reset");
      this.$emit("clsoe_windowAlert");
      }
    },
    computed: {
      isShow() {
        if (this.patchStatusCode === 'Underway') {
          return false;
        } else {
          return true;
        }
      }
    },
    created() {
      console.log(this.imageExistFlg);
      this.convert();
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .import-message {
  .dialog-box {
    width: 946px;
    height: 770px;
    background: #ffffff;
    .dialog-box__top{
      margin-bottom: 20px;
    }
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
    .dialog-box-group{
      position: absolute;
      top: -2px;
      right: 40px;
    }
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 610px;
    }
    .add {
      width: 200px;
      height: 40px;
      border: none;
      background: #538bf1;
      border-radius: 4px;
      color: #fff;
    }
    .anti-fraud_dialog-box__middle {
      width: 875px;
      overflow: hidden;
      padding: 0 0 10px 0;
      border-radius: 4px;
      margin: 0px auto 20px auto;
      border: 1px solid #E9E9E9;
      .anti-fraud_dialog-box__middle_title{
        border-bottom: 1px solid #E9E9E9;
        line-height: 40px;
      }
      .anti-fraud_dialog-box__middle_one {
        .huifu{
          margin-left: 10px;
        }
        .anti-fraud_dialog-box__middle_one_content{
          margin-left: 10px;
          padding-bottom: 20px;
        }
        font-size: 14px;
        line-height: 70px;
        text-align: left;
        margin: 0 20px;
        border-bottom: solid 1px #d0d0d0;
        .blueSpan {
          display: inline-block;
          background: #538bf1;
          width: 2px;
          height: 16px;
          margin-right: 6px;
        }
        .blueTitle{
          font-size: 14px;
          color: #333333;
        }
        > p {
          margin-top: -20px;
        }
        .fenlei{
          margin-left: 10px;
          line-height: 30px;
          > span {
            margin-right: 15px;
          }
        }
      }
      .noborder{
        border: none;
      }
      .anti-fraud_dialog-box__middle_two {
        overflow: hidden;
        padding: 0 20px;
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        width: 240px;
        height: 50px;
        margin-left: 10px;
        line-height: 50px;
        text-align: left;
      }
      .anti-fraud_dialog-box__middle_two > li > p {
        font-size: 14px;
        color: #151515;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span {
        color: #666;
        margin-right: 10px;
      }
    }
  }
}
.black_font{
  font-size: 12px;
}
 .top_conten {
  float: left;
  margin-left: 20px;
  margin-right: 50px;
  padding-top: 10px;
}
.top_conten_title {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 20px;
}
.top_content_font {
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.86px;
  line-height: 20px;
}
.patchBolt_line_height{
  line-height: 20px;
}
.text-center{
  text-align: center;
  margin-top: 20px;
}
</style>
