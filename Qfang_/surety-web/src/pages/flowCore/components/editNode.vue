<template>
  <el-dialog
    custom-class="edit-node"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="410px"
    @close="close"
  >
    <el-form class="form" ref="ruleForm" label-width="86px">
      <el-form-item label="节点名称:" prop="name">
        <el-input class="w-240"></el-input>
      </el-form-item>
      <el-form-item label="预警设置:">
        <span class="w-240" @click="warningSet">设置</span>
      </el-form-item>
      <el-form-item label="备注描述:">
        <el-input class="w-240" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="close(false)">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: '新增'
    }
  },
  props: {
    editNodeShow: {
      type: Boolean,
      default: false
    },
    warningSetShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.editNodeShow
      },
      set: function () { }
    }
  },
  methods: {
    close() {
      this.$emit('hideEditNode', false)
    },
    warningSet() {
      console.log(132)
      this.$emit('showWarningSet', true)
    }
  }
}
</script>

<style scoped lang="less">
.w-240 {
  width: 240px;
}
span {
  color: blue;
  cursor: pointer;
}
</style>


