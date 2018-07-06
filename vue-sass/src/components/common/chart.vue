<template>
  <div style="width:100%;height: 3.5rem;">
    <div :class="params.class" style="width:100%;height:100%;"></div>
  </div>
</template>
<style>

</style>
<script>
  import echarts from 'echarts'
  import chartOption from '../../../commonJS/chart'

  export default {
    data() {
      return {
        title: '',
        monthIndex: 0
      }
    },
    props: {
      params: {
        default: {
          name: '标题',
          data: {},
          style: {},
          class: 'chart',
          type: '',
          list: [],
          list1: [],
          random: 0
        }
      }
    },
    watch: {
      params: {
        handler: function (val, oldval) {
          this.initCharts();
        },
        deep: true
      }
    },
    mounted: function () {
      this.initCharts();
    },
    methods: {
      initCharts: function () {
        this.title = this.params.name;
        chartOption[this.params.class](this.params.data, document.getElementsByClassName(this.params.class)[0], this);
      }
    },
    components: {}
  }
</script>
