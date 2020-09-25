<template lang="html">
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-if="uploadAudio">
      <div class="dialog-box__top">
        <h5 class="title bg__white">录音上传</h5>
        <span class="el-icon-close button button__close point" @click="close"></span>
      </div>
      <div class="dialog-box__body">
        <div class="upload-btn">
          <el-button class="primary-btn" type="primary" plain @click="upload">上传</el-button>
          <input class="upload-file point" type="file" accept="undefined" name="file" ref="upAudio" @change="selectedFile">
        </div>
        <div class="audio-group-wrap">
          <div class="audio-item upload-progress" v-if="showUp" v-for="(item,index) in uploadList" :key="index">
            <div class="audio-con">
              <div class="audio-title">{{item.name}}<span class="audio-bulk">{{'('+item.size+'M)'}}</span>  </div>
              <div class="time-line-wrap">
                <div class="time-line">
                  <div class="time-line-inner" :style="{'width':item.progress}"></div>
                </div>
                <div class="progress">{{item.progress}}</div>
              </div>
            </div>
            <div class="cancel point" @click="cancelUp(item)">取消</div>
          </div>
        </div>
        <ul class="audio-list">
          <li class="audio-item" v-for="(item,index) in playList" :key="index">
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
            <div class="cancel point" @click="del(item, index)">删除</div>
          </li>
        </ul>
        <div class="btn-group">
          <el-button type="primary point" style="width:140px" @click="save">保存</el-button>
        </div>
      </div>
    </div>

    <div class="dialog-box dialog-box-hint" v-if="hint">
      <div class="dialog-box__top">
        <h5 class="title bg__white">提示</h5>
        <span class="el-icon-close button button__close" @click="closeHint"></span>
      </div>
      <div class="dialog-box__body">
        <div class="hint-content">是否确认删除该条录音</div>
      </div>
      <div class="btn-group">
        <el-button class="btn-oparation" type="warning" @click="cancel">否</el-button>
        <el-button class="btn-oparation" type="primary" @click="sure">是</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { surveyApi } from '../js/server.js';
import { parseSongTime } from '../js/utils.js';
import { mapGetters } from 'vuex';
import { fileCos } from '@common/js/fileCos.js';
import COS from 'cos-js-sdk-v5';
export default {
  name: 'up-audio',
  props: {},
  data() {
    return {
      uploadAudio: true,
      showUp: false,
      hint: false,
      file: {}, // input输入文件中转
      Bucket: fileCos.getCos(),
      Region: 'ap-guangzhou',
      fileId: '',
      filePath: '',
      uploadList: [], // 上传列表
      deleteModel: {}, // 当前要删除的文件对象
      playList: [], // 播放列表
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
    close() {
      this.$emit("close");
    },
    closeHint() {
      this.uploadAudio = true;
      this.hint = false;
    },
    upload() {
      this.$refs.upAudio.click();
    },
    selectedFile(e) {
      this.file = this.$refs.upAudio.files[0];
      let uploadModel = {
        name: this.file.name,
        size: parseFloat(this.file.size / (1024 * 1024)).toFixed(2),
        type: this.file.name.substring(this.file.name.lastIndexOf(".") + 1)
      };
      if (this.accept.indexOf(uploadModel.type.toLocaleLowerCase()) < 0) {
        this.$message({
          showClose: true,
          message: '请选择正确的文件格式上传',
          type: 'warning'
        });
        return;
      }
      this.uploadList.push(uploadModel);
      this.showUp = true;
      this.getSignature(uploadModel).then(res => {
        var obj = {
          TmpSecretId: res.credentials.tmpSecretId,
          TmpSecretKey: res.credentials.tmpSecretKey,
          XCosSecurityToken: res.credentials.sessionToken,
          ExpiredTime: res.credentials.expiredTime
        };
        this.fileId = res.fileInfo.fileId;
        this.filePath = res.fileInfo.filePath;
        this.cos = new COS({
          getAuthorization: function (options, callback) {
            callback(obj);
          }
        });
        this.fileUpload();
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    getSignature(uploadModel) {
      return new Promise((resolve, reject) => {
        let requestData = {
          storageTime: "30d",
          extensionName: uploadModel.type
        };
        this.$MyFetch.post(surveyApi.newFile, requestData).then(res => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 上传cos
    fileUpload() {
      let that = this;
      let fileIndex = 0;
      for (let i in this.uploadList) {
        if (this.uploadList[i].name === this.file.name) {
          fileIndex = i;
        }
      }
      this.cos.putObject({
        Bucket: this.Bucket,
        Region: this.Region,
        Key: this.filePath,
        StorageClass: 'STANDARD',
        Body: this.file,
        TaskReady: function(taskId) {
          that.uploadList[fileIndex].taskId = taskId;
          that.$set(that.uploadList, fileIndex, that.uploadList[fileIndex]);
        },
        onProgress: function(progressData) {
          that.uploadList[fileIndex].progress = parseInt(progressData.percent * 100) + '%';
          that.$set(that.uploadList, fileIndex, that.uploadList[fileIndex]);
        }
      }, function(err, data) {
        if (err) {
          that.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
          return;
        }
        if (data.statusCode === 200) {
          that.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          let requestModel = {
            applyNo: that.surveyId,
            fileName: that.uploadList[fileIndex].name,
            fileSize: that.uploadList[fileIndex].size + 'M',
            fileId: that.fileId,
            fileType: 'audio'
          };
          that.uploadRecord(requestModel);
          that.uploadList.splice(fileIndex, 1);
          fileIndex -= 1;
        }
      });
    },
    // 告知后台
    uploadRecord(requestModel) {
      this.$MyFetch.post(surveyApi.fileUpload, requestModel).then(data => {
        if (data) {
          this.getAudioList();
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    cancelUp(item) {
      this.cos.cancelTask(item.taskId);
      for (let i in this.uploadList) {
        if (this.uploadList[i].taskId === item.taskId) {
          this.uploadList.splice(i, 1);
        }
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
            self.$refs.audioPlay[index].pause();
            self.$refs.audioPlay[index].currentTime = 0;
            item.isplay = false;
            item.progress = 0;
            item.playTimeSec = 0;
            item.playTime = '00:00';
            self.$set(self.playList, index, item);
            clearInterval(self.timer);
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
    save() {
      // 保存操作
      this.close();
    },
    del(item, index) {
      this.uploadAudio = false;
      this.hint = true;
      this.deleteModel = item;
      this.deleteModel.index = index;
      this.deleteModel.applyNo = this.surveyId;
    },
    cancel() {
      this.closeHint();
    },
    sure() {
      this.closeHint();
      this.$MyFetch.post(surveyApi.fileDelete, this.deleteModel).then(data => {
        if (data) {
          this.playList.splice(this.deleteModel.index, 1);
          this.deleteModel = {};
        }
      }).catch((err) => {
        this.$error(err.message);
      });
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
    .dialog-box-hint{
      width: 340px;
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
  .upload-btn{
    position: relative;
    .upload-file{
      position:absolute;
      left:0;
      right:0;
      width:70px;
      height:42px;
      opacity: 0;
      z-index: -1;
    }
  }
  .audio-group-wrap, .audio-list {
    margin: 0 -20px;
    padding: 0 20px;
    max-height: 600px;
    overflow-y: scroll;
  }
  .audio-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin:20px 0;
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
    width: 480px;
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
      width:460px;
    }
    .time-line{
      width:410px;
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
  .audio-list .audio-con{
    width:420px;
    .time-line-wrap{
      width:400px;
      .time-line{
        width:320px;
      }
    }
  }
  .el-button--primary.is-plain {
    color: #409EFF;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
  }
  .btn-group{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .btn-oparation{
      width:100px;
    }
  }
  .dialog-box-hint{
    .hint-content{
      text-align: center;
    }
    .btn-group{
      padding:20px;
    }
  }
</style>
