<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 945px;
    height: 688px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
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
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
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
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
    // 表格总体样式
    .tables {
      overflow-y: auto;
      overflow-x: hidden;
      height: 400px;
      width: 900px;
      margin: 0px auto;
      border: 1px solid #d0d0d0;
      margin-top: 21px;
      border-radius: 4px;
      .headline_t {
        height: 40px;
        border: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 40px;
        width: 100%;
      }
      /deep/ .el-collapse {
        border-top: #ebeef5;
        border-bottom: #ebeef5;
      }
    }
    .pagination {
      margin-top: 40px;
      margin-right: 30px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">各阶段结论</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table :default-sort="{prop: 'date', order: 'descending'}" :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}" ref="multipleTable" :data="tableConclusions_" tooltip-effect="dark" height="398" style="width: 100%">
          <el-table-column width="100" prop="taskName" label="阶段名称">
          </el-table-column>
          <el-table-column width="100" prop="dealByName" label="处理人">
          </el-table-column>
          <el-table-column prop="claimTime" label="任务到达时间">
          </el-table-column>
          <el-table-column prop="endTime" label="提交时间">
          </el-table-column>
          <el-table-column prop="decisionAndOpinion" label="结论及意见备注">
            <template slot-scope="scope">
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <div class="headline_t" v-html="scope.row.decisionAndOpinion"></div>
                  </template>
                  <div v-html="scope.row.decisionAndOpinion"></div>
                </el-collapse-item>
              </el-collapse>
            </template>
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
    // 关闭各阶段结论
    close_() {
      this.$emit("close_conclusion");
    }
  },
  props: ["tableConclusions_"],
  components: {}
};
</script>
