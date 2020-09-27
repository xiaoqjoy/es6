<template>
  <div class="content">
    <!-- 标题 -->
    <div class="content_top">
      <span>封账管理</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-form class="search" :inline="true">
          <el-form-item class="el-form-item-btn">
            <el-button
              class="width100 add-btn"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd('add')"
            >新增</el-button>
          </el-form-item>
        </el-form>
        <el-date-picker
          v-model="endMonth"
          type="month"
          placeholder="选择封账月份"
          value-format="yyyy-MM"
          format="yyyy-MM"
        ></el-date-picker>
        <el-button class="b_button query button" @click="refer()">查询</el-button>
        <el-button class="b_button empty button" @click="empty()">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
      <div class="table_box">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%; border: 1px solid #E9E9E9;"
        >
          <el-table-column prop="endMonth" label="封账月份"></el-table-column>
          <el-table-column prop="endDate" label="封账日期"></el-table-column>
          <el-table-column prop="createdDate" label="操作时间"></el-table-column>
          <el-table-column prop="createdBy" label="操作人"></el-table-column>
          <el-table-column width="228px" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <!-- 分页条 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isShowDialog"
      width="30%"
      :append-to-body="true"
      :center="true"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="封账月份" prop="endMonth">
          <el-date-picker
            v-model="form.endMonth"
            type="month"
            placeholder="选择封账月份"
            value-format="yyyy-MM"
            format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="封账日期" prop="endDate">
          <el-date-picker
            class="select_245"
            v-model="form.endDate"
            placeholder="选择封账日期"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  data() {
    return {
      endMonth: "",
      list: [], // 渲染数据列表
      isShowDialog: false,
      showType: "",
      dialogTitle: "",
      easPushId: "",
      form: { endMonth: "", endDate: "" },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        endMonth: [
          { required: true, message: "请选择封账月份", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择封账日期", trigger: "blur" }
        ]
      },
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  mounted() {
    this.refer();
  },
  methods: {
    // 查询
    refer(current) {
      current = current || 1;
      let params = this.endMonth
        ? {
            endMonth: this.endMonth
          }
        : {};
      let url =
        counterDealApi.closeAccountList + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, params)
        .then((data = {}) => {
          if (data.records.length < 1) {
            this.$message("查询结果为空！");
          }
          this.list = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          console.log(err);
          this.$error(err.message);
        });
    },
    handleAdd(type) {
      this.form = {};
      this.dialogTitle = "新增";
      this.showType = "add";
      this.isShowDialog = true;
    },
    handleEdit(detail) {
      this.easPushId = detail.easPushId;
      this.form.endMonth = detail.endMonth;
      this.form.endDate = detail.endDate;
      this.dialogTitle = "修改";
      this.showType = "edit";
      this.isShowDialog = true;
    },
    handleDelete(detail) {
      this.$confirm("是否删除当前记录")
        .then(_ => {
          this.$MyFetch
            .post(counterDealApi.closeAccountDeleteCheck, {
              easPushId: detail.easPushId
            })
            .then((data = {}) => {
              this.$MyFetch
                .post(counterDealApi.closeAccountDeleteTask, {
                  easPushId: detail.easPushId
                })
                .then((data = {}) => {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this.refer();
                })
                .catch(err => {
                  console.log(err);
                  this.$error(err.message);
                });
            })
            .catch(err => {
              console.log(err);
              this.$error(err.message);
            });
        })
        .catch(_ => {});
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.form;
          if (this.showType === "edit") {
            params.easPushId = this.easPushId;
          }
          this.$MyFetch
            .post(counterDealApi.closeAccountCheck, params)
            .then((data = {}) => {
              this.$MyFetch
                .post(counterDealApi.closeAccountSave, params)
                .then((data = {}) => {
                  this.$message({
                    message: `${this.dialogTitle}成功`,
                    type: "success"
                  });
                  this.$refs.form.resetFields();
                  this.refer();
                  this.isShowDialog = false;
                })
                .catch(err => {
                  console.log(err);
                  this.$error(err.message);
                });
            })
            .catch(err => {
              console.log(err);
              this.$error(err.message);
            });
        } else {
          return false;
        }
      });
    },
    // 清空
    empty() {
      this.endMonth = "";
    },
    // 分页
    jump(pageNum) {
      this.refer(pageNum);
    }
  },
  components: {
    pagination // 分页
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  min-height: 850px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  //   overflow: hidden;
  padding: 0px 30px;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  // 中间内容部分
  .sponsor {
    width: 100%;
    // height: 100%;
    // padding-top: 20px;
  }
  // 查询这行的box
  .serach_row {
    margin-top: 20px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
      height: 40px;
      margin-right: 15px;
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #bbbbbb;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 12px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 12px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 12px;
      }
    }
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // padding-left: 15px;
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
      margin-left: 18px;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格
  .table_box {
    width: 100%;
    height: 560px;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 20px;
  }
  .red {
    color: #f55f5f;
  }
}
.el-form-item__label {
  line-height: 40px !important;
}
</style>
