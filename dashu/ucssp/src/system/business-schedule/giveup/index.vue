<style lang="less" scoped>
  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .dialog-box {
    // width: 550px;
  }
  .giveup {
    line-height: 1.428;
    font-size: 14px;
    color: #151515;
    width:100%;
    text-align: center;
    /deep/ .el-checkbox{
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        color:#000;
    }
    /deep/ .el-checkbox+.el-checkbox{
        margin-left: 0;
    }
    .el-button{
        margin-top: 20px;
        width: 200px;
        height: 40px;
    }
  }
</style>
<template>
  <div class="dialog-wrap">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">请选择需要放弃的业务</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="giveup">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <!-- v-model="item.checked" -->
              <el-checkbox :disabled="!item.availableInd" v-for="(item,i) in tableData" :key='i' :label="item.productId">{{item.productName}}</el-checkbox>
            </el-checkbox-group>
          <el-button type="primary" size="medium" @click="toggleSelection()">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { businessApi } from '../js/server.js';
export default {
  props: {
    row: Object
  },
  data() {
    return {
        checkedCities: [],
        tableData: [],
        checked: true,
        params: {}
    };
  },
  methods: {
    // handleCheckedCitiesChange(val) {
    //   this.params = [];
    //   if (val.length === 2) {
    //     val.forEach(element => {
    //       this.params.push({'applicationId': this.row.applicationId, 'productId': element});
    //     });
    //   } else if (val.length === 1) {
    //     this.params.push({'applicationId': this.row.applicationId, 'productId': val[0]});
    //   } else {
    //     this.params = [];
    //   }
    // },
    handleCheckedCitiesChange(val) {
      this.params = {};
      this.params.applicationId = this.row.applicationId;
      this.params.taskDefKey = this.row.cusGiveUpKey;
      this.params.productId = [];
      if (val.length === 2) {
        val.forEach(element => {
          this.params.productId.push(element);
        });
      } else if (val.length === 1) {
        this.params.productId.push(val[0]);
      } else {
        this.params = {};
      }
    },
    toggleSelection() {
      if (this.params.applicationId) {
        this.$confirm('是否确定放弃该笔业务?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$MyFetch.post(businessApi.giveUp, this.params)
          .then((data) => {
              this.$message({
                type: 'success',
                message: '放弃成功!'
              });
              this.close();
          })
          .catch((e) => {
            this.$error(e.message);
            this.close();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消放弃'
          });
          this.close();
        });
      } else {
         this.$message({
            message: '请选择需要放弃的产品'
          });
      };
    },
    close() {
      this.$emit("close");
    },
    getData() {
      this.$MyFetch.get(businessApi.giveUpList, {
        applicationId: this.row.applicationId
      })
      .then((data) => {
        this.tableData = data || {};
      })
      .catch((e) => {
        this.$error(e.message);
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
