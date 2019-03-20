<template>
  <div class="commonDialog">
    <!-- 批量随访 -->
    <div class="batchReminds batchFollow" v-if="ifBatchFollow">
      <div class="batchRemind">
        <h5>批量随访</h5>
        <span class="close" @click="cancelBatchFollow('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top:30px;">
          <el-form-item label="患者姓名" prop="multi">
            <div v-if="isAllPatient" style="padding-left:10px;width:726px;height:80px;border: solid 1px #e0e0e0; background: #eee;">
              <span>全部患者</span>
            </div>
            <div v-else style="padding-left:10px;width:726px;height:80px;border: solid 1px #e0e0e0;overflow: auto;">
              <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientFollowClose(index)">{{tag.patientName}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="计划人员" prop="values" class="floatLeft planner" style="width: 45%;">
            <el-select v-model="ruleForm.values" placeholder="请选择">
              <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="planeTime" class="floatLeft planTime" style="width: 45%;">
            <el-date-picker v-model="ruleForm.planeTime" type="datetime" placeholder="计划时间" :picker-options="pickerOptions3">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="floatLeft" label="适用类型" prop="diabetesType" style="width: 45%;display: block;">
            <el-select v-model="ruleForm.diabetesType" placeholder="请选择适用类型" @change="changeDiabetesType">
              <el-option v-for="item in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" label="选择模板" prop="templates" style="width: 45%;display: block;">
            <el-select v-model="ruleForm.templates" placeholder="请选择模板" :disabled="checkedss" @change="followTem_">
              <el-option v-for="(item,index) in followTemplates" :key="index" :label="item.name" :value="item.templateId">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访内容" prop="content" class="floatLeft width100">
            <el-input type="textarea" v-model.trim="ruleForm.content" resize="none" maxlength="250" :rows="4" placeholder="请输入内容">
            </el-input>
            <!--字数提示-->
            <span class="wordsNum">{{contentWords}}/250</span>
          </el-form-item>

          <el-form-item style="display: inline-block;">
            <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
          </el-form-item>
          <el-form-item prop="templateName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
            <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.templateName"></el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;" class="floatLeft">
            <el-button @click="cancelBatchFollow('ruleForm')">取消</el-button>
            <el-button type="primary" @click="batchFollowSure('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    name: 'batchFollowUp',
    data() {
      return {
        ifBatchFollow: false,
        mTypes: 1, // 干预类型 , 用于查询干预模板
        ruleForm: {
          multi: [], //批量患者列表
          content: '',
          planeTime: '',
          values: '', // 计划人员
          templates: '', // 模板
          templateName: '', // 新增模板的名称,
          diabetesType: '', // 所选糖尿病类型
        },
        rules: {
          values: [{
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
          /*
          templates: [{
            required: true,
            message: '请选择模板',
            trigger: 'change'
          }],
          */
          content: [{
              required: true,
              message: '请输入内容',
              trigger: 'change'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          multi: [{
            type: 'array',
            required: true,
            message: '请重新选择患者',
            trigger: 'change'
          }],
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
        Executor: [],
        pickerOptions3: { //出生日期快捷选项配置
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        followTemplates: [], // 计划模板列表
        cacheFollowTemplates: [], // 缓存计划模板列表
        tempId: '',
        origin: '', // 目标起源 , 即哪个组件点开的随访组件
        isAllPatient: false, // 是否选中全部患者
        allPatientId: [], // 全部患者id数组
        //searchScope: {}, // 搜索条件(全部患者)
        checkedss: false, // 是否保存为模板,
        diabetesTypeArr: [], // 糖尿病类型
        contentWordsNums: 250, //随访内容限制字数
      }
    },
    computed: {
      //字数统计
      contentWords() {
        return this.contentWordsNums - this.ruleForm.content.length;
      }
    },       
    methods: {
      // 获取随访计划人员
      geFollowplaners(data) {
        this.$api.queByOrganId(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              this.Executor = res.data.data;
            }
          }
        })
      },
      // 获取随访模板
      getFollowTemplate(data) {
        this.$api.followUpTemplate(data, res => {
          if (res.data.data.length > 0) {
            this.followTemplates = res.data.data;
          }
        })
      },
      // 批量随访患者框清除选中的患者
      patientFollowClose(index) {
        this.ruleForm.multi.splice(index, 1);
      },
      // 批量随访取消
      cancelBatchFollow(formName) {
        this.$refs[formName].resetFields();
        this.ifBatchFollow = false;
        this.checkedss = false;
        this.cacheFollowTemplates = [];
        this.isAllPatient = false;
        this.origin.isAllPatient = false; // 更改‘是否全选患者’状态
        this.origin.$refs.multipleTable.clearSelection();
      },
      // 批量随访确认
      batchFollowSure(formName) {
        let vm = this;

        //是否保存为模板
        if (vm.checkedss) {
          //vm.rules.templates[0].required = false;
          vm.ruleForm.templates = "";
        } else {
          //vm.rules.templates[0].required = true;
        }

        if (vm.isAllPatient) { //全部患者
          vm.rules.multi[0].required = false; // 患者姓名设为非必填
        } else {
          vm.rules.multi[0].required = true; // 患者姓名设为必填
        }

        vm.$refs[formName].validate((valid) => {

          //如果没有格式错误
          if (valid) {
            vm.openLoading();
            if (!vm.isAllPatient) { //批量随访(非全选患者时)

              let customerIds = []; // 患者id数组
              vm.ruleForm.multi.forEach((e) => {
                customerIds.push(e.customerId)
              })

              //批量随访
              let data = {
                customerIds: customerIds,
                templateId: vm.ruleForm.templates,
                content: vm.ruleForm.content,
                planTime: vm.ruleForm.planeTime,
                planUserId: vm.ruleForm.values,
                status: 2,
                remark: "",
                templateName: vm.ruleForm.templateName, // 新增模板名称
                diabetesTypeKey: vm.ruleForm.diabetesType, // 适用类型
              }

              vm.$api.addBatchFollow(data, res => {
                vm.cancelBatchFollow(formName);
                vm.$message.success(res.data.errMsg || res.data.data);
                vm.closeLoading();
                
                
              }, (error) => {
                vm.$message.error(error.data.errMsg);
                vm.closeLoading();
              })

            } else { //全部患者
              let data = {
                customerIds: vm.allPatientId,
                templateId: vm.ruleForm.templates, //随访模板id
                content: vm.ruleForm.content, //随访内容
                planTime: vm.ruleForm.planeTime, //计划随访时间
                planUserId: vm.ruleForm.values, //计划随访人员ID
                remark: "",
                templateName: vm.ruleForm.templateName, // 新增随访模板名称
                diabetesTypeKey: vm.ruleForm.diabetesType, // 适用类型
              }

              vm.$api.followUpAll(data, res => {
                vm.cancelBatchFollow(formName);
                vm.$message.success(res.data.errMsg || res.data.data);
                vm.closeLoading();
              }, (error) => {
                vm.$message.error(error.data.errMsg);
                vm.closeLoading();
              })

            }

          }
        });
      },
      // 随访模板change事件
      followTem_(templateId) {
        //let vm = this;
        //let content;
        //vm.tempId_ = templateId;
        //vm.$api.queryByIds_({templateId:templateId},res=>{
        //    content = res.data.data.followUpContent;
        //    vm.ruleForm.content = content;
        //});

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

        // 通过血糖类型的change，变更模板列表
        if (this.cacheFollowTemplates.length == 0) {
          this.cacheFollowTemplates = Object.assign([], this.followTemplates); //深拷贝
        }
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
    }
  }
</script>

<style scoped>
  .batchRemind{
    height: 548px;
  }
</style>
