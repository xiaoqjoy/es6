<template>
  <div class="menu-machine">
    <el-dialog
      custom-class="menu-machine-edit"
      :title="branchTitle"
      :visible.sync="dialogVisible"
      width="980px"
      @close="close"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <el-input class="width-160" v-model="queryForm.searchName"></el-input>
        <el-select v-model="queryForm.status" placeholder="状态" class="width-80">
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="queryForm.orgId" placeholder="城市" class="width-160">
          <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" class="edit-machine-btn" @click="queryAllChildByParent">查询</el-button>
        <el-button
          type="success"
          class="edit-machine-btn"
          @click="editBranch({operateType:'add'})"
        >+ 新增分行</el-button>
      </div>
      <el-table
        :data="branchs"
        border
        row-key="id"
        height="280px"
        :highlight-current-row="true"
        align="left"
      >
        <el-table-column label="支行名称" width="280">
          <template slot-scope="scope">
            <span v-html="showLevel(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template slot-scope="scope">
            <span>{{scope.row.contactPersonName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contactPhone" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="isCooperationDesc" align="center" label="合作银行" width="70"></el-table-column>
        <el-table-column label="状态" align="center" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.statusDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="table-operate-btn" label="操作" align="center" width="260">
          <template slot-scope="scope">
            <span type="text" @click="editBranch(Object.assign(scope.row, {operateType:'edit'}))">修改</span>
            <span
              type="text"
              @click="fundProviderStatusChange(Object.assign(scope.row, {operateStatus:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
            >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</span>
            <span
              type="text"
              @click="editBranch(Object.assign(scope.row, {operateType:'addChild'}))"
            >新建分支</span>
            <span type="text" @click="fundProviderDeleteById(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close(false)">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      custom-class="edit-machine"
      :title="branchEditTitle"
      :visible.sync="branchEditVisible"
      width="540px"
      @close="closeBranchEdit('branchEditForm')"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        class="machine-edit-form"
        ref="branchEditForm"
        :model="form"
        :rules="rules"
        label-width="108px"
      >
        <el-form-item label="上级：">
          <el-input class="width-240 readonly" readonly v-model="form.parentName"></el-input>
        </el-form-item>
        <el-form-item label="城市：" v-if="form.operateType==='add'">
          <el-select v-model="form.orgId" placeholder="城市" class="width-240">
            <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input class="width-240" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contactPersonName">
          <el-input class="width-240" v-model="form.contactPersonName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="contactPhone">
          <el-input class="width-240" v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input class="width-240" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="合作银行：" prop="isCooperation">
          <el-radio v-model="form.isCooperation" label="YES">是</el-radio>
          <el-radio v-model="form.isCooperation" label="NO">否</el-radio>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio v-model="form.status" label="ENABLED">启用</el-radio>
          <el-radio v-model="form.status" label="DISABLED">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('branchEditForm')">保 存</el-button>
        <el-button @click="closeBranchEdit('branchEditForm')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "menu-machine",
  props: {
    bankInfo: Object,
    branchShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryForm: {
        searchName: "",
        status: "",
        orgId: ""
      },
      branchTitle: "",
      branchEditTitle: "",
      branchEditVisible: false,
      branch: {},
      states: [
        {
          label: "启用",
          value: "ENABLED"
        },
        {
          label: "禁用",
          value: "，DISABLED"
        }
      ],
      form: {},
      branchs: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        contactPersonName: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        isCooperation: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ]
      },
      operateType: {
        add: "add",
        addChild: "addChild",
        edit: "edit",
        delete: "delete"
      },
      citys: []
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.branchShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    bankInfo: {
      handler: function(val, oldVal) {
        this.branch = val;
        this.branchTitle = "功能设置-" + this.branch.name;
        this.queryAllChildByParent(this.branch);
      },
      deep: true
    }
  },
  created() {
    this.queryOrgTreeByPosition();
  },
  methods: {
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
          this.citys = orgs;
        }
      );
    },
    queryAllChildByParent() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.fundProviderType = "BRANCH";
      queryForm.parentId = this.branch.id;
      this.$interface.queryAllChildByParent(queryForm, res => {
        this.branchs = this.initBranch(res.data.result);
      });
    },
    initBranch(branchs) {
      var that = this;
      var tree = [];
      var temp = null;
      var treeBranch = this.getTree(branchs);
      function tool(arr) {
        arr.forEach(function(item) {
          temp = temp.concat([item]);
          parseBracchTree([item]);
        });
      }
      function parseBracchTree(treeBranch) {
        treeBranch.forEach(function(b) {
          if (b.children) {
            tool(b.children);
          }
        });
      }
      treeBranch.forEach(function(b) {
        temp = [];
        temp.push(b);
        parseBracchTree([b]);
        tree = tree.concat(temp);
      });
      return tree;
    },
    getTree(data) {
      var that = this;
      var topIds = this.getTop(data);
      var tree = [];
      var level = 0;
      topIds.forEach(function(parentId) {
        tree = tree.concat(that.arrToTree(data, parentId, level));
      });
      return tree;
    },
    getTop(arr) {
      var ids = [];
      var topIds = [];
      arr.forEach(function(b) {
        ids.push(b.id);
      });
      arr.forEach(function(b) {
        if (ids.indexOf(b.parentId) === -1) {
          topIds.push(b.parentId);
        }
      });
      return Array.from(new Set(topIds));
    },
    getArrToTree(arr, parentId, level) {
      var that = this;
      var result = [];
      var temp = null;
      level += 1;
      arr.forEach(function(b) {
        if (b.parentId === parentId) {
          var obj = JSON.parse(JSON.stringify(b));
          obj.level = level;
          temp = that.arrToTree(arr, b.id, level);
          if (temp.length > 0) {
            result = result.concat(temp);
          }
          result.push(obj);
        }
      });
      return result;
    },
    arrToTree(arr, parentId, level) {
      var that = this;
      var result = [];
      var temp = null;
      level += 1;
      arr.forEach(function(b) {
        if (b.parentId === parentId) {
          var obj = JSON.parse(JSON.stringify(b));
          obj.level = level;
          temp = that.arrToTree(arr, b.id, level);
          if (temp.length > 0) {
            obj.children = temp;
          }
          result.push(obj);
        }
      });
      return result;
    },
    showLevel(row) {
      var space = "";
      var str = "";
      var ls = "";
      for (var i = 1; i <= row.level; i++) {
        space += "&nbsp;&nbsp;";
        str += "--";
        ls = space + "L" + str;
      }
      return ls + row.name;
    },
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fundProviderSave(formName);
        }
      });
    },
    save(formName) {
      this.validateForm(formName);
    },
    fundProviderSave(formName) {
      this.form.fundProviderType = "BRANCH";
      this.$interface.fundProviderSave(this.form, res => {
        this.queryAllChildByParent();
        this.closeBranchEdit(formName);
      });
    },
    fundProviderStatusChange(row) {
      this.$interface.fundProviderStatusChange(
        { id: row.id, status: row.operateStatus },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.queryAllChildByParent();
        }
      );
    },
    fundProviderDeleteById(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.fundProviderDeleteById({ id: row.id }, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.queryAllChildByParent();
        });
      });
    },
    editBranch(row) {
      var that = this;
      row = JSON.parse(JSON.stringify(row));
      this.form = {};
      this.branchEditVisible = true;
      if (row.operateType === this.operateType.edit) {
        this.form = row;
        var parent = this.branchs.filter(function(item) {
          return item.parentId === that.form.parentId;
        });
        this.form.parentName = parent[0].name;
        if (row.level === 1) {
          this.branchEditTitle = "编辑分行";
        } else {
          this.branchEditTitle = "编辑分支";
        }
      } else if (row.operateType === this.operateType.add) {
        this.form.operateType = this.operateType.add;
        this.form.parentName = this.branch.name;
        this.form.parentId = this.branch.id;
        this.branchEditTitle = "新增分行";
      } else if (row.operateType === this.operateType.addChild) {
        this.form.parentName = row.name;
        this.form.parentId = row.id;
        this.branchEditTitle = "新增分支";
      }
    },
    closeBranchEdit(formName) {
      this.$refs[formName].resetFields();
      this.branchEditVisible = false;
    },
    close() {
      this.$emit("hideBranch", false);
    }
  }
};
</script>

<style lang="less">
.machine-edit-form {
  width: 332px;
  margin: 0 auto;
}

.menu-machine-edit .el-dialog__body {
  height: 380px;
  padding: 20px 20px;
}

.menu-machine-edit .edit-machine-btn {
  margin-bottom: 20px;
}

.edit-machine .el-form-item {
  margin-bottom: 12px;
}
.readonly {
  .el-input__inner {
    border: none;
  }
}
</style>
