<template>
  <div>
    <div class="homePage positionContent">
      <a class="special">{{dataTime}}好， <span class="uname">{{nickname}}</span> <span v-if="dataTime=='早上'">美好的一天开始了</span>，我是您的智能健康管理平台，祝您工作愉快！</a>
      <div class="homePage-top pr">

        <el-row :class="{marginRight220px: !isNurse}">
          <el-col :span='1'>&nbsp;
          </el-col>
          <el-col :span='3'>
            <dl @click="goToPatient()">
              <dt><span class="one">{{customerCountTotal}}</span></dt>
              <dd>患者数量(人)</dd>
            </dl>
          </el-col>
          <el-col :span='1'>
            <div class="colLine"></div>
          </el-col>
          <el-col :span='3'>
            <dl @click="goToPatient('today')">
              <dt><span class="two">{{customerCount.createUserCount}}</span></dt>
              <dd>今日建档患者数(人)</dd>
            </dl>
          </el-col>
          <el-col :span='1'>
            <div class="colLine"></div>
          </el-col>
          <el-col :span='3'>
            <dl @click="goToInfo">
              <dt><span class="three">{{customerCount.sugarTestCount}}</span></dt>
              <dd>今日血糖测量(次)</dd>
            </dl>
          </el-col>
          <el-col :span='1'>
            <div class="colLine"></div>
          </el-col>
          <el-col :span='3'>
            <dl @click="goToSugarHighLow(1)">
              <dt><span class="five">{{customerCount.sugarTestHighCount}}</span></dt>
              <dd>今日血糖偏高(人)</dd>
            </dl>
          </el-col>
          <el-col :span='1'>
            <div class="colLine"></div>
          </el-col>
          <el-col :span='3'>
            <dl @click="goToSugarHighLow(2)">
              <dt><span class="six">{{customerCount.sugarTestLowCount}}</span></dt>
              <dd>今日血糖偏低(人)</dd>
            </dl>
          </el-col>
          <el-col :span='1'>
            <div class="colLine"></div>
          </el-col>
          <el-col :span='3'>
            <dl @click="weekNoGauged()">
              <dt><span class="seven">{{customerNoTestCount}}</span></dt>
              <dd>7天未测量(人)</dd>
            </dl>
          </el-col>
        </el-row>

        <div class="addPatientBox par" v-if="!isNurse">
          <div class="addPatient par" @click="addPatient">
            <div class="bgImg addPatientBtn"></div>
            <span class="txt">新增患者</span>
          </div>
        </div>
      </div>

      <div class="homePage-center">
        <div class="center-left">
          <p class="title">今日干预<span v-if="interventionCount>0">（{{interventionCount}}次）</span></p>
          <div class="tableContent">
            <el-table :data="intervenData" :height="tableHeight" border class="homeTable">
              <el-table-column fixed label="姓名" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="sex" label="性别" align="center">
              </el-table-column>
              <el-table-column prop="birthday" label="年龄" align="center">
              </el-table-column>
              <el-table-column prop="diabetesType" label="类型" align="center">
              </el-table-column>
              <el-table-column prop="interventionName" label="干预方案" align="center">
              </el-table-column>
              <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="showInterventionDetail(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="center-right">
          <p class="title">今日随访<span v-if="followUpCount>0">（{{followUpCount}}次）</span></p>
          <div class="tableContent">
            <el-table :data="followUpData" :height="tableHeight" border>
              <el-table-column fixed label="姓名" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="sex" label="性别" align="center">
              </el-table-column>
              <el-table-column prop="birthday" label="年龄" align="center">
              </el-table-column>
              <el-table-column prop="diabetesType" label="类型" align="center">
              </el-table-column>
              <el-table-column prop="followUpName" label="随访模板" align="center">
              </el-table-column>
              <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="followAction(scope.row)" type="text" size="small">{{scope.row.followStatus == 0 ? '已取消' : (scope.row.followStatus == 1 ? '查看' : '执行') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../assets/js/funBus'
  import eventBus from '../../assets/js/eventBus';

  export default {
    name: 'homePage',
    data() {
      return {
        isNurse: false, //登陆用户是否护士
        tableHeight: window.innerHeight - 430, // 500
        interventionCount: 0, //今日干预数量
        followUpCount: 0, //今日随访数量
        nickname: "", //用户昵称
        customerCount: { //今日统计数据
          createUserCount: 0, //患者建档数
          sugarTestCount: 0, //血糖测量次数
          sugarTestHighCount: 0, //高血糖患者数
          sugarTestLowCount: 0, //低血糖患者数
        },
        intervenData: [], // 今日干预数据
        followUpData: [], // 今日随访数据
        customerNoTestCount: 0, // 7天未测量数目
        customerCountTotal: 0, // 所有患者数量
      }
    },
    computed: {
      dataTime() {
        let hh = new Date().getHours();
        if (hh < 9) {
          return "早上";
        } else if (hh < 12) {
          return "上午";
        } else if (hh < 13) {
          return "中午";
        } else if (hh < 18) {
          return "下午";
        } else if (hh < 24) {
          return "晚上";
        }
      }
    },
    methods: {
      // 所有患者数量
      queryCustomerCount() {
        this.$api.queryCustomerCount({}, res => {
          if (res.data.data) {
            let nums = res.data.data.allCustomerCount;
            this.customerCountTotal = nums != null ? nums : 0;
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);

        })
      },
      addPatient() { //新增患者
        this.$router.push("/patientManage/addPatient");
      },
      // 测量次数
      goToInfo() {
        this.$router.push({
          path: '/information',
          query: {
            dates: 'today'
          }
        })
      },
      //建档人数跳转患者
      goToPatient(dates) {
        this.$router.push({
          path: '/patientManage',
          query: {
            dates: dates
          }
        })
      },
      //血糖偏向跳转 countType=1偏高，countType=2偏低
      goToSugarHighLow(countType) {
        this.$router.push({
          path: '/sugerHighLow',
          query: {
            countType: countType
          }
        })
      },
      // 患者姓名点击进来患者详情页
      handleClick(row){
        if (row.customerId) {
          this.$router.push({
            name: 'patientDetail',
            query: {
              cusTomId: row.customerId,
              userCusId: row.userCustomerId,
              fileNumber: row.fileNumber
            }
          })
        }
      },
      // 获取7天未测量数目
      getWeekNoGaugedCount() {
        this.$api.getWeekNoGaugedCount({}, (res) => {
          this.customerNoTestCount = res.data.data.customerNoTestCount;
        });
      },
      //跳转到患者管理页并显示7天未测量患者
      weekNoGauged() {
        this.$router.push({
          path: '/patientManage',
          query: {
            from: 'weekNoGauged'
          }
        });
      },
      //查看干预详情
      showInterventionDetail(row) {
        let target = this.$parent.$refs.interventionDetailDialog;
        target.ifViewInter = true;
        target.interventionId = row.interventionId;
        target.getInterventionDetail(row.interventionId);
        funBus.getPatients(target, row.customerId); //患者信息
      },      
      //执行随访弹窗
      plansMethod(row) {
        let target = this.$parent.$refs.followUpExecDialog;
        target.plans = true;
        target.followUpId = row.followUpId;
        target.geFollowplaners(); //获取随访计划人员
        funBus.getPatients(target, row.customerId); // 获取患者信息
        funBus.queryFollowInfoById(target, row.followUpId); // 获取随访信息
      },
      //查看随访明细
      showFollowUpDetail(row) {
        let target = this.$parent.$refs.followUpDetailDialog;
        target.ifFolDetail = true;
        funBus.getPatients(target, row.customerId); // 获取患者信息
        funBus.queryFollowInfoById(target, row.followUpId); // 获取随访信息
      },
      //随访动作
      followAction(it) {
        if (it.followStatus == 2) { // 随访状态判断：1已执行；2未执行
          this.plansMethod(it); //执行随访弹窗
        } else {
          this.showFollowUpDetail(it); //查看随访明细
        }
      },
      //获取随访数据
      getFollowUpData(data) {
        this.$api.followUp(data, res => {
          
          let dt = res.data.data;
          if (dt.length > 0) {
            this.followUpData = this.handleData(dt);
            this.followUpCount = dt.length;
          }          
          /*
          let ret = res.data.data;
          this.followUpCount = ret.length;
          let dataRet = [];
          for (let i = 0; i < this.followUpCount; i++) {
            let obj = {};
            obj.patientName = ret[i].patientName != null ? ret[i].patientName : "无";
            obj.sex = ret[i].sex != null ? ret[i].sex : "无";
            obj.birthday = ret[i].birthday != null ? this.jsGetAge(this.formatDate(ret[i].birthday)) : "无";
            obj.diabetesType = ret[i].diabetesType != null ? ret[i].diabetesType : "无";
            obj.followUpName = ret[i].followUpName != null ? ret[i].followUpName : "无";
            obj.followUpId = ret[i].followUpId;
            obj.customerId = ret[i].customerId;
            obj.userCustomerId = ret[i].userCustomerId;
            obj.fileNumber = ret[i].fileNumber;
            obj.followStatus = ret[i].followStatus;
            dataRet.push(obj);
          };
          this.followUpData = dataRet;
          */
        });
      },
      //获取干预数据
      getIntervenData(data) {
        this.$api.intervention(data, res => {
          let dt = res.data.data;
          if (res.data.data.length > 0) {
            this.intervenData = this.handleData(dt);
            this.interventionCount = dt.length;
          }
        });
      },
      //干预、随访列表数据处理
      handleData(data) {
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].patientName = data[i].patientName != null ? data[i].patientName : "无"
          data[i].sex = data[i].sex != null ? data[i].sex : "无"
          data[i].birthday = data[i].birthday ? this.jsGetAge(this.formatDate(data[i].birthday)) : "无"
          data[i].diabetesType = data[i].diabetesType != null ? data[i].diabetesType : "无"
          data[i].interventionName = data[i].interventionName != null ? data[i].interventionName : "无"
          data[i].followUpName = data[i].followUpName != null ? data[i].followUpName : "无";
        }
        return data;
      }
    },
    created: function () {

      if (!('WebSocket' in window)) {
        this.$alert('该浏览器不支持websocket,预警信息失效!', {
          confirmButtonText: '确定'
        });
      }

      let user = JSON.parse(sessionStorage.getItem('user'));
      //roleType:1医生；2护士；3管理员
      this.isNurse = user.roleType == '2' ? true : false;

      //刷新侧边栏和头部登录信息
      if (this.$parent.$refs.baseModel) {
        this.$parent.$refs.baseModel.$refs.top.reloadTop();
        this.$parent.$refs.baseModel.$refs.leftNav.reloadNav();
      }
      this.nickname = user.nickname;
      
      let data = {
        userId: user.userId
      };
      //获取今日数据
      this.$api.queryUserTodayCustomerCount(data, res => {
        this.customerCount = res.data.data
      });

      this.getFollowUpData(data); // 获取随访数据
      this.getIntervenData(data); // 获取干预数据

      this.getWeekNoGaugedCount(); // 获取7天未测量总数
      this.queryCustomerCount(); // 获取所有患者数量

      //监听updateFollowUpTable，更新随访表数据
      eventBus.$on('updateFollowUpTable', () => {
        this.getFollowUpData(data); // 获取随访数据
      });

    },
    mounted() {
      let vm = this
      // 监听窗口大小变化，更新表格高度
      window.addEventListener('resize', function() {
        vm.$nextTick(function () {
          vm.tableHeight = window.innerHeight - 430;
        })
      });
    }
  }
</script>

<style lang="less" scoped>
  .demo-ruleForm{
    margin-top: 30px;
  }
  .homePage {
    .special {
      font-size: 14px;
      .uname {
        color: #267BF7;
      }
    }
    .homePage-top {
      width: 100%;
      box-sizing: border-box;
      height: 180px;
      background-color: #ffffff;
      padding: 20px 0;
      margin-top: 19px;
      p {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 24px;
      }
      ul {
        margin-top: 14px;
        height: auto;
        overflow: hidden;
        width: 85%;
        li {
          float: left;
          width: 16.5%;
          text-align: center;
        }
      }
      .el-row {
        text-align: center;
        margin-top: 20px;
      }
      .marginRight220px {
        margin-right: 220px;
      }
      dl {
        font-size: 18px;
        display: inline-block;
        cursor: pointer;
        dt {
          line-height: 60px;
          text-align: center;
          span {
            font-size: 32px;
          }
          .one {
            color: #267bf7;
          }
          .two {
            color: #00c2b1;
          }
          .three {
            color: #ac76e4;
          }
          .four {
            color: #44a3df;
          }
          .five {
            color: #e95959;
          }
          .six {
            color: #e98559;
          }
          .seven {
            color: #99D200;
          }
        }
        dd {
          font-size: 15px;
        }
      }
      .colLine {
        width: 1px;
        height: 50px;
        background: #eee;
        margin: 25px auto 0;
      }
      .addPatientBox {
        height: 180px;
        width: 210px;
        background-color: #f7f8fa;
        .addPatient {
          float: right;
          cursor: pointer;
          text-align: center;
          width: 180px;
          height: 180px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #eff2f5;
          box-sizing: border-box;
          background-color: #fff;
          overflow: hidden;

          .addPatientBtn {
            width: 60px;
            height: 60px;
            margin: 50px auto 10px;
            background-position: -300px -4px;
          }

          .txt {
            display: block;
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            height: 20px;
            text-align: center;
          }
        }
      }
    }
    .homePage-center {
      /*height: 600px;*/
      height: calc(~'100vh - 340px');
      width: 100%;
      margin: 19px auto;
      .center-left,
      .center-right {
        width: 49.5%;
        float: left;
        background-color: #ffffff;
        height: 100%;
        border: 1px solid #eff2f5;
      }
      .center-right {
        float: right;
      }
      .tableContent {
        padding: 20px;
      }
      .title {
        line-height: 50px;
        border-bottom: 1px solid #f1f1f1;
        padding-left: 20px;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
</style>
