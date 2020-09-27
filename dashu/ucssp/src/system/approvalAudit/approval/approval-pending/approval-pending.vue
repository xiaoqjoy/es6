<template>
  <div class="approvalAudit">
    <div class="content">
      <!-- 头 -->
      <div class="content_head">
        <el-row :gutter="50">
          <el-col :span="5">
            <div>
              <span class="content_title">队列任务总计：</span>
              <span class="title_num">{{data.taskSum}}</span>
              <span class="title_tail">笔</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div>
              <span class="content_title">本人待处理业务：</span>
              <span class="title_num">{{data.unhandledSum}}</span>
              <span class="title_tail">笔</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div>
              <span class="content_title">本人当日被退回：</span>
              <span class="title_num">{{data.returnedSum}}</span>
              <span class="title_tail">笔</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div>
              <span class="content_title">本人当日已提交：</span>
              <span class="title_num">{{data.finishSum}}</span>
              <span class="title_tail">笔</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div>
              <span class="content_title">取单:</span>
              <el-switch v-model="status" @change="switchEvent" :width="50"></el-switch>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table :data="taskList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="applicationId" label="申请编号" width="155"></el-table-column>
        <el-table-column prop="custName" label="客户姓名" width="80"></el-table-column>
        <el-table-column prop="surveyStateCode" label="调查状态" width="80"></el-table-column>
        <el-table-column prop="patchStateCode" label="补件状态" width="80"></el-table-column>
        <el-table-column prop="approveModeCd" label="审批模式" width="80"></el-table-column>
        <el-table-column prop="taskNodeDesc" label="当前阶段" width="80"></el-table-column>
        <el-table-column prop="preTaskNodeCode" label="上一阶段" width="80"></el-table-column>
        <el-table-column prop="taskGainDate" label="任务获取时间" width="160"></el-table-column>
        <el-table-column prop="operationStartDate" label="操作开始时间" width="160"></el-table-column>
        <el-table-column prop="remarkTxt" label="备注" width="100">
          <template slot-scope="scope">
            <el-popover width="500" trigger="hover" placement="top">
              <p>{{ scope.row.remarkTxt }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row.remarkTxt }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="businessSourceCodeDesc" label="业务来源" width="100"></el-table-column>
        <el-table-column prop="applicationSubmitAmt" label="申请金额" width="100"></el-table-column>
        <el-table-column prop="productName1" label="产品1" width="200">
          <template slot-scope="scope">
            <el-popover width="500" trigger="hover" placement="top">
              <p>{{ scope.row.productName1 }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row.productName1 }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="productName2" label="产品2" width="200">
          <template slot-scope="scope">
            <el-popover width="500" trigger="hover" placement="top">
              <p>{{ scope.row.productName2 }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row.productName2 }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="所属个贷服务中心" width="160"></el-table-column>
        <el-table-column fixed="right" width="200" label="操作">
          <template slot-scope="scope">
            <!-- target="_blank" -->
            <router-link
              target="_blank"
              v-if="scope.row.taskNodeCode === 'approveTask'"
              :to="{path:'approval-pending-start',
                      query:{appID:scope.row.applicationId, isFromList: true, comeFrom: 'pending',
                        isEdit:(scope.row.patchStateCode==='补件中') && !scope.row.cxPatchBusiness ?  true: false}}"
            >
              <el-button type="text" size="small">开始审批</el-button>
            </router-link>
            <router-link
              target="_blank"
              v-if="scope.row.taskNodeCode === 'preApproveTask'"
              :to="{path:'pre-approval',
                      query:{appID:scope.row.applicationId, isFromList: true, comeFrom: 'pending',
                        isEdit:(scope.row.patchStateCode)==='补件中'?true:false}}"
            >
              <el-button type="text" size="small">开始审批</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 引入分页条组件 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "@components/pagination"; // 分页条 21323
import { aprAudApi } from "../../js/server.js";
export default {
  data() {
    return {
      timer: null,
      value3: true,
      value4: true,
      status: false,
      data: [],
      taskList: [],
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      },
      switcNum: false
    };
  },
  created() {
    this.getConfig();
    this.getData(1, this.pageConfig.pageSize).then(() => {
      this.transCoding();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    pagination
  },
  methods: {
    switchEvent() {
      clearInterval(this.timer);
      if (this.switcNum) {
        this.stop();
      } else {
        this.begin();
        this.timer = setInterval(() => {
          this.getData(1, 10).then(() => {
            this.transCoding();
          });
        }, 15000);
      }
    },
    getData(page, pageSize) {
      return new Promise((resolve, reject) => {
        let data = {
          pageNum: page,
          pageSize: pageSize
        };
        this.$MyFetch
          .get(aprAudApi.taskList, data)
          .then(data => {
            this.pageConfig.account = data.pageInfo.total;
            this.pageConfig.currentPage = data.pageInfo.pageNum;
            this.taskList = data.pageInfo.list;
            this.data = data;
            resolve(data);
          })
          .catch(err => {
            if (err.code === "RELOGIN600001") {
              clearInterval(this.timer);
            }
            this.$error(err.message);
          });
      });
    },
    getConfig() {
      this.$MyFetch
        .get(aprAudApi.dispatchStatus, { roleCode: "approveRole" })
        .then((data = {}) => {
          this.status = data;
          this.switcNum = data;
          if (data) {
            this.timer = setInterval(() => {
              this.getData(1, 10).then(() => {
                this.transCoding();
              });
            }, 15000);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    stop() {
      this.switcNum = false;
      let data = {
        dispatchStatus: false,
        roleCode: "approveRole"
      };
      this.$MyFetch
        .post(aprAudApi.dispatch, data)
        .then((data = {}) => {
          this.status = false;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    begin() {
      this.switcNum = true;
      let data = {
        dispatchStatus: true,
        roleCode: "approveRole"
      };
      this.$MyFetch
        .post(aprAudApi.dispatch, data)
        .then((data = {}) => {
          this.status = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    jump(pageNum) {
      console.log(pageNum);
      this.pageConfig.currentPage = pageNum;
      this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize).then(
        () => {
          this.transCoding();
        }
      );
    },
    print(obj) {
      console.log(obj);
    },
    transCoding() {
      this.taskList.map(item => {
        if (item.businessSourceCode.toUpperCase() === "DADAO") {
          item.preTaskNodeCode = "大道面签";
        }
        if (
          item.businessSourceCode.toUpperCase() === "NUONUO" ||
          item.businessSourceCode.toUpperCase() === "KINGDEE" ||
          item.businessSourceCode.toUpperCase() === "CHANJET" ||
          item.businessSourceCode.toUpperCase() === "DCG" ||
          item.businessSourceCode.toUpperCase() === "DCGX"
        ) {
          item.preTaskNodeCode = "";
        }
        if (!item.patchStateCode) {
          item.patchStateCode = "";
        } else if (item.patchStateCode === "Finish") {
          item.patchStateCode = "补件完成";
        } else {
          item.patchStateCode = "补件中";
        }
        if (!item.surveyStateCode) {
          item.surveyStateCode = "";
        } else if (item.surveyStateCode === "Finish") {
          item.surveyStateCode = "调查完成";
        } else {
          item.surveyStateCode = "调查中";
        }
        return item;
      });
      let data = {
        categoryCodes: ["task_def_key", "approve_mode"],
        getAll: false
      };
      this.$MyFetch
        .get(aprAudApi.multipleSelect, data)
        .then(res => {
          this.dictLib = res;
          this.taskList.map(item => {
            if (!item.preTaskNodeCode) {
              item.preTaskNodeCode = "";
            } else {
              res.task_def_key.map(fontTxt => {
                if (item.preTaskNodeCode === fontTxt.itemCode) {
                  item.preTaskNodeCode = fontTxt.itemDesc;
                }
                if (item.taskNodeCode === fontTxt.itemCode) {
                  item.taskNodeDesc = fontTxt.itemDesc;
                }
              });
            }
            res.approve_mode.map(fontTxt => {
              if (item.approveModeCd === fontTxt.itemCode) {
                item.approveModeCd = fontTxt.itemDesc;
              }
            });
          });
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.approvalAudit {
  /deep/ .el-switch .el-switch__label {
    right: -70px;
    top: 0px;
  }
  .el-table {
    border: 1px solid #e9e9e9;
    margin: 30px;
    width: 97%;
    /deep/tr {
      height: 39px;
    }
    /deep/th {
      padding: 0;
    }
    .yincan {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .content {
    min-height: 800px;
    padding: 0 10px 10px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  /* 头字体样式 */
  .content_head {
    height: 20px;
    // width: 1138px;
    margin-left: 30px;
    margin-top: 30px;
  }

  .content_title {
    font-size: 14px;
    color: #3f3f3f;
    font-weight: bold;
  }

  .title_num {
    color: orange;
  }

  .title_tail {
    font-size: 14px;
    color: gray;
  }

  /* 表格按钮位置 */
  .el-col > div {
    float: left;
  }

  .pagination {
    margin-top: 60px;
    margin-right: 20px;
  }

  .tail_btn {
    margin: 50px;
  }
  /deep/.el-table__header-wrapper,
  .el-table__fixed-right {
    // background: #ececec;
    tr {
      background: #ececec;
      th {
        background: #ececec;
        div {
          background: #ececec;
        }
      }
    }
  }
}
/deep/.content {
  .el-table {
    margin: 17px 30px 17px 30px;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    thead tr th {
      padding: 6px 0;
      font-size: 12px;
      background: #ececec;
    }
  }
}
</style>
