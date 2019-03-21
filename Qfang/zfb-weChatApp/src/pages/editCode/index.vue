<template>
  <div class="container">
    <p>A玖龙袭小区6栋4单元605-1室A房间</p>
    <div class="content">
      <p>内门锁</p>
      <ul>
        <li>
          <span>
            新密码
            <i></i>
          </span>
          <input type="text" placeholder="请输入6位新密码">
        </li>
        <li>
          <span>
            确认密码
            <i></i>
          </span>
          <input type="text" placeholder="确认新密码">
        </li>
      </ul>

      <p>外门锁</p>
      <ul>
        <li>
          <span>
            新密码
            <i></i>
          </span>
          <input type="text" placeholder="请输入6位新密码">
        </li>
        <li>
          <span>
            确认密码
            <i></i>
          </span>
          <input type="text" placeholder="确认新密码">
        </li>
      </ul>

      <div class="btn">
        <button>返回</button>
        <button>确认</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    count() {}
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.container {
  p {
    font-size: 36rpx;
    height: 106rpx;
    line-height: 106rpx;
    width: 100%;
    display: inline-block;
    background: #ffffff;
    padding: 0 5%;
  }
  .content {
    background: #ffffff;
    display: inline-block;
    width: 100%;
    p {
      font-size: 36rpx;
      font-weight: 600;
      height: 106rpx;
      line-height: 106rpx;
      width: 100%;
      display: inline-block;
      background: #ffffff;
      padding: 0 5%;
      box-shadow: 0px 1px 0px 0px rgba(215, 215, 215, 1);
      color: #252525;
    }
    ul li {
      position: relative;
      padding: 0 5%;
      span {
        color: #7f7f7f;
        width: 20%;
        height: 106rpx;
        line-height: 106rpx;
        float: left;
        text-align: justify;
        i {
          display: inline-block;
          padding-left: 100%;
        }
      }
      input {
        margin-left: 4%;
        width: 76%;
        height: 106rpx;
        display: inline-block;
        border-bottom: 1px solid #d7d7d7;
      }
    }
    .btn{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button:last-child{
        background:linear-gradient(90deg,rgba(0,136,66,1) 0%,rgba(0,184,67,1) 100%);
        color: white;
        opacity: 0.5;
      }
      button{
        height: 88rpx;
        width: 100%;
        border-radius:10rpx;
        margin-top: 60rpx;
        width: 330rpx;
        display: inline-block;
      }
    }
  }
}
</style>
