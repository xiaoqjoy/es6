<template>
  <div class="staffManage">
    <div class="manage_T">
      <el-input type="text" size="small" v-model.trim="userNickNama" value="" placeholder="姓名/手机号" class="searchWidth"></el-input>
      <el-select size="small" v-model="departmentId" placeholder="全部科室" class="searchWidth">
        <el-option v-for="item in sectionListNum" :key="item.departmentId" :label="item.name" :value="item.departmentId">
        </el-option>
      </el-select>
      <div class="search" @click="searchUser">搜索</div>
      <div class="clear" @click="emptyUser()">清空</div>
      <div class="newAdd" @click="newAdd()">新增员工</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark">
        <el-table-column fixed label="姓名" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center" width="115px">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="job" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="departmentName" label="所属科室" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="155px">
          <template slot-scope="scope">
            <el-button v-if="!valiCurrentUser(scope.row)" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="!valiCurrentUser(scope.row)" @click="del(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="resetPass(scope.row)" type="text" size="small">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>

    <!--新增编辑员工-->
    <div v-if="ifNewEmp">
      <el-dialog :title="isAdd?'新增员工':'编辑员工'" :visible.sync="ifNewEmp" :append-to-body="true" width="600px" custom-class='newEmploy' :close-on-click-modal="false" @close="empsCloses('employ')">
      <el-form :model="employ" :rules="employRules" ref="employ" label-width="100px" class="demo-ruleForm" onsubmit="return false;">
        <el-form-item label="用户姓名:" prop="nickname">
          <el-input v-model="employ.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="employ.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="employ.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="科室:" prop="departmentId">
          <el-select v-model="employ.departmentId" placeholder="请选择科室" size="medium">
            <el-option v-for="item in sectionListNum" :key="item.departmentId" :label="item.name" :value="item.departmentId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码:" prop="password" v-if="isAdd">
          <el-input type="password" v-model="employ.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位:" prop="job">
          <el-input v-model="employ.job"></el-input>
        </el-form-item>
        <el-form-item v-show="isAdd" label="角色:" prop="roleIds" style="width: 98%;">
          <el-checkbox-group v-model="employ.roleIds" @change="handleCheckedRoleChange">
            <el-checkbox v-for="item in tableDataRole" name='roleId' :key="item.roleId" :label="item.roleId" :disabled="item.roleName.indexOf('护士')>=0?checkedNurse:checkedDoctor">{{item.roleName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据范围:" prop="dataRange" style="width: 98%;">
          <el-radio-group v-model="employ.dataRange">
            <el-radio :label="index+1" v-for="(item,index) in dataRangeArr" :key="item.itemKey">{{item.itemValue}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="width: 98%;">
          <el-button class="floatRight" type="primary" @click="newEmploySu('employ')">确 定</el-button>
          <el-button class="floatRight" style="margin-right: 10px" @click="empsCloses('employ')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
    <!--重置密码-->
    <changePassDialog source='updatePassword' :userId="userId" :isOldPwd='isOldPwd' ref='changePassDialog'></changePassDialog>

    <!--删除员工-->
    <div v-if="ifStaff">
      <el-dialog title="删除员工" :visible.sync="ifStaff" width="350px" custom-class='delStaffs'  @close="delStaffClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除员工账号“<span>{{delUser.nickname}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delStaffClose">取 消</el-button>
        <el-button type="primary" @click="deleUser()">确 定</el-button>
      </span>
    </el-dialog>
    </div>

    <!--删除员工时更改医生弹窗-->
    <div v-if="isChangeDoctor">
      <el-dialog title="删除员工" custom-class='delUser' :visible.sync="isChangeDoctor" :close-on-click-modal='false' :close-on-press-escape='false' @close="closeChangeDoctor('changeDoctorForm')" width="345px">
      <p><i class="el-icon-warning"></i>&nbsp;<span>{{delUser.nickname}}</span>&nbsp;名下已有患者，请将患者转移到其他 <b>{{isDoctorOrNurse=='nurse'?'护士':'医生'}}</b> 名下后，点击确认删除该员工</p>
      <el-form :model="changeDoctorForm" :rules="changeRules" ref="changeDoctorForm" label-width="110px">
        <el-form-item label="更改服务医生:" prop="doctorId" v-if="isDoctorOrNurse=='doctor'">
          <el-select size="small" v-model="changeDoctorForm.doctorId" placeholder="请选择服务医生" style="width: 180px;" @change='getChangeDoctorName'>
            <el-option v-for="item in doctorList" :key="item.userId" :label="item.nickname" :value="item.userId" v-if="item.userId!=delUser.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更改教育护士:" prop="nurseId" v-if="isDoctorOrNurse=='nurse'">
          <el-select size="small" v-model="changeDoctorForm.nurseId" placeholder="请选择教育护士" style="width: 180px;" @change='getChangeNurseName'>
            <el-option v-for="item in nurseList" :key="item.userId" :label="item.nickname" :value="item.userId" v-if="item.userId!=delUser.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChangeDoctor('changeDoctorForm')">取 消</el-button>
        <el-button type="primary" @click="submitChangeDoctor('changeDoctorForm')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
  import funBus from '../../../assets/js/funBus';
  import changePassDialog from '../../common/commonDialog/changePassDialog';

  export default {
    data() {
      return {
        checkedNurse: false,
        checkedDoctor: false,
        currentPage4: 1,
        pagesize: 15,
        totalNum: 0,
        userNickNama: '', // 搜索关键词
        sectionListNum: [], //科室列表
        organizationId: '', // 机构id
        departmentId: '', //科室id
        tableData3: [],
        tableDataRole: [],
        dataRangeArr: [], // 数据权限范围
        isAdd: true, // 是否新增员工
        employ: {
          nickname: '',
          sex: 1,
          phone: '',
          dataRange: 1,
          roleIds: [],
          departmentId: '',
          job: '',
          password: ''
        },
        employRules: {
          nickname: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式有误！',
              trigger: 'blur'
            }
          ],
          roleIds: [{
            type: 'array',
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
          departmentId: [{
            required: true,
            message: '请选择科室',
            trigger: 'change'
          }],
          dataRange: [{
            required: true,
            message: '请选择数据范围',
            trigger: 'change'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: funBus.validatePWD,
              trigger: 'blur'
            }
          ]
        },
        delUser: {},
        ifStaff: false, //是否显示删除员工弹窗
        ifNewEmp: false, //是否显示新增编辑员工弹窗
        isShowBtn: false, // 是否显示按钮
        isChangeDoctor: false, // 是否显示修改医生弹窗
        doctorList: [], //更改医生弹窗的医生列表
        nurseList: [], //更改医生弹窗的护士列表
        changeDoctorForm: { //更改医生
          doctorId: '',
          nurseId: '',
        },
        changeRules: {
          doctorId: [{
            required: false,
            message: '请选择医生',
            trigger: 'change'
          }],
          nurseId: [{
            required: false,
            message: '请选择护士',
            trigger: 'change'
          }],
        },
        customerIds: [], //员工名下患者id
        isDoctorOrNurse: '', //删除员工时转移患者弹窗中显示项：doctor、nurse
        changedUser: { //删除员工弹窗中select下拉的选中用户
          doctorId: '',
          doctorName: '',
          nurseId: '',
          nurseName: '',
          name: '',
          userId: ''
        },
        isOldPwd: false, //修改密码弹窗是否显示旧密码栏
        userId: '', //员工用户id
        currentUserId: '', //当前登陆用户id
        validByNurseId: '', //角色选择时对比的护士id（医生与护士禁止同时选中）
      }
    },
    components: {
      changePassDialog
    },
    created: function () {
      let vm = this;
      let user = JSON.parse(sessionStorage.getItem('user'));
      vm.organizationId = user.organizationId;
      vm.searchUser(); //获取员工
      funBus.getDictionarysByTypeCode(this, 'dataRange'); //数据范围权限
      vm.$nextTick(function () {
        vm.roleList(); //获取角色列表
        vm.sectionList(); // 请求科室列表
      });
    },
    methods: {
      //验证员工是否当前登陆用户
      valiCurrentUser(row) {
        if (!this.currentUserId) {
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.currentUserId = user.userId;
        }

        let isCurrentAdmin = false;
        //
        if (row.roleName.indexOf('管理员')>=0 && row.userId == this.currentUserId) {
        	isCurrentAdmin = true;
        }
        return isCurrentAdmin;
      },
      //角色复选框change事件: 医生与护士禁止同时选中
      handleCheckedRoleChange(val) {
        let vm = this;
        if (val.length > 0) {
          if (val.indexOf(vm.validByNurseId) >= 0) { //验证护士是否选中
            vm.checkedDoctor = true;
            vm.checkedNurse = false;
          } else {
            vm.checkedDoctor = false;
            vm.checkedNurse = true;
          }
        } else {
          vm.checkedDoctor = false;
          vm.checkedNurse = false;
        }
      },
      //请求科室列表
      sectionList() {
        let data = {
          currentPage: 1,
          pageSize: global.pageSize,
          organizationId: this.organizationId,
        };
        this.$api.getDepartmentList(data, re => {
          if (re.data.code == 0) {
            this.sectionListNum = re.data.data.items;
          }
        }, res => {
          this.$message(res.data.errMsg)
        })
      },
      //清空搜索
      emptyUser() {
        this.userNickNama = "";
        this.departmentId = "";
        this.currentPage4 = 1;
        this.searchUser();
      },
      //获取员工
      searchUser() {
        let that = this;
        let data = {
          currentPage: 1,
          pageSize: this.pagesize,
          organizationId: that.organizationId
        };
        if (!!that.departmentId) {
          data.departmentId = that.departmentId;
        }
        if (!!that.userNickNama) {
          data.nickname = that.userNickNama.replace(/(^\s*)|(\s*$)/g, "");
        }
        that.$api.searchUser(data, res => {
          that.tableData3 = res.data.data.items;
          that.totalNum = res.data.data.totalNum;
        })
      },
      //新增员工
      newAdd() {
        this.isAdd = true;
        this.ifNewEmp = true;
      },
      //编辑员工
      edit(row) {
        //console.log(row)
        this.isAdd = false;
        this.ifNewEmp = true;
        this.userId = row.userId;

        /*
        this.employ.nickname = row.nickname;
        this.employ.sex = row.sex;
        this.employ.phone = row.phone;
        this.employ.dataRange = row.dataRange;
        this.employ.roleIds = row.roleIds && row.roleIds.length>0 ? row.roleIds : [];
        this.employ.departmentId = row.departmentId;
        this.employ.job = row.job;
        */

        let data = {
          userId: row.userId,
          organizationId: row.organizationId
        };
        this.$api.queryByIdUser(data, res => {
          //console.log(res.data.data);
          this.employ = res.data.data.userVo; //用户信息
          let departmentVos = res.data.data.departmentVos; //科室信息
          let roleVos = res.data.data.roleVos; //角色信息

          for (var i = 0; i < departmentVos.length; i++) {
            if (departmentVos[i].hadRelationshipFlag == true) {
              this.employ.departmentId = departmentVos[i].departmentId;
            }
          }
          let roleIds = [];
          for (var i = 0; i < roleVos.length; i++) {
            roleIds.push(roleVos[i].roleId);
          }
          this.employ.roleIds = roleIds;
          this.handleCheckedRoleChange(roleIds); //处理医生与护士禁止同时选中
        });
      },
      //关闭新增/编辑员工弹窗
      empsCloses(formName) {
        this.$refs[formName].resetFields();
        this.employ.roleIds = [];
        this.ifNewEmp = false;
        this.checkedDoctor = false;
        this.checkedNurse = false;
      },
      //保存提交员工信息
      newEmploySu(formName) {
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.openLoading();
            let data = {
              nickname: vm.employ.nickname,
              sex: vm.employ.sex,
              phone: vm.employ.phone,
              departmentIds: [vm.employ.departmentId],
              organizationId: vm.organizationId,
              job: vm.employ.job,
              roleIds: vm.employ.roleIds,
              dataRange: vm.employ.dataRange,
            };
            if (vm.isAdd) { //新增员工
              data.password = vm.employ.password; //密码
              vm.currentPage4 = 1;
            } else { //编辑员工
              data.userId = vm.userId; //员工id
            }

            vm.$api.saveUser(data, re => {
              if (re.data.code == 0) {
                vm.empsCloses(formName); //关闭弹窗并清理数据
                vm.$message.success(re.data.errMsg || re.data.data);
                vm.searchUser();
                vm.closeLoading();
              }
            }, res => {
              vm.$message(res.data.errMsg)
              vm.closeLoading();
            })

          }
        })

      },
      //弹出对应的员工删除弹窗
      del(row) {
        this.delUser = row;
        //根据用户获取患者
        this.$api.queryListByUserId({
          userId: row.userId
        }, res => {
          if (res.data.code == 0) {
            if (res.data.data.length == 0) { // 员工帐号名下无所属患者时
              this.ifStaff = true;
            } else { // 有所属患者时
              let customerIds = [];
              let arr = res.data.data;
              for (let i = 0, len = arr.length; i < len; i++) {
                customerIds.push(arr[i].customerId);
              }
              this.customerIds = customerIds; //被删除员工名下的患者id

              //判断被删除员工的角色类型
              if (row.roleName.indexOf('护士') >= 0) { //护士
                this.isDoctorOrNurse = 'nurse';
                this.changeRules.doctorId[0].required = false;
                this.changeRules.nurseId[0].required = true;
              } else { //医生、管理员
                this.isDoctorOrNurse = 'doctor';
                this.changeRules.doctorId[0].required = true;
                this.changeRules.nurseId[0].required = false;
              }

              if(!row.departmentId){ //判断有无科室id
                this.$message.warning('无该员工的科室id');
                return false;
              }

              let data = {
                organizationId: row.organizationId,
                //departmentId: row.departmentId,
                roleType: this.isDoctorOrNurse == 'doctor' ? 1 : 2
              }
              funBus.queryUserList(this, data); //获取服务医生、教育护士

              this.isChangeDoctor = true;
            }
          } else {
            this.$message(res.data.errMsg || res.data.data);
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        });
      },
      //删除员工
      deleUser() {
        let data = {
          userId: this.delUser.userId
        }
        this.openLoading();
        this.$api.deleUser(data, res => {
          if (res.data.code == 0) {
            this.ifStaff = false;
            this.$message.success(res.data.errMsg || res.data.data);
            this.searchUser();
            this.closeLoading();
          }
        }, res => {
          this.$message.success(res.data.errMsg || res.data.data);
          this.closeLoading();
        })
      },
      // 关闭更改医生弹窗
      closeChangeDoctor(formName) {
        this.$refs[formName].resetFields();
        this.isChangeDoctor = false;
      },
      //删除员工时，医生列表change事件获取选中医生的id与名称
      getChangeDoctorName(userId) {
        let list = this.doctorList;
        //this.changedUser.doctorId = userId;
        this.changedUser.userId = userId;
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].userId == userId){
            this.changedUser.doctorName = list[i].nickname;
            this.changedUser.name = list[i].nickname;
            break;
          }
        }
      },
      //删除员工时，护士列表change事件获取选中护士的id与名称
      getChangeNurseName(userId) {
        let list = this.nurseList;
        //this.changedUser.nurseId = userId;
        this.changedUser.userId = userId;
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].userId == userId){
            this.changedUser.nurseName = list[i].nickname;
            this.changedUser.name = list[i].nickname;
            break;
          }
        }
      },
      // 提交更改医生
      submitChangeDoctor(formName) {
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交的参数对象
            let data = {
              userIds: [vm.delUser.userId], //被删除的用户id
              userId: vm.changedUser.userId, //替换的用户id
              userName: vm.changedUser.name, //替换的用户名称
            };

            //修改医生
            vm.$api.updateByDoctorByUserIds(data, res => {
              if (res.data.code == 0) {
                vm.deleUser(); //删除员工
                vm.isChangeDoctor = false;
                vm.$refs[formName].resetFields();
                vm.delUser = {};
              } else {
                this.closeLoading();
                vm.$message(res.data.errMsg || res.data.data)
              }
            }, res => {
              vm.closeLoading();
              vm.$message(res.data.errMsg || res.data.data)
            });

          }
        })

      },
      //修改密码
      resetPass(row) {
        this.userId = row.userId;
        this.$refs.changePassDialog.isShowChangePassDialog = true;
      },
      // 关闭删除员工弹窗
      delStaffClose() {
        this.ifStaff = false;
      },
      //获取角色列表
      roleList() {
        let data = {
          currentPage: 1,
          pageSize: global.pageSize,
          organizationId: this.organizationId,
          //departmentId: this.departmentId
        };
        this.$api.getRoleList(data, res => {
          this.tableDataRole = res.data.data;

          for (let i = 0, len = this.tableDataRole.length; i < len; i++) {
            if (this.tableDataRole[i].roleName == '护士') {
              this.validByNurseId = this.tableDataRole[i].roleId;
            }
          }

        });
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.currentPage4 = val;
      },
    },
  }
</script>

<style lang="less">
  .newEmploy {
    .el-form {
      .el-form-item {
        width: 48%;
        display: inline-block;
        .el-checkbox {
          margin-left: 0!important;
          padding-right: 30px;
        }
      }
    }
  }
  .delUser {
    .el-dialog__body {
      padding: 10px 20px!important;
      & > p {
        font-size: 15px;
        margin-bottom: 15px;
        /*text-align: justify;*/
        .el-icon-warning:before {
          content: "\E62E";
          color: #e6a23c;
        }
        span {
          color: #409EFF;
        }
      }
    }
  }
</style>
