<template>
    <div class="warningTips" v-show="tipsShow">
        <div class="closeIcon tac" @click="closeTip">X</div>
        <div class="tipContent">
            <slot name="tipContent"></slot>
        </div>
    </div>
</template>
<style scoped lang="less">
.warningTips {
    width: 220px;
    height: 110px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 5px;
    color: #fff;
    background-color: #F65A5A;
    padding: 40px 20px 0;
    box-sizing: border-box;
    z-index: 2010;
}
.closeIcon {
    width: 20px;
    height: 20px;
    position: absolute;
    right:10px;
    top: 10px;
    line-height: 20px;
    border: 1px solid #fff;
    border-radius: 50%;
}
.tipContent a{
    cursor: pointer;
    border-bottom: 1px solid #fff; 
}
</style>
<script>
export default {
    name: 'sugarWarningTips',
    data () {
        return {
            tipsShow:false
        }
    },
    methods: {
        closeTip () {
            this.tipsShow = false;
        }
    }
}
</script>
