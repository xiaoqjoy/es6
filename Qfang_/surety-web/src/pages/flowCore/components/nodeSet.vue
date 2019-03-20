<template>
  <div>
    <el-dialog
      title="节点设置"
      custom-class="set-flow-node"
      :visible.sync="dialogVisible"
      width="468px"
      :before-close="close"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tabs v-model="activeTab" @tab-click="handleNodeSet">
        <el-tab-pane label="基本设置" name="first">
          <el-form
            class="set-form"
            ref="nodeForm"
            :model="nodeForm"
            :rules="rules"
            label-width="96px"
          >
            <el-form-item label="节点名称：">
              <el-input class="width-310" readonly v-model="nodeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="审批对象：">
              <el-select class="width-120" v-model="nodeForm.parentId" placeholder="请选择">
                <el-option label="按岗位" value="1"></el-option>
                <el-option label="按人员" value="2"></el-option>
              </el-select>
              <el-input v-model="nodeForm.bb" style="display:none;"></el-input>
              <el-input v-model="nodeForm.aa" class="width-150"></el-input>
              <span class="choose" @click="guardPerson">选</span>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input
                class="width-310"
                type="textarea"
                :rows="3"
                resize="none"
                placeholder="请输入内容"
                v-model="nodeForm.remark"
              ></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button class="rf" type="primary" @click="save()">保 存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="条件设置" name="second">
          <el-form
            class="set-form"
            ref="nodeForm"
            :model="nodeForm"
            :rules="rules"
            label-width="96px"
          >
            <el-form-item label="条件：">
              <el-select class="width-240" v-model="nodeForm.parentId" placeholder="请选择">
                <el-option label="出账金额" value="1"></el-option>
                <el-option label="担保借款金额" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="金额：" prop="url">
              <el-input class="width-240" v-model="nodeForm.url"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="通知设置" name="third">
          <el-form
            class="set-form"
            ref="nodeForm"
            :model="nodeForm"
            :rules="rules"
            label-width="96px"
          >
            <el-form-item label="完成后通知：">
              <el-select class="width-240" v-model="nodeForm.parentId" placeholder="请选择">
                <el-option label="无需通知" value="1"></el-option>
                <el-option label="流程发起人" value="2"></el-option>
                <el-option label="已审批过的人" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
      </span>
    </el-dialog>
    <surety-tree v-if="showSuretyTree" @guardPersonHide="guardPersonHide"></surety-tree>
  </div>
</template>

<script>
import suretyTree from "./SuretyTree";
export default {
  props: {
    showSetNode: Boolean,
    setNodeInfo: Object
  },
  data() {
    return {
      activeTab: "first",
      nodeForm: {
        name: ""
      },
      showSuretyTree: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 8,
            message: "长度在 1 到 8 个字符",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入RUL地址",
            trigger: "blur"
          },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    suretyTree
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.showSetNode;
      },
      set: function(v) {}
    }
  },
  watch: {
    flowInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          this.dialogTitle = "新建流程";
        } else {
          this.dialogTitle = "修改流程";
        }
        this.flowDetail = JSON.parse(JSON.stringify(val));
      },
      deep: true
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(10, this.activeName);
      console.log(123, tab, event);
    },
    handleNodeSet(tab, event) {
      console.log(10, this.activeName);
      console.log(123, tab, event);
    },
    close() {
      this.$emit("hideSetNode", false);
    },
    guardPerson() {
      this.showSuretyTree = true;
    },
    guardPersonHide(b) {
      this.showSuretyTree = b;
    }
  }
};
</script>
<style scope lang="less">
.set-flow-node {
  .el-dialog__body {
    padding: 15px;
  }
  .el-tabs {
    .el-tabs__header {
      margin-bottom: 12px;
    }
    .el-tabs__content {
      height: 480px;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      border-bottom: none;
      box-sizing: border-box;
    }
    .el-tabs__item.is-active {
      background-color: #0958a5;
      color: #ffffff !important;
    }
    .el-tabs__item:hover {
      color: #0958a5;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-wrap::after {
      background-color: #0958a5;
    }
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
}
.set-form {
  .choose {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #eee;
  }
}
</style>

