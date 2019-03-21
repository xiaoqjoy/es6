<template>
  <div class="menu-item-row bb">
    <span class="name">
      <i class="bl w-4"></i>
      <i
        class="icon iconfont icon-jia"
        :class="{ 'icon-jia': !menuItem.expand , 'icon-jian': menuItem.expand}"
        @click="expandChildren(menuItem)"
      ></i>
      {{menuItem.name}}
    </span>
    <span class="sort">
      <span class="icon iconfont icon-caidan-shouqi">
        <i class="bl mg-1"></i>
      </span>
    </span>
    <span class="operation table-operate-btn">
      <i class="bl mg-1"></i>
      <i class="br"></i>
      <span @click="editMenu(menuItem, 'edit')">修改</span>
      <span @click="editMenu(menuItem, 'delete')">删除</span>
    </span>
  </div>
</template>
<script>
export default {
  name: "type-row",
  props: {
    menuItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    expandChildren(menuItem) {
      this.$emit("expandChildren", menuItem);
    },
    editMenu(row, rowkey) {
      row.rowkey = rowkey;
      this.$emit("operate", row);
    }
  }
};
</script>
<style lang="less">
.icon {
  margin-left: 8px;
}

.mg-1 {
  margin-left: -1px;
}

.w-4 {
  width: 4px;
}

.bl {
  float: left;
  height: 100%;
  border-left: 1px solid #e5e5e5;
}

.br {
  float: right;
  height: 100%;
  border-left: 1px solid #e5e5e5;
}
</style>
