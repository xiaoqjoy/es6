<template>
  <el-dialog
    custom-class="warning-set"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="660px"
    :before-close="beforeClose"
  >
    <el-form class="form" ref="ruleForm" label-width="86px">
      <el-row>
          <el-form-item label="规定时限:" prop="type">
            <el-input class="w-200"></el-input>小时
          </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="提前:" prop="name">
          <el-input class="w-200"></el-input>小时发提醒
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="1级预警:">
            <el-input class="w-120"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="1" class="m-6">至</el-col>
        <el-col :span="8" class="m-6">
          <el-input class="w-120"></el-input>小时
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="2级预警:">
            <el-input class="w-120"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" class="m-6">至</el-col>
        <el-col :span="8" class="m-6">
          <el-input class="w-120" ></el-input>小时
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="3级预警:">
            <el-input class="w-120"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" class="m-6">至</el-col>
        <el-col :span="8" class="m-6">
          <el-input class="w-120"></el-input>小时
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary">保 存</el-button>
        <el-button @click="showForm('ruleForm')">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    warningSetShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: '预警设置'
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.warningSetShow
      },
      set: function () { }
    },
  },
  methods: {
    beforeClose() {
      this.showForm("ruleForm")
    },
    showForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showForm", false);
    }
  }
}
</script>

<style scoped lang="less">
.w-200 {
  width: 200px;
}
.w-120 {
  width: 120px;
}
.m-6 {
  margin-top: 6px;
}
</style>


