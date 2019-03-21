<template>
  <div class="container">
    <ul>
      <li>
        <span>
          城市
          <i></i>
        </span>
        <view class="section">
          <picker
            mode="region"
            @change="bindRegionChange"
            :value="region"
            :custom-item="customItem"
          >
            <view class="picker">
              {{region[0]}}，{{region[1]}},{{region[2]}}
            </view>
          </picker>
        </view>
      </li>

      <li>
        <span>
          姓名
          <i></i>
        </span>
        <input type="text" placeholder="请输入您的姓名">
      </li>
      <li>
        <span>
          联系电话
          <i></i>
        </span>
        <input type="text" placeholder="请输入您的手机号码">
      </li>
      <li>
        <span>
          验证码
          <i></i>
        </span>
        <input type="text" placeholder="请输入短信验证码">
        <div class="code">获取验证码</div>
      </li>
      <li>
        <span>
          小区名称
          <i></i>
        </span>
        <input type="text" placeholder="请输入小区名称">
      </li>
    </ul>

    <button>提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      region: ['广东省', '深圳市', '南山区'],
      customItem: '全部'
    };
  },
  methods: {
    getUserInfo(e) {},
    bindRegionChange(e) {
      this.region = e.target.value;
    }
  },
  onShow() {},
  mounted() {}
};
</script>

<style lang="less">
.container {
  padding: 0 5%;
  border-top: 1px solid #d7d7d7;
  ul li {
    position: relative;
    span {
      color: #7f7f7f;
      width: 18%;
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
      width: 78%;
      height: 106rpx;
      display: inline-block;
      border-bottom: 1px solid #d7d7d7;
    }
    .section{
      margin-left: 4%;
      width: 78%;
      height: 106rpx;
      line-height: 106rpx;
      display: inline-block;
      border-bottom: 1px solid #d7d7d7;
    }
    .code{
      position: absolute;
      right: 0rpx;
      top: 30rpx;
    }
  }
  button{
    height: 88rpx;
    width: 100%;
    background:linear-gradient(90deg,rgba(0,136,66,1) 0%,rgba(0,184,67,1) 100%);
    color: white;
    border-radius:10rpx;
    margin-top: 100rpx;
    opacity: 0.5;
  }
}
</style>
