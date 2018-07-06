<template>
  <div class="analyze-chart-container" style="width:calc(100% - 0.32rem);">
    <slot>
      <div class="analyze-chart-box">
        <chart :params="option.params"></chart>
        <slot name="legend"></slot>
      </div>
    </slot>
    <slot name="description"></slot>
    <div class="chart-tip" v-show="option.text">
      <div class="text" :class="{'text1':flag}">
        <div>{{option.text}}</div>
        <div>
          <span class="text_font">{{option.text1}}</span>
          <span>{{option.text2}}</span>
          <span class="text_font">{{option.text3}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import chart from '../../components/common/chart.vue'

  export default {
    data() {
      return {
        msg: 'hello vue',
        flag: false
      }
    },
    props: {
      option: {
        params: {},
        text: '',
        text1: '',
        Text2: '',
        text3: ''
      }
    },
    created() {
      if (this.option.text1 == undefined) {
        this.flag = true;
      }
    },
    components: {
      chart: chart
    }
  }
</script>

<style lang='less'>
  .analyze-chart-container {
    position: absolute;
    top: 1rem;
    bottom: 0.18rem;
    display: flex;
    flex-direction: column;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin: 0 auto;
    background: #1E1B39;
    height: auto;
    overflow: hidden;
    .analyze-chart-box {
      flex: 1;
    }
    @media screen and (max-height: 520px) {
      .analyze-chart-box {
        /*height:2.8rem;*/
      }
    }
    .chart-tip {
      /*position:absolute;*/
      /*left:50%;*/
      /*transform:translateX(-50%);*/
      /*bottom:0.14rem;*/
      width: 90%;
      padding: 0.18rem 0.3rem;
      margin: auto;
      box-sizing: border-box;
      background: url('../../resource/global/images/tip-bg.png') no-repeat left top;
      background-size: auto 1.23rem;
      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      color: #fff;
      .text {
        width: 100%;
        /*line-height:0.28rem;*/
        vertical-align: middle;
        div {
          text-align: center;
        }
        .text_font {
          font-size: 12px;
          text-align: center;
        }
      }
      .text1 {
      }
    }
  }

  @media screen and (max-height: 520px) {
    .analyze-chart-container {
      top: 0.8rem;
    }
  }
</style>
