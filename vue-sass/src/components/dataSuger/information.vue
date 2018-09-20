<template>
  <div>
    <div class="information positionContent">
      <h3>数据</h3>
      <div class="InfoContent contentBorder">
        <div class="topInfo">
          <el-input size="small" v-model="Info.name" placeholder="档案号/姓名/身份证/手机号" style="margin-bottom:10px" class="searc_med"></el-input>
          <el-select size="small" v-model="Info.type" placeholder='全部类型' style="width: 120px;">
            <el-option v-for="(item,index) in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="Info.status" placeholder="血糖状况" style="width: 120px;">
            <el-option v-for="(item,index) in sugarTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <span class="demonstration">&nbsp;测量时间：</span>
          <el-date-picker size="small" v-model="valueTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 150px;" :picker-options="pickerOptions0">
          </el-date-picker>
          <div class="search" style="" @click="searchList">搜索</div>
          <div class="clear" @click="cleanList">重置</div>
        </div>
        <div class="sugarWarningSet clearfix">
          <div class="batch" @click="batchHandle('inter')">批量干预</div>
          <div class="batch" @click="batchHandle('remind')">批量提醒</div>
          <div class="batch" @click="batchHandle('follow')">批量随访</div>
          <!--<p class="floatLeft" @click="showSugarWarningSet">血糖预警设置</p>-->
          <div class="batch" v-if="isShowSugarWarningBtn" @click="showSugarWarningSet">血糖预警设置</div>
        </div>
        <div class="tableBorder">
          <el-table class="multipleTable" ref='multipleTable' :data="InfoListData" @selection-change="handleSelectionChange" @select-all="ifCheckedAll">
            <el-table-column fixed width="80" label="选择" type="selection">
            </el-table-column>
            <!--
              <el-table-column fixed prop="fileNumber" label="档案号" width="150" align="center">
              </el-table-column>
              -->
            <el-table-column fixed label="姓名" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
            </el-table-column>
            <el-table-column prop="birthday" label="年龄" align="center">
            </el-table-column>
            <el-table-column prop="doctorName" label="服务医生" align="center">
            </el-table-column>
            <el-table-column prop="nurseName" label="教育护士" align="center">
            </el-table-column>
            <el-table-column prop="diabetesType" label="类型" align="center">
            </el-table-column>
            <!--
              <el-table-column prop="tags" label="标签" align="center">
              </el-table-column>
              -->
            <el-table-column prop="sugarTestTime" label="测量时间" width="140" align="center">
            </el-table-column>
            <el-table-column prop="timeTypeName" label="时间段" align="center">
            </el-table-column>
            <el-table-column prop="sugar" label="测量结果" align="center">
              <template slot-scope="scope">
                <div :class="scope.row.sugarClass" slot="reference" v-html="scope.row.sugar"></div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="160">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="intermeddle(scope.row)">干预</el-button>
                <el-button type="text" size="small" @click="newRemind(scope.row)">提醒</el-button>
                <el-button type="text" size="small" @click="newFollow(scope.row)">随访</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15,20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //数组中去除重复患者项
  var distinct_arr = function (arr) {
    if (!arr || arr.length == 1) return arr;

    var resultArr = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      var notExist = true;
      for (let j = 0; j < resultArr.length; j++) {
        if (arr[i].customerId == resultArr[j].customerId) {
          notExist = false;
          break
        }
        if (notExist) resultArr.push(arr[i]);
      }
    }
    return resultArr;
  }

  import funBus from '../../assets/js/funBus';
  export default {
    name: 'information',
    data() {
      return {
        //loading: true,
        currentPage: 1,
        pagesize: 15,
        totalNum: 0,
        Info: {
          name: '',
          type: '',
          status: ''
        },
        diabetesTypeArr: [], // 糖尿病类型
        sugarTypeArr: [], // 血糖状况
        InfoListData: [],
        valueTime: '', // 搜索栏：测量时间
        //  推送
        ifnewRemind: false,
        newAdds: false,
        inputVisible: false,
        inputValue: '',
        radio_: "",
        templateType_: 0, //类别（0:私有，1:公有
        isShowSugarWarningBtn: true, // 设置是否显示血糖预警按钮
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        isAllPatient: false, // 是否全选患者
        AOC: [],
      }
    },
    created() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      if (user.roleType == 3) { //管理员
        this.isShowSugarWarningBtn = false; //是否显示设置血糖预警按钮
      }

      let date = new Date().toLocaleString()
      let today = date.replace(/\//g,'-').split(' ')[0]
      this.valueTime = today
      let args = this.$route.query;
      if (!!args.dates && args.dates == 'today') {
        this.valueTime = funBus.formatDate(new Date()).split(' ')[0];
      }
      this.searchList();
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
      funBus.getDictionarysByTypeCode(this, 'sugarType'); //血糖状况
    },
    methods: {
      //新增提醒
      newRemind(row) {
        let target = this.$parent.$refs.remindDialog;
        target.ifnewRemind = true;
        funBus.dynamic(target); //快捷回复
        target.customerId = row.customerId;
        funBus.getPatients(target, row.customerId); // 获取患者信息
      },
      //新增干预
      intermeddle(row) {
        let target = this.$parent.$refs.interventionDialog;
        target.ifHealthInter = true;
        target.customerId = row.customerId;
        funBus.getPatients(target, row.customerId); // 获取患者信息
      },
      //新增随访
      newFollow(row) {
        let target = this.$parent.$refs.followUpDialog;
        target.ifFolPlan = true;
        target.diabetesTypeArr = this.diabetesTypeArr;
        target.geFollowplaners(); //获取随访计划人员
        target.customerId = row.customerId;
        target.getFollowTemplate({});
        target.$nextTick(function () {
          funBus.getPatients(target, row.customerId); // 获取患者信息
        })
      },
      //清空
      cleanList() {
        //let date = new Date().toLocaleString()
        //let today = date.replace(/\//g,'-').split(' ')[0]
        //this.valueTime = today
        this.valueTime = this.formatDate(new Date()).split(' ')[0];
        //this.valueTime = '';
        this.Info = {
          name: '',
          type: '',
          status: ''
        }
        this.searchList()
      },
      //分页
      handleSizeChange(val) {
        this.pagesize = val;
        this.searchList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.searchList()
      },
      //设置查询参数
      setSearchParam() {
        return {
          currentPage: this.currentPage,
          pageSize: this.pagesize,
          keyName: this.Info.name,
          countDate: this.valueTime ? this.valueTime : '',
          countType: this.Info.status,
          diabetesType: this.Info.type
        };
      },
      //搜索列表数据
      searchList() {
        let data = this.setSearchParam();
        this.$api.pagedQuerySugerTestList(data, res => {
          this.InfoListData = res.data.data.items;
          let len = res.data.data.items.length;
          for (var i = 0; i < len; i++) {
            this.InfoListData[i].birthday = this.jsGetAge(this.formatDate(res.data.data.items[i].birthday))
            this.InfoListData[i].sugarTestTime = res.data.data.items[i].sugarTestTime ? res.data.data.items[i].sugarTestTime.slice(0, 16) : '无';
            if (this.InfoListData[i].sugar < this.InfoListData[i].sugarMinValue) {
              this.InfoListData[i].sugarClass = 'specialMin'
            } else if (this.InfoListData[i].sugar > this.InfoListData[i].sugarMaxValue) {
              this.InfoListData[i].sugarClass = 'specialMax'
            } else {
              this.InfoListData[i].sugarClass = ''
            }
          }
          this.totalNum = res.data.data.totalNum;
        })
      },
      handleClick(row) { // 患者姓名点击跳转
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
      // 显示血糖预警设置弹窗
      showSugarWarningSet() {
        let _this = this;
        let userId = JSON.parse(sessionStorage.getItem('user')).userId;
        this.$api.getSugarWarningSet({
          scope: userId,
          isUser: true
        }, res => {
          let dataList = res.data.data;
          // 定义目标弹窗
          let target = _this.$parent.$parent.$children[0].$refs.sugarWarningSetDialog;
          if (dataList.length > 0) {
            dataList.forEach(item => {
              target.createUserId = item.createUserId;
              if (item.type == '1') {
                // 根据判断是弹窗数据还是短信数据设置预警弹窗初始值以及开关状态
                target.inputValueList[0] = item.minValue;
                target.inputValueList[1] = item.maxValue;
                target.switchDialog = item.status == '1' ? true : false;
                target.dialogInputDisable = item.status == '1' ? false : true;
                target.idDialog = item.id;
              } else if (item.type == '2') {
                target.inputValueList[2] = item.minValue;
                target.inputValueList[3] = item.maxValue;
                target.switchShortMessage = item.status == '1' ? true : false;
                target.dialogshortMessageDisable = item.status == '1' ? false : true;
                target.idShortMessage = item.id;
              }
            });
          } else {
            target.init();
          }
          _this.$parent.$parent.$children[0].showSugarWarningSet();
          target.scopeId = userId; // 将用户id传递给弹窗
          target.isUser = true;
        })
      },
      //表格选择项发生变化时会触发该事件
      handleSelectionChange(val) {
        let vm = this;
        vm.AOC = val;
        let num = vm.totalNum > vm.pagesize ? vm.pagesize : vm.totalNum;
        if (vm.AOC.length < num) {
          vm.isAllPatient = false; //选中数量少于当前显示数量，非全选
        }
      },
      //勾选全选 Checkbox 时触发的事件
      ifCheckedAll(selection) {
        this.isAllPatient = !selection.length ? false : true;
      },
      //判断是否全选患者
      isChooseAllPatient() {

        let vm = this;
        // 获取比较标准
        let num = vm.totalNum > vm.pagesize ? vm.pagesize : vm.totalNum;
        // 全选患者isAllPatient为true，但患者选中数量小于当前页患者数时
        if (vm.isAllPatient) {
          if (vm.AOC.length < num) {
            vm.isAllPatient = false;
          } else {
            vm.isAllPatient = true;
          }
        } else {
          if (vm.AOC.length <= num) {
            vm.isAllPatient = false;
          }
        }
      },
      // 传参(患者)到批量处理
      passingPatient(target) {
        let vm = this;

        vm.isChooseAllPatient(); //判断是否全选患者

        // 勾选了全选Checkbox复选框时
        if (vm.isAllPatient) {
          target.isAllPatient = true;
          let data = vm.setSearchParam(); //设置查询参数
          this.$api.querySugerTestListToCustomerId(data, res=>{
            target.allPatientId = res.data.data;
          }, res => {
            this.$message(res.data.errMsg || res.data.data);
          });
        } else {
          //被选中患者
          target.ruleForm.multi = distinct_arr(vm.AOC); //选中数组中去除重复患者项
          //target.ruleForm.multi = vm.AOC;
        }
      },
      //批量操作(批量干预、批量提醒、批量随访)
      batchHandle(way) {
        if (this.AOC.length > 0) {
          switch (way) {
            case 'inter': //批量干预
              funBus.batchInter(this);
              break;
            case 'remind': //批量提醒
              funBus.batchRemind(this);
              break;
            case 'follow': //批量随访
              funBus.batchFollowUp(this);
              break;
          }
        } else {
          this.$message('请先选择患者');
        }
      },

    },
  }
</script>
<style lang="less" scoped>
  .information {
    .InfoContent {
      background-color: #ffffff;
      padding: 20px;
      margin: 19px auto;
      /*min-height: 775px;*/
      min-height: calc(~'100vh - 180px');
      .topInfo {
        width: 100%;
        padding: 2px 0 11px 0;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
  .sugarWarningSet {
    margin: 20px 0;
  }
  .sugarWarningSet p {
    font-size: 14px;
    padding: 5px 20px;
    border-radius: 5px;
    border: 1px solid #DDD;
    cursor: pointer;
  }
</style>
