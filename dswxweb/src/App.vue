<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 14:27:02
 * @LastEditTime: 2019-07-15 14:27:02
 * @LastEditors: your name
 -->
<template>
  <div id="app" class="container">
    <keep-alive >
      <!--缓存部分页面-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// 引入组件
// import MainFooter from '@/components/MainFooter'
// 暴露组件
export default {
  // inject: ['reload'],
  // updated() {
  //   this.reload();
  // }
}
</script>
<style lang="scss">
@import 'lib/reset.scss';
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
}
html, body, #app {
	@include rect(100%, 100%);
	font-family: 'PingFang-SC-Regular';
}
</style>
