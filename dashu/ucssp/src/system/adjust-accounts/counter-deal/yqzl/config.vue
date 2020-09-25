<style lang="less" scoped>
.config {
  background: #fff;
  height: 100%;
  padding-top: 30px;
  .content {
    width: 900px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  label {
    display: block;
    line-height: 40px;
    text-align: right;
  }
  .el-button {
    margin-left: 20px;
    background: #538bf1;
    color: #ffffff;
  }
}
</style>

<template>
  <div class="config">
    <div class="content">
      <el-row>
        <el-col :span="8">
          <label>最低备用子账户数：</label>
        </el-col>
        <el-col :span="8">
          <el-input min="0" v-model="minCnt" placeholder="请填入大于等于0的正整数"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="minCntConfrim">确认</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <label>自动申请备用子账户上限：</label>
        </el-col>
        <el-col :span="8">
          <el-input min="10000" v-model="maxCnt" placeholder="请填入大于等于1万的正整数"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="maxCntConfirm">确认</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server";
export default {
  name: 'yqzlConfig',
  data() {
    return {
      minCnt: "",
      maxCnt: ""
    };
  },
  methods: {
    minCntConfrim() {
      if (!this.minCnt || this.minCnt < 0 || isNaN(this.minCnt) || !/^\d+$/.test(this.minCnt)) {
        this.$message.error("请填入大于等于0的正整数");
        return;
      }
      this.$confirm("是否修改？将于今日晚间批量生效。", '提示', {
      }).then(() => {
        this.configSubAccount(this.minCnt, null);
      }).catch(() => {
        this.configSubAccount();
      });
    },
    maxCntConfirm() {
      if (!this.maxCnt || this.maxCnt < 10000 || isNaN(this.maxCnt)) {
        this.$message.error("请填入大于等于10000的数值");
        return;
      }
      this.$confirm("是否修改？将于今日晚间批量生效。", '提示', {
      }).then(() => {
        this.configSubAccount(null, this.maxCnt);
      }).catch(() => {
        this.configSubAccount();
      });
    },
    configSubAccount(minCnt, maxCnt) {
      this.$MyFetch.post(counterDealApi.configSubAccount, {
        minCnt,
        maxCnt
      }).then((data) => {
        this.minCnt = data.minCnt;
        this.maxCnt = data.maxCnt;
        if (minCnt || maxCnt) {
          this.$message.success("保存成功");
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    }
  },
  mounted() {
    this.configSubAccount();
  }
};
</script>
