<template>
  <div>
    <div class="threedataNowday">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div v-if="pOrCalert" class="dialog-box__top">
          <div v-if="newOrOld">
            <span class="title">汇法网</span>
            <!-- <span class="el-icon-close button button__close" @click="close_()"></span> -->
            <div class="content">
              <div class="content_box" v-for="(item, index) in oldPersonList.allmsglist" :key="index" :class="{change_color: item.open}">
                <div>
                  <el-button
                    type="text"
                    :class="{blue: !item.open}"
                    @click="alert_threedataNowdayB(index, true)"
                  >{{item.title}}</el-button>
                </div>
                <span>案号：</span><span>{{item.casenum}} </span>
                <span>法院：</span><span>{{item.court}} </span>
                <span>立案时间：</span><span>{{item.sslong}} </span>
                <span class="margin-right">{{item.description}}</span>
              </div>
            </div>
          </div>
          <div v-else class="new_box">
            <span class="title">汇法网</span>
            <div class="content">
              <div class="content_box new_content_box" v-for="(itemList, key) in newPersonList" :key="key">
                  <div v-for="(item, index) in itemList" :key="item.keyid">
                    <div :class="{change_color: item.open}">
                      <el-button
                        type="text"
                        :class="{blue: !item.open}"
                        @click="open_threedataNowday(item, key, index)"
                      >{{item.title}}</el-button>
                    </div>
                    <span>案号：</span><span>{{item.casenum}} </span>
                    <span>法院：</span><span>{{item.court}} </span>
                    <span>立案时间：</span><span>{{item.sslong}} </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="dialog-box__top">
          <div v-if="newOrOld">
            <span class="title">汇法网</span>
            <!-- <span class="el-icon-close button button__close" @click="close_()"></span> -->
            <div class="content">
              <div class="content_box" v-for="(item, index) in oldPersonList.allmsglist" :key="index" :class="{change_color: item.open}">
                <div>
                  <el-button
                    type="text"
                    :class="{blue: !item.open}"
                    @click="alert_threedataNowdayB(index, true)"
                  >{{item.title}}</el-button>
                </div>
                <span>案号：</span><span>{{item.casenum}} </span>
                <span>法院：</span><span>{{item.court}} </span>
                <span>立案时间：</span><span>{{item.sslong}} </span>
                <span class="margin-right">{{item.description}}</span>
              </div>
            </div>
          </div>
          <div v-else class="new_box">
            <span class="title">汇法网</span>
            <div class="content">
              <div class="content_box new_content_box" v-for="(itemList, key) in newPersonList" :key="key">
                  <div v-for="(item, index) in itemList" :key="item.keyid">
                    <div :class="{change_color: item.open}">
                      <el-button
                        type="text"
                        :class="{blue: !item.open}"
                        @click="open_threedataNowday(item, key, index)"
                      >{{item.title}}</el-button>
                    </div>
                    <span>案号：</span><span>{{item.casenum}} </span>
                    <span>法院：</span><span>{{item.court}} </span>
                    <span>立案时间：</span><span>{{item.sslong}} </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <threedataNowdayB
      v-if="alertThreedataNowdayB"
      @close_windowAlert="close_threedataNowdayB"
      :personMsgXQ="this.personMsgXQ"
      :pOrCalert="pOrCalert"
    />
  </div>
</template>

<script>
import threedataNowdayB from "../threedataNowdayB"; // 详情

export default {
  // props: ["personMsgFun", "pOrCalert", "appOrAud"],
  data() {
    return {
      newPersonList: {},
      oldPersonList: {},
      newOrOld: null,
      personMsgFun: {},
      pOrCalert: this.$route.query.pOrCalert,
      appOrAud: this.$route.query.appOrAud,
      personMsgXQ: {},
      ppap: true,
      alertThreedataNowdayB: false,
      isApp: true
    };
  },
  created() {
    this.pOrCalert = this.pOrCalert === "true";
    this.appOrAud = this.appOrAud === "true";
    this.personMsgFun = JSON.parse(localStorage.getItem("huifaMSG"));
    //  console.log(this.personMsgFun);
    if (this.personMsgFun.fxcontent) {
      this.newPersonList = JSON.parse(this.personMsgFun.fxcontent);
      // console.log(this.newPersonList);
      this.newOrOld = false;
    } else {
      this.oldPersonList = this.personMsgFun;
      this.newOrOld = true;
    }
    // console.log(this.oldPersonList);
    // console.log(this.newPersonList);
    localStorage.removeItem("huifaMSG");
  },
  methods: {
    close_threedataNowdayB() {
      this.alertThreedataNowdayB = false;
    },
    changeColor(index, key) {
      if (key) {
        this.$set(this.newPersonList[key][index], 'open', true);
        return;
      }
      this.$set(this.oldPersonList.allmsglist[index], 'open', true);
    },
    open_threedataNowday(_item, _key, _index) {
      _item.onlyKey = _key;
      // console.log(_item)
      this.personMsgXQ = JSON.stringify(_item);
      localStorage.setItem("threeDataMsgNew", this.personMsgXQ);
      this.alert_threedataNowdayB(_index, false, _key);
    },
    alert_threedataNowdayB(i, flag, _key) {
      if (flag) {
        this.personMsgXQ = JSON.stringify(this.personMsgFun.allmsglist[i]);
        localStorage.setItem("threeDataMsgOld", this.personMsgXQ);
      }
      // this.isApp = this.appOrAud;
      this.ppap = this.pOrCalert;
      // 改变颜色
      this.changeColor(i, _key);
      // localStorage.setItem('isApp', this.isApp);
      localStorage.setItem("pOrCalert", this.ppap);
      let routeData = null;
      if (this.appOrAud) {
        routeData = this.$router.resolve({
          name: "threedataNowdayA",
          params: {}
        });
      } else {
        routeData = this.$router.resolve({
          name: "threedataNowdayB",
          params: {}
        });
      }
      window.open(routeData.href, "_blank");
      // this.alertThreedataNowdayB = true;
    },
    close_() {
      this.$emit("close_windowAlert");
    }
  },
  components: {
    threedataNowdayB
  }
};
</script>

<style lang="less" scoped>
.threedataNowday {
  .dialog-box {
    width: 100%;
    height: 100%;
    .content {
      overflow-y: auto;
      font-size: 14px;
      text-align: left;
      // width: 875px;
      height: 787px;
      margin: 20px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      .content_box {
        width: 817px;
        border-bottom: 1px solid #d0d0d0;
        margin-left: 30px;
        color: #666;
        line-height: 20px;
        .blue {
          color: #538bf1;
        }
        .margin-right {
          margin-right: 10px;
        }
      }
    }
    .content_box.new_content_box {
      box-shadow: none;
      border-bottom: none;
      > div {
        border-bottom: 1px solid #d0d0d0;
      }
    }
    .change_color {
      button.el-button {
        color: #EC7272;
      }
    }
  }
}
</style>
