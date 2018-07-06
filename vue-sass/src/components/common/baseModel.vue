<template>
    <div>
        <top-nav ref="top"></top-nav>
        <left-nav ref="leftNav"></left-nav>
        <!-- 修改密码弹窗 -->
        <el-dialog class="changePwd" title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="formRules" ref="form">
                <!-- prop属性必须要有 -->
                <el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.confirmPassword" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePasswordCancel('form')">取 消</el-button>
                <el-button type="primary" :disabled="btnDisable" @click="changePasswordConfirm('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 报告图片大图显示窗口 -->
        <div class="bigReportShow" v-show="bigImgShow">
            <div class="imgContainer">
                <img class="bigReportImg" :src="bigImgUrl" alt="">
            </div>
            <div class="closeReportShow tac" @click="hideBigImg">X</div>
            <div class="controlContainer tac">
                <span class="smallerSize" v-clicksmaller></span>
                <span class="scaleText">{{bigImgPercent}}%</span>
                <span class="bigerSize" v-clickbiger></span>
                <span class="clickRotate" v-clickrotate></span>
            </div>
        </div>
    </div>
</template>

<style>
    .changePwd .el-dialog {
        width: 20%;
        font-weight: 700;
        border-radius: 10px;
    }
    .changePwd .el-dialog__header {
        border-bottom: 1px solid #dcdfe6;
    }
    .changePwd .el-button {
        font-weight: 700;
    }
    .followPlans, .CanFollows {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        overflow: auto;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .followPlan, .CanFollow {
        padding: 17px;
        position: fixed;
        background-color: #ffffff;
        border-radius: 8px;
    }

    .followPlan {
        width: 30%;
        min-width: 840px;
    }

    .CanFollow {
        width: 698px;
    }
    .searc_med {
        width: 250px;
    }

    .cancels_ {
        background-image: url(../../../images/follow/suif_icon_cancel.png);
    }

    .executeds_ {
        background-image: url(../../../images/follow/suif_icon_done.png);
    }

    .unexecuteds_ {
        background-image: url(../../../images/follow/suif_icon_unrun.png);
    }

    .executeds_2 {
        color: #13BB8E;
    }

    .unexecuteds_2 {
        color: #E95959;
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

    .marry .el-radio {
        margin-left: 2px;
    }

    .hovers:hover {
        background: #E9F2FE;
    }

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

    .form_d .el-form-item {
        margin-bottom: 0;
    }

    .weChats {
        position: absolute;
        top: 92px;
        right: 41px;
        width: 48px;
    }

    .weChats img {
        width: 48px;
        height: 48px;
    }

    .weChats span {
        font-size: 12px;
    }

    .followPlan .el-form .el-form-item {
        width: 240px;
        display: inline-block;
    }
    .close {
        position: absolute;
        right: 17px;
        top: 17px;
        cursor: pointer;
    }
    .bigReportShow{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
    .bigReportShow .imgContainer{
        width: 100%;
        height: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }
    .bigReportShow .imgContainer img{
        display: block;
        width: auto;
        max-width: 100%;
        min-height: 100%;
        margin: auto auto;
    }
    .closeReportShow{
        position: fixed;
        right: 0;
        top: 0;
        width: 50px;
        height: 50px;
        background-color: #666;
        color: #fff;
        font-size: 40px;
        line-height: 50px;
    }
    .controlContainer{
        width: 200px;
        height: 44px;
        padding-left: 39px;
        box-sizing: border-box;
        line-height: 44px;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
    }
    .clickRotate,
    .bigerSize,
    .smallerSize{
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin-top: 11px;
        margin-right: 5px;
    }
    .scaleText{
        float: left;
        width: 44px;
        margin-right: 5px;
    }
    .bigerSize{
        background: url('../../../images/patientDetail/pic_magnify_but.png') no-repeat;
        background-size: cover;
    }
    .smallerSize{
        background: url('../../../images/patientDetail/pic_shrink_but.png') no-repeat;
        background-size: cover;
    }
    .clickRotate{
        margin-right: 0;
        background: url('../../../images/patientDetail/pic_mrotating_but.png') no-repeat;
        background-size: cover;
    }
</style>

<script>
export default {
    name:'baseModel',
    data () {
        return {
            dialogFormVisible: false,
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            formRules: {
                oldPassword: [
                    {required: true, message: '请输入内容', trigger: 'change'},
                    {validator: this.validOldPassword, trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, message: '请输入内容', trigger: 'change'},
                    {validator: this.validNewPassword, trigger: 'blur'}
                ],
                confirmPassword: [
                    {required: true, message: '请输入内容', trigger: 'change'},
                    {validator: this.validConfirmPassword, trigger: 'blur'}
                ],
            },
            formLabelWidth:'80px',
            tempId_: "", // 随访模板id
            woman: '',
            btnDisable: false, //防止重复点击修改密码
            bigImgShow: false,
            bigImgUrl: '',
            bigImgPercent: 100, // 控制大图百分比
            bigImgRotate: 90 // 控制大图旋转角度
        }
    },
    methods: {

        // 验证是否为空格
        validatePass (rule, value, callback) {
            if (value.trim() === '') {
                callback(new Error('请输入内容'));
            } else {
                callback();
            }
        },
        validOldPassword (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!/[a-zA-Z0-9]{6,16}/.test(value)) {
                callback(new Error('请输入6到16位的英文或数字'));
            } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
                callback(new Error('密码不能为空格'));
            } else {
                callback();
            }
        },
        validNewPassword (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!/[a-zA-Z0-9]{6,16}/.test(value)) {
                callback(new Error('请输入6到16位的英文或数字'));
            } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
                callback(new Error('密码不能为空格'));
            } else {
                callback();
            }
        },
        validConfirmPassword (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (/[a-zA-Z0-9]{6-16}/.test(value)) {
                callback(new Error('请输入6到16位的英文或数字'));
            } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
                callback(new Error('密码不能为空格'));
            } else if (value !== this.form.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        // 修改密码确认
        changePasswordConfirm (formName) {
            let _this = this;
            this.btnDisable = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        userId: (JSON.parse(sessionStorage.getItem('user'))).userId,
                        oldPassword:_this.form.oldPassword,
                        password: _this.form.confirmPassword
                    }
                    _this.$api.userChangePassword(data,res=>{
                        _this.btnDisable = false
                        _this.dialogFormVisible = false;
                        _this.$refs[formName].resetFields();
                        _this.form.oldPassword = "";
                        _this.form.newPassword = "";
                        _this.form.confirmPassword = "";
                        _this.$message(res.data.data);
                        _this.btnDisable = false;
                    },res => {
                        if (res.data.code == 0) {
                            _this.dialogFormVisible = false;
                            _this.$refs[formName].resetFields();
                        } else {
                            _this.$message(res.data.errMsg);
                        }
                        _this.btnDisable = false;
                    })
                } else {
                    _this.btnDisable = false;
                }
            })
        },
        // 修改密码取消
        changePasswordCancel (formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
            this.form.oldPassword = "";
            this.form.newPassword = "";
            this.form.confirmPassword = "";
        },
        // 隐藏报告
        hideBigImg () {
            this.bigImgShow = false;
            this.bigImgPercent = 100;
            this.bigImgRotate = 90;
            let bigImg = document.getElementsByClassName('bigReportImg')[0];
            bigImg.style.transform = 'scale(1, 1)';
        }
    },
    directives: {
        clickrotate: {
            bind (el, binding, vnode, oldvnode) {
                el.addEventListener('click', () => {
                    let sum = vnode.context.bigImgRotate/90 -1;
                    sum ++ ;
                    let bigImg = document.getElementsByClassName('bigReportImg')[0];
                    let styleStr = bigImg.style.transform;
                    if (!!styleStr && styleStr.indexOf('rotate') !== -1) {
                            // 如果有了rotate属性 , 分割字符串再组装
                            let tempArr = styleStr.split('rotate');
                            let str = '(' + 90*sum + 'deg)';
                            let newStr =tempArr[0] + 'rotate' + tempArr[1].replace(/^\(.*\)$/, str);
                            bigImg.style.transform = newStr;
                    } else {
                        bigImg.style.transform = styleStr + 'rotate('+90*sum+'deg)';
                    }
                    vnode.context.bigImgRotate = (sum + 1) * 90;
                })
            }
        },
        clickbiger: {
            bind (el, binding, vnode, oldvnode) {
                el.addEventListener('click', () => {
                    let bigImg = document.getElementsByClassName('bigReportImg')[0];
                    let sum = vnode.context.bigImgPercent / 100;
                    let styleStr = bigImg.style.transform;
                    if (sum < 2) {
                        sum +=0.5 ;
                        if (!!styleStr && styleStr.indexOf('scale') !== -1) {
                            let tempArr = styleStr.split('scale');
                            let str = '(' + 1 * sum + ',' + 1 * sum + ')';
                            let newStr;
                            if(tempArr[1].indexOf('rotate') !== -1) {
                                // 如果有rotate和scale属性分割两次再组装
                                let tempArr2 = tempArr[1].split('rotate');
                                newStr = tempArr[0] + 'scale' + tempArr2[0].trim().replace(/^\(.*\)$/, str) + 'rotate' + tempArr2[1];
                            } else {
                                newStr = tempArr[0] + 'scale' + tempArr[1].replace(/^\(.*\)$/, str);
                            }
                            bigImg.style.transform = newStr;
                        } else {
                            bigImg.style.transform = styleStr + 'scale('+1 * sum+','+1 * sum+')';
                        }
                        vnode.context.bigImgPercent = 100 * sum;
                    }
                })
            }
        },
        clicksmaller: {
            bind (el, binding, vnode, oldvnode) {
                el.addEventListener('click', () => {
                    let bigImg = document.getElementsByClassName('bigReportImg')[0];
                    let sum = vnode.context.bigImgPercent / 100;
                    let styleStr = bigImg.style.transform;
                    if (sum > 1) {
                        sum -=0.5 ;
                        if (!!styleStr && styleStr.indexOf('scale') !== -1) {
                            let tempArr = styleStr.split('scale');
                            let str = '(' + 1 * sum + ',' + 1 * sum + ')';
                            let newStr;
                            if(tempArr[1].indexOf('rotate') !== -1) {
                                // 如果有rotate和scale属性分割两次再组装
                                let tempArr2 = tempArr[1].split('rotate');
                                newStr = tempArr[0] + 'scale' + tempArr2[0].trim().replace(/^\(.*\)$/, str) + 'rotate' + tempArr2[1];
                            } else {
                                newStr = tempArr[0] + 'scale' + tempArr[1].replace(/^\(.*\)$/, str);
                            }
                            bigImg.style.transform = newStr;
                        } else {
                            bigImg.style.transform = styleStr + 'scale('+1 * sum+','+1 * sum+')';
                        }
                        vnode.context.bigImgPercent = 100 * sum;
                    }
                    // if (sum > 1) {
                    //     sum -=0.5 ;
                    //     vnode.context.bigImgPercent = 100 * sum;
                    //     bigImg.style.transform = 'scale('+1*sum+','+1*sum+')';
                    // }
                })
            }
        }
    }
}
</script>


