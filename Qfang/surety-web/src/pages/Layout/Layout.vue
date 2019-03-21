<template>
  <div class="container">
    <v-sidebar class="menu-expanded"></v-sidebar>
    <div class="main">
      <v-header></v-header>
      <div class="surety">
        <transition name="fade" mode="out-in">
          <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="main-view"></router-view>
          </keep-alive> -->
          <!-- <router-view v-if="!$route.meta.keepAlive" class="main-view"></router-view> -->
          <router-view class="main-view"></router-view>
        </transition>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from './Header';
  import vSidebar from './Sidebar';
  export default {
    name: 'Layout',
    components: {
      // 注册组件
      vHeader,
      vSidebar
    }
  };

</script>

<style scoped>
  .container {
    height: 100%;
    background-color: #00264C;
    padding: 15px;
    display: flex;
    justify-content: flex-start;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .surety {
    flex: 1;
    position: relative;
    border-radius: 0 6px 6px 0;
    padding: 15px;
    background-color: #fff;
    overflow: scroll;
  }

  .main-view {
    position: relative;
    background-color: #fff;
  }
  .menu-expanded {
    flex: 0 0 190px;
  }
</style>
