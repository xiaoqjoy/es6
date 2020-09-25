<style lang="less" rel="stylesheet/less" scoped>
  .dialog-box {
    background: #ececec;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .el-icon-close {
    position: absolute;
    top: 21px;
    right: 43px;
    cursor: pointer;
    width: 12.4px;
    font-weight: bold;
  }
  .product_title_head{
    line-height: 60px;
  }
  .list {
    width: 100%;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    margin: 0 auto;
    height: 100%;
    overflow-y: auto;
    .line {
      line-height: 40px;
      background: #d0d0d0;
      color: #666;
      font-size: 12px;
      border-bottom: 1px solid #d0d0d0;
      padding-top: 5px;
    }
    .item {
      font-size: 14px;
      color: #000;
      background: #fff;
      padding-bottom: 5px;
    }
    .blue-font {
      color: #538BF1;
      cursor: pointer;
    }
    .txt {
      width: 90%;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="product-title">
        <span class="product_title_head strong_font">查询录音</span>
        <!-- <span class="el-icon-close button button__close" @click="close_()"></span> -->
      </div>
      <div class="list">
        <audio v-if="videoShow" :src="url" controls="controls"></audio>
        <el-row class="line">
          <el-col :span="2"><div class="grid-content bg-purple">序号</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{phoneCheckPersonnelId}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">拨打号码</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple-light">拨打时间</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">电核时长</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">拨打阶段</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-light">操作</div></el-col>
        </el-row>
        <el-row class="line item" v-for="(item, index) in list" :key="index">
          <el-col :span="2"><div class="grid-content bg-purple">{{index+1}}</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">{{item.phoneCheckPersonnelId || "&nbsp;"}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{item.phoneCheckPhoneNum || "&nbsp;"}}</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple-light">{{item.phoneCheckTimeDate || "&nbsp;"}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{item.time || "&nbsp;"}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">{{item.phoneCheckNodeName || "&nbsp;"}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-light">
            <div
              class="grid-content bg-purple-light blue-font"
              @click="detail(item.recordingAddressTxt)">
                听取录音
            </div>
          </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import {aprAudApi} from "../../js/server.js";
import { prepayment } from "@/system/adjust-accounts/counter-deal/js/server"; // 用于核算远程还款查询录音
  export default {
    // props: {
    //   id: String,
    //   appOrAud: Boolean
    // },
    data() {
      return {
        id: this.$route.query.id,
        appOrAud: this.$route.query.appOrAud,
        phoneCheckPersonnelId: this.$route.query.phoneCheckPersonnelId || '电核人员',
        configCode: [],
        url: '',
        videoShow: false,
        list: []
      };
    },
    methods: {
      detail (url) {
        this.url = url || null;
        this.videoShow = true;
      },
      close_() {
        this.$emit("clsoe_videoList");
      },
      checkTime (i) {
        return i < 10 ? `0${i}` : i;
      },
      init () {
        if (this.appOrAud === 'true') {
          this.appOrAud = true;
        } else if (this.appOrAud === 'false') {
          this.appOrAud = false;
        }
        let data = {
          id: this.id
        };
        if (this.appOrAud) {
          this.url = `${aprAudApi.taskDetail.phonecheckDetail}/${this.$route.query.appID}`;
        } else {
          this.url = `${aprAudApi.aud.taskDetail.phonecheckDetail}/${this.$route.query.appID}`;
        };
        //  从核算模块跳转过来的查询录音判断
        let preRepayment = this.$route.query.from === 'case-preRepayment';
        if (preRepayment) {
          this.url = prepayment.queryRecording;
          data.transSerialNo = this.$route.query.transSerialNo;
          delete data.id;
        }
        this.$MyFetch.post(this.url, data)
        .then((data = {}) => {
          if (preRepayment) {
            let phoneCheckDetail = data;
            data = {
              phoneCheckDetail
            };
          }
          this.$getDictCode("task_def_key").then(res => {
            let list = [
              { itemCode: '0010', itemDesc: '预约' },
              { itemCode: '0020', itemDesc: '办理' }
            ];
            res = [...res, ...list];
            this.configCode = res;
            for (let i = 0; i < data.phoneCheckDetail.length; i++) {
              if (data.phoneCheckDetail[i].phoneCheckIntervalTimeCnt > 0) {
                let originTime = data.phoneCheckDetail[i].phoneCheckIntervalTimeCnt;
                let hours = this.checkTime(parseInt(originTime / 60 / 60 % 24));
                let minutes = this.checkTime(parseInt(originTime / 60 % 60));
                let seconds = this.checkTime(parseInt(originTime % 60));
                data.phoneCheckDetail[i].time = `${hours}"${minutes}'${seconds}`;
              }
              for (let v = 0; v < res.length; v++) {
                if (res[v].itemCode === data.phoneCheckDetail[i].phoneCheckNodeCode) {
                    data.phoneCheckDetail[i].phoneCheckNodeName = res[v].itemDesc;
                }
              }
            }
            this.list = data.phoneCheckDetail;
          })
          .catch(err => {
            this.$error(err.message);
          });
        })
        .catch(err => {
          this.$error(err.message);
        });
      }
    },
    created() {
      this.init();
    }
  };
</script>
