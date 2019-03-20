<template>
  <div class="roleManage">
    <div class="manage_T">
      <el-input size="small" v-model.trim="searchRoleVaule" placeholder="角色名称/说明" class="searchWidth"></el-input>
      <div class="search" @click="getRoleList">搜索</div>
      <div class="clear" @click="clearRole">清空</div>
      <!--<div class="newAdd" @click="newAdd_R()">新增角色</div>-->
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark">
        <el-table-column fixed type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center">
        </el-table-column>
        <!--
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button v-show="scope.row.isOnlyRead != 1" @click="editRole(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-show="scope.row.isOnlyRead != 1" @click="delRole(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        -->
      </el-table>
    </div>

    <!--分页-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>

    <!--新增编辑角色-->
    <div class="newRole" v-if="ifNewRole">
      <div class="newRoles">
        <h5>{{isAddRole?'新增':'编辑'}}角色</h5>
        <span class="close" @click="roleCloses('ruleForm')">X</span>
        <el-form :model="dRole" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" onsubmit="return false;" style="padding-top:20px; border-top: 2px solid #e0e0e0;">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="dRole.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色说明：" prop="remark">
            <el-input type="textarea" resize="none" v-model="dRole.remark" :rows="5" style="width:420px"></el-input>
          </el-form-item>
          <el-form-item label="功能权限：" prop="checkList">
            <el-checkbox-group v-model="dRole.checkList">
              <el-checkbox name="checkList" v-for="b in menuPermissionsList" :label="b.permissionId" :key="b.seqNum">{{b.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item style="text-align: right;">
            <el-button @click="roleCloses('ruleForm')">取消</el-button>
            <el-button type="primary" @click="roleSubmit('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <!--删除角色-->
    <div class="delRole" v-if="ifDelRole">
      <div class="delRoles">
        <h5>删除角色</h5>
        <span class="close" @click="delRoleClose">X</span>
        <p>确定要删除角色“<span>{{delRoleName.roleName}}</span>”吗？</p>
        <el-button class="floatRight" style="margin-left: 20px;" @click="delRoleClose">取消</el-button>
        <el-button type="primary" class="floatRight" @click="delRoleSu(delRoleName)">确定</el-button>
      </div>
    </div>

  </div>
</template>
<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    data() {
      return {
        currentPage4: 1,
        pagesize: 15,
        totalNum: 0,
        searchRoleVaule: '',
        tableData3: [],
        ifDelRole: false,
        ifNewRole: false,
        delRoleName: {},
        menuPermissionsList: [],
        isAddRole: true, //是否新增角色
        dRole: {
          roleName: '',
          remark: '',
          roleId: '',
          status: '',
          checkList: []
        },
        rules: {
          roleName: [{
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          checkList: [{
            required: true,
            message: '请选择功能权限',
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.getRoleList();
      //this.resourceMenuList(); //权限菜单列表
    },
    methods: {
      //权限菜单列表
      resourceMenuList() {
        this.$api.queryRoleAuthorizeTree({}, res => {
          this.menuPermissionsList = res.data.data;
        })
      },
      //获取角色列表
      getRoleList() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let data = {
          currentPage: this.currentPage4,
          pageSize: this.pagesize,
          parentId: user.organizationId,
        };
        if (this.searchRoleVaule) {
          data.roleName = this.searchRoleVaule.replace(/(^\s*)|(\s*$)/g, "");
        }
        this.$api.getRoleList(data, res => {
          this.tableData3 = res.data.data;
          this.totalNum = res.data.data.totalNum;
        })
      },
      clearRole() {
        this.searchRoleVaule = "";
        this.currentPage4 = 1;
        this.getRoleList();
      },
      //新增角色
      newAdd_R() {
        this.isAddRole = true;
        this.ifNewRole = true;
        this.resourceMenuList(); //权限菜单列表
        this.dRole = {
          roleName: '',
          remark: '',
          checkList: []
        }
      },
      editRole(row) {
        this.isAddRole = false;
        this.ifNewRole = true;
        this.resourceMenuList(); //权限菜单列表
        let checkList = [];
        this.$api.roleById({
          roleId: row.roleId
        }, res => {
          for (let i = 0; i < res.data.data.roleList.length; i++) {
            if (res.data.data.roleList[i].hadPermissionFlag == true) {
              checkList.push(res.data.data.roleList[i].permissionId);
            }
          }
          res.data.data.roleVo.checkList = checkList;
          this.dRole = res.data.data.roleVo;
        })
      },
      roleSubmit(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            this.openLoading();
            if (that.isAddRole) {
              let data = {
                roleName: that.dRole.roleName,
                remark: that.dRole.remark,
                permissionIds: that.dRole.checkList
              }
              that.$api.addRole(data, re => {
                if (re.data.code == 0) {
                  that.ifNewRole = false;
                  that.currentPage4 = 1;
                  that.$message({
                    type: 'success',
                    message: re.data.errMsg || re.data.data
                  });
                  that.getRoleList();
                  this.closeLoading();
                }
              }, res => {
                that.$message(res.data.errMsg)
                this.closeLoading();
              })
            } else {
              let data = {
                roleId: that.dRole.roleId,
                roleName: that.dRole.roleName,
                status: that.dRole.status,
                remark: that.dRole.remark,
                permissionIds: that.dRole.checkList
              }
              that.$api.changeRole(data, re => {
                if (re.data.code == 0) {
                  that.ifNewRole = false;
                  that.$message({
                    type: 'success',
                    message: re.data.errMsg || re.data.data
                  });
                  that.getRoleList()
                  this.closeLoading();
                }
              }, res => {
                that.$message(res.data.errMsg)
                this.closeLoading();
              })
            }
          }
        })

      },
      //删除角色
      delRole(row) {
        this.ifDelRole = true;
        this.delRoleName = row
      },
      delRoleSu(delRoleName) {
        let data = {
          roleId: delRoleName.roleId
        }
        this.openLoading();
        this.$api.delRoleApi(data, re => {
          if (re.data.code == 0) {
            this.ifDelRole = false;
            this.$message({
              type: 'success',
              message: re.data.errMsg || re.data.data
            });
            this.getRoleList();
            this.closeLoading();
          }
        }, res => {
          this.$message(res.data.errMsg)
          this.closeLoading();
        })
      },
      delRoleClose() {
        this.ifDelRole = false;
      },
      roleCloses() {
        this.ifNewRole = false;
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
      },
    }
  }
</script>

<style lang="less">
  .newRoles {
    .el-form {
      .el-checkbox {
        margin-left: 0!important;
        padding-right: 30px;
      }
    }
  }
</style>
