<template>
  <div @click.stop class="el-select">
    <el-input readonly :size="size" :placeholder="placeholder" @mouseenter.native="inputHovering = true"
     @mouseleave.native="inputHovering = false" v-model="inputValue" @focus="handleFocus"
      :validateEvent="false" ref="reference">
      <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="handleClear" v-if="inputHovering&&inputValue">
      </i>
      <i slot="suffix" v-else class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse':visible}" @click="handleClickIcon"></i>
    </el-input>
    <transition name="el-zoom-in-top">
      <div v-show="visible" class="el-select-dropdown el-popper" :style="pickerStyle" x-placement="bottom-start">
        <div class="tree-div">
          <el-tree :props="props" ref="tree" :node-key="nodeKey" :load="loadNode" lazy accordion
           @node-click="handleNodeClick" header-align="center"  
          :expand-on-click-node="false" check-on-click-node highlight-current>
          </el-tree>
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
      visible: false, // 下拉显示
      pickerStyle: {}, // 下拉框样式
      inputHovering: false,
      selectNodeKey: null, // 选中的node Id
      selectNode: {},
      props: {
        label: 'name',
        children: 'children'
      }
    };
  },
  props: {
    placeholder: String, // input的placeholder
    size: String, // 大小
    value: String,
    nodeKey: {
      type: String,
      default: 'id'
    }
  },
  watch: {
    // 监听显示
    visible(val) {
      if (val) {
        this.countStyle();
      }
    },
    value(val) {
      if (!val) {
        this.handleClear();
      }
    }
  },
  computed: {
    // 绑定v-model
    inputValue: {
      get() {
        return this.selectNode.name;
      },
      set(val) {
        this.$emit('input', this.selectNodeKey);
      }
    }
  },
  created() {
    window.addEventListener('resize', this.countStyle);
    document.addEventListener('click', this.hidePicker);
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
      let minWidth = position.width;
      this.pickerStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px',
        minWidth: minWidth + 'px',
        zIndex: '500'
      };
    },
    // 清空按钮
    handleClear() {
      this.selectNodeKey = null;
      this.selectNode = {};
      this.inputValue = '';
      this.$refs.tree.setCurrentKey(null);
      this.visible = false;
      this.$emit('change', this.selectNodeKey);
    },
    // 选中
    handleNodeClick(data, node, a) {
      this.selectNode = node.data;
      this.selectNodeKey = node.data[this.nodeKey];
      this.inputValue = node.data.name;
      this.$emit('change', this.selectNodeKey);
      this.hidePicker();
    },
    // 加载数据
    loadNode(node, resolve) {
      this.$axios.get('security/org/queryOrgTree', {
        params: node.level === 0 ? {} : {
          parentId: node.data.id
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          return resolve(res.data.result);
        }
      });
    },
    handleFocus() {
      this.visible = !this.visible;
      setTimeout(() => {
        this.$refs.reference.blur();
      });
    },
    // 隐藏选择器
    hidePicker(e) {
      this.visible = false;
    },
    // 切换显示下拉
    handleClickIcon() {
      this.visible = !this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-div {
  padding: 10px;
}
</style>

<style lang="scss">
.tree-div {
  .el-tree-node__label {
    font-size: 12px;
  }
}
</style>


