<template>
  <div class="tablePage">
    <table class="reportTable">
      <thead>
      <tr>
        <th rowspan="2" class="first pr">日期</th>
        <th colspan="2">早餐</th>
        <th colspan="2">午餐</th>
        <th colspan="2">晚餐</th>
        <th rowspan="2">睡前</th>
        <th rowspan="2">凌晨</th>
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
      <tbody v-if="sugerTestList.length==0">
        <td colspan="9" style="height: 60px; font-size: 14px; color: #999;">暂无数据</td>
      </tbody>
      <tbody v-else>
      <tr v-for="(item,index) in sugerTestList">
        <td>{{item.createTime}}</td>
        <td v-for="(infoItem,i) in timeFrame">
            <div style="height: 100%;width: 100%;display: block;cursor: pointer; " v-for="(infoSpan,timeTypeIndex) in item.sugarInfoShow" v-if="infoSpan.timeType == (i+1)" @mouseenter="showPrint(index,timeTypeIndex,infoSpan.sugarList)" @mouseleave="hiddenPrint(index,timeTypeIndex)">
              <el-dropdown style="width:100%">
                <div :class="infoSpan.sugarList[0].sugar<infoItem.minValue?'specialMin':infoSpan.sugarList[0].sugar>infoItem.maxValue?'specialMax':'specialNormal'" style="width:100%">
                  <span v-show="xIndex==index&&yIndex==timeTypeIndex" class="printButton" @click="showDialog(infoSpan?infoSpan.sugarList[0].sugar:'',infoItem.minValue,infoItem.maxValue,item.time)">打印</span>
                  <span>{{infoSpan?infoSpan.sugarList[0].sugar:''}}</span>
                  <span v-if="!infoSpan.sugarList[0].deviceImei">
                    <div class="bgImg icon_handwriting"></div>
                  </span>
                  <span class="pullDown" v-if="infoSpan.sugarList.length > 1">
                    <div class="bgImg icon_more"></div>
                  </span>
                </div>
                <el-dropdown-menu slot="dropdown" class='scrollBar sugarHover' style='max-width: 600px; max-height: 400px; overflow-y: auto;'>
                  <el-dropdown-item class="specialNormal hoverItem"  v-for="(surge,index) in sugarList" :key="index">
                    <span class="time">{{surge.time}}</span>
                    <span class="sugar" :class="surge.sugar<infoItem.minValue?'specialMin':surge.sugar>infoItem.maxValue?'specialMax':'normalColor'">{{surge.sugar}}　</span>
                    <span v-if="!surge.deviceImei">
                      <div class="bgImg icon_handwriting"></div>
                    </span>
                    <span >&nbsp;&nbsp;&nbsp;{{surge.remark}}</span>
                  </el-dropdown-item>
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
.sugarHover {
  margin-top: 0!important;
  .hoverItem {
    span {
      display: inline-block;
    }
    span.sugar {
      width: 30px;
      text-align: right;
    }
    span.time {
      width: 50px;
    }
  }
}

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
  .pullDown .icon_more {
    position: absolute;
    right: 0;
    bottom: -1px;
    width: 10px;
    height: 10px;
    background-position: -65px -13px;
  }
  .icon_handwriting {
    display: inline-block;
    width: 12px;
    height: 13px;
    background-position: -64px 2px;
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

  .reportTable td {
    border: 1px solid #d4d4d4;
    text-align: center;
    position: relative;
    height: 30px;
    line-height: 30px;
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
        yIndex:'-1',
        sugarList: [],
      }
    },
    methods:{
      // 鼠标移入显示打印按钮
      showPrint:function(xIndex,yIndex,sugarList){
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        
        //获取血糖备注
        let testIds = [];
        for (let i = 0, len = sugarList.length; i < len; i++) {
        	testIds.push(sugarList[i].testId);
        }
        this.$api.getSugarTestByTestId({testIds:testIds}, res=>{
          if(res.data.code == 0){
            //this.sugarList = res.data.data;
            let remaks = res.data.data;
            for (let i = 0, len = sugarList.length; i < len; i++) {
              
              //去掉时间内的秒针
              if(sugarList[i].time.length>0){ //判断时间：避免异常数据(时间为长度0的数组)
                sugarList[i].time = sugarList[i].time.split(':').slice(0,2,1).join(':');
              }else {
                sugarList[i].time = '';
              }
              
              //添加备注
              for (let j = 0, lens = remaks.length; j < lens; j++) {
                if(sugarList[i].testId == remaks[j].testId){
                  let tn = remaks[j].typeName
                  sugarList[i].remark = tn != null && tn != '' ? tn : '无';
                  break;
                }
              }
            }
            this.sugarList = sugarList;
          }
        }, (error) => {
          //this.$message.error(error.data.errMsg);
          console.log(error);
        })
        
      },
      // 鼠标移出隐藏打印按钮
      hiddenPrint:function(){
        this.xIndex = '-1';
        this.yIndex = '-1';
        this.remark = [];
      },
      showDialog:function(a,b,c,d){
        this.$emit('showDialog', a, b, c, d);
      }
    },
    props: ['sugerTestList','timeFrame'],
    created:function(){
      //console.log(this.sugerTestList);
      //console.log(this.timeFrame);
    }
  }
</script>
