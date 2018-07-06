<template>
    <div>
        <div class="followUps information positionContent">
            <h3>血糖预警</h3>
            <div class="InfoContent contentBorder">
                <div class="topInfo">
                    <el-input size="small" v-model="Info.name" placeholder="档案号/姓名/身份证/手机号"style="width:280px" class="searc_med"></el-input>
                    <el-select size="small" v-model="Info.type" placeholder=全部类型 style="width: 120px;">
                        <el-option
                            v-for="(item,index) in diabetesType"
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
                <div class="signAllReaded">
                    <el-button @click="signReadedAll">标记选中的为已读</el-button>
                    <el-button @click="signAll">全部标为已读</el-button>
                </div>
                <div class="highAuto" style="border-top: 1px solid #ebeef5;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;margin-top: 20px;">
                    <el-table
                    :data="InfoListData"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection">
                    </el-table-column>
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
                        prop="tag"
                        label="标签"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="sugarTestTime"
                        label="测量时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="timeType"
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
    
    .signAllReaded {
        margin-top: 20px;
    }
    .signAllReaded .el-button {
        padding: 5px 10px;
    }
</style>
<style>
    .InfoContent .el-table .warning-row td{
        color: #aaa;
    }
</style>

<script>

import funBus from '../../assets/js/funBus'

export default {
    name:'sugarWarningPage',
    data () {
        return {
            currentPage: 1,
            pagesize: 15,
            totalNum: 0,
            Info:{
                name:'',
                type:'',
                status:''
            },
            diabetesType:[],
            sugerStatus:[],
            valueTime:'',
            InfoListData:[],
            interTypes: [],
            //快捷回复
            dynamicTags: [],
            newAdds:false,
            inputVisible:false,
            inputValue: '',
            radio_: "",
            templateType_: 0, //类别（0:私有，1:公有
            AOC: ''
        }
    },
    created () {
        this.InfoList(this.currentPage,this.pagesize,'','','');
        //糖尿病类型
        funBus.getDiabetesType(this);
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
            this.InfoList(this.currentPage,this.pagesize,this.Info.name,this.valueTime,this.Info.type)
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
        InfoList (currentPage,pagesize,keyName,countDate,diabetesType){
            let data = {
                currentPage:currentPage,
                pageSize:pagesize,
                keyName:keyName,
                countDate:countDate,
                diabetesType:diabetesType
            };
            let _this = this;
            this.$api.getSugarWarningDataList(data, res => {
                _this.InfoListData = res.data.data.items;
                for(var i = 0, len = res.data.data.items.length;i < len;i++){
                    _this.InfoListData[i].birthday = _this.jsGetAge(_this.formatDate(res.data.data.items[i].age));
                    this.InfoListData[i].sugarTestTime = res.data.data.items[i].sugarTestTime ? _this.formatDate(res.data.data.items[i].sugarTestTime).slice(0,16) : '无';
                    _this.InfoListData[i].sugarClass = 'specialMax';
                    // if(_this.InfoListData[i].sugar < _this.InfoListData[i].sugarMinValue){
                    //     _this.InfoListData[i].sugarClass = 'specialMin';
                    // }else if(_this.InfoListData[i].sugar > _this.InfoListData[i].sugarMaxValue){
                    //     _this.InfoListData[i].sugarClass = 'specialMax';
                    // }else {
                    //     _this.InfoListData[i].sugarClass = '';
                    // }
                }
                _this.totalNum = res.data.data.totalNum;
            })
        },
        handleClick (row) { // 患者姓名点击跳转
            if (row.isRead == '2') {
                this.signReaded(row, [row.id]);
            }
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
        tableRowClassName({row}) {
            if (row.isRead == '1') {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        // 将某条血糖预警记录标记为已读
        signReaded (row, ids) {
            this.$api.signSugarWarningReaded({ids:ids}, res => {
                row.isRead = '1';
                this.$children[0].$refs.top.getUnreadSum();
            });
        },
         // 全选表格
        handleSelectionChange(val) {
            this.AOC = val;
        },
        signReadedAll () {
            let _this = this;
            let ids = [];
            if (this.AOC.length > 0) {
                ids = this.AOC.map(res => {
                    return res.id;
                })
                this.$api.signSugarWarningReaded({ids:ids}, res => {
                    this.InfoList(this.currentPage,this.pagesize,'','','');
                     _this.$children.forEach(element => {
                        if(element.$children[0] && element.$children[0].$refs.top){
                        element.$children[0].$refs.top.unreadSum = res.data.data.totalNum * 1 > 0 ? res.data.data.totalNum : '';
                        }
                    });
                });
            }
        },
        // 标记所有
        signAll () {
            let user = JSON.parse(sessionStorage.getItem('user'));
            let userId = user.userId;
            this.$api.signAllReaded({userId:userId}, res => {
                this.InfoList(this.currentPage,this.pagesize,'','','');
            });
        }
    }

}
</script>
