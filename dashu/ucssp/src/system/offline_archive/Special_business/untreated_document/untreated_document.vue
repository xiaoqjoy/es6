<template>
  <div>
    <div class="content">
      <!-- <customer-import :dialogVisible="dialogVisible" @closeDialog="close"></customer-import> -->
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-button class="b_button query" @click="introduce()">引入</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="newApplicationId" label="新申请编号"></el-table-column>
          <el-table-column prop="authReason" label="授权原因"></el-table-column>
          <el-table-column prop="applicationId" label="原申请编号"></el-table-column>
          <el-table-column prop="custName" label="客户姓名"></el-table-column>
          <el-table-column prop="certificateNum" label="身份证号" width="180"></el-table-column>
          <el-table-column prop="mobileNum" label="手机号码"></el-table-column>
          <el-table-column prop="custmanager" label="客户经理"></el-table-column>
          <el-table-column prop="operation" label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.newApplicationId?true:false"
                type="text"
                size="small"
                @click="authorization(scope.row)"
              >选择授权原因</el-button>
              <el-button
                :disabled="!scope.row.needUploadImageInd"
                type="text"
                size="small"
                @click="$showImage(scope.row.newApplicationId, '特殊业务建档')"
              >影像上传</el-button>
              <el-button type="text" size="small" @click="hint('submit',scope.row)">提交</el-button>
              <el-button type="text" size="small" @click="hint('abandon',scope.row)">放弃</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <reminder
      v-if="alert"
      :hint_content="hint_content"
      @clsoe_windowAlert="close"
      :confirm="confirm"
    />
    <authorization v-if="alert_s" :refer="refer" :id="id" @clsoe_windowAlert_s="close"/>
    <customerImport v-if="alert_y" :refer_y="refer" @clsoe_windowAlert_y="close"/>
  </div>
</template>

<script type="text/ecmascript-6">
import customerImport from "./customer-import/index"; // 删除规则配置组件
import reminder from "./reminder/index"; // 放弃配置组件
import authorization from "./authorization/index"; // 授权配置组件
import pagination from "@components/pagination"; // 分页组件
import { configApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      hint_content: "", // 传入提交/放弃
      id: "",
      for_: [], // 渲染数据列表
      alert: false, // 打开提交/放弃
      alert_s: false, // 打开授权
      alert_y: false, // 编辑规则配置
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开提交/放弃
    hint(id, data) {
      this.id = "";
      if (id === "submit") {
        this.id = data.id;
        let url = configApi.checkSubmit;
        let datat = {
          id: data.id
        };
        this.$MyFetch
          .get(url, datat)
          .then((data = {}) => {
            console.log(data);
            this.hint_content = id;
            this.alert = true;
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else if (id === "abandon") {
        this.alert = true;
        this.hint_content = id;
        this.id = data.id;
      }
    },
    // 确定提交/放弃
    confirm(id) {
      if (id === "submit") {
        let url = configApi.submit;
        let data = {
          id: this.id
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn(data);
            this.alert = false;
            this.refer(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else if (id === "abandon") {
        let url = configApi.cancel;
        let data = {
          id: this.id.toString()
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.alert = false;
            this.refer(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    // 打开授权
    authorization(data) {
      console.log(data);
      this.id = data.id.toString();
      console.log(this.id);
      this.alert_s = true;
    },
    // 引入
    introduce() {
      this.alert_y = true;
      console.log(this.alert_y);
    },
    // 关闭组件
    close() {
      this.alert = false;
      this.alert_s = false;
      this.alert_y = false;
    },
    // 查询
    refer(pageNum) {
      //       this.for_ =[{
      // "id": 9,
      // "applicationId": "RL20190715000108",
      // "custName": "晁芝亚",
      // "certificateNum": "430423********0014",
      // "mobileNum": "187****1121",
      // "custmanager": "刘强",
      // "newApplicationId": null,
      // "authReason": null,
      // "needUploadImageInd": false
      // }];
      let url = configApi.specialBusiness_todo;
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          this.for_ = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    reminder,
    pagination,
    authorization,
    customerImport
  },
  created() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  padding-top: 20px;
  min-height: 800px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
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
    margin: 20px 30px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    text-align: left;
    margin-left: 28px;
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
    }
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
    .span {
      position: absolute;
    }
    .effective {
      left: 25.3%;
      top: 8%;
      font-size: 12px;
      color: #bbbbbb;
      letter-spacing: 1.09px;
    }
    .transverse {
      left: 35.1%;
      top: 12.5%;
      color: #bbbbbb;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 600px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .editor {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
    }
    .delete {
      font-size: 14px;
      color: #f55f5f;
      letter-spacing: 0;
      margin-left: 20px;
    }
  }
  .pagination {
    margin: 70px 30px 20px 0;
  }
}
</style>
