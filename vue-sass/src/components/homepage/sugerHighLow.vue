<template>
  <div>
    <div class="positionContent">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item style='color: #267BF7;' v-text="countType==1?'血糖偏高':'血糖偏低'"></el-breadcrumb-item>
        <span class="btn-back floatRight" @click="goBack">返回</span>
      </el-breadcrumb>
      <div class="managess contentBorder">
        <div class="tops">
          <el-input v-model="keyNames" placeholder="档案号/姓名/身份证/手机号" size="small" class="searc_med"></el-input>
          <el-select size="small" v-model="diabetesType" placeholder="全部类型" style="width: 170px;">
            <el-option v-for="item in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>

          <div class="search" @click="searchs">搜索</div>
          <div class="clear" @click="clear">清空</div>

        </div>
        <div class="mainss">
          <div class="batch" @click="batchHandle('inter')">批量干预</div>
          <div class="batch" @click="batchHandle('remind')">批量提醒</div>
          <div class="batch" @click="batchHandle('follow')">批量随访</div>
          <!--表格-->
          <el-table class="multipleTable" ref="multipleTable" :data="sugarData" tooltip-effect="dark" style="margin-top: 20px;width: 100%;border-left:1px solid #eff2f5;border-right:1px solid #eff2f5;border-top: 1px solid #eff2f5" @selection-change="handleSelectionChange" @select-all="ifCheckedAll">
            <el-table-column fixed width="80" label="选择" type="selection">
            </el-table-column>
            <!--
            <el-table-column fixed width="150"  label="档案号" align="center">
                <template slot-scope="scope">{{ scope.row.fileNumber }}</template>
            </el-table-column>
            -->
            <el-table-column fixed label="姓名" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="70" align="center">
            </el-table-column>
            <el-table-column prop="birthday" label="年龄" width="100" :formatter="birthday_" align="center">
            </el-table-column>
            <el-table-column prop="diabetesType" label="类型" width="160" :formatter="stringType" align="center">
            </el-table-column>
            <!--
            <el-table-column prop="tags" label="标签" align="center" width="160" show-overflow-tooltip>
            </el-table-column>
            -->
            <el-table-column prop="doctorName" label="服务医生" align="center">
            </el-table-column>
            <el-table-column prop="nurseName" label="教育护士" align="center">
            </el-table-column>
            <el-table-column label="测量详情" align="center">
              <template slot-scope="scope">
                <el-popover popper-class="measureInfoPopover" trigger="hover" placement="top">
                  <p v-for="e in scope.row.sugarItems" style="display: inline-block; width: 100px; line-height: 25px;"><span>{{ e.split(':')[0] }}：</span><span :class="countType==2?'lowSugarColor':'highSugarColor'">{{ e.split(':')[1] }}</span>；</p>
                  <div slot="reference" class="name-wrapper sugarScoped">
                    <span style="border-bottom: dashed 1px #333;" v-html="scope.row.sugarInfo"></span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button @click="intermeddle(scope.row)" type="text" size="small">干预</el-button>
                <el-button @click="newRemind(scope.row)" type="text" size="small">提醒</el-button>
                <el-button @click="newFollow(scope.row)" type="text" size="small">随访</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                           :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import funBus from '../../assets/js/funBus'

  export default {
    name: 'suger-high',
    data() {
      return {
        tags: '',
        diabetesType: '', // 糖尿病类型(搜索条件)
        countType: 1, //统计类型 （血糖偏高—1，血糖偏低—2）
        totalNum: 0,
        diabetesTypeArr: [], // 糖尿病类型(搜索栏下拉)
        keyNames: "", //搜索关键词
        //表格
        sugarData: [],
        currentPage4: 1,
        pagesize: 15,
        AOC: "",
        isAllPatient: false, // 是否全选患者
      }
    },
    created: function () {
      this.countType = this.$route.query.countType || 2;
      this.getAllPatient(this.currentPage4, this.pagesize, '', this.countType, '');
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    methods: {
      handleSugarVal(val) { //对测量详情值添加颜色
        let cla = this.countType == 2 ? 'lowSugarColor' : 'highSugarColor';
        let items = val.split(';');
        for (let i = 0, len = items.length; i < len; i++) {
          let item = items[i].split(':');
          item[1] = '<span class="' + cla + '">' + item[1] + '</span>';
          items[i] = item.join(":");
        }
        val = items.join(";");
        return val;
      },
      goBack() {
        this.$router.push({
          path: '/homePage'
        })
      },
      // 患者管理数据
      getAllPatient(currentpage, pageSize, keyNames, countType, diabetesType) {
        let that = this;
        if (keyNames === undefined) {
          keyNames = '';
        }
        if (diabetesType === undefined) {
          diabetesType = '';
        }

        let data = this.setSearchParam();

        this.$api.pagedQuerySugerHighLowCustomerList(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              that.totalNum = res.data.data.totalNum;

              //处理获取的数据(添加颜色代码、新增属性用于鼠标悬浮测量详情上的显示)
              let sd = res.data.data.items;
              that.sugarInfoList = [];
              sd.map(function (e) {
                e.showSugarInfo = e.sugarInfo;
                if (e.sugarInfo) {
                  e.sugarItems = e.sugarInfo.split(';');
                  e.sugarInfo = that.handleSugarVal(e.sugarInfo);
                }
              });
              that.sugarData = sd;

            }
          }
        }, res => {
          that.$message(res.data.errMsg || res.data.data);
        })
      },
      birthday_(data) {
        let that = this;
        return data.birthday ? that.jsGetAge(that.formatDate(data.birthday)) : ''
      },
      stringType(data) {
        return data.diabetesType ? data.diabetesType : '无'
      },
      searchs() {
        let that = this;
        that.keyNames = that.keyNames.replace(/(^\s*)|(\s*$)/g, "");
        // 根据条件查询患者列表
        // 当搜索出患者默认为从第一页开始
        that.currentPage4 = 1;
        that.getAllPatient(that.currentPage4, that.pagesize, that.keyNames, that.countType, that.diabetesType);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.countType, this.diabetesType);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage4 = val;
        this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.countType, this.diabetesType);
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
      //清空
      clear() {
        let that = this;
        that.diabetesType = "";
        that.keyNames = "";
        //清空默认跑到第一页
        that.currentPage4 = 1;
        that.getAllPatient(that.currentPage4, that.pagesize, '', that.countType, '');
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
      //设置查询参数
      setSearchParam() {
        let vm = this;
        return {
          currentPage: this.currentPage4,
          pageSize: this.pagesize,
          keyName: this.keyNames, //关键词
          countType: this.countType, //统计类型 （血糖偏高—1，血糖偏低—2）
          diabetesType: this.diabetesType //糖尿病类型
        }
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
          this.$api.querySugerHighLowCustomerListToCustomerId(data, res=>{
            target.allPatientId = res.data.data;
          }, res => {
            this.$message(res.data.errMsg || res.data.data);
          });
        } else {
          //被选中患者
          target.ruleForm.multi = vm.AOC;
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
    }
  }
</script>

<style>

  .measureInfoPopover {
    max-width: 200px;
    min-width: auto;
  }

  /*table表格checkbox列表头label内容*/

  .el-table.multipleTable .el-table__fixed-header-wrapper .el-table-column--selection .el-checkbox::after {
    content: ' 全选';
  }
  /*低血糖值显示颜色*/

  .lowSugarColor {
    color: #e98559;
  }
  /*高血糖值显示颜色*/

  .highSugarColor {
    color: #e95959;
  }
  /*高低血糖列表——测量详情*/

  .sugarScoped {
    margin: 0 auto;
    width: 99%;
    min-width: 80px;
    height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /*面包屑箭头*/

  .el-icon-arrow-right {
    font-size: 14px;
  }
</style>

<style scoped>
  .mainss {
    padding: 20px 0 0;
  }
  .tops {
    padding: 2px 0 21px 0;
  }
  .tops span {
    padding: 0 15px;
  }
  .managess {
    width: 100%;
    box-sizing: border-box;
    /*min-height: 812px;*/
    min-height: calc(100vh - 133px);
    background-color: #ffffff;
    padding: 20px;
    margin-top: 10px;
  }
</style>
