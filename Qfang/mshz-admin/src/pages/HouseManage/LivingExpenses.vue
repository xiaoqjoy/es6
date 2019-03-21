
<template>
  <section class="house-box">
    <header class="house-header">
      <el-row>
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#008842" @select="handleMenuSelect">
            <el-menu-item index="1">抄表</el-menu-item>
            <el-menu-item index="2" v-if="checkPermission('EXTRA_BILL_QUERY')">账单</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <MeterRead v-show="activeIndex=='1'" :isShow="activeIndex=='1'" />
    <LivingBill v-show="activeIndex=='2'" v-if="checkPermission('EXTRA_BILL_QUERY')" :isShow="activeIndex=='2'" />
  </section>
</template>
<script>
import MeterRead from './components/LivingExpenses/MeterRead';
import LivingBill from './components/LivingExpenses/LivingBill';
export default {
  name: 'LivingExpenses',
  data() {
    return {
      activeIndex: '1'
    };
  },
  created() {

  },
  methods: {
    // 切换状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
    }

  },
  components: {
    MeterRead,
    LivingBill
  }
};
</script>
<style lang="scss">
  .live-search-box {
    position: absolute;
    top: 60px;
    right: 30px;
    z-index: 100;
  }
</style>


