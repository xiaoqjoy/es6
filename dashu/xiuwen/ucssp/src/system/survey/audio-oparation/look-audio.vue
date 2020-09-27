<template lang="html">
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">录音查看</h5>
        <span class="el-icon-close button button__close point" @click="close"></span>
      </div>
      <div class="dialog-box__body">
        <div class="audio-item" v-for="(item,index) in playList" :key="index">
          <audio class="audio" ref="audioPlay" :id="'audioPlay' + index" :data-index="index"></audio>
          <div class="audio-oparation-group">
            <div class="audio-oparation point play" v-show="!item.isplay" @click="play(item,index)"></div>
            <div class="audio-oparation point pause" v-show="item.isplay" @click="pause(item,index)"></div>
          </div>
          <div class="audio-con">
            <div class="audio-title">{{item.fileName}}<span class="audio-bulk">{{'('+item.fileSize+')'}}</span>  </div>
            <div class="time-line-wrap">
              <div class="time-line">
                <div class="time-line-inner" :style="{'width':item.progress}"></div>
              </div>
              <div class="time-progress">{{item.playTime}}/{{item.totalTime}}</div>
            </div>
          </div>
          <div class="cancel point" v-if="hasDownload"><a class="download-link" :href="item.photoUrl" download>下载</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { surveyApi } from '../js/server.js';
import { parseSongTime } from '../js/utils.js';
import { mapGetters } from 'vuex';
export default {
  name: 'look-audio',
  props: {
    hasDownload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      playList: [], // 播放列表
      playModel: {}, // 当前播放
      downloadUrl: '',
      accept: ['ogg', 'mp3', 'wav'], // 音频格式
      searchInfo: {
        applyNo: '',
        fileType: 'audio'
      },
      audioPlayer: null, // 监听audio元素
      isPlaying: false, // 是否有音頻文件正在播放
      timer: null // 播放中的计时器 进度条
    };
  },
  computed: {
    ...mapGetters([
      'surveyId'
    ])
  },
  created() {},
  mounted() {
    this.getAudioList();
  },
  methods: {
    // 获取音频数据列表
    getAudioList() {
      let self = this;
      this.searchInfo.applyNo = this.surveyId;
      this.$MyFetch.post(surveyApi.fileList, this.searchInfo).then(data => {
        if (data.length > 0) {
          this.playList = data;
          setTimeout(function() {
            self.setAudioPlayer();
          }, 4000);
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 音频列表初始化设置
    setAudioPlayer() {
      var self = this;
      for (var i in this.playList) {
        this.$refs.audioPlay[i].src = this.playList[i].photoUrl;
        this.$refs.audioPlay[i].preload = "metadata";
        this.$refs.audioPlay[i].load();
        this.$refs.audioPlay[i].addEventListener('error', function() {
          self.$message({
            showClose: true,
            message: '音频资源获取失败',
            type: 'error'
          });
        });
        this.$refs.audioPlay[i].addEventListener('empted', function() {
          self.$message({
            showClose: true,
            message: '播放文件故障',
            type: 'error'
          });
        });
        this.$refs.audioPlay[i].addEventListener('canplay', function(e) {
          let i = this.dataset.index;
          self.playList[i].canplay = true;
          self.playList[i].isplay = false;
          self.playList[i].progress = 0;
          self.playList[i].playTimeSec = 0;
          self.playList[i].playTime = '00:00';
          self.playList[i].totalTimeSec = Math.round(this.duration);
          self.playList[i].totalTime = parseSongTime(this.duration);
          self.$set(self.playList, i, self.playList[i]);
        });
      }
    },
    play(item, index) {
      if (!item.canplay) {
        return;
      }
      var self = this;
      if (!this.isPlaying && !item.isplay) {
        this.$refs.audioPlay[index].play();
        item.isplay = true;
        this.$set(this.playList, index, item);
        this.isPlaying = true;
        this.timer = setInterval(function() {
          if (item.playTimeSec >= item.totalTimeSec) {
            clearInterval(self.timer);
            this.$refs.audioPlay[index].pause();
            this.$refs.audioPlay[index].currentTime = 0;
            item.isplay = false;
            item.progress = 0;
            item.playTimeSec = 0;
            item.playTime = '00:00';
            self.$set(self.playList, index, item);
          }
          item.playTimeSec += 1;
          item.playTime = parseSongTime(item.playTimeSec);
          item.progress = parseInt(item.playTimeSec / item.totalTimeSec * 100) + '%';
          self.$set(self.playList, index, item);
        }, 1000);
      } else {
        for (var i in this.playList) {
          if (this.playList[i].isplay) {
            clearInterval(this.timer);
            this.$refs.audioPlay[i].pause();
            this.$refs.audioPlay[i].currentTime = 0;
            this.playList[i].isplay = false;
            this.playList[i].progress = 0;
            this.playList[i].playTimeSec = 0;
            this.playList[i].playTime = '00:00';
            this.$set(this.playList, i, this.playList[i]);
          }
        }
        this.isPlaying = false;
        this.play(item, index);
      }
    },
    pause(item, index) {
      if (this.isPlaying && item.isplay) {
        clearInterval(this.timer);
        this.$refs.audioPlay[index].pause();
        item.isplay = false;
        this.$set(this.playList, index, item);
        this.isPlaying = false;
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    z-index: 2019;
    .dialog-mask{
      z-index: 2020;
    }
    .dialog-box{
      z-index:2021;
      width: 600px;
      padding: 0;
      .dialog-box__top{
        margin:0;
      }
      .dialog-box__body{
        padding:20px;
      }
    }
  }
  .audio-oparation-group{
    .audio-oparation{
      width:40px;
      height:40px;
    }
    .play{
      background:url('../../../assets/img/icon_play.png') no-repeat center;
      background-size:30px;
    }
    .pause{
      background:url('../../../assets/img/icon_pause.png') no-repeat center;
      background-size:30px;
    }
  }

  .audio-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:15px 20px;
    border-radius: 4px;
    background:#fff;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.08);

    .audio-title{
      height:24px;
      display:flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-size:14px;
      color:#333333;
    }
    .audio-bulk{
      font-size:14px;
      color:#aaaaaa;
    }
    .progress{
      font-size:12px;
      color:#538bf1;
    }
    .time-progress{
      font-size:12px;
      color:#aaaaaa;
    }
    .cancel{
      color:#f55f5f;
    }
  }
  .upload-progress{
    width:555px;
  }
  .audio-con{
    width: 420px;
    height:40px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .time-line-wrap{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width:400px;
    }
    .time-line{
      width:320px;
      height:6px;
      background:#efefef;
      border-radius: 3px;
    }
    .time-line-inner{
      width:0;
      height:6px;
      background:#538bfe;
      border-radius: 3px;
    }
  }
  .download-link{
    color: #538bf1;
  }
</style>
