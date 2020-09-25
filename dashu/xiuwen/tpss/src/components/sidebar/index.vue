
<template>
  <div class="sidebar">
    <!--<div class="tree">
      <el-tree
        :data="menuArr"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"></el-tree>
    </div>-->
    <slide-tree :tree-data="menuArr" :index="0" class="slide-tree"></slide-tree>
    <!--<el-menu v-if="show" :default-active="$route.path" :router="true">
      <el-submenu index="1">
        <template slot="title">
          <span>备签系统</span>
        </template>
        <el-menu-item index="/system/third_spare">备签</el-menu-item>
        &lt;!&ndash; <el-menu-item index="1-2">扫描录入</el-menu-item> &ndash;&gt;
      </el-submenu>
      <el-submenu index="10">
        <template slot="title">
          <span>权限系统</span>
        </template>
        <el-menu-item index="/system/authority/user">用户管理</el-menu-item>
        <el-menu-item index="/system/authority/company">群组管理</el-menu-item>
        <el-menu-item index="/system/authority/role">角色管理</el-menu-item>
        <el-menu-item index="/system/authority/server_center">个贷服务中心</el-menu-item>
      </el-submenu>
      <el-submenu index="15">
        <template slot="title">
          <span>补件</span>
        </template>
        <el-menu-item index="/system/patch/dispose/dispose-pending">补件处理</el-menu-item>
        <el-menu-item index="/system/patch/review/review-pending">补件复核</el-menu-item>
        &lt;!&ndash; <el-menu-item index="/system/authority/role">角色管理</el-menu-item>
        <el-menu-item index="/system/authority/server_center">个贷服务中心</el-menu-item> &ndash;&gt;
      </el-submenu>
    </el-menu>-->
  </div>
</template>

<script>
  import { menu } from '@common/js/localStorage';
  import slideTree from './slide_tree';
  export default {
    data() {
      return {
        menuArr: [],
        defaultProps: {
          children: 'data',
          label: 'menuName'
        },
        show: false
      };
    },
    created() {
      this.menuArr = JSON.parse(menu.getMenu());
      this.show = process.env.NODE_ENV !== "production";
    },
    methods: {
      handleNodeClick(node) {
        console.log(node);
        if (node.page) {
          this.$router.push({path: '/system/' + node.page.pageUrlVal});
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
    overflow-y: scroll;
    width: 200px;
    background: #fff;
  .slide-tree {
    height: 100%;
  }
  }
</style>
