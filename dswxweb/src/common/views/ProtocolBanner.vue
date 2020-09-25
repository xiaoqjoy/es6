<!-- 协议查看组件 -->
<template>
  <div>
    <div class="contain" :class="{left: left}">
      <img @click="clickUrl" ref="img" class="img" :src="uncheck_image">
      <div style="font-size: 0.14rem;color: #032238;margin-left: 0.05rem;">查阅并同意</div>
      <div @click="clickUrl" class="link">《{{name}}》</div>
    </div>
    <div class="fullScreen" v-if="fullScreen">
      <div v-if="url">
        <iframe id="iframe" frameborder="0" width="100%" height="90%" :src="url" @load="iframeOnload"></iframe>
        <div v-if="showBottom" class="bottom">
          <button type="button" @click="disagree" class="disagree">不同意</button>
          <button type="button" @click="agree" class="agree">同意</button>
        </div>
      </div>
      <div class="protocol-scan" v-if="imgPaths">
        <img v-for="url in imgPaths" :src="url" alt="" @load="netImgloadFinish" style="width: 100%">
        <div class="flow-bottom">
          <button type="button" @click="disagree" class="disagree">不同意</button>
          <button type="button" @click="agree"  class="agree" :style="loadFinish?'background-color: #4fbfbd;':'background-color: #95D9D7;'">同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,//协议名称
      url: String,//协议链接
      selected: Boolean,//是否选择
      left: Boolean,
      imgPaths: Array,//图片路径
    },

    data() {
      return {
        check_image: require("@/assets/ic_selected_2@2x.png"),
        uncheck_image: require("@/assets/ic_disselect_2@2x.png"),
        fullScreen: false,
        showBottom: true,//展示按钮
        loadFinish: false,//图片是否加载完成
      }
    },

    watch: {
      selected: function (value) {
        if (value == true) {
          this.$refs.img.src = this.check_image;
        } else {
          this.$refs.img.src = this.uncheck_image;
        }
      },
    },

    created() {

    },

    methods: {
      netImgloadFinish(e){
        this.loadFinish = true;
      },
      clickUrl() {
        this.fullScreen = true;
      },
      agree() {
        if(!this.loadFinish && this.imgPaths){
          return;
        }
        this.fullScreen = false;
        this.$emit("callback", {selected: true, name: this.name});
      },
      disagree() {
        this.fullScreen = false;
        this.$emit("callback", {selected: false, name: this.name});
      },
      iframeOnload() {
        //延长3秒展示按钮
        // let that = this
        // setInterval(function(){
        //     that.showBottom = true
        // },3000);
      }
    }
  }
</script>

<style scoped>
  .contain {
    display: flex;
    flex-direction: row;
    height: 0.4rem;
    align-items: center;
    justify-content: center;
  }

  .left {
    justify-content: left;;
  }

  .img {
    width: 0.17rem;
    height: 0.17rem;
  }

  .link {
    font-size: 0.14rem;
    color: #4fbfbd;
  }

  .fullScreen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  #iframe {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 10%;
    background-color: white;
  }

  .disagree {
    background-color: white;
    color: #4fbfbd;
    font-size: 0.16rem;
    height: 0.44rem;
    width: 38%;
    border-radius: 4px;
    margin-bottom: 0.1rem;
    border-color: #4fbfbd;
  }

  .agree {
    background-color: #4fbfbd;
    color: white;
    font-size: 0.16rem;
    height: 0.44rem;
    width: 38%;
    border-radius: 4px;
    margin-bottom: 0.1rem;
    border-color: white;
  }

  .protocol-scan {
    position: absolute;
    top: 0;
    z-index: 666;
    overflow: auto;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
  }

  .flow-bottom{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 10%;
    background-color: white;
  }

</style>
