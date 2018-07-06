<template>
    <div>
      <div class="followUps information positionContent">
        <h3>数据</h3>
        <div class="InfoContent contentBorder">
          <div class="topInfo">
            <el-input size="small" v-model="Info.name" placeholder="档案号/姓名/身份证/手机号"style="width:280px" class="searc_med"></el-input>
            <el-select size="small" v-model="Info.type" placeholder='全部类型' style="width: 120px;">
              <el-option
                v-for="(item,index) in diabetesType"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
            <el-select size="small" v-model="Info.status" placeholder="血糖状况" style="width: 120px;">
              <el-option
                v-for="(item,index) in sugerStatus"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
              <span class="demonstration">  测量时间：</span>
              <el-date-picker
                :clearable=false
                size="small"
                v-model="valueTime"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            <div class="search" style="" @click="searchList">搜索</div>
            <div class="clear" @click="cleanList">重置</div>
          </div>
          <div v-if="isShowSugarWarningBtn" class="sugarWarningSet clearfix">
            <p class="floatLeft" @click="showSugarWarningSet">血糖预警设置</p>
          </div>
          <div class="highAuto">
            <el-table
              :data="InfoListData">
              <el-table-column
                fixed
                prop="fileNumber"
                label="档案号"
                align="center">
              </el-table-column>
              <el-table-column
                prop=""
                label="姓名"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                align="center">
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="年龄"
                align="center">
              </el-table-column>
              <el-table-column
                prop="diabetesType"
                label="类型"
                align="center">
              </el-table-column>
              <el-table-column
                prop="tags"
                label="标签"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sugarTestTime"
                label="测量时间"
                align="center">
              </el-table-column>
              <el-table-column
                prop="timeTypeName"
                label="时间段"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sugar"
                label="测量结果"
                align="center">
                <template slot-scope="scope">
                    <div :class="scope.row.sugarClass" slot="reference" v-html="scope.row.sugar"></div>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="intermeddle(scope.row)">干预</el-button>
                  <el-button type="text" size="small" @click="newRemind(scope.row)">提醒</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15,20]"
              :page-size="pagesize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import funBus from '../../assets/js/funBus'
    export default {
        name: 'information',
        data() {
            return {
              currentPage: 1,
              pagesize: 15,
              totalNum: 0,
              Info:{
                name:'',
                type:'',
                status:''
              },
              diabetesType:[], // 糖尿病类型
              sugerStatus:[], // 血糖状况
              InfoListData:[],
              valueTime:'', // 搜索栏：测量时间
              //  推送
              ifnewRemind: false,
              newAdds:false,
              inputVisible:false,
              inputValue: '',
              radio_: "",
              templateType_: 0, //类别（0:私有，1:公有
              isShowSugarWarningBtn: true // 设置是否显示血糖预警按钮
            }
        },
        created:function () {
          let date = new Date().toLocaleString()
          let today = date.replace(/\//g,'-').split(' ')[0]
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.isShowSugarWarningBtn = user.existDepartment; //是否显示设置血糖预警按钮
          this.valueTime = today
          this.InfoList(this.currentPage,this.pagesize,'',today,'','')
          //糖尿病类型
          funBus.getDiabetesType(this);
          //  血糖状况
          this.$api.dictionaryListByCode({typeCode:'sugarType'}, res => {
            this.sugerStatus = res.data.data
          })
        },
        methods: {
          //推送提醒
          newRemind(row) {
            let remindDialog = this.$parent.$refs.remindDialog;
            remindDialog.ifnewRemind = true;
            remindDialog.customerId = row.customerId;
            funBus.getPatients(remindDialog, row.customerId); // 获取患者信息
          },
          //干预
          intermeddle(row){
            let interventionDialog = this.$parent.$refs.interventionDialog;
            interventionDialog.ifHealthInter = true;
            interventionDialog.customerId = row.customerId;
            funBus.getPatients(interventionDialog, row.customerId); // 获取患者信息
          },

          //搜索
          searchList(){
            this.InfoList(this.currentPage,this.pagesize,this.Info.name,this.valueTime,this.Info.type,this.Info.status)
          },
          //清空
          cleanList(){
            let date = new Date().toLocaleString()
            let today = date.replace(/\//g,'-').split(' ')[0]
            this.valueTime = today
            this.Info = {name:'', type:'', status:''}
            this.InfoList(this.currentPage,this.pagesize,'',this.valueTime,'','')
          },
          //分页
          handleSizeChange(val) {
            this.pagesize = val;
            this.InfoList(this.currentPage,this.pagesize,'',this.valueTime,'','')
          },
          handleCurrentChange(val) {
            this.currentPage = val;
            this.InfoList(this.currentPage,this.pagesize,'',this.valueTime,'','')
          },
          //  列表数据
          InfoList (currentPage,pagesize,keyName,countDate,diabetesType,countType){
            var data = {
              currentPage:currentPage,
              pageSize:pagesize,
              keyName:keyName,
              countDate:countDate,
              countType:countType,
              diabetesType:diabetesType
            };
            this.$api.pagedQuerySugerTestList(data, res => {
              this.InfoListData = res.data.data.items
              for(var i=0;i<res.data.data.items.length;i++){
                this.InfoListData[i].birthday = this.jsGetAge(this.formatDate(res.data.data.items[i].birthday))
                this.InfoListData[i].sugarTestTime = res.data.data.items[i].sugarTestTime ? res.data.data.items[i].sugarTestTime.slice(0,16) : '无';
                if(this.InfoListData[i].sugar < this.InfoListData[i].sugarMinValue){
                  this.InfoListData[i].sugarClass = 'specialMin'
                }else if(this.InfoListData[i].sugar > this.InfoListData[i].sugarMaxValue){
                  this.InfoListData[i].sugarClass = 'specialMax'
                }else {
                  this.InfoListData[i].sugarClass = ''
                }
              }
              this.totalNum = res.data.data.totalNum
            })
          },
          handleClick (row) { // 患者姓名点击跳转
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
          showSugarWarningSet () {
            let _this = this;
            let userId = JSON.parse(sessionStorage.getItem('user')).userId;
            this.$api.getSugarWarningSet({scope:userId, isUser: true}, res => {
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
                    target.switchDialog = item.status == '1'? true : false;
                    target.dialogInputDisable = item.status == '1'? false : true;
                    target.idDialog = item.id;
                  } else if (item.type == '2') {
                    target.inputValueList[2] = item.minValue;
                    target.inputValueList[3] = item.maxValue;
                    target.switchShortMessage = item.status == '1'? true : false;
                    target.dialogshortMessageDisable = item.status == '1'? false : true;
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
          }
        },
    }
</script>
<style lang="less" scoped>
  .information{
    .InfoContent{
      background-color: #ffffff;
      padding: 20px;
      margin-top: 19px;
      min-height: 775px;
      .topInfo{
        width: 100%;
        padding: 2px 0 21px 0;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
  .sugarWarningSet{
    margin: 20px 0;
  }
  .sugarWarningSet p{
    font-size: 14px;
    padding: 5px 20px;
    border-radius: 5px;
    border: 1px solid #DDD;
  }
  .highAuto{
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    margin-top: 20px;
  }
</style>
