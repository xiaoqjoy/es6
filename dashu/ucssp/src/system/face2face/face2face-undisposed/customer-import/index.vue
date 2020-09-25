<template>
  <!-- 引入客户信息 -->
  <el-dialog class="customer-import" title="引入客户信息" :visible="dialogVisible" width="945px" @open="getImportList" @close="closeDialog" center>
    <el-form class="search" :inline="true" :model="infoImport" ref="infoImport">
      <el-form-item prop="applicationId">
        <el-input class="width200" v-model.trim="infoImport.applicationId" placeholder="申请编号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="customerName">
        <el-input class="width200" v-model.trim="infoImport.customerName" placeholder="客户姓名" clearable></el-input>
      </el-form-item>
      <el-form-item prop="idCardNo">
        <el-input class="width200" v-model.trim="infoImport.idCardNo" placeholder="证件号码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="width100 button-primary" @click="getImportList(true)">查询</el-button>
        <el-button class="width100 button-default" plain @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table class="table-noallselect" :data="tableDataImport" style="100%" ref="tableDataImport" @selection-change="handleSelectionChange" @row-click="rowClick" height="450">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="applicationId" label="申请编号"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
      <el-table-column prop="subcompanyName" label="分公司"></el-table-column>
    </el-table>
    <div class="btn">
      <el-button class="width200 button-primary" @click="submitInfoImport">引入</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { baseApi } from "../../js/server.js";
export default {
  name: "customer-import",
  props: ["dialogVisible"],
  data() {
    return {
      infoImport: {
        // 引入客户查询信息
        applicationId: "",
        customerName: "",
        idCardNo: "",
        pageNum: 1,
        pageSize: 100
      },
      tableDataImport: [], // 引入客户表格信息
      // tableDataImport: [
      //   { applicationId: 1 },
      //   { applicationId: 2 },
      //   { applicationId: 3 },
      //   { applicationId: 4 },
      //   { applicationId: 5 },
      //   { applicationId: 6 },
      //   { applicationId: 8 },
      //   { applicationId: 8 },
      //   { applicationId: 8 }
      // ],
      tableDataImportSelect: [], // 引入客户信息选中的数组
      tableDataImportSelectId: [], // 引入客户信息选中的数组id
      infoImportTotal: 0
    };
  },
  created() {},
  methods: {
    // 查询待引入面签列表
    getImportList(flag) {
      this.$MyFetch
        .get(baseApi.waitingF2F_list, this.infoImport)
        .then(res => {
          // console.log(res);
          this.tableDataImport = res.list;
          this.infoImportTotal = res.total;

          if (flag && this.infoImportTotal === 0) {
            this.confirmFn("无查询结果", "error");
          }
        })
        .catch(err => {
          // console.log('请求失败');
          console.log(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(selection) {
      // console.log(val);
      this.tableDataImportSelect = selection;

      // let keys = [];
      // selection.forEach((item, index) => {
      //   keys.push(item.applicationId);
      // });
      // this.tableDataImportSelectId = keys;
    },
    // 当某一行被点击时会触发该事件
    rowClick(row) {
      // console.log(row);

      // 判断客户信息选中的数组tableDataImportSelect是否在数组中
      let isSelect = this.tableDataImportSelect.some(item => {
        return item.applicationId === row.applicationId;
      });
      // 不在数组中则添加
      if (!isSelect) {
        this.tableDataImportSelect.push(row);
        this.$refs.tableDataImport.toggleRowSelection(row, true); // 用于多选表格，切换某一行的选中状态
      } else {
        // 在数组中则删除
        // 计算客户信息选中的数组tableDataImportSelect的该行索引
        let i = 0;
        this.tableDataImportSelect.forEach((item, index) => {
          if (item.applicationId === row.applicationId) {
            i = index;
          }
        });
        this.tableDataImportSelect.splice(i, 1);
        this.$refs.tableDataImport.toggleRowSelection(row, false); // 用于多选表格，切换某一行的选中状态
      }
      // console.log(this.tableDataImportSelect);
    },
    // 清空引入客户信息
    clearSearch() {
      this.$refs.infoImport.resetFields();
      this.$refs.tableDataImport.clearSelection();

      // 查询待引入面签列表
      this.getImportList();
    },
    // 点击引入客户信息
    submitInfoImport() {
      if (this.tableDataImportSelect.length === 0) {
        this.confirmFn("您还没有选中客户信息", "error");
      } else if (this.tableDataImportSelect.length > 1) {
        this.confirmFn("只能引入一笔业务", "error");
      } else {
        // 引入面签
        console.log(this.tableDataImportSelect);
        const applicationId = this.tableDataImportSelect[0].applicationId;
        this.$MyFetch
          .post(baseApi.introduce + applicationId, {})
          .then(res => {
            // console.log(res);
            this.confirmFn("引入客户信息成功", "success");

            this.closeDialog(true);
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      }
    },
    // 关闭dialog对话框，触发父组件closeDialog事件
    closeDialog(flag) {
      // flag存在为true，则表示引入客户信息成功
      this.$emit("closeDialog", flag);
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.customer-import {
}
</style>
