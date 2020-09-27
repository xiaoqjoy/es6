<template>
  <div class="clearfix">
    <div class="pagination__box clearfix f__right">
      <span class="pagination__pre f__left icon " :class="{disabled:page.currentPage <= 1}" @click="pre">上一页</span>
      <ul class="clearfix pagination__list f__left">
        <li class="pagination__item f__left" :class="{active:page.currentPage <= 1}" @click="jump(1)">1</li>
        <li class="pagination__item f__left pagination__item-dot" v-show="middlePageNum[0] > 2" @click="reduceMorePage">...</li>
        <li class="pagination__item f__left" v-for="(n, index) in middlePageNum" :key="index" :class="{active:page.currentPage === n}" @click="jump(n)">{{n}}</li>
        <li class="pagination__item f__left pagination__item-dot" v-show="(pageNum - middlePageNum[middlePageNum.length-1]) > 1 " @click="addMorePage">...</li>
        <li class="pagination__item f__left" :class="{active:page.currentPage === pageNum }" v-if="pageNum !== 1 && pageNum !== 0" @click="jump(pageNum)">{{pageNum}}</li>
      </ul>
      <span class="pagination__next f__left icon" :class="{disabled:page.currentPage >= pageNum}" @click="next">下一页</span>
      <div class="pagination__jump clearfix f__left" v-if="page.showJumpButton">
        <span class="pagination__jump-title f__left">跳转到</span>
        <input type="text" class="pagination__input-ele f__left" v-model="jumpNum"
               @blur="checkJumpNum"
               @keyup="checkJumpNum"
               @onafterpaste="checkJumpNum"
               onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        <span class="f__left">页</span>
        <button class="pagination__jump-button f__left" @click="jump(jumpNum-0)">GO</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default{
      props: {
        page: {
          type: Object,
          default() {
            return {
              currentPage: 1,
              account: 0,
              pageSize: 10,
              showJumpButton: true
            };
          }
        }
      },
      data: function() {
        return {
          jumpNum: ''
        };
      },
      created: function() {
      },
      components: {},
      computed: {
        pageNum: function() {
          var accountPage = Math.ceil(this.page.account / this.page.pageSize);
          return accountPage;
        },
        middlePageNum: function() {
          var arr = [];
          if (this.pageNum > 2) {
            // 如果当前页面 是2,3,4
            if (this.page.currentPage <= 4 && this.pageNum <= 7) {
              for (let i = 2; i < this.pageNum; i++) {
                arr.push(i);
              }
            } else if (this.page.currentPage <= 4 && this.pageNum > 7) {
              for (let i = 2; i <= 6; i++) {
                arr.push(i);
              }
            } else if (this.page.currentPage > 4 && (this.pageNum - this.page.currentPage) >= 4) {
              for (let i = this.page.currentPage - 2; i <= this.page.currentPage + 2; i++) {
                arr.push(i);
              }
            } else if (this.page.currentPage > 4 && (this.pageNum - this.page.currentPage) <= 3 && this.pageNum <= 7) {
              for (let i = 2; i <= this.pageNum - 1; i++) {
                arr.push(i);
              }
            } else if (this.page.currentPage > 4 && (this.pageNum - this.page.currentPage) <= 3 && this.pageNum > 7) {
              for (let i = this.pageNum - 5; i <= this.pageNum - 1; i++) {
                arr.push(i);
              }
            }
            return arr;
          } else {
            return 0;
          }
        }
      },
      methods: {
        jump: function(index) {
          if (index !== this.page.currentPage && index) {
            this.$set(this.page, 'currentPage', index);
            this.$emit('jump-page', index);
          }
        },
        next: function() {
          if (this.page.currentPage < this.pageNum) {
            this.$set(this.page, 'currentPage', this.page.currentPage + 1);
            this.$emit('jump-page', this.page.currentPage);
          }
        },
        pre: function() {
          if (this.page.currentPage > 1) {
            this.$set(this.page, 'currentPage', this.page.currentPage - 1);
            this.$emit('jump-page', this.page.currentPage);
          }
        },
        checkJumpNum() {
          if (this.jumpNum > this.pageNum) {
            this.jumpNum = this.pageNum;
          }
        },
        addMorePage() {
          if ((this.page.currentPage + 5) > this.pageNum) {
            this.jump(this.pageNum);
          } else {
            this.jump(this.page.currentPage + 5);
          }
        },
        reduceMorePage() {
          if (this.page.currentPage - 5 < 1) {
            this.jump(1);
          } else {
            this.jump(this.page.currentPage - 5);
          }
        }
      }
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .pagination__box{
    line-height: 30px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  .pagination__pre{
    margin-right: 10px;
    width: 60px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
  .pagination__next{
    width: 60px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #e5e5e5;;
    border-radius: 5px;
  }
  .pagination__pre.disabled{
    cursor: not-allowed;
  }
  .pagination__next.disabled{
    cursor: not-allowed;
  }
  .pagination__item{
    min-width: 32px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin-right: 10px;
  }
  .pagination__item:hover,.pagination__jump-button:hover{
    border-color: #538BF1;
    color: #333333;
  }
  .pagination__item.pagination__item-dot{
    line-height: 23px;
    height: 32px;
  }
  .pagination__item.active{
    background: #538bf1;
    color: #fff;
    font-weight: bold;
    border: none;
  }
  .pagination__jump-title{
    margin: 0 10px 0 20px;
  }
  .pagination__input-ele{
    line-height: 25px;
    height: 25px;
    width: 40px;
    margin-right: 10px;
    border:none;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    color: #666;
  }
  .pagination__jump-button{
    height: 30px;
    width: 30px;
    padding: 0;
    margin-left: 10px;
    background: none;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    color: #666;
    cursor: pointer;
  }
</style>
