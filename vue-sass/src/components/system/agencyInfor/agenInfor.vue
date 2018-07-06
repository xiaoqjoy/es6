<template>
  <div>
    <div>
      <div class="agenInfor">
        <div class="highAuto agenInforSpecial" v-if="!mySave">
          <p class="titleInfor"><span>丨</span>主机构  <el-button type="primary" size="small" class="edits" @click="edits()">编辑</el-button></p>
          <table border="0" cellspacing="0" cellpadding="0" class="institution">
            <tr>
              <td>机构名称：</td>
              <td>{{organizationList.name}}</td>
            </tr>
            <tr>
              <td>联 系 人 ：</td>
              <td>{{organizationList.contactPerson}}</td>
            </tr>
            <tr>
              <td>联系电话：</td>
              <td>{{organizationList.phone}}</td>
            </tr>
            <tr>
              <td>所在地址：</td>
              <td>{{organizationList.city + organizationList.district + organizationList.address}}</td>
            </tr>
          </table>
          <table border="0" cellspacing="0" cellpadding="0" class="contact">
            <tr>
              <td>注册时间：</td>
              <td>{{organizationList.createTime}}</td>
            </tr>
            <tr>
              <td>电子邮箱：</td>
              <td>{{organizationList.email}}</td>
            </tr>
          </table>
        </div>
        <div class="highAuto agenInforSpecial" v-if="mySave">
          <p class="titleInfor"><span>丨</span>主机构</p>
          <table border="0" cellspacing="0" cellpadding="0" class="institution">
            <tr>
              <td>机构名称：</td>
              <td><input type="text" v-model="organizationList.name"/></td>
            </tr>
            <span class="tips">{{TipsName}}</span>
            <tr>
              <td>联 系 人 ：</td>
              <td><input type="text" v-model="organizationList.contactPerson"/></td>
            </tr>
            <span class="tips">{{TipsPerson}}</span>
            <tr>
              <td>联系电话：</td>
              <td><input type="text" v-model="organizationList.phone"/></td>
            </tr>
            <span class="tips">{{TipsPhone}}</span>
            <tr>
              <td>所在地址：</td>
              <td>
                <div class="row">
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入省份" v-model="prov"/>
                    <!--<select v-model="prov" @change="changeProv">-->
                      <!--<option v-for="option in arr" :value="option.name">-->
                        <!--{{ option.name }}-->
                      <!--</option>-->
                    <!--</select>-->
                  </div>
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入城市" v-model="city"/>
                    <!--<select v-model="city" @change="changeCity">-->
                      <!--<option v-for="option in cityArr" :value="option.name">-->
                        <!--{{ option.name }}-->
                      <!--</option>-->
                    <!--</select>-->
                  </div>
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入区" v-model="district"/>
                    <!--<select v-model="district" v-if="district">-->
                      <!--<option v-for="option in districtArr" :value="option.name">-->
                        <!--{{ option.name }}-->
                      <!--</option>-->
                    <!--</select>-->
                  </div>
                </div>
                <input type="text" placeholder="详细地址" v-model="organizationList.address"/>
              </td>
            </tr>
          </table>
          <table border="0" cellspacing="0" cellpadding="0" class="contact">
            <!--<tr><td>管 理 员 ： </td><td>张昊</td></tr>-->
            <tr>
              <td>注册时间：</td>
              <td>{{organizationList.createTime}}</td>
            </tr>
            <tr>
              <td>电子邮箱：</td>
              <td><input type="text" v-model="organizationList.email"/></td>
            </tr>
            <span class="tips">{{TipsEmail}}</span>
          </table>
          <el-button class="dele" @click="dele()">取消</el-button>
          <el-button type="primary" class="save" @click="save(organizationList)">保存</el-button>
        </div>
        <div class="highAuto">
          <p class="titleInfor"><span>丨</span>子机构<el-button type="primary" size="small" class="edits" @click="addOrgChild('新增')">新增</el-button></p>
          <div class="highAuto list_box">
            <el-table :data="subMechanism">
              <el-table-column
                fixed
                type="index"
                width="150"
                label="序号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="addressDetail"
                label="地址"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credential"
                label="管理账号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                align="center">
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row,'编辑')" type="text" size="small">编辑</el-button>
                  <!--<el-button @click="deletedList(scope.row)" type="text" size="small">删除</el-button>-->
                  <el-button @click="resetPass(scope.row)" type="text" size="small">修改密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!--新增或编辑-->
    <el-dialog :title="addName+'子机构'" :visible.sync="dialogFormVisible" :append-to-body="true" width="28%" :close-on-click-modal="false"  @close='closeDialogAdd'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" required>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="provChild" style="margin-right: 5px">
                <el-input type="text" v-model="ruleForm.provChild" placeholder="请输入省份"></el-input>
                <!--<select class="selectSpecial" v-model="ruleForm.provChild" @change="changeProvChild">-->
                  <!--<option v-for="option in arr" :label="option.name"  :key="option.value"  :value="option.name">{{ option.name }}</option>-->
                <!--</select>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityChild" style="margin-right: 5px">
                <el-input type="text" v-model="ruleForm.cityChild" placeholder="请输入城市"></el-input>
                <!--<select class="selectSpecial" v-model="ruleForm.cityChild" @change="changeCityChild">-->
                  <!--<option  v-for="a in cityArr" :label="a.name"  :key="a.value"  :value="a.name">{{ a.name }}</option>-->
                <!--</select>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="districtChild">
                <el-input type="text" v-model="ruleForm.districtChild" placeholder="请输入区"></el-input>
                <!--<select class="selectSpecial" v-model="ruleForm.districtChild" v-if="ruleForm.districtChild">-->
                  <!--<option  v-for="b in districtArr" :label="b.name" :key="b.value" :value="b.name">{{ b.name }}</option>-->
                <!--</select>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24">
            <el-form-item prop="address">
              <el-input type="text" v-model="ruleForm.address" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="管理员姓名" prop="nickname">
          <el-input type="text" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="管理员账号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="邮箱" prop="mail">
          <el-input type="text" v-model="ruleForm.mail"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="floatRight" type="primary" @click="submitSure(addName,'ruleForm')">确 定</el-button>
            <!-- :disabled="btnDisable" -->
          <el-button class="floatRight" style="margin-right: 10px" @click="cancelAdd(addName,'ruleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--删除-->
    <el-dialog
      title="删除子机构"
      :visible.sync="dialogVisible"
      :append-to-body="true" width="20%"
      :close-on-click-modal="false">
      <span>确定删除“{{deleteContent}}”吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--重置密码-->
    <el-dialog title="修改密码" :visible.sync="dialogPassVisible" :append-to-body="true" width="20%" :close-on-click-modal="false" @close='closeDialog'>
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pass" label-width="80px">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repass" label-width="80px">
          <el-input type="password" v-model="form.repass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="floatRight" type="primary" :disabled="btnDisable" @click="rePassSuer('form')">确定</el-button>
          <el-button class="floatRight" style="margin-right: 10px" @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import data from "../../common/cityData.js";

  export default {
    data() {
      //新密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else {
          if (this.form.repass !== '') {
            this.$refs.form.validateField('repass');
          }
          callback();
        }
      };
      //确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //输入为空格
      var validateK = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入内容'));
        } else {
          callback();
        }
      }
      //手机号
      var validateP = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入手机号'));
        } else if (!/^1[345678]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }else {
          callback();
        }
      }
      //空格
      var validate = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('不能为空格'));
        }else {
          callback();
        }
      }
      //密码
      var validatePW = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else {
          callback();
        }
      };
      //邮箱号
      var validateMail = (rule, value, callback) => {
        if(value!=''&&!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
          callback(new Error('请输入正确的邮箱号'));
        } else {
          callback();
        }
      };
      return {
        btnDisable:false,
        form: {
          pass:'',
          repass:''
        },
        formLabelWidth: '120px',
        dialogPassVisible:false,
        dialogFormVisible:false,
        dialogVisible:false,
        deleteContent:'',
        ruleForm: {
          name: '',
          provChild: '',
          cityChild: '',
          districtChild: '',
          address:'',
          nickname:'',
          phone:'',
          password:'',
          mail:''
        },
        rules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' },
            {validator: validateK, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: validateP, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePW, trigger: 'blur'}
          ],
          mail: [
            {validator: validateMail, trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {validator: validate, trigger: 'blur'}
          ],
          repass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          provChild: [
            {required: true, message: '请输入省份', trigger: 'blur'},
            {validator: validate, trigger: 'blur'}
          ],
          cityChild: [
            {required: true, message: '请输入城市', trigger: 'blur'},
            {validator: validate, trigger: 'blur'}
          ],
          districtChild: [
            {required: true, message: '请输入区', trigger: 'blur'},
            {validator: validate, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            {validator: validate, trigger: 'blur'}
          ]
        },
        //子机构列表
        subMechanism:[],
        //新增
        addName:'新增',
        //验证
        TipsEmail: '',
        TipsPhone: '',
        TipsName: '',
        TipsPerson: '',

        mySave: false,
        obj: {
          orgaName: '西丽社区健康服务中心',
          Contacts: "张昊",
          ContNum: "1654564",
          Address: "",
          MailBox: "51655556@163.com",
          detailArea: ""
        },
        //省市区三级
        arr: data,
        prov: '北京',
        city: '北京',
        district: '东城区',
        cityArr: [],
        districtArr: [],
        organizationList: {
          city: '',
          district: '',
          address: '',
        },
        num: 0
      }
    },
    created: function () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let data = {
          organizationId:user.organizationId
        };
      this.$api.organizationId(data, res => {
        if(res.data.data){
          this.organizationList = res.data.data
          this.organizationList.createTime = this.formatDate(res.data.data.createTime).replace(/\s[\x00-\xff]*/g, '')
          this.organizationList.contactPerson = res.data.data.contactPerson ? res.data.data.contactPerson : ''
          this.prov = res.data.data.province
          this.city = res.data.data.city
          this.district = res.data.data.district
        }
        this.updateCity();
        this.updateDistrict();
      })
      this.childOrgList()
    },
    methods: {
      //子机构列表
      childOrgList(){
        this.$api.queryChildList({}, result1 => {
          this.subMechanism = result1.data.data
          for(var i=0;i<result1.data.data.length;i++){
            this.subMechanism[i].addressDetail = result1.data.data[i].province+result1.data.data[i].city+result1.data.data[i].district+result1.data.data[i].address
          }
        })
      },
      //修改密码
      resetPass(a){
        this.dialogPassVisible = true
        this.ruleForm.userId = a.userId
      },
      rePassSuer(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisable = true
            let data = {
              userId: this.ruleForm.userId,
              password: this.form.pass
            }
            this.$api.orgUpdatePassword(data,res=>{
              this.btnDisable = false
              if(res.data.code==0){
                this.dialogPassVisible = false
                this.form.pass = ""
                this.form.repass = ""
                this.$message(res.data.data)
              }
            },res=>{
                this.dialogPassVisible = false
                this.$message(res.data.errMsg)
            })
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields()
        this.dialogPassVisible = false
        this.form.pass = ""
        this.form.repass = ""
      },
      closeDialog(){
        this.form.pass = ""
        this.form.repass = ""
      },
      closeDialogAdd(){
        this.ruleForm = {
          name: '',
          provChild: '',
          cityChild: '',
          districtChild: '',
          address:'',
          phone:'',
          nickname:'',
          password:'',
          mail:''
        }
      },
      cancelAdd(a,formName){
        this.$refs[formName].resetFields()
        this.dialogFormVisible = false
        if(a=='编辑'){
          this.ruleForm = {
            name: '',
            provChild: '',
            cityChild: '' ,
            districtChild: '',
            address:'',
          }
        }else if(a=='新增'){
          this.ruleForm = {
            name: '',
            provChild: '',
            cityChild: '',
            districtChild: '',
            address:'',
            phone:'',
            nickname:'',
            password:'',
            mail:''
          }
        }

      },
      //编辑子机构
      handleClick(a,name){
        //console.log(a)
        this.addName = name
        this.ruleForm.name = a.name
        this.ruleForm.provChild = a.province
        this.ruleForm.cityChild = a.city
        this.ruleForm.districtChild = a.district
        this.ruleForm.address = a.address
        this.ruleForm.organizationId = a.organizationId
        this.dialogFormVisible = true
      },
      //新增子机构
      addOrgChild(a){
        this.ruleForm =  {
          name: '',
          provChild: '',
          cityChild: '',
          districtChild: '',
          address:'',
          phone:'',
          nickname:'',
          password:'',
          mail:''
        }
        this.addName = a
        this.dialogFormVisible = true
      },
      submitSure(a,formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(a=='新增'){
              this.btnDisable = true
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                name:  this.ruleForm.name,
                type: 1,
                parentId: user.organizationId,
                province: this.ruleForm.provChild,
                city: this.ruleForm.cityChild,
                district: this.ruleForm.districtChild,
                address: this.ruleForm.address,
                adminNickname:this.ruleForm.nickname,
                adminPhone: this.ruleForm.phone,
                adminPassword: this.ruleForm.password,
                adminEmail: this.ruleForm.mail
              }
              this.$api.addOrganization(data,re=>{
                this.dialogFormVisible = false
                if(re.data.code==0){
                  this.btnDisable = false
                  this.childOrgList()
                  this.ruleForm =  {
                    name: '',
                    provChild: '',
                    cityChild: '',
                    districtChild: '',
                    address:'',
                    nickname:'',
                    phone:'',
                    password:'',
                    mail:''
                  }
                }
              }, (error) => {
                this.$message.error(error.data.errMsg);
              });
            }else if(a == '编辑'){
              this.btnDisable = true
              let data = {
                name:  this.ruleForm.name,
                type: 1,
                organizationId:  this.ruleForm.organizationId,
                province: this.ruleForm.provChild,
                city: this.ruleForm.cityChild,
                district: this.ruleForm.districtChild,
                address: this.ruleForm.address,
              }
              this.$api.organizationUpdateById(data, re=>{
                this.btnDisable = false
                this.dialogFormVisible = false
                if(re.data.code==0){
                  this.childOrgList()
                  this.ruleForm = {
                    name: '',
                    provChild: '',
                    cityChild: '' ,
                    districtChild: '',
                    address:'',
                  }
                }
              }, (error) => {
                this.$message.error(error.data.errMsg);
              });
            }
          }
        })
      },
      //删除子机构
      deletedList(a){
        this.dialogVisible = true
        this.deleteContent = a.name
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      changeProv(value) {
        this.prov = value.target.value
        this.updateCity();
        this.updateDistrict();
      },
      // changeProvChild(value) {
      //   this.ruleForm.provChild = value.target.value
      //   this.updateCityChild();
      //   this.updateDistrictChild();
      // },
      changeCity(value) {
        this.city = value.target.value
        this.updateDistrict();
      },
      // changeCityChild(value) {
      //   this.ruleForm.cityChild = value.target.value
      //   this.updateDistrictChild();
      // },
      edits() {
        this.mySave = true;
        this.city = this.organizationList.city
        this.district = this.organizationList.district
        this.num++
      },
      dele() {
        this.mySave = false;
        this.city = this.organizationList.city
        this.updateDistrict()
        this.district = this.organizationList.district
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          organizationId:user.organizationId
        };
        this.$api.organizationId(data, res => {
          this.organizationList = res.data.data
          this.organizationList.createTime = this.formatDate(res.data.data.createTime).replace(/\s[\x00-\xff]*/g, '')
          this.organizationList.contactPerson = res.data.data.contactPerson ? res.data.data.contactPerson : ''
          this.prov = res.data.data.province
          this.city = res.data.data.city
          this.district = res.data.data.district
          this.updateCity();
          this.updateDistrict();
        })
      },
      save(org) {
        let that = this
        if (this.organizationList.name.replace(/(^\s*)|(\s*$)/g, "")  == "") {
          that.TipsName = '机构名称不能为空'
        } else if (this.organizationList.contactPerson.replace(/(^\s*)|(\s*$)/g, "") == "") {
          that.TipsPerson = "联系人不能为空"
        } else if (this.organizationList.phone.replace(/(^\s*)|(\s*$)/g, "")  == "") {
          that.TipsPhone = '手机号码不能为空'
        } else if (!/^1[345678]\d{9}$/.test(this.organizationList.phone)) {
          that.TipsPhone = '请输入正确的手机号'
        } else if (this.organizationList.email.replace(/(^\s*)|(\s*$)/g, "")  != "" && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(that.organizationList.email))) {
          that.TipsEmail = '请输入正确的邮箱'
        } else {
          that.TipsPhone = ""
          that.TipsEmail = ''
          that.TipsPerson = ''
          that.TipsName = ''
          that.mySave = false;
          let data = {
            organizationId: org.organizationId,
            name: that.organizationList.name,
            contactPerson: that.organizationList.contactPerson,
            phone: that.organizationList.phone,
            email: that.organizationList.email,
            province: that.prov,
            city: that.city,
            district: that.district,
            address: that.organizationList.address,
          }
          that.$api.chanegOrg(data, res => {
            let user = JSON.parse(sessionStorage.getItem('user'))
            var dataOrganizationId = {
              organizationId:user.organizationId
            }
            that.$api.organizationId(dataOrganizationId, res => {
              that.organizationList = res.data.data
              that.organizationList.createTime = this.formatDate(res.data.data.createTime).replace(/\s[\x00-\xff]*/g, '')
              that.organizationList.contactPerson = res.data.data.contactPerson ? res.data.data.contactPerson : ''
            })
          })
        }
      },
      //select address
      updateCity: function () {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        if (this.num != 0) this.city = this.cityArr[1].name;

      },
      updateDistrict: function () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      }
    },
  }
</script>
<style scoped>
  .selectSpecial{
    display: block;
    height: 40px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-right: 15px;
    color: #606266;
  }
  .tips {
    color: #ff6372;
    margin-top: -1.5rem;
    position: absolute;
    font-size: 0.3rem;
    width: 300px;
    text-align: center;
  }
  .titleInfor{
    margin-left: 15px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #bab8b5;
  }
  .titleInfor span{
    font-weight: bold;
  }

  table tr td input {
    width: 240px;
    height: 26px;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
    vertical-align: bottom;
  }

  table tr td {
    vertical-align: center;
  }
  .list_box{
    margin-left:15px;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    margin-top: 20px;
  }
  .edits{
    float: right;
    margin-top: 10px;
  }
  .dele, .save {
    position: absolute;
    right: 60px;
    top: 270px;
    /* width: 80px;
        height: 28px;
        border-radius: 4px;
        color: white;
        line-height: 28px;
        text-align: center;
        cursor: pointer; */
  }

  .dele {
    right: 150px;
    /* background-color: white;
        color: #267bf7;
        border: solid 1px rgba(206, 206, 206, 0.7); */
  }

  .contact {
    float: left;
    margin-top: 51px;
  }

  .institution {
    /*position: absolute;*/
    /*top: 51px;*/
    /*left: 61px;*/
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 40px;
    float: left;
    width: 65%;
  }

  .agenInfor {
    width: 89%;
    position: relative;
    min-height: 830px;
    min-width: 1100px;
    /*position: absolute;*/
    /*left: 160px;*/
    float: left;
    border-left: 1px solid #eff2f5;
    padding-bottom: 30px;
  }

  .agenInforSpecial table tr {
    display: block;
    margin-bottom: 30px;
  }
  .agenInforSpecial .slect {
    width: 90px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-right: 15px;
  }
  .row {
    display: inline-block;
    vertical-align: middle;
  }

  .col {
    float: left;
  }

</style>
<style lang="less">
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
</style>
