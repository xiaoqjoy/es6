<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input
          class="select_72"
          v-model="clientName"
          placeholder="客户姓名"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="userName"
          placeholder="用户姓名"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="mobileNo"
          placeholder="用户手机号码"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer(1,true)"
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
            prop="userName"
            label="用户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="clientName"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="mobileNo"
            label="客户手机"
          >
          </el-table-column>
          <el-table-column
            prop="pushOrder"
            label="客户身份证号"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="当前阶段"
          >
          </el-table-column>
          <el-table-column
            prop="reconDate"
            label="推荐日期"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                class="compile"
                @click="edit_alert(scope.row)"
              >详情
              </el-button>
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
    <detail
      v-if="alert"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert='close'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import detail from "./details"; // 编辑规则配置组件
import pagination from "@components/pagination"; // 分页组件
import { partnerApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      mobileNo: "", // 用户手机号
      clientName: "", // 客户姓名
      userName: "", // 用户姓名
      compile_data: "", // 编辑页面数据
      tableData: [], // 渲染数据列表
      alert: false, // 打开详情页面配置
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
    // 详情接口
    edit_alert(data) {
      console.log(data);
      let url = `${partnerApi.recommend}${data.pushOrderNo}`;
      console.log(url);
      // let url = "http://10.3.114.164:8087/dpms/recommend/6488100985364283392";
      this.$MyFetch
        .get(url)
        .then((datac = {}) => {
          console.log(datac);
          this.compile_data = datac;
          let interception = "";
          let pushOrder = "";
          let pushOrder1 = "";
          interception = this.compile_data.clientBaseInfoResp.certNo.substring(
            7,
            14
          );
          pushOrder = this.compile_data.clientBaseInfoResp.certNo;
          pushOrder1 = pushOrder.replace(interception, "*****");
          this.$set(this.compile_data, "pushOrder", pushOrder1);
          this.alert = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭编辑页面
    close() {
      this.alert = false;
    },
    // 清空查询条件
    empty() {
      this.mobileNo = ""; // 用户手机号
      this.clientName = ""; // 客户姓名
      this.userName = ""; // 用户姓名
    },
    // 查询
    refer(pageNum) {
      if (
        this.mobileNo !== "" || // 用户手机号
        this.clientName !== "" || // 客户姓名
        this.userName !== "" // 用户姓名
      ) {
        let url = partnerApi.recommend;
        // let url = "http://10.3.114.164:8087/dpms/recommend/";
        let data = {
          mobileNo: this.mobileNo, // 用户手机号
          clientName: this.clientName, // 客户姓名
          userName: this.userName, // 用户姓名
          orderBy: "",
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        };
        console.log(data);
        this.$MyFetch
          .get(url, data)
          .then((data = {}) => {
            this.tableData = data.list;
            console.log(this.tableData);
            let interception = [];
            let pushOrder = [];
            let pushOrder1 = [];
            for (let index = 0; index < this.tableData.length; index++) {
              if (this.tableData[index].certNo !== "") {
                interception.push(
                  this.tableData[index].certNo.substring(7, 14)
                );
                pushOrder.push(this.tableData[index].certNo);
              }
            }
            console.log(interception);
            for (let index = 0; index < pushOrder.length; index++) {
              pushOrder1.push(
                pushOrder[index].replace(interception[index], "*****")
              );
            }
            for (let i = 0; i < this.tableData.length; i++) {
              this.$set(this.tableData[i], "pushOrder", pushOrder1[i]);
            }
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.$error("请输入查询条件");
      }
    }
  },
  components: {
    detail,
    pagination
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  padding-top: 20px;
  min-height: 869px;
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
    height: 40px;
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
  .initiate_t {
    width: 200px;
    height: 40px;
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    border: 1px solid #538bf1;
    margin-top: 20px;
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 716px;
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
    margin: 20px 30px 0 0;
  }
  .compile {
    color: #538bf1;
  }
}
</style>
