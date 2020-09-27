<template>
  <div>
    <!-- 提示窗 == 删除 -->
    <div class="hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="close"></span>
                </div>
                <div class="text-center">{{ massage }}</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="close">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_delete_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    massage: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    affirm_delete_fun() {
      this.$emit("backFun");
    }
  }
};
</script>
<style lang="less" scoped>
// 提示窗
.hint {
    .import-message {
        .dialog-box {
            width: 340px;
            height: 170px;
            .dialog-msgbox__top {
            height:40px;
            .button__close {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 42px;
            height: 42px;
            line-height: 42px;
            border-radius: 50%;
            font-size: 16px;
            text-align: center;
            color: #666;
            font-weight: 600;
            }
            }
            .text-center{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 1.07px;
            text-align: center;
            }
            // 确认选择
            .affirm_select {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 40px;
                .t_button {
                    width: 100px;
                    height: 40px;
                }
                .cancel_t { // 取消
                    background: #F8F8F8;
                    border: 1px solid #DDDDDD;
                    font-size: 14px;
                    color: #666;
                    letter-spacing: 1.07px;
                    text-align: center;
                }
                .affirm_t { // 确认
                    background: #538BF1;
                    font-size: 14px;
                    color: #ffffff;
                    letter-spacing: 1.07px;
                    text-align: center;
                }
            }
        }
    }
}
</style>
