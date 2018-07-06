/**
 * Created by yangying.
 */
import echarts from 'echarts';

var vm
var color = ['#627dd6', '#3dbcdf', '#eeb22e', '#fc7325', '#e84a49', '#6b2b81'];
var axisLabel = {
  show: true,
  textStyle: {
    color: '#5bc5c5'
  },
};//折线图xy轴颜色颜色
var methods = {
  min: function (array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] < array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
      }
    }
    return array[array.length - 1];
  },
  max: function (array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
      }
    }
    return array[array.length - 1];
  }
}
//空腹
function limosisBar(data, dom, vm) {
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

function limosisLine(data, dom, vm) {
  if(data.dataList){
    var xdata=[], ydata=[],low=[],high=[]
    data.dataList.forEach(function(e){
      xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      ydata.push(e.sugar);
    })
    for(var i=0;i<ydata.length+2;i++){
      low.push(3.9)
      high.push(3.1)
    }
  }
  var option = {
    tooltip:{
    },
    color: ['#267bf7'],
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xdata,
      boundaryGap : false,
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        },
      },

      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    series: [
      {
        symbolSize: 0,
        type: 'line',
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(0,0,0,0)'
          }
        },
        stack: '叠加',
        data: low
      },
      {
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        type: 'line',
        stack: '叠加',
        data: high
      },
      {
      symbolSize: 6,
      data: ydata,
      type: 'scatter'
    }]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};

function beforeBar(data, dom, vm) {
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

function beforeLine(data, dom, vm) {
  if(data.dataList){
    var xdata=[], ydata=[],low=[],high=[]
    data.dataList.forEach(function(e){
      xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      ydata.push(e.sugar);
    })
    for(var i=0;i<ydata.length+2;i++){
      low.push(3.9)
      high.push(3.1)
    }
  }
  var option = {
    color: ['#267bf7'],
    tooltip:{
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xdata,
      boundaryGap : false,
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    series: [
      {
        symbolSize: 0,
        type: 'line',
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(0,0,0,0)'
          }
        },
        stack: '叠加',
        data: low
      },
      {
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        type: 'line',
        stack: '叠加',
        data: high
      },
      {
      symbolSize: 6,
      data: ydata,
      type: 'scatter'
    }]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};

function afterBar(data, dom, vm) {
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

function afterLine(data, dom, vm) {
  if(data.dataList){
    var xdata=[], ydata=[],high=[],low=[]
    data.dataList.forEach(function(e){
      xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      ydata.push(e.sugar);
    })
    for(var i=0;i<ydata.length+2;i++){
      low.push(3.9)
      high.push(6)
    }
  }

  var option = {
    tooltip:{
    },
    color: ['#267bf7'],
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xdata,
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      boundaryGap : false,
      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        color: '#999',
        fontSize:'15px'
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },
    series: [
      {
        symbolSize: 0,
        type: 'line',
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(0,0,0,0)'
          }
        },
        stack: '叠加',
        data: low
      },
      {
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        areaStyle: {
          normal: {
            color: '#e5f9f7'
          }
        },
        type: 'line',
        stack: '叠加',
        data: high
      },{
      symbolSize: 6,
      data: ydata,
      type: 'scatter'
    }]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};
export default {
  limosisBar: limosisBar,
  limosisLine: limosisLine,
  beforeBar: beforeBar,
  beforeLine: beforeLine,
  afterBar: afterBar,
  afterLine: afterLine
}
