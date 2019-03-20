<template>
  <div class="header">
    <section class="tags-container" ref="tagsContainer">
      <template v-for="item in $store.state.visitedTags">
        <router-link
          ref="tag"
          class="tags-item"
          :class="isActive(item)? 'active' : '' "
          :to="item.path"
          :key="item.path"
        >
          {{ item.name }}
          <span
            v-if="item.path !== '/Home'"
            class="el-icon-close"
            @click="closeViewTags(item, $event)"
          ></span>
        </router-link>
      </template>
      <span class="arrow rf">
        <span class="lf">
          <i class="el-icon-arrow-left"></i>
        </span>
        <span class="rf">
          <i class="el-icon-arrow-right"></i>
        </span>
      </span>
    </section>
    <section class="sys-infos">
      <p class="infos-text">
        <span class="actions-text" @click="rotate=!rotate">
          <i class="icon iconfont icon-wode mgr-6"></i>
          我的 {{ userInfo.personName }}
          <i
            class="el-icon-arrow-down"
            :class="{'el-icon-arrow-down-rotate':rotate}"
          ></i>
        </span>
      </p>
      <span @click="logout">
        <span class="actions-text">
          <i class="icon iconfont icon-tuichu mgr-6"></i> 退出
        </span>
      </span>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";

export default {
  name: "Header",
  data() {
    return {
      rotate: false
    };
  },
  computed: {
    ...mapState(["userInfo", "visitedTags", "isAddVisitedTags"])
  },
  mounted() {
    this.addViewtag();
    const that = this;
    window.onresize = function temp() {
      that.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    logout() {
      this.$api.logOut({}, res => {
        if (res.data.status == "C0000") {
          Cookie.remove("userinfos");
          Cookie.remove("sid");
          this.$router.replace("/Login");
        }
      });
    },
    // 是不是当前路由
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    // 获取当前路由
    getRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    // 增加顶部导航标签
    addViewtag() {
      const route = this.getRoute();
      if (!route) {
        return false;
      }
      // 已有的不需要添加到stroe
      for (let item of this.visitedTags) {
        if (item.path === route.path) {
          return;
        }
      }
      // console.log(route);
      // console.log(this.visitedTags);
      this.$store.dispatch("addTag", route);
    },

    watchTagList() {
      const $tagsContainerWidth = this.$refs.tagsContainer.offsetWidth;
      let tagsListWidth = this.visitedTags.length * 114 - 24;
      // console.log($tagsContainerWidth, this.visitedTags.length, tagsListWidth + 114);
      if (tagsListWidth + 114 > $tagsContainerWidth) {
        this.$store.commit("handleChangeiSAdd", false);
        // this.openNotify();
      } else {
        this.$store.commit("handleChangeiSAdd", true);
      }
    },

    closeViewTags(view, $event) {
      this.$store.dispatch("delVisitedTag", view).then(tags => {
        // 如是是关闭本身，跳到最后一个
        if (this.isActive(view)) {
          const latestView = tags.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push("/");
          }
        }
      });
      // console.log($event);
      $event.preventDefault();
    },

    openNotify() {
      this.$notify({
        title: "提示",
        message: "标签栏导航的“标签”已到最大限制值"
      });
    }
  },

  watch: {
    $route() {
      // console.log(this);
      this.addViewtag();
    },
    visitedTags() {
      // 导航标签列表数据发生变化
      this.watchTagList();
    },
    screenWidth() {
      // 浏览器窗口发送变化
      if (!this.timer) {
        this.timer = true;
        let that = this;
        setTimeout(() => {
          that.watchTagList();
          that.timer = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 35px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #00264c;
  box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, 0.2);
}

.tags-container {
  flex: 1;
  align-self: flex-end;
  width: 100%;
  border-radius: 6px 6px 0 0;
  background-color: #001e3b;
  overflow: hidden;
}

.arrow {
  display: inline-block;
  width: 40px;
  height: 35px;
  color: #86b3df;

  > span {
    line-height: 35px;
    width: 18px;
    text-align: center;
    background-color: #064077;
    cursor: pointer;
  }
}

.tags-item {
  display: inline-block;
  padding: 0 7px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  color: #0958a5;
  overflow: hidden;
  vertical-align: middle;
  .el-icon-close {
    color: #064077;
  }
}

.tags-item.active {
  color: #000 !important;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
}
.tags-item.active > .el-icon-close {
  color: #a6a6a6;
}

.tags-item:first-child {
  width: 66px;
  color: #fff;
}

.sys-infos {
  width: 140px;
  height: 35px;
  padding: 2px 0 0 12px;
  font-size: 12px;
  color: #86b3df;
  background-color: #00264c;

  .iconfont {
    font-size: 12px;
  }
}

.infos-text {
  position: relative;
  display: inline-block;
  padding-right: 10px;
}

.infos-text:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -1px;
  margin-top: -7px;
  height: 14px;
  border-right: 1px solid #86b3df;
}

.actions-text {
  color: #86b3df;
  font-size: 14px;
  cursor: pointer;
}

.el-icon-arrow-down {
  transition: transform 0.2s linear 0s;
}

.el-icon-arrow-down-rotate {
  transform: rotate(-180deg);
  transition: transform 0.2s linear 0s;
}
</style>
