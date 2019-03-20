<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="540px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="editSetForm" :model="form" class="add-set" :rules="rules" label-width="92px">
        <el-form-item label="城市：" prop="orgId">
          <el-select v-model="form.orgId" @change="orgChange" class="width-240" placeholder="请选择">
            <el-option
              v-for="(org,index) in orgLists"
              :key="index"
              :label="org.name"
              :value="org.id"
            >{{org.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位类型：" prop="orgId">
          <el-radio
            v-for="item in queryFollowerAndDeclarerCodeByCityOrgMap"
            :key="item.positionType"
            v-model="form.positionType"
            :label="item.positionType"
          >{{item.label}}</el-radio>
          <!-- <el-radio v-model="form.positionType" label="FOLLOWER">跟单员</el-radio>
          <el-radio v-model="form.positionType" label="DECLARER">报单员</el-radio>-->
        </el-form-item>
        <el-form-item label="姓名：" prop="personId">
          <el-select v-model="form.personId" class="width-240" placeholder="请选择">
            <el-option
              v-for="(person,index) in personIds"
              :key="index"
              :label="person.name"
              :value="person.id"
            >{{person.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责部门：" prop="responsibleOrgIds">
          <div class="choose-box">
            <el-input v-model="form.responsibleOrgNames" readonly class="width-210"></el-input>
            <el-input v-model="form.responsibleOrgIds" style="display:none;"></el-input>
            <span class="choose" @click="openTree(true)">选</span>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="form.status" label="ENABLED">启用</el-radio>
          <el-radio v-model="form.status" label="DISABLED">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('editSetForm')">确 定</el-button>
        <el-button @click="hideEditSet('editSetForm')">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      custom-class="add-set-tree"
      title="选择部门"
      :visible.sync="showTree"
      width="540px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tree
        ref="settree"
        :data="suretyTree"
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
        unselectable="on"
        show-checkbox
        :check-strictly="false"
        @check="handleCurrentData"
        :render-content="renderContent"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button @click="openTree(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "add-set",
  props: {
    setInfo: Object,
    editSetShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: "",
      form: {
        id: "",
        orgId: "", // 组织ID
        positionType: "", // 岗位类型
        personId: "", // 跟单员或者报单员的账号id
        responsibleOrgIds: "", // 负责的部门组织ID串，用,隔开
        status: ""
      },
      orgLists: [],
      personIds: [],
      suretyTree: [],
      defaultCheckedKeys: [],
      showTree: false,
      queryFollowerAndDeclarerCodeByCityOrgMap: [
        {
          label: "跟单员",
          positionType: "FOLLOWER" // 跟单员
        },
        {
          label: "报单员",
          positionType: "DECLARER" // 报单员
        }
      ],
      rules: {
        orgId: [{ required: true, message: "请选择", trigger: "blur" }],
        positionType: [{ required: true, message: "请选择", trigger: "blur" }],
        personId: [{ required: true, message: "请选择", trigger: "blur" }],
        responsibleOrgIds: [
          { required: true, message: "请选择", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.editSetShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    setInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          val.status = "ENABLED";
          this.dialogTitle = "新增人员设置";
        } else {
          this.dialogTitle = "修改人员设置";
        }
        this.form = JSON.parse(JSON.stringify(val));
        this.orgChange();
      },
      deep: true
    }
  },
  created() {
    this.queryOrgTreeByPosition();
  },
  methods: {
    validateForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.form.responsibleOrgNames;
          delete this.form.operateType;
          this.$interface.intentionConfigSave(this.form, res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            that.hideEditSet(formName);
          });
        }
      });
    },
    save(formName) {
      this.validateForm(formName);
    },
    hideEditSet(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showEditSet", false);
    },
    handleClose() {
      this.hideEditSet("editSetForm");
    },
    orgChange() {
      var that = this;
      var selectedOrg = this.orgLists.filter(function(item) {
        return item.id === that.form.orgId;
      });
      if (selectedOrg.length === 0) return;
      var longNumber = selectedOrg[0].longNumber;
      this.queryFollowerAndDeclarerCodeByCityOrg(longNumber); // 根据指定城市组织ID查询跟单员和报单员岗位编码
      this.pageQueryPerson(longNumber);
      this.getTreeData(longNumber);
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
          this.orgLists = orgs;
        }
      );
    },
    queryFollowerAndDeclarerCodeByCityOrg(longNumber) {
      this.$interface.queryFollowerAndDeclarerCodeByCityOrg(
        {
          id: longNumber
        },
        res => {
          // this.queryFollowerAndDeclarerCodeByCityOrgMap = res.data.result;
        }
      );
    },
    pageQueryPerson(longNumber) {
      var param = {
        rootLongNumber: longNumber,
        positionCode: this.form.positionType || "",
        suretyStatus: "ENABLED"
      };
      this.$interface.pageQueryPerson(param, res => {
        this.personIds = res.data.result.itemList;
      });
    },
    openTree(v) {
      var that = this;
      this.showTree = v;
      this.defaultCheckedKeys = this.form.responsibleOrgIds.split(",");
    },
    getTreeData(longNumber) {
      this.$interface.queryOrgTree(
        {
          orgTypes: "OPERATION_SECURITY",
          rootLongNumber: longNumber
        },
        res => {
          this.suretyTree = res.data.result;
        }
      );
    },
    confirm() {
      var selectedNodes = this.$refs["settree"].getCheckedNodes(true, false);
      var ids = [];
      var names = [];
      selectedNodes = selectedNodes.forEach(function(item) {
        ids.push(item.id);
        names.push(item.name);
      });
      this.form.responsibleOrgIds = ids.join(",");
      this.form.responsibleOrgNames = names.join(",");
      this.openTree(false);
    },
    handleCurrentData(data) {
      // console.log(data);
    },
    handleNodeClick(data) {
      if (!data.leaf) {
        data.leaf = 1;
      } else if (data.leaf === 1) {
        data.leaf = false;
      } else {
        return;
      }
    },
    renderContent(h, { node, data, store }) {
      let html;
      if (!data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-jia" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf === 1) {
        html = (
          <span>
            <i class="icon iconfont icon-jian" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-fuhao" />
            <span>{node.label}</span>
          </span>
        );
      }
      return <div>{html}</div>;
    }
  }
};
</script>

<style lang="less">
.add-set {
  width: 336px;
  margin: 0 auto;

  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label,
    .el-form-item__content {
      line-height: 32px;
    }
  }

  .choose-box {
    line-height: 40px;

    .choose {
      display: inline-block;
      width: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #eee;
    }
  }
}
.add-set-tree {
  .el-dialog__body {
    height: 400px;
    overflow: auto;
  }
}
</style>
