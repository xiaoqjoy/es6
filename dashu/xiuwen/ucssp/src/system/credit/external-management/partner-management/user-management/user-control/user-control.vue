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
          v-model="userType"
          class="select_72"
          filterable
          placeholder="用户角色"
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
        <el-select
          v-model="status"
          class="select_72"
          filterable
          placeholder="状态"
          clearable
        >
          <el-option
            v-for="item in user_status"
            :key="item.value"
            :label="item.show"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          class="select_72"
          type="datetime"
          placeholder="注册开始时间"
          v-model="regStartDate"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-date-picker
          class="select_72"
          type="datetime"
          placeholder="注册结束时间"
          v-model="regEndDate"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-input
          class="select_72"
          v-model="srcUmName"
          placeholder="所属客户经理"
          clearable
        ></el-input>
        <el-select
          v-model="srcCompany"
          class="select_72"
          filterable
          placeholder="所属分公司"
          clearable
        >
          <el-option
            v-for="item in branch"
            :key="item.companyCode"
            :label="item.companyName"
            :value="item.companyCode"
          >
          </el-option>
        </el-select>
        <el-input
          class="select_72 name"
          v-model="srcChannel"
          placeholder="所属公司"
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
          placeholder="手机号码"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer_f(1)"
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
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="userName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="mobileNo"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="userType"
            label="用户角色"
          >
          </el-table-column>
          <el-table-column
            prop="srcCompany"
            label="所属分公司"
          >
          </el-table-column>
          <el-table-column
            prop="srcUmName"
            label="所属客户经理"
          >
          </el-table-column>
          <el-table-column
            prop="srcChannel"
            label="所属渠道"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="regDate"
            label="注册时间"
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
                @click="compile_alert(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
      <div class="text__center">
        <el-button
          class="t_button initiate_t"
          @click="derive"
        >导出</el-button>
      </div>
    </div>
    <newlyincreased
      v-if="alert_"
      :options="options"
      :user_status="user_status"
      :refer="refer"
      @clsoe_windowAlert='close_1'
    />
    <editAuthOfficer
      v-if="alert_e"
      :compnayList="compnayList"
      :options="options"
      :user_status="user_status"
      :compileData="compileData"
      :refer="refer"
      @clsoe_windowAlert_e='close_1_e'
    />
    <promSelect
      v-if="isSelect"
      @clsoe_windowIsSelect='console_isSelect'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import newlyincreased from "./newly-increased"; // 新增组件
import editAuthOfficer from "./editAuthOfficer"; // 编辑组件
import promSelect from "../../prom-select/index"; // 停用提示组件
import pagination from "@components/pagination"; // 分页组件
import { partnerApi } from "../../../js/server.js"; // 接口
export default {
  data() {
    return {
      tableData: [], // 渲染列表
      alert_: false, // 新增用户
      alert_e: false, // 编辑用户
      isSelect: false, // 是否选择表格数据
      compileData: "", // 传入编辑页面的数据
      ids: "",
      userType: "",
      status: "", // 状态
      regStartDate: null, // 注册开始时间
      regEndDate: null, // 注册结束时间
      srcUmName: "", // 所属客户经理
      srcCompany: "", // 所属分公司
      srcChannel: "", // 所属公司
      userName: "", // 用户姓名
      mobileNo: "", // 手机号码
      options: [],
      compnayList: [],
      user_status: [], // 用户状态
      branch: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 打开新增页面
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增页面
    close_1() {
      this.alert_ = false;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 数据字典
    select_user() {
      let url = partnerApi.initDataDict;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.options = data.dict.select_user_type;
          this.user_status = data.dict.select_user_status;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 分公司
    getCompany() {
      let url = partnerApi.getCompany;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.branch = data.companyList;
          console.log(this.branch);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开编辑页面
    compile_alert(datab) {
      console.log(datab);
      this.compnayList = [];
      let data = {
        userNo: datab.userNo
      };
      let url = partnerApi.userManagerRef_getUserDetail;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.compileData = data;
          if (data.srcUmNo !== null && data.srcUmNo !== "") {
            let data1 = {
              srcUmNo: data.srcUmNo
            };
            let url = partnerApi.getCompanyOfUm;
            this.$MyFetch
              .post(url, data1)
              .then((data = {}) => {
                console.log(data);
                this.compnayList = data.teamOfUmList;
                this.alert_e = true;
              })
              .catch(err => {
                this.$error(err.message);
                // this.$error("客户经理UM账号错误请重新输入");
              });
          } else {
            this.alert_e = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭编辑页面
    close_1_e() {
      this.alert_e = false;
    },
    // 关闭提示信息组件
    console_isSelect() {
      this.isSelect = false;
    },
    // 导出接口
    // derive() {
    //   // let data = JSON.stringify({
    //   //   userType: this.userType,
    //   //   status: this.status, // 状态
    //   //   regStartDate: this.regStartDate, // 注册开始时间
    //   //   regEndDate: this.regEndDate, // 注册结束时间
    //   //   srcUmName: this.srcUmName, // 所属客户经理
    //   //   srcCompany: this.srcCompany, // 所属分公司
    //   //   srcChannel: this.srcChannel, // 所属公司
    //   //   userName: this.userName, // 用户姓名
    //   //   mobileNo: this.mobileNo // 手机号码
    //   // });
    //   console.log(data);
    //   let location = `${partnerApi.userManagerRef_export}?userType=${this.userType}&status=${this.status}&regStartDate=${this.regStartDate}&srcUmName=${this.srcUmName}&srcCompany=${this.srcCompany}&userName=${this.userName}&mobileNo=${this.mobileNo}&regEndDate=${this.regEndDate}&srcChannel=${this.srcChannel}`;
    //   let iframe = document.createElement("iframe");
    //   iframe.src = location;
    //   iframe.style.display = "none";
    //   document.body.appendChild(iframe);
    // },
    // 下载
    derive() {
      let data = {
        userType: this.userType,
        status: this.status, // 状态
        regStartDate: this.regStartDate, // 注册开始时间
        regEndDate: this.regEndDate, // 注册结束时间
        srcUmName: this.srcUmName, // 所属客户经理
        srcCompany: this.srcCompany, // 所属分公司
        srcChannel: this.srcChannel, // 所属公司
        userName: this.userName, // 用户姓名
        mobileNo: this.mobileNo // 手机号码
      };
      let url = partnerApi.userManagerRef_export;
      console.log(data);
      this.$MyFetch.get(url, data).then((data = {}) => {
        // console.log(data);
        this.$download(data);
      }).catch(err => {
        this.confirmFn(err.message, "error");
      });
    },
    // 查询列表
    refer_f(pageNum) {
      if (
        this.userType !== "" ||
        this.status !== "" || // 状态
        this.regStartDate !== null || // 注册开始时间
        this.regEndDate !== null || // 注册结束时间
        this.srcUmName !== "" || // 所属客户经理
        this.srcCompany !== "" || // 所属分公司
        this.srcChannel !== "" || // 所属公司
        this.userName !== "" || // 用户姓名
        this.mobileNo !== "" // 手机号码
      ) {
        if (this.regStartDate === null || this.regEndDate === null) {
          this.refer(pageNum);
        } else if (this.regStartDate <= this.regEndDate) {
          this.refer(pageNum);
        } else {
          this.$message({
            message: "查询失败,请输入正确的查询区间",
            type: "warning"
          });
        }
      } else {
        this.$error("请输入查询条件");
      }
    },
    // 查询授权人员列表接口
    refer(pageNum) {
      let data = {
        userType: this.userType,
        status: this.status, // 状态
        regStartDate: this.regStartDate, // 注册开始时间
        regEndDate: this.regEndDate, // 注册结束时间
        srcUmName: this.srcUmName, // 所属客户经理
        srcCompany: this.srcCompany, // 所属分公司
        srcChannel: this.srcChannel, // 所属公司
        userName: this.userName, // 用户姓名
        mobileNo: this.mobileNo, // 手机号码
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      console.log(data);
      let url = partnerApi.userManagerRef_getPage;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.userBeanPage.list;
          this.pageConfig.account = data.userBeanPage.total;
          this.pageConfig.currentPage = data.userBeanPage.pageNum;
          for (let index = 0; index < this.tableData.length; index++) {
            if (
              this.tableData[index].userType !== null &&
              this.tableData[index].userType !== ""
            ) {
              this.tableData[index].userType = this.options[this.options.findIndex(i => i.value === this.tableData[index].userType)].show;
            }
            if (
              this.tableData[index].status !== "" &&
              this.tableData[index].status !== null
            ) {
              this.tableData[index].status = this.user_status[this.user_status.findIndex(i => i.value === this.tableData[index].status)].show;
            }
          }
          console.log(this.tableData);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    empty() {
      this.status = ""; // 状态
      this.regStartDate = null; // 注册开始时间
      this.regEndDate = null; // 注册结束时间
      this.srcUmName = ""; // 所属客户经理
      this.srcCompany = ""; // 所属分公司
      this.srcChannel = ""; // 所属公司
      this.userName = ""; // 用户姓名
      this.mobileNo = ""; // 手机号码
      this.userType = "";
    }
  },
  components: {
    editAuthOfficer,
    promSelect,
    newlyincreased,
    pagination
  },
  created() {
    this.select_user();
    this.getCompany();
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
  min-height: 805px;
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
    // margin-top: 20px;
    text-align: left;
    // height: 100px;
    // margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    .name {
      // margin-right: 180px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 41px;
      border-radius: 4px;
      font-size: 14px;
      margin-top: 20px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
      margin-left: 17px;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 473px;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
    margin-bottom: 20px;
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
  .text__center {
    margin-top: 20px;
  }
}
</style>
