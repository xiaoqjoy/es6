<template>
  <section>
    <div class="pd-ten header">
      <el-row class="hg">
        <el-col :span="17">
          <h3 class="font-l pdl-ten">{{baseData.room.gardenName}}</h3>
        </el-col>
        <el-col :span="7" class="font-r pdr-20  p-re">
          <div class="festivel-box">
            <el-select placeholder="节假日" size="mini" v-model="festival" @change="selectDate">
              <el-option :label="item.festivalName" :value="item.dateString" v-for="(item,index) in FestivalList" :key="index"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <div class="flex-start ">
        <p class="content-item font-l pdl-ten hg c-9">
          <span class="content-item-label">楼栋：</span>{{baseData.room.buildingName}}
        </p>

        <p class="content-item font-l pdl-20 hg c-9">
          <span class="content-item-label">房号：</span>{{baseData.room.number}}
        </p>
      </div>
    </div>
    <div class="price-box">
      <calendar ref="calendar1" :events="calendar1.events" :lunar="calendar1.lunar" :value="calendar1.value" :begin="calendar1.begin" :end="calendar1.end" :weeks="calendar1.weeks" :months="calendar1.months" @select="changeEvents" @selectMonth="calendar1.selectMonth" @selectYear="calendar1.selectYear" @FestivalList="getFestivalList"></calendar>
      <!-- <button @click="changeEvents">异步更新Price</button>
      <button @click="calendar1.value=[2018,1,Math.floor(Math.random()*30+1)]">动态设置日期</button>
      <button @click="$refs.calendar1.setToday()">返回今天</button> -->
    </div>

  </section>
</template>

<script>
import Calendar from '../../../../components/Calendar/calendar.vue';
// import handelcalendar from '../../../../components/Calendar/calendar.js';
export default {
  data() {
    const today = (new Date()).toLocaleDateString();
    const endOrderDay = this.transferCouponValueTime(today, 90);
    const begin = today.split('/');
    const end = endOrderDay.split('-');
    let myDate = new Date();// 获得当前日期
    return {
      myDate,
      dialogPrice: false,
      festival: '',
      FestivalList: [
        {
          name: '',
          date: ''
        }
      ],
      modifiersPrice: '',
      dateObj: {},
      eventsArr: '',
      calendar1: {
        display: '',
        show: false,
        range: true,
        zero: true,
        lunar: true, // 显示农历
        value: begin, // 默认日期
        // lunar:true, //显示农历
        // weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        begin, // 可选开始日期
        end, // 可选结束日期
        events: {},
        select(value) {
          // console.log(value.toString());
        },
        selectMonth(month, year) {
          // console.log(year, month);
        },
        selectYear(year) {
          // console.log(year);
        },
        timestamp: Date.now()
      },
      festivalData: {
        lunar: {
          '1-1': '春节',
          '1-15': '元宵节',
          '2-2': '龙头节',
          '5-5': '端午节',
          '7-7': '七夕节',
          '7-15': '中元节',
          '8-15': '中秋节',
          '9-9': '重阳节',
          '10-1': '寒衣节',
          '10-15': '下元节',
          '12-8': '腊八节',
          '12-23': '祭灶节'
        },
        gregorian: {
          '1-1': '元旦',
          '2-14': '情人节',
          '3-8': '妇女节',
          '3-12': '植树节',
          '4-5': '清明节',
          '5-1': '劳动节',
          '5-4': '青年节',
          '6-1': '儿童节',
          '7-1': '建党节',
          '8-1': '建军节',
          '9-10': '教师节',
          '10-1': '国庆节',
          '12-24': '平安夜',
          '12-25': '圣诞节'
        }
      }
    };
  },

  props: ['roomId', 'baseData'],

  created() {
    this.getEveryDayPrice(this.roomId);
  },

  methods: {
    // 更新价格
    changeEvents(value) {
      // 改为与后台的格式相同
      if (+value[1] < 10) {
        value.splice(1, 1, '0' + value[1]);
      }
      if (+value[2] < 10) {
        value.splice(2, 1, '0' + value[2]);
      }
      // console.log(value);
      const present = value.join('-');
      // console.log(present);
      if (Object.values(this.calendar1.events).length > 0) {
        /* value 更新后跳到日期 present 日期 */
        this.handelePrice(value, present);
      }
    },

    // 接口开始 结束日期
    transferCouponValueTime(startDate, valueTime) {
      const date = new Date(startDate);
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      const year2 = newDate.getFullYear();
      const month2 = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      const day2 = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      return year2 + '-' + month2 + '-' + day2;
    },

    // 后去价格日历数据
    getEveryDayPrice(roomId) {
      // this.isCalendar = true;
      // this.transferCouponValueTime(, 90);
      const params = {
        startDate: this.calendar1.begin.join('-'),
        endDate: this.calendar1.end.join('-'),
        roomId: roomId
      };
      this.$axios.get('security/room/price/calendarEveryDay', { params })
        .then((res) => {
          if (res.data.status === 'C0000') {
            if (res.data.result && Object.values(res.data.result.map).length > 0) {
              this.dateObj = res.data.result.map;
              this.initEventsObj(this.dateObj);
            } else {
              this.$message.error('该房源还没设置价格');
            }
          } else {
            this.$message.error(res.data.message);
          }
        });
    },

    initRateArr() {
      // this.$set(this.calendar1.events['2018-01-23'], 'disabled', true);
      // this.$set(this.calendar1.events['2018-01-30'], 'disabled', true);
      this.eventsArr = Object.entries(this.calendar1.events);
      this.eventsArr.forEach((val, key) => {
        if (new Date(val[0]).toString() === (new Date('2018-01-01')).toString()) {
          this.startKey = key;
        }
        if (new Date(val[0]).toString() === (new Date('2018-04-01')).toString()) {
          this.endKey = key;
        }
      });
      this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
        // if (val[1].disabled) {
        //   return 0;
        // }
        return +val[1].price;
      });
    },

    initEventsObj(dateObj) {
      let tempArr = [];

      // 创建 calendar1.events 对象
      Object.values(dateObj).forEach((val) => {
        tempArr = tempArr.concat(val);
      });

      tempArr.forEach((val) => {
        // val.date = this.getYmd(val.date); // 去0
        this.$set(this.calendar1.events, val.date, val);
        // console.log(this.calendar1);
        // if (val.status !== '' && val.status !== 'CHECKED_OUT' && val.status !== null) {
        //   this.$set(this.calendar1.events[val.date], 'disabled', true);
        // } else {
        //   this.$set(this.calendar1.events[val.date], 'disabled', false);
        // }
      });
      tempArr = [];// 清空
      // console.log(this.calendar1.events, 'this.calendar1.events');
      // this.initRateArr();
    },

    handelePrice(date, present) {
      this.$prompt('设置价格', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,5}(\.\d+)?$/,
        inputErrorMessage: '范围是1到5位数'
      }).then(({ value }) => {
        this.$axios.post(
          '/security/room/price/savePrice',
          {
            date: present,
            price: value,
            roomId: this.roomId
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            if (res.data.result) {
              this.$set(this.calendar1.events[present], 'price', value);
              // this.calendar1.events[present].price = value;
              this.calendar1.value = date;
              this.$message({
                type: 'success',
                message: '保存成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              });
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
      }).catch(() => {

      });
    },

    selectDate(val) {
      // let today = new Date();// 获得当前日期
      // let year = today.getFullYear();// 获得年份
      let dateArr = val.split('-');
      // dateArr.unshift(year);
      this.calendar1.value = [+dateArr[0], +dateArr[1], +dateArr[2]];
    },

    getFestivalList(data) {
      this.FestivalList = data;
      // console.log(this.FestivalList);
    }

  },
  components: {
    'calendar': Calendar
  }
};
</script>

<style scoped>
.price-box {
  width: 100%;
}
.hg {
  height: 30px;
  line-height: 30px;
}
.header {
  background-color: #eeeeee;
}

.p-re {
  position: relative;
}
.festivel-box {
  position: absolute;
  top: 6px;
  right: 15px;
}
</style>
