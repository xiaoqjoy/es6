<template>
  <div class="common-border">
    <div class="common-border-inner">
      <div v-if="title" class="title" @click="">{{title}}</div>
      <!--1月份 3月份 6月份-->
      <ul class="month-list" v-if="params.list">
        <li @click="changeMonth(index)" :class="index==monthIndex?'active':''" v-for="(item,index) in params.list">{{item}}</li>
      </ul>
      <!--echart图-->
      <div v-show="!params.nodata" :class="params.class" style="width: 100%; height: 100%;margin: 10px auto;"></div>
      <div v-show="params.nodata" class="no-data-tip">数据暂未更新，请您稍后查询</div>
    </div>
  </div>
</template>
<style>
  /*导航*/
  #month-list li{
    width:calc(33.3% - 1px);
  }
  .month-list{
    position: absolute;
    top:0px;
    left: 80px;
    height:auto;
    overflow: hidden;
    width: 350px;
    font-size: 14px;
    z-index: 9999;
  }
  .month-list li{
    width:calc(25% - 1px);
    line-height: 40px;
    float: left;
    text-align: center;
    color: #333;
    cursor: pointer;
  }
  .active{
    color: #93d6f6!important;
  }
  .base-color{
    height: 15px;
    width: 15px;
    display: inline-block;
    position: absolute;
    margin-left: -17px;
    margin-top: 5px;
  }
  .top-list{
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .top-list ul li{
    height: 25px;
    font-size: 10px;
    float: left;
    width: 20%;
    padding-left: 10px;
  }

  .no-data-tip{
    position:absolute;
    top:8.5rem;
    width:100%;
    text-align: center;
  }
</style>
<script>
  import echarts from 'echarts'
  import chartOption from '../../../assets/js/chart'
  export default{
    data(){
      return{
        title:'',
        test:'9999',
        monthIndex:0
      }
    },
    props:{
      params:{
        default:{
          name:'标题',
          data:{},
          style:{},
          nodata:false,
          class:'chart',
          type:'',
          list:[],
          list1:[],
          random:0
        }
      }
    },
    watch:{
      params:{
        handler:function(val,oldval){
          this.initCharts();
        },
        deep:true
      }
    },
    created(){
    },
    mounted(){
      this.initCharts();
    },
    methods:{
      initCharts:function(){
        this.title = this.params.name;
        let vm=this;
        chartOption[vm.params.class](vm.params.data,document.getElementsByClassName(vm.params.class)[0],vm);
      },
      changeMonth:function(index){
        this.monthIndex = index;
        this.$parent.initChart(index);
      },
    },
    components:{
    }
  }
</script>
