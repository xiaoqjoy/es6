<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="product-title">
        <span class="product_title_head">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="product-content">
        <p>退回原因</p>
        <el-select v-model="value" placeholder="请选择" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="product-content-title">
          <span></span>
          备注
        </div>
        <textarea>房产查档单位客户本人提供，非我司人员陪同查询</textarea>
      </div>
      <el-button type="primary" class="remark_btn">确认退回</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    methods: {
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  }
};
</script>

<style lang="less" scoped>
.import-message{
  .dialog-box{
    width: 946px;
    height: 406px;
    .product-title{
    height: 60px;
  }
  .product_title_head{
    line-height: 80px;
    font-weight: bold;
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    width: 12.4px;
    font-weight: bold;
  }
  .product-content{
    margin: 9px;
    width: 886px;
    margin: 20px auto;
    > p {
      text-align: left;
      line-height: 40px;
      font-size: 12px;
      color: #BBBBBB;
      letter-spacing: 1.09px;
    }
    > .select {
      width: 886px;
      text-align: left;
    }
    > textarea {
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      resize: none;
      width: 886px;
      height: 102px;
    }
    .product-content-title{
      font-size: 14px;
      color: #333333;
      text-align: left;
      > span {
        border: 1px solid #538BF1;
        margin-right: 10px;
      }
      line-height: 50px;
    }
  }
  }
}
</style>
