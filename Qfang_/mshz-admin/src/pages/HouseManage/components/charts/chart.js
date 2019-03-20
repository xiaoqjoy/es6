/**
 * Created by xiaoqi.
 */
import echarts from 'echarts';

var vm
var color = ['#627dd6', '#3dbcdf', '#eeb22e', '#fc7325', '#e84a49', '#6b2b81'];
var axisLabel = {
  show: true,
  textStyle: {
    color: '#5bc5c5'
  },
};

function propBar(data, dom, vm) {
  var option = {
    color: ['#f36868', '#2ccca7', '#edb344'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '65%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: data.dataList.heightCount, name: '偏高'},
          {value: data.dataList.normalCount, name: '正常'},
          {value: data.dataList.lowCount, name: '偏低'}
        ]
      }
    ]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};

export default {
  propBar: propBar
}
