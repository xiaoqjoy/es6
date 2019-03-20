<template>
  <div>
    <div class="query-form">
      <div class="form">
        <div class="form-item">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
              <el-select v-model="queryForm.org" placeholder="万通融资集团" class="width-120">
                <el-option
                  v-for="item in orgLists"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类型:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="交易类型:">
              <el-select v-model="queryForm.org" placeholder="万通融资集团" class="width-120">
                <el-option
                  v-for="item in businessTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资金分类:">
              <el-select v-model="queryForm.org" placeholder="额度" class="width-120">
                <el-option
                  v-for="item in captialLists"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >查询</el-button>
              <el-button>清空</el-button>
            </el-form-item>
            <el-button type="success" class="rf" @click="businessType">+ 业务类型</el-button>
          </el-form>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <el-table :data="tableData" border tooltip-effect="light" style="width:100%;">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="code" label="业务类型" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="code" label="资金分类" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="code" label="交易类型" align="center"></el-table-column>
      <el-table-column prop="code" label="应用状态" align="center"></el-table-column>
      <el-table-column prop="code" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="code" label="最低实收费率" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <span>查看</span>
          <span>修改</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <business-type :businessTypeShow="businessTypeShow" v-if="businessTypeShow" @hideBusinessType="hideBusinessType"></business-type>
  </div>
</template>

<script>
import businessType from './components/businessType'
export default {
  components: {
    businessType
  },
  data() {
    return {
      businessTypeShow: false,
       orgLists: [
         {
           label: "深圳万通",
           value: "1"
         },
         {
           label: "珠海万通",
           value: "2"
         },
         {
           label: "万通融资集团",
           value: "3"
         }
       ],
       businessTypes: [
         {
           label: "交易类型",
           value: "1"
         },
         {
           label: "交易类",
           value: "2"
         },
         {
           label: "非交易类",
           value: "3"
         }
       ],
       captialLists: [
         {
           label: "额度",
           value: "1"
         },
         {
           label: "现金",
           value: "2"
         }
       ],
       queryForm: {
         org: "1",
         startDate: "",
         endDate: ""
       },
       tableData: [
         {
           id: "1",
           code: "2016-05-02",
           name: "王小虎1",
           address: "上海市普陀区金沙江路 100 弄",
           state: 1
         },
         {
           id: "2",
           code: "2016-05-04",
           name: "王小虎2",
           address: "上海市普陀区金沙江路 200 弄",
           state: 2
         },
         {
           id: "3",
           code: "2016-05-01",
           name: "王小虎3",
           address: "上海市普陀区金沙江路 300 弄",
           state: 3
         },
         {
           id: "4",
           code: "2016-05-03",
           name: "王小虎4",
           address: "上海市普陀区金沙江路 400 弄",
           state: 4
         }
       ]
     }
  },
  methods: {
    businessType() {
      this.businessTypeShow=true
    },
    hideBusinessType(v) {
      this.businessTypeShow=v
    }
  }
}
</script>

<style scoped lang="less">
  .width-120 {
    width: 120px;
  }
  .rf {
    margin-top: 5px;
  }
  .line {
    min-width: 840px;
    height: 2px;
    background: #0958a5;
    margin-bottom: 10px;
  }
</style>


