<template>
  <div class="mortgage_review">
    <el-tabs v-model="activeName" class="mortgage_review_tabs" @tab-click="handleClick" >
      <el-tab-pane label="待处理" name="mortgage-review-unprocessed"></el-tab-pane>
      <el-tab-pane label="已处理" name="mortgage-review-processed"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
import {baseApi} from '@common/js/server.js';
export default {
  data() {
    return {
      activeName: 'mortgage-review-unprocessed'
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push({name: tab.name});
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    }
  },
  created() {
    this.activeName = this.$route.name;
    this.getMultipleLibrary(['mortgage_state_review']).then(_data => {
      sessionStorage.setItem('mortgage_state_review', JSON.stringify(_data.mortgage_state_review));
    });
  },
  updated() {
    this.activeName = this.$route.name;
  }
};
</script>

<style lang="less">
  .mortgage_review {
    .mortgage_review_tabs {
      padding: 18px 30px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .el-tabs__header {
        margin: 0;
      }
    }
    .mortgage_review_tabs + div {
      padding: 30px;
      margin-top: 15px;
      min-height: 700px;
      background-color: #fff;
      box-shadow: 1px 2px 20px #ccc;
      .clearfix.pagination {
        margin-top: 30px;
      }
    }
  }
</style>
