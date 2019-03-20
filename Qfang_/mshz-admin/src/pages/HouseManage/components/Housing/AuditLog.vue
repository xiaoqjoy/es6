
<template>
  <section class="dialog-box aditlog">
    <div class="border-ddd font-c">
      <p v-if="!stepData.length" class="font-16 pd-20 bgcfff">暂无数据</p>
      <div v-if="stepData.length">
        <div class="step-info">
          <div>
            <i v-bind:class="[stepData[0].result === 'AUDIT_YES' ? successClass : errorClass, 'font-25']"></i>
          </div>
          <div class="info-content font-l">
            <p class="content-text">{{stepData[0].typeDesc}}{{stepData[0].resultDesc}}
              <span v-if="stepData[0].remark.trim().length>0" class="c-9 font-14">原因：{{stepData[0].remark}}</span>
            </p>
            <p class="content-time">{{stepData[0].operatorName}} {{stepData[0].createTimeDesc}}</p>
          </div>
        </div>
        <div v-if="stepData.length > 1" class="v-step is-vertical bgcfff" style="flex-basis: 50%;">
          <div class="v-step-head v-step-top-line">
            <div class="v-step-line">
            </div>
          </div>
        </div>
      </div>
      <div class="step-box">

        <!-- 外面的盒子 -->
        <div class="v-step is-vertical" style="flex-basis: 50%;" v-for="(item, index) in stepData" :key="index" v-if="index !== 0">
          <!-- 左边的条和icon -->
          <div class="v-step-head">
            <!-- 线 -->
            <div class="v-step-line">
            </div>
            <div class="v-step-icon is-text">
              <div class="v-step-icon-inner">
                <i v-bind:class="[item.result === 'AUDIT_YES' ? successClass : errorClass]"></i>
              </div>
            </div>
            <div class="v-step-index">{{stepData.length - index}}</div>
          </div>
          <!-- 主要内容 -->
          <div class="v-step-main">
            <div class="v-step-title">{{item.typeDesc}}{{item.resultDesc}}
              <span v-if="item.remark.trim().length>0" class="c-9 font-14">原因：{{item.remark}}</span>
            </div>
            <div class="v-step-description">{{item.operatorName}} {{item.createTimeDesc}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      successClass: 'icon iconfont icon-xuanzhong step-success',
      errorClass: 'icon iconfont icon-cuowu step-error',
      Data: [
        {
          'createOperatorId': 'admin',
          'createTimeDesc': 1513233380000,
          'id': '16e97561-e099-11e7-bdd4-782bcb6ea7f4',
          'operatorName': '小李',
          'remark': '审核通过',
          'result': 'AUDIT_YES',
          'resultDesc': '审核通过',
          'roomId': 'd240093e4b4aff',
          'type': 'ROOM',
          'typeDesc': '房源',
          'updateOperatorId': '',
          'updateTime': null
        }
      ],
      stepData: []
    };
  },
  props: ['id'],
  created() {
    this.requestData(this.id);
  },
  methods: {
    requestData(id) {
      this.$axios.get(
        '/security/room/manage/queryAuditInfo',
        {
          params: {
            id: id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.stepData = res.data.result;
          // if (this.stepData.length > 0 && this.stepData[0].result !== 'AUDIT_YES') {
          //   // xxxx
          // }
        } else {
          this.stepData = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.aditlog {
  box-sizing: border-box;
  padding: 20px;
  background-color: #eeeeee;
  border: 1px solid #ddd;
}
.step-info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
}
.info-content {
  padding-left: 10px;
}
.content-text {
  font-size: 16px;
  word-break: break-all;
  /* color: #d66666; */
}
.content-time {
  font-size: 12px;
  color: #ccc;
}
.step-box {
  background-color: #fff;
}
.v-step.is-vertical {
  display: flex;
}
.v-step {
  padding-left: 100px;
  position: relative;
  flex-shrink: 1;
}
.v-step.is-vertical .v-step-head {
  flex-grow: 0;
  width: 24px;
}

/* .v-step-head.is-finish {
  color: #409eff;
  border-color: #409eff;
} */

.v-step-head {
  position: relative;
  width: 100%;
  height: 100px;
}
.v-step.is-vertical .v-step-line {
  width: 2px;
  top: 0;
  bottom: 0;
  left: 11px;
}

.v-step-line {
  margin-right: 0px;
  position: absolute;
  border-color: inherit;
  background-color: #ddd;
}
/* .v-step-icon.is-text {
  border-radius: 50%;
  border: 2px solid;
  border-color: inherit;
} */

.v-step-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 14px;
  box-sizing: border-box;
  background: #fff;
  transition: 0.15s ease-out;
}
.v-step-icon-inner {
  display: inline-block;
  user-select: none;
  text-align: center;
  font-weight: 700;
  line-height: 1;
  color: inherit;
}
.step-success {
  color: #008842;
}
.step-error {
  color: #d66666;
}
.v-step-index {
  position: absolute;
  top: 0;
  left: -20px;
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
}
.v-step.is-vertical .v-step-main {
  padding-left: 10px;
  flex-grow: 1;
}

.v-step-main {
  white-space: normal;
  text-align: left;
}
.v-step.is-vertical .v-step-title {
  line-height: 24px;
  padding-bottom: 8px;
}

/* .v-step-title.is-finish {
  color: #409eff;
} */

.v-step-title {
  word-break: break-all;
  font-size: 16px;
  line-height: 38px;
}
/* .v-step-description.is-finish {
  color: #409eff;
} */

.v-step-description {
  padding-right: 10%;
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.v-step .v-step-top-line {
  position: relative;
  width: 100%;
  height: 50px;
}
.bgcfff {
  background-color: #fff;
}

i.font-25 {
  font-size: 25px;
}
</style>
