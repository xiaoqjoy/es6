<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
          <!-- 合作方编号 -->
        <el-input class="select_72" v-model="applicationId" placeholder="申请编号" clearable></el-input>
        <el-input class="select_72" v-model="certificateNum" placeholder="身份证号码" clearable></el-input>
        <el-input class="select_72" v-model="custName" placeholder="客户姓名" clearable></el-input>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 个人征信报告查询 -->
      <popup :isShowDialog="isShowCredit"  :isReport="true" :url="creditReport" :applicationId="applicationId" menuDesc="征信报告查询" :iframe="true" :center="true" :width="800" :height="700" @closeDialog="closeCredit"></popup>
      <!-- 分页 -->
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    <!-- 再次确认组件 -->
    <reconfirmHint v-if="reconfirmFlag" massage="是否确认删除该条数据？" @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import popup from "@components/popup/index"; // 拖动弹框组件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import { Loading } from 'element-ui';
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  name: 'channel-alter',
  data() {
    return {
      creditReport: "", // 征信报告url
      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      reconfirmFlag: false, // 再次确认组件开关
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      applicationId: '', // 申请编号
      certificateNum: "", // 身份证
      custName: "" // 客户姓名
    };
  },
  mounted() {
  },
  methods: {
    // 查询征信报告
    getCreditReport(res, current) {
      return new Promise((resolve, reject) => {
        let loading = Loading.service({
            text: "",
            spinner: "",
            background: "transparent"
          });
          res = res || {};
          this.$MyFetch.post(counterDealApi.getCreditReport, res)
          .then((data = {}) => {
            this.creditReport = data;
            loading.close();
            resolve(data);
          })
          .catch((err) => {
              loading.close();
              reject(err);
          });
      });
    },
    // 关闭再次确认组件
    reconfirmClose() {
      this.reconfirmFlag = false;
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭文字提示组件alterHintClose
    alterHintClose() {
      this.alterHintFlag = false;
    },
    // 再次确认组件点击确定执行函数
    reconfirmBackFun() {
      console.log('点击确定了');
      this.reconfirmFlag = false;
    },
    // 关闭征信报告
    closeCredit() {
      this.isShowCredit = false;
    },
    // 查询按钮
    refer() {
      if (!this.isRefer()) {
        this.$message("身份证、客户姓名不能为空！");
      } else {
          let queryData = {
            applicationId: this.applicationId.trim(), // 申请编号
            certificateNum: this.certificateNum.trim(), // 身份证
            custName: this.custName.trim(), // 客户姓名
            pageName: 'report'
          };
        this.getCreditReport(queryData)
        .then((data) => {
            console.log(data);
            this.isShowCredit = true;
        })
        .catch((err) => {
            this.$error(err.message);
        });
      };
    },
    isRefer() {
      // if (this.applicationId === "") {
      //   return false;
      // } else
      if (this.certificateNum === "") {
        return false;
      } else if (this.custName === "") {
        return false;
      } else {
        return true;
      }
    },
    // 清空按钮
    empty() {
      this.applicationId = '';
      this.certificateNum = '';
      this.custName = '';
    }
  },
  components: {
    popup,
    fontHint, // 文字提示组件
    reconfirmHint // 再次确认组件
  }
};
</script>

<style lang="less" scoped>
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>
