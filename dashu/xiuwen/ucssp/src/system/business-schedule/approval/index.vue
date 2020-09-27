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
    width: 946px;
  }
  .approval {
    line-height: 1.428;
    font-size: 14px;
    color: #151515;
    label {
      color: #666;
    }
    .approval-head {
      display: flex;
      justify-content: space-between;
      /* overflow: hidden;
      .item {
        float: left;
        margin-right: 68px;
        &:last-child {
          margin-right: 0;
        }
      } */
    }
    .approval-content {
      margin-top: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 16px 8px;
      .item {
        margin-bottom: 10px;
        overflow: hidden;
        label {
          float: left;
          width: 74px;
        }
        div {
          margin-left: 74px;
        }
      }
    }
  }
</style>
<template>
  <div class="dialog-wrap">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">审批意见</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="approval">
          <div class="approval-head">
            <div class="item">
              <label>阶段名称：</label>
              <span>{{ approval.taskDefKey }}</span>
            </div>
            <div class="item">
              <label>机构名称：</label>
              <span>{{ approval.assignOrg }}</span>
            </div>
            <div class="item">
              <label>收到时间：</label>
              <span>{{ approval.startTime }}</span>
            </div>
            <div class="item">
              <label>完成时间：</label>
              <span>{{ approval.endTime }}</span>
            </div>
          </div>
          <div class="approval-content">
            <div class="item">
              <label>处理结果：</label>
              <div>{{ approval.opinionResult }}</div>
            </div>
            <div class="item">
              <label>否决原因：</label>
              <div>
                <p v-for="(item, index) in approval.combinations" :key="index">{{item.configTitle}}</p>
              </div>
            </div>
            <div class="item">
              <label>处理意见：</label>
              <div>{{ approval.opinionTxt }}</div>
            </div>
          </div>
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
      approval: {}
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getData() {
      this.$MyFetch.get(businessApi.getApproval, {
        applicationId: this.row.applicationId
      })
      .then((data) => {
        data = data || {};
        if (data && data.opinionResultCode) {
          if (data.opinionResultCode.toUpperCase() === "P") {
            data.opinionResult = "通过";
          }
          if (data.opinionResultCode.toUpperCase() === "D") {
            data.opinionResult = "否决";
          }
          if (data.opinionResultCode.toUpperCase() === "H") {
            data.opinionResult = "转超分贷";
          }
        }
        this.approval = data;
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
