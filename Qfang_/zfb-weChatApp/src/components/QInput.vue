<template>
  <div class="q-input" :class="{border:border}">
    <div class="q-input-title" v-if="val">
      <span>{{title}}</span>
    </div>
    <div class="q-input-body">
      <div class="q-input-left">
        <input :type="type" :value="val" :password="type==='password'" @input="inputHandle" :maxlength="maxlength" @focus="inputFocus" @blur="inputBlur" :placeholder="placeholder" :disabled="disabled" class="van-field__control" :confirm-hold="confirmHold" :confirm-type="confirmType" :placeholder-class="placeholderClass" />
        <div class="right-icon" @click="clearValue()" v-show="showClear">
          <van-icon name="clear" color="#D8D8D8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QInput',
  data() {
    return {
      isFocus: false // input是否聚焦
    };
  },
  props: {
    placeholder: String, // placeholder
    placeholderClass: String, // placeholder的class
    title: String, // 标题
    value: [String, Number], // input值
    type: String, // input类型
    verifyReg: RegExp, // 输入的检验正则
    disabled: Boolean, // 是否禁用
    // focus: {  // focus目前有bug 暂时禁用
    //   type: Boolean,
    //   default: false
    // },
    border: { // 是否需要下边框
      type: Boolean,
      default: true
    },
    confirmType: String, // 设置键盘右下角按钮的文字，仅在type='text'时生效
    confirmHold: Boolean, // 点击键盘右下角按钮时是否保持键盘不收起
    maxlength: { // input的maxlength
      type: Number,
      default: 140
    },
    clearable: Boolean // 是否显示清除按钮
  },
  computed: {
    val: {
      set(val) {
        this.$emit('update:value', val);
      },
      get() {
        return this.value;
      }
    },
    showClear() {
      return this.clearable && this.val && this.isFocus;
    }
  },
  methods: {
    inputHandle(e) {
      let val = e.target.value;
      // console.log(val, this.verifyReg.test(val));
      // if (this.verifyReg && !this.verifyReg.test(val)) {
      //   val = this.val;
      // }
      this.val = val;
      return val;
    },
    inputFocus() {
      this.isFocus = true;
    },
    inputConfirm() {
      this.$emit('confirm');
    },
    inputBlur() {
      this.isFocus = false;
    },
    clearValue() {
      if (this.clearable) {
        this.val = '';
      }
    }
  }
};
</script>

<style lang="less">
.q-input {
  position: relative;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 15px;
  box-sizing: border-box;
  .q-input-title {
    font-size: 12px;
    color: #252525;
    height: 20px;
    align-items: center;
    display: flex;
  }
  .q-input-body {
    display: flex;
    align-items: center;
    height: 24px;
  }
  .q-input-left {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .right-icon {
    padding: 5px;
    margin: 0 10px;
    .van-icon {
      display: block;
    }
  }
  .van-field__control {
    font-size: 15px;
    color: #252525;
    font-weight: bold;
    height: 24px;
    min-height: 24px;
    flex: 1;
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    resize: none;
    display: block;
    background-color: #fff;
  }
  &.border:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    height: 1px;
    background: #d7d7d7;
    transform: scale(1, 0.5);
  }
}
</style>
