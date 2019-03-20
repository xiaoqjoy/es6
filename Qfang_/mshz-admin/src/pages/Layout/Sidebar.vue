<template>
  <div class="sidebarBox">
    <section class="sidebar">
      <!-- <el-aside width="200px" style="height:100%" class="el-aside"> -->
      <div class="urer-info-box">
        <div class="product-name"></div>
        <!-- <div class="user-info">
          <img src="http://pic.sc.chinaz.com/files/pic/pic9/201712/zzpic8746.jpg" class="head-img">
          <img v-if="tenantData.headPortrait" :src="tenantData.headPortrait.replace(/{size}/g, '80x80')" class="head-img">
          <div class="avatar">
            <i class="icon-avatar icon iconfont icon-morentouxiang"></i>
          </div>
          <slot v-if="userInfo.positionLinkModelList && userInfo.positionLinkModelList.length > 1">
            <el-popover v-if="userInfo.positionLinkModelList.length > 1" ref="popoverPosition" placement="bottom-end" trigger="click">
              <a class="position-name-item" href="javascript:;" v-for="(item, index) in userInfo.positionLinkModelList" :key="index" @click="changePosition(item.id)">
                {{item.orgName}} - {{item.positionName}}
              </a>
            </el-popover>

            <div class="position-wrapper">
              <a class="position-name" href="javascript:;" v-popover:popoverPosition>
                {{userInfo.name}} - {{userInfo.positionName}}
                <i class="el-icon-arrow-down"></i>
              </a>
            </div>
          </slot>
          <slot v-else>
            <div class="position-wrapper">
              <span class="position-name">
                {{userInfo.name}} - {{userInfo.positionName}}
              </span>
            </div>
          </slot>
        </div> -->
      </div>
      <div class="menu-box">
        <scroll-Bar>
          <el-menu :default-active="$route.path" router background-color="#404040" text-color="#a39e9e" active-text-color="#fff" :unique-opened="true" @select="handleSelectMenu" ref="elMenu">
            <template v-for="(item, index) in $store.state.menuList">
              <el-submenu :index=" index + ''" :key="index">
                <template slot="title">
                  <p class="font-l">{{item.name}}</p>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                  <span class="status">
                    <span class="radius"></span>
                    <span :class="$route.path === (child.path)? 'status-line' : ''"></span>
                  </span>
                  <span class="font-12 inb pdl-8">{{child.name}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
        </scroll-Bar>
      </div>
      <!-- </el-aside> -->
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import navItem from './navItem';
import ScrollBar from '@/components/ScrollBar';
export default {
  components: { navItem, ScrollBar },
  data() {
    return {
      positionLinkId: ''
    };
  },
  computed: {
    ...mapState([
      'userInfo',
      'menuList',
      'visitedTags',
      'isAddVisitedTags'
    ])
  },
  methods: {
    changePosition(positionId) {
      this.$axios
        .post('security/org/person/changePosition', {
          id: positionId
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            location.replace('/');
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
          title: '提示',
          message: '标签栏导航的“标签”已到最大限制值'
        });
      }
    }
  }
  // watch: {
  //   isAddVisitedTags() {
  //     if (!this.isAddVisitedTags) {
  //       this.$notify({
  //         title: '提示',
  //         message: '标签栏导航的“标签”已到最大限制值'
  //       });
  //     }
  //   }
  // }
};
</script>

<style scoped>
.sidebarBox {
  width: 200px;
}
.sidebar {
  display: block;
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: #404040;
  overflow: hidden;
}
ul.el-menu {
  height: 100%;
  border: none;
}
.user-info {
  text-align: center;
  background-color: #404040;
  border-bottom: 1px solid #333;
  height: 96px;
  padding-top: 10px;
}
.head-img {
  display: inline-block;
  outline: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.product-name {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background-image: url("../../../static/img/logo-index.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #008842;
}

.avatar {
  margin: 0 auto;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  line-height: 70px;
  text-align: center;
  overflow: hidden;
}
.icon-avatar {
  font-size: 50px;
  color: #fff;
}

.position-wrapper {
  margin-top: 10px;
  color: #ccc;
}

.position-name {
  color: #ccc;
  font-size: 12px;
}

.position-name-item {
  display: block;
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.position-name-item:hover {
  background-color: #f5f7fa;
}

.status {
  /* visibility: hidden; */
  position: relative;
  left: 0;
  top: 0;
}
.status-line {
  position: absolute;
  left: -40px;
  display: inline-block;
  height: 40px;
  width: 3px;
  background-color: #008842;
}
.radius {
  position: absolute;
  left: -14px;
  top: 5px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid #a39e9e;
  border-radius: 50%;
  box-sizing: border-box;
  /* background-color: #fff; */
}
.el-menu-item {
  border-bottom: 1px solid #333;
}
li.is-active {
  background-color: rgb(51, 51, 51) !important;
}
li.is-active > .status > .radius {
  background-color: #fff;
  border: none;
}
.menu-box {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
}
.urer-info-box {
  position: relative;
  z-index: 20;
}
li.el-menu-item {
  height: 40px;
  line-height: 40px;
}
.pdl-8 {
  padding-left: 8px;
}
</style>

