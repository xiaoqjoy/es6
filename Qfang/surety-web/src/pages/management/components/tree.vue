<template>
  <div class="select_tree" :class="bottom" @click="selectTree">选择菜单
    <el-tree
      v-if="tree"
      :data="data"
      :props="defaultProps"
      unselectable="on"
      node-key="id"
      :default-expanded-keys="[1]"
      show-checkbox
      :render-content="renderContent"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script>
export default {
  name: "tree",
  props: {},
  data() {
    return {
      bottom: "el-icon-caret-bottom",
      top: "el-icon-caret-top",
      tree: false,
      data: [
        {
          id: 1,
          label: "万通融资集团",
          flag: 1,
          className: "",
          children: [
            {
              label: "财务中心",
              flag: 1,
              children: [
                {
                  label: "二级 1-1-1",
                  flag: 1,
                  children: [
                    {
                      label: "三级 1-1-1",
                      flag: 3
                    }
                  ]
                }
              ]
            },
            {
              label: "广州中安",
              flag: 1,
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            },
            {
              label: "深圳万通",
              flag: 1,
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            },
            {
              label: "行政人力中心",
              flag: 1,
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            },
            {
              label: "珠海万通",
              flag: 1,
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  create() {},
  methods: {
    close() {
      this.$emit("hideAddUser", false);
    },
    //打开集团树
    selectTree() {
      if (this.tree == false) {
        this.tree = true;
      } else {
        this.tree = false;
      }
    },
    //集团树 图标加减
    handleNodeClick(data) {
      if (data.flag == 1) {
        data.flag = 2;
      } else if (data.flag == 2) {
        data.flag = 1;
      } else {
        return;
      }
    },
    //集团树 遍历图标
    renderContent(h, { node, data, store }) {
      let html;
      if (data.flag == 1) {
        html = (
          <span>
            <i class="icon iconfont icon-jia" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.flag == 2) {
        html = (
          <span>
            <i class="icon iconfont icon-jian" />
            <span>{node.label}</span>
          </span>
        );
      } else {
        html = (
          <span>
            <i class="icon iconfont icon-fuhao" />
            <span>{node.label}</span>
          </span>
        );
      }
      return <div>{html}</div>;
    }
  }
};
</script>

<style scoped lang="less">
.el-tree {
  width: auto;
  padding-right: 22px;
  background-color: #f3f3f3;
  border: solid 1px #e5e5e5;
  z-index: 99;
  position: absolute;
  left: -1px;
}
.select_tree {
  width: 120px;
  height: 30px;
  display: inline-block;
  border-radius: 2px;
  border: solid 1px #999999;
  vertical-align: bottom;
  font-size: 14px;
  line-height: 30px;
  padding: 0 6px;
  cursor: pointer;
}
.el-icon-caret-bottom {
  position: relative;
}
.el-icon-caret-bottom:before {
  position: absolute;
  right: 7px;
}
</style>
