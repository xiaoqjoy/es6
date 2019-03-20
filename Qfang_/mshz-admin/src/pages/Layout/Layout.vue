<template>
  <div class="wrapper">
    <div class="contain">
      <v-sidebar class="menu-expanded"></v-sidebar>
      <div class="main">
        <v-head></v-head>
        <transition name="fade" mode="out-in">
          <!-- include属性允许组件有条件地缓存。 -->
          <keep-alive :include="cachedTags">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import vHead from './Header';
import vSidebar from './Sidebar';
export default {
  name: 'Layout',
  computed: {
    ...mapState([
      'cachedTags'
    ])
  },
  components: {
    // 注册组件
    vHead,
    vSidebar
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
.contain {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
}
.main {
  padding-top: 50px;
  position: relative;
  flex: 1;
  /* width: 100%; */
  overflow: hidden;
  background-color: #eee;
}
.menu-expanded {
  flex: 0 0 200px;
}
</style>

