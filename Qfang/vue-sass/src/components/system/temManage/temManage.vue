<template>
  <div>
    <sys-tem></sys-tem>
    <div class="temManage positionContent">
      <h3>模板管理</h3>
      <div class="temManages contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/temManage/'+it.typeCode == $route.path}" @click="$router.push(it.typeCode)">
                {{it.typeName}}
            </li>
          </ul>
        </div>
        <keep-alive>
          <router-view ref="interTempList" @newTemplate="newTemplate" @searchTem="searchTem" @delTemplate="delTemplate"
            @newFolTemplate="newFolTemplate" @searchss="searchss" @delFolTem="delFolTem">
          </router-view>
        </keep-alive>
      </div>
    </div>
    <!--干预模板-->
    <el-dialog :title="topTitle+'干预模板'" :visible.sync="ifInter" :append-to-body="true" width="400px" :close-on-click-modal="false" @close="InterCloses('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" >
        <el-form-item label="模板名称" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="干预类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="干预类型" class="width100">
            <el-option v-for="it in interTypeArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
              {{it.itemValue}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <el-input type="textarea" :rows="4" v-model.trim="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="InterCloses('ruleForm')">取消</el-button>
          <el-button type="primary" @click="interTempSure('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--干预查看模板-->
    <div class="seeTemplate" v-if="ifSee">
      <div class="seeTemplates">
        <h5>查看干预模板</h5>
        <span class="close" @click="seeCloses()">X</span>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>模板名称：</td>
            <td>{{lookInterTemp.name?lookInterTemp.name:"无"}}</td>
          </tr>
          <tr>
            <td>干预类型：</td>
            <td>{{lookInterTemp.interventionType?lookInterTemp.interventionType:"无"}}</td>
          </tr>
          <tr>
            <td>创建人：</td>
            <td>{{lookInterTemp.createUserName?lookInterTemp.createUserName:"无"}}</td>
          </tr>
          <tr>
            <td>创建时间：</td>
            <td>{{lookInterTemp.tempCreateTime?formatDate(lookInterTemp.tempCreateTime):"无"}}</td>
          </tr>
          <tr>
            <td>模板内容：</td>
            <td>{{lookInterTemp.content?lookInterTemp.content:"无"}}</td>
          </tr>
        </table>
        <el-button type="primary" class="sures" @click="sures()">确定</el-button>
      </div>
    </div>
    <!--干预删除模板-->
    <div class="delTemplate" v-if="ifDelTem">
      <div class="delTemplates">
        <h5>删除干预模板</h5>
        <span class="close" @click="delTemplateClose()">X</span>
        <p>确定要删除模板“<span>{{interTempD.name}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_delTem()">取消</el-button>
        <el-button type="primary" class="sures" @click="deleteInterTemp(interTempD)">确定</el-button>
      </div>
    </div>
    <!--随访模板-->
    <el-dialog :title="topTitleFollow+'随访模板'" :visible.sync="ifFollow" :append-to-body="true" width="400px" :close-on-click-modal="false" @close="followCloses('ruleFormFollow')">
      <el-form :model="ruleFormFollow" :rules="rules" ref="ruleFormFollow" label-width="80px" class="demo-ruleForm" >
        <el-form-item label="模板名称" prop="name">
          <el-input v-model.trim="ruleFormFollow.name"></el-input>
        </el-form-item>
        <el-form-item label="适用类型" prop="diabetesType">
          <el-select v-model="ruleFormFollow.diabetesType" placeholder="干预类型" class="width100">
            <el-option v-for="it in diabetesTypeArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
              {{it.itemValue}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板内容" prop="followUpContent">
          <el-input type="textarea" :rows="4" v-model.trim="ruleFormFollow.followUpContent"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="followCloses('ruleFormFollow')">取消</el-button>
          <el-button type="primary" @click="followTempSure('ruleFormFollow')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--随访查看模板-->
    <div class="seeTemplate" v-if="ifFolSee">
      <div class="seeTemplates">
        <h5>查看随访模板</h5>
        <span class="close" @click="folSeeCloses()">X</span>
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>模板名称：</td>
            <td>{{lookFollowTemp.name?lookFollowTemp.name:'无'}}</td>
          </tr>
          <tr>
            <td>适用类型：</td>
            <td>{{lookFollowTemp.diabetesTypeReview?lookFollowTemp.diabetesTypeReview:'无'}}</td>
          </tr>
          <tr>
            <td>创建人：</td>
            <td>{{lookFollowTemp.createUserName?lookFollowTemp.createUserName:'无'}}</td>
          </tr>
          <tr>
            <td>创建时间：</td>
            <td>{{lookFollowTemp.followUpCreateTime?formatDate(lookFollowTemp.followUpCreateTime):'无'}}</td>
          </tr>
          <tr>
            <td>模板内容：</td>
            <td>{{lookFollowTemp.followUpContent?lookFollowTemp.followUpContent:'无'}}</td>
          </tr>
        </table>
        <el-button type="primary" class="sures" @click="folSures()">确定</el-button>
      </div>
    </div>
    <!--随访删除模板-->
    <div class="delTemplate" v-if="ifFolDelTem">
      <div class="delTemplates">
        <h5>删除随访模板</h5>
        <span class="close" @click="delFolTemplateClose()">X</span>
        <p>确定要删除模板“<span>{{followUpTempD.name}}</span>”吗？</p>
        <el-button class="cancels" @click="cancels_delFolTem()">取消</el-button>
        <el-button type="primary" class="sures" @click="deleteFollowUpTemp(followUpTempD)">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    name: 'agencyInfor',
    data() {
      return {
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
        ifInter: false,
        ifSee: false,
        ifFolSee: false,
        ifDelTem: false,
        ifFollow: false,
        ifFolDelTem: false,
        activess: 0,
        arrs: [
          {
            typeCode: "interTemplate",
            typeName: "干预模板"
          },
          {
            typeCode: "followTemplate",
            typeName: "随访模板"
          }
        ],
        topTitle: '',
        topTitleFollow: '',
        interTypeArr: [], //干预类型
        ruleForm: {
          name: '',
          type: '',
          content: '',
          templateId: '',
        },
        ruleFormFollow: {
          name: '',
          diabetesType: '',
          followUpContent: '',
          templateId: '',
        },
        rules: {
          name: [
            {required: true, message: '输入为空', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          type: [
            {required: true, message: '输入为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '输入为空', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          diabetesType: [
            {required: true, message: '输入为空', trigger: 'blur'}
          ],
          followUpContent: [
            {required: true, message: '输入为空', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ]
        },
        lookInterTemp: {},
        interTempD: {},
        diabetesTypeArr: [],
        lookFollowTemp: {},
        followUpTempD: {},
        total: 0, //数据总数量
      }
    },
    created: function () {
      funBus.getDictionarysByTypeCode(this,'interType'); //获取干预类型
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    methods: {
      //删除随访模板
      delFolTem(row) {
        this.ifFolDelTem = true;
        this.followUpTempD = row
      },
      deleteFollowUpTemp(followUpTempD) {
        let that = this;
        let data = {
          userFollowUpId: followUpTempD.userFollowUpId
        }
        this.openLoading();
        this.$api.deleteFollowUpTemp(data, res => {
          if (res.data.code == 0) {
            this.ifFolDelTem = false
            this.$refs.interTempList.followUpTemplateList(that.$refs.interTempList.followUpTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.followUpTypeContent);
            this.closeLoading();
          }
        },res=>{
            this.$message(res.data.errMsg)
            this.closeLoading();
        })
      },
      //查看随访模板
      searchss(row) {
        this.ifFolSee = true;
        this.lookFollowTemp = row
      },
      //编辑新增随访模板
      newFolTemplate(name, row) {
        this.ifFollow = true;
        this.topTitleFollow = name
        if (row) {
          this.ruleFormFollow.name = row.name
          this.ruleFormFollow.diabetesType = row.diabetesType
          this.ruleFormFollow.followUpContent = row.followUpContent
          this.ruleFormFollow.templateId = row.templateId
        } else {
          this.ruleFormFollow = {
            name: '',
            diabetesType: '',
            followUpContent: '',
            templateId: ''
          }
        }
      },
      followTempSure(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          //如果没有格式错误
          if (valid) {
            this.openLoading();
            if (that.topTitleFollow == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                name: that.ruleFormFollow.name,
                diabetesType: that.ruleFormFollow.diabetesType,
                followUpContent: that.ruleFormFollow.followUpContent,
                organId: user.organizationId,
                templateType: 1
              }
              that.$api.addfollowUp(data, res => {
                if (res.data.code == 0) {
                  that.ifFollow = false;
                  that.$refs.interTempList.followUpTemplateList(that.$refs.interTempList.followUpTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.followUpTypeContent);
                  that.closeLoading();
                }
              },res=>{
                  this.$message(res.data.errMsg)
                  that.closeLoading();
                })
            } else if (that.topTitleFollow == "编辑") {
              let data = {
                name: that.ruleFormFollow.name,
                diabetesType: that.ruleFormFollow.diabetesType,
                followUpContent: that.ruleFormFollow.followUpContent,
                templateId: that.ruleFormFollow.templateId
              }
              this.$api.editFollowUpTemp(data, res => {
                if (res.data.code == 0) {
                  that.ifFollow = false;
                  that.$refs.interTempList.followUpTemplateList(that.$refs.interTempList.followUpTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.followUpTypeContent);
                  that.closeLoading();
                }
              },res=>{
                  this.$message(res.data.errMsg)
                  that.closeLoading();
                })
            }
          }
        })
      },
      //删除干预类型
      delTemplate(row) {
        this.ifDelTem = true;
        this.interTempD = row
      },
      deleteInterTemp(interTempD) {
        let that = this;
        let data = {
          userInterventionId: interTempD.userInterventionId
        }
        this.openLoading();
        this.$api.deleteInterTemp(data,res => {
          if (res.data.code == 0) {
            this.ifDelTem = false
            that.$refs.interTempList.interventionTemplate(that.$refs.interTempList.interTempTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.interTempTypeContent);
            that.closeLoading();
          }
        },res=>{
            this.$message(res.data.errMsg)
            that.closeLoading();
        })
      },
      //查看模板
      searchTem(row) {
        this.ifSee = true;
        this.lookInterTemp = row
      },
      //新增或编辑干预模板
      newTemplate(total, name, row) {
        this.total = total ? total : 0;
        this.ifInter = true;
        this.topTitle = name
        if (row) {
          this.ruleForm.name = row.name
          this.ruleForm.type = row.type
          this.ruleForm.content = row.content
          this.ruleForm.templateId = row.templateId
        } else {
          this.ruleForm = {
            name: '',
            type: '',
            content: '',
            templateId: ''
          }
        }
      },
      interTempSure(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          //如果没有格式错误
          if (valid) {
            this.openLoading();
            if (that.topTitle == "新增") {
              let user = JSON.parse(sessionStorage.getItem('user'))
              let data = {
                name: that.ruleForm.name,
                type: that.ruleForm.type,
                content: that.ruleForm.content,
                organId: user.organizationId,
                templateType: 1,
                seqNum: this.total+1
              }
              that.$api.addInterTemplate(data, res => {
                if (res.data.code == 0) {
                  that.ifInter = false;
                  that.$refs.interTempList.interventionTemplate(that.$refs.interTempList.interTempTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.interTempTypeContent);
                  that.closeLoading();
                }
              },res=>{
                  this.$message(res.data.errMsg)
                  that.closeLoading();
                })
            }
            else if (that.topTitle == "编辑") {
              let data = {
                name: that.ruleForm.name,
                type: that.ruleForm.type,
                content: that.ruleForm.content,
                templateId: that.ruleForm.templateId
              }
              this.$api.editInterTemplate(data, res => {
                if (res.data.code == 0) {
                  that.ifInter = false;
                  that.$refs.interTempList.interventionTemplate(that.$refs.interTempList.interTempTypeName.replace(/(^\s*)|(\s*$)/g, ""), that.$refs.interTempList.interTempTypeContent);
                  that.closeLoading();
                }
              },res=>{
                  this.$message(res.data.errMsg)
                  that.closeLoading();
                })
            }
          }
        })
      },
      cancels_delTem() {
        this.ifDelTem = false;
      },
      cancels_delFolTem() {
        this.ifFolDelTem = false;
      },
      delTemplateClose() {
        this.ifDelTem = false;
      },
      delFolTemplateClose() {
        this.ifFolDelTem = false;
      },
      seeCloses() {
        this.ifSee = false;
      },
      folSeeCloses() {
        this.ifFolSee = false;
      },
      sures() {
        this.ifSee = false;
      },
      folSures() {
        this.ifFolSee = false;
      },
      //关闭干预模板编辑弹窗
      InterCloses(formName) {
        this.ifInter = false;
        this.$refs[formName].resetFields();
      },
      //关闭随访模板编辑弹窗
      followCloses(formName) {
        this.ifFollow = false;
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style>

  .seeTemplate table tr td:nth-child(1), .delTemplate table tr td:nth-child(1) {
    width: 80px;
    color: #111111;
    font-size: 14px;
  }

  .seeTemplate, .delTemplate {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
  }

  .seeTemplates table {
    margin-top: 20px;
    padding-top: 20px;
    width: 100%;
    border-top: 2px solid #e0e0e0;
  }

  .seeTemplates table tr {
    display: block;
    margin-bottom: 20px;
  }

  .delTemplates p {
    margin-top: 20px;
    border-top: 1px solid #e0e0e0;
    font-size: 16px;
    padding: 20px 0;
    text-align: center;
  }

  .delTemplates p span {
    color: #267bf7;
  }

  .seeTemplates table tr td:nth-child(2) {
    color: #666666;
    font-size: 14px;
  }

  .seeTemplates, .delTemplates {
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .seeTemplates {
    width: 540px;
    min-height: 350px;
    padding-bottom: 60px;
    margin-left: -270px;
    margin-top: -300px;
  }

  .delTemplates {
    width: 328px;
    height: 210px;
    margin-left: -164px;
    margin-top: -92px;
  }
</style>
