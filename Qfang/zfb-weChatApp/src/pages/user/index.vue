<template>
  <div class="container">
    <div class="header">
      <img src="../../assets/img/user.png">
      <div class="info">
        <b>租房邦</b>
        <span>188888888888888</span>
      </div>
    </div>

    <div class="path">
      <ul>
        <li>
          <img class="contract" src="../../assets/img/contract.png">
          <span>我的合同</span>
        </li>
        <li>
          <img class="bill" src="../../assets/img/bill.png">
          <span>账单详情</span>
        </li>
        <li>
          <img class="lock" src="../../assets/img/lock.png">
          <span>智能门锁</span>
        </li>
        <li>
          <img class="manager" src="../../assets/img/manager.png">
          <span>我的管家</span>
        </li>
      </ul>
    </div>

    <div class="nameProve">
      <div class="box">
        <img src="../../assets/img/idCard.png">
        <b>实名认证</b>
      </div>

      <img class="arrow" src="../../assets/img/arrow.png">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    getUserInfo(e) {
    }
  },
  onShow() {

  },
  mounted() {
  }
};
</script>

<style lang="less">
.container{
  min-height: 100vh;
  background:rgba(248,248,248,1);
  .header{
    height: 240rpx;
    width: 100%;
    background: #FFFFFF;
    padding: 0 5%;
    display: flex;
    align-items:center;
    img{
      width: 122rpx;
      height: 122rpx;
    }
    .info{
      margin-left: 20rpx;
      b{
        font-size: 36rpx;
        font-weight: bold;
      }
      span{
        display: inline-block;
        margin-top: 20rpx;
        font-size: 30rpx;
        color: #7F7F7F;
      }
    }
  }
  .path{
    height: 240rpx;
    width: 100%;
    background:#FFFFFF;
    margin-top: 20rpx;
    ul li{
      width: 25%;
      margin-top: 68rpx;
      display: inline-block;
      text-align: center;
      position: relative;
      span{
        font-size: 24rpx;
        display: flex;
        flex-direction: column;
        color: #7F7F7F;
      }
      img.contract{
        width: 49rpx;
        height: 60rpx;
      }
      img.bill{
        width: 50rpx;
        height: 59rpx;
      }
      img.lock{
        width: 50rpx;
        height: 60rpx;
      }
      img.manager{
        width: 46rpx;
        height: 63rpx;
      }
    }
  }
  .nameProve{
    margin-top: 20rpx;
    height: 106rpx;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box{
      display: flex;
      align-items: center;
    }
    img{
      width: 42rpx;
      height: 32rpx;
      margin-left: 30rpx;
      margin-right: 20rpx;

    }
    img.arrow{
      width: 17rpx;
      height: 30rpx;
    }
  }
}
</style>
