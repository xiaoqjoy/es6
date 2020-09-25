<template>
  <ul class="common__steps clearfix">
    <li class='step' v-for="(item, index) in stepArr" :key="index" :class="{isFinish: index <= currentStep -1}" :style="{width:lineWidth}">
      <div class="step__head" >
        <div  class="step__line"></div>
        <div class="step__icon icon icon__finish" v-if="index <= currentStep -1"></div>
        <div class="step__icon icon icon__dot" v-if="index > currentStep -1"></div>
      </div>
      <div class="step__title" :class="{current: index === currentStep - 1}">{{item.title}}</div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
    export default{
        props: {
          stepArr: {
            type: Array,
            default: function() {
              return [];
            }
          },
          currentStep: {
            type: Number,
            default: 0
          }
        },
        data() {
            return {};
        },
        computed: {
          lineWidth() {
            var width = (100 / (this.stepArr.length)) + '%';
            return width;
          }
        },
        components: {}
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .common__steps{
    .step{
      float: left;
      text-align: center;
      .step__head{
        position: relative;
        height: 24px;
        .step__line{
          position: absolute;
          top: 11px;
          left: 0;
          right: 0;
          height: 2px;
          background: #E9E9E9;
        }
        .icon{
          position: relative;
          z-index: 2;
        }
      }
      .step__title{
        line-height: 24px;
        font-size: 14px;
        color: #999;
      }
      .step__title.current{
        color: #333;
      }
    }
    .step.isFinish{
      .step__head{
        .step__line{
          background: #05838E;
        }
      }
    }
    .step:first-child .step__line{
      left: 50%;
    }
    .step:last-child .step__line{
      right: 50%;
    }
  }
</style>
