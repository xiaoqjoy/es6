<template>
  <div>
    <div class="total positionContent">
      <div class="sysTab">
        <ul>
          <li class="actives">统计数据</li>
        </ul>
      </div>
      <div class="homePage-top pr">
        <p>关键指标</p>
        <ul>
          <li>
            <dl>
              <dt><span class="one">{{ customerIndex.totalHospitalCount || 0}}</span>个</dt>
              <dd>机构</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="four">{{ customerIndex.customerCount || 0 }}</span>人</dt>
              <dd>患者</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="five">{{ customerIndex.testCount || 0 }}</span>个</dt>
              <dd>血糖数据</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="six">{{ customerIndex.followCount || 0 }}</span>次</dt>
              <dd>随访</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="seven">{{ customerIndex.interventionCount || 0 }}</span>次</dt>
              <dd>干预</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="five">{{ customerIndex.remindCount || 0 }}</span>次</dt>
              <dd>提醒</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div class="main_Sec" style="background: white">
        <div class="topse">
          <ul>
            <li v-for="(it,index) in my_bloods" :class="{'actives':nowBlod == index}" @click="bloodSur(index)">{{it}}</li>
          </ul>
        </div>
        <!--血糖-->
        <div class="bloodSurg">
          <div class="timeC">
            <ul>
              <li class="fir">时间选择：</li>
              <li v-for="(a,index) in timeChose" :class="{'actives_':MyTimeChose1 == index}" @click="ChangeTime(index)">{{a}}</li>
            </ul>
          </div>
          <div class="chartContent">
            <div class="chartRight">
              <div class="unit">单位：人</div>
              <div class="chartTwo">
                <chart :params="lineChart"></chart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_Sec">
        <div class="chart">
          <p>用户糖尿病类型占比</p>
          <chart :params="typeBar"></chart>
        </div>
        <div class="chart">
          <p>用户年龄段分布</p>
          <chart :params="userYearBar"></chart>
        </div>
        <div class="chart chart1">
          <p>性别比例</p>
          <chart :params="sexBar"></chart>
        </div>
      </div>
      <div class="main_Sec" style="background: white">
        <p>详细数据</p>
        <div class="bloodSurg">
          <div class="timeC">
            <ul>
              <li class="fir">时间选择：</li>
              <li v-for="(a,index) in timeChose" :class="{'actives_':MyTimeChose == index}" @click="timeChoses(index)">
                {{a}}
              </li>
            </ul>
          </div>
          <div class="detail_data">
            <el-table
              :data="InfoListData">
              <el-table-column
                fixed
                prop="fileNumber"
                label="序号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="hospitalName"
                label="机构名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="customerCount"
                label="机构患者"
                align="center">
              </el-table-column>
              <el-table-column
                prop="testCount"
                label="血糖数据统计"
                align="center">
              </el-table-column>
              <el-table-column
                prop="interventionCount"
                label="干预次数统计"
                align="center">
              </el-table-column>
              <el-table-column
                prop="followCount"
                label="随访次数统计"
                align="center">
              </el-table-column>
              <el-table-column
                prop="remindCount"
                label="提醒次数统计"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import baseMixin from '../mixin/BaseMixin'
  import funBus from '../../assets/js/funBus'
  export default {
    mixins: [baseMixin],
    data() {
        return {
          timeChose: ['最近7天', '最近30天', '最近90天'],
          MyTimeChose1: 0,
          MyTimeChose: 0,
          my_bloods: ['新增患者','总患者','新增数据','总数据'],
          nowBlod: 0,
          InfoListData: [],
          customerIndex: {},
          chart: null,
          //用户年龄段分布
          userYearBar: {
            name: '',
            data: {dataList:{}},
            style: {},
            list: [],
            className: 'userYearBar',
            random: 0
          },
          //性别比例
          sexBar: {
            name: '',
            data: {dataList:[]},
            style: {},
            list: [],
            className: 'sexBar',
            random: 0
          },
          //用户糖尿病类型占比
          typeBar: {
            name: '',
            data: {dataList: [] },
            style: {},
            list: [],
            className: 'typeBar',
            random: 0
          },
          //患者数据管理
          lineChart: {
            name: '',
            data: {dataList:[], xAxisData: []},
            style: {},
            list: [],
            className: 'curveBar',
            random: 0,
          },
          currentType: 'customerCount',
          lineChartDataList: {
            customerCount: [],
            totalCustomerCount: [],
            testCount: [],
            totalTestCount: []
          },
          defaultData: [
            {
              age1To18:0,
              age18To25:0,
              age25To35:0,
              age35To45:0,
              age45To55:0,
              age55To65:0,
              age65:0,
              ageUnknow:0,
              diabetesName:"其他类型糖尿病",
              organizationIds:0,
              sex:0,
              sexCount:0,
              diabetesCount:0
            },
            {
              age1To18:0,
              age18To25:0,
              age25To35:0,
              age35To45:0,
              age45To55:0,
              age55To65:0,
              age65:0,
              ageUnknow:0,
              diabetesName:"非糖尿病",
              organizationIds:0,
              sex:0,
              sexCount:0,
              diabetesCount:0
            },
            {
              age1To18:0,
              age18To25:0,
              age25To35:0,
              age35To45:0,
              age45To55:0,
              age55To65:0,
              age65:0,
              ageUnknow:0,
              diabetesName:"1型糖尿病",
              organizationIds:0,
              sex:0,
              sexCount:0,
              diabetesCount:0
            },
            {
              age1To18:0,
              age18To25:0,
              age25To35:0,
              age35To45:0,
              age45To55:0,
              age55To65:0,
              age65:0,
              ageUnknow:0,
              diabetesName:"2型糖尿病",
              organizationIds:0,
              sex:0,
              sexCount:0,
              diabetesCount:0
            },
            {
              age1To18:0,
              age18To25:0,
              age25To35:0,
              age35To45:0,
              age45To55:0,
              age55To65:0,
              age65:0,
              ageUnknow:0,
              diabetesName:"妊娠型糖尿病",
              organizationIds:0,
              sex:0,
              sexCount:0,
              diabetesCount:0
            }
          ]
        }
    },
    methods: {
      //患者数据切换
      bloodSur(index){
        let tempArr = ['customerCount', 'totalCustomerCount', 'testCount', 'totalTestCount'];
        this.nowBlod = index;
        this.currentType = tempArr[index];
        this.lineChart.data.dataList = this.lineChartDataList[tempArr[index]];
      },
      ChangeTime(index) {
        this.MyTimeChose1 = index;
        let temArr = [7, 30, 90];
        this.getStatisticDataByDay(temArr[index]);
      },
      //患者数据时间切换
      timeChoses(index){
        let temArr = [7, 30, 90];
        this.MyTimeChose = index;
        this.InfoList(temArr[index]);
      },
      // 获取机构统计
      getOrgStatistic () {
        //统计 关键指标接口
        this.$api.customerIndex({}, res =>{
          this.customerIndex = res.data.data;
        });
      },
      // 统计折线图数据获取
      getStatisticDataByDay(number){
        //this.nowBlod = 0;
        let timeObj = funBus.getDaySomedayAgo(number);
        let data = {
          type: 1,
          startTime: timeObj.startTime,
          endTime: timeObj.endTime
        }
        this.$api.OrgStatisticByDay(data, res => {
          this.lineChartDataList.customerCount = [];
          this.lineChartDataList.totalCustomerCount = [];
          this.lineChartDataList.testCount = [];
          this.lineChartDataList.totalTestCount = [];
          this.xAxisData = [];
          res.data.data.map(item => {
            this.lineChartDataList.customerCount.push(item.customerCount);
            this.lineChartDataList.totalCustomerCount.push(item.totalCustomerCount || 0);
            this.lineChartDataList.testCount.push(item.testCount);
            this.lineChartDataList.totalTestCount.push(item.totalTestCount || 0);
            this.xAxisData.push(item.title.substring(5,10).replace('月', '-'));
            return;
          });
          this.lineChart.data.dataList = this.lineChartDataList[this.currentType];
          this.lineChart.data.xAxisData = this.xAxisData;
        });
      },
      // 获取用户糖尿病类型占比
      getDiabetesTypePercentage () {
        this.$api.userSugarType({}, res=>{
          let typeBar = (res.data.data && res.data.data.length > 0) ? res.data.data : this.defaultData;
          for(var i = 0; i < typeBar.length; i++){
            typeBar[i].name = typeBar[i].diabetesName;
            typeBar[i].value = typeBar[i].diabetesCount;
            delete typeBar[i].diabetesName;
            delete typeBar[i].diabetesCount;
            delete typeBar[i].diabetesType;
          }
          this.typeBar.data.dataList = typeBar;
        });
      },
      // 获取年龄段占比
      getAgePercentage () {
        this.$api.userYearType({}, res => {
          this.userYearBar.data.dataList = res.data.data ? res.data.data : this.defaultData[0];
        });
      },
      // 获取性别占比
      getGenderPercentage () {
        this.$api.sexProp({}, res => {
          //let itemName = ['未知', '男性', '女性'];
          let temArr = (res.data.data && res.data.data.length > 0) ? res.data.data : [{sex: 0, sexCount: 0}, {sex: 1, sexCount: 0},{sex: 2, sexCount: 0}];
          let arr = [];
          var total = 0;
          for(var i = 0; i < temArr.length; i++){
            var obj = {};
            if(temArr[i].sex == 1){
              obj.name = '男性';
              obj.value = temArr[i].sexCount
              arr.push(obj)
            }else if(temArr[i].sex == 2){
              obj.name = '女性';
              obj.value = temArr[i].sexCount
              arr.push(obj)
            }else{
              total = total + temArr[i].sexCount;
            }
          }
          arr.push({
            name: '未知',
            value: total
          })
          this.sexBar.data.dataList = arr;
          });
      },
      // 统计页面表格详细数据
      InfoList(number){
        let date = new Date().toLocaleString()
        let today = date.replace(/\//g,'-').split(' ')[0]
        let timeObj = funBus.getDaySomedayAgo(number);
        this.valueTime = today;
        let data = {
          type: 1,
          startTime: timeObj.startTime,
          endTime: timeObj.endTime
        };
        this.$api.detailData(data, res =>{
          this.InfoListData = res.data.data.map((item, index) => {
            item.fileNumber = index + 1;
            return item;
          });
          //_this.customerCount = res.data.data
        });
      }
    },
    created(){
      this.getDiabetesTypePercentage();
      this.getAgePercentage();
      this.getOrgStatistic();
      this.getGenderPercentage();
      this.getStatisticDataByDay(7);
      //详细数据
      this.InfoList(7);
    }
  }
</script>
<style scoped lang="less">
  .homePage-top {
    border: 1px solid #eff2f5;
    width: 100%;
    box-sizing: border-box;
    height: 180px;
    background-color: #ffffff;
    margin: 19px auto;
    p {
      font-size: 15px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      text-indent: 15px;
    }
    ul {
      margin-top: 14px;
      height: auto;
      overflow: hidden;
      /*width: 80%;
      padding-left: 10%;*/
      li {
        float: left;
        width: 16.5%;
        text-align: center;
        dl {
          font-size: 18px;
          display: inline-block;
          cursor: pointer;
          dt {
            line-height: 60px;
            span {
              font-size: 30px;
            }
            .one {
              color: #267bf7;
            }
            .two {
              color: #00c2b1;
            }
            .three {
              color: #ac76e4;
            }
            .four {
              color: #44a3df;
            }
            .five {
              color: #e95959;
            }
            .six {
              color: #e98559;
            }
            .seven {
              color: #99D200;
            }
          }
        }
      }
    }
  }

  .timeC {
    padding-top: 20px;
    margin: 0 20px;
  }
  .chartContent {
    height: auto;
    overflow: hidden;
    width: 100%;
    .chartRight {
      float: left;
      width: 100%;
      position: relative;
      .unit {
        position: absolute;
        top: 22px;
        left: 6%;
        font-size: 12PX;
        color: #999;
      }
      .chartTwo {
        height: 300px;
      }
    }
    .chartLeft{
      float: left;
      width: 30%;
    }
  }

  .main_Sec {
    height: auto;
    overflow: hidden;
    margin-bottom: 20px;
    width: 100%;
    p{
      font-size: 15px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      text-indent: 15px;
    }
    .chart,
    .chart1 {
      float: left;
      height: 450px;
      background: #fff;
      width: 33%;
      margin-right: 1%;
    }
    .chart1 {
      width: 32%;
      margin-right: 0!important;
    }
    .bloodSurg {
      ul {
        display: inline-block;
        li {
          float: left;
          width: 80px;
          height: 24px;
          font-size: 14px;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
          margin-right: 10px;
        }
        .fir {
          cursor: auto;
          border: none;
          background: white;
          color: #000000;
        }
      }
      .surgeStatistics {
        .surgerNumber {
          padding-top: 20px;
          font-size: 24px;
          a {
            margin-left: 20px;
            i {
              color: #f36868;
            }
            em {
              color: #edb344;
            }
          }
        }
      }
      .detail_data{
        min-height: 400px;
        /*width: 100%;*/
        border-top: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        margin: 20px;
      }
    }
  }
  .topse {
    height: 55px;
    border-bottom: 1px solid #eff2f5;
  }

  .topse li {
    cursor: pointer;
    float: left;
    width: 110px;
    height: 52px;
    line-height: 52px;
    text-align: center;
  }
</style>
