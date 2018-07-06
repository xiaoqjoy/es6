<template>
    <div class="commonDialog">
        <!--批量提醒-->
        <div class="batchReminds" v-if="ifBatchRemind">
            <div class="batchRemind">
                <h5>批量提醒</h5>
                <span class="close" @click="resetForms('ruleForm')">X</span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top:30px;">
                    <el-form-item label="患者姓名" prop="multi">
                        <div @change="Radio(ruleForm.multi)" style="padding-left:10px;width:726px;height:80px;border: solid 1px #e0e0e0;overflow: auto;">
                            <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientClose(index)">{{tag.patientName}}
                            </el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item label="提醒方式" prop="typeWay" style="height:40px;">
                        <el-select v-model="ruleForm.typeWay" placeholder="提醒方式" style="vertical-align: bottom;height:40px;">
                            <el-option style="margin: 0 7px 10px;" v-for="it in m_typeWays" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                                {{it.itemValue}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="提醒内容" prop="recont">
                        <el-input type="textarea" resize="none" v-model="ruleForm.recont" style="width: 739px;" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <span>快捷回复:</span>
                        <span class="edit floatRight" @click="edit">编辑</span>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="radio_" @change="handClick" style="vertical-align:inherit;display: inline;">
                            <el-radio fill="#ccc" :label="tag" v-for="(tag,index) in dynamicTags" :key="tag.replyContent">
                                <el-tag closable :disable-transitions="false" @close="handleClose(tag)">
                                    {{tag.replyContent}}
                                </el-tag>
                            </el-radio>
                        </el-radio-group>
                        <span v-if="newAdds" style="display: inline-block;">
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </span>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button @click="resetForms('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="batchSure('ruleForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .edit {
        color: #267bf7;
        cursor: pointer;
        margin-right: 22px;
    }
</style>

<script>
import funBus from '../../../assets/js/funBus'
export default {
    data () {
        return {
            ifBatchRemind: false,
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
                ]
            },
            origin: '',
            m_typeWays: [],
            //快捷回复
            dynamicTags: [],
            newAdds: false,
            inputVisible: false,
            radio_: '',
            templateId_: '',
            inputValue: '',
            templateType_: 0,
            status_: 0,
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
        //批量取消
        resetForms(formName) {
            this.$refs[formName].resetFields();
            this.ifBatchRemind = false;
            this.origin.$refs.multipleTable.clearSelection();
        },
        //确定批量提醒
        batchSure(formName) {
            this.$refs[formName].validate((valid) => {
                /*获取session信息*/
                var useInfo = sessionStorage.getItem('user');
                //获取机构ID
                var organizationId = JSON.parse(useInfo).organizationId;
                //如果没有格式错误
                if (valid) {
                    var that = this;
                    var content = this.ruleForm.recont;
                    var customerIds = [];
                    that.ruleForm.multi.forEach((e) => {
                        customerIds.push(e.customerId)
                    })
                    var data = {
                        "customerIds": customerIds,
                        "templateId": that.templateId_,
                        "type": that.ruleForm.typeWay,
                        "content": content,
                        "templateType": that.templateType_, //类别（0:私有，1:公有）
                        "organId": organizationId,
                        "status": that.status_ //干预类型(0.待建议，1.成功 2.失败),
                    }
                    that.$api.batchAdd(data, res=> {
                        if (res.status == 200) {
                            if (res.data.data) {
                                that.ifBatchRemind = false;
                                that.$refs[formName].resetFields();
                            }
                        }
                    }, (error) => {
                        that.$message.error(error.data.errMsg);
                    })
                }
            });
        },
        edit() {
            $(".edit").html() == "编辑" ? $(".edit").html("保存") : $(".edit").html("编辑");
            if ($(".edit").html() == "编辑") {
                this.newAdds = false;
            }
            if ($(".edit").html() == "保存") {
                this.newAdds = true;
            }
        },
        //点击快捷回复
        handClick(tag) {
            this.templateId_ = tag.templateId;
            this.ruleForm.recont = tag.replyContent;
        },
        //删除快捷回复标签
        handleClose(tag) {
            var that = this;
            var data = {
                userReplyId:tag.userReplyId
            }
            this.$api.deleteById_(data, res => {
                if (res.status == 200) {
                    if (res.data.data) {
                        //成功回调快捷回复
                        funBus.dynamic(that);
                    }
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        //新增快捷回复
        handleInputConfirm() {
            let inputValue = this.inputValue.replace(/(^\s*)|(\s*$)/g, "");
            if (inputValue) {
                var that = this;
                var seq = this.dynamicTags.length + 1;
                var data = {
                    replyContent: inputValue,
                    templateType: that.templateType_, //干预类型(0.待建议，1.成功 2.失败),
                    organId: organizationId,
                    seqNum: seq
                }
                //
                this.$api.replyAdd(data, res=> {
                    if (res.status == 200) {
                        if (res.data.data) {
                            //新增成功回调快捷回复
                            funBus.dynamic(that);
                        }
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        showInput() {
            this.inputVisible = true;
            var that = this;
            that.$nextTick(_ => {
                that.$refs.saveTagInput.$refs.input.focus();
            });
        }
    }
}
</script>
