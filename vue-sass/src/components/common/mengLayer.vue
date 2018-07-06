<template>
  <div class="healthInters">
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
        <li>体 重：<span>{{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}</span></li>
        <li>类型：<span>{{patientSugarVo.diabetesType}}</span></li>
        <li>并发症：<span>{{patientSugarVo.complications }}</span></li>
      </ul>
      <!---->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"
               style="margin-top: 30px;">
        <el-form-item label="干预类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="干预类型" @change="Radio(ruleForm.type)"
                     style="vertical-align: bottom;height:40px;">
            <el-option style="margin: 0 7px 10px;"
                       v-for="it in interTypes"
                       :key="it.itemKey"
                       :label="it.itemValue"
                       :value="it.itemKey">
              {{it.itemValue}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="干预方式" prop="typeWay">
          <el-select v-model="ruleForm.typeWay" placeholder="干预方式" style="vertical-align: bottom;height:40px;">
            <el-option style="margin: 0 7px 10px;"
                       v-for="it in m_typeWays"
                       :key="it.itemKey"
                       :label="it.itemValue"
                       :value="it.itemKey">
              {{it.itemValue}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案名称" prop="index" style="height:40px;">
          <el-select v-model="ruleForm.index" filterable :disabled="checkedss" placeholder="请选择"
                     @change="uiui(ruleForm.index)" style="height:40px;">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="干预内容" prop="content">
          <el-input type="textarea" resize="none" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item style="display: inline-block;">
          <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
        </el-form-item>
        <el-form-item label="" prop="temName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
          <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.temName"/>
        </el-form-item>
        <el-form-item label="发送时间" prop="">
          <el-radio-group v-model="radio4" @change="sends(radio4)">
            <el-radio :label="1">立即发送</el-radio>
            <el-radio :label="2" style="margin-left: 20px;">定时发送</el-radio>
          </el-radio-group>
          <!--<input id="d4502" v-if="radio4 == 2" @blur="dateBlurs" class="Wdate laydate-icon setTimess" type="datetime" readonly="readonly" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm', autoPickDate:false, minDate:'%y-%M-%d #{%H}:#{%m+1}'})"/>-->
          <!--代替判断-->
          <el-form-item label="" prop="setTime" v-if="radio4 == 2" style="display: inline-block;">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.setTime"
                            :picker-options="pickerOptions0"></el-date-picker>
          </el-form-item>
          <!--代替判断-->
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import funBus from '../../assets/js/funBus'
  
  export default {
    data() {
      return {
        templateType_: 0,
        options: '',
        patientSugarVo: "",
        radio4: '',
        checkedss: false,
        ruleForm: {
          type: '',
          typeWay: '',
          temName: '',
          index: '',
          content: '',
          setTime: ''
        },
        rules: {
          type: [
            {required: true, message: '请选择干预类型', trigger: 'change'}
          ],
          typeWay: [
            {required: true, message: '请选择干预方式', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入干预内容', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          index: [
            {required: true, message: '请选择方案名称', trigger: 'change'}
          ],
          temName: [
            {required: true, message: '请填写模板名称', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          setTime: [
            {required: true, message: '请选择发送时间', trigger: 'blur'}
          ]
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      }
    },
    mounted: function () {
    },
    props: [
      'patientInfo',
      'interTypes',
      'm_typeWays',
      'customerId_'
    ],
    methods: {

      //关闭健康干预窗口
      beClose(formName) {
        this.$refs[formName].resetFields();
        this.$emit('showState', false)
      },
      uiui(index) {
        this.tempId = this.options[index].templateId;
        var that = this;
        that.$api.queryById({userInterventionId:that.tempId},res=> {
          if (res.status == 200) {
            if (res.data.data) {
              that.ruleForm.content = res.data.data.content;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //新建干预取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('showState', false)
      },
      sends(radio4) {
      },
      Radio(n) { // 干预类型改变事件
        this.mTypes = n;
        funBus.getInterven(this,n);
        //清空选择的值
        this.ruleForm.index = "";
        this.ruleForm.content = "";
      },
      //新建干预确定
      submitForm(formName) {
        var that = this;
        var name;
        var index;
        var temId;
        var realSendTime;

        //保存为模板否
        if (that.checkedss) {
          that.rules.index[0].required = false;
          name = that.ruleForm.temName;
          temId = "";
        } else {
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
          //如果没有格式错误
          if (valid) {
            //立即发送还是定时发送
            if (that.radio4 == 1) {
              that.ruleForm.setTime = "";
              realSendTime = new Date();
            } else if (that.radio4 == 2) {
              realSendTime = '';
            }
            /*获取session信息*/
            var useInfo = sessionStorage.getItem('user');
            //获取机构ID
            var organizationId = JSON.parse(useInfo).organizationId
            var content = that.ruleForm.content;
//                  var type = this.ruleForm.type;
            var seqNum = that.options.length + 1;
            var interType = that.mTypes;
            //新增干预
            var data = {
              "customerId": that.customerId_,
              "templateId": temId,
              "type": that.ruleForm.typeWay,//短信
              "name": name,
              "content": content,
              "planSendTime": that.ruleForm.setTime,
              "realSendTime": realSendTime,
              "interventionType": interType,
              "templateType": that.templateType_,//干预类型(0.待建议，1.成功 2.失败),
              "organId": organizationId,
              "seqNum": seqNum
            }
            //新增干预
            that.$api.intervenAdd(data, res=> {
              if (res.status == 200) {
                if (res.data.data) {
                  that.$emit('showState', false);
                  that.$refs[formName].resetFields();
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        });
      }
    }
  }

</script>

<style>
  li {
    list-style: none;
  }

  .close {
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }

  .healthInter ul {
    margin-top: 20px;
    width: 100%;
    height: 20px;
    display: block;
  }

  .healthInter ul li {
    width: 25%;
    display: inline-block;
    font-size: 12px;
    color: #111111;
  }

  .healthInter ul li span {
    color: #666666;
  }

  .healthInter table {
    padding: 20px 0;
    margin-top: 20px;
    font-size: 12px;
  }

  .healthInter table tr {
    display: block;
    margin-bottom: 20px;
  }

  .healthInter table tr td:nth-child(1) {
    width: 48px;
    padding-right: 11px;
    color: #111111;
  }

  .healthInter h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }

  .healthInter ul:nth-of-type(1) {
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
  }

  .healthInters {
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .healthInter {
    padding: 17px;
    position: fixed;
    /* top: 50%;
        left:50%; */
    /* transform:translate(-50%,-55%); */
    width: 840px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .healthInter h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }
</style>
