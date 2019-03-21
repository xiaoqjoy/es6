<template>
  <div>
    <el-dialog
      class="dialogbody"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px"
      @close="close()"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <div class="www"></div>
      </div>
      <table class="handle-table" border="1" cellspacing="0">
        <tr class="handle-tr">
          <td class="handle-td">公司账户：</td>
          <td>深圳前海小科互联网金融服务有限公司|民生银行|609625891</td>
          <td class="handle-td">出账类型：</td>
          <td>现金</td>
        </tr>
        <tr class="handle-tr">
          <td class="handle-td">出账金额：</td>
          <td>3,000,000</td>
          <td class="handle-td">出账日期：</td>
          <td>2018-11-23</td>
        </tr>
        <tr class="handle-tr">
          <td class="handle-td">赎楼员：</td>
          <td>罗海涛</td>
          <td class="handle-td">赎楼员账户：</td>
          <td></td>
        </tr>
      </table>

      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-list">
          <el-form-item label="意见：" label-width="55px" style="display:block">
            <el-radio-group v-model="form.resource">
              <el-radio label="同意"></el-radio>
              <el-radio label="不同意"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="form-list">
          <el-form-item label="备注：" label-width="55px" style="display:block">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <el-row>
        <el-col class="btn-item" :span="8" :push="17">
          <el-button type="success" style="width:90px">提交</el-button>
          <el-button style="width:90px" @click="close()">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
// import axios from 'axios';
export default {
  props: {
    // flowInfo: Object
  },
  watch: {
  },
  created() {
  },
  data() {
    return {
      dialogVisible: true,
      radio: "1",
      dialogTitle: "罗海涛300万出账审批",
      // activeName: "first",
      // activeNodeSet: "first",
      // flowDetail: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },


      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江8 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江7 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江9 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江6 弄'
      }]
    };
  },
  created() {
  },
  mounted() { },
  methods: {
    close(formName) {
      this.$emit("hideAddFlow", false);
    },
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>
<style lang="less">
.www {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: green;
}
.www:after {
  width: 0;
  height: 0;
  border-width: 50px 0 50px 50px;
  border-style: solid;
  border-color: transparent transparent transparent green; /*透明 透明 透明 灰*/
  margin: 40px auto;
  position: absolute;
  content: " ";
  top: -40px;
  right: -50px;
}

.handle-table {
  height: 150px;
  margin: 0;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
  .handle-tr td {
    width: 250px;
    height: 50px;
    padding: 0 10px;
    color: #000;
    font-size: 14px;
  }
  .handle-td {
    width: 110px !important;
    text-align: right;
    background-color: rgb(242, 242, 242);
    color: rgba(51, 51, 51, 0.6) !important;
  }
}
</style>
