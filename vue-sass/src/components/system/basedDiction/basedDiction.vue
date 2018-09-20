<template>
  <div>
    <sys-tem></sys-tem>
    <div class="basedDiction positionContent">
      <h3>基础字典</h3>
      <div class="basedDictions contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/basedDiction/'+it.typeCode == $route.path}" @click="$router.push(it.typeCode)">
              {{it.typeName}}
            </li>
          </ul>
        </div>
        <keep-alive>
          <router-view :meansIntervenArr="meansIntervenArr" :diabetesTypeArr="diabetesTypeArr" :interTypeArr="interTypeArr" :followWayArr="followWayArr" :checkTypeArr="checkTypeArr" :complicationsArr="complicationsArr" @newWays="newWays" @delWays="delWays" @newType="newType" @delType="delType" @newInterType="newInterType" @delIntType="delIntType" @newFolWay="newFolWay" @delFolWay="delFolWay" @newChecType="newChecType" @delChecType="delChecType" @newCompli="newCompli" @delCompli="delCompli">
          </router-view>
        </keep-alive>
      </div>
    </div>

    <!--新增编辑干预方式-->
    <el-dialog :title="ruleFormTitle+'干预方式'" :visible.sync="ifNewWay" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="newWayCloses('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="labelWidth" class="demo-ruleForm ">
        <el-form-item label="干预方式" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancels_New('ruleForm')">取消</el-button>
          <el-button type="primary" @click="myNewWay('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除干预方式-->
    <el-dialog title="删除干预方式" :visible.sync="ifDelWay" width="350px" custom-class='delWays'  @close="delWayClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除干预方式“<span>{{ruleForm.name}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delWayClose">取 消</el-button>
        <el-button type="primary" @click="delWaysSu(ruleForm)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="delWay" v-if="ifDelWay">
      <div class="delWays">
        <h5>删除干预方式</h5>
        <span class="close" @click="delWayClose()">X</span>
        <p>确定要删除干预方式“<span>{{ruleForm.name}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_Del()">取消</el-button>
        <el-button type="primary" class="sures" @click="delWaysSu(ruleForm)">确定</el-button>
      </div>
    </div>

    <!--新增编辑患者类型-->
    <el-dialog :title="newTypeName+'患者类型'" :visible.sync="ifNewType" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="newTypeCloses('newTypeList')">
      <el-form :model="newTypeList" :rules="rules" ref="newTypeList" :label-width="labelWidth" class="demo-ruleForm ">
        <el-form-item label="患者类型" prop="itemValue">
          <el-input v-model.trim="newTypeList.itemValue"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancels_Type('newTypeList')">取消</el-button>
          <el-button type="primary" @click="myNewType('newTypeList')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除患者类型-->
    <el-dialog title="删除患者类型" :visible.sync="ifDelType" width="350px" custom-class='delTypes'  @close="delTypeClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除患者类型“<span>{{delTypeInfo.itemValue}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delTypeClose">取 消</el-button>
        <el-button type="primary" @click="delTypeSu(delTypeInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="delType" v-if="ifDelType">
      <div class="delTypes">
        <h5>删除患者类型</h5>
        <span class="close" @click="delTypeClose()">X</span>
        <p>确定要删除患者类型“<span>{{delTypeInfo.itemValue}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelType()">取消</el-button>
        <el-button type="primary" class="sures" @click="delTypeSu(delTypeInfo)">确定</el-button>
      </div>
    </div>

    <!--新增编辑干预类型-->
    <el-dialog :title="newIntTypeName+'干预类型'" :visible.sync="ifNewIntType" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="IntTypeCloses('newIntTypeList')">
      <el-form :model="newIntTypeList" :rules="rules" ref="newIntTypeList" :label-width="labelWidth" class="demo-ruleForm ">
        <el-form-item label="干预类型" prop="itemValue">
          <el-input v-model.trim="newIntTypeList.itemValue"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="IntTypeCloses('newIntTypeList')">取消</el-button>
          <el-button type="primary" @click="myNewIntType('newIntTypeList')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除干预类型-->
    <el-dialog title="删除干预类型" :visible.sync="ifdelInt" width="350px" custom-class='delTypes'  @close="cancels_DelInt" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除干预类型“<span>{{delIntTypeName}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancels_DelInt">取 消</el-button>
        <el-button type="primary" @click="delIntTypeSu(delIntTypeitem)">确 定</el-button>
      </span>
    </el-dialog>

    <div class="delType" v-if="ifdelInt">
      <div class="delTypes">
        <h5>删除干预类型</h5>
        <span class="close" @click="delIntClose()">X</span>
        <p>确定要删除干预类型“<span>{{delIntTypeName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelInt()">取消</el-button>
        <el-button type="primary" class="sures" @click="delIntTypeSu(delIntTypeitem)">确定</el-button>
      </div>
    </div>

    <!--新增随访方式-->
    <el-dialog :title="newFolWayName+'随访方式'" :visible.sync="ifFolWay" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="folWayCloses('newFolWayList')">
      <el-form :model="newFolWayList" :rules="rules" ref="newFolWayList" :label-width="labelWidth" class="demo-ruleForm">
        <el-form-item label="随访方式" prop="itemValue">
          <el-input v-model.trim="newFolWayList.itemValue"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="folWayCloses('newFolWayList')">取消</el-button>
          <el-button type="primary" @click="myFolWay('newFolWayList')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除随访方式-->
    <el-dialog title="删除随访方式" :visible.sync="ifDelFolWay" width="350px" custom-class='delWays'  @close="delFolWayClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除随访方式“<span>{{DelFolWayName}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delFolWayClose">取 消</el-button>
        <el-button type="primary" @click="delFolWaySu(DelFolWayId)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="delWay" v-if="ifDelFolWay">
      <div class="delWays">
        <h5>删除随访方式</h5>
        <span class="close" @click="delFolWayClose()">X</span>
        <p>确定要删除随访方式“<span>{{DelFolWayName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelFol()">取消</el-button>
        <el-button type="primary" class="sures" @click="delFolWaySu(DelFolWayId)">确定</el-button>
      </div>
    </div>

    <!--新增编辑检查报告类型-->
    <el-dialog :title="newChecTypeName+'报告类型'" :visible.sync="ifNewchecType" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="checTypeCloses('newChecTypeList')">
      <el-form :model="newChecTypeList" :rules="rules" ref="newChecTypeList" :label-width="labelWidth" class="demo-ruleForm ">
        <el-form-item label="报告类型" prop="itemValue">
          <el-input v-model.trim="newChecTypeList.itemValue"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancels_chec('newChecTypeList')">取消</el-button>
          <el-button type="primary" @click="myNewchecType('newChecTypeList')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除检查报告类型-->
    <el-dialog title="删除报告类型" :visible.sync="ifdelChec" width="350px" custom-class='delTypes'  @close="delChecClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除报告类型“<span>{{delChecTypeName}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delChecClose">取 消</el-button>
        <el-button type="primary" @click="delChecTypeSu(delChecTypeId)">确 定</el-button>
      </span>
    </el-dialog>
    <div class="delType" v-if="ifdelChec">
      <div class="delTypes">
        <h5>删除报告类型</h5>
        <span class="close" @click="delChecClose()">X</span>
        <p>确定要删除报告类型“<span>{{delChecTypeName}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_DelChec()">取消</el-button>
        <el-button type="primary" class="sures" @click="delChecTypeSu(delChecTypeId)">确定</el-button>
      </div>
    </div>

    <!--新增编辑并发症-->
    <el-dialog :title="newCompliName+'并发症'" :visible.sync="ifcompli" :append-to-body="true" width="330px" :close-on-click-modal="false" @close="compliCloses('newCompliList')">
      <el-form :model="newCompliList" :rules="rules" ref="newCompliList" :label-width="labelWidth" class="demo-ruleForm ">
        <el-form-item label="并发症" prop="itemValue">
          <el-input v-model.trim="newCompliList.itemValue"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="selectA">
            <el-option v-for="a in 100" :key="a" :value="a">{{a}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel_com('newCompliList')">取消</el-button>
          <el-button type="primary" @click="complis('newCompliList')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--删除并发症-->
    <el-dialog title="删除并发症" :visible.sync="ifdelCompli" width="350px" custom-class='delTypes'  @close="delCompliClose" :close-on-click-modal="false" :close-on-press-escape="false" >
      <p>确定要删除并发症“<span>{{delCompliName}}</span>”吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCompliClose">取 消</el-button>
        <el-button type="primary" @click="delCompliSu(delCompliId)">确 定</el-button>
      </span>
    </el-dialog>

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
  import funBus from '../../../assets/js/funBus';

  export default {
    data() {
      return {
        labelWidth: '80px', //表单label宽度
        selectA: 1,
        //校验
        ruleForm: {
          name: '',
          vaule: '',
          itemId: ''
        },
        rules: {
          name: [{
              required: true,
              message: '输入为空',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          itemValue: [{
              required: true,
              message: '输入为空',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
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
        diabetesTypeArr: [],
        interTypeArr: [],
        meansIntervenArr: [],
        followWayArr: [],
        checkTypeArr: [],
        complicationsArr: [],
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
        delCompliId: {},
        tempData: [], //保存临时数据
      }
    },
    methods: {
      //返回字典类型,如：干预类型返回interType、随访方式返回followWay、......等等
      getTypeCode() {
        let typeCodes = this.arrs,
          path = this.$route.path;
        for (let i = 0; i < typeCodes.length; i++) {
          if ('/basedDiction/' + typeCodes[i].typeCode == path) {
            return typeCodes[i].typeCode;
          }
        }
      },
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
      newCompli(name, row) {
        this.ifcompli = true;
        this.newCompliName = name
        this.typeCode = this.getTypeCode();
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
          this.openLoading();
          if (valid) {
            if (that.newCompliName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newCompliList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifcompli = false;
                  that.intervene(that.typeCode)
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
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
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
              })
            }
          }
        })
      },
      //删除并发症
      delCompli(row) {
        this.ifdelCompli = true;
        this.delCompliName = row.itemValue
        this.delCompliId = row
      },
      delCompliSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.openLoading();
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifdelCompli = false;
            this.intervene(a.typeCode)
            this.closeLoading();
          }
        }, res => {
          this.$message(res.data.errMsg)
          this.closeLoading();
        })
      },
      delCompliClose() {
        this.ifdelCompli = false;
      },
      compliCloses(newCompliList) {
        this.$refs[newCompliList].resetFields();
        this.ifcompli = false;
      },
      //新增编辑检查报告
      newChecType(name, row) {
        this.ifNewchecType = true;
        this.typeCode = this.getTypeCode();
        this.newChecTypeName = name
        this.selectA = 1

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
              }, res => {
                this.$message(res.data.errMsg)
              })
            } else if (that.newChecTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newChecTypeList.itemId,
                itemValue: that.newChecTypeList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewchecType = false;
                  that.intervene(that.typeCode)
                }
              }, res => {
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除编辑检查报告
      delChecType(row) {
        this.ifdelChec = true;
        this.delChecTypeName = row.itemValue
        this.delChecTypeId = row
      },
      delChecTypeSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifdelChec = false;
            this.intervene(a.typeCode)
          }
        }, res => {
          this.$message(res.data.errMsg)
        })
      },
      //新增编辑随访方式
      newFolWay(name, row) {
        this.ifFolWay = true;
        this.typeCode = this.getTypeCode();
        this.newFolWayName = name;
        this.selectA = 1;

        if (row) {
          let obj = JSON.parse(JSON.stringify(row));
          this.newFolWayList = obj;
          this.selectA = obj.itemSort;
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
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifFolWay = false;
                  that.$refs[formName].resetFields();
                  that.intervene(that.typeCode)
                }
              }, res => {
                this.$message(res.data.errMsg)
              })
            } else if (that.newFolWayName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newFolWayList.itemId,
                itemValue: that.newFolWayList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifFolWay = false;
                  that.$refs[formName].resetFields();
                  that.intervene(that.typeCode)
                }
              }, res => {
                this.$message(res.data.errMsg)
              })
            }
          }
        })
      },
      //删除随访方式
      delFolWay(row) {
        this.ifDelFolWay = true;
        this.DelFolWayName = row.itemValue
        this.DelFolWayId = row
      },
      delFolWaySu(a) {
        var data = {
          itemId: a.itemId
        }
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifDelFolWay = false;
            this.intervene(a.typeCode)
          }
        }, res => {
          this.$message(res.data.errMsg)
        })
      },
      //关闭干预弹窗
      IntTypeCloses(formName) {
        this.$refs[formName].resetFields();
        this.ifNewIntType = false;
      },      
      //新增编辑干预类型
      newInterType(name, row) {
        this.ifNewIntType = true;
        this.newIntTypeName = name
        this.selectA = 1
        this.typeCode = this.getTypeCode();

        if (row) {
          let obj = JSON.parse(JSON.stringify(row));
          this.newIntTypeList = obj;
          this.selectA = obj.itemSort;
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
            this.openLoading();
            if (that.newIntTypeName == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.newIntTypeList.itemValue,
                itemSort: that.selectA,
                organId: user.organizationId
              }
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewIntType = false;
                  that.intervene(that.typeCode)
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
              })
            } else if (that.newIntTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newIntTypeList.itemId,
                itemValue: that.newIntTypeList.itemValue,
                itemSort: that.selectA,
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewIntType = false;
                  that.intervene(that.typeCode)
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
              })
            }
          }
        })
      },
      //删除干预类型
      delIntType(row) {
        this.ifdelInt = true;
        this.delIntTypeName = row.itemValue
        this.delIntTypeitem = row
      },
      delIntTypeSu(a) {
        var data = {
          itemId: a.itemId
        }
        this.openLoading();
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifdelInt = false;
            this.intervene(a.typeCode)
            this.closeLoading();
          }
        }, res => {
          this.$message(res.data.errMsg)
          this.closeLoading();
        })
      },
      delChecClose() {
        this.ifdelChec = false;
      },
      checTypeCloses(newChecTypeList) {
        this.$refs[newChecTypeList].resetFields();
        this.ifNewchecType = false;
      },
      delFolWayClose() {
        this.ifDelFolWay = false;
      },
      folWayCloses(formName) {
        this.$refs[formName].resetFields();
        this.ifFolWay = false;
      },
      cancels_DelInt() {
        this.ifdelInt = false;
      },
      delIntClose() {
        this.ifdelInt = false;
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
      newWays(name, row) {
        this.ifNewWay = true;
        this.ruleFormTitle = name
        this.selectA = 1
        this.typeCode = this.getTypeCode();
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
          this.openLoading();
          if (valid) {
            if (that.ruleFormTitle == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                typeCode: this.typeCode,
                itemValue: this.ruleForm.name,
                itemSort: $(".myNewWays option:selected").text(),
                organId: user.organizationId
              }
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewWay = false;
                  that.intervene(that.typeCode)
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
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
                  that.closeLoading();
                }
              }, res => {
                this.$message(res.data.errMsg)
                that.closeLoading();
              })
            }
          }
        })
      },
      //删除干预方式
      delWays(row) {
        this.ifDelWay = true;
        this.ruleForm.name = row.itemValue
        this.ruleForm.value = row.itemSort
        this.ruleForm.itemId = row.itemId
      },
      delWaysSu: function (ruleForm) {
        var data = {
          itemId: ruleForm.itemId
        }
        this.openLoading();
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifDelWay = false;
            this.intervene(ruleForm.typeCode)
            this.closeLoading();
          }
        }, res => {
          this.$message(res.data.errMsg)
          this.closeLoading();
        })
      },
      //新增编辑患者类型
      newType(name, row) {
        this.ifNewType = true;
        this.selectA = 1
        this.newTypeName = name
        this.typeCode = this.getTypeCode();
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
              that.$api.addDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewType = false;
                  that.intervene(that.typeCode)
                }
              }, res => {
                this.$message(res.data.errMsg)
              })
            } else if (that.newTypeName == "编辑") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                itemId: that.newTypeList.itemId,
                itemValue: that.newTypeList.itemValue,
                itemSort: that.selectA
              }
              this.$api.updataDictionary(data, res => {
                if (res.data.code == 0) {
                  that.ifNewType = false;
                  that.intervene(that.typeCode)
                }
              }, res => {
                this.$message(res.data.errMsg)
              })
            }

          }
        })
      },
      //删除患者类型
      delType(row) {
        this.ifDelType = true;
        this.delTypeInfo = row
      },
      delTypeSu(delTypeInfo) {
        let data = {
          itemId: delTypeInfo.itemId
        }
        this.$api.deleDictionary(data, res => {
          if (res.data.code == 0) {
            this.ifDelType = false;
            this.intervene(delTypeInfo.typeCode)
          }
        }, res => {
          this.$message(res.data.errMsg)
        })
      },
      delWayClose() {
        this.ifDelWay = false;
      },
      cancels_New(formName) {
        this.$refs[formName].resetFields();
        this.ifNewWay = false;
      },
      newWayCloses(ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.ifNewWay = false;
      },
      //根据字典typeCode获取对应数据
      intervene(typeCode) {
        /*typeCode：meansInterven、diabetes_type、interType、followWay、checkType、complications、template_postfix*/
        funBus.getDictionarysByTypeCode(this, typeCode);
      }
    },
    created: function () {
      var that = this;
      //获取字典列表
      this.$api.dictionary({
        organId: 0
      }, res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            //res.data.data.push({typeCode: 'warnSet',typeName: '干预提醒'})
            that.arrs = res.data.data;

            //根据字典typeCode获取对应数据
            for (let i = 0, len = that.arrs.length; i < len; i++) {
              that.intervene(that.arrs[i].typeCode)
            }
          }
        } else {}
      }, res => {
        this.$message(res.data.errMsg)
      })
    }

  }
</script>

<style scoped>
  .newRole table tr td:nth-child(1),
  .resetPass table tr td:nth-child(1) {
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
  .newEmp table tr td input,
  .newEmp select {
    width: 120px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }
  .newWay,
  .newType {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
  }
  .newWays select,
  .newTypes select {
    width: 100%;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
    margin: 0;
  }
  .newWays h5,
  .newTypes h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }
  .newWays,
  .newTypes {
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #ffffff;
    border-radius: 8px;
  }
  .newRoles {
    width: 560px;
    /*height: 520px;*/
    margin-left: -280px;
    margin-top: -249px;
  }
  .newWays,
  .newTypes {
    margin-left: -152px;
    margin-top: -175px;
  }

  .tabss {
    width: 159px;
    float: left;
  }
  .tabss ul li {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: #8b9eba;
  }
  .newAdd {
    display: inline-block;
    float: right;
    color: white;
    background-color: #24bdaf;
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
