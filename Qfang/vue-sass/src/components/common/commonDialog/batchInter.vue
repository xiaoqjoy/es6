<template>
  <div class="commonDialog">
    <!--批量干预-->
    <div class="batchInters" v-if="ifBaInter">
      <div class="batchInter">
        <h5>批量干预</h5>
        <span class="close" @click="resetForms('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top: 30px;">
          <el-form-item label="患者姓名" prop="multi">
            <div v-if="isAllPatient" style="padding-left:10px;height:80px;border: solid 1px #e0e0e0; background: #eee;">
              <span>全部患者</span>
            </div>
            <div v-else style="height:80px;padding-left:10px;border: solid 1px #e0e0e0;overflow: auto;">
              <el-tag v-for="(tag,index) in ruleForm.multi" :key="index" closable :disable-transitions="false" @close="patientClose(index)">{{tag.patientName}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="干预类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="干预类型" @change="interTypeChange" style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;" v-for="it in interTypeArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="干预方式" prop="typeWay">
            <el-select v-model="ruleForm.typeWay" placeholder="干预方式" style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;" v-for="it in meansIntervenArr" :key="it.itemKey" :label="it.itemValue" :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方案名称" prop="index">
            <el-select v-model="ruleForm.index" filterable :disabled="checkedss" placeholder="请选择" @change="uiui(ruleForm.index)" style="height:40px;">
              <el-option v-for="(item,index) in interTempArr" :key="item.name" :label="item.name" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="干预内容" prop="content">
            <el-input type="textarea" resize="none" v-model.trim="ruleForm.content" maxlength="400" :rows="4"></el-input>
            <span class="wordsNum">{{words}}/400</span>
          </el-form-item>
          <el-form-item style="display: inline-block;">
            <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
          </el-form-item>
          <el-form-item prop="temName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
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

<script>
  import funBus from '../../../assets/js/funBus'
  export default {
    data() {
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
        interTypeArr: [], //干预类型列表
        meansIntervenArr: [], //干预方式列表
        interTempArr: [], // 干预模版数组
        cacheInterTemplates: [], // 缓存干预模版列表
        radio4: 1,
        tempId: '',
        checkedss: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        templateType_: 0, //类别（0:私有，1:公有
        origin: '', // 目标起源 , 即哪个组件点开的干预组件
        isAllPatient: false, // 是否选中全部患者
        allPatientId: [], // 全部患者id数组
        //searchScope: {}, // 搜索条件(全部患者)
        contentWordsNums: 400, //干预内容限制字数
      }
    },
    computed: {
      //字数统计
      words() {
        return this.contentWordsNums - this.ruleForm.content.length;
      }
    },
    created() {
      funBus.getIntervenTemplateArr(this, {}); //获取干预方案(干预模板)
    },
    methods: {
      //删除患者批量
      patientClose(index) {
        // 批量干预患者框清除选中的患者
        this.ruleForm.multi.splice(index, 1);
      },
      //干预类型change事件，获取对应的干预模板
      interTypeChange(type) { // 干预类型改变事件
        let obj = [];
        let temp = this.cacheInterTemplates;
        for (let i = 0, len = temp.length; i < len; i++) {
          if (temp[i].type == type) {
            obj.push(temp[i]);
          }
        }
        this.interTempArr = obj; //方案名称数组
        this.ruleForm.index = ""; //方案名称
        this.ruleForm.content = ""; //干预内容
      },
      uiui(index) { // 干预方案切换事件
        this.tempId = this.interTempArr[index].templateId;
        this.ruleForm.content = this.interTempArr[index].content;
      },
      //批量取消
      resetForms(formName) {
        this.$refs[formName].resetFields();
        this.ifBaInter = false;
        this.isAllPatient = false;
        this.origin.isAllPatient = false; // 更改‘是否全选患者’状态
        this.origin.$refs.multipleTable.clearSelection();
      },
      //批量确定
      submitForms(formName) {
        let that = this;
        let index;
        let temId;
        let realSendTime;
        let name = "";
        //是否保存为模板
        if (that.checkedss) {
          that.rules.index[0].required = false;
          name = that.ruleForm.temName;
          temId = "";
        } else {
          that.rules.index[0].required = true;
          index = that.ruleForm.index;
          if (that.interTempArr) {
            if (index !== '') {
              name = that.interTempArr[index].name;
            }
          }
          temId = that.tempId;
        }

        if (that.isAllPatient) { //全部患者
          that.rules.multi[0].required = false; // 患者姓名设为非必填
        } else {
          that.rules.multi[0].required = true; // 患者姓名设为必填
        }

        that.$refs[formName].validate((valid) => {

          //如果没有格式错误
          if (valid) {

            that.openLoading();

            //立即发送还是定时发送
            if (that.radio4 == 1) {
              that.ruleForm.setTime = "";
              realSendTime = new Date();
            } else if (that.radio4 == 2) {
              realSendTime = '';
            }

            let seqNum = that.interTempArr.length + 1;
            let user = JSON.parse(sessionStorage.getItem('user'));

            if (!that.isAllPatient) { //批量干预(非全选患者时)
              let customerIds = []; // 患者id数组
              that.ruleForm.multi.forEach((e) => {
                customerIds.push(e.customerId)
              });

              let data = {
                customerIds: customerIds,
                templateId: temId,
                type: that.ruleForm.typeWay,
                name: name,
                content: that.ruleForm.content,
                planSendTime: that.ruleForm.setTime,
                realSendTime: realSendTime,
                interventionType: that.ruleForm.type,
                templateType: that.templateType_, //干预类型(0.待建议，1.成功 2.失败),
                organId: user.organizationId,
                seqNum: seqNum
              };

              //that.BatchInt = true
              that.$api.intervenBatchAdd(data, res => {
                //that.BatchInt = false
                if (res.data.data) {
                  that.ifBaInter = false;
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

            } else { // 全部患者
              let data = {
                customerIds: that.allPatientId,
                templateId: temId, //干预模板ID
                type: that.ruleForm.typeWay, //干预方式(1.微信 2.电话，3.短信)
                name: name, //方案名称
                content: that.ruleForm.content, //干预内容
                planSendTime: that.ruleForm.setTime, //计划发送时间
                interventionType: that.ruleForm.type, //干预类型（1.健康管理 2.生活指导 3.运动建议 4.饮食指导）
                templateType: that.templateType_, //类别（0:私有，1:公有）
                organId: user.organizationId, //机构ID
                seqNum: seqNum, //顺序
                remark: "",
              };

              that.$api.interventionAll(data, res => {
                if (res.data.code == 0) {
                  that.ifBaInter = false;
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
      }
    }
  }
</script>

<style>
  .batchInter{
    height: 630px;
  }
</style>
