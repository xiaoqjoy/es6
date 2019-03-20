<template>
  <div :class="status == 1 ? 'box_tabs' : ''">
    <div :class="status == 1 ? 'tabs_a' : 'tabs_b'">
      <ul>
        <li v-for="(value,index) in tabsData" :class="index == tabIndex ? 'active' : ''"  @click="switchTabs(index)">
          {{ value }}
          <i class="el-icon-close" v-if="index == tabIndex" @click.stop="deleteTabs(index)"></i>
        </li>
        <li class="add" @click="addTabs">
          <i class="icon iconfont icon-jia"></i>
        </li>
        <li v-if="status == 1" class="shrink">
          收缩<i class="el-icon-arrow-down"></i>
        </li>
      </ul>
    </div>
    <slot name="info"></slot>
  </div>
</template>

<script>


export default {
  data(){
    return {
      tabIndex: 1    //固定默认每次只传2个tab项过来
    };
  },

  // props: {
  //   status: {
  //     type: Number,
  //     default: () => []
  //   },
  //   tabsData: {
  //     type: Array,
  //     default: () => []
  //   }
  // },

  props: ['status','tabsData'],
  mounted(){
  },
  created(){

  },
  methods:{
    addTabs(){
      let arr = this.tabsData,
          len = arr.length,
          str = arr[len-1].substring(0,2),
          tab = str + (len+1);

      this.tabsData.push(tab)
    },
    deleteTabs(){
      if(i == 0){
        return
      }
      function truncate(arr) {
        return arr.slice(0,-1);
      }
      this.tabsData = truncate(this.tabsData)
    },
    switchTabs(i){
      this.tabIndex = i;
    }
  }
};
</script>

<style scoped lang="less">
.box_tabs{
  width: 100%;
  height: auto;
  padding-bottom: 12px;
  border: 1px solid #e5e5e5;
  margin-top: 15px;
  }
  .tabs_b{
    height: 30px;
    line-height: 30px;
    text-indent: 15px;
    border-bottom: 1px solid #e5e5e5;
    margin: 15px 1%;
    width: 98%;
    ul{
      li{
        width: 100px;
        height: 30px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        border: 1px solid #e5e5e5;
        float: left;
      }
      li:first-child{
        position: relative;
        right: -1px;
      }
      li.active{
        border-bottom: 1px solid white;
        i{
          cursor: pointer;
        }
      }
      li.add{
        text-align: left;
        font-size: 12px;
        color: #0958a5;
        cursor: pointer;
        border: none;
      }
      li.shrink{
        float: right;
        cursor: pointer;
      }
    }
  }
  .tabs_a{
    height: 48px;
    line-height: 48px;
    text-indent: 15px;
    background: #eeeeee;
    margin-bottom: 15px;
    ul{
      li{
        width: 100px;
        height: 48px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }
      li.active{
        border-top: 2px solid #0958a5;
        background: white;
        i{
          cursor: pointer;
        }
      }
      li.add{
        text-align: left;
        font-size: 12px;
        color: #0958a5;
        cursor: pointer;
      }
      li.shrink{
        float: right;
        cursor: pointer;
      }
    }
  }


</style>
