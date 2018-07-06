<template>
  <div class="commonDialog">
    
    <!-- 随访弹窗 -->
    <div class="followPlans" v-if="ifFolPlan">
        <div class="followPlan">
            <h5>随访计划</h5>
            <span class="close" @click="closes('ruleForm')">X</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
                <el-form-item label="患者姓名" style="position: relative;">
                    <el-autocomplete class="inline-input" v-model="patientInfo.patientName" disabled></el-autocomplete>
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
                    <el-input v-model="patientSugarVo.diabetesType" disabled></el-input>
                </el-form-item>
                <el-form-item label="糖龄" prop="">
                    <el-input v-model="patientSugarVo.ensureDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="并发症" prop="">
                    <el-input v-model="patientSugarVo.complications" disabled></el-input>
                </el-form-item>
                <el-form-item label="计划人员" prop="planUserId">
                    <el-select v-model="ruleForm.planUserId" placeholder="请选择">
                        <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                            {{item.nickname}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划时间" prop="planeTime">
                    <el-date-picker v-model="ruleForm.planeTime" type="datetime" style="width: 140px;" placeholder="计划时间" :picker-options="pickerOptions3">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="选择模板" prop="templates" style="width: 100%;display: block;">
                    <el-select v-model="ruleForm.templates" placeholder="请选择模板" @change="followTem_">
                        <el-option v-for="item in followTemplates" :key="item.templateId" :label="item.name" :value="item.templateId">
                            {{item.name}}
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="随访内容" prop="content" style="width: 100%;display: block;">
                    <el-input type="textarea" resize="none" :rows="4" placeholder="请输入内容" v-model="ruleForm.content">
                    </el-input>
                </el-form-item>

                <el-form-item style="text-align: right;width: 100%;">
                    <el-button @click="closes('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
            <!--微信头像-->
            <div class="weChats">
                <img :src="patientInfo.sex=='女' ? woman : man" alt=""/>
                <span>微信头像</span>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
    import man from '../../../../images/patientManage/add_suif_pic_man.png'
    import woman from '../../../../images/patientManage/add_suif_pic_woman.png'  
    import funBus from '../../../assets/js/funBus'
    export default {
        name: 'followUpDialog',
        data: function () {
            return {
                customerId: '',
                ruleForm: {
                  content: '', // 随访内容                
                  planUserId: '', //被选中的随访计划人员id
                  planeTime: '', // 计划时间
                  templates: '', // 被选模板
                },
                man: man,
                woman: woman,
                rules: {
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
                    templates: [{
                        required: true,
                        message: '请选择模板',
                        trigger: 'change'
                    }],
                    content: [{ // 随访内容
                            required: true,
                            message: '请输入内容',
                            trigger: 'change'
                        },
                        {
                            validator: this.validatePass,
                            trigger: 'blur'
                        }
                    ]
                },
                ifFolPlan: false,
                fileNumber: '', // 档案号
                Executor: '', //随访计划人员列表
                followTemplates: '', // 计划模板列表
                pickerOptions3: '',
                customerId: '', // 患者id
                patientInfo: {}, // 患者信息
                patientSugarVo: {}, // 患者病情              
            }
        },
        created: function () {
            if (!!sessionStorage.getItem('user')) {
                let orgId = JSON.parse(sessionStorage.getItem('user')).organizationId;
                funBus.geFollowplaners(this, orgId); //获取随访计划人员
            }
        },
        methods: {

            //关闭随访计划
            closes(formName) {
                this.ifFolPlan = false;
                this.$refs[formName].resetFields();

            },
            // 模板选择
            followTem_(templateId) {
                this.ruleForm.templates = templateId;
                this.$api.queryByIds_({
                    templateId: templateId
                }, res => {
                    this.ruleForm.content = res.data.data.followUpContent;
                })
            },

            //新建计划确定
            submitForm(formName) {
                var that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        var data = {
                            customerId: that.customerId,
                            content: that.ruleForm.content,
                            templateId: that.ruleForm.templates,
                            planTime: that.ruleForm.planeTime,
                            planUserId: that.ruleForm.planUserId,
                            remark: ""
                        }
                        that.$api.followAdd(data, res => {
                            if (res.status == 200) {
                                if (res.data.code == 0) {
                                  that.$message.success('新增随访计划成功!')
                                    that.ifFolPlan = false;
                                    that.$refs[formName].resetFields();
                                    //回调刷新表格
                                    let patientDetail = that.$parent.$children[0];
                                    if(patientDetail.healthFol){
                                      patientDetail.healthFol( patientDetail.currentPage2, patientDetail.pagesize2);
                                    }
                                }
                            }
                        }).catch(function (err) {
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }
</script>

<style lang="" scoped>

</style>