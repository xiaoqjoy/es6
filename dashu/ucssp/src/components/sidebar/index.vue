
<template>
  <div class="sidebar">
    <slide-tree :tree-data="menuArr" :index="0" class="slide-tree"></slide-tree>
  </div>
</template>

<script>
import { menu } from "@common/js/localStorage";
import slideTree from './slide_tree';
export default {
  data() {
    return {
      menuArr: [],
      defaultProps: {
        children: "data",
        label: "menuName"
      },
      isShow: true
    };
  },
  created() {
    this.menuArr = JSON.parse(menu.getMenu());
    this.isShow = process.env.NODE_ENV !== "production";
  },
  methods: {
    handleNodeClick(node) {
      if (node.page) {
        this.$router.push({ path: "/system/" + node.page.pageUrlVal });
      }
    }
  },
  components: {
    slideTree
  }
};
</script>

<style lang="less" scoped rel="stylesheet/less">
  .sidebar {
    height: 100%;
    overflow-y: auto;
    width: 200px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    .slide-tree {
      height: 100%;
    }
  }
</style>
