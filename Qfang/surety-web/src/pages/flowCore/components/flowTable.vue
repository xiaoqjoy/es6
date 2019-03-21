<template>
  <div>
    <el-table :data="tableData" border tooltip-effect="light">
      <el-table-column prop="code" label="流水号" align="center"></el-table-column>
      <el-table-column prop="processName" label="流程标题" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="processGroupe" label="流程分组" align="center"></el-table-column>
      <el-table-column prop="name" label="发起时间" align="center"></el-table-column>
      <el-table-column prop="code" label="当前节点" align="center"></el-table-column>
      <el-table-column prop="processStatus" label="流程状态" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <span @click="showAddFlow(scope.row)">办理</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
// import axios from 'axios';
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
    // flowInfo: {}
  },
  data() {
    return {
      addFlowShow: false
    };
  },
  methods: {
    // showAddFlow(v, row) {
    //   if (row) {
    //     this.flowInfo = row;
    //   } else {
    //     this.flowInfo = {};
    //   }
    //   this.addFlowShow = v;
    // }
    showAddFlow() {
      this.$emit('showAddFlow', '')
    }
  }
};
</script>
<style lang="less">
</style>
