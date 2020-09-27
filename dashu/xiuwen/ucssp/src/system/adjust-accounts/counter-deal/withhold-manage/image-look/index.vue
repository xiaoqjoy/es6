<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
          <!-- 合作方编号 -->
        <el-input class="select_72" v-model="loanNo" placeholder="申请编号" clearable></el-input>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
export default {
  name: 'channel-alter',
  data() {
    return {
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "" // 客户姓名
    };
  },
  mounted() {
  },
  methods: {
    // 权限接口
    imagePermission(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.get(counterDealApi.imagePermission, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭文字提示组件alterHintClose
    alterHintClose() {
      this.alterHintFlag = false;
    },
    // 查询按钮
    refer() {
      let _this = this;
      if (this.loanNo !== '') {
        this.imagePermission({
            "applicationId": this.loanNo
          })
        .then((data) => {
          _this.$showImage(_this.loanNo, '扣款管理', {ReadOnly: '0'});
        })
        .catch((err) => {
          this.$error(err);
        });
      } else {
        this.$message("请输入申请编号");
      }
    },
    // 清空按钮
    empty() {
      this.loanNo = '';
    }
  },
  components: {
    fontHint // 文字提示组件
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
