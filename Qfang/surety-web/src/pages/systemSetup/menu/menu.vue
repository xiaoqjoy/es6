<template>
  <div class="menu">
    <div class="query-form">
      <el-button type="primary" @click="editMenu({rowkey:'add'})">+ 新建菜单</el-button>
    </div>
    <div class="free-table" id="free-table">
      <div class="menu-item-row bt bb menu-title">
        <span class="name">
          <i class="bl w-4"></i>菜单名称
        </span>
        <span class="sort">
          <i class="bl mg-1"></i>顺序
        </span>
        <span class="operation">
          <i class="bl mg-1"></i>操作
          <i class="br"></i>
        </span>
      </div>
      <div class="table-box">
        <menu-item
          v-for="menuItem in menus"
          :menuItem="menuItem"
          :key="menuItem.id"
          @editMenu="editMenu"
          @showMenuMachine="showMenuMachine"
        ></menu-item>
      </div>
    </div>
    <add-menu :addMenuShow="addMenuShow" :menuDetail="menuDetail" @showAddMenu="showAddMenu"></add-menu>
    <menu-machine
      :menuMachineShow="menuMachineShow"
      :menuItemMachine="menuItemMachine"
      @hideMenuMachine="showMenuMachine"
    ></menu-machine>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import menuItem from "./components/menuItem";
import addMenu from "./components/addMenu";
import menuMachine from "./components/menuMachine";
export default {
  name: "surety-menu",
  components: {
    menuItem,
    addMenu,
    menuMachine
  },
  data() {
    return {
      dialogVisible: false,
      menuDetail: {},
      menuItemMachine: {},
      addMenuShow: false,
      menuMachineShow: false,
      menus: [],
      keywork: {
        add: "add",
        edit: "edit",
        delete: "delete"
      }
    };
  },
  created() {
    this.queryAuthTypeTree();
  },
  methods: {
    rowDropBetter() {
      this.$nextTick(function() {
        const that = this;
        const ele = document.querySelector("#free-table .table-box");
        Sortable.create(ele, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = that.menus.splice(oldIndex, 1)[0];
            that.menus.splice(newIndex, 0, currRow);
            that.menuSort(that.menus, that.batchSaveAuthType);
          }
        });
        that.rowDrop();
      });
    },
    rowDrop() {
      this.$nextTick(function() {
        const that = this;
        var i = 0;
        while (i < that.menus.length) {
          var menuItem = that.menus[i];
          const ele = document.querySelector("#" + menuItem.keyId + " tbody");
          Sortable.create(ele, {
            onEnd(evt) {
              var keyworks = evt.target.outerText.split(/\n/);
              that.menus.forEach(function(item) {
                item.children.forEach(function(o) {
                  if (keyworks[0].indexOf(o.name) != -1) {
                    const currRow = item.children.splice(evt.oldIndex, 1)[0];
                    item.children.splice(evt.newIndex, 0, currRow);
                    that.menuSort(item.children, that.batchSaveAuthType);
                  }
                });
              });
            }
          });
          i++;
        }
      });
    },
    menuSort(data, callback) {
      var param = JSON.parse(JSON.stringify(data));
      var arr = [];
      param.forEach(function(item, index) {
        var obj = {
          order: index + 1,
          name: item.name,
          id: item.id,
          parentId: item.pid,
          parentName: item.pName
        };
        arr.push(obj);
      });
      callback(arr);
    },
    batchSaveAuthType(data) {
      // 菜单批量保存
      this.$interface.batchSaveAuthType(
        {
          authTypeSaveFormList: data
        },
        res => {
          this.queryAuthTypeTree("update");
        }
      );
    },
    queryAuthTypeTree(update) {
      //查询菜单树
      var that = this;
      var expands = that.menus.filter(function(item) {
        return item.expand;
      });
      console.log(expands);
      this.$interface.queryAuthTypeTree({}, res => {
        var menus = res.data.result;
        menus.forEach(function(item, index) {
          if (update) {
            expands.forEach(function(o) {
              if (item.id === o.id) {
                item.expand = true;
              }
            });
          } else {
            menus[0].expand = true;
          }
          item.keyId = "menu" + index;
        });
        that.menus = menus;
        that.rowDropBetter();
      });
    },
    showMenuMachine(row) {
      if (Object.prototype.toString.call(row) == "[object Boolean]") {
        this.menuMachineShow = false;
      } else {
        this.menuMachineShow = true;
        this.menuItemMachine = row;
      }
    },
    getParentMenus() {
      var menus = JSON.parse(JSON.stringify(this.menus));
      var parentMenus = [];
      menus.forEach(function(item) {
        var obj = {};
        for (var key in item) {
          obj[key] = item[key];
        }
        obj.childrenOrder = item.children.length;
        obj.children = null;
        parentMenus.push(obj);
      });
      return parentMenus;
    },
    editMenu(row) {
      if (row.rowkey == this.keywork.add) {
        this.menuDetail = {
          parentMenus: this.getParentMenus(),
          menu: {}
        };
        this.addMenuShow = true;
      } else if (row.rowkey == this.keywork.edit) {
        row.parentId = row.pid;
        this.menuDetail = {
          parentMenus: this.getParentMenus(),
          menu: row
        };
        this.addMenuShow = true;
      } else if (row.rowkey == this.keywork.delete) {
        this.deleteMenu(row);
      }
    },
    showAddMenu(v) {
      this.addMenuShow = v;
      this.queryAuthTypeTree("update");
    },
    deleteMenu(row) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.deleteAuthType(
          {
            id: row.id
          },
          res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.queryAuthTypeTree("update");
          }
        );
      });
    }
  }
};
</script>

<style lang="less">
.query-form {
  min-width: 840px;
  margin-bottom: 10px;
}

.menu {
  height: 100%;

  .iconfont {
    color: #0956a3;
  }

  .free-table {
    font-size: 14px;
  }

  .bt {
    border-top: 1px solid #e5e5e5;
  }

  .bb {
    border-bottom: 1px solid #e5e5e5;
  }

  .menu-title {
    background-color: #eeeeee !important;
    text-align: center;
  }

  .menu-item-row {
    height: 40px;
    line-height: 40px;
    display: flex;
    background-color: #dddddd;
  }

  .menu-item-row > span {
    display: inline-block;
  }

  .order {
    width: 48px;
    text-align: center;
  }

  .name {
    flex: 1;
    font-weight: bold;
  }

  .circle {
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    transform: rotate(45deg);
    margin: 0 6px 0 16px;
  }

  .url {
    flex: 1;
  }

  .sort {
    width: 118px;
    text-align: center;
    cursor: n-resize !important;
  }

  .operation {
    text-align: center;
    width: 250px;
  }

  .table-box .el-table--border {
    border-top: none;
  }
}
</style>
