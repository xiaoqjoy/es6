<template>
  <div class="tablePage">
    <table class="reportTable">
      <thead>
      <tr>
        <th rowspan="2" class="first pr">日期</th>
        <th colspan="2">早餐</th>
        <th colspan="2">午餐</th>
        <th colspan="2">晚餐</th>
        <th rowspan="2">睡 前</th>
        <th rowspan="2">凌 晨</th>
      </tr>
      <tr>
        <th>空腹</th>
        <th>后</th>
        <th>前</th>
        <th>后</th>
        <th>前</th>
        <th>后</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in sugerTestList">
        <td>{{item.createTime}}</td>
        <td v-for="(infoItem,i) in timeFrame">
            <div style="height: 100%;width: 100%;display: block;cursor: pointer; " v-for="(infoSpan,timeTypeIndex) in item.sugarInfoShow" v-if="infoSpan.timeType == (i+1)" @mouseenter="showPrint(index,timeTypeIndex)" @mouseleave="hiddenPrint(index,timeTypeIndex)">
              <el-dropdown style="width:100%">
              <div :class="infoSpan.sugarList[0].sugar<infoItem.minValue?'specialMin':infoSpan.sugarList[0].sugar>infoItem.maxValue?'specialMax':'specialNormal'" style="width:100%">
                <span v-show="xIndex==index&&yIndex==timeTypeIndex" class="printButton" @click="showDialog(infoSpan?infoSpan.sugarList[0].sugar:'',infoItem.minValue,infoItem.maxValue,item.time)">打印</span>
                <span>{{infoSpan?infoSpan.sugarList[0].sugar:''}}</span>
                <span v-if="!infoSpan.sugarList[0].deviceImei"><img src="../../../images/patientDetail/icon_handwriting.png"/></span>
                <span class="pullDown" v-if="infoSpan.sugarList.length > 1"><img src="../../../images/patientDetail/icon_more.png"/></span>
              </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="specialNormal" disabled v-for="(surge,index) in infoSpan.sugarList" :key="index"><span :class="surge.sugar<infoItem.minValue?'specialMin':surge.sugar>infoItem.maxValue?'specialMax':'normalColor'">{{surge.sugar}}　</span><span v-if="!surge.deviceImei"><img src="../../../images/patientDetail/icon_handwriting.png"/></span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
  .normalColor{
    color: #333;
  }
  .tablePage {
    width: 100%;
    margin-bottom: 1rem;
  }

  .pullDown img {
    position: absolute;
    right: 0;
    bottom: -1px;
  }

  .reportTable {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
  }

  .reportTable th {
    height: 30px;
    border: 1px solid #d4d4d4;
    width: 2em;
    font-weight: normal;
  }

  .reportTable .first p {
    width: 50%;
  }

  .reportTable .first .time {
    position: absolute;
    right: 0;
    top: 20%;
  }

  .reportTable .first .date {
    position: absolute;
    left: 0;
    top: 60%;
  }

  .maneyTimes {
    background: url("/images/patientDetail/icon_more.png") no-repeat 100% 100%;
    background-size: 0.14rem 0.14rem;
  }

  .reportTable td {
    border: 1px solid #d4d4d4;
    text-align: center;
    position: relative;
    height: 24px;
    line-height: 24px;
    position: relative;
    left: 0;
    top: 0;
  }

  .bgGray {
    background-color: #f9f9f9;
  }
  .printButton{
    border: 1px solid #A1C3F4;
    color: #5E83B9;
    border-radius: 3px;
    background-color: #DCEAFF;
    height: 18px;
    line-height: 18px;
    position: absolute;
    top: 50%;
    left: 8%;
    transform: translateY(-50%);
  }
</style>

<script>
  export default {
    name: "myTable",
    data() {
      return {
        // sugerTestList: [
        //   {
        //   "time": "2018-04-11",
        //   "sugarInfoShow": [{
        //     "timeType": "1",
        //     "sugarList": [{"timeType": "1", "time": "2018-04-11", "sugar": "8.0", "deviceImei": null}]
        //   }, {
        //     "timeType": "2",
        //     "sugarList": [{"timeType": "2", "time": "2018-04-11", "sugar": "5.0", "deviceImei": null}]
        //   }, {
        //     "timeType": "3",
        //     "sugarList": [{
        //       "timeType": "3",
        //       "time": "2018-04-11",
        //       "sugar": "9.0",
        //       "deviceImei": null
        //     }, {"timeType": "3", "time": "2018-04-11", "sugar": "6.0", "deviceImei": null}]
        //   }, {
        //     "timeType": "4",
        //     "sugarList": [{
        //       "timeType": "4",
        //       "time": "2018-04-11",
        //       "sugar": "6.0",
        //       "deviceImei": null
        //     }, {"timeType": "4", "time": "2018-04-11", "sugar": "9.0", "deviceImei": null}, {
        //       "timeType": "4",
        //       "time": "2018-04-11",
        //       "sugar": "6.0",
        //       "deviceImei": null
        //     }, {"timeType": "4", "time": "2018-04-11", "sugar": "5.0", "deviceImei": null}]
        //   }, {
        //     "timeType": "8",
        //     "sugarList": [{
        //       "timeType": "8",
        //       "time": "2018-04-11",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }, {"timeType": "1", "time": "2018-04-10", "sugar": "1.0", "deviceImei": null}, {
        //       "timeType": "1",
        //       "time": "2018-04-09",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }]
        //   }]
        // }, {
        //   "time": "2018-04-10",
        //   "sugarInfoShow": [{
        //     "timeType": "1",
        //     "sugarList": [{
        //       "timeType": "8",
        //       "time": "2018-04-11",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }, {"timeType": "1", "time": "2018-04-10", "sugar": "1.0", "deviceImei": null}, {
        //       "timeType": "1",
        //       "time": "2018-04-09",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }]
        //   }]
        // }, {
        //   "time": "2018-04-09",
        //   "sugarInfoShow": [{
        //     "timeType": "1",
        //     "sugarList": [{
        //       "timeType": "8",
        //       "time": "2018-04-11",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }, {"timeType": "1", "time": "2018-04-10", "sugar": "1.0", "deviceImei": null}, {
        //       "timeType": "1",
        //       "time": "2018-04-09",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }]
        //   }, {
        //     "timeType": "6",
        //     "sugarList": [{
        //       "timeType": "6",
        //       "time": "2018-04-09",
        //       "sugar": "11.0",
        //       "deviceImei": "777777777777777"
        //     }, {"timeType": "6", "time": "2018-04-09", "sugar": "11.0", "deviceImei": "777777777777777"}]
        //   }]
        // }],
        // 控制打印按钮显示的x ,y 方向的控制器
        xIndex:'-1',
        yIndex:'-1'
      }
    },
    methods:{
      // 鼠标移入显示打印按钮
      showPrint:function(xIndex,yIndex){
        this.xIndex = xIndex;
        this.yIndex = yIndex;
      },
      // 鼠标移出隐藏打印按钮
      hiddenPrint:function(){
        this.xIndex = '-1';
        this.yIndex = '-1';
      },
      showDialog:function(a,b,c,d){
        this.$emit('showDialog', a, b, c, d);
      }
    },
    props: ['sugerTestList','timeFrame'],
    created:function(){
      //console.log(this._props.sugerTestList);
      //console.log(this._props.timeFrame);
    }
  }
</script>
