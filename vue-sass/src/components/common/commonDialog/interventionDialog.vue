<template>
  <div class="commonDialog">

    <!--新增干预-->
    <div class="healthInters" v-if="ifHealthInter">
      <div class="healthInter">
        <h5>新增干预</h5>
        <span class="close" @click="beClose('ruleForm')">X</span>
        <ul>
          <li>患者姓名：<span>{{patientInfo.patientName}}</span></li>
          <li>出生年月：<span>{{patientInfo.birthday}}</span></li>
          <li>性别：<span>{{patientInfo.sex}}</span></li>
          <li>手机号：<span>{{patientInfo.phone}}</span></li>
        </ul>
        <ul>
          <li>身 高：<span>{{patientInfo.height ? patientInfo.height + 'cm' : ''}}</span></li>
          <li>体 重：<span>{{patientInfo.weight ? patientInfo.weight + 'kg': ''}}</span></li>
          <li>类型：<span>{{diabetesTypeName}}</span></li>
        </ul>
        <ul>
          <li style="width: 90%;">并发症：<span>{{patientSugarVo.complications }}</span></li>
        </ul>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="margin-top: 30px;">
          <el-form-item label="干预类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="干预类型" @change="interTypeChange" style="vertical-align: bottom; height:40px;">
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
            <el-select v-model="ruleForm.index" filterable :disabled="checkedss" placeholder="请选择" @change="uiui(ruleForm.index)">
              <el-option v-for="(item,index) in interTempArr" :key="item.name" :label="item.name" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="干预内容" prop="content">
            <el-input type="textarea" resize="none" v-if="ruleForm.typeWay==1" v-model.trim="ruleForm.content" maxlength="400" :rows="4"></el-input>
            <el-input type="textarea" resize="none" v-else-if="ruleForm.typeWay==3" v-model.trim="ruleForm.content" maxlength="400" :rows="4"></el-input>
            <el-input type="textarea" resize="none" v-else v-model.trim="ruleForm.content" maxlength="400" :rows="4"></el-input>
            <span class="wordsNum">{{words}}/400</span>
          </el-form-item>
          <el-form-item style="display: inline-block;">
            <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
          </el-form-item>
          <el-form-item label="" prop="temName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
            <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.temName"></el-input>
          </el-form-item>
          <el-form-item label="发送时间" prop="">
            <el-radio-group v-model="radio4" @change="sends(radio4)">
              <el-radio :label="1">立即发送</el-radio>
              <el-radio :label="2" style="margin-left: 20px !important">定时发送</el-radio>
            </el-radio-group>
            <!--代替判断-->
            <el-form-item label="" prop="setTime" v-if="radio4 == 2" style="display: inline-block;">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.setTime" :picker-options="pickerOptions0"></el-date-picker>
            </el-form-item>
            <!--代替判断-->
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="beClose('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
    name: 'interventionDialog',
    data: function () {
      return {
        pickerOptions0: { // 日期控件
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        checkedss: false, //默认保存模板为不勾选
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
        radio4: 1, //默认立即发送
        interTempArr: [], //清空方案名称
        ifHealthInter: false, // 是否显示干预弹窗
        interTypeArr: [], //干预类型列表
        meansIntervenArr: '', // 干预方式
        cacheInterTemplates: [], // 缓存干预模版列表        
        patientInfo: {}, // 患者信息
        patientSugarVo: {}, // 患者病情
        customerId: '', // 患者id
        templateType_: 0, //类别（0:私有，1:公有
        complicationsArr: [],
        contentWordsNums: 400, //干预内容限制字数
      }
    },
    created: function () {
      funBus.getDictionarysByTypeCode(this, 'interType');; // 获取干预类型
      funBus.getDictionarysByTypeCode(this, 'meansInterven');; // 获取干预方式
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
      funBus.getIntervenTemplateArr(this, {}); //获取干预方案(干预模板)
    },
    computed: {
      //字数统计
      words() {
        return this.contentWordsNums - this.ruleForm.content.length;
      }
    },
    methods: {
      beClose(formName) { //关闭健康干预窗口
        this.$refs[formName].resetFields();
        this.checkedss = false;
        this.rules.index[0].required = true; // 方案名称验证是否必填
        this.ifHealthInter = false;
      },
      submitForm(formName) { //新建干预确定
        let that = this;

        let name,index,temId,realSendTime;

        //保存为模板否
        if (that.checkedss) {
          that.rules.index[0].required = false; // 方案名称验证是否必填
          name = that.ruleForm.temName;
          temId = "";
        } else {
          that.rules.index[0].required = true; // 方案名称验证是否必填
          index = that.ruleForm.index;
          if (that.interTempArr) {
            if (index !== '') {
              name = that.interTempArr[index].name;
            }
          }
          temId = that.tempId;
        }

        this.$refs[formName].validate((valid) => {
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
            //获取机构ID
            let user = JSON.parse(sessionStorage.getItem('user'));
            let content = that.ruleForm.content;
            let seqNum = that.interTempArr.length + 1;
            //新增干预
            let data = {
              "customerId": that.customerId,
              "templateId": temId,
              "type": that.ruleForm.typeWay, //短信
              "name": name,
              "content": content,
              "planSendTime": that.ruleForm.setTime,
              "realSendTime": realSendTime,
              "interventionType": that.ruleForm.type,
              "templateType": that.templateType_, //干预类型(0.待建议，1.成功 2.失败),
              "organId": user.organizationId,
              "seqNum": seqNum
            }
            //新增干预
            that.$api.intervenAdd(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.$message.success('干预新增成功!')
                  that.ifHealthInter = false;
                  that.$refs[formName].resetFields();
                  //回调刷新表格
                  eventBus.$emit('updatePatientDetailInterventionTable');
                  that.$message.success(res.data.errMsg || res.data.data);

                }
              }
              that.closeLoading();

            }, res => {
              that.$message.error(res.data.errMsg || res.data.data);
              that.closeLoading();
            })
          }
        });
      },
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
      sends(radio4) { //发送时间选择
        // console.log(radio4)
      },
      uiui(index) { //干预方案选择事件
        this.tempId = this.interTempArr[index].templateId;
        this.ruleForm.content = this.interTempArr[index].content;
      },
    }
  }
</script>