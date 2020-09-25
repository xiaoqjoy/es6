<template>
  <div class="face2face common-style">

    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="待处理" name="face2face-undisposed"></el-tab-pane>
        <el-tab-pane label="已处理" name="face2face-disposed"></el-tab-pane>
      </el-tabs>

      <!-- <input type="file" id="inputBox" @change="fileFn">
      <img :src="url" alt=""> -->

      <p v-if="activeName === 'face2face-undisposed' && !isCpms_r_manager_0003">
        剩余面签数量：
        <span class="theme">{{total}}</span>
        <i class="el-icon-refresh theme" :class="{rotateAnim: isRefresh}" @click="refresh" title="刷新数量"></i>
      </p>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { baseApi } from "./js/server.js";
export default {
  name: "face2face",
  components: {},
  data() {
    return {
      // url: "",

      activeName: "face2face-undisposed",
      isRefresh: false, // 是否需要刷新
      total: 0 // 剩余面签数量
    };
  },
  watch: {
    "$route.name"() {
      this.activeName = this.$route.name;
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.activeName = to.name;
  //   next();
  // },
  created() {
    // var script = document.createElement("script");
    // script.setAttribute("src", "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js");
    // var script1 = document.createElement("script");
    // script1.setAttribute("src", "/static/webVideoCtrl.js");
    // document.body.appendChild(script);
    // document.body.appendChild(script1);
    // console.log(screen.availWidth, screen.availHeight);
    // console.log(screen.width, screen.height);

    // 提示需要使用IE11浏览器
    // this.$useIE11Fn();

    // location.href = "http://www.mjpai.cn:3100/images/1.7z";
    // window.open("http://www.mjpai.cn:3100/images/1.7z");

    this.activeName = this.$route.name;

    console.log("销毁柜面面签getTotal");
    window.eventBus.$off("getTotal");

    // 获取剩余面签数量
    this.getTotal();
    window.eventBus.$on("getTotal", () => {
      // 获取剩余面签数量
      this.getTotal();
    });

    // console.log(this.$store.state.face2face);
    // console.log(this.$store.state.face2face.name);
    // setTimeout(() => {
    //   this.$store.dispatch("set_name", "新的名字");
    // }, 2000);

    // let str = "cat,bat,sat,fat";
    // let reg = /at/;
    // console.log(reg.exec(str)); // 返回一个首次出现的数组，查不到就为null（和match不同是：g的时候也是查找第1项）
    // console.log(reg.test(str)); // 返回true或false
    // console.log(str.match(reg)); // 返回一个所有查找结果的数组，查不到就为null（和exec不同是：g的时候可以查找所有，多用于使用g时）
    // console.log(str.search(reg)); // 返回一个首次出现的索引，查不到就为-1，和indexOf差不多

    // let obj = {};
    // this.$set(obj, 'name', '1');
    // this.$set(obj, 'age', '2');
    // console.log(obj);
  },
  methods: {
    // fileFn(e) {
    //   console.log(e.target.files[0]);
    //   let file = e.target.files[0];
    //   let reader = new FileReader();
    //   reader.readAsArrayBuffer(file);

    //   let that = this;
    //   reader.onload = function() {
    //     console.log(this.result);
    //     that.url = this.result;
    //   };
    // },
    // 切换tabs
    handleClick(tab, event) {
      this.$router.push({ name: tab.name });

      if (tab.name === "face2face-undisposed") {
        // 获取剩余面签数量
        this.getTotal();
      }
    },

    // 获取剩余面签数量
    getTotal() {
      if (!this.isCpms_r_manager_0003) {
        this.$MyFetch
          .get(baseApi.pending_amount)
          .then(res => {
            // console.log(res);
            this.total = res;
          })
          .catch(err => {
            // console.log('请求失败');
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      }
    },

    // 刷新剩余面签数量
    refresh() {
      this.isRefresh = true;
      setTimeout(() => {
        this.getTotal();
        this.isRefresh = false;
      }, 500);
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   console.log("销毁柜面面签getTotal");
  //   window.eventBus.$off("getTotal");
  //   next();
  // }
};
</script>

<style lang="less" scoped>
.face2face {
  .tab-home {
    .el-icon-refresh {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>
