<template>
  <div>
    <div class="face identity" v-if="currentStep === 1">
      <div class="identity-left">
        <ul>
          <li><label>申请编号：</label><span>{{idcardInfo.applicationId}}</span></li>
          <li><label>出生年月：</label><span>{{idcardInfo.BornL}}</span></li>
          <li><label>客户姓名：</label><span>{{idcardInfo.NameS}}</span></li>
          <li><label>户籍地址：</label><span>{{idcardInfo.Address}}</span></li>
          <li><label>证件号码：</label><span>{{idcardInfo.CardNo}}</span></li>
          <li><label>签发机关：</label><span>{{idcardInfo.Police}}</span></li>
          <li><label>性别：</label><span>{{idcardInfo.SexL}}</span></li>
          <li><label>有效期限：</label><span>{{idcardInfo.ActivityL}}</span></li>
          <li><label>民族：</label><span>{{idcardInfo.NationL}}</span></li>
        </ul>
        <div class="oper-btn">
          <el-button class="width200 button-default" v-if="!isIdentityInCom" @click="identityFn">读卡认证</el-button>
          <p v-else>
            <i class="el-icon-success"></i>
            <span>认证成功</span>
          </p>
        </div>
      </div>
      <div class="identity-right">
        <div class="identity-img">
          <img :src="identityImg.idcardFront" alt="">
          <img :src="identityImg.idcardBack" alt="">
        </div>
        <div class="identity-rate">
          图片匹配度<span class="theme">{{identityImg.faceMatchPercent}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { baseApi } from "../../../js/server.js";
export default {
  name: 'identity',
  props: {
    currentStep: {
      type: Number
    },
    isIdentity: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      idcardInfo: {},
      isIdentityInCom: this.isIdentity,
      identityImg: {
        idcardFront: require("@/assets/img/identity1.png"),
        idcardBack: require("@/assets/img/identity2.png"),
        faceMatchPercent: 0
      }
    };
  },
  methods: {
    // 查看身份证图片和人脸识别结果
    getIdentity() {
      this.$MyFetch
        .get(baseApi.queryIDCardAndfaceRecognition + this.applicationId, {})
        .then(res => {
          // console.log(res);
          this.identityImg = res;
          if (this.identityImg.faceMatchPercent < 70) {
            this.confirmFn("照片匹配度不足70%，请关注身份真实性", "error");
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 读卡认证
    identityFn() {
      // 加载
      this.idLoading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });

      // 读卡并获取身份详细信息
      window.myopen_onclick(1);
      window.eventBus.$off('identityInfo');
      window.eventBus.$on('identityInfo', (_data) => {
        // this.idLoading.close();
        this.idcardInfo = _data;
        this.idcardInfo.applicationId = this.applicationId;
        this.checkIdentity(this.idcardInfo);
      });
    },
    checkIdentity(_info) {
      if (this.applicationId && _info.ActivityL && _info.CardNo && _info.NameS) {
        const data = {
          applicationId: this.applicationId,
          idCardExpiryTime: _info.ActivityL.split("-")[1],
          idCardNumber: _info.CardNo,
          name: _info.NameS.trim()
        };
        this.$MyFetch.post(baseApi.IDAuth, data)
          .then(res => {
            console.log("~~身份识别认证成功~~");
            this.isIdentityInCom = true; // 身份识别认证通过
            this.$emit('changeIdentity', this.isIdentityInCom);
            this.idLoading.close();
          })
          .catch(err => {
            console.error(err);
            // 身份识别认证不通过
            this.confirmFn(err.message, "error");
            this.idLoading.close();
            // code为CPMS000401时，身份认证不通过，此笔业务已否决，跳转到已处理页面，改成统一用CPMS000499判断
            // if (err.code === "CPMS000401") {
            if (err.code === "CPMS000401" || err.code === "CPMS000499") {
              this.$router.push({ name: "face2face-disposed" });
            }
        });
      } else {
        this.idLoading.close();
        this.confirmFn('身份证识别错误', "error");
      }
    }
  },
  created() {
    this.getIdentity();
  }
};
</script>

<style lang="less" scoped>
  .face.identity {
    display: flex;
    .identity-left {
      width: 65%;
      .boxShadow();
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 30px 0 44px 0;
        li {
          margin-bottom: 40px;
          &:nth-child(odd) {
            width: 40%;
          }
          &:nth-child(even) {
            width: 60%;
          }
          label {
            color: #999;
          }
        }
      }
      .oper-btn {
        padding: 20px 0;
        text-align: center;
        .border(top, @gray);
        p {
          font-size: 18px;
          height: 40px;
          line-height: 40px;
          color: @green;
        }
        i {
          vertical-align: middle;
        }
        span {
          font-weight: 900;
        }
      }
    }
    .identity-right {
      width: 35%;
      margin-left: 20px;
      text-align: center;
      .boxShadow();
      .identity-img {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 260px;
          height: 168px;
          &:nth-child(2) {
            margin-top: 18px;
          }
        }
      }
      .identity-rate {
        .border(top, @gray);
        padding: 10px 0;
      }
    }
  }
</style>
