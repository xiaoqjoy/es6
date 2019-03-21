<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      custom-class="add-flow"
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="flow-query">
        <el-input v-model="queryForm.searchName" placeholder="流程名称" class="width-120"></el-input>
        <el-select v-model="queryForm.orgId" placeholder="城市" class="width-120">
          <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="queryForm.searchName" placeholder="状态" class="width-120">
          <el-option
            v-for="item in groupes"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-radio v-model="queryForm.status" label="ENABLED">启用</el-radio>
        <el-radio v-model="queryForm.status" label="DISABLED">禁用</el-radio>
      </div>
      <div class="flow-node">
        <div class="nodes">
          <el-input class="node-name" v-model="nodeName" placeholder="请输入节点名称">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div
            class="node-control"
            :class="{'is-active': nodes.active}"
            v-for="(nodes,index) in nodeControls"
            :key="index"
            @click="nodeControl(nodes)"
          >
            <i class="icon iconfont icon-gouxuan-yuan"></i>
            <p>{{nodes.nodeName}}</p>
            <span
              class="edit"
              @click.stop="editNodesShow(Object.assign(nodes,{operateType:'edit'}))"
            >修改</span>
          </div>
          <el-button
            class="new-node"
            type="success"
            @click.stop="editNodesShow({operateType:'add'})"
          >+ 新建节点</el-button>
        </div>
        <div class="node-line-box">
          <div class="node-line" id="node-line">
            <div class="node" v-for="(node, index) in nodes" :key="index">
              <div
                class="node-detail"
                :class="{'start-end':node.nodeName=='开始'||node.nodeName=='结束'}"
              >
                <span class="node-sort" v-if="node.nodeName!='开始'&&node.nodeName!='结束'">
                  <i class="icon iconfont icon-caidan-shouqi"></i>
                </span>
                <div
                  class="node-lable"
                  @mouseenter="node.closeIcon = true"
                  @mouseleave="node.closeIcon = false"
                >
                  <span>{{node.nodeName}}</span>
                  <span
                    class="set"
                    v-if="node.nodeName!='开始'&&node.nodeName!='结束'"
                    @click="setNodeShow(node)"
                  >设置</span>
                  <div
                    class="node-close"
                    :class="{'is-show':node.closeIcon}"
                    @click="deleteNode(node)"
                  >
                    <i class="icon iconfont icon-guanbi"></i>
                  </div>
                </div>
              </div>
              <img
                v-if="node.nodeName!='结束'"
                src="../../../../static/img/flowCore/bottom-arrow.png"
                alt
              >
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保 存</el-button>
        <el-button @click="close()">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="editNodeFormTitle"
      custom-class="edit-flow-node"
      :visible.sync="editNodeShow"
      width="468px"
      @close="editNodesShow({})"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        class="basic-set-form"
        ref="basicSetForm"
        :model="editNodeForm"
        :rules="rules"
        label-width="96px"
      >
        <el-form-item label="节点名称：" prop="nodeName">
          <el-input class="width-310" v-model="editNodeForm.nodeName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subNodeTemplate()">保 存</el-button>
        <el-button @click="editNodesShow({})">取 消</el-button>
      </span>
    </el-dialog>
    <node-set :showSetNode="showSetNode" :nodeInfo="nodeInfo" @hideSetNode="hideSetNode"></node-set>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import nodeSet from "./nodeSet";
export default {
  props: {
    flowInfo: Object
  },
  data() {
    return {
      dialogVisible: true,
      dialogTitle: "新建流程",
      queryForm: {
        status: "ENABLED"
      },
      orgs: [],
      groupes: [
        {
          value: "主流程"
        },
        {
          value: "子流程"
        }
      ],
      nodeName: "",
      flowDetail: {},
      nodeControls: [],
      nodes: [],
      nodesBack: [],
      editNodeShow: false,
      editNodeFormTitle: "修改节点",
      editNodeForm: {
        nodeName: ""
      },
      rules: {
        nodeName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      showSetNode: false,
      nodeInfo: null
    };
  },
  components: {
    nodeSet
  },
  watch: {
    flowInfo: {
      handler: function(val, oldVal) {
        this.flowDetail = JSON.parse(JSON.stringify(val));
        if (val.operateType == "add") {
          this.dialogTitle = "新建流程";
        } else {
          this.dialogTitle = "修改流程";
          this.pickProcessDefinitionByBizCod();
        }
      },
      deep: true
    }
  },
  created() {
    this.pickFlowCenterNodeByName();
    this.queryOrgTreeByPosition();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    reset() {
      console.log(document.querySelector("#node-line"));
    },
    pickFlowCenterNodeByName(nodeName) {
      // 获取节点
      var queryForm = {
        orgId: "57e64f26-a6a6-4f87-8c03-67e1305d24ff",
        nodeName: nodeName
      };
      function addAttr(arr = []) {
        arr.forEach(function(item) {
          item.closeIcon = false;
        });
        return arr;
      }
      if (nodeName) {
        this.$interface.pickFlowCenterNodeByName(queryForm, res => {
          this.nodeControls = addAttr(res.data.result);
        });
      } else {
        this.$interface.pickFlowCenterAllNode(queryForm, res => {
          this.nodeControls = addAttr(res.data.result);
        });
      }
    },
    pickProcessDefinitionByBizCod() {
      this.$interface.pickProcessDefinitionByBizCod({}, res => {
        this.nodes = res.data.result;
      });
    },
    editNodesShow(row) {
      if (row.operateType) {
        if (row.operateType == "add") {
          this.editNodeFormTitle = "新建节点";
        } else {
          this.editNodeFormTitle = "修改节点";
        }
        this.editNodeForm = row;
        this.editNodeShow = true;
      } else {
        this.editNodeShow = false;
      }
    },
    handleClick(tab, event) {
      console.log(10, this.activeName);
      console.log(123, tab, event);
    },
    handleNodeSet(tab, event) {
      console.log(10, this.activeName);
      console.log(123, tab, event);
    },
    save() {
      this.$interface.processDefinition({}, res => {});
    },
    subNodeTemplate() {
      // 新建节点
      var param = {
        id: this.editNodeForm.id ? this.editNodeForm.id : "",
        nodeName: this.editNodeForm.nodeName
      };
      this.$interface.subNodeTemplate({}, res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.pickFlowCenterNodeByName();
      });
    },
    close(formName) {
      this.$emit("hideAddFlow", false);
    },
    beforeClose() {
      this.close();
    },
    nodeControl(node) {
      var that = this;
      node.active = !node.active;
      var suretyNode = node;
      function findNode(nodes, node) {
        return nodes.indexOf(node);
      }
      if (this.nodes.length == 0) {
        var data = [
          {
            id: -1,
            nodeName: "开始"
          },
          {
            id: -2,
            nodeName: "结束"
          }
        ];
        data.splice(1, 0, node);
        this.nodes = this.nodes.concat(data);
      } else {
        var index = findNode(that.nodes, node);
        if (index != -1) {
          that.nodes.splice(index, 1);
        } else {
          that.nodes.splice(that.nodes.length - 1, 0, node);
        }
        that.nodesBack = JSON.parse(JSON.stringify(that.nodes));
      }
    },
    deleteNode(node) {
      var that = this;
      that.nodes.forEach(function(item, index) {
        if (item.id === node.id) {
          that.nodes.splice(index, 1);
        }
      });
    },
    queryOrgTreeByPosition() {
      this.$interface.queryOrgTreeByPosition(
        {
          positionLinkId: this.$store.state.userInfo.positionLinkId,
          orgTypes: "CITY"
        },
        res => {
          var org = res.data.result;
          var orgs = org.concat(org[0].children);
          orgs.forEach(function(item) {
            item.children = [];
          });
          this.orgs = orgs;
        }
      );
    },
    setNodeShow(row) {
      this.showSetNode = true;
      this.nodeInfo = row;
    },
    hideSetNode() {
      this.showSetNode = false;
    },
    rowDrop() {
      const that = this;
      this.$nextTick(function() {
        const node = document.querySelector("#node-line");
        Sortable.create(node, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = that.nodesBack.splice(oldIndex, 1)[0];
            that.nodesBack.splice(newIndex, 0, currRow);
          },
          onStart(evt) {
            that.nodes.forEach(function(item, index) {
              if (index == evt.oldIndex) {
                item.closeIcon = false;
              }
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="less">
.flow-node {
  position: relative;
  height: 400px;
  border: 1px solid #e5e5e5;
}
// .flow-node::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: transparent;
// }
.flow-query {
  margin-bottom: 10px;
}
.nodes {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #e5e5e5;
  width: 220px;
  padding: 8px;
  border-right: 1px solid #e5e5e5;
  .node-name {
    padding: 0 2px;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 10px;
  }
  .node-control {
    width: 200px;
    height: 30px;
    line-height: 30px;
    color: #333333;
    border-radius: 2px;
    border: 1px dashed #e5e5e5;
    margin-bottom: 16px;
    background-color: #fff;
    margin: 0 auto 10px auto;
    padding-left: 8px;
    cursor: pointer;
    .icon {
      color: #dddddd;
      float: left;
    }
    .edit {
      float: right;
      padding: 0 8px;
      color: #333333;
    }
    > p {
      display: inline-block;
      width: calc(100% - 66px);
      padding-left: 8px;
    }
  }
  .node-control.is-active {
    color: #0958a5;
    border-color: #0958a5;
    .icon {
      color: #0958a5;
    }
    .edit {
      color: #0958a5;
    }
  }
  .new-node {
    position: absolute;
    bottom: 8px;
    left: 8px;
    width: calc(100% - 16px);
  }
}
.node-line-box {
  position: relative;
  padding: 20px 0 20px 220px;
  width: 100%;
  height: 100%;
  overflow: auto;
  .node-line {
    display: flex;
    flex-direction: column;
  }
}
.node {
  flex: 1;
  display: inline-block;
  text-align: center;
  .node-detail {
    position: relative;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background-color: #e6f3ff;
    border: 1px solid #80b4e6;
    border-radius: 3px;
    padding-left: 13px;
    z-index: 10;
    .node-sort {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 13px;
      background-color: #ffffff;
      color: #999999;
      border-right: 1px solid #80b4e6;
      border-radius: 3px 0 0 3px;
      cursor: n-resize;
      > .icon {
        font-size: 12px;
        transform: scale(0.6);
      }
    }
    .node-lable {
      padding: 0 20px 0 40px;
      .set {
        color: #0958a5;
        margin-left: 8px;
        cursor: pointer;
      }
    }
  }
  .start-end {
    background-color: #fff;
    border: 1px solid #999999;
    z-index: 0;
    .node-lable {
      padding: 0;
      text-align: center;
      span {
        padding: 0 26px;
      }
    }
  }
  img {
    display: block;
    margin: 0 auto;
  }
}
.node-close {
  display: none;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  border: 1px solid #80b4e6;
  background-color: #e6f3ff;
  border-radius: 50%;
  .icon {
    font-size: 10px;
    color: #80b4e6;
  }
}
.node-close.is-show {
  display: block;
}
.power {
  position: relative;
  height: 480px;
  padding: 0 0 0 100px;
}
.power-lable {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
}
.power-box {
  height: 380px;
  width: 100%;
  overflow: auto;
  border: 1px solid #e5e5e5;
}
.basic-set-form {
  .el-select {
    font-size: 0;
    margin-right: 10px;
  }
}
</style>
