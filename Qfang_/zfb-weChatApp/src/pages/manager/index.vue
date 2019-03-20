<template>
  <div class="container">
    <div class="top">
      <img src="../../assets/img/manager_head.png">
    </div>
    <ul>


      <li>
        <div class="header">
          <div class="user">
            <img src="../../assets/img/user.png">
            <div class="info">
              <b>林沐云</b>
              <span>我的私人管家</span>
            </div>
          </div>

          <img class="phone" src="../../assets/img/phone.png">
        </div>
        <p>
          <span>关联房间:</span>A玖龙袭小区6栋4单元605-1室A房间
        </p>
      </li>

      <li>
        <div class="header">
          <div class="user">
            <img src="../../assets/img/user.png">
              <div class="info">
                <b>林沐云</b>
                <span>我的私人管家</span>
              </div>
          </div>

          <img class="phone" src="../../assets/img/phone.png">
        </div>
        <p>
          <span>关联房间:</span>A玖龙袭小区6栋4单元605-1室A房间
        </p>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
    }
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style lang="less">
.container{
  .top{
    img{
      width: 100%;
      height: 380rpx;
    }
  }
  ul{
    margin: 0 5%;
    li:first-child{
      margin-top: -90rpx;
    }
    li{
      width: 690rpx;
      height: 270rpx;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(183,183,183,0.4);
      border-radius:10px;
      display: inline-block;
      margin-bottom: 20rpx;
      p{
        width: 95%;
        padding-top: 20rpx;
        margin-left: 5%;
        border-top: 1px solid rgba(215,215,215,1);
        span{
          font-size: 28rpx;
          color: #7F7F7F;
          margin-right: 20rpx;
        }
      }
      .header{
        height: 180rpx;
        width: 90%;
        background: #FFFFFF;
        padding: 0 5%;
        border-radius: 10rpx;
        display: flex;
        align-items:center;
        justify-content: space-between;
        .phone{
          height: 82rpx;
          width: 82rpx;
        }
        .user{
          display: flex;
          align-items: center;
          img{
            width: 122rpx;
            height: 122rpx;
          }
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
    }
  }
}
</style>
