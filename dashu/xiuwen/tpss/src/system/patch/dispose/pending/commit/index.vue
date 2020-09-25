<template>
  <div>
    <div class="import-message3">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title bg__white">提示</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <div>确认需要提交该记录吗?</div>
      <div class="dialog-box-div">
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { patchApi } from '../../../js/server.js';
  export default {
    props: ['isDispose', 'siTaskId', 'remark', 'siBusinessId', 'refresh'],
    data() {
      return {
        url: ''
      };
    },
    methods: {
      submit() {
        if (this.isDispose) {
          let data = {
            handlerRemarkDesc: this.remark,
            siBusinessId: this.siBusinessId,
            siTaskId: this.siTaskId
          };
          this.$MyFetch.put(patchApi.dispose.newTasksPut, data)
          .then(data => {
            this.refresh(1, 10);
            this.close_();
            this.close_ABC();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
        } else {
          let data = {
            siTaskId: this.siTaskId,
            inspectorRemarkDesc: this.remark,
            siBusinessId: this.siBusinessId
            // siTaskId: this.siTaskId
          };
          this.$MyFetch.get(patchApi.review.submit, data)
          .then(data => {
            this.refresh(1, 10);
            this.close_();
            this.close_ABC();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
        };
      },
      close_ABC() {
        this.$emit("close_ABC");
      },
      close_() {
        this.$emit("clsoe_windowAlert");
      }
    },
    created() {
      console.log(this.refresh);
    }
  };
</script>

<style lang="less" scoped>
  .import-message3{
  .dialog-mask{
    z-index: 1004;
  }
  .dialog-box{
    z-index: 1005;
    width: 340px;
    height: 210px;
    .dialog-box__top{
      box-shadow: none;
      .title{
        font-weight: bold;
      }
    }
    .money{
      margin: 5px;
      color: @yellow;
    }
    .dialog-box-div{
      margin-top: 20px;
    }
    .dialog-box-div > button {
        width: 100px;
        height: 40px;
      }
    .dialog-box-btn{
        background: #F8F8F8;
        border: 1px solid #DDDDDD;
      }
  }
}
</style>
