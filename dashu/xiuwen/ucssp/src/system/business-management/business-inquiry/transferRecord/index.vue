<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 1200px;
    height: 688px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #e5e5e5;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
    }
    /deep/.tables
    .el-table
    .el-table__body-wrapper
    .el-table__empty-block
    .el-table__empty-text {
      width: 50%;
      color: #909399;
      line-height: 60px;
    }
    // 表格总体样式
    .tables {
      overflow-y: auto;
      overflow-x: hidden;
      height: 400px;
      width: 1163px;
      margin: 0px auto;
      border: 1px solid #e5e5e5;
      margin-top: 21px;
      border-radius: 4px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">流转记录</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="flowList_"
          max-height="398"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="taskCode"
            label="阶段编号">
          </el-table-column>
          <el-table-column
            prop="taskName"
            label="阶段名称">
          </el-table-column>
          <el-table-column
            prop="dealByName"
            label="承办人">
          </el-table-column>
          <el-table-column
            prop="serviceName"
            label="承办机构">
          </el-table-column>
          <el-table-column
            prop="setupByName"
            label="调整人">
          </el-table-column>
          <el-table-column
            prop="chooseAction"
            label="选择动作">
          </el-table-column>
            <el-table-column
            width="100"
            prop="claimTime"
            label="任务获取时间">
          </el-table-column>
          <el-table-column
            width="100"
            prop="firstOperateTime"
            label="开始操作时间">
          </el-table-column>
          <el-table-column
            width="100"
            prop="endTime"
            label="提交时间">
          </el-table-column>
          <el-table-column
            prop="endDuration"
            label="当前阶段处理时间(分)">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  data() {
    return {};
  },
  methods: {
    // 关闭流转记录
    close_() {
      this.$emit("close_transfer");
    }
  },
  props: ["flowList_"],
  components: {}
};
</script>
