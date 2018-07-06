<template>
    <div>
        <div class="sugarManage">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item style='color: #267BF7;' v-text="countType==1?'血糖偏高':'血糖偏低'"></el-breadcrumb-item>
                <span class="btn-back floatRight" @click="goBack">返回</span>
            </el-breadcrumb>
            <div class="managess contentBorder">
                <div class="tops">
                    <el-input v-model="keyNames" placeholder="档案号/姓名/身份证/手机号" size="small" class="searc_med"></el-input>
                    <el-select size="small" v-model="typesss" placeholder="全部类型" style="width: 170px;">
                        <el-option v-for="item in diabetesType" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                            {{item.itemValue}}
                        </el-option>
                    </el-select>

                    <div class="search" @click="searchs">搜索</div>
                    <div class="clear" @click="clear">清空</div>

                </div>
                <div class="mainss">
                    <div class="batch" @click="batInter()">批量干预</div>
                    <div class="batch" @click="batRemind()">批量提醒</div>
                    <div class="batch" @click="batFollow()">批量随访</div>
                    <!--表格-->
                    <el-table ref="multipleTable" :data="sugarData" tooltip-effect="dark" style="width: 100%;border-left:1px solid #eff2f5;border-right:1px solid #eff2f5;border-top: 1px solid #eff2f5" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column fixed  label="档案号" align="center">
                            <template slot-scope="scope">{{ scope.row.fileNumber }}</template>
                        </el-table-column>
                        <el-table-column prop="" label="姓名" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sex" label="性别"  align="center">
                        </el-table-column>
                        <el-table-column prop="birthday" label="年龄" :formatter="birthday_" align="center">
                        </el-table-column>
                        <el-table-column prop="diabetesType" label="类型" :formatter="stringType" align="center">
                        </el-table-column>
                        <el-table-column prop="tags" label="标签" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column prop="sugarInfo" label="测量详情" align="center">
                        </el-table-column>-->
                        <el-table-column label="测量详情" align="center">
                            <!--<template slot-scope="scope">{{ scope.row.sugarInfo }}</template>-->
                            <template slot-scope="scope">
                                <!--<div class="sugarScoped" v-html="scope.row.sugarInfo"></div>-->
                                <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :content="scope.row.showSugarInfo">
                                    <div class="sugarScoped" slot="reference" v-html="scope.row.sugarInfo"></div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" align="center">
                            <template slot-scope="scope">
                                <el-button @click="intermeddle(scope.row)" type="text" size="small">干预</el-button>
                                <el-button @click="newRemind(scope.row)" type="text" size="small">提醒</el-button>
                                <el-button @click="newFollow(scope.row)" type="text" size="small">随访</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNums">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

global.pageSize = 1000;
import funBus from '../../assets/js/funBus'

export default {
    name: 'suger-high',
    data() {
        return {
            tags: '',
            typesss: '', // 糖尿病类型(搜索条件)
            countType: 1, //统计类型 （血糖偏高—1，血糖偏低—2）
            totalNums: 0,
            diabetesType: [], // 糖尿病类型(搜索栏下拉)
            keyNames: "",   //搜索关键词
            //表格
            sugarData: [],
            currentPage4: 1,
            pagesize: 15,
            AOC: "",
        }
    },
    created: function () {
        this.countType = this.$route.query.countType || 2;
        this.getAllPatient(this.currentPage4, this.pagesize, '', this.countType, '');
    },
    mounted: function () {
        //糖尿病类型
        funBus.getDiabetesType(this);
    },

    methods: {
        handleSugarVal(val){ //对测量详情值添加颜色
            var cla = this.countType==2?'lowSugarColor':'highSugarColor';
            var items = val.split(';');
            for (var i=0,len=items.length;i<len;i++) {
                var item = items[i].split(':');
                item[1] = '<span class="'+cla+'">' + item[1] + '</span>';
                items[i] = item.join(":");
            }
            val = items.join(";");
            return val;
        },
        goBack(){
          this.$router.push({path:'/homePage'})
        },
        // 患者管理数据
        getAllPatient: function (currentpage, pageSize, keyNames, countType, typesss) {
            var that = this;
            if (keyNames === undefined) {
                keyNames = '';
            }
            if (typesss === undefined) {
                typesss = '';
            }
            var data = {
                currentPage:currentpage,
                pageSize:pageSize,
                keyName:keyNames,
                countType:countType,
                diabetesType:typesss
            }
            this.$api.pagedQuerySugerHighLowCustomerList(data, res => {
                if (res.status == 200) {
                    if (res.data.data) {
                        that.totalNums = res.data.data.totalNum;
                        
                        //处理获取的数据(添加颜色代码、新增属性用于鼠标悬浮测量详情上的显示)
                        var sd = res.data.data.items;
                        that.sugarInfoList = [];
                        sd.map(function (e) {
                            e.showSugarInfo = e.sugarInfo;
                        	e.sugarInfo = that.handleSugarVal(e.sugarInfo);
                        });
                        that.sugarData = sd;
                    }
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        birthday_(data) {
            var that = this;
            return that.jsGetAge(that.formatDate(data.birthday)) !== '' && that.jsGetAge(that.formatDate(data.birthday)) !== undefined ? that.jsGetAge(that.formatDate(data.birthday)) : ''
        },
        stringType(data) {
            return data.diabetesType ? data.diabetesType : '无'
        },
        searchs() {
            var that = this;

            //   根据条件查询患者列表
            // 当搜索出患者默认为从第一页开始
            that.currentPage4 = 1;
            that.getAllPatient(that.currentPage4, that.pagesize, that.keyNames, that.countType, that.typesss);
        },
        //批量干预
        batInter() {
            if (this.AOC.length > 0) {
                let target = this.$parent.$refs.batchInter;
                target.ifBaInter = true;
                //默认保存模板为不勾选
                target.checkedss = false;
                //清空模板名称
                target.ruleForm.temName = "";
                //默认立即发送
                target.radio4 = 1;
                //干预类型接口
                funBus.getInterType(target);
                // 清空方案名称
                target.options = "";
                // 清空干预类型
                target.ruleForm.type = "";
                //默认干预方式为微信
                target.ruleForm.typeWay = "";
                //第三方代替储存
                target.ruleForm.multi = this.AOC;
                //类型方式 微信、电话、qq
                funBus.getTypeWays(target);
                target.origin = this;
            } else {
                this.$message('请先选择患者');
            }
        },
        // 批量提醒
        batRemind() {
            let target = this.$parent.$refs.batchRemind;
            if (this.AOC.length > 0) {
                target.origin = this;
                target.ifBatchRemind = true;
                // 隐藏new Tag
                target.newAdds = false;
                //默认干预方式为微信
                target.ruleForm.typeWay = "";
                //类型方式 微信、电话、qq
                funBus.getTypeWays(target);
                //第三方代替储存
                target.ruleForm.multi = this.AOC;
                //清空内容和模板Id
                target.radio_ = "";
                target.templateId_ = "";
                target.ruleForm.recont = "";
                //快捷回复
                funBus.dynamic(target);
            } else {
                this.$message('请先选择患者');
            }
        },
        //推送提醒
        newRemind(row) {
            let remindDialog = this.$parent.$refs.remindDialog;
            remindDialog.ifnewRemind = true;
            remindDialog.customerId = row.customerId;
            funBus.getPatients(remindDialog, row.customerId); // 获取患者信息            
        },
        //健康干预
        intermeddle(row) {
            let interventionDialog = this.$parent.$refs.interventionDialog;
            interventionDialog.ifHealthInter = true;
            interventionDialog.customerId = row.customerId;
            funBus.getPatients(interventionDialog, row.customerId); // 获取患者信息
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.countType, this.typesss);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage4 = val;
            this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.countType, this.typesss);
        },
        //表格
        handleSelectionChange(val) {
            this.AOC = val;
        },
        //清空
        clear() {
            this.typesss = "";
            this.keyNames = "";
            var that = this;
            //清空默认跑到第一页
            this.currentPage4 = 1;
            this.getAllPatient(that.currentPage4, that.pagesize, '', that.countType, '');
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
        // 患者新建随访
        newFollow (row) {
          let followUpDialog = this.$parent.$refs.followUpDialog;
          followUpDialog.ifFolPlan = true;
          followUpDialog.customerId = row.customerId;
          funBus.getPatients(followUpDialog, row.customerId); // 获取患者信息
        },
        // 点击批量随访
        batFollow () {
            let _this = this;
            if (this.AOC.length > 0) {
                //获取session信息
                let useInfo = sessionStorage.getItem('user');
                //获取机构ID
                let organizationId = JSON.parse(useInfo).organizationId;
                let target = this.$parent.$refs.batchFollowUp;
                target.ifBatchFollow = true;
                target.origin = _this;
                //第三方代替储存
                target.ruleForm.multi = this.AOC;
                target.geFollowplaners({organizationId: organizationId});
                target.getFollowTemplate({});
            } else {
                this.$message('请先选择患者');
            }
        }
    }
}
</script>

<style>
/*低血糖值显示颜色*/
.lowSugarColor{
    color:#e98559;
}
/*高血糖值显示颜色*/
.highSugarColor{
    color:#e95959;
}
/*高低血糖列表——测量详情*/
.sugarScoped {
    margin: 0 auto;
    width: 99%;
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
.searc_med {
    width: 250px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.mainss {
    padding: 20px 0 0;
}
.batch {
    width: 80px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 4px;
    font-size: 14px;    
    border: solid 1px rgba(206, 206, 206, 0.7);
    display: inline-block;
}
.intervention {
    margin-left: 30px;
    display: inline-block;
}
.labelling {
    padding: 20px 0;
}
.labelling span {
    display: inline-block;
}
.labelling .el-checkbox-group {
    display: inline-block;
}

.sex {
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 30px;
}
.AdvanSearch {
    margin-top: 20px;
}
.tops {
    font-size: 14px;
    width: 100%;
    padding: 2px 0 21px 0;
    border-bottom: 1px solid #f1f1f1;
}
.tops span {
    padding: 0 15px;
}


input {
    cursor: pointer;
    outline: none;
}
select {
    cursor: pointer;
    outline: none;
}
.sugarManage {
    position: absolute;
    top: 60px;
    /*width: 89.5%;*/
    width: calc( 100% - 180px);
    left: 160px;
    padding: 19px 0 19px 20px;
    background: #f7f8fa;
}
@media screen and (max-width:1500px) {
    .sugarManage {
        width: calc( 100% - 150px)!important;
        left: 130px !important;
    }
}

.managess {
    width: 100%;
    box-sizing: border-box;
    min-height: 812px;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
}


.el-radio + .el-radio {
    margin-left: 0 !important;
}
.btn-back {
  width: 80px;
  height: 24px;
  background-color: #267bf7;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
  float: right;
  text-align: center;
  margin-right: 20px;
}
</style>
