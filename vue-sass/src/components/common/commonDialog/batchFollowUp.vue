<template>
    <div class="commonDialog">
        <!-- 批量随访 -->
        <div class="batchReminds batchFollow" v-if="ifBatchFollow">
            <div class="batchRemind">
                <h5>批量随访</h5>
                <span class="close" @click="cancelBatchFollow('ruleForm')">X</span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top:30px;">
                    <el-form-item label="患者姓名" prop="multi">
                        <div @change="Radio(ruleForm.multi)" style="padding-left:10px;width:726px;height:80px;border: solid 1px #e0e0e0;overflow: auto;">
                            <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientFollowClose(index)">{{tag.patientName}}
                            </el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item label="计划人员" prop="values" class="floatLeft planner">
                    <el-select v-model="ruleForm.values" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in Executor"
                        :key="item.userId"
                        :label="item.nickname"
                        :value="item.userId">
                        {{item.nickname}}
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="计划时间" prop="planeTime" class="floatLeft planTime">
                    <el-date-picker
                        v-model="ruleForm.planeTime"
                        type="datetime"
                        style="width: 140px;"
                        placeholder="计划时间"
                        :picker-options="pickerOptions3"
                    >
                    </el-date-picker>
                    </el-form-item>

                    <el-form-item class="floatLeft" label="选择模板" prop="Templates" style="width: 100%;display: block;">
                    <el-select v-model="ruleForm.Templates" placeholder="请选择模板" @change="followTem_">
                        <el-option
                        v-for="item in followTemplates"
                        :key="item.templateId"
                        :label="item.name"
                        :value="item.templateId">
                        {{item.name}}
                        </el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="随访内容" prop="Fcontent" class="floatLeft" style="width: 100%;display: block;">
                    <el-input
                        type="textarea"
                        resize="none"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="ruleForm.Fcontent">
                    </el-input>
                    </el-form-item>

                    <el-form-item style="text-align: right;width: 100%;" class="floatLeft">
                        <el-button @click="cancelBatchFollow('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="batchFollowSure('ruleForm')">确定</el-button>
                        <!-- :disabled="BatchInt" -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
import funBus from '../../../assets/js/funBus'
export default {
    data () {
        return {
            ifBatchFollow: false,
            mTypes: 1, // 干预类型 , 用于查询干预模板
            ruleForm: {
                multi: [], //批量患者列表
                Fcontent: '',
                planeTime: '',
                values: '', // 计划人员
                Templates: '',
            },
            rules: {
                values: [
                    {required: true, message: '请选择计划人员', trigger: 'change'}
                ],
                planeTime: [
                    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                ],
                Templates: [
                    {required: true, message: '请选择模板', trigger: 'change'}
                ],
                Fcontent: [
                    {required: true, message: '请输入内容', trigger: 'change'},
                    {validator: funBus.validateIsNull, trigger: 'blur'}
                ],
                multi: [{
                    type: 'array',
                    required: true,
                    message: '请重新选择患者',
                    trigger: 'change'
                }],
            },
            Executor:'',
            pickerOptions3:'',
            followTemplates:'',
            origin:'' // 目标起源 , 即哪个组件点开的随访组件
        }
    },
    methods: {
        // 获取随访计划人员
        geFollowplaners (data) {
            this.$api.queByOrganId(data, res => {
                if (res.status == 200) {
                    if (res.data.data) {
                        this.Executor = res.data.data;
                    }
                }
            })
        },
        // 获取随访模板
        getFollowTemplate (data) {
            this.$api.queryUsers_(data,res=> {
                if (res.data.data.length > 0) {
                    this.followTemplates = res.data.data;
                } else {
                    this.followTemplates = [];
                }
            })
        },
        Radio (type) {
            //获取干预方案名称, 参数type : 干预类型 , 用于查询干预模板
            this.mTypes = type;
            funBus.getInterven(this,type);
            //清空选择的值
            this.ruleForm.index = "";
            this.ruleForm.content = "";
        },
        patientFollowClose (index) {
            // 批量随访患者框清除选中的患者
            this.ruleForm.multi.splice(index, 1);
        },
        // 批量随访取消
        cancelBatchFollow (formName) {
            this.$refs[formName].resetFields();
            this.ifBatchFollow = false;
            this.origin.$refs.multipleTable.clearSelection();
        },
        // 批量随访确认
        batchFollowSure (formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                /*获取session信息*/
                let useInfo = sessionStorage.getItem('user');
                //获取机构ID
                let organizationId = JSON.parse(useInfo).organizationId;
                //如果没有格式错误
                if (valid) {
                    let customerIds = [];
                    _this.ruleForm.multi.forEach((e) => {
                        customerIds.push(e.customerId)
                    })
                    //批量随访
                    let data = {
                        customerIds: customerIds,
                        templateId: _this.tempId_,
                        content: _this.ruleForm.Fcontent,
                        planTime: _this.ruleForm.planeTime,
                        planUserId: _this.ruleForm.values,
                        status: 2,
                        remark: ""
                    }
                    _this.$api.addBatchFollow(data, res=> {
                        _this.ifBatchFollow = false;
                        _this.origin.$refs.multipleTable.clearSelection();
                        _this.$refs[formName].resetFields();
                    }, (error) => {
                        _this.$message.error(error.data.errMsg);
                    }).catch(function (err) {
                        console.log(err)
                    })
                }
            });
        },
        followTem_ (templateId) {
            var _this = this;
            var content;
            _this.tempId_ = templateId;
            this.$api.queryByIds_({templateId:templateId},res=>{
                content = res.data.data.followUpContent;
                _this.ruleForm.Fcontent = content;
            })
        }
    }
}
</script>
