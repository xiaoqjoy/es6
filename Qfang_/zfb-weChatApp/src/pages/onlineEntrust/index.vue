<template>
  <div class="content">
    <div class="top">
      <img src="../../assets/img/banner.png">
    </div>
    <div class="btn">
      <button type="default">电话咨询</button>
      <button type="primary">在线委托</button>
    </div>
    <p>委托流程</p>
    <div class="path">
      <ul>
        <li>
          <img class="consult" src="../../assets/img/consult.png">
          <span>委托咨询</span>
          <img class="arrow" src="../../assets/img/arrow.png">
        </li>
        <li>
          <img class="plan" src="../../assets/img/plan.png">
          <span>制定方案</span>
          <img class="arrow" src="../../assets/img/arrow.png">
        </li>
        <li>
          <img class="sign" src="../../assets/img/sign.png">
          <span>在线签约</span>
          <img class="arrow" src="../../assets/img/arrow.png">
        </li>
        <li>
          <img class="income" src="../../assets/img/income.png">
          <span>坐享收益</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.content{
  margin: 0 5%;
  .top img {
    width: 100%;
    height: 380rpx;
  }
  .btn {
    margin: 40rpx 0 60rpx;
    button {
      height: 90rpx;
      line-height: 90rpx;
      width: 330rpx;
      font-size: 34rpx;
      border-radius: 45rpx;
      display: inline-block;
    }
    button:first-child{
      color: #008842;
      border: 1px solid #008842;
    }
    button:last-child{
      float: right;
    }
  }
  p{
    font-size: 36rpx;
    font-weight: bold;
  }
  .path{
    height: 200rpx;
    width: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2rpx 10rpx 0rpx rgba(183,183,183,0.4);
    border-radius:8rpx;
    margin-top: 30rpx;
    ul li{
      width: 25%;
      margin-top: 50rpx;
      display: inline-block;
      text-align: center;
      position: relative;
      img.arrow{
        width: 10rpx;
        height: 18rpx;
        position: absolute;
        top: 20rpx;
        right: 0rpx;
      }
      span{
        font-size: 24rpx;
        display: flex;
        flex-direction: column;
      }
      img.consult{
        width: 51rpx;
        height: 45rpx;
      }
      img.plan{
        width: 41rpx;
        height: 58rpx;
      }
      img.sign{
        width: 48rpx;
        height: 49rpx;
      }
      img.income{
        width: 57rpx;
        height: 55rpx;
      }
    }
  }
}

</style>
