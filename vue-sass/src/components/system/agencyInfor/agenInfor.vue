<template>
  <div>
    <div>
      <div class="agenInfor">
        <div class="highAuto agenInforSpecial" v-if="!mySave">
          <p class="titleInfor"><span>丨</span>主机构
            <el-button type="primary" size="small" class="edits" @click="edits()">编辑</el-button>
          </p>
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
              <td><input type="text" v-model="organizationList.name" /></td>
            </tr>
            <span class="tips">{{TipsName}}</span>
            <tr>
              <td>联 系 人 ：</td>
              <td><input type="text" v-model="organizationList.contactPerson" /></td>
            </tr>
            <span class="tips">{{TipsPerson}}</span>
            <tr>
              <td>联系电话：</td>
              <td><input type="text" v-model="organizationList.phone" /></td>
            </tr>
            <span class="tips">{{TipsPhone}}</span>
            <tr>
              <td>所在地址：</td>
              <td>
                <div class="row">
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入省份" v-model="prov" />
                    <!--<select v-model="prov" @change="changeProv">-->
                    <!--<option v-for="option in arr" :value="option.name">-->
                    <!--{{ option.name }}-->
                    <!--</option>-->
                    <!--</select>-->
                  </div>
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入城市" v-model="city" />
                    <!--<select v-model="city" @change="changeCity">-->
                    <!--<option v-for="option in cityArr" :value="option.name">-->
                    <!--{{ option.name }}-->
                    <!--</option>-->
                    <!--</select>-->
                  </div>
                  <div class="col">
                    <input type="text" class="slect" placeholder="请输入区" v-model="district" />
                    <!--<select v-model="district" v-if="district">-->
                    <!--<option v-for="option in districtArr" :value="option.name">-->
                    <!--{{ option.name }}-->
                    <!--</option>-->
                    <!--</select>-->
                  </div>
                </div>
                <input type="text" placeholder="详细地址" v-model="organizationList.address" />
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
              <td><input type="text" v-model="organizationList.email" /></td>
            </tr>
            <span class="tips">{{TipsEmail}}</span>
          </table>
          <el-button class="dele" @click="dele()">取消</el-button>
          <el-button type="primary" class="save" @click="save(organizationList)">保存</el-button>
        </div>
        <div class="highAuto">
          <p class="titleInfor"><span>丨</span>子机构
            <el-button type="primary" size="small" class="edits" @click="addOrgChild('新增')">新增</el-button>
          </p>
          <div class="highAuto list_box">
            <el-table :data="subMechanism">
              <el-table-column fixed type="index" width="150" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="名称" align="center">
              </el-table-column>
              <el-table-column prop="addressDetail" label="地址" align="center">
              </el-table-column>
              <el-table-column prop="credential" label="管理账号" align="center">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" align="center">
              </el-table-column>
              <el-table-column prop="" label="操作" align="center">
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
    <div v-if="dialogFormVisible">
      <el-dialog :title="addName+'子机构'" :visible.sync="dialogFormVisible" :append-to-body="true" width="475px" :close-on-click-modal="false"  @close="closeDialogAdd('ruleForm')">
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
          <el-input type="text" v-model="ruleForm.phone" placeholder="请输入手机号" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码为6到16位的英文或数字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="addName=='新增'" label="邮箱" prop="mail">
          <el-input type="text" v-model="ruleForm.mail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="floatRight" type="primary" @click="submitSure(addName,'ruleForm')">确 定</el-button>
          <el-button class="floatRight" style="margin-right: 10px" @click="closeDialogAdd('ruleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
    <!--删除子机构-->
    <div v-if="dialogVisible">
      <el-dialog title="删除子机构" :visible.sync="dialogVisible" :append-to-body="true" width="300px" :close-on-click-modal="false">
      <span>确定删除“{{deleteContent}}”吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!--重置密码-->
    <changePassDialog source='updatePassword' :userId="userId" :isOldPwd='isOldPwd' ref='changePassDialog'></changePassDialog>

  </div>
</template>

<script>
  import data from "../../common/cityData";
  import funBus from '../../../assets/js/funBus';
  import changePassDialog from '../../common/commonDialog/changePassDialog';

  export default {
    data() {
      return {
        dialogFormVisible: false, //是否显示编辑子机构弹窗
        dialogVisible: false, //是否显示删除子机构弹窗
        deleteContent: '', //要删除的子机构名称
        ruleForm: {
          name: '',
          provChild: '',
          cityChild: '',
          districtChild: '',
          address: '',
          nickname: '',
          phone: '',
          password: '',
          mail: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入机构名称',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          phone: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            //{pattern: /^[1][0-9]{10}$/, message: '手机号格式有误！', trigger: 'blur'}
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式有误！',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: funBus.validatePWD,
              trigger: 'blur'
            }
          ],
          mail: [{
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }],
          nickname: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          provChild: [{
              required: true,
              message: '请输入省份',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          cityChild: [{
              required: true,
              message: '请输入城市',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          districtChild: [{
              required: true,
              message: '请输入区',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          address: [{
              required: true,
              message: '请输入详细地址',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ]
        },
        //子机构列表
        subMechanism: [],
        //新增
        addName: '新增',
        //验证
        TipsEmail: '',
        TipsPhone: '',
        TipsName: '',
        TipsPerson: '',
        mySave: false,
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
        num: 0,
        isOldPwd: false, //修改密码弹窗是否显示旧密码栏
        userId: '',
      }
    },
    components: {
      changePassDialog
    },
    created: function () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let data = {
        organizationId: user.organizationId
      };
      this.$api.organizationId(data, res => {
        if (res.data.data) {
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
      childOrgList() {
        this.$api.queryChildList({}, result1 => {
          this.subMechanism = result1.data.data
          for (var i = 0; i < result1.data.data.length; i++) {
            this.subMechanism[i].addressDetail = result1.data.data[i].province + result1.data.data[i].city + result1.data.data[i].district + result1.data.data[i].address
          }
        })
      },
      //修改密码
      resetPass(a) {
        if (!a.userId) {
          this.$message.error('该管理员userId为' + a.userId + '，无法更换密码!');
        } else {
          this.$refs.changePassDialog.isShowChangePassDialog = true;
          this.userId = a.userId;
        }
      },
      //关闭子机构编辑弹窗
      closeDialogAdd(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      //编辑子机构
      handleClick(a, name) {
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
      addOrgChild(a) {
        this.addName = a
        this.dialogFormVisible = true
      },
      //提交子机构信息
      submitSure(a, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.openLoading();
            if (a == '新增') {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                name: this.ruleForm.name,
                type: 1,
                parentId: user.organizationId,
                province: this.ruleForm.provChild,
                city: this.ruleForm.cityChild,
                district: this.ruleForm.districtChild,
                address: this.ruleForm.address,
                adminNickname: this.ruleForm.nickname,
                adminPhone: this.ruleForm.phone,
                adminPassword: this.ruleForm.password,
                adminEmail: this.ruleForm.mail
              }
              this.$api.addOrganization(data, re => {
                if (re.data.code == 0) {
                  this.closeDialogAdd(formName);
                  this.childOrgList()
                  this.closeLoading();
                }
              }, (error) => {
                this.$message.error(error.data.errMsg);
                this.closeLoading();
              });
            } else if (a == '编辑') {
              let data = {
                name: this.ruleForm.name,
                type: 1,
                organizationId: this.ruleForm.organizationId,
                province: this.ruleForm.provChild,
                city: this.ruleForm.cityChild,
                district: this.ruleForm.districtChild,
                address: this.ruleForm.address,
              }
              this.$api.updateOrganization(data, re => {
                if (re.data.code == 0) {
                  this.closeDialogAdd(formName);
                  this.childOrgList()
                  this.closeLoading();
                }
              }, (error) => {
                this.$message.error(error.data.errMsg);
                this.closeLoading();
              });
            }
          }
        })
      },
      //删除子机构
      deletedList(a) {
        this.dialogVisible = true
        this.deleteContent = a.name
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
          organizationId: user.organizationId
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
      //保存提交主机构信息
      save(org) {
        let that = this
        if (this.organizationList.name.replace(/(^\s*)|(\s*$)/g, "") == "") {
          that.TipsName = '机构名称不能为空'
        } else if (this.organizationList.contactPerson.replace(/(^\s*)|(\s*$)/g, "") == "") {
          that.TipsPerson = "联系人不能为空"
        } else if (this.organizationList.phone.replace(/(^\s*)|(\s*$)/g, "") == "") {
          that.TipsPhone = '手机号码不能为空'
        } else if (!/^1\d{10}$/.test(this.organizationList.phone)) {
          that.TipsPhone = '请输入正确的手机号'
        } else if (this.organizationList.email && this.organizationList.email.replace(/(^\s*)|(\s*$)/g, "") != "" && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(that.organizationList.email))) {
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
          this.openLoading();
          that.$api.updateOrganization(data, res => {
            let user = JSON.parse(sessionStorage.getItem('user'))
            var dataOrganizationId = {
              organizationId: user.organizationId
            }
            that.$api.organizationId(dataOrganizationId, res => {
              that.organizationList = res.data.data
              that.organizationList.createTime = this.formatDate(res.data.data.createTime).replace(/\s[\x00-\xff]*/g, '')
              that.organizationList.contactPerson = res.data.data.contactPerson ? res.data.data.contactPerson : ''
              this.closeLoading();
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
        if (this.num != 0) {
          if (this.cityArr.length > 0) {
            this.city = this.cityArr[1].name;
          }
        }

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
  .selectSpecial {
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
  .titleInfor {
    margin-left: 15px;
    margin-right: 10px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #bab8b5;
  }
  .titleInfor span {
    font-weight: bold;
  }
  .edits {
    float: right;
    margin-top: 10px;
  }
  .dele,
  .save {
    position: absolute;
    right: 60px;
    top: 290px;
  }
  .dele {
    right: 150px;
  }
  .agenInforSpecial {
    position: relative;
    height: 340px;
  }
  .contact {
    position: absolute;
    right: 70px;
    width: 280px;
    margin-top: 20px;
  }
  .institution {
    /*position: absolute;*/
    /*top: 51px;*/
    /*left: 61px;*/
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 40px;
    float: left;
    width: 600px;
  }
  .agenInforSpecial input {
    height: 26px;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
    vertical-align: bottom;
  }
  .agenInforSpecial .institution table tr td input {
    width: 240px;
  }
  .agenInforSpecial .contact table tr td input {
    width: 200px;
  }
  .agenInforSpecial table tr td {
    vertical-align: center;
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
