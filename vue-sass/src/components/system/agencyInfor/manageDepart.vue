<template>
  <div class="manageDepart">
    <div class="manage_T">
      <el-input size="small" v-model="departName" placeholder="科室编号/名称" class="searchWidth"></el-input>
      <div class="search" @click="searchDepart">搜索</div>
      <div class="clear" @click="empty()">清空</div>
      <div class="newAdd" @click="addDepart()">新增科室</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="defaultListke" tooltip-effect="dark">
        <el-table-column fixed label="科室编号" align="center">
          <template slot-scope="scope">{{ scope.row.code}}</template>
        </el-table-column>
        <el-table-column prop="name" label="科室名称" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="editDepart(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delDepart(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChanges" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNums">
      </el-pagination>
    </div>

    <!--新增编辑科室-->
    <el-dialog :title="isAdd?'新增科室':'编辑科室'" :visible.sync="myCode" :append-to-body="true" width="350px" :close-on-click-modal="false" @close="cancels_s('ruleForm')">
      <el-form :model="dRow" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" onsubmit="return false;">
        <el-form-item label="科室编号" prop="code">
          <el-input v-model.trim="dRow.code"></el-input>
        </el-form-item>
        <el-form-item label="科室名称" prop="name">
          <el-input v-model.trim="dRow.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancels_s('ruleForm')">取消</el-button>
          <el-button type="primary" @click="addOrg('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="删除科室" :visible.sync="ifDel" width="350px" custom-class='delDeparts'  @close="delCloses()" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除科室 “<span>{{name}}</span>” 吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCloses()">取 消</el-button>
        <el-button type="primary" @click="deleteSu()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    inject: ['reload'],
    data() {
      return {
        currentPage4: 1,
        pagesize: 15,
        departName: '',
        defaultListke: [],
        tableDatake: [],
        totalNums: 0,
        ifDel: false,
        delDepartId: '',
        myCode: false,
        isAdd: true,
        dRow: {},
        name: '',
        rules: {
          code: [{
              required: true,
              message: '请输入科室编号',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          name: [{
              required: true,
              message: '请输入科室名称',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    mounted() {
      this.DepartData();
    },
    methods: {
      // 科室管理列表数据
      DepartData() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        var that = this;
        let data = {
          name: that.departName.replace(/(^\s*)|(\s*$)/g, ""),
          currentPage: that.currentPage4,
          pageSize: that.pagesize,
          organizationId: user.organizationId,
        };
        that.$api.getDepartmentList(data, res => {
          if (res.data.code == 0) {
            that.defaultListke = res.data.data.items;
            that.totalNums = res.data.data.totalNum;
          }
        }, res => {
          that.$message(res.data.errMsg)
        })

      },
      //清空
      empty() {
        let that = this;
        that.departName = "";
        that.currentPage4 = 1;
        that.DepartData()
      },
      //搜索
      searchDepart() {
        let that = this
        that.departName = that.departName.replace(/(^\s*)|(\s*$)/g, "");
        if (!!that.departName) {
          that.currentPage4 = 1;
          that.DepartData()
        }
      },
      //新增科室
      addDepart() {
        this.isAdd = true;
        this.myCode = true;
      },
      editDepart(row) {
        this.isAdd = false;
        this.myCode = true;
        this.dRow = {
          name: row.name,
          code: row.code,
          departmentId: row.departmentId
        }
      },
      //新增科室
      addOrg(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let user = JSON.parse(sessionStorage.getItem('user'))
            let data = {
              organizationId: user.organizationId,
              code: that.dRow.code,
              name: that.dRow.name,
            }
            that.openLoading();
            if (that.isAdd) { //新增
              that.$api.addorg(data, re => {
                if (re.data.code == 0) {
                  that.currentPage4 = 1;
                  that.$message.success(re.data.errMsg || re.data.data);
                  that.cancels_s(formName);
                  that.DepartData();
                  that.closeLoading();
                  that.reload();
                }
              }, res => {
                that.$message(res.data.errMsg)
                that.closeLoading();
              })
            } else { //编辑
              data.departmentId = this.dRow.departmentId;
              delete data.organizationId;
              that.$api.changOrg(data, re => {
                if (re.data.code == 0) {
                  that.reload();
                  that.$message.success(re.data.errMsg || re.data.data);
                  that.cancels_s(formName);
                  that.DepartData();
                  that.closeLoading();
                }
              }, res => {
                that.$message(res.data.errMsg)
                that.closeLoading();
              })
            }
          }
        });
      },

      //删除科室
      delDepart(row) {
        this.name = row.name
        this.delDepartId = row.departmentId;
        this.ifDel = true;
      },
      //删除科室
      deleteSu() {
        let that = this
        let data = {
          departmentId: that.delDepartId
        }
        this.openLoading();
        that.$api.deleteById(data, re => {
          if (re.data.code == 0) {
            that.ifDel = false;
            that.$message({
              type: 'success',
              message: re.data.errMsg || re.data.data
            });
            that.DepartData();
            that.closeLoading();
            that.reload();
          }
        }, res => {
          that.$message(res.data.errMsg)
          that.closeLoading();
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        var that = this;
        that.pagesize = val;
        that.DepartData()
      },
      handleCurrentChanges(val) {
        // console.log(`当前页: ${val}`);
        var that = this;
        that.currentPage4 = val;
        that.DepartData()
      },
      cancels_s(formName) {
        this.$refs[formName].resetFields();
        this.myCode = false;
      },
      delCloses() {
        this.ifDel = false;
      },
    }
  }
</script>
