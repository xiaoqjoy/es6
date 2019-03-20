<template>
  <div class="commonDialog">

    <!--推送提醒-->
    <div class="newReminds" v-if="ifnewRemind">
      <div class="newRemind">
        <h5>推送提醒</h5>
        <span class="close" @click="addClose('ruleForm')">X</span>
        <ul>
          <li>患者姓名：<span>{{patientInfo.patientName}}</span></li>
          <li>出生年月：<span>{{patientInfo.birthday}}</span></li>
          <li>性别：<span>{{patientInfo.sex}}</span></li>
          <li>手机号：<span>{{patientInfo.phone}}</span></li>
        </ul>
        <ul>
          <li>身 高：<span>{{patientInfo.height ? patientInfo.height+'cm' : ''}}</span></li>
          <li>体 重：<span>{{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}</span></li>
          <li>类型：<span>{{diabetesTypeName}}</span></li>
        </ul>
        <ul>
          <li style="width: 90%;">并发症：<span>{{patientSugarVo.complications }}</span></li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm remindDialog" style="margin-top:30px;">
          <el-form-item label="提醒方式" prop="typeWay">
            <el-select v-model="ruleForm.typeWay" placeholder="提醒方式" style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;" v-for="it in meansIntervenArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提醒内容" prop="recont">
            <el-input type="textarea" resize="none" v-model.trim="ruleForm.recont" :rows="3" maxlength="100" placeholder="内容不能超出100字"></el-input>
            <!--字数提示-->
            <span class="wordsNum">{{words}}/100</span>
          </el-form-item>
          <el-form-item label="" prop="">
            <span>快捷回复:</span>
            <span class="edit floatRight" @click="edit">{{newAdds?'保存':'编辑'}}</span>
          </el-form-item>
          <el-form-item>
            <div class="tagContainer">
              <el-radio-group v-model="radio_" @change="handClick" style="vertical-align:inherit ;display: inline;">
                <el-radio fill="#ccc" :label="tag" v-for="(tag,index) in dynamicTags" :key="tag.replyContent">
                  <el-tag closable :disable-transitions="false" @close="handleClose(tag)">
                    {{tag.replyContent}}
                  </el-tag>
                </el-radio>
              </el-radio-group>
              <!--<span v-if="newAdds" style="display: inline-block;">-->
              <span v-if="newAdds" style="clear: both; display: block;">
                <el-input
                v-if="inputVisible"
                class="input-new-tag"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                maxlength="100"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加快捷回复</el-button>
              </span>
            </div>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="addClose('ruleForm')">取消</el-button>
            <el-button type="primary" @click="remSure('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus'
  import eventBus from '../../../assets/js/eventBus'

  export default {
    name: 'remindDialog',
    data: function () {
      return {
        ruleForm: { // 表单数据
          typeWay: "", //提醒方式
          index: '',
          content: "", //提醒内容
          type: "",
          multi: [],
          recont: "",
          temName: "",
          setTime: ""
        },
        rules: { // 表单提交验证规则
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
        diabetesTypeName: '',
        diabetesTypeArr: [],        
        inputVisible: false,
        inputValue: '',
        newAdds: false, // 隐藏new Tag
        radio_: "", //清空内容和模板Id
        templateId_: "",
        dynamicTags: [], //快捷回复标签
        templateType_: 0, //类别（0:私有，1:公有
        ifnewRemind: false, // 是否显示提醒弹窗
        meansIntervenArr: '', // 干预方式
        customerId: '', // 患者id
        patientInfo: {}, // 患者信息
        patientSugarVo: {}, // 患者病情
        status_: 0,
        copy_radio_: '',
        complicationsArr: [],
        contentWordsNums: 100, //提醒内容限制字数
      }
    },
    computed: {
      //字数统计
      words() {
        return this.contentWordsNums - this.ruleForm.recont.length;
      }
    },
    created: function () {
      funBus.getDictionarysByTypeCode(this, 'meansInterven'); // 获取干预方式
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    methods: {
      //关闭新增提醒窗口
      addClose(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.typeWay = "";
        this.ifnewRemind = false;
      },
      //点击快捷回复
      handClick(tag) {
        this.templateId_ = tag.templateId;
        this.ruleForm.recont = tag.replyContent;
      },
      //删除快捷回复标签
      handleClose(tag) {
        var that = this;
        that.openLoading();
        var data = {
          userReplyId: tag.userReplyId
        }
        this.$api.deleteById_(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              //成功回调快捷回复
              funBus.dynamic(that);
            }
          }
          that.closeLoading();
        }, res => {
          that.$message(res.data.errMsg || res.data.data);
          that.closeLoading();
        })
      },
      //新增快捷回复标签
      handleInputConfirm() {
        let inputValue = this.inputValue.replace(/(^\s*)|(\s*$)/g, "");
        if (inputValue) {
          var that = this;
          var seq = this.dynamicTags.length + 1;
          let user = JSON.parse(sessionStorage.getItem('user'));
          var data = {
            replyContent: inputValue,
            templateType: that.templateType_,
            organId: user.organizationId,
            seqNum: seq
          }
          this.$api.replyAdd(data, res => {
            if (res.status == 200) {
              if (res.data.code == 0) {
                //新增成功回调快捷回复
                funBus.dynamic(that);
              }
            }
          }, res => {
            this.$message(res.data.errMsg || res.data.data);
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      showInput() {
        let that = this;
        that.inputVisible = true;
        that.$nextTick(_ => {
          that.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //推送提醒
      remSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //获取机构ID
            let user = JSON.parse(sessionStorage.getItem('user'))
            let that = this;
            that.openLoading();
            let data = {
              "customerId": that.customerId,
              "templateId": that.templateId_,
              "type": that.ruleForm.typeWay,
              "content": that.ruleForm.recont,
              "templateType": that.templateType_, //类别（0:私有，1:公有）
              "organId": user.organizationId,
              "status": that.status_ //干预类型(0.待建议，1.成功 2.失败),
            }
            this.$api.remindAdd(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.$message.success('推送提醒添加成功!')
                  that.ifnewRemind = false;
                  that.$refs[formName].resetFields();
                  Object.assign(that.copy_radio_, that.radio_); // 深拷贝
                  that.radio_ = that.copy_radio_
                  //回调
                  eventBus.$emit('updatePatientDetailRemindTable');
                  that.$message.success(res.data.errMsg || res.data.data);

                }
              }
              that.closeLoading();
            }, res => {
              that.$message.error(res.data.errMsg);
              that.$refs[formName].resetFields();
              that.radio_ = that.copy_radio_;
              that.closeLoading();
            })
          }
        });
      },
      // 编辑快捷回复标签
      edit() {
        this.newAdds = !this.newAdds;
      },
    }
  }
</script>

<style scoped>
  .newRemind{
    height: 620px;
  }
</style>
