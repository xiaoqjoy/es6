<template>
  <div>
    <div class="cascader-wrap">
      <button @click="toggle" type="button"
        class="el-button button__wrap ellipsis"
        :disabled="inputDisabled"
        :class="{isActive: open,'is-disabled':inputDisabled}">
        <span v-if="!content.length">{{placeholder}}</span>
        <span v-for="(item, index) in content"
          :key="item.value">
          {{item.label}}
          <span v-if="(content.length - 1) !== index">/</span>
        </span>
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
          </span>
        </span>
      </button>
      <!-- 下拉框模拟 -->
      <div v-show="open" class="cascader-dropdown">
        <!-- 已选择 -->
        <div class="cascader-selected">
          <span>已选择：</span>
          <span v-for="(item, index) in orgNavs"
            :key="item.value" @click="changeSel(item, index)"
            :title="item.label">
            {{item.label}}
            <span v-if="(orgNavs.length - 1) !== index">/</span>
          </span>
        </div>
        <div class="cascader-list">
          <ul v-if="currOrg.length">
            <li v-for="item in currOrg"
              :key="item.value" class="cascader-menu"
              @click="selectItem(item)">
              {{item.label}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinsM from '../js/emiter.js';
import { valueEquals } from '../js/util';
export default {
  name: 'cascader',
  mixins: [mixinsM],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 这个用于自定义组件上使用v-model语法糖
    value: {
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      open: false,
      currOrg: this.options,
      orgNavs: [],
      content: [],
      lastCon: '',
      inputVal: ''
    };
  },
  methods: {
    toggle() {
      // this.open = this.open ? this.hide() : this.show();
      this.open = !this.open;
    },
    show() {
      document.addEventListener('click', this.close, false);
      return true;
    },
    hide() {
      this.open = false;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.open = this.hide();
      }
    },
    selectItem(_item) {
      if (this.orgNavs[0] && this.orgNavs[0].children === null) {
        this.orgNavs = [];
        this.lastCon = '';
      }
      if (_item.children && _item.children.length) {
        this.currOrg = _item.children;
        this.orgNavs.push(_item);
        this.content = JSON.parse(JSON.stringify(this.orgNavs));
      } else if (this.orgNavs.indexOf(_item) === -1) {
        if (this.lastCon) {
          this.orgNavs.pop(_item);
          this.content = JSON.parse(JSON.stringify(this.orgNavs));
        }
        this.lastCon = _item.value;
        this.orgNavs.push(_item);
        this.content = JSON.parse(JSON.stringify(this.orgNavs));
        this.open = false;
        this.$emit('input', this.lastCon);
        this.emitChange(this.lastCon);
        this.dispatch('ElFormItem', 'el.form.change', [this.lastCon]);
      }
    },
    changeSel(_item, _i) {
      if (_i === this.orgNavs.length - 1 && _i) {
        return;
      }
      if (_i === 0) {
        this.currOrg = this.options;
        this.orgNavs = [];
      } else {
        if (_item.children && _item.children.length) {
          const obj = this.options.filter(_t => {
            return _t.value === _item.parentCode;
          });
          const orgNavs = this.orgNavs.slice(0, _i);
          this.orgNavs = orgNavs;
          this.currOrg = obj[0].children;
        }
      }
      this.content.length = 0;
      this.lastCon = '';
      this.$emit('input', this.lastCon);
      this.emitChange(this.lastCon);
      this.dispatch('ElFormItem', 'el.form.change', [this.lastCon]);
    },
    filterArea(_code, _list) {
      let arr = [];
      let hasFind = false;
      let findFn = (_code, _data) => {
        if (hasFind) return;
        arr.push(_data);
        if (_code === _data.value) {
          hasFind = true;
        } else if (!_data.children) {
          arr.splice(arr.length - 1, 1);
        } else {
          _data.children.forEach((v, i) => {
            findFn(_code, v);
            if (i === (_data.children.length - 1) && !hasFind) {
              arr.splice(arr.length - 1, 1);
            }
          });
        }
      };
      _list.forEach(v => {
        if (hasFind) return;
        findFn(_code, v);
      });
      return arr;
    },
    showData() {
      if (this.inputVal) {
        this.lastCon = this.inputVal;
        this.orgNavs = this.filterArea(this.inputVal, this.options);
        this.content = JSON.parse(JSON.stringify(this.orgNavs));
        if (this.orgNavs.length === 1 || this.orgNavs.length === 0) {
          this.currOrg = this.options;
          return;
        }
        this.currOrg = this.orgNavs[this.orgNavs.length - 2].children;
      }
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    }
  },
  computed: {
    // currOrg() {
    //   return this.options;
    // }
    __value: {
      get() {
        return this.value;
      },
      set(nVal) {
        this.$emit('input', this.nVal);
      }
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  created() {
    // console.log(this.options);
    // this.inputVal = this.value;
  },
  watch: {
    value(_newValue) {
      this.inputVal = _newValue;
      this.showData();
    },
    options(_new) {
      this.currOrg = _new;
      this.showData();
    }
  },
  // directives: {
  //   'click-outside': {
  //     bind: (el, binding, vnode) => {
  //       this.event = (e) => {
  //         if (!(el === e.target || el.contains(e.target))) {
  //           vnode.context[binding.expression](event);
  //         }
  //       };
  //       document.addEventListener('click', this.event);
  //     },
  //     unbind: (el) => {
  //       document.removeEventListener('click', this.event);
  //     }
  //   }
  // }
  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        function docClick(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el._vueClickOutside = docClick;
        document.addEventListener('click', docClick);
      },
      unbind: function(el, binding) {
        document.removeEventListener('click', el._vueClickOutside);
        delete el._vueClickOutside;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .cascader-wrap {
    position: relative;
    height: 42px;
    .button__wrap {
      position: relative;
      width: 100%;
      height: 42px;
      padding: 0 20px;
      line-height: 40px;
      border: 1px solid @line-color;
      background: none;
      color: @font-dark;
      transition: all 0.3s;
      text-align: left;
      .icon {
        position: absolute;
        transform: rotateZ(180deg);
        right: 5px;
      }
    }
    button.el-button.is-disabled {
      background-color: #F5F7FA;
      border-color: #E4E7ED;
      color: #C0C4CC;
    }
    .button__wrap.isActive {
      border-color: @blue-light;
      .icon {
        transform: rotateZ(0);
      }
    }
    .cascader-dropdown {
      position: absolute;
      width: 100%;
      z-index: 99;
      margin: 5px 0;
      height: 200px;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid #E4E7ED;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      .cascader-menu, .cascader-selected {
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        padding: 0 30px 0 20px;
      }
      .cascader-selected {
        border-bottom: 1px solid #E4E7ED;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cascader-list {
        height: 164px;
        overflow: auto;
      }
    }
  }
</style>
