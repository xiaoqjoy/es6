<template>
  <div class="commonDialog">

    <!-- 随访弹窗 -->
    <div class="followPlans" v-if="ifFolPlan">
      <div class="followPlan">
        <h5>随访计划</h5>
        <span class="close" @click="closes('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名" :prop="isDisabled?'':'name'" style="position: relative;">
            <el-input v-if="isDisabled" v-model="patientInfo.patientName" disabled></el-input>
            <el-autocomplete v-else v-model="ruleForm.name" :fetch-suggestions="querySearch" placeholder="姓名/手机号" @input="getPatient" :trigger-on-focus="false"></el-autocomplete>
            <div class="abouts" v-if="ifDataShow">
              <ul>
                <li v-for="a in mdatass" style="height: 36px;" class="hovers" @click="takeSearch(a.patientName,a.customerId)">
                  <ol>
                    <li>{{a.patientName}}</li>
                    <li>{{a.sex}}</li>
                    <li>{{a.birthday ? jsGetAge(formatDate(a.birthday)) : ''}}</li>
                    <li>{{a.phone}}</li>
                    <li>{{a.idCard}}</li>
                  </ol>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-date-picker v-model="patientInfo.birthday" type="date" align="right" style="width: 140px;" disabled>
            </el-date-picker>

          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="patientInfo.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="fileNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="">
            <el-input v-model="patientInfo.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="">
            <el-input v-model="patientInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数" prop="">
            <el-input v-model="patientInfo.bmi" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="">
            <el-input v-model="diabetesTypeName" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄" prop="">
            <el-input v-model="patientSugarVo.ensureDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" prop="" style="width: 730px;display: block;">
            <el-input v-model="patientSugarVo.complications" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="planUserId" style="width: 45%;display: inline-block;">
            <el-select v-model="ruleForm.planUserId" placeholder="请选择">
              <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="planeTime" style="width: 45%;display: inline-block;">
            <el-date-picker v-model="ruleForm.planeTime" type="datetime" placeholder="计划时间" :picker-options="pickerOptions3">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="适用类型" prop="diabetesType" style="width: 45%;display: inline-block;">
            <el-select v-model="ruleForm.diabetesType" placeholder="请选择适用类型" @change="changeDiabetesType">
              <el-option v-for="item in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择模板" style="width: 45%;display: inline-block;">
            <el-select v-model="ruleForm.templates" placeholder="请选择模板" :disabled="checkedss" @change="followTemplateChange">
              <el-option v-for="item in followTemplates" :key="item.templateId" :label="item.name" :value="item.templateId">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访内容" prop="content" class="width100">
            <el-input type="textarea" resize="none" maxlength="250" :rows="4" placeholder="请输入内容" v-model.trim="ruleForm.content">
            </el-input>
            <!--字数提示-->
            <span class="wordsNum">{{contentWords}}/250</span>
          </el-form-item>

          <el-form-item style="display: inline-block;">
            <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
          </el-form-item>
          <el-form-item prop="templateName" style="display: inline-block;margin-left: -100px;" v-if="checkedss">
            <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.templateName"></el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="closes('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
        <!--微信头像-->
        <div class="weChats">
          <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
          <span>微信头像</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus'
  import eventBus from '../../../assets/js/eventBus'

  export default {
    name: 'followUpDialog',
    data: function () {
      return {
        ruleForm: {
          name: '',
          content: '', // 随访内容
          planUserId: '', //被选中的随访计划人员id
          planeTime: '', // 计划时间
          templates: '', // 被选模板
          templateName: '', // 新增模板的名称
          diabetesType: '', // 所选糖尿病类型
        },
        rules: {
          name: [{
              required: true,
              message: '请输入患者姓名',
              trigger: 'change'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          planUserId: [{
            required: true,
            message: '请选择计划人员',
            trigger: 'change'
          }],
          planeTime: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          content: [ // 随访内容
            {
              required: true,
              message: '请输入内容',
              trigger: 'blur'
            },
            {
              validator: this.validatePass,
              trigger: 'blur'
            }
          ],
          templateName: [{
              required: true,
              message: '请填写模板名称',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          diabetesType: [{
            required: true,
            message: '请选择适用类型',
            trigger: 'change'
          }],
        },
        diabetesTypeName: '',
        ifFolPlan: false,
        ifDataShow: false, //是否显示姓名栏下拉
        isDisabled: true, //是否禁用姓名栏
        restaurants: [],
        mdatass: [], // 根据姓名获取的患者列表
        fileNumber: '', // 档案号
        Executor: '', //随访计划人员列表
        followTemplates: [], // 计划模板列表
        cacheFollowTemplates: [], // 缓存计划模板列表
        pickerOptions3: { //出生日期快捷选项配置
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        customerId: '', // 患者id
        patientInfo: {}, // 患者信息
        patientSugarVo: {}, // 患者病情
        checkedss: false, // 是否保存为模板
        diabetesTypeArr: [], // 糖尿病类型
        complicationsArr: [],
        contentWordsNums: 250, //随访内容限制字数
      }
    },
    created() {
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
    },
    computed: {
      //字数统计
      contentWords() {
        return this.contentWordsNums - this.ruleForm.content.length;
      }
    },     
    methods: {
      //获取随访计划人员
      geFollowplaners() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        funBus.geFollowplaners(this, {
          organizationId: user.organizationId
        });
      },
      // 获取随访模板
      getFollowTemplate(data) {
        this.$api.followUpTemplate(data, res => {
          if (res.data.data.length > 0) {
            this.cacheFollowTemplates = res.data.data;
          }
        })
      },
      //字符检索
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 患者姓名栏输入事件
      getPatient() {
        var that = this;
        var data = {
          //keyName: that.patientInfo.patientName
          keyName: that.ruleForm.name
        }

        //if (!!that.patientInfo.patientName) {
        if (!!that.ruleForm.name) {
          this.$api.queryExistPatientInfoByKeyName(data, res => {
            if (res.status == 200) {
              if (res.data.data.length > 0) {
                that.mdatass = res.data.data;
                that.ifDataShow = true;
              } else {
                that.ifDataShow = false;
              }
            }
          }, res => {
            this.$message(res.data.errMsg || res.data.data);
          })
        } else {
          that.ifDataShow = false;
        }

      },
      //获取患者信息
      takeSearch(name, customerId) {
        this.ruleForm.name = name;
        this.mdatass = [];
        this.ifDataShow = false;
        this.customerId = customerId;
        //获取患者信息
        funBus.getPatients(this, customerId);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //关闭随访计划
      closes(formName) {
        this.ifFolPlan = false;
        this.isDisabled = true;
        this.checkedss = false;
        this.$refs[formName].resetFields();
        this.fileNumber = '';
        this.ruleForm.templates = '';
        this.diabetesTypeName = '';
        this.followTemplates = [];
      },
      // 模板选择
      followTemplateChange(templateId) {
        let tempArr = this.followTemplates;
        for (let i = 0, len = tempArr.length; i < len; i++) {
          if (tempArr[i].templateId == templateId) {
            this.ruleForm.content = tempArr[i].followUpContent;
            break;
          }
        }
      },
      // 适用血糖类型change事件
      changeDiabetesType(diabetesType) {
        this.ruleForm.diabetesType = diabetesType;

        // 通过血糖类型的change，变更模板列表
        let obj = [];
        let temp = this.cacheFollowTemplates;
        for (let i = 0, len = temp.length; i < len; i++) {
          if (temp[i].diabetesType == diabetesType) {
            obj.push(temp[i]);
          }
        }
        this.followTemplates = obj;
        this.ruleForm.templates = '';

      },
      //新建计划确定
      submitForm(formName) {
        let vm = this;

        //是否保存为模板
        if (vm.checkedss) vm.ruleForm.templates = "";

        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.openLoading();
            let data = {
              customerId: vm.customerId,
              content: vm.ruleForm.content,
              templateId: vm.ruleForm.templates,
              planTime: vm.ruleForm.planeTime,
              planUserId: vm.ruleForm.planUserId,
              remark: "",
              templateName: vm.ruleForm.templateName, // 新增模板名称
              diabetesTypeKey: vm.patientSugarVo.diabetesType, // 适用类型
            }
            vm.$api.followAdd(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  vm.$message.success('新增随访计划成功!')
                  vm.closes(formName)
                  //回调刷新表格
                  eventBus.$emit('updateFollowUpTable');
                }
              }
              vm.closeLoading()
            }, res => {
              vm.$message(res.data.errMsg || res.data.data);
              vm.closeLoading()
            }).catch(function (err) {
              vm.closeLoading()
            })
          } else {
            return false;
          }
        });
      },

    }
  }
</script>

<style scoped>

.abouts {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
  box-shadow: 0px 2px 4px 0px rgba(4, 0, 0, 0.06);
  border: solid 1px rgba(206, 206, 206, 0.7);
  background: white;
  position: absolute;
  width: 560px;
  z-index: 1000;
}
.abouts ol li {
  float: left;
  margin-right: 8px;
  box-sizing: border-box;
  height: 36px;
  line-height: 36px;
  padding: 0 8px;
  cursor: pointer;
  font-size: 14px;
}
.abouts ol li:nth-child(1) {
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.abouts ol li:nth-child(2) {
  width: 60px;
}
.abouts ol li:nth-child(3) {
  width: 70px;
}
.abouts ol li:nth-child(4) {
  width: 120px;
}
.abouts ol li:nth-child(5) {
  width: 180px;
  margin-right: 0;
  padding: 0;
}
.hovers:hover {
  background: #E9F2FE;
}
</style>
