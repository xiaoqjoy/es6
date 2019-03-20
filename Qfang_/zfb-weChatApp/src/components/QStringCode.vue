<template>
  <van-dialog id="van-dialog" :show="visible" use-slot async-close show-cancel-button @close="codeDialogClose" class="code-dialog">
    <div class="code-dialog-body">
      <h4 class="title">请输入图片验证码</h4>
      <div class="code-dialog-content">
        <img :src="pictureUrl" @click.stop="getPictureCode()" alt class="code-img">
        <input type="text" adjust-position placeholder="请输入验证码" :cursor-spacing="100" v-model="pictureCodeVal" class="code-input">
      </div>
    </div>
    <van-toast id="van-toast" />
  </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      pictureUrl: '', // 图片验证码的url
      pictureCodeVal: '' // input的值
    };
  },
  props: {
    value: Boolean, // 是否显示弹窗
    // 点击确认按钮后会触发的方法，会传入pictureCodeVal参数，需返回一个promise的boolean结果来操作是否需要关闭弹窗
    onConfirm: Function,
    // 获取图片验证码的接口
    codeUrl: {
      type: String,
      default: '/openapi/weixin/owner/queryImage'
    }
  },
  computed: {
    visible: {
      set(val) {
        this.$emit('update:value', val);
      },
      get() {
        return this.value;
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        // this.getPictureCode();
      }
    }
  },
  methods: {
    // 获取图形验证码
    getPictureCode(cb) {
      this.pictureCodeVal = '';
      this.$axios.get(this.codeUrl, {
        responseType: 'arraybuffer'
      }).then(({ data }) => {
        this.pictureUrl = 'data:image/png;base64,' + Buffer.from(data, 'binary').toString('base64');
        cb && cb();
      });
    },
    // 弹窗关闭
    codeDialogClose(event) {
      if (event.mp.detail === 'confirm') {
        if (!this.pictureCodeVal) {
          this.Toast('请填写验证码');
          this.$page().selectComponent('#van-dialog').stopLoading();
          return;
        }
        this.onConfirm && this.onConfirm(this.pictureCodeVal).then(e => {
          !e && this.getPictureCode();
          this.visible = e;
        });
      } else {
        this.visible = false;
      }
    }
  }
};
</script>

<style lang="less">
.code-dialog {
  .code-dialog-body {
    padding: 20px 15px;
    .title {
      text-align: center;
      font-size: 17px;
      font-weight: bold;
    }
    .code-dialog-content {
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 80px;
        height: 40px;
      }
      .code-input {
        flex: 1;
        height: 40px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #d7d7d7;
        border-radius: 5px;
        outline: none;
        margin-left: 15px;
        font-size: 14px;
        color: #333;
        padding: 7px;
      }
    }
  }
}
</style>
