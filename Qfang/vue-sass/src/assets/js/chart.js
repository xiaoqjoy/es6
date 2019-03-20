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
};//折线图xy轴颜色
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
      //xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      xdata.push(e.createTime.split(' ')[0]);
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

function curveBar(data, dom, vm){
  var option = {
    color: ['#3398DB'],
    xAxis: {
      type: 'category',
      data: data.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data.dataList,
      type: 'line',
      smooth: true
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
      //xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      xdata.push(e.createTime.split(' ')[0]);
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

function userYearBar(data, dom, vm){
  let arr = [];
  let keys = ['ageUnknow', 'age65', 'age55To65', 'age45To55', 'age35To45', 'age25To35', 'age18To25', 'age1To18',]; // 需要用到的后台返回字段数组
  keys.forEach(item => {
    arr.push(data.dataList[item])
  });
  var option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      formatter: "{b}: {c}%",
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      height: '300px',
      width: '80%',
      containLabel: true
    },
    yAxis : [
      {
        type : 'category',
        data : ['未知', '65岁以上',  '55-64岁',  '45-54岁', '35-44岁', '25-34岁', '18-24岁', '18岁以下'],
        axisTick: {
          alignWithLabel: true,
          show: false
        },
        axisLine: {
          show: false
        }
      }
    ],
    xAxis : [
      {
        type : 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    label: {
      normal: {
        show: true,
        position: 'right',
        textStyle: {
          color: 'black'
        },
        formatter: "{c} %"
      }
    },
    series : [
      {
        name: '用户年龄段',
        type:'bar',
        barWidth: '40%',
        data: arr,
        z: 10,
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#EEF1F6'
          }
        },
        silent: true,
        barWidth: '40%',
        barGap: '-100%', // Make series be overlap
        data: [100, 100, 100, 100, 100, 100, 100, 100]
      }
    ]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};

function typeBar(data, dom, vm){
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {d}%"
    },
    color: ['#4A91F8', '#EE4F7C', '#EDB344', '#2CCCA7', '#F36868', '#81AEF1'],
    // legend: {
    //   orient: 'vertical',
    //   x: 'left',
    //   //data:['未知','其他类型糖尿病','非糖尿病','Ⅰ型糖尿病','Ⅱ型糖尿病','妊娠型糖尿病']
    //   data: name
    // },
    series: [
      {
        name:'用户糖尿病类型',
        type:'pie',
        radius : '55%',
        center: ['50%', '40%'],
        data: data.dataList,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
};

function sexBar(data, dom, vm){
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {d}%"
    },
    color: ['#4A91F8', '#2CCCA7', '#F36868'],
    series: [
      {
        name:'性别',
        type:'pie',
        radius : '55%',
        center: ['50%', '40%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: data.dataList || [0, 0, 0]
        /*data:[
          {value:50, name:'男性'},
          {value:50, name:'女性'}
        ]*/
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
      //xdata.push(vm.formatDate(e.createTime).split(' ')[0]);
      xdata.push(e.createTime.split(' ')[0]);
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
  userYearBar: userYearBar,
  typeBar: typeBar,
  sexBar: sexBar,
  curveBar: curveBar,
  afterLine: afterLine
}
