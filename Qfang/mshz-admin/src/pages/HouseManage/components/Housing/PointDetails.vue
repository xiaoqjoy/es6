<template>
  <div class="point_item" :class="{active:isActive}">
    <div class="item_top">
      <h4 @click="selectPoint">{{title}}</h4>
      <span>{{distance}}米</span>
    </div>
    <div class="item_desc">
      {{desc}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: ['title', 'distance', 'desc', 'isActive'],
  created() {
  },
  methods: {
    selectPoint() {
      this.$emit('selectPoint');
    }
  }
};
</script>

<style lang="scss" scoped>
.point_item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  &:hover,
  &.active {
    .item_top {
      h4 {
        color: #137ebb;
      }
    }
  }
  .item_top {
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 14px;
      color: #333;
      transition: all 0.2s;
      cursor: pointer;
      width: 200px;
      line-height: 16px;
    }
    span {
      font-size: 12px;
      line-height: 16px;
      color: #000;
    }
  }
  .item_desc {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    line-height: 15px;
  }
}
</style>

