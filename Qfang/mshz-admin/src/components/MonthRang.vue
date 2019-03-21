<template>
  <div @click.stop>
    <el-input class="el-date-editor" :class="'el-date-editor--month'" readonly :size="size" :placeholder="placeholder" v-model="val" @focus="visible=true" :validateEvent="false" ref="reference">
      <i slot="prefix" class="el-input__icon el-icon-date" @click="handleFocus">
      </i>
      <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="handleClickIcon" v-if="haveTrigger">
      </i>
    </el-input>
    <transition name="el-zoom-in-top">
      <div v-show="visible" class="el-picker-panel el-date-picker el-popper" :style="pickerStyle" x-placement="bottom-start">
        <div class="el-picker-panel__body-wrapper">
          <div class="el-picker-panel__body">
            <div class="el-date-picker__header el-date-picker__header--bordered">
              <button type="button" @click="prevYear" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left">
              </button>
              <span role="button" class="el-date-picker__header-label">{{ yearLabel }}</span>
              <button type="button" @click="nextYear" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right">
              </button>
            </div>
            <div class="el-picker-panel__content">
              <div class="month-div">
                <div class="item" :class="{active: isSelect(k)}" @click="selectMonth(k)" v-for="(v,k) in monthData" :key="k">
                  <a>{{v}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="popper__arrow" style="left: 35px;"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monthData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      visible: false,
      yearLabel: '',
      pickerStyle: {},
      selectClick: 0
    };
  },
  props: {
    placeholder: String, // input的placeholder
    size: String, // 大小
    // 数组，0是开始时间，1是结束时间，值是一个{year:Number,month:Number}的对象
    value: Array
  },
  watch: {
    // 监听显示
    visible(val) {
      if (val) {
        this.selectClick = 0;
        this.countStyle();
      }
    }
  },
  computed: {
    // 将时间数组格式化显示
    val() {
      let str = '';
      let startTime = this.selectValue[0];
      let endTime = this.selectValue[1];
      if (startTime && startTime.year && startTime.month) {
        str += startTime.year + '-' + startTime.month;
      }
      if (endTime && endTime.year && endTime.month) {
        str += ' 至 ' + endTime.year + '-' + endTime.month;
      }
      return str;
    },
    // 绑定v-model
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    haveTrigger() {
      return this.visible && this.val;
    }
  },
  created() {
    window.addEventListener('resize', this.countStyle);
    document.addEventListener('click', this.hidePicker);
    // 附值默认年份
    if (this.selectValue[1]) {
      this.yearLabel = this.selectValue[1].year;
    } else if (this.selectValue[0]) {
      this.yearLabel = this.selectValue[0].year;
    } else {
      this.yearLabel = new Date().getFullYear();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.countStyle);
    document.removeEventListener('click', this.hidePicker);
  },
  methods: {
    // 计算选择器的位置样式
    countStyle() {
      let position = this.$refs.reference.$el.getBoundingClientRect();
      let left = position.left;
      let top = position.top + position.height;
      this.pickerStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px',
        zIndex: '500'
      };
    },
    // 隐藏选择器
    hidePicker(e) {
      this.visible = false;
    },
    // 前一年
    prevYear() {
      this.yearLabel && this.yearLabel--;
    },
    // 后一年
    nextYear() {
      this.yearLabel++;
    },
    // 时间数组排序
    sortSelect() {
      this.selectValue.sort((a, b) => {
        return a.year === b.year ? (a.month - b.month) : (a.year - b.year);
      });
    },
    // 选择月份
    selectMonth(k) {
      this.selectClick++;
      if (this.selectClick === 1) {
        this.selectValue = [{
          year: this.yearLabel,
          month: k + 1
        }];
      } else if (this.selectClick === 2) {
        this.selectValue.push({
          year: this.yearLabel,
          month: k + 1
        });
        this.sortSelect();
        this.hidePicker();
      }
    },
    // 当前选择的时间给予active样式
    isSelect(k) {
      return !!this.selectValue.find(e => {
        return e.year === this.yearLabel && e.month === (k + 1);
      });
    },
    handleFocus() {
      this.$refs.reference.focus();
    },
    // 清空时间选择
    handleClickIcon() {
      this.selectValue = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.el-date-picker {
  position: relative;
}
.month-div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 3px;
    width: 73px;
    box-sizing: border-box;
    cursor: pointer;
    &.active {
      color: #fff;
      a {
        background: #008842;
        &:hover {
          color: #fff;
        }
      }
    }
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        color: #008842;
      }
    }
  }
}
</style>

