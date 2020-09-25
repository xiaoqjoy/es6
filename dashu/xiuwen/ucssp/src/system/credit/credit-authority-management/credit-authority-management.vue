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
          <el-form-item label prop="gwmc">
            <el-select class="select_2" filterable v-model="ruleForm.gwmc" placeholder="岗位名称">
              <el-option
                v-for="item in list_gwmc"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label prop="mbbh">
            <el-input class="select_2" maxlength="20" v-model="ruleForm.mbbh" placeholder="模板编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="b_button query" @click="refer(1)">查询</el-button>
            <el-button class="b_button empty" @click="empty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <ul>
        <li v-for="(item,index) in for_" :key="index">
          {{item.is_edit}}
          <el-button @click="editI(index)">xxx</el-button>
          </li>
      </ul>-->
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          max-height="398"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="rname" label="岗位名称"></el-table-column>
          <el-table-column prop="rno" label="岗位编码"></el-table-column>
          <el-table-column prop="tno" label="征信权限模板"></el-table-column>
          <el-table-column prop="querydate" label="查阅时间范围(天)">
            <template slot-scope="scope">
              <span v-if="!scope.row.is_edit">{{scope.row.querydate}}</span>
              <el-input v-else class="select_23" v-model="scope.row.querydate" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="statusBoolean" label="权限是否有效">
            <template slot-scope="scope">
              <el-switch
                @change="whetherValid(scope.$index,scope.row)"
                class="select_23"
                v-model="scope.row.statusBoolean"
                :width="50"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <i
                class="el-icon-check editCheck"
                v-if="scope.row.is_edit"
                @click="editC(scope.$index,scope.row)"
              ></i>
              <i class="el-icon-edit editIcon" v-else @click="editI(scope.$index)"></i>
              <el-button type="text" size="small" @click="allocation">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="bottom">
        <el-button class="b_bottom color" @click="deriv">导出</el-button>
      </div>
    </div>
    <addCreditAuthority v-if="show" @close_s="close_"/>
    <deployAuthority v-if="show_" @close_s="close_p"/>
  </div>
</template>
<script type="text/ecmascript-6">
import { creditApi } from "../js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
import "@common/css/dialog";
import addCreditAuthority from "./addCreditAuthority/index";
import deployAuthority from "./deployAuthority/index";
export default {
  data() {
    return {
      show_: false, // 配置组件默认不显示
      show: false, // 新增组件默认不显示
      list_gwmc: [],
      ruleForm: {
        gwmc: "", // 岗位名称
        mbbh: "", // 模板编号
        cysjfw: "", // 查阅时间范围
        qxsfyx: "" // 权限是否有效
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
    pagination,
    addCreditAuthority, // 新增
    deployAuthority // 配置
  },
  created() {
    this.jobTitle();
    this.refer(1);
  },
  methods: {
    // 导出接口
    deriv() {
      window.open(
        `${creditApi.export}${"?roleName="}${
          this.ruleForm.gwmc
        }${"&templateId="}${this.ruleForm.mbbh}`
      );
    },
    // 权限是否有效接口
    whetherValid(index, rnoZ) {
      let data = {
        statusBoolean: this.for_[index].statusBoolean, // 权限有效性
        roleNo: rnoZ.rno // 岗位编码
      };
      let url = creditApi.querydate;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 点击完成按钮调查阅时间范围接口
    editC(index, rnoZ) {
      this.for_[index].is_edit = false;
      let data = {
        querydate: this.for_[index].querydate, // 查阅时间范围
        roleNo: rnoZ.rno // 岗位编码
      };
      let url = creditApi.querydate;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 点击编辑按钮
    editI(index) {
      console.log(index);
      this.for_[index].is_edit = true;
    },
    // 打开配置组件
    allocation() {
      this.show_ = true;
    },
    // 关闭配置组件
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
    // 查询接口
    refer(pageNum) {
      let data = {
        size: this.pageConfig.pageSize, // 分页数量
        page: pageNum, // 页码
        roleName: this.ruleForm.gwmc, // 岗位名称
        templateId: this.ruleForm.mbbh // 模板编号
      };
      let url = creditApi.roleTemplate;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          if (data.totalElements === 0) {
            this.confirmFn("无符合条件数据");
          }
          let d = data.content;
          d.forEach(item => {
            item.is_edit = false;
          });
          this.for_ = d;
          this.pageConfig.account = data.totalElements;
          this.pageConfig.currentPage = data.number;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空查询条件
    empty() {
      this.ruleForm.gwmc = "";
      this.ruleForm.mbbh = "";
    },
    // 岗位名称下拉框接口数据
    jobTitle() {
      let url = creditApi.roles;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_gwmc = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
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
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
    .editIcon {
      color: #538bf1;
      margin-right: 20px;
    }
    .editCheck {
      margin-right: 20px;
    }
    /deep/ .el-switch {
      margin-left: 70px;
    }
    .select_23 {
      width: 120px;
      height: 40px;
    }
  }
  .pagination {
    margin-right: 24px;
    margin-top: 30px;
  }
  // 底部的样式
  .bottom {
    text-align: center;
    // 批量导入/批量失效/导出excel单独样式
    .b_bottom {
      width: 200px;
      margin-top: 40px;
      font-family: PingFangSC-Regular;
      color: #ffffff;
      font-size: 14px;
      background: #538bf1;
    }
  }
}
</style>
