<template>
  <div class="menu-item">
    <menu-row :menuItem="menuItem" @operate="operate" @expandChildren="expandChildren"></menu-row>
    <div v-show="menuItem.expand" :id="menuItem.keyId">
      <el-table :data="menuItem.children" border row-key="id" :show-header="false" align="left">
        <el-table-column>
          <template slot-scope="scope">
            <i class="circle"></i>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="table-operate-btn" align="center" width="118">
          <template slot-scope="scope">
            <i style="display:none;">{{scope.row.name}}</i>
            <span class="sort icon iconfont icon-caidan-shouqi"></span>
          </template>
        </el-table-column>
        <el-table-column class-name="table-operate-btn" align="center" width="250">
          <template slot-scope="scope">
            <span @click="operate(Object.assign(scope.row,{rowkey:'edit'}))">修改</span>
            <span @click="operate(Object.assign(scope.row,{rowkey:'delete'}))">删除</span>
            <span @click="machineSet(scope.row)">功能设置</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import menuRow from "./menuRow";
export default {
  name: "type-item",
  props: ["menuItem"],
  data() {
    return {
      keywork: {
        add: "add",
        edit: "edit",
        delete: "delete"
      }
    };
  },
  components: {
    menuRow
  },
  methods: {
    operate(row) {
      this.$emit("editMenu", row);
    },
    machineSet(row) {
      this.$emit("showMenuMachine", row);
    },
    expandChildren(menuItem) {
      this.menuItem.expand = !menuItem.expand;
    }
  }
};
</script>
<style lang="less">
.circle {
  display: inline-block;
  width: 7px;
  height: 7px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transform: rotate(45deg);
}
</style>
