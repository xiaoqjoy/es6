<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="record" placeholder="记录编号"></el-input>
        <el-input clearable class="select_72" v-model="fields" placeholder="字段编号"></el-input>
        <!-- <span class="span effective">生效日期</span> -->
        <el-date-picker
          v-model="value1"
          class="select_7"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始生效日期">
        </el-date-picker>
        <span class="span transverse">至</span>
        <el-date-picker
          v-model="value2"
          class="select_7"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始生效日期">
        </el-date-picker>
        <el-button class="b_button query" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty" @click="empty()">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
          >
          <el-table-column
            prop="itemSort"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="recordNum"
            label="记录编号"
            width="250"
            >
          </el-table-column>
          <el-table-column
            prop="effectiveStartDate"
            label="开始生效日期"
            width="150"
            >
          </el-table-column>
            <el-table-column
            prop="effectiveEndDate"
            width="150"
            label="结束日期">
          </el-table-column>
          <el-table-column
            prop="statusInd"
            width="150"
            label="当前是否有效">
             <template slot-scope="scope">
              <span>{{scope.row.statusInd ? '是' : '否'}}</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="createdByName"
            width="150"
            label="登记人">
          </el-table-column>
          <el-table-column
            prop="createdDate"
            width="150"
            label="登记时间">
          </el-table-column>
          <el-table-column
            prop="checkByName"
            width="150"
            label="复核人">
          </el-table-column>
          <el-table-column
            prop="checkDate"
            width="150"
            label="复核时间">
          </el-table-column>
          <el-table-column
            prop="operation"
            width="150"
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit_alert(scope.row)">编辑
              </el-button>
              <el-button type="text" class="delete" size="small" @click="del_alert(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
    </div>
    <addRuleConfig  :refer="refer" v-if="alert_" @clsoe_windowAlert='close_1' />
    <delRuleConfig  :refer="refer" v-if="alert_d" :compile="compile" @clsoe_windowAlert_d='close_1_d' />
    <editRuleConfig v-if="alert_e" :compileNotList="compileNotList" :compileNotDada="compileNotDada" :compileDada="compileDada" :compileList="compileList" :refer="refer" :compile="compile" @clsoe_windowAlert_e='close_1_e' />
  </div>
</template>

<script type="text/ecmascript-6">
import addRuleConfig from "../rule-config/addRuleConfig/"; // 新增规则配置组件
import delRuleConfig from "../rule-config/delRuleConfig/"; // 删除规则配置组件
import editRuleConfig from "../rule-config/editRuleConfig/"; // 编辑规则配置组件
import pagination from "@components/pagination"; // 分页组件
import { configApi } from "../js/server"; // 接口
export default {
  data() {
    return {
      value1: null, // 开始时间
      value2: null, // 结束时间
      record: "", // 记录编号
      fields: "", // 字段编号
      for_: [], // 渲染数据列表
      alert_: false, // 新增规则配置
      alert_d: false, // 删除规则配置
      alert_e: false, // 编辑规则配置
      compile: [], // 传给编辑页面数据
      field_numbers: [],
      // 不进审计字段名称
      fieldname: [],
      // 不进审计详情分类
      particulars: [],
      // 进审字段编号
      field_numbersa_a: [],
      // 进审计字段名称
      fieldname_a: [],
      // 进审计详情分类
      particulars_a: [],
      compileNotList: [],
      compileList: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // defaultList_() {
    //   this.refer(1);
    // },
    // 打开新增规则配置
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增规则配置
    close_1() {
      this.alert_ = false;
    },
    // 打开删除规则配置
    del_alert(detail) {
      this.alert_d = true;
      this.compile = detail;
    },
    // 关闭删除规则配置
    close_1_d() {
      this.alert_d = false;
    },
    // 打开编辑规则配置
    edit_alert(detail) {
      console.log(detail);
      this.compile = detail;
      this.alert_e = true;
      // this.compileNotDada();
      // this.compileDada();
    },
    // 关闭编辑规则配置
    close_1_e() {
      this.alert_e = false;
    },
    empty() {
      this.value1 = null; // 开始时间
      this.value2 = null; // 结束时间
      this.record = ""; // 记录编号
      this.fields = ""; // 字段编号
    },
    // 查询审计进件规则配置列表接口
    refer(pageNum) {
      if (this.value1 === null || this.value2 === null) {
        this.refer_f(pageNum);
      } else if (this.value1 <= this.value2) {
        this.refer_f(pageNum);
      } else {
        this.$message({
          message: '查询失败,请输入正确的查询区间',
          type: 'warning'
        });
      }
      // if (this.value1 <= this.value2) {
      // } else {
      //   this.$message({
      //     message: '开始生效日期要小于结束日期',
      //     type: 'warning'
      //   });
      // }
    },
    // 查询接口
    refer_f(pageNum) {
      let url = configApi.audit_list;
        let data = {
        columnNum: this.fields,
        effectiveStartDtFrom: this.value1,
        effectiveStartDtTo: this.value2,
        recordNum: this.record,
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      console.log(data);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.for_ = data.list;
          // 序号
            for (let i = 0; i < this.for_.length; i++) {
            this.for_[i]["itemSort"] = data.startRow + i;
            }
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
          this.field_numbers_c(); // 调取不进审计条件的字段编号接口
          this.field_numbersa_c(); // 调取进审计条件的记录编号接口
        })
        .catch(err => {
          this.$error(err.message);
        });
        console.log(this.compileNotList);
        console.log(this.compileList);
    },
    field_numbers_c() {
      this.field_numbers = [];
      this.fieldname = [];
      let url = configApi.audit_columns;
      let data = {
        configColumnType: "not_ingress_rule"
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(this.field_numbers);
          for (let i = 0; i < data.length; i++) {
            this.field_numbers.push({
              value: i,
              label: data[i].columnNum
            });
            this.fieldname.push({
              value: i,
              label: data[i].columnName
            });
          }
          this.compileNotDada();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    field_numbersa_c() {
      this.field_numbersa_a = [];
      this.fieldname_a = [];
      let url = configApi.audit_columns;
      let data = {
        configColumnType: "ingress_rule"
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.field_numbersa_a.push({
              value: i,
              label: data[i].columnNum
            });
            this.fieldname_a.push({
              value: i,
              label: data[i].columnName
            });
          }
          this.compileDada();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    compileDada() {
      let url = configApi.details_category;
      this.compileList = [];
      if (this.field_numbersa_a.length > 0) {
        for (let i = 0; i < this.field_numbersa_a.length; i++) {
      let data = {
        columnNum: this.field_numbersa_a[i].label,
        configColumnType: "ingress_rule"
      };
      // if (this.field_numbersa_a[i].label !== "JJ-02") {
      //     this.$MyFetch
      //     .get(url, data)
      //     .then((dataj = {}) => {
      //       if (dataj !== "") {
      //         this.compileList.push.apply(this.compileList, dataj);
      //       }
      //     })
      //     .catch(err => {
      //       this.$error(err.message);
      //     });
      //   }
        this.$MyFetch
        .get(url, data)
        .then((dataj = {}) => {
          if (dataj !== "") {
            this.compileList.push({columnNum: this.field_numbersa_a[i].label, particulars: dataj});
            console.log(this.compileList);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      }
      }
    },
    compileNotDada() {
      let url = configApi.details_category;
      this.compileNotList = [];
      if (this.field_numbers.length > 0) {
        for (let i = 0; i < this.field_numbers.length; i++) {
        let data = {
        columnNum: this.field_numbers[i].label,
        configColumnType: "not_ingress_rule"
      };
      // if (this.field_numbers[i].label !== "BJJ-02") {
      //   this.$MyFetch
      //   .get(url, data)
      //   .then((datat = {}) => {
      //     if (datat !== "") {
      //       this.compileNotList.push.apply(this.compileNotList, datat);
      //     }
      //   })
      //   .catch(err => {
      //     this.$error(err.message);
      //   });
      // }
      this.$MyFetch
        .get(url, data)
        .then((datat = {}) => {
          if (datat !== "") {
            // console.log(datat);
            this.compileNotList.push({columnNum: this.field_numbers[i].label, particulars: datat});
            console.log(this.compileNotList);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      }
      }
      // this.alert_e = true;
    }
  },
  components: {
    addRuleConfig,
    delRuleConfig,
    editRuleConfig,
    pagination
  },
  created() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  min-height: 850px;
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
      // position: absolute;
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
      margin-right: 15px;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 641px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
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
    .el-table {
      .yincan{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    /deep/.el-table {
      th{
          padding: 0px 0;
      }
    }
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
  .pagination{
    margin: 20px 30px 0 0;
  }
}
</style>
