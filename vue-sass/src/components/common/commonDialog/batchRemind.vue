<template>
  <div class="commonDialog">
    <!--批量提醒-->
    <div class="batchReminds" v-if="ifBatchRemind">
      <div class="batchRemind">
        <h5>批量提醒</h5>
        <span class="close" @click="resetForms('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm remindDialog" style="margin-top:30px;">
          <el-form-item label="患者姓名" prop="multi">
            <div v-if="isAllPatient" style="padding-left:10px;height:80px;border: solid 1px #e0e0e0; background: #eee;">
              <span>全部患者</span>
            </div>
            <div v-else style="padding-left:10px;height:80px;border: solid 1px #e0e0e0;overflow: auto;">
              <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientClose(index)">{{tag.patientName}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="提醒方式" prop="typeWay" style="height:40px;">
            <el-select v-model="ruleForm.typeWay" placeholder="提醒方式" style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;" v-for="it in meansIntervenArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提醒内容" prop="recont">
            <el-input type="textarea" resize="none" v-model.trim="ruleForm.recont" :rows="3" maxlength="100" placeholder="内容不能超出100字"></el-input>
            <span class="wordsNum">{{words}}/100</span>
          </el-form-item>
          <el-form-item label="" prop="">
            <span>快捷回复:</span>
            <span class="edit floatRight" @click="edit">{{newAdds?'保存':'编辑'}}</span>
          </el-form-item>
          <el-form-item>
            <div class="tagContainer">
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
                v-model.trim="inputValue"
                ref="saveTagInput"
                size="small"
                :maxlength="100"
                placeholder="内容不能超出100字"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加快捷回复</el-button>
              </span>
            </div>
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

<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    data() {
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
        origin: '', // 目标起源 , 即哪个组件点开的随访组件
        meansIntervenArr: [],
        //快捷回复
        dynamicTags: [],
        newAdds: false,
        inputVisible: false,
        radio_: '',
        templateId_: '',
        inputValue: '',
        templateType_: 0,
        status_: 0,
        origin: '', // 目标起源 , 即哪个组件点开的干预组件
        isAllPatient: false, // 是否选中全部患者
        allPatientId: [], // 全部患者id数组
        //searchScope: {}, // 搜索条件(全部患者)
        contentWordsNums: 100, //提醒内容限制字数
      }
    },
    computed: {
      //字数统计
      words() {
        return this.contentWordsNums - this.ruleForm.recont.length;
      }
    },
    methods: {
      //删除患者批量
      patientClose(index) {
        // 批量干预患者框清除选中的患者
        this.ruleForm.multi.splice(index, 1);
      },
      //批量取消
      resetForms(formName) {
        this.$refs[formName].resetFields();
        this.ifBatchRemind = false;
        this.isAllPatient = false;
        this.origin.isAllPatient = false; // 更改‘是否全选患者’状态
        this.origin.$refs.multipleTable.clearSelection();
      },
      //确定批量提醒
      batchSure(formName) {
        let that = this;

        if (that.isAllPatient) { //全部患者
          that.rules.multi[0].required = false; // 患者姓名设为非必填
        } else {
          that.rules.multi[0].required = true; // 患者姓名设为必填
        }

        that.$refs[formName].validate((valid) => {
          //如果没有格式错误
          if (valid) {
            that.openLoading();
            let user = JSON.parse(sessionStorage.getItem('user'));

            if (!that.isAllPatient) { //批量推送(非全选患者时)

              let customerIds = []; // 患者id数组
              that.ruleForm.multi.forEach((e) => {
                customerIds.push(e.customerId)
              });

              let data = {
                customerIds: customerIds,
                templateId: that.templateId_,
                type: that.ruleForm.typeWay,
                content: that.ruleForm.recont,
                templateType: that.templateType_, //类别（0:私有，1:公有）
                organId: user.organizationId,
                status: that.status_ //干预类型(0.待建议，1.成功 2.失败),
              }
              that.$api.batchAdd(data, res => {
                if (res.data.code == 0) {
                  that.ifBatchRemind = false;
                  that.origin.$refs.multipleTable.clearSelection();
                  that.$refs[formName].resetFields();
                  that.$message.success(res.data.errMsg || res.data.data);
                } else {
                  that.$message.success(res.data.errMsg || res.data.data);
                }
                that.closeLoading();
              }, (error) => {
                that.$message.error(error.data.errMsg);
                that.closeLoading();
              })

            } else { //全部患者

              let data = {
                customerIds: that.allPatientId,
                templateId: that.templateId_, //模板ID
                type: that.ruleForm.typeWay, //推送类型(1.微信 2.电话，3.短信)
                content: that.ruleForm.recont, //推送内容
                organId: user.organizationId, //机构ID
                remark: "",
                templateType: that.templateType_, //类别（0:私有，1:公有）
                status: that.status_ //干预类型(0.待建议，1.成功 2.失败),
              }
              that.$api.remindAll(data, res => {
                if (res.data.code == 0) {
                  that.ifBatchRemind = false;
                  that.isAllPatient = false;
                  that.origin.isAllPatient = false; // 更改‘是否全选患者’状态
                  that.origin.$refs.multipleTable.clearSelection();
                  that.$refs[formName].resetFields();
                  that.$message.success(res.data.errMsg || res.data.data);
                } else {
                  that.$message.success(res.data.errMsg || res.data.data);
                }
                that.closeLoading();
              }, (error) => {
                that.$message.error(error.data.errMsg);
                that.closeLoading();
              })

            }

          }
        });
      },
      edit() {
        this.newAdds = !this.newAdds;
      },
      //点击快捷回复
      handClick(tag) {
        this.templateId_ = tag.templateId;
        this.ruleForm.recont = tag.replyContent;
      },
      //删除快捷回复标签
      handleClose(tag) {
        let that = this;
        that.openLoading();
        let data = {
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
          this.$message(res.data.errMsg || res.data.data);
          that.closeLoading();
        })
      },
      //新增快捷回复
      handleInputConfirm() {
        let that = this;
        let inputValue = that.inputValue.replace(/(^\s*)|(\s*$)/g, "");
        if (inputValue) {
          let seq = that.dynamicTags.length + 1;
          let user = JSON.parse(sessionStorage.getItem('user'));
          let data = {
            replyContent: inputValue,
            templateType: that.templateType_, //干预类型(0.待建议，1.成功 2.失败),
            organId: user.organizationId,
            seqNum: seq
          }

          that.$api.replyAdd(data, res => {
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
        that.inputVisible = false;
        that.inputValue = '';
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    }
  }
</script>