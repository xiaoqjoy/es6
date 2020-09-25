<template>
  <div>
    <div class="face-to-face-dispose">
      <el-container style="height: 100%;">
        <el-header height="104px" class="custom-header">
          <div class="bread-nav">
            <router-link
              to="/system/face2face/face2face-undisposed"
              class="theme">待处理</router-link>
            <span class="el-icon-arrow-left"></span>
            <span>面签面核</span>
          </div>
          <div class="control-btn-wrap">
            <div class="steps-warp">
              <steps :stepArr="stepArr" :currentStep="currentStep" showMode="inline"></steps>
            </div>
            <div class="control-btn">
              <el-button class="width120" :class="isIdentity ? 'button-primary' : 'button-info'" v-if="currentStep === 1" @click="startIdentity">开始面核</el-button>
              <el-button class="width120 button-warning" @click="saveInfo(false)" v-if="(currentStep === 2 && tabName !== 'loans-records') && resignInd">保存</el-button>
              <el-button class="width120 button-primary" @click="faceCheckSubmit" v-if="currentStep === 2">提交面核</el-button>
              <el-button class="width120 button-default" @click="lastStep" v-if="/3|4/.test(currentStep) && !(faceCheckTime === 2 && currentStep === 3)">上一步</el-button>
              <el-button class="width120 button-primary" @click="faceCheck" v-if="currentStep === 3">下一步</el-button>
              <el-button class="width120 button-primary" @click="checkFinish" v-if="currentStep === 4">完成</el-button>
              <el-button type="success" class="width120" @click="preview" v-if="currentStep === 4">预览</el-button>
            </div>
          </div>
        </el-header>
        <el-main class="custom-main" style="height: 100%;">
          <!-- <p>currentStep {{currentStep}}</p> -->
          <identity :currentStep="currentStep"
          :isIdentity="isIdentity" :applicationId="applicationId"
          v-if="currentStep === 1"
          @changeIdentity="changeIdentityWatch"></identity>
          <verify @currentStepAdd="currentStep++"
            ref="verifyCom" :applicationId="applicationId"
            :customerName="customerName" @tab_change="tabChange"
            :ydApproveMode2="ydApproveMode2"
            v-if="currentStep === 2">
          </verify>
          <v-sign :applicationId="applicationId" v-if="currentStep === 3" ref="vSign"
          @currentStepAdd="currentStep++" :customerName="customerName"></v-sign>
          <confirm-result :applicationId="applicationId" v-if="currentStep === 4" ref="confirmResult"></confirm-result>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import steps from "@components/steps"; // 步骤条组件
import identity from './identity';
import verify from './verify';
import vSign from './sign';
import confirmResult from './confirm-result';
import { baseApi } from "../../js/server.js";
// import { markOpenTab } from '../../js/mind';
export default {
  name: 'face-2-face-new',
  components: {
    steps,
    identity,
    verify,
    vSign,
    confirmResult
  },
  props: {},
  data() {
    return {
      stepArr: [
        // 面签步骤信息
        { title: "身份认证" },
        { title: "面核" },
        { title: "面签" },
        { title: "结果确认" }
      ],
      currentStep: 0,
      isIdentity: false,
      faceCheckTime: 0,
      tabName: ''
    };
  },
  methods: {
    preview() {
      let route = this.$router.resolve({
        name: 'face2face-preview',
        query: {
          applicationId: this.applicationId
        }
      });
      window.open(route.href);
    },
    unloader() {
      const parentWindow = window.opener;
      if (parentWindow) {
        console.log(parentWindow.sessionStorage.getItem('tabNumber'));
        parentWindow.sessionStorage.removeItem('tabNumber');
      }
      console.log(parentWindow.sessionStorage.getItem('tabNumber'));
    },
    lastStep() {
      this.currentStep--;
    },
    init() {
      // const parentWindow = window.opener;
      // if (parentWindow) {
      //   parentWindow.sessionStorage.setItem('tabNumber', 1);
      // }
      let stateList = ['IdAuth', 'faceCheck', 'faceInterview', 'f2fConfirm'];
      this.$MyFetch
        .get(baseApi.f2fProgressNode + this.applicationId)
        .then(_res => {
          let index = stateList.findIndex(_item => {
            return _item === _res;
          });
          if (index >= 0) {
            this.currentStep = index + 1;
          }
          console.log(this.currentStep);
        }).catch(_err => {
          this.confirmFn(_err.message, "error");
        });
    },
    startIdentity() {
      if (!this.isIdentity) {
        this.confirmFn("您还没有进行读卡认证，请进行读卡认证，再开始面核操作", 'error');
        return;
      }
      this.currentStep++;
    },
    saveInfo(_isSumit) {
      this.$refs.verifyCom.$emit('saveInfoHandle', _isSumit);
    },
    faceCheck() {
      this.$refs.vSign.$emit('faceCheckHandle');
    },
    checkFinish() {
      this.$refs.confirmResult.$emit('confirmHandle');
    },
    changeIdentityWatch(_data) {
      this.isIdentity = _data;
    },
    faceCheckSubmit() {
      this.saveInfo(true);
    },
    // 可能没有用
    tabChange(_tabName) {
      this.tabName = _tabName;
    }
  },
  created() {
    this.init();
    // window.addEventListener('beforeunload', this.unloader, false);
  },
  mounted() {
    this.$store.dispatch('updateOpenVideoHandler', this.resignInd);
  },
  destroyed() {
    // window.removeEventListener('beforeunload', this.unloader);
  },
  computed: {
    // 是否易贷先审后签业务
    ydApproveMode2() {
      return this.$route.params.ydApproveMode2;
    },
    applicationId() {
      return this.$route.params.applicationId;
    },
    customerName() {
      return this.$route.params.customerName;
    },
    resignInd() {
      if (this.$route.params.resignInd === 'true') {
        return true;
      }
      if (this.$route.params.resignInd === 'false') {
        return false;
      }
      return this.$route.params.resignInd;
    }
  }
};
</script>

<style lang="less" scoped>
  .face-to-face-dispose {
    margin-top: -90px;
    margin-left: -220px;
    position: fixed;
    background-color: #f5f5f5;
    overflow: auto;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .el-header.custom-header {
      padding: 20px;
      position: fixed;
      width: 100%;
      background-color: #f5f5f5;
      z-index: 99;
      .bread-nav {
        font-size: 14px;
        .theme {
          color: @theme;
          font-weight: 600;
          text-decoration: none;
        }
      }
      .control-btn-wrap {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .steps-warp {
          flex: 0 0 640px;
        }
        .control-btn {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .el-main.custom-main {
      margin-top: 104px;
      padding: 0 20px 20px 20px;
      // margin-bottom: 60px;
    }
  }
</style>
