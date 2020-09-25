<template>
    <div>
       <!-- 提示窗 == 删除 -->
        <div class="font-hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box">
                    <div class="text-center"><i class="iElememt"></i>&nbsp;&nbsp;{{ successHintMsg }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        successHintMsg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    created() {
        let _this = this;
        setTimeout(() => {
            _this.$emit('close');
        }, 3000);
    }
};
</script>
<style lang="less" scoped>
// 提示窗
.font-hint {
    .import-message {
        .dialog-box {
            width: 238px;
            padding-bottom: 0px;
            .text-center {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                line-height: 52px;
                color: #333333;
                letter-spacing: 1.07px;
                text-align: center;
                span {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 30px;
                    color: #EEB352;
                    letter-spacing: 1.07px;
                }
                .iElememt {
                    position: relative;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: #09BB07;
                    border-radius: 50%;
                    &::before {
                        content: '';
                        position: absolute;
                        top: 3px;
                        left: 7px;
                        width: 5px;
                        height: 10px;
                        border: 2px solid white;
                        border-width: 0 1.06px 2px 0;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
}
</style>
