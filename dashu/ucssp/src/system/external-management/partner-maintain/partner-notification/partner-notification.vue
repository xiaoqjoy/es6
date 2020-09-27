<template>
  <div>
    <div class="content">
      <button
        class="add"
        @click="add_alert()"
      >+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-select
          v-model="msgType"
          class="select_72"
          filterable
          placeholder="消息类型"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.show"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          class="select_72"
          v-model="msgTitle"
          placeholder="消息标题"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer(1)"
        >查询</el-button>
        <el-button
          class="b_button empty"
          @click="empty()"
        >清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="msgTypeshow"
            label="消息类型"
          >
          </el-table-column>
          <el-table-column
            prop="msgTitle"
            label="消息标题"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="推送对象"
          >
          <template slot-scope="scope">
              <span class="pushObject" v-for="(item, index) in scope.row.pushObjectshow" :key="index">{{item}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pushTime"
            label="推送时间"
          >
          </el-table-column>
          <el-table-column
            prop="statusshow"
            label="消息状态"
          >
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                class="compile"
                @click="compile_alert(scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.status === 'waiting_push'"
                type="text"
                size="small"
                @click="del_alert(scope.row)"
              >删除</el-button>
              <el-button
                v-if="scope.row.status === 'push_ing'"
                type="text"
                size="small"
                @click="del_alert(scope.row)"
              >暂停</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
    </div>
    <newlyincreased
      v-if="alert_"
      :refer="refer"
      :options="options"
      @clsoe_windowAlert='close_1'
    />
    <editAuthOfficer
      v-if="alert_b"
      :refer="refer"
      :options="options"
      :compnayList="compnayList"
      :compile_data="compile_data"
      @clsoe_windowAlert_b='close_2'
    />
    <delRuleConfig
      v-if="alert_s"
      :del="del"
      @clsoe_windowAlert_s='close_3'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import newlyincreased from "./newly-increased"; // 新增授权人员组件
import editAuthOfficer from "./editAuthOfficer/"; // 编辑授权人员组件
import delRuleConfig from "../../partner-maintain/home-management/notice/delRuleConfig"; // 停用提示组件
import pagination from "@components/pagination"; // 分页组件
import { partnerApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      tableData: [], // 渲染列表
      alert_: false, // 新增页面
      alert_e: false, // 编辑授权人员
      alert_b: false, // 编辑页面
      alert_s: false, // 删除页面
      compile_data: "", // 传给编辑页面数据
      selectedRow: [], // 复选框是否选中
      pushMsgNo: "", // 删除数据的id
      msgTitle: "", //  消息标题
      msgType: "", // 消息类型
      compnayList: [
        {
          companyCode: "0000",
          companyName: "全体"
        }
      ],
      options: [], // 消息类型
      status: [],
      select: [],
      status1: "",
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 打开新增授权人员
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增授权人员
    close_1() {
      this.alert_ = false;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开删除页面
    del_alert(data) {
      console.log(data);
      this.pushMsgNo = data.msgNo;
      this.status1 = data.status;
      this.alert_s = true;
    },
    // 删除接口
    del() {
      let data = {
        pushMsgNo: this.pushMsgNo,
        status: this.status1
      };
      let url = partnerApi.pushMsgManagerRef_deleteMsg;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
          this.close_3();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    compnay() {
      let url = partnerApi.getCompany;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          for (let index = 0; index < data.companyList.length; index++) {
            this.compnayList.push(data.companyList[index]);
          }
          console.log(this.compnayList);
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开编辑页面
    compile_alert(datab) {
      console.log(datab);
      let data = {
        pushMsgNo: datab.msgNo
      };
      let url = partnerApi.pushMsgManagerRef_getDetail;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.compile_data = data;
          let pushObject = data.pushObject.split(",");
          this.compile_data.pushObject = pushObject;
          this.alert_b = true;
          this.$set(this.compile_data, "status", datab.status);
          console.log(this.compile_data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭编辑页面
    close_2() {
      this.alert_b = false;
    },
    // 关闭删除页面
    close_3() {
      this.alert_s = false;
    },
    // 消息类型
    msgtitle() {
      let url = partnerApi.initDataDict;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.options = data.dict.select_push_msg_type; // 消息类型
          this.status = data.dict.select_push_msg_status;
          this.select = data.dict.select_push_obj_type;
          this.compnay();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询消息列表接口
    refer(pageNum) {
      let data = {
        msgTitle: this.msgTitle,
        msgType: this.msgType,
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      console.log(data);
      let url = partnerApi.pushMsgManagerRef_getPage;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.pushMsgBeanPage.list;
          let pushObjectshow = [];
          let pushObject = [];
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].pushObject !== "upload_name") {
              pushObject = this.tableData[index].pushObject.split(",");
              console.log(pushObject);
              if (pushObject.length > 0) {
              for (let a = 0; a < pushObject.length; a++) {
                if (pushObject[a] !== "") {
                  console.log(pushObject[a]);
                  pushObjectshow.push(this.compnayList[this.compnayList.findIndex(i => i.companyCode === pushObject[a])].companyName);
                }
            }
            }
            } else {
              pushObjectshow.push(this.select[this.select.findIndex(i => i.value === this.tableData[index].pushObject)].show);
            }
            let statusshow = this.status[this.status.findIndex(i => i.value === this.tableData[index].status)].show;
            let msgTypeshow = this.options[this.options.findIndex(i => i.value === this.tableData[index].msgType)].show;
            this.$set(this.tableData[index], "pushObjectshow", pushObjectshow);
            this.$set(this.tableData[index], "msgTypeshow", msgTypeshow);
            this.$set(this.tableData[index], "statusshow", statusshow);
            pushObjectshow = [];
          }
          console.log(this.tableData);
          this.pageConfig.account = data.pushMsgBeanPage.total;
          this.pageConfig.currentPage = data.pushMsgBeanPage.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    empty() {
      this.msgTitle = "";
      this.msgType = "";
    }
  },
  components: {
    editAuthOfficer,
    delRuleConfig,
    newlyincreased,
    pagination
  },
  created() {
    this.msgtitle();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
// 中间部分
.content {
  min-height: 866px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  padding: 0px 30px 20px 30px;
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    margin: 20px 0px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    // margin-top: 30px;
    text-align: left;
    height: 40px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 630px;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    margin-bottom: 20px;
    .pushObject {
      margin-left: 5px;
    }
  }
  .b_check {
    margin-left: 25px;
  }
  // 停用启用公共样式
  .t_button {
    width: 200px;
    height: 40px;
  }
  .dead_t {
    border: 1px solid #538bf1;
    font-size: 14px;
    color: #538bf1;
    letter-spacing: 1.07px;
    text-align: center;
  }
  .initiate_t {
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    border: 1px solid #538bf1;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .text__center {
    margin-top: 20px;
  }
  .compile {
    color: #538bf1;
  }
}
</style>
