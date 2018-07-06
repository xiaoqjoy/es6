<template>
  <div>
    <sys-tem></sys-tem>
    <div class="agencyInfor">
      <h3>机构信息</h3>
      <div class="agencyInfors contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/agencyInfor/'+it.typeCode == $route.path}"
                @click="myTabss(index,it)">{{it.typeName}}
            </li>
          </ul>
        </div>
        <!-- <router-view :tableDataUser="tableDataUser" :totalNums='totalNums' :tableDataRole="tableDataRole"
                    :defaultList="tableDatake" @newEmploy="newEmploy" @newDepart="newDepart" @delDepart="delDepart"
                    @newRole="newRole" @delRole="delRole" @resetPass="resetPass" @delStaff="delStaff"></router-view> -->
        <router-view :totalNums='totalNums'
        @newEmploy="newEmploy" @newDepart="newDepart" @delDepart="delDepart"
        @newRole="newRole" @delRole="delRole" @resetPass="resetPass" @delStaff="delStaff"></router-view>
        <!--<agenInfor></agenInfor>-->
        <!--<staffManage @newEmploy="newEmploy"></staffManage>-->
      </div>
    </div>
    <!--新增编辑科室-->
    <div class="newDepart" v-if="myCode">
      <div class="newDeparts">
        <h5>{{dName}}科室</h5>
        <span class="close" @click="batchCloses()">X</span>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>科室编号</td>
            <td><input v-model="dRow.code" type="text"/></td>
          </tr>
          <tr>
            <td>科室名称</td>
            <td><input v-model="dRow.name" type="text"/></td>
          </tr>
          <!--<tr>-->
          <!--<td>科室类别</td>-->
          <!--<td>-->
          <!--<select name="" v-model="dRow.type">-->
          <!--<option :value="dep.itemKey" v-for="dep in departmentList">{{dep.itemValue}}</option>-->
          <!--</select>-->
          <!--</td>-->
          <!--</tr>-->
        </table>
        <el-button class="cancels" @click="cancels_s()">取消</el-button>
        <el-button type="primary" class="sures" @click="addOrg(dName)">确定</el-button>
      </div>
    </div>
    <!--删除科室-->
    <div class="delDepart" v-if="ifDel">
      <div class="delDeparts">
        <h5>删除科室</h5>
        <span class="close" @click="delCloses()">X</span>
        <p>确定要删除科室“<span>{{name}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_del()">取消</el-button>
        <el-button type="primary" class="sures" @click="deleteSu()">确定</el-button>
      </div>
    </div>
    <!--新增编辑角色-->
    <div class="newRole" v-if="ifNewRole">
      <div class="newRoles">
        <h5>{{roleTitle}}角色</h5>
        <span class="close" @click="roleCloses()">X</span>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>角色名称</td>
            <td>
              <el-input type="text" v-model="dRole.roleName"/>
            </td>
          </tr>
          <tr>
            <td>角色说明</td>
            <td>
              <el-input type="textarea" resize="none" v-model="dRole.remark" :rows="5" style="width:426px"></el-input>
            </td>
          </tr>
          <tr>
            <td>功能权限</td>
            <td>
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="b.permissionId" v-for="b in menuPermissionsList" :key="b.seqNum">{{b.name}}
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
        </table>
        <el-button class="cancels" @click="cancels_R()">取消</el-button>
        <el-button type="primary" class="sures" @click="roleSu(roleTitle)">确定</el-button>
      </div>
    </div>
    <!--删除角色-->
    <div class="delRole" v-if="ifDelRole">
      <div class="delRoles">
        <h5>删除角色</h5>
        <span class="close" @click="delRoleClose()">X</span>
        <p>确定要删除角色“<span>{{delRoleName.roleName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_delRole()">取消</el-button>
        <el-button type="primary" class="sures" @click="delRoleSu(delRoleName)">确定</el-button>
      </div>
    </div>
    <!--新增编辑员工-->
    <div class="newEmp" v-if="ifNewEmp">
      <div class="newEmps">
        <h5>{{employTitle}}员工</h5>
        <span class="close" @click="empsCloses()">X</span>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>用户姓名</td>
            <td><input v-model="employ.nickname" type="text"/></td>
            <td>性别</td>
            <td>
              <el-radio-group v-model="employ.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td><input v-model="employ.phone" type="text"/></td>
            <td>科室</td>
            <td>
              <select name="" v-model="employ.organizationId">
                <option :value="ke.organizationId" v-for="ke in sectionListNumB">{{ke.name}}</option>
              </select></td>
          </tr>
          <tr>
            <td v-if='employTitle=="新增"'>登录密码</td>
            <td v-if='employTitle=="新增"'><input v-model="employ.password" type="password"/></td>
            <td>角色</td>
            <td>
              <select name="" v-model="employ.roleId">
                <option :value="jue.roleId" v-for="jue in tableDataRole">{{jue.roleName}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>职位</td>
            <td><input v-model="employ.job" type="text"/></td>
          </tr>
          <tr>
            <td>数据范围</td>
            <td style="width: 250px;">
              <el-radio-group v-model="employ.dataRange">
                <el-radio :label="index+1" v-for="(item,index) in dataFromList" :key="item.itemKey">{{item.itemValue}}
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
        </table>
        <el-button class="cancels" @click="cancels_E()">取消</el-button>
        <el-button type="primary" class="sures" @click="newEmploySu(employTitle)">确定</el-button>
      </div>
    </div>
    <!--重置密码-->
    <div class="resetPass" v-if="ifReset">
      <div class="resetPasss">
        <h5>修改密码</h5>
        <span class="close" @click="ResetCloses()">X</span>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="68px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm2')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2',resetInfo)">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除员工-->
    <div class="delStaff" v-if="ifStaff">
      <div class="delStaffs">
        <h5>删除员工</h5>
        <span class="close" @click="delStaffClose()">X</span>
        <p>确定要删除员工账号“<span>{{deUSer.nickname}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_delStaff()">取消</el-button>
        <el-button type="primary" class="sures" @click="deleUser()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: 'agencyInfor',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        sectionListNumB: [],
        departName: "",
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1,
        pagesize1: 15,
        pagesize2: 15,
        pagesize3: 15,
        checkList: [],
        itemOrganiza: "",
        myIndex: 3,
        orgCode: '',
        orgName: '',
        //表单校验
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        //多选框
        checkAll_1: false,
        checkAll_2: false,
        checkAll_3: false,
        checkedCities_1: ['功能1', '功能2'],
        checkedCities_2: ['全部患者', '糖尿病患者'],
        checkedCities_3: ['功能1', '功能2'],
        cities_1: ['功能1', '功能2', '功能3'],
        cities_2: ['全部患者', '糖尿病患者', '高血压患者'],
        cities_3: ['功能1', '功能2', '功能3'],
        isIndeterminate_1: true,
        isIndeterminate_2: true,
        isIndeterminate_3: true,
        radio2: 1,
        radio: 0,
        radio3: 1,
        ifStaff: false,
        ifReset: false,
        ifNewEmp: false,
        ifDelRole: false,
        ifNewRole: false,
        ifDel: false,
        myCode: false,
        activess: 0,
        arrs: [
          {
            typeCode: "agenInfor",
            typeName: "机构信息"
          },
          {
            typeCode: "manageDepart",
            typeName: "科室管理"
          },
          {
            typeCode: "roleManage",
            typeName: "角色管理"
          },
          {
            typeCode: "staffManage",
            typeName: "员工管理"
          }
        ],
        name: '',
        dName: '',
        dRow: {name: '', code: '', type: ''},
        delOrg: "",
        roleTitle: '',
        dRole: {roleName: '', remark: '', roleId: '', status: ''},
        delRoleName: {},
        employTitle: '',
        employ: {nickname: '', sex:1, phone: '', password: '', dataRange: 1, roleId: '', organizationId: '', job: ''},
        deUSer: {},
        resetInfo: {},
        tableDatake: [],
        tableDataRole: [],
        currentPage4: 1,
        pagesize: 5,
        tableDataUser: [],
        dataFromList: [],
        organizationIdNew: '',
        roleIdNew: '',
        menuPermissionsList: [],
        departmentList: [],
        totalNums: 0,
      }
    },
    methods: {
      //科室列表
      //科室列表
      sectionList() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          organizationId:user.organizationId
        };
        this.$api.organizationId(data, res => {
          var org = res.data.data
          if (org) {
            let dataPagedList = {
              currentPage: 1,
              pageSize: 1000,
              parentId: org.organizationId,
              type: 2
            }
            this.$api.pagedList(dataPagedList, re => {
              if (re.data.code == 0) {
                this.sectionListNumB = re.data.data.items
                // this.organizationId = ""
              }
            },res=>{
              this.$message(res.data.errMsg)
            })
          }
        })
      },
      //权限菜单列表
      resourceMenuList() {
        this.$api.queryRoleAuthorizeTree({}, res => {
          this.menuPermissionsList = res.data.data
        })
      },
      //数据范围
      dataFrom() {
        var data = {typeCode:'dataRange'};
        this.$api.dictionaryListByCode(data, res => {
          if (res.data.code == 0) {
            this.dataFromList = res.data.data
          }
        },res=>{
            this.$message(res.data.errMsg)
        })
      },
      // 重新请求科室列表
      defaultList() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let that = this
        let data = {
          organizationId:user.organizationId
        };
        this.$api.organizationId(data, res => {
          var org = res.data.data
          if (this.departName) {
            this.departName = this.departName.replace(/(^\s*)|(\s*$)/g, '');
          }
          let data = {
            name: this.departName,
            currentPage: this.currentPage1,
            pageSize: this.pagesize1,
            parentId: org.organizationId,
            type: 2
          };
          this.$api.pagedQueryList(data, res => {
            that.tableDatake = [];
            if (res.data.code == 0) {
              that.totalNums = res.data.data.totalNum;
              if (res.data.data.items) {
                for (let i = 0; i < res.data.data.items.length; i++) {
                  let dataObj = {};
                  dataObj.code = res.data.data.items[i].code
                  dataObj.name = res.data.data.items[i].name
                  dataObj.address = res.data.data.items[i].type
                  dataObj.organizationId = res.data.data.items[i].organizationId
                  dataObj.departmentType = res.data.data.items[i].departmentType
                  that.tableDatake.push(dataObj);
                }
              }
            }
          })
        })
      },
      //重新请求角色列表
      roleList: function () {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          currentPage: 1,
          pageSize: 1000,
          parentId: user.organizationId,
          type: 2
        };
        this.$api.role(data, res => {
          this.tableDataRole = res.data.data.items
          if (res.data.data.items.length>0) {
            this.roleIdNew = res.data.data.items[0].roleId
          }
        });
      },
      //重新请求员工管理列表
      userInit: function () {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          currentPage: this.currentPage4,
          pageSize: 1000,
          organizationId: user.organizationId
        };
        this.$api.userList(data, res => {
          this.tableDataUser = res.data.data.items
        })
      },
      //重新加载科室管理列表
      reloadDepartList(that){
        let user = JSON.parse(sessionStorage.getItem('user'));
        that.$children.forEach(item => {
          if (item.DepartData) {
            item.DepartData(1, 15, user.organizationId);
          }
        });
      },
      //删除科室
      deleteSu() {
        let that = this
        let data = {
          organizationId: this.delOrg
        }
        this.$api.deleteById(data,re => {
          if (re.data.code == 0) {
            that.ifDel = false;
            that.reloadDepartList(that);
            //this.reload();
          }
        },res=>{
            this.$message(res.data.errMsg)
        })
      },

      department() {
        this.$api.dictionary_all({typeCode:'departmentType'},res => {
          if (res.data.code == 0) {
            this.departmentList = res.data.data
          }
        })
      },
      //新增科室
      newDepart(n, dName, row, currentPage, pagesize, departName) {

        this.dName = dName;
        this.currentPage1 = currentPage;
        // console.log(n)
        // console.log(dName)
        // console.log(row)
        // console.log(currentPage)
        // console.log(pagesize)
        this.pagesize1 = pagesize;
        this.departName = departName;
        this.reloadDepartList(this);
        //this.defaultList();
        if (row) {
          this.itemOrganiza = row.organizationId;
          let data = {
            currentPage: 1,
            pageSize: 1000,
            organizationId: row.organizationId,
            type: 2
          };
          this.$api.pagedListById(data, res => {
            this.dRow = res.data.data.items[0]
          })
        } else {
          this.dRow = {name: '', code: '', type: ''}

        }
        setTimeout(() => {
          this.myCode = n;
        }, 100);
      },
      delDepart(n, row, currentPage, pagesize, departName) {

        this.name = row.name
        this.delOrg = row.organizationId;
        this.currentPage1 = currentPage;

        this.pagesize1 = pagesize;
        this.departName = departName;
        this.reloadDepartList(this);
        //this.defaultList();
        setTimeout(() => {
          this.ifDel = true;
        }, 100);
      },
      //新增科室
      addOrg(dName) {
        if (this.dRow.code.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message("请输入科室编号")
        } else if (this.dRow.name.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message("请输入科室名称")
        } else {
          let that = this
          let user = JSON.parse(sessionStorage.getItem('user'))
          var dataOrganizationId;
          if (dName == "新增") {
            dataOrganizationId = {
              organizationId: user.organizationId
            }
            that.$api.organizationId(dataOrganizationId, res => {
              var org = res.data.data
              let data = {
                parentId: org.organizationId,
                code: that.dRow.code,
                name: that.dRow.name,
                type: 2,
                systemCode: org.systemCode
              }
              that.$api.addorg(data, re => {
                if (re.data.code == 0) {
                  that.myCode = false;
                  that.reloadDepartList(that);
                  //that.defaultList()
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            })
          } else if (dName == "编辑") {
            dataOrganizationId = {
              organizationId: that.itemOrganiza
            }
            that.$api.organizationId(dataOrganizationId, res => {
              var org = res.data.data
              let data = {
                organizationId: org.organizationId,
                code: that.dRow.code,
                name: that.dRow.name,
                type: 2,
                systemCode: org.systemCode
              }
              that.$api.changOrg(data,re => {
                if (re.data.code == 0) {
                  that.myCode = false;
                  that.reloadDepartList(that);
                  //that.defaultList()
                }
              },res=>{
                    this.$message(res.data.errMsg)
                })
            })
          }
        }
      },
      //重置密码
      submitForm(formName, resetInfo) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              password: this.ruleForm2.checkPass,
              userId: this.resetInfo.userId
            }
            this.$api.changePass(data, res => {
              if (res.data.code == 0) {
                this.ifReset = false
                this.ruleForm2.pass = ""
                this.ruleForm2.checkPass = ""
              }
            },res=>{
                this.$message(res.data.errMsg)
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ifReset = false;
        this.ruleForm2.pass = ""
        this.ruleForm2.checkPass = ""
      },
      //新增编辑员工
      newEmploy(n, roleTitle, row) {
        this.sectionList()
        this.roleList()
        this.ifNewEmp = n;
        this.employTitle = roleTitle
        if (row) {
          var data = {
            userId: row.userId,
            organizationId: row.organizationId
          };
          this.$api.queryByIdUser(data, res => {
            this.employ = res.data.data.userVo
            for (var i = 0; i < res.data.data.organizationVos.length; i++) {
              if (res.data.data.organizationVos[i].hadRelationshipFlag == true) {
                this.employ.organizationId = res.data.data.organizationVos[i].organizationId;
              }
            }
            for (var i = 0; i < res.data.data.roleVos.length; i++) {
              if (res.data.data.roleVos[i].hadRelationshipFlag == true){
                this.employ.roleId = res.data.data.roleVos[i].roleId;
              }
            }
          })
        } else {
          this.employ = {
            nickname: '',
            sex:1,
            phone: '',
            password: '',
            dataRange: 1,
            roleId: this.roleIdNew,
            organizationId: this.organizationIdNew,
            job: ''
          }
        }
      },
      newEmploySu: function (employTitle) {
        if (this.employ.nickname.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message("姓名不能为空")
        } else if (this.employ.phone.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message("电话不能为空")
        } else if (!/^1[345678]\d{9}$/.test(this.employ.phone)) {
          this.$message("请输入正确的手机号")
        } else if(!this.employ.organizationId){
          this.$message("请选择科室")
        }else if(!this.employ.roleId){
          this.$message("请选择角色")
        }else if (this.employ.job.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message("职位不能为空")
        } else {
          let that = this
          if (employTitle == "新增") {
            if (that.employ.password.replace(/(^\s*)|(\s*$)/g, "") == "") {
              that.$message("密码不能为空")
            } else if (!/\w{6,16}$/.test(that.employ.password)) {
              that.$message("请输入6-16位密码")
            } else {
              let data = {
                nickname: that.employ.nickname,
                phone: that.employ.phone,
                sex: that.employ.sex,
                password: that.employ.password,
                organizationIds: [that.employ.organizationId],
                dataRange: that.employ.dataRange,
                roleIds: [that.employ.roleId],
                job: that.employ.job
              }
              that.$api.addUser(data,re => {
                if (re.data.code == 0) {
                  that.ifNewEmp = false;
                  //that.userInit()
                  that.reload();
                }
              },res=>{
                    this.$message(res.data.errMsg)
                })
            }
          } else if (employTitle == "编辑") {
            let data = {
              userId: that.employ.userId,
              nickname: that.employ.nickname,
              phone: that.employ.phone,
              sex: that.employ.sex,
              organizationIds: [that.employ.organizationId],
              dataRange: that.employ.dataRange,
              roleIds: [that.employ.roleId],
              job: that.employ.job
            }
            that.$api.changeUser(data, res => {
              if (res.data.code == 0) {
                that.ifNewEmp = false;
                //that.userInit()
                that.reload();
              }
            })
          }
        }
      },
      //新增角色
      newRole(n, roleTitle, row) {
        this.resourceMenuList()
        this.ifNewRole = n;
        this.roleTitle = roleTitle
        this.checkList = []
        if (row) {
          let data = {roleId: row.roleId};
          this.$api.roleById(data, res => {
            this.dRole = res.data.data.roleVo
            for (let i = 0; i < res.data.data.roleList.length; i++) {
              if (res.data.data.roleList[i].hadPermissionFlag == true) {
                this.checkList.push(res.data.data.roleList[i].permissionId)
              }
            }
          })
        } else {
          this.dRole = {roleName: '', remark: ''}
          this.checkList = []
        }
      },
      roleSu: function (roleTitle) {
        if (this.dRole.roleName.replace(/(^\s*)|(\s*$)/g, "") == ""){
          this.$message("请输入角色名称")
        } else if (this.checkList.length == 0) {
          this.$message("请选择功能权限")
        } else {
          let that = this
          if (roleTitle == "新增") {
            let data = {
              roleName: that.dRole.roleName,
              remark: that.dRole.remark,
              permissionIds: that.checkList
            }
            that.$api.addRole(data,re => {
              if (re.data.code == 0) {
                that.ifNewRole = false;
                //this.roleList()
                this.reload();
              }
            },res=>{
                this.$message(res.data.errMsg)
            })
          } else if (roleTitle == "编辑") {
            let data = {
              roleId: that.dRole.roleId,
              roleName: that.dRole.roleName,
              status: that.dRole.status,
              remark: that.dRole.remark,
              permissionIds: that.checkList
            }
            this.$api.changeRole(data,res => {
              if (res.data.code == 0) {
                that.ifNewRole = false;
                //this.roleList()
                this.reload();
              }
            },res=>{
                this.$message(res.data.errMsg)
            })
          }
        }

      },
      //删除角色
      delRole(n, row) {
        this.ifDelRole = n;
        this.delRoleName = row
      },
      delRoleSu: function (delRoleName) {
        let data = {
          roleId: delRoleName.roleId
        }
        this.$api.delRoleApi(data,res => {
          if (res.data.code == 0) {
            this.ifDelRole = false
            //this.roleList()
            this.reload();
          }
        },res=>{
            this.$message(res.data.errMsg)
        })
      },
      //重置密码
      resetPass(n, row) {
        this.ifReset = n;
        this.resetInfo = row
      },
      //删除员工
      delStaff(n, row) {
        this.ifStaff = n;
        this.deUSer = row
      },
      deleUser: function () {
        let data = {
          userId: this.deUSer.userId
        }
        this.$api.deleUser(data,res => {
          if (res.data.code == 0) {
            this.ifStaff = false
            //this.userInit()
            this.reload();
          }
        },res=>{
            this.$message(res.data.errMsg)
        })
      },
      //单选框
      radiosC(lable) {
      },
      //多选框
      handleCheckAllChange_1(val) {
        this.checkedCities_1 = val ? this.cities_1 : [];
        this.isIndeterminate_1 = false;
      },
      handleCheckAllChange_2(val) {
        this.checkedCities_2 = val ? this.cities_2 : [];
        this.isIndeterminate_2 = false;
      },
      handleCheckAllChange_3(val) {
        this.checkedCities_3 = val ? this.cities_3 : [];
        this.isIndeterminate_3 = false;
      },
      handleCheckedCitiesChange_1(value) {
        let checkedCount = value.length;
        this.checkAll_1 = checkedCount === this.cities_1.length;
        this.isIndeterminate_1 = checkedCount > 0 && checkedCount < this.cities_1.length;
      },
      handleCheckedCitiesChange_2(value) {
        let checkedCount = value.length;
        this.checkAll_2 = checkedCount === this.cities_2.length;
        this.isIndeterminate_2 = checkedCount > 0 && checkedCount < this.cities_2.length;
      },
      handleCheckedCitiesChange_3(value) {
        let checkedCount = value.length;
        this.checkAll_3 = checkedCount === this.cities_3.length;
        this.isIndeterminate_3 = checkedCount > 0 && checkedCount < this.cities_3.length;
      },
      myTabss(index, it) {
        this.$router.push(it.typeCode);
      },
      batchCloses() {
        this.myCode = false;
        this.reloadDepartList(this);
      },
      roleCloses() {
        this.ifNewRole = false;
        this.roleList()
      },
      cancels_s() {
        this.myCode = false;
      },
      cancels_del() {
        this.ifDel = false;
      },
      cancels_R() {
        this.ifNewRole = false;
        this.roleList()
      },
      delCloses() {
        this.ifDel = false;
      },
      delRoleClose() {
        this.ifDelRole = false;
      },
      cancels_delRole() {
        this.ifDelRole = false;
      },
      empsCloses() {
        this.ifNewEmp = false;
        this.userInit()
      },
      cancels_E() {
        this.ifNewEmp = false;
        this.userInit()
      },
      ResetCloses() {
        this.ifReset = false;
        this.ruleForm2.pass = ""
        this.ruleForm2.checkPass = ""
      },
      delStaffClose() {
        this.ifStaff = false;
      },
      cancels_delStaff() {
        this.ifStaff = false;
      }
    },
    created:function(){
      this.roleList()
      this.userInit()
      this.dataFrom()
      this.department()
      this.sectionList()
    }
  }
</script>
<style scoped>
  .el-checkbox + .el-checkbox {
    margin-left: 0 !important;
  }

  .el-checkbox {
    margin-right: 30px !important;
    margin-top: 3px !important;
  }

  .newRole .roleThat {
    width: 426px !important;
  }

  .delDeparts p, .delRoles p, .delStaffs p {
    padding: 30px 0;
  }

  .delDeparts, .delRoles, .delStaffs {
    height: 217px;
  }

  .newEmps {
    width: 473px;
  }

  .resetPasss {
    height: 262px;
  }
</style>
