<template>
  <div class="container">
    <div class="content">
      <p>A玖龙袭小区6栋4单元605-1室A房间</p>
      <ul>
        <li>
          <div class="contentbox">
            <CircleProgress
              :percent="percenta"
              unit="200"
              :strokeBgColor="strokeBgColor"
              :strokeColor="strokeColor"
              canvasId="a"
              strokeType="round"
            >
              <span slot="txt">{{percenta * 100}}%</span>
            </CircleProgress>
          </div>
          <div class="lock_info">
            <b>门内锁</b>
            <span>密码: 458541241</span>
          </div>
        </li>

        <li>
          <div class="contentbox">
            <CircleProgress
              :percent="percentb"
              unit="200"
              :strokeBgColor="strokeBgColor"
              :strokeColor="strokeColor"
              canvasId="b"
              strokeType="round"
            >
              <span slot="txt">{{percentb * 100}}%</span>
            </CircleProgress>
          </div>
          <div class="lock_info">
            <b>门内锁</b>
            <span>密码: 458541241</span>
          </div>
        </li>
      </ul>
      <div class="btn">
        <button>修改门锁密码</button>
      </div>
    </div>

    <div class="content">
      <p>A玖龙袭小区6栋4单元605-1室A房间</p>
      <ul>
        <li>
          <div class="contentbox">
            <CircleProgress
              :percent="percentc"
              unit="200"
              :strokeBgColor="strokeBgColor"
              :strokeColor="strokeColor"
              canvasId="c"
              strokeType="round"
            >
              <span slot="txt">{{percentc * 100}}%</span>
            </CircleProgress>
          </div>
          <div class="lock_info">
            <b>门内锁</b>
            <span>密码: 458541241</span>
          </div>
        </li>

        <li>
          <div class="contentbox">
            <CircleProgress
              :percent="percentd"
              unit="200"
              :strokeBgColor="strokeBgColor"
              :strokeColor="strokeColor"
              canvasId="d"
              strokeType="round"
            >
              <span slot="txt">{{percentd * 100}}%</span>
            </CircleProgress>
          </div>
          <div class="lock_info">
            <b>门内锁</b>
            <span>密码: 458541241</span>
          </div>
        </li>
      </ul>
      <div class="btn">
        <button>修改门锁密码</button>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgress from "../../components/mini-circleprogress";
export default {
  data() {
    return {
      percenta: 0.3,
      percentb: 0.7,
      percentc: 0.2,
      percentd: 0.8,
      canvasId: 'a,b',
      strokeBgColor: "#D7D7D7",
      strokeColor: "#008842"
    };
  },
  components: {
    CircleProgress
  },
  computed: {
    count() {}
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">

.container {
  min-height: 100vh;
  background: rgba(248, 248, 248, 1);
  color: #252525;
  padding-bottom: 20rpx;
  .content {
    p {
      font-size: 36rpx;
      font-weight: 600;
      height: 106rpx;
      line-height: 106rpx;
      width: 100%;
      display: inline-block;
      background: #ffffff;
      padding: 0 5%;
      margin-top: 20rpx;
      box-shadow: 0px 1px 0px 0px rgba(215, 215, 215, 1);
      color: #252525;
    }
    background: #ffffff;
    margin-top: 20rpx;
    display: inline-block;
    width: 100%;
    ul {
      margin-top: 10rpx;
      font-size: 28rpx;
      padding: 0 5%;
      li {
        display: flex;
        height:170rpx;
        .contentbox {
          width: 200rpx;
          height: 200rpx;
        }
        .lock_info{
          display: flex;
          align-items:left;
          justify-content:center;
          flex-direction:column;
          b{
            margin-top: 35rpx;
          }
          span{
            margin-top: 15rpx;
          }
        }
        span {
          margin-right: 20rpx;
          color: #7f7f7f;
        }
        span.money {
          color: #008842;
        }
      }
    }
    .btn {
      height: 106rpx;
      width: 100%;
      button {
        width: 248rpx;
        height: 64rpx;
        line-height: 64rpx;
        border-radius: 10px;
        border: 1px solid #008842;
        color: #008842;
        font-size: 28rpx;
        padding-left: 0;
        padding-right: 0;
        background: white;
        box-sizing: inherit;
        float: right;
        margin-right: 60rpx;
      }
    }
  }
}
</style>
