<template>
  <div class="check-wrap">
    <div class="check-left clearfix">
      <div class="check-tabs visa_new">
        <el-tabs v-model="checkTabs" @tab-click="checkTabsClick">
          <el-tab-pane label="客户信息" name="customers-info">
            <customer-info :applicationId="applicationId" :isDetail="isDetail" :ydApproveMode2="ydApproveMode2"
              @customer_update="customerUpdate"
              ref="customers-info"
              @submitHandle="submitHandle"></customer-info>
          </el-tab-pane>
          <el-tab-pane label="产品收入信息" name="product-list">
            <product-list :applicationId="applicationId" :isDetail="isDetail" :ydApproveMode2="ydApproveMode2"
            @customer_update="customerUpdate"
            ref="product-list"
            @submitHandle="submitHandle"></product-list>
          </el-tab-pane>
          <el-tab-pane label="产品信息" name="product-info">
            <product-info :applicationId="applicationId" :isDetail="isDetail" :ydApproveMode2="ydApproveMode2"
            @customer_update="customerUpdate"
            ref="product-info" v-if="checkTabs === 'product-info'"
            @submitHandle="submitHandle"></product-info>
          </el-tab-pane>
          <el-tab-pane label="历史贷款记录" name="loans-records">
            <!-- loansRecords -->
            <loans-records :applicationId="applicationId"
            ref="loans-records"
            @submitHandle="submitHandle"></loans-records>
          </el-tab-pane>
        </el-tabs>
        <div class="check-tabs-btn">
          <span class="button-text" @click="$showImage(applicationId, '柜面面签')">影像资料</span>
          <!-- <span class="button-text" @click="showCredit">查看征信报告</span> -->
          <view-credit-report :moduleCode="'counterF2F'" :applicationId="applicationId" :isEdit="isDetail" @showCredit="showCredit1"></view-credit-report>
          <!-- <span class="button-text">{{infoChange}}</span> -->
        </div>
      </div>
      <div class="check-main">
      </div>
    </div>
    <div class="check-right">
      <div class="check-video">
        <custom-video
          :width="360" :height="280"
          :applicationId="applicationId"
          :customerName="customerName"
          videoType="1" ref="video" name="video"
          @faceCheck_submit="faceCheckSubmitWatch">
        </custom-video>
      </div>
      <div class="check-note">
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="(items, index) in checkDimens" :key="items.tabCode" :label="items.tabName" :name="index + ''">
            <el-collapse>
              <el-collapse-item v-for="item in items.labels" :key="item.labelCode">
                <template slot="title">
                  <div class="check-note-title">{{item.labelName}}</div>
                </template>
                <div class="check-note-content">
                  <div v-for="e in item.opinionItemList" :key="e.code"><el-checkbox v-model="e.state" :label="e.desc" @change="optionChange(e)"></el-checkbox></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
        <div class="check-note-remark">
          <div class="check-note-title">备注</div>
          <el-input type="textarea" :rows="4" v-model="remark" @blur="saveSpeechRemark"></el-input>
        </div>
      </div>
    </div>
    <popup :isShowDialog="isShowCredit"
      :url="creditReport" :isReport="true"
      :applicationId="applicationId" menuDesc="柜面面签"
      :iframe="true" :center="true"
      :width="800" :height="700"
      @closeDialog="isShowCredit = false">
    </popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { baseApi } from "../../../js/server.js";
import { mapGetters } from 'vuex';
import { customerInfoSelectArry, productListSelectArr, productInfoSelectArr, filterOH1 } from "../../../js/mind";
import customVideo from "@components/video/index"; // 影像组件
import popup from "@components/popup/index"; // 拖动弹框组件
import customerInfo from './customer-info';
import productList from './product-list';
import productInfo from './product-info';
import loansRecords from './loans-records';
import viewCreditReport from '@components/viewCreditReport/index';
export default {
  name: 'check',
  props: {
    applicationId: {
      type: String,
      default: ''
    },
    customerName: {
      type: String,
      default: ''
    },
    // 是否是详情，是的话则所有表单不可编辑
    isDetail: {
      type: Boolean,
      default: false
    },
    // 易贷面核面签（除收款账户信息）不可编辑
    ydApproveMode2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: '0',
      checkDimens: [],
      remark: '',
      checkTabs: "customers-info", // 面核当前的tab, 面核当前的组件["customers-info","product-info","loans-records","check-bank"]
      currentTab: 'customers-info',
      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      creditReport: "", // 征信报告url
      infoChange: '',
      // 去重，再转成数组
      selectArry: Array.from(new Set(customerInfoSelectArry.concat(productListSelectArr, productInfoSelectArr))),
      refCom: {
        'customers-info': '客户信息',
        'product-list': '产品收入信息',
        'product-info': '产品信息',
        'loans-records': '历史贷款记录'
      },
      refCom1: {
        'customers-info': '客户信息',
        'product-list': '产品收入信息',
        'loans-records': '历史贷款记录'
      }
    };
  },
  methods: {
    checkTabsClick(_tab, _event) {
      if (!this.infoChange) {
        this.confirmFn(`您已修改过${this.refCom[this.currentTab]}，请保存后再离开`, "error", false);
        setTimeout(() => {
          this.checkTabs = this.currentTab;
        }, 300);
        return false;
      }
      this.checkTabs = _tab.name;
      this.currentTab = _tab.name;
      this.$emit('tab_change', _tab.name);
      // if (_tab.name === 'product-info') {
      //   this.$refs['product-info'].$emit('refresh');
      // }
    },
    customerUpdate(_flag) {
      this.infoChange = _flag;
    },
    showCredit() {
      this.$getCreditReport("counterF2F", this.applicationId).then(res => {
        this.creditReport = res;
        this.isShowCredit = true;
      });
    },
    showCredit1(_data) {
      this.creditReport = _data.creditReport;
      this.isShowCredit = _data.isShowCredit;
    },
    // 查询面签意见话术库
    faceCheckOpinionLibrary() {
      this.$MyFetch
        .get(baseApi.faceCheckOpinionLibrary + this.applicationId + "/faceCheckOpinionLibrary")
        .then(res => {
          // console.log(res);
          this.checkDimens = res.faceCheckOpinionTabs;
          this.remark = res.faceCheckOpinion;
          this.saveSpeechRemark();
          this.optionChange();
          // this.checkDimens = JSON.parse(JSON.stringify(tabJson.data.faceCheckOpinionTabs));
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    saveSpeechRemark() {
      let speechOptionMap = {
        target: 'updateSpeechRemark',
        remark: this.remark
      };
      this.$store.dispatch('updateSpeechHandler', speechOptionMap);
    },
    optionChange() {
      // 处理面签意见话术库数据
      let opinionCheckStateList = [];
      let arr = [];
      let speechOptionMap = {};
      // let target = { "code": "OH1", "desc": "否决-其他", "state": true };
      this.checkDimens.forEach(x => {
        x.labels.forEach(_v => {
          arr = _v.opinionItemList.filter(_y => {
            return _y.state;
          });
          opinionCheckStateList.push(...arr);
        });
      });
      speechOptionMap = {
        optionList: opinionCheckStateList,
        target: 'updateSpeechOption' // 通知vuex更新勾选话术库
      };
      this.$store.dispatch('updateSpeechHandler', speechOptionMap);
    },
    saveInfoWather() {
      // 监听从父组件传下来的保存按钮事件
      this.$on('saveInfoHandle', (_isSubmit) => {
        if (this.$refs[this.checkTabs] instanceof Object && this.checkTabs !== 'loans-records') {
          this.$refs[this.checkTabs].$emit('saveHandle', _isSubmit);
          return;
        }
        if (this.checkTabs === 'loans-records') {
          this.submitHandle();
        }
      });
    },
    /* 提交逻辑： 由父组件触发saveinfo函数（true--提交,false--保存）,
       本组件监听saveInfoHandle函数，触发saveInfoWather函数,向下标签页组件广播
       saveInfoHandle事件，标签页组件监听saveHandeleWath函数触发saveInfo函数触发
       各种校验，触发保存接口函数，在成功的回调函数中根据saveinfo函数的布尔值true触发
       submitHandle事件，本组件监听submitHandle函数触发“请确认面核是否完成”弹窗，校验完
       向录像（千里眼）组件广播stopVideo事件并传入向上广播的事件名，录像组件停止录像后，
       向上广播事件，本组件接收faceCheckSubmitWatch事件调用faceCheck_submit提交函数。。
       好累哦。。。。。。
    */
    submitHandle() {
      this.confirmFn("请确认面核是否完成", "warning", true).then(() => {
        let speechOptionMap = this.$store.getters.speechOptionMap;
        // 若勾选了话术库维度，备注意见必填
        if (filterOH1(speechOptionMap.optionList) && !this.remark.length) {
          this.confirmFn("备注意见不能为空", "error");
          return false;
        }
        if (this.openVideo) {
          // 向下触发视频控件停止录像
          this.$refs["video"].$emit("stopVideo", "faceCheck_submit");
        } else {
          // 面核提交
          this.faceCheck_submit();
        }
        // console.log('submit');
      });
    },
    /**
     * 捕获从视频组件抛出的faceCheck_submit自定义事件
     */
    faceCheckSubmitWatch() {
      this.faceCheck_submit();
    },
    // 面核提交，
    faceCheck_submit() {
      console.log("面核提交，申请编号：", this.applicationId);
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      let speechOptionMap = this.$store.getters.speechOptionMap;
      const data = {
        applicationId: this.applicationId,
        faceCheckOpinion: speechOptionMap.remark,
        opinionCheckStateList: speechOptionMap.optionList
      };
      this.$MyFetch
        .post(baseApi.faceCheck_submit, data)
        .then(res => {
          // console.log(res);
          loading.close();
          this.confirmFn("面核成功，已进入面签阶段", "success");
          // 通知父组件currentStep++
          this.$emit('currentStepAdd');
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          loading.close();

          /**
           * code为CPMS000422时，产品不符合定价策略，此笔业务已否决
           * code为CPMS000404时，面核话术库不通过，贷款申请已否决
           * code为CPMS000405时，面核话术库不通过，贷款申请已否决
           * 改成统一用CPMS000499判断
           */
          // 跳转到已处理页面
          // if (
          //   err.code === "CPMS000422" ||
          //   err.code === "CPMS000404" ||
          //   err.code === "CPMS000405"
          // ) {
          if (err.code === "CPMS000499" || err.code === "CPMS000422" || err.code === "CPMS000404" || err.code === "CPMS000405") {
            this.$router.push({ name: "face2face-disposed" });
          }
        });
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    },
    // 千里眼开启函数
    openVideoHandle() {
      if (this.openVideo) {
        this.$refs["video"].$emit("showVideo");
      }
    }
  },
  computed: {
    ...mapGetters(['openVideo'])
  },
  created() {
    this.faceCheckOpinionLibrary();
    this.saveInfoWather();
    this.getMultipleLibrary(this.selectArry, this.isDetail).then(_data => {
      this.$store.dispatch('updateSelectOptionHadler', _data);
        let componentList = Object.keys(this.refCom1);
        componentList.forEach(_v => {
        this.$refs[_v].$emit('getSelectOption');
      });
      // console.log(_data);
    }).catch(_error => {
      this.confirmFn(_error.message);
    });
  },
  mounted() {
    this.openVideoHandle();
  },
  components: {
    customVideo,
    popup,
    customerInfo,
    productList,
    productInfo,
    loansRecords,
    viewCreditReport
  }
};
</script>

<style lang="less">
  .check-wrap {
    .check-left {
      width: 76%;
      float: left;
      background-color: #fff;
      .boxShadow(0, 20px);
      .check-tabs {
        position: relative;
        .check-tabs-btn {
          position: absolute;
          top: 0;
          right: 0;
          height: 40px;
          line-height: 40px;
          > span {
            margin-right: 20px;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
    .check-right {
      position: fixed;
      width: 22.8%;
      right: 20px;
      // bottom: 20px;
      .check-video {
        .boxShadow(0, 0);
      }
      .check-note {
        margin-top: 10px;
        .boxShadow(0, 20px);
        .scroll(495px);
        .el-tabs__header.is-top {
          margin: 0;
          .el-tabs__item.is-top {
            padding: 0 5px;
          }
        }
        .el-collapse-item__header {
          height: auto;
          line-height: normal;
          padding: 10px 0;
          .el-collapse-item__arrow {
            line-height: 20px;
          }
        }
        .el-checkbox, .el-checkbox__input {
          white-space: normal;
        }
        .el-checkbox {
          display: flex;
          padding: 5px 0;
        }
        .el-checkbox__input {
          margin-top: 2px;
        }
      }
      .check-note-title {
        .selectorBefore(14px, 3px);
      }
      .check-note-content {
        .el-checkbox__label {
          color: #999;
        }
      }
      .check-note-remark {
        margin-top: 17px;
        .check-note-title {
          .selectorBefore(14px);
        }
        .el-textarea {
          margin-top: 10px;
        }
        p {
          margin: 10px 0;
        }
      }
    }
  }
</style>

<style lang="less">
  .check-wrap .check-left{
    .check-tabs.visa_new > .el-tabs{
      > .el-tabs__content {
        height: 730px;
        overflow: auto;
        .face2face-detail-style {
          padding-right: 5px;
        }
      }
    }
  }
</style>
