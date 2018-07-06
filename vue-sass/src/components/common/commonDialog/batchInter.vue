<template>
    <div class="commonDialog">
        <!--批量干预-->
        <div class="batchInters" v-if="ifBaInter">
            <div class="batchInter">
                <h5>批量干预</h5>
                <span class="close" @click="resetForms('ruleForm')">X</span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top: 30px;">
                    <el-form-item label="患者姓名" prop="multi">
                        <div @change="Radio(ruleForm.multi)" style="width:723px;height:80px;padding-left:10px;border: solid 1px #e0e0e0;overflow: auto;">
                            <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientClose(index)">{{tag.patientName}}
                            </el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item label="干预类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="干预类型" @change="Radio(ruleForm.type)" style="vertical-align: bottom;height:40px;">
                            <el-option style="margin: 0 7px 10px;" v-for="it in interTypes" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                                {{it.itemValue}}
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="干预方式" prop="typeWay">
                        <el-select v-model="ruleForm.typeWay" placeholder="干预方式" style="vertical-align: bottom;height:40px;">
                            <el-option style="margin: 0 7px 10px;" v-for="it in m_typeWays" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                                {{it.itemValue}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="方案名称" prop="index">
                        <el-select v-model="ruleForm.index" filterable :disabled="checkedss" placeholder="请选择" @change="uiui(ruleForm.index)" style="height:40px;">
                            <el-option v-for="(item,index) in options" :key="item.name" :label="item.name" :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="干预内容" prop="content">
                        <el-input type="textarea" resize="none" v-model="ruleForm.content" style="width: 733px;" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item style="display: inline-block;">
                        <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
                    </el-form-item>
                    <el-form-item label="" prop="temName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
                        <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.temName"></el-input>
                    </el-form-item>
                    <el-form-item label="发送时间" prop="">
                        <el-radio-group v-model="radio4">
                            <el-radio :label="1">立即发送</el-radio>
                            <el-radio :label="2" style="margin-left: 20px !important;">定时发送</el-radio>
                        </el-radio-group>
                        <!--代替判断-->
                        <el-form-item label="" prop="setTime" v-if="radio4 == 2" style="display: inline-block;">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.setTime" :picker-options="pickerOptions0"></el-date-picker>
                        </el-form-item>
                        <!--代替判断-->
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button @click="resetForms('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForms('ruleForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import funBus from '../../../assets/js/funBus'
export default {
    data () {
        return {
            ifBaInter: false,
            ruleForm: {
                typeWay: "",
                index: '',
                content: "",
                type: "",
                multi: [],
                recont: "",
                temName: "",
                setTime: ""
            },
            rules: {
                type: [{
                    required: true,
                    message: '请选择干预类型',
                    trigger: 'change'
                }],
                typeWay: [{
                    required: true,
                    message: '请选择干预方式',
                    trigger: 'change'
                }],
                content: [{
                        required: true,
                        message: '请输入干预内容',
                        trigger: 'change'
                    },
                    {
                        validator: funBus.validateIsNull,
                        trigger: 'blur'
                    }
                ],
                index: [{
                    required: true,
                    message: '请选择方案名称',
                    trigger: 'change'
                }],
                multi: [{
                    type: 'array',
                    required: true,
                    message: '请重新选择患者',
                    trigger: 'change'
                }],
                recont: [{
                        required: true,
                        message: '请输入提醒内容',
                        trigger: 'change'
                    },
                    {
                        validator: funBus.validateIsNull,
                        trigger: 'blur'
                    }
                ],
                temName: [{
                        required: true,
                        message: '请填写模板名称',
                        trigger: 'blur'
                    },
                    {
                        validator: funBus.validateIsNull,
                        trigger: 'blur'
                    }
                ],
                setTime: [{
                    required: true,
                    message: '请选择发送时间',
                    trigger: 'blur'
                }]
            },
            interTypes: [],
            m_typeWays: [],
            options: [],
            radio4: 1,
            checkedss: false,
                        pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            origin:'' // 目标起源 , 即哪个组件点开的干预组件
        }
    },
    methods: {
        Radio (type) {
            //获取干预方案名称, 参数type : 干预类型 , 用于查询干预模板
            this.mTypes = type;
            funBus.getInterven(this,type);
            //清空选择的值
            this.ruleForm.index = "";
            this.ruleForm.content = "";
        },
        //删除患者批量
        patientClose(index) {
            // 批量干预患者框清除选中的患者
            this.ruleForm.multi.splice(index, 1);
        },
        uiui(index) {
            // console.log(index)
            this.tempId = this.options[index].templateId;
            //          console.log(this.options[index])
            var that = this;
            var data = {
                userInterventionId: that.tempId
            }
            that.$api.queryById(data, res => {
                if (res.status == 200) {
                    if (res.data.data) {
                        that.ruleForm.content = res.data.data.content;
                        // console.log(res.data.datacontent)
                    }
                }
            })
        },
        //批量取消
        resetForms(formName) {
            this.$refs[formName].resetFields();
            this.ifBaInter = false;
            this.origin.$refs.multipleTable.clearSelection();
        },
        //批量确定
        submitForms(formName) {
            var that = this;
            var index;
            var temId;
            var realSendTime;
            var name = "";
            //保存为模板否
            if (that.checkedss) {
                this.rules.index[0].required = false;
                name = this.ruleForm.temName;
                temId = "";
            }
            if (!that.checkedss) {
                that.rules.index[0].required = true;
                index = that.ruleForm.index;
                if (that.options) {
                    if (index !== '') {
                        name = that.options[index].name;
                    }
                }
                temId = that.tempId;
            }

            this.$refs[formName].validate((valid) => {
                /*获取session信息*/
                var useInfo = sessionStorage.getItem('user');
                //获取机构ID
                var organizationId = JSON.parse(useInfo).organizationId;
                //如果没有格式错误
                if (valid) {
                    //立即发送还是定时发送
                    if (this.radio4 == 1) {
                        that.ruleForm.setTime = "";
                        realSendTime = new Date();
                    } else if (this.radio4 == 2) {
                        realSendTime = '';
                    }
                    //
                    var customerIds = [];
                    that.ruleForm.multi.forEach((e) => {
                        customerIds.push(e.customerId)
                    })

                    var content = this.ruleForm.content;
                    var type = this.ruleForm.type;
                    var seqNum = this.options.length + 1;
                    var interType = this.mTypes;

                    //批量干预
                    var data = {
                        "customerIds": customerIds,
                        "templateId": temId,
                        "type": that.ruleForm.typeWay,
                        "name": name,
                        "content": content,
                        "planSendTime": that.ruleForm.setTime,
                        "realSendTime": realSendTime,
                        "interventionType": interType,
                        "templateType": that.templateType_, //干预类型(0.待建议，1.成功 2.失败),
                        "organId": organizationId,
                        "seqNum": seqNum
                    }
                    this.BatchInt = true
                    this.$api.intervenBatchAdd(data, res=> {
                        that.BatchInt = false
                        if (res.status == 200) {
                            if (res.data.data) {
                                that.ifBaInter = false;
                                that.origin.$refs.multipleTable.clearSelection();
                                that.$refs[formName].resetFields();
                            }
                        }
                    }, (error) => {
                        that.$message.error(error.data.errMsg);
                    })
                }
            });
        }
    }
}
</script>
