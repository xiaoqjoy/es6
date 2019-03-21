<template>
  <div class="menu-machine">
    <el-dialog
      custom-class="menu-machine-edit"
      :title="machineTitle"
      :visible.sync="dialogVisible"
      width="780px"
      @close="close"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-button type="success" class="edit-machine-btn" @click="editMachine({}, 'add')">+ 新增功能</el-button>
      <el-table :data="machines" border row-key="id" height="280px" align="left">
        <el-table-column label="功能名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="URL" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="table-operate-btn" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span type="text" @click="editMachine(scope.row, 'edit')">修改</span>
            <span type="text" @click="deleteMachine(scope.row, 'delete')">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close(false)">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      custom-class="edit-machine"
      :title="machineEditTitle"
      :visible.sync="machineEditVisible"
      top="20vh"
      width="540px"
      @close="closeMachineEdit('machineEditForm')"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        class="machine-edit-form"
        ref="machineEditForm"
        :model="form"
        :rules="rules"
        label-width="92px"
      >
        <el-form-item label="功能名称：" prop="name">
          <el-input class="width-240" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="URL：" prop="url">
          <el-input class="width-240" v-model="form.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMachineEdit('machineEditForm')">保 存</el-button>
        <el-button @click="closeMachineEdit('machineEditForm')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "menu-machine",
  props: {
    menuItemMachine: Object,
    menuMachineShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      machineTitle: "",
      machineEditTitle: "",
      machineEditVisible: false,
      menuItem: {},
      form: {
        id: "", //
        name: "", // 名称
        url: "", // 功能标识
        typeId: "", // 所属菜单id
        order: "", // 排序
        menu: "", // 是否显示
        typeName: "", // 所属菜单名称
        typeOrder: "", // 所属菜单排序
        typeTopName: "", // 所属一级菜单名称
        typeTopOrder: "", // 所属一级菜单排序
        typeTopId: "", // 所属一级菜单id
        authType: "" // 是否具有该权限，GET=有，NOT=无
      },
      machines: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入功能名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入RUL",
            trigger: "blur"
          },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: "blur"
          }
        ]
      },
      keywork: {
        add: "add",
        edit: "edit",
        delete: "delete"
      },
      page: {
        pageSize: 20,
        currentPage: 1
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.menuMachineShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    menuItemMachine: {
      handler: function(val, oldVal) {
        this.menuItem = val;
        this.machineTitle = "功能设置-" + val.name;
        if (val.id) {
          this.pageQueryAuthLeaf(
            Object.assign(this.page, {
              typeId: val.id
            })
          );
        } else {
          this.machines = [];
        }
      },
      deep: true
    }
  },
  methods: {
    pageQueryAuthLeaf(param) {
      this.$interface.pageQueryAuthLeaf(param, res => {
        this.machines = res.data.result.itemList;
      });
    },
    close() {
      this.$emit("hideMenuMachine", false);
    },
    editMachine(machine, keywork) {
      this.machineEditVisible = true;
      this.form = JSON.parse(JSON.stringify(machine));
      if (keywork === this.keywork.add) {
        this.machineEditTitle = "新增功能-" + this.menuItemMachine.name;
      } else {
        this.machineEditTitle = "编辑功能-" + this.menuItemMachine.name;
      }
    },
    validateForm(formName) {
      var b = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          b = true;
        } else {
          b = false;
        }
      });
      return b;
    },
    saveMachineEdit(formName) {
      if (this.validateForm(formName)) {
        this.form.typeId = this.menuItem.id;
        this.form.order = this.machines.length + 1;
        this.$interface.saveAuthLeaf(this.form, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.pageQueryAuthLeaf(
            Object.assign(this.page, {
              typeId: this.menuItem.id
            })
          );
          this.closeMachineEdit(formName);
        });
      }
    },
    deleteMachine(row) {
      this.$confirm("此操作将永久删除该功能, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.deleteAuthLeaf(
          {
            id: row.id
          },
          res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.pageQueryAuthLeaf(
              Object.assign(this.page, {
                typeId: this.menuItem.id
              })
            );
          }
        );
      });
    },
    closeMachineEdit(formName) {
      this.$refs[formName].resetFields();
      this.machineEditVisible = false;
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
</style>
