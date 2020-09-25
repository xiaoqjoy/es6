<template>
    <div class="tree">
      <ul class="tree__node">
        <li v-for="(item,index) in treeData" :key="index">
          <span class="text">{{item.menuName}}</span>
          <tree-node v-if="item.data && item.data.length > 0" :tree-data="item.data" class="tree-node"></tree-node>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      treeData: {
        default() {
          return [];
        }
      }
    },
    name: 'treeNode',
    componentName: 'treeNode',
    data() {
      return {};
    },
    components: {},
    created() {}
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .tree{
    .tree-node{
      padding-left: 10px;
    }
  }
</style>
