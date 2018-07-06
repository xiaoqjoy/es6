<template>
  <div>
    <sys-tem></sys-tem>
    <div class="basedDiction">
      <h3>基础字典</h3>
      <div class="basedDictions contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/basedDiction/'+it.typeCode == $route.path}"
                @click="myTabss(index,it)">{{it.typeName}}
            </li>
          </ul>
        </div>
        <router-view :meansInterven="meansInterven" :patientsType="patientsType" :interType="interType"
                    :followWay="followWay" :checkType="checkType" :compliName="compliName" @newWays="newWays"
                    @delWays="delWays" @newType="newType" @delType="delType" @newInterType="newInterType"
                    @delIntType="delIntType" @newFolWay="newFolWay" @delFolWay="delFolWay" @newChecType="newChecType"
                    @delChecType="delChecType" @newCompli="newCompli" @delCompli="delCompli"></router-view>
      </div>
    </div>
    <!--新增编辑干预方式-->
    <div class="newWay" v-if="ifNewWay">
      <div class="newWays">
        <h5>{{ruleFormTitle}}方式</h5>
        <span class="close" @click="newWayCloses('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="干预方式" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="myNewWays">
              <option v-for="a in order" :value="a">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancels_New('ruleForm')">取消</el-button>
            <el-button type="primary" @click="myNewWay('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除干预方式-->
    <div class="delWay" v-if="ifDelWay">
      <div class="delWays">
        <h5>删除方式</h5>
        <span class="close" @click="delWayClose()">X</span>
        <p>确定要删除干预方式“<span>{{ruleForm.name}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_Del()">取消</el-button>
        <el-button type="primary" class="sures" @click="delWaysSu(ruleForm)">确定</el-button>
      </div>
    </div>
    <!--新增编辑患者类型-->
    <div class="newType" v-if="ifNewType">
      <div class="newTypes">
        <h5>{{newTypeName}}类型</h5>
        <span class="close" @click="newTypeCloses('newTypeList')">X</span>
        <el-form :model="newTypeList" :rules="rules" ref="newTypeList" label-width="80px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="患者类型" prop="itemValue">
            <el-input v-model="newTypeList.itemValue"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="myNewTypes">
              <option :value="a" v-for="a in order">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancels_Type('newTypeList')">取消</el-button>
            <el-button type="primary" @click="myNewType('newTypeList')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除类型-->
    <div class="delType" v-if="ifDelType">
      <div class="delTypes">
        <h5>删除类型</h5>
        <span class="close" @click="delTypeClose()">X</span>
        <p>确定要删除患者类型“<span>{{delTypeInfo.itemValue}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelType()">取消</el-button>
        <el-button type="primary" class="sures" @click="delTypeSu(delTypeInfo)">确定</el-button>
      </div>
    </div>
    <!--新增编辑干预类型-->
    <div class="newType" v-if="ifNewIntType">
      <div class="newTypes">
        <h5>{{newIntTypeName}}类型</h5>
        <span class="close" @click="IntTypeCloses('newIntTypeList')">X</span>
        <el-form :model="newIntTypeList" :rules="rules" ref="newIntTypeList" label-width="80px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="干预类型" prop="itemValue">
            <el-input v-model="newIntTypeList.itemValue"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="myNewIntTypes">
              <option :value="a" v-for="a in order">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancels_int('newIntTypeList')">取消</el-button>
            <el-button type="primary" @click="myNewIntType('newIntTypeList')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除类型-->
    <div class="delType" v-if="ifdelInt">
      <div class="delTypes">
        <h5>删除类型</h5>
        <span class="close" @click="delIntClose()">X</span>
        <p>确定要删除干预类型“<span>{{delIntTypeName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelInt()">取消</el-button>
        <el-button type="primary" class="sures" @click="delIntTypeSu(delIntTypeitem)">确定</el-button>
      </div>
    </div>
    <!--新增随访方式-->
    <div class="newWay" v-if="ifFolWay">
      <div class="newWays">
        <h5>{{newFolWayName}}方式</h5>
        <span class="close" @click="folWayCloses('newFolWayList')">X</span>
        <el-form :model="newFolWayList" :rules="rules" ref="newFolWayList" label-width="80px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="随访方式" prop="itemValue">
            <el-input v-model="newFolWayList.itemValue"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="myFolWays">
              <option :value="a" v-for="a in order">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancels_fol('newFolWayList')">取消</el-button>
            <el-button type="primary" @click="myFolWay('newFolWayList')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除方式-->
    <div class="delWay" v-if="ifDelFolWay">
      <div class="delWays">
        <h5>删除方式</h5>
        <span class="close" @click="delFolWayClose()">X</span>
        <p>确定要删除随访方式“<span>{{DelFolWayName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelFol()">取消</el-button>
        <el-button type="primary" class="sures" @click="delFolWaySu(DelFolWayId)">确定</el-button>
      </div>
    </div>
    <!--新增编辑检查报告类型-->
    <div class="newType" v-if="ifNewchecType">
      <div class="newTypes">
        <h5>{{newChecTypeName}}类型</h5>
        <span class="close" @click="checTypeCloses('newChecTypeList')">X</span>
        <el-form :model="newChecTypeList" :rules="rules" ref="newChecTypeList" label-width="80px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="报告类型" prop="itemValue">
            <el-input v-model="newChecTypeList.itemValue"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="myNewchecTypes">
              <option :value="a" v-for="a in order">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancels_chec('newChecTypeList')">取消</el-button>
            <el-button type="primary" @click="myNewchecType('newChecTypeList')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除检查报告类型-->
    <div class="delType" v-if="ifdelChec">
      <div class="delTypes">
        <h5>删除类型</h5>
        <span class="close" @click="delChecClose()">X</span>
        <p>确定要删除报告类型“<span>{{delChecTypeName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelChec()">取消</el-button>
        <el-button type="primary" class="sures" @click="delChecTypeSu(delChecTypeId)">确定</el-button>
      </div>
    </div>
    <!--新增编辑并发症-->
    <div class="newType" v-if="ifcompli">
      <div class="newTypes">
        <h5>{{newCompliName}}并发症</h5>
        <span class="close" @click="compliCloses('newCompliList')">X</span>
        <el-form :model="newCompliList" :rules="rules" ref="newCompliList" label-width="68px" class="demo-ruleForm"
                style="margin-top: 20px;border-top: 1px solid #e0e0e0;padding-top: 20px;">
          <el-form-item label="并发症" prop="itemValue">
            <el-input v-model="newCompliList.itemValue"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="">
            <select v-model="selectA" class="comp">
              <option :value="a" v-for="a in order">{{a}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel_com('newCompliList')">取消</el-button>
            <el-button type="primary" @click="complis('newCompliList')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--删除并发症-->
    <div class="delType" v-if="ifdelCompli">
      <div class="delTypes">
        <h5>删除并发症</h5>
        <span class="close" @click="delCompliClose()">X</span>
        <p>确定要删除并发症“<span>{{delCompliName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_delCompli()">取消</el-button>
        <el-button type="primary" class="sures" @click="delCompliSu(delCompliId)">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  var arr_ = [];
  for (var i = 0; i < 100; i++) {
    arr_[i] = i + 1;
  }
  var typeCode = function (typeCode, path) {
    for (var i = 0; i < typeCode.length; i++) {
      if ('/basedDiction/' + typeCode[i].typeCode == path) {
        return typeCode[i].typeCode;
      }
    }
  }
  import funBus from '../../../assets/js/funBus';
  
  export default {
    data() {
      return {
        myIndex: 3,
        selectA: 1,
        //校验
        ruleForm: {
          name: '',
          vaule: '',
          itemId: ''
        },
        rules: {
          name: [
            {required: true, message: '输入为空', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          itemValue: [
            {required: true, message: '输入为空', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ]
        },
        //排序
        order: arr_,
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
        radio: '1',
        ifNewWay: false,
        ifDelWay: false,
        ifNewType: false,
        ifDelType: false,
        ifNewIntType: false,
        ifdelInt: false,
        ifFolWay: false,
        ifDelFolWay: false,
        ifNewchecType: false,
        ifdelChec: false,
        ifcompli: false,
        ifdelCompli: false,
        activess: 0,
        arrs: "",
        typeCode: "",
        interveneList: [],
        patientsType: [],
        interType: [],
        meansInterven: [],
        followWay: [],
        checkType: [],
        compliName: [],
        ruleFormTitle: '',
        newTypeName: '',
        newTypeList: {
          itemValue: '',
          itemSort: '',
          itemId: ''
        },
        delTypeInfo: {},
        newIntTypeName: "",
        newIntTypeList: {
          itemValue: '',
          itemSort: '',
          itemId: ''
        },
        delIntTypeName: '',
        delIntTypeitem: {},
        newFolWayName: '',
        newFolWayList: {
          itemValue: '',
          itemSort: '',
          itemId: ''
        },
        DelFolWayName: '',
        DelFolWayId: {},
        newChecTypeName: '',
        newChecTypeList: {
          itemValue: '',
          itemSort: '',
          itemId: ''
        },
        delChecTypeName: '',
        delChecTypeId: {},
        newCompliName: "",
        newCompliList: {
          itemValue: '',
          itemSort: '',
          itemId: ''
        },
        delCompliName: '',
        delCompliId: {}
      }
    },
    methods: {
      cancels_chec(formName) {
        this.$refs[formName].resetFields();
        this.ifNewchecType = false;
      },
      //
      cancel_com(formName) {
        this.$refs[formName].resetFields();
        this.ifcompli = false;
      },

      //新增编辑并发症
      newCompli(a, name, row) {
        this.ifcompli = a;
        this.newCompliName = name
        this.typeCode = typeCode(this.arrs, this.$route.path);
        this.selectA = 1
        if (row) {
          this.newCompliList = row
          this.selectA = row.itemSort
        } else {
          this.newCompliList = {
            itemValue: '',
            itemSort: '',
            itemId: ''
          }
        }
      },
      complis(formName) {
        this.$refs[formName].validate((valid) => {
          //如果没有格式错误
          let that = this
          if (valid) {
            if (that.newCompliName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newCompliList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifcompli = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.newCompliName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newCompliList.itemId,
                itemValue: that.newCompliList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifcompli = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除并发症
      delCompli(a, row) {
        this.ifdelCompli = a;
        this.delCompliName = row.itemValue
        this.delCompliId = row
      },
      delCompliSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifdelCompli = false;
            this.intervene(a.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },

      cancels_delCompli() {
        this.ifdelCompli = false;
      },
      delCompliClose() {
        this.ifdelCompli = false;
      },
      compliCloses(newCompliList) {
        this.$refs[newCompliList].resetFields();
        this.ifcompli = false;
      },

      //新增编辑检查报告
      newChecType(a, name, row) {
        this.ifNewchecType = a;
        this.typeCode = typeCode(this.arrs, this.$route.path);
        this.newChecTypeName = name
        this.selectA = 1
        // console.log(row)
        if (row) {
          this.newChecTypeList = row
          this.selectA = row.itemSort
        } else {
          this.newChecTypeList = {
            itemValue: '',
            itemSort: '',
            itemId: ''
          }
        }
      },
      myNewchecType(formName) {
        this.$refs[formName].validate((valid) => {
          //如果没有格式错误
          let that = this
          if (valid) {
            if (that.newChecTypeName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newChecTypeList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewchecType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.newChecTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newChecTypeList.itemId,
                itemValue: that.newChecTypeList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewchecType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除编辑检查报告
      delChecType(a, row) {
        this.ifdelChec = a;
        this.delChecTypeName = row.itemValue
        this.delChecTypeId = row
      },
      delChecTypeSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifdelChec = false;
            this.intervene(a.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },

      //新增编辑随访方式
      newFolWay(a, name, row) {
        this.ifFolWay = true;
        this.typeCode = typeCode(this.arrs, this.$route.path);
        this.newFolWayName = name
        this.selectA = 1
        // console.log(row)
        if (row) {
          this.newFolWayList = row
          this.selectA = row.itemSort
        } else {
          this.newFolWayList = {
            itemValue: '',
            itemSort: '',
            itemId: ''
          }
        }
      },
      myFolWay(formName) {
        this.$refs[formName].validate((valid) => {
          //如果没有格式错误
          let that = this
          if (valid) {
            if (that.newFolWayName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newFolWayList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifFolWay = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.newFolWayName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newFolWayList.itemId,
                itemValue: that.newFolWayList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifFolWay = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除随访方式
      delFolWay(a, row) {
        this.ifDelFolWay = a;
        this.DelFolWayName = row.itemValue
        this.DelFolWayId = row
      },
      delFolWaySu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifDelFolWay = false;
            this.intervene(a.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },

      //新增编辑干预类型
      newInterType(a, name, row) {
        this.ifNewIntType = a;
        this.newIntTypeName = name
        this.selectA = 1
        this.typeCode = typeCode(this.arrs, this.$route.path);
        // console.log(row)
        if (row) {
          this.newIntTypeList = row
          this.selectA = row.itemSort
        } else {
          this.newIntTypeList = {
            itemValue: '',
            itemSort: '',
            itemId: ''
          }
        }
      },
      myNewIntType(formName) {
        this.$refs[formName].validate((valid) => {
          //如果没有格式错误
          let that = this
          if (valid) {
            if (that.newIntTypeName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newIntTypeList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewIntType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.newIntTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newIntTypeList.itemId,
                itemValue: that.newIntTypeList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewIntType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除干预类型
      delIntType(a, row) {
        this.ifdelInt = a;
        this.delIntTypeName = row.itemValue
        this.delIntTypeitem = row
      },
      delIntTypeSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifdelInt = false;
            this.intervene(a.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },

      cancels_DelChec() {
        this.ifdelChec = false;
      },
      delChecClose() {
        this.ifdelChec = false;
      },
      checTypeCloses(newChecTypeList) {
        this.$refs[newChecTypeList].resetFields();
        this.ifNewchecType = false;
      },
      cancels_DelFol() {
        this.ifDelFolWay = false;
      },
      delFolWayClose() {
        this.ifDelFolWay = false;
      },
      folWayCloses(newFolWayList) {
        this.$refs[newFolWayList].resetFields();
        this.ifFolWay = false;
      },
      cancels_fol(formName) {
        this.$refs[formName].resetFields();
        this.ifFolWay = false;
      },
      cancels_DelInt() {
        this.ifdelInt = false;
      },
      delIntClose() {
        this.ifdelInt = false;
      },
      cancels_int(formName) {
        this.$refs[formName].resetFields();
        this.ifNewIntType = false;
      },
      IntTypeCloses(newIntTypeList) {
        this.$refs[newIntTypeList].resetFields();
        this.ifNewIntType = false;
      },

      cancels_DelType() {
        this.ifDelType = false;
      },
      delTypeClose() {
        this.ifDelType = false;
      },
      cancels_Type(formName) {
        this.$refs[formName].resetFields();
        this.ifNewType = false;
      },
      newTypeCloses(newTypeCloses) {
        this.ifNewType = false;
        this.$refs[newTypeCloses].resetFields();
      },

      //新增编辑干预方式
      newWays(a, name, row) {
        this.ifNewWay = a;
        this.ruleFormTitle = name
        this.selectA = 1
        this.typeCode = typeCode(this.arrs, this.$route.path);
        if (row) {
          this.ruleForm.name = row.itemValue
          this.ruleForm.itemId = row.itemId
          this.selectA = row.itemSort
        } else {
          this.ruleForm = {
            name: '',
            vaule: '',
            itemId: ''
          }
        }
      },
      myNewWay(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          //如果没有格式错误
          if (valid) {
            if (that.ruleFormTitle == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.ruleForm.name,
                itemSort: $(".myNewWays option:selected").text(),
                organId: user.organizationId
              }
              that.$api.addDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewWay = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.ruleFormTitle == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.ruleForm.itemId,
                itemValue: that.ruleForm.name,
                itemSort: $(".myNewWays option:selected").text(),
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewWay = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除干预方式
      delWays(a, row) {
        this.ifDelWay = a;
        this.ruleForm.name = row.itemValue
        this.ruleForm.value = row.itemSort
        this.ruleForm.itemId = row.itemId
      },
      delWaysSu: function (ruleForm) {
        var data = {
          itemId: ruleForm.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifDelWay = false;
            this.intervene(ruleForm.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },
      //新增编辑患者类型
      newType(a, name, row) {
        this.ifNewType = a;
        this.selectA = 1
        this.newTypeName = name
        this.typeCode = typeCode(this.arrs, this.$route.path);
        if (row) {
          this.newTypeList = row
          this.selectA = row.itemSort
        } else {
          this.newTypeList = {
            itemValue: '',
            itemSort: '',
            itemId: ''
          }
        }
      },
      myNewType(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          //如果没有格式错误
          if (valid) {
            if (that.newTypeName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newTypeList.itemValue,
                itemSort: this.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            } else if (that.newTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newTypeList.itemId,
                itemValue: that.newTypeList.itemValue,
                itemSort: that.selectA
              }
              this.$api.updataDictionary(data,res => {
                if (res.data.code == 0) {
                  that.ifNewType = false;
                  that.intervene(that.typeCode)
                }
              },res=>{
                this.$message(res.data.errMsg)
              })
            }

            //
            // var type = this.typeCode;
            // var value = this.ruleForm.name;
            // var sort = $(".myNewTypes option:selected").text();
            // var des = "";
            // this.$dist(type,value,sort,des);
          }
        })
      },
      //删除患者类型
      delType(a, row) {
        this.ifDelType = a;
        this.delTypeInfo = row
      },
      delTypeSu(delTypeInfo) {
        let data = {
          itemId: delTypeInfo.itemId
        }
        this.$api.deleDictionary(data,res => {
          if (res.data.code == 0) {
            this.ifDelType = false;
            this.intervene(delTypeInfo.typeCode)
          }
        },res=>{
            this.$message(res.data.errMsg)
          })
      },

      delWayClose() {
        this.ifDelWay = false;
      },
      cancels_Del() {
        this.ifDelWay = false;
      },
      //
      cancels_New(formName) {
        this.$refs[formName].resetFields();
        this.ifNewWay = false;
      },
      newWayCloses(ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.ifNewWay = false;
      },
      //触发弹窗
      newEmploy(n) {
        this.ifNewEmp = n;
      },
      newDepart(n) {
        this.myCode = n;
      },
      delDepart(n) {
        this.ifDel = n;
      },
      newRole(n) {
        this.ifNewRole = n;
      },
      delRole(n) {
        this.ifDelRole = n;
      },
      resetPass(n) {
        this.ifReset = n;
      },
      delStaff(n) {
        this.ifStaff = n;
      },
      //单选框
      radiosC(lable) {
        // console.log(lable)
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
        // console.log(value)
        let checkedCount = value.length;
        this.checkAll_1 = checkedCount === this.cities_1.length;
        this.isIndeterminate_1 = checkedCount > 0 && checkedCount < this.cities_1.length;
      },
      handleCheckedCitiesChange_2(value) {
        // console.log(value)
        let checkedCount = value.length;
        this.checkAll_2 = checkedCount === this.cities_2.length;
        this.isIndeterminate_2 = checkedCount > 0 && checkedCount < this.cities_2.length;
      },
      handleCheckedCitiesChange_3(value) {
        // console.log(value)
        let checkedCount = value.length;
        this.checkAll_3 = checkedCount === this.cities_3.length;
        this.isIndeterminate_3 = checkedCount > 0 && checkedCount < this.cities_3.length;
      },
      myTabss(index, it) {
        this.activess = index;
        //router跳转
        this.$router.push(it.typeCode)

//	  		console.log(this.$route.path);
//	  		if(it.typeName == "并发症名称"){
//	  			this.$router.push(it.typeCode)
//	  		}
//	  		if(it.typeName == "患者类型"){
//	  			this.$router.push("patientsType")
//	  		}
//	  		if(it.typeName == "检查报告类型"){
//	  			this.$router.push("checkType")
//	  		}
//	  		if(it.typeName == "随访方式"){
//	  			this.$router.push("followWay")
//	  		}
//	  		if(it.typeName == "干预类型"){
//	  			this.$router.push("interType")
//	  		}
//	  		if(it.typeName == "干预方式"){
//	  			this.$router.push("meansInterven")
//	  		}
      },
      batchCloses() {
        this.myCode = false;
      },
      roleCloses() {
        this.ifNewRole = false;
      },
      cancels_s() {
        this.myCode = false;
      },
      cancels_del() {
        this.ifDel = false;
      },
      cancels_R() {
        this.ifNewRole = false;
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
      },
      cancels_E() {
        this.ifNewEmp = false;
      },
      ResetCloses() {
        this.ifReset = false;
      },
      cancels_P() {
        this.ifReset = false;
      },
      delStaffClose() {
        this.ifStaff = false;
      },
      cancels_delStaff() {
        this.ifStaff = false;
      },
      //干预方式
      intervene: function (a) {
        var data = {typeCode:a};
        this.$api.dictionaryListByCode(data, res => {
          if (a == 'meansInterven') {
            this.meansInterven = res.data.data
          }
          if (a == "diabetes_type") {
            this.patientsType = res.data.data
          }
          if (a == 'interType') {
            this.interType = res.data.data
          }
          if (a == 'followWay') {
            this.followWay = res.data.data
          }
          if (a == 'checkType') {
            this.checkType = res.data.data
          }
          if (a == 'compliName') {
            this.compliName = res.data.data
          }
        })
      }
    },
    created: function () {
      var that = this;
      this.$api.dictionary({organId:0}, res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            that.arrs = res.data.data;
            //干预方式
            //that.intervene(that.arrs[0].typeCode)
            //患者类型
            //that.intervene(that.arrs[1].typeCode)
            //干预类型
            //that.intervene(that.arrs[2].typeCode)
            //随访方式
            //that.intervene(that.arrs[3].typeCode)
            //检查报告类型
            //that.intervene(that.arrs[4].typeCode)
            //并发症名称
            //that.intervene(that.arrs[5].typeCode)
            for (let i=0,len=that.arrs.length;i<len;i++) {
                that.intervene(that.arrs[i].typeCode)
            }            
          }
        } else {
        }
      },res=>{
        this.$message(res.data.errMsg)
      })
      let meunList = JSON.parse(sessionStorage.getItem("meunList"))
      this.myIndex = meunList.length-1
    }

  }
  const cityOptions = ['功能1', '功能2', '功能3'];
</script>
<style scoped>
  .patientsType {
    min-width: 1100px;
    width: 89%;
    min-height: 830px;
    /*position: absolute;*/
    /*left: 160px;*/
    float: left;
    border-left: 1px solid #eff2f5;
  }

  .delWays, .delTypes {
    height: 217px;
  }

  .close {
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }

  .resetPasss table tr td input {
    width: 200px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .newRole table tr td:nth-child(1), .resetPass table tr td:nth-child(1) {
    width: 80px;
  }

  .newEmp table tr td:nth-child(1) {
    width: 80px;
  }

  .newEmp table tr td:nth-child(2) {
    width: 165px;
  }

  .newEmp table tr td:nth-child(3) {
    width: 40px;
  }

  .newEmp table tr td input, .newEmp select {
    width: 120px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .newRole .roleThat {
    width: 463px;
    height: 101px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .newRole .character {
    width: 200px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .newWay, .delWay, .newType, .delType {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
  }

  .newWays .cancels, .delWays .cancels, .newTypes .cancels, .delTypes .cancels {
    position: absolute;
    right: 100px;
    bottom: 30px;
  }

  .newWays .sures, .delWays .sures, .newTypes .sures, .delTypes .sures {
    right: 20px;
    bottom: 30px;
    position: absolute;
  }

  .newWays .butt, .delWays .butt, .newTypes .butt, .delTypes .butt {
    /* text-align: center;
        line-height: 28px;
        cursor: pointer;
        width: 60px;
        height: 28px;
        border-radius: 4px;
        border: solid 1px rgba(206, 206, 206, 0.7); */
  }

  .newWays select, .newTypes select {
    width: 100%;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
    margin: 0;
  }

  .newWays h5, .delWays h5, .newTypes h5, .delTypes h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }

  .newWays, .delWays, .newTypes, .delTypes {
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .newEmps {
    width: 412px;
    height: 375px;
    margin-left: -206px;
    margin-top: -161px;
  }

  .delRoles {
    margin-left: -132px;
    margin-top: -92px;
    width: 264px;
    height: 184px;
  }

  .newRoles {
    width: 560px;
    height: 520px;
    margin-left: -280px;
    margin-top: -249px;
  }

  .delWays, .delTypes {
    width: 297px;
    margin-left: -148px;
    margin-top: -92px;
  }

  .resetPasss {
    margin-left: -149px;
    margin-top: -115px;
    width: 298px;
    height: 231px;
  }

  .newWays, .newTypes {
    margin-left: -152px;
    margin-top: -175px;
  }

  .delDeparts {
    width: 264px;
    height: 184px;
    margin-left: -132px;
    margin-top: -92px;
  }

  .delWays p, .delTypes p {
    margin-top: 20px;
    border-top: 1px solid #e0e0e0;
    font-size: 16px;
    padding: 20px 0;
    text-align: center;
  }

  .delWays p span, .delTypes p span {
    color: #267bf7;
  }

  .actives {
    background-color: #e9f2fe;
    color: #267bf7 !important;
  }

  li {
    list-style: none;
  }

  .tabss {
    /*position: absolute;*/
    /*height: 850px;*/
    width: 159px;
    float: left;
    /*border-right: 1px solid #ccc;*/
  }

  .tabss ul li {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: #8b9eba;
  }

  .basedDiction {
    padding: 19px 20px;
    background: #f7f8fa;
    position: absolute;
    top: 60px;
    left: 160px;
    width: 89%;
  }

  .basedDictions {
    width: 100%;
    /*height: 851px;*/
    background-color: #ffffff;
    /*padding: 20px;*/
    /*position: relative;*/
    margin-top: 19px;
    overflow: hidden;
  }

  h3 {
    font-size: 14px;
    color: #267bf7;
  }

  /*通用*/
  .manageDepart, .staffManage {
    min-width: 1100px;
    width: 89%;
    min-height: 830px;
    /*position: absolute;*/
    /*left: 160px;*/
    float: left;
    border-left: 1px solid #ccc;
  }

  .manage_T, .staf_T {
    padding: 20px;
    border-bottom: 1px solid #f1f1f1;
  }

  .StaffNum, .DepartNum {
    padding-left: 6px;
    color: #999999;
    width: 200px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-right: 10px;
  }

  .newAdd {
    display: inline-block;
    float: right;
    color: white;
    background-color: #24bdaf;
  }

  .block {
    text-align: right;
    margin-top: 20px;
  }

  .ipts {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    width: 80px;
    height: 28px;
    border-radius: 4px;
    text-align: center;
    border: solid 1px rgba(206, 206, 206, 0.7);
    cursor: pointer;
  }

  .selects {
    margin-right: 20px;
    color: #999999;
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
  }

  .searchs {
    color: white;
    background-color: #267bf7;
    margin-right: 20px;
  }

  .clears {
    background-color: #ffffff;
  }

  .newWay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
  }
</style>
