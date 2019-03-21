<template>
  <div class="box">
    <ul>
      <li>
        <p>入住率</p>
        <div id="myChart"></div>
      </li>
      <li>
        <p>空置30天以上占比
          <el-select v-model="value" size="mini" style="width: 160px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </li>
      <li>
        <p>销售占比</p>
      </li>
    </ul>
  </div>
</template>
<script>
import echarts from 'echarts';
import propCharts from './components/charts/chart';

export default {
  name: 'HouseTotal',
  components: {

  },
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  },
  mounted() {

  },
  created(){
    console.log(propCharts.propBar)
    var dom = document.getElementById('myChart');
    propCharts.init(dom);
    //myChart.setOption(this.option, true);
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.box{
  padding: 20px;
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  li{
    height: 228px;
    width: 32%;
    border-radius: 4px;
    background:rgba(255,255,255,1);
    p{
      width: 80%;
      margin: 0 10%;
      height: 52px;
      line-height: 52px;
      box-shadow:0px 4px 0px 0px rgba(244,247,245,1);
      font-size:16px;
      font-weight:bold;
      .el-select{
        float: right;
      }
    }
  }
}
}



</style>

