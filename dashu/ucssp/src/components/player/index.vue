<template>
  <div class="player">
    <video id="videoElement" controls></video>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  data() {
    return {
    };
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.playFlv();
    });
  },
  components: {
    // videoPlayer
  },
  methods: {
    // 播放flv和mp4格式视频
    playFlv() {
        console.log(flvjs);
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById("videoElement");

          var flvPlayer = flvjs.createPlayer({
            type: 'mp4',
            url: '/static/1.mp4'
          });
          console.log(flvPlayer);
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
    }
  },
  computed: {
    // file() {
    //   return '/static/video.mp4';
    // }
  },
  watch: {
    // file(val) {
    //   this.playFlv();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.player {
  background-color: #efefef;
  min-height: 100%;
  text-align: center;
  video{
    width:100%;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
