<template>
  <div class="sidebar">
    <header>
      <img src="../../../static/img/logo.png" alt="万通融资" style="width:118px;height:auto;">
      <span class="icon iconfont icon-caidan-zhankai surety-caidan-zhankai rf"></span>
    </header>
    <div class="sidebar-menu">
      <scroll-Bar>
        <el-menu
          :default-active="$route.path"
          class="surety-menu"
          unique-opened
          router
          @select="handleSelectMenu"
          background-color="#064077"
          text-color="#fff"
          active-text-color="#f6d200"
          ref="elMenu"
        >
          <template v-for="(item, index) in menuList">
            <el-submenu :index="index + ''" :key="index">
              <template slot="title">
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.path + ''"
                :key="child.path"
              >
                <i class="circle"></i>
                {{
                child.name }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </scroll-Bar>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ScrollBar from "../../components/ScrollBar";

export default {
  name: "Sidebar",
  components: {
    ScrollBar
  },
  computed: {
    ...mapState(["userInfo", "menuList", "visitedTags", "isAddVisitedTags"])
  },
  methods: {
    handleSelectMenu(index, indexPath) {
      if (!(index === this.$route.path)) {
        this.$refs.elMenu.activeIndex = this.$route.path;
      }
      for (let item of this.visitedTags) {
        if (item.path === index) {
          return;
        }
      }
      if (!this.isAddVisitedTags) {
        this.$notify({
          title: "提示",
          message: "标签栏导航的“标签”已到最大限制值"
        });
      }
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 100%;
  overflow: hidden;
}

.sidebar header {
  height: 35px;
  line-height: 35px;
  background-color: #00264c;
}

.surety-caidan-zhankai {
  font-size: 32px;
  color: #0958a5;
  float: right;
  margin-right: 8px;
}

.sidebar-menu {
  height: 100%;
  width: 190px;
  flex: 1;
  overflow: hidden;
  background-color: #074785;
  border-radius: 6px 0 0 6px;
}

.circle {
  display: inline-block;
  width: 7px;
  height: 7px;
  border: 1px solid #9cc1e6;
  box-sizing: border-box;
  transform: rotate(45deg);
}

/* 覆盖elementui默认样式  */
.el-menu {
  border: none;
}

.el-submenu.is-active {
  color: #f6d200 !important;
  font-weight: bold;
}
.el-submenu .el-menu-item {
  padding: 0 20px !important;
  min-width: 190px;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  background-color: #0958a5 !important;
  color: #9cc1e6 !important;
  box-sizing: border-box;
}

.el-menu-item:hover {
  color: #fff !important;
  background-color: #074785 !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #074785 !important;
}

.el-menu-item.is-active:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0px;
  height: 40px;
  border-right: 3px solid #f6d200;
}

.el-menu-item .circle {
  margin-right: 14px;
}

.el-menu-item.is-active .circle {
  border: none;
  background-color: #fff;
}

.tags-item {
  margin-left: 10px;
  text-align: center;
  height: 25px;
  line-height: 35px;
  border-radius: 4px 4px 0 0;
}
</style>
