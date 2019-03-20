<template>
  <el-dialog
    custom-class="add-node"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="410px"
    @close="close"
  >
    <el-form class="form" ref="ruleForm" :rules="rules" label-width="86px">
      <el-form-item label="节点类型:" prop="type">
        <el-select v-model="ruleForm.aaa" class="w-240" placeholder="选择类型">
          <el-option
            v-for="item in nodeTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节点名称:" prop="name">
        <el-input class="w-240"></el-input>
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
  props: {
    addNodeShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      aaa: '',
      dialogTitle: '新增',
      ruleForm: {
        name: '',
        type: '',
        aaa: ''
      },
      nodeTypes: [
        {
          label: "选择类型",
          value: "1"
        },
        {
          label: "主业务节点",
          value: "2"
        },
        {
          label: "审批流程节点",
          value: "3"
        }
      ],
      rules: {
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写名称', trigger: 'change' }
        ]
      },
      dataForm: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close() {
      this.$emit("hideAddNode", false)
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.addNodeShow
      },
      set: function () { }
    },
  }
}
</script>

<style scoped lang="less">
.w-240 {
  width: 240px;
}
.add-menu .form {
  width: 328px;
  margin: 0 auto;
}
</style>


