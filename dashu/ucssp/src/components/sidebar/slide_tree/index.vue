<template>
    <div class="tree">
      <ul class="list">
        <li class="item" v-for="(item, i) in treeData" :key="i">
          <div class="link"  @click="handlerClick(item)" :class="{'first-link': (index === 0), 'active':item.showChild}">
            <img :src="'./static/icon/' + item.iconVal + (item.showChild? '_active' : '') + '.png'" alt="" class="icon img__icon" v-if="index === 1 && !!item.iconVal">
            <span class="icon img__icon" v-if="index === 1 && !item.iconVal"></span>
            <span
              class="text"
              :title="item.menuName"
              :class="{'level-low': (index > 1)}">{{item.menuName}}</span>
            <i class="icon icon__arrow el-icon-arrow-down" v-if="item.data && item.data.length > 0"></i>
          </div>
          <el-collapse-transition>
            <div
              :style="{'padding-left': (((index === 0) ? 0 :(index === 1 ? 30 : 15)) + 'px')}"
              v-show="item.showChild"
              v-if="(item.data && item.data.length > 0)"
              class="tree__child">
              <slide-tree
                :index="index+1"
                :tree-data="item.data"
                ></slide-tree>
            </div>
          </el-collapse-transition>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'slideTree',
    componentName: 'slideTree',
    props: {
      treeData: {
        type: Array,
        default() {
          return [];
        }
      },
      index: {
        type: Number
      }
    },
    data() {
      return {};
    },
    created() {
      this.addShow(this.treeData);
    },
    methods: {
      addShow(arr) {
        arr.forEach(v => {
          this.$set(v, 'showChild', false);
        });
      },
      handlerClick(obj) {
        if (obj.showChild && obj.page) return;
        obj.showChild = !obj.showChild;
        if (obj.page) {
          this.$router.push({path: "/system/" + obj.page.pageUrlVal});
        }
        this.closeSibling(obj.menuId);
      },
      // 关闭同级激活状态
      closeSibling(menuId) {
        for (let i = 0; i < this.treeData.length; i++) {
          if (this.treeData[i].menuId !== menuId) {
            close(this.treeData[i]);
          }
        }
        function close(obj) {
          obj.showChild = false;
          if (obj.data.length > 0) {
            for (let i = 0; i < obj.data.length; i++) {
              close(obj.data[i]);
            }
          }
        }
      }
    },
    components: {}
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .tree{
    text-align: left;
    .list{
      .item{
        position: relative;
        background: #F2F4F8;
        .link{
          display: inline-block;
          height: 40px;
          width: 100%;
          line-height: 40px;
          color: @font-dark;
          text-decoration: none;
          font-size: 0;
          cursor: pointer;
          .img__icon{
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-left: 15px;
            margin-right: 10px;
            vertical-align: middle;
          }
          .text{
            display: inline-block;
            max-width: 144px;
            font-size: 14px;
            white-space: nowrap;
          }
          .text.level-low{
            color: #666;
          }
          .icon__arrow{
            position: absolute;
            right: 15px;
            top: 0;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            transition: all 0.3s;
            color: #BCBCBC;
          }
        }
        .link.active{
          .text{
            color: @blue-light;
          }
          .icon__arrow{
            transform: rotate(180deg);
          }
        }
        .link.first-link {
          height: 48px;
          line-height: 48px;
          background: @white;
          padding: 0 15px;
          .text{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 600;
          }
          .icon__arrow{
            height: 48px;
            line-height: 48px;
          }
        }
        .tree__child{
          overflow: visible!important;
        }
      }
    }
  }
</style>
