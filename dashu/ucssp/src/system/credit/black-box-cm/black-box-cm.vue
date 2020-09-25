<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="add">+ 新增</button>
      <!-- 输入框和下拉列表框 -->
      <div class="b_content">
        <el-form
          :inline="true"
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label prop="jgmc">
            <el-input class="select_2" v-model="ruleForm.jgmc" placeholder="机构名称"></el-input>
          </el-form-item>
          <el-form-item label prop="jgbm">
            <el-input class="select_2" v-model="ruleForm.jgbm" placeholder="机构编码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="b_button query" @click="refer(1)">查询</el-button>
            <el-button class="b_button empty" @click="empty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          max-height="398"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="partnerName" label="机构名称"></el-table-column>
          <el-table-column prop="partnerNo" label="机构编码"></el-table-column>
          <el-table-column prop="updatedBy" label="录入人"></el-table-column>
          <el-table-column prop="updatedDate" label="录入时间"></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small">规则配置</el-button>
              <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
              <el-button type="text" size="small" class="delate_red" @click="detail(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <addBlackBox :refer="refer" v-if="show" @close_s="close_"/>
    <editBlackBox
      :refer="refer"
      :current_list="currentList"
      :list_="list"
      v-if="show_"
      @close_s="close_p"
    />
    <deleteBlackBox :deleteInterface="deleteInterface" v-if="toDelete" @close_s="close_d"/>
  </div>
</template>
<script type="text/ecmascript-6">
import { creditApi } from "../js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
import "@common/css/dialog";
import addBlackBox from "./addBlackBox/index"; // 新增
import editBlackBox from "./editBlackBox/index"; // 编辑
import deleteBlackBox from "./deleteBlackBox/index"; // 删除
export default {
  data() {
    return {
      Agency: "", // 机构编码
      currentList: [], // 判断详情页面有没有改变
      list: [], // 渲染详情
      show: false, // 新增组件默认不显示
      show_: false, // 编辑组件默认不显示
      toDelete: false, // 删除页面默认不显示
      ruleForm: {
        jgmc: "", // 机构名称
        jgbm: "" // 机构编码
      }, // 查询表单控件
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: []
    };
  },
  components: {
    pagination, // 分页
    addBlackBox, // 新增
    editBlackBox, // 编辑
    deleteBlackBox // 删除
  },
  created() {
    this.refer(1);
  },
  methods: {
    // 下载接口
    download(download) {
      let url = `${creditApi.partnerNo}/${download.partnerNo}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          if (data.zipStatus === "1") {
            window.open(`${creditApi.download}/${download.partnerNo}`);
          } else if (data.zipStatus === "" || data.zipStatus === null) {
            this.confirmFn("未打包，无法下载，请先规则配置并保存");
          } else if (data.zipStatus === "0") {
            this.confirmFn("打包中，请耐心等待");
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 删除接口
    deleteInterface() {
      let data = {
        id: this.Agency // 机构编码
      };
      let url = creditApi.crrService;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.toDelete = false;
          this.refer(1);
          this.confirmFn("删除成功");
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭删除页面
    close_d() {
      this.toDelete = false;
    },
    // 打开删除页面
    detail(number) {
      this.toDelete = true;
      this.Agency = number.partnerNo;
    },
    // 清空查询条件
    empty() {
      this.ruleForm.jgmc = "";
      this.ruleForm.jgbm = "";
    },
    // 查询接口
    refer(pageNum) {
      let data = {
        size: this.pageConfig.pageSize, // 分页数量
        page: pageNum, // 页码
        partnerName: this.ruleForm.jgmc, // 机构名称
        partnerNo: this.ruleForm.jgbm // 机构编码
      };
      let url = creditApi.partnerlist;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.for_ = data.content;
          this.pageConfig.account = data.totalElements;
          this.pageConfig.currentPage = data.number;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开编辑组件
    edit(detail) {
      this.show_ = true;
      this.list = detail;
      console.log(detail);
      this.currentList = Object.assign({}, this.list);
    },
    // 关闭编辑组件
    close_p() {
      this.show_ = false;
    },
    // 打开新增组件
    add() {
      this.show = true;
    },
    // 关闭新增组件
    close_() {
      this.show = false;
    },
    handleSelectionChange(data) {
      console.log(data);
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  min-height: 830px;
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
    // 输入框和下拉框200*40
    .select_2 {
      width: 200px;
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
    height: 400px;
    width: 1622px;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .delate_red {
      color: red;
    }
  }
  .pagination {
    margin-right: 24px;
    margin-top: 30px;
  }
}
</style>
