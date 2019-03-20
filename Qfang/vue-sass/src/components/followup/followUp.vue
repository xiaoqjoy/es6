<template>
  <div>
    <div class="positionContent">
      <h3>健康随访</h3>
      <div class="followUpss contentBorder">
        <!--搜索栏-->
        <div class="tops">
          <el-input size="small" v-model="input_" placeholder="输入姓名/手机号查询" class="searc_med" style="margin:0 10px 10px 0;"></el-input>
          <div class="intervention">
            <span>创建时间：</span>
            <el-date-picker size="small" class="datetime_med" v-model="time_start" type="datetime" placeholder="选择起始时间" :picker-options="pickerOptions0">
            </el-date-picker>
            <span>至</span>
            <el-date-picker size="small" class="datetime_med" v-model="time_end" type="datetime" placeholder="选择截止时间" :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
          <el-select size="small" v-model="ruleForm.status_" placeholder="执行状态" style="width: 120px;">
            <el-option v-for="(item,index) in status_z" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="ruleForm.types_" placeholder="选择类型" @change="strTypes_" style="width: 120px;">
            <el-option v-for="(item,index) in meansIntervenArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="ruleForm.Execut_" placeholder="选择执行人" style="width: 120px;">
            <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
          <!--创建时间：
          <el-date-picker
            size="small"
            class="datetime_med"
            v-model="time_start"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions0">
          </el-date-picker>
          至&nbsp;
          <el-date-picker
            size="small"
            class="datetime_med"
            v-model="time_end"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions1">
          </el-date-picker>-->
          <div class="search" style="" @click="searches_">搜索</div>
          <div class="clear" @click="clear">清空</div>
          <div class="addPlane" @click="newFollow">新增计划</div>
        </div>

        <!--表格-->
        <div class="main">
          <div>
            <div class="nodata" v-if="arr.length==0">暂无数据</div>
            <div class="items" v-for="(it,index) in arr" :key="index">
              <div class="left">
                <ol>
                  <li>
                    <div class="bgImg" :class="[it.sex==2 ? 'womanHeadImg' : 'manHeadImg']"></div>
                  </li>
                  <li>
                    <span>{{it.patientName ? it.patientName : ''}}</span>
                    <span>{{it.sex==0 ? '保密' : it.sex==1 ? '男' : it.sex==2 ? '女' : ''}}</span>
                    <span>{{it.birthday ? jsGetAge(formatDate(it.birthday)) : ''}}</span>
                  </li>
                  <li>{{it.diabetesType==null ? '' : it.diabetesType}}</li>
                </ol>
              </div>
              <div class="right">
                <ul class="ul_1">
                  <li :class="it.status === 0 ? '' : it.status === 1 ? 'executeds_2' : it.status === 2 ? 'unexecuteds_2':''">
                    <b class="bgImg" style="display: inline-block;width: 16px;height: 16px;vertical-align: middle;margin-right: 10px;" :class="it.status === 0 ? 'cancels_' : it.status === 1 ? 'executeds_' : it.status === 2 ? 'unexecuteds_':''"></b><em>{{it.status
                    === 0 ? '已取消' : it.status === 1 ? '已执行': it.status === 2 ? '未执行' : ''}}</em></li>
                  <li>
                    <span @click="showFollowUpDetail(it)" v-if="it.status == 0 || it.status == 1">查看</span>
                    <span @click="plansMethod(it)" v-if="it.status == 2">执行</span>
                    <span @click="change(it)" v-if="it.status == 2 && it.flagEdit == true">修改</span>
                    <span @click="delc(it.followUpId)" v-if="it.status == 2">取消</span>
                  </li>
                  <li>
                    <p style="display: block; width: 100%; " v-if="it.status == 0">取消原因：{{it.cancelReason}}</p>
                  </li>
                </ul>
                <ul class="ul_2">
                  <li>创建时间：{{it.createTime}}</li>
                  <li>创建人员：{{it.createUserName}}</li>
                  <li>计划时间：{{it.planTime}}</li>
                  <li>计划人员：{{it.planUserName}}</li>
                </ul>
                <p class="p_1">
                  <span class="tit">随访内容：</span>
                  <span class="con">{{it.content ? it.content : ""}}</span>
                </p>
              </div>
            </div>
          </div>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15,20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--取消随访-->
    <div class="CanFollows" v-if="ifCanFollows">
      <div class="CanFollow">
        <h5>取消随访</h5>
        <span class="close" @click="closes_c('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="取消原因" prop="cause">
            <el-input type='textarea' resize="none" maxlength="50" v-model.trim="ruleForm.cause" :rows="4" placeholder="字数不能超出50"></el-input>
            <!--字数提示-->
            <span class="wordsNum">{{causeWords}}/50</span>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="closes_c('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_c('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--修改执行-->
    <div class="followPlans" v-if="ifMoExe">
      <div class="followPlan">
        <h5>修改计划</h5>
        <span class="close" @click="closes_change('ruleForm')">X</span>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名">
            <el-input v-model="patientInfo.patientName" disabled></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="patientInfo.birthday" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="patientInfo.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码">
            <el-input v-model="fileNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高">
            <el-input v-model="patientInfo.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重">
            <el-input v-model="patientInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数">
            <el-input v-model="patientInfo.bmi" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="diabetesTypeName" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄">
            <el-input v-model="patientSugarVo.ensureDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症"  style="width: 730px;display: block;">
            <el-input v-model="patientSugarVo.complications " disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="values">
            <el-select v-model="ruleForm.values" placeholder="请选择">
              <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="planeTime">
            <el-date-picker v-model="ruleForm.planeTime" type="datetime" style="width: 140px;" placeholder="计划时间" :picker-options="pickerOptions3">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访内容" prop="content" class="width100">
            <el-input type="textarea" resize="none" :rows="4" maxlength="250" placeholder="请输入内容" v-model.trim="ruleForm.content">
            </el-input>
            <!--字数提示-->
            <span class="wordsNum">{{contentWords}}/250</span>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="closes_change('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_change('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
          <span>微信头像</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../assets/js/funBus'
  import eventBus from '../../assets/js/eventBus'

  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.time_end != "") {
              return time.getTime() > Date.now() || time.getTime() > this.time_end;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < this.time_start || time.getTime() > Date.now();
          }
        },
        chatImg: true,
        totalNum: 0,
        pickerOptions3: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        foldet: "",
        ifNull: "",
        fileNumber: "",
        patientInfo: "",
        followUpId_: "",
        customerId_: "",
        Executor: "",
        time_end: "",
        time_start: "",
        status_z: [{
            itemKey: 0,
            itemValue: "已取消"
          },
          {
            itemKey: 1,
            itemValue: "已执行"
          },
          {
            itemKey: 2,
            itemValue: "未执行"
          }
        ],
        meansIntervenArr: [],
        strTypes: "",
        input_: "",
        patientBaseVo: "",
        patientSugarVo: {},
        followPep: "",
        ifMoExe: false,
        diabetesTypeName: '',
        ifCanFollows: false,
        arr: [],
        currentPage4: 1,
        pagesize: 15,
        search: false,
        ruleForm: {
          Execut_: "",
          content: "",
          status_: "",
          types_: "",
          types: "",
          planeTime: '',
          name: '',
          birth: '',
          sex: '',
          tel: '',
          IDNum: '',
          FileNum: '',
          height: '',
          OldSugar: '',
          Complicat: '',
          BMI: '',
          weight: '',
          values: '', // 随访计划人员
          Templates: '',
          cause: '',
        },
        rules: {
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'change'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
          values: [{
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
          Templates: [{
            required: true,
            message: '请选择模板',
            trigger: 'change'
          }],
          cause: [{
              required: true,
              message: '请输入内容',
              trigger: 'blur'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
        },
        complicationsArr: [], //并发症列表
        diabetesTypeArr: [],
        causeWordsNums: 50, //随访计划取消原因总字数
        contentWordsNums: 250, //随访内容总字数
      }
    },
    created(){
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'meansInterven'); //获取干预方式 微信、电话、qq
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    mounted() {
      let that = this;

      //获取机构ID
      let user = JSON.parse(sessionStorage.getItem('user'));

      funBus.geFollowplaners(this, {
        organizationId: user.organizationId
      }); //随访人员


      //初始化页面
      that.reload();

      //监听updateFollowUpTable，更新随访表数据
      eventBus.$on('updateFollowUpTable', () => {
        that.reload();
      });
    },
    computed: {
      //字数统计
      causeWords() {
        return this.causeWordsNums - this.ruleForm.cause.length;
      },
      contentWords() {
        return this.contentWordsNums - this.ruleForm.content.length;
      }
    },
    methods: {
      //获取随访数据
      reload() {
        let that = this;

        let args = {
          currentPage: that.currentPage4,
          pageSize: that.pagesize,
          keyName: that.input_,
          status: that.ruleForm.status_,
          type: that.ruleForm.types_,
          realUserId: that.ruleForm.Execut_,
          createStartTime: !!that.time_start ? that.formatDate(that.time_start) : '',
          createEndTime: !!that.time_end ? that.formatDate(that.time_end) : ''
        };
        that.$api.followPaged(args, res => {
          if (res.status == 200) {
            if (res.data.data) {
              let arr = res.data.data.items;

              //去除秒钟
              for (let i = 0, len = arr.length; i < len; i++) {
                arr[i].createTime = that.formatDate(arr[i].createTime).split(':').slice(0,2,1).join(':');
                arr[i].planTime = that.formatDate(arr[i].planTime).split(':').slice(0,2,1).join(':');
              }

              that.arr = arr;
              that.totalNum = res.data.data.totalNum;

            }
          }
        }, res => {
          that.$message(res.data.errMsg || res.data.data);
        })
      },
      //搜索
      searches_() {
        this.currentPage4 = 1;
        this.reload();
      },
      // 随访方式(搜索栏类型选择)
      strTypes_(n) {
        this.strTypes = n;
      },
      //查看随访明细
      showFollowUpDetail(row) {
        let target = this.$parent.$refs.followUpDetailDialog;
        target.ifFolDetail = true;
        funBus.getPatients(target, row.customerId); // 获取患者信息
        funBus.queryFollowInfoById(target, row.followUpId); // 获取随访信息
      },
      //执行随访弹窗
      plansMethod(row) {
        let target = this.$parent.$refs.followUpExecDialog;
        target.plans = true;
        target.geFollowplaners(); //获取随访计划人员
        target.followUpId = row.followUpId;
        funBus.getPatients(target, row.customerId); // 获取患者信息
        funBus.queryFollowInfoById(target, row.followUpId); // 获取随访信息
      },
      //修改随访
      change(it) {
        this.ifMoExe = true;
        let that = this;
        //获取followUpId
        that.followUpId_ = it.followUpId;
        that.customerId_ = it.customerId;

        //根据id随访信息
        this.$api.queryFollowInfoById({
          followUpId: it.followUpId
        }, res => {
          if (res.data.data) {
            that.ruleForm.values = res.data.data.planUserId;
          }
        }, res => {
          that.$message(res.data.errMsg || res.data.data);
        })
        that.ruleForm.planeTime = new Date(it.planTime);
        that.ruleForm.content = it.content;
        //获取患者信息
        funBus.getPatients(this, it.customerId);

        let user = JSON.parse(sessionStorage.getItem('user'));

        //随访人员
        funBus.geFollowplaners(this, {
          organizationId: user.organizationId
        });

      },
      //显示'取消随访'弹窗
      delc(followUpId) {
        this.ifCanFollows = true;
        //获取followId
        this.followUpId_ = followUpId;
      },
      //关闭'取消随访'弹窗
      closes_c(formName) {
        this.ifCanFollows = false;
        this.$refs[formName].resetFields();
      },
      //关闭修改随访弹窗
      closes_change(formName) {
        this.$refs[formName].resetFields();
        this.ifMoExe = false;
        this.ruleForm.planeTime = "";
        this.ruleForm.values = "";
        this.ruleForm.content = "";
      },
      //确定提交'取消随访'
      submitForm_c(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this;
            let data = {
              followUpId: that.followUpId_,
              cancelReason: that.ruleForm.cause
            }
            //取消随访
            this.$api.followCancel(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.ifCanFollows = false;
                  that.$refs[formName].resetFields();
                  that.reload();
                }
              }
            }, res => {
              that.$message(res.data.errMsg || res.data.data);
            })

          } else {
            return false;
          }
        });
      },
      //修改随访执行
      submitForm_change(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this;
          if (valid) {
            that.openLoading();
            let data = {
              followUpId: that.followUpId_,
              content: that.ruleForm.content,
              planTime: that.ruleForm.planeTime,
              planUserId: that.ruleForm.values,
              customerId: that.customerId_
            }
            //修改随访执行
            this.$api.followUpdate(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.ifMoExe = false;
                  that.$refs[formName].resetFields();
                  that.reload();
                  that.$message.success(res.data.errMsg || res.data.data);
                }
              }
              that.closeLoading();
            }, res => {
              that.$message(res.data.errMsg || res.data.data);
              that.closeLoading();
            })
          } else {
            return false;
          }
        });
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.reload();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.currentPage4 = val;
        this.reload();
      },
      // 新增随访
      newFollow() {
        let target = this.$parent.$refs.followUpDialog;
        target.patientInfo = {};
        target.patientSugarVo = {};
        target.ifFolPlan = true;
        target.isDisabled = false; // 取消新增随访弹窗内患者姓名的禁用状态
        target.getFollowTemplate({});
        target.geFollowplaners(); //获取随访计划人员
        target.diabetesTypeArr = this.diabetesTypeArr; //糖尿病类型列表
      },
      //清空
      clear() {
        let that = this;
        that.ruleForm.status_ = "",
        that.ruleForm.types_ = "",
        that.ruleForm.Execut_ = "",
        that.time_start = "",
        that.time_end = "",
        that.input_ = "";
        that.currentPage4 = 1;
        that.reload();
      }
    }
  }
</script>

<style scoped>
  .el-select{
    margin: 0 2px;
  }
  .datetime_med {
    width: 166px;
  }
  .cancels_ {
    background-position: -48px -48px;
  }
  .executeds_ {
    background-position: -48px -64px;
  }
  .unexecuteds_ {
    background-position: -48px -80px;
  }
  .executeds_2 {
    color: #13BB8E;
  }
  .unexecuteds_2 {
    color: #E95959;
  }
  .CanFollow {
    width: 698px;
  }
  .items {
    width: 100%;
    height: 160px;
    padding: 20px 0;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
  }
  .items:hover {
    background: #ecf5ff;
  }

  .left {
    display: inline-block;
    /*width: 8%;
    min-width: 120px;*/
    width: 130px;
    height: 100%;
    float: left;
    text-align: center;
  }
  .left li {
    padding-bottom: 6px;
    font-size: 14px;
  }
  .left li img {
    width: 60px;
    height: 60px;
  }
  .right {
    /* width: 92%; */
    /*min-width: 800px;*/
    width: calc( 100% - 140px);
    height: 100%;
    float: left;
    display: inline-block;
  }
  .right p {
    display: block;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
  }
  .right ul {
    width: 100%;
    min-height: 30px;
    display: block;
  }
  .right .ul_1 li {
    margin-right: 46px;
  }
  .right .ul_2 {
    display: block;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #666666;
  }
  .right .ul_2 li {
    margin-right: 30px;
  }
  .right .ul_2 li:last-child {
    margin-right: 0;
  }
  .right ul li {
    display: inline-block;
  }
  .right ul li span {
    width: 44px;
    height: 24px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    border: solid 1px #cecece;
  }
  .right ul li em {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .tops {
    padding: 2px 0 21px 0;
  }
  .addPlane {
    float: right;
    right: 20px;
    color: white;
    cursor: pointer;
    line-height: 32px;
    text-align: center;
    width: 80px;
    height: 32px;
    background-color: #24bdaf;
    border-radius: 4px;
  }
  .followUpss {
    background-color: #ffffff;
    padding: 20px;
    margin: 19px auto;
    /*min-height: 775px;*/
    min-height: calc(100vh - 180px);
  }
  .nodata {
    color: #2c3e50;
    font-size: 16px;
    line-height: 90px;
    text-align: center;
  }
  .p_1 {
    /*width: 800px;*/
    width: 100%;
  }
  .p_1 span {
    display: block;
    float: left;
    font-size: 14px;
  }
  .p_1 .tit {
    width: 80px;
  }
  .p_1 .con {
    /*width: 710px;*/
    width: calc(100% - 80px);
    height: 55px;
    white-space: pre-wrap;
    word-break:break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
