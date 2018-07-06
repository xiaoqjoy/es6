<template>
    <div>
        <!--机构科室tree-->
        <div class="treeNode" v-if="isShowDept">
            <div class="treeNodeBox">
                <div class="allPatientTitle active" @click="queryAllPatient" v-text="'● 全部患者（'+totalPatient+'）'"></div>
                <el-tree :props="props"  highlight-current :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
        <my-load :loading="loading" :msg="msg"></my-load>
        <!--管理员样式manage；一般用户样式manage-person-->
        <div :class="isShowDept?'manage':'manage-person'">
            <h3>患者管理</h3>
            <div class="managess contentBorder">
                <div class="tops">
                    <el-input v-model="keyNames" placeholder="档案号/姓名/身份证/手机号" size="small" class="searc_med"></el-input>
                    <el-select size="small" v-model="typesss" placeholder="全部类型" style="width: 170px;">
                        <el-option v-for="item in diabetesType" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                            {{item.itemValue}}
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="noTestTypeValue" placeholder="未测量周期" style="width: 170px;" @change="changNoTestType">
                        <el-option v-for="item in noTestType" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                            {{item.itemValue}}
                        </el-option>
                    </el-select>
                    <span>建档时间：</span>
                    <el-date-picker size="small" class="datetime_med" v-model="JTimeStart" type="datetime" style="width: 184px;" placeholder="选择日期时间">
                    </el-date-picker>
                    <span>至</span>
                    <el-date-picker size="small" class="datetime_med" v-model="JTimeEnd" style="width: 184px;" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>

                    <div class="search" @click="searchs">搜索</div>
                    <div class="clear" @click="clear">清空</div>
                    <span class="advanced" @click="advanced">{{search}}</span>
                    <div class="addPatient" v-if="isShowAddBtn" @click="addPatient">添加患者</div>
                    <!--高级搜索-->
                    <div class="AdvanSearch" v-show="ifAdvanSearch">
                        <span>性别：</span>
                        <el-select size="small" v-model="sexs" placeholder="请选择性别" style="margin-right:20px;width: 90px;">
                            <el-option v-for="item in sexs_" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                            </el-option>
                        </el-select>
                        <span>年龄：</span>
                        <el-input size="small" v-model="ageStart" placeholder="" style="width: 60px;"></el-input>
                        <span>至</span>
                        <el-input size="small" v-model="ageEnd" placeholder="" style="width: 60px;"></el-input>
                        <span>岁</span>
                        <div class="intervention">
                            <span>最近干预：</span>
                            <el-date-picker size="small" v-model="startTime" type="datetime" style="width: 184px;" placeholder="选择日期时间">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker size="small" v-model="endTime" type="datetime" style="width: 184px;" placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                        <div class="labelling">
                            <span style="vertical-align: middle;">标签：</span>
                            <el-checkbox-group size="small" v-model="checkList">
                                <el-checkbox-button v-for="it in patientTags" :label="it.tagId" :key="it.tagId">{{it.tagName}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                    </div>

                </div>
                <div class="mainss">
                    <div class="batch" @click="batInter()">批量干预</div>
                    <div class="batch" @click="batRemind()">批量提醒</div>
                    <div class="batch" @click="batFollow()">批量随访</div>
                    <!--表格-->
                    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;border-left:1px solid #eff2f5;border-right:1px solid #eff2f5;border-top: 1px solid #eff2f5" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column fixed width="150" label="档案号" align="center">
                            <template slot-scope="scope">{{ scope.row.fileNumber }}</template>
                        </el-table-column>
                        <el-table-column label="姓名" width="140" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="birthday" label="年龄" width="100" :formatter="birthday_" align="center">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" width="160" align="center">
                        </el-table-column>
                        <el-table-column prop="diabetesType" label="类型" width="160" :formatter="stringType" align="center">
                        </el-table-column>
                        <el-table-column prop="createFileDate" label="建档时间" width="160" :formatter="JTimeS_" align="center">
                        </el-table-column>
                        <el-table-column prop="lastInterventionTime" label="最后一次干预时间" width="160" :formatter="lastInt_" align="center">
                        </el-table-column>
                        <el-table-column prop="userName" label="服务医生" width="130" align="center">
                        </el-table-column>
                        <el-table-column prop="tags" label="标签" width="160" align="center" show-overflow-tooltip>
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
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNums">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//年龄转化为日期
var ageForDate = function (ageStart) {
    var myDate = new Date();
    var year = myDate.getFullYear() - ageStart;
    var month = myDate.getMonth() + 1;
    var dates = myDate.getDate();
    return (year - 1).toString() + '-' + month.toString() + '-' + dates.toString()
}


global.pageSize = 1000;
import funBus from '../../assets/js/funBus'

export default {
    name: 'patient',
    data() {
        return {
            isShowDept: false, // 是否显示机构树形列表
            //organAndCustomerList: [],
            props: {
                label: 'name', // 名称
                organizationId: 'organizationId', //机构主键ID
                type: "type", //机构类型(int)， 1：机构，2：科室,
                count: "count", //患者数量(int)
                children: 'children'
            },
            systemCode: '', // 科室编号ID
            isShowAddBtn: true, // 是否显示添加患者按钮
            loading: false, // 加载
            msg: '加载中…',
            tags: '',
            sexs: '',
            typesss: '',
            noTestTypeValue: '',
            noTestType: [], // 未测量周期
            noSugarTestType:'', //查询未测量时间段的类型
            add: '',
            checkList: [],
            patientTags: "",
            sexs_: [{
                    itemValue: "男",
                    itemKey: "1"
                },
                {
                    itemValue: "女",
                    itemKey: "2"
                }
            ],
            totalNums: 0,
            diabetesType: "", // 糖尿病类型(搜索栏)
            ageStart: "",
            ageEnd: "",
            JTimeStart: "",
            JTimeEnd: "",
            startTime: "",
            endTime: "",
            keyNames: "",
            ifAdvanSearch: false,
            search: "高级搜索",
            //表格
            tableData3: [],
            currentPage4: 1,
            pagesize: 15,
            AOC: "",
            totalPatient: 0,
            howFrom:''
        }
    },
    created: function () {
        var user = JSON.parse(sessionStorage.getItem('user'));
        this.howFrom = this.$route.query.from ? this.$route.query.from : '';
        this.isShowAddBtn = user.existDepartment; //是否显示添加患者按钮

        if (user.dataRange == 3) { //1个人权限；2科室权限；3机构权限
            //是否显示机构树形结构
            this.isShowDept = true;

            //统计患者数量
            var count=0;
            let ol = sessionStorage.getItem('orgList');
            if (ol.length>0) {
              ol = JSON.parse(ol);
              for (let i=0,len=ol.length;i<len;i++) {
                  count+=ol[i].count;
              }
              this.totalPatient = count;
            }
        }
        if (this.howFrom == 'weekNoGauged') {
            this.noSugarTestType = '2';
            this.noTestTypeValue = '七天未测量';
        }  else {
            this.noSugarTestType = '1';
        }

        if (this.$route.query.startTime) {
            this.JTimeStart = this.$route.query.startTime
            this.JTimeEnd = this.$route.query.endTime
            let add = ''
            add += '&startInterventionDate=' + ' '
            add += '&endInterventionDate=' + ' '
            add += '&startCreateFileDate=' + this.$route.query.startTime
            add += '&endCreateFileDate=' + this.$route.query.endTime
            this.getAllPatient(this.currentPage4, this.pagesize, '', '', '', '', add, this.systemCode);
        } else {
            // 查询患者数据
            this.clear();
        }
    },
    afterMounted: function () {
        // console.log(https)
    },
    mounted: function () {
        let that = this;
        var useInfo = sessionStorage.getItem('user');
        var userId = JSON.parse(useInfo).userId;
        var data = {
            userId:userId
        }
        //患者标签
        funBus.getPatientTags(that);
        //获取糖尿病类型
        funBus.getDiabetesType(that);
        // 未测量时段类型
        that.$api.dictionarys({typeCode:'noSugarTestType'},res=> {
            if (res.data.data) {
                that.noTestType = res.data.data;
            }
        }).catch(function (err) {
            that.message = err;
        })
        //标签
        that.$api.queryUserTag(data, res => {
            if (res.status == 200) {
                if (res.data.data) {}
            }
        }).catch(function (err) {
            console.log(err)
        })
    },
    methods: {
        queryAllPatient() { //机构科室tree，全部患者
            this.systemCode = '';
            //this.getAllPatient(1, this.pagesize, '', '', '', '', '', this.systemCode);
            this.clear();

            //全部患者添加高亮
            document.getElementsByClassName('allPatientTitle')[0].classList.add('active');
            //去掉数结构上的高亮效果
            var cl = document.getElementsByClassName('is-current');
            if (cl.length>0) {
                cl[0].classList.remove("is-current");
            }
        },
        handleNodeClick(data) { // 根据点击的科室，载入患者
            if (data.type == 2) { // 1机构，2科室
                this.systemCode = data.systemCode;
                //加载患者列表
                this.getAllPatient(1, this.pagesize, '', '', '', '', '', data.systemCode);
            }
            //全部患者清除高亮
            document.getElementsByClassName('allPatientTitle')[0].classList.remove('active');
        },
        loadNode(node, resolve) { //机构载入事件
            //预加载顶级
            if (node.level === 0) {
            var ol = sessionStorage.getItem('orgList');
            if (ol.length>0) {
                return resolve(JSON.parse(ol));
            }
            return;
            }

            var that = this;
            var oid = node.data.organizationId || '';
            var data = {organizationId:oid};
            setTimeout(() => {
                that.$api.queryOrganAndCustomerCountList(data, res => {
                    var dataSet = res.data;
                    if (dataSet.code == 0) {
                        dataSet.data.map(function (e) {
                            e.name += '（'+e.count+'）';
                        });
                        resolve(dataSet.data);
                    }
                });
            }, 200);
        },

        // //选择时间验证
        // selectTime(){
        //   if(this.JTimeStart > this.JTimeEnd ){
        //     this.$message('搜索时间必须大于起始时间')
        //   }
        // },
        // 患者管理数据
        getAllPatient: function (currentpage, pageSize, keyNames, tags, sexs, typesss, add, systemCode) {
            var that = this;
            if (keyNames === undefined) {
                keyNames = '';
            }
            if (tags === undefined) {
                tags = '';
            }
            if (sexs === undefined) {
                sexs = '';
            }
            if (sexs !== "") {
                sexs = JSON.parse(sexs);
            }
            if (typesss === undefined) {
                typesss = '';
            }
            if (add === undefined) {
                add = '';
            }
            if (systemCode === undefined) {
                systemCode = '';
            }
            let data = {
                    currentPage:currentpage,
                    pageSize:pageSize,
                    keyName:keyNames,
                    tagIds:tags,
                    sex:sexs,
                    diabetesType:typesss,
                    add,
                    systemCode:systemCode,
                    noSugarTestType: this.noSugarTestType
                }
            this.$api.pagedQueryLists(data,res=> {
                if (res.status == 200) {
                    if (res.data.data) {
                        that.tableData3 = res.data.data.items;
                        that.totalNums = res.data.data.totalNum;
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
        lastInt_(data) {
            return this.formatDate(data.lastInterventionTime) ? this.formatDate(data.lastInterventionTime) : '无'
        },
        JTimeS_(data) {
            //          var d = new data(data.createFileDate)
            return this.formatDate(data.createFileDate) ? this.formatDate(data.createFileDate) : '无'
        },
        stringType(data) {
            return data.diabetesType ? data.diabetesType : '无'
        },
        searchs() {
            var that = this;
            //清空
            that.add = "";
            if (that.startTime !== "") {
                if (that.startTime > that.endTime) {
                    that.$message('起始时间必须小于结束时间')
                } else {
                    that.add += '&startInterventionDate=' + that.formatDate(that.startTime); //'Tue, 23 Jan 2018 12:48:48 GMT'
                }
            }
            if (that.endTime !== "") {
                if (that.startTime > that.endTime) {
                    that.$message('结束时间必须大于起始时间')
                } else {
                    that.add += '&endInterventionDate=' + that.formatDate(that.endTime);
                }
            }
            if (that.JTimeStart !== "") {
                if (that.JTimeStart > that.JTimeEnd) {
                    that.$message('起始时间必须小于结束时间')
                } else {
                    that.add += '&startCreateFileDate=' + that.formatDate(that.JTimeStart);
                }
            }
            if (that.JTimeEnd !== "") {
                if (that.JTimeStart > that.JTimeEnd) {
                    that.$message('结束时间必须大于起始时间')
                } else {
                    that.add += '&endCreateFileDate=' + that.formatDate(that.JTimeEnd);
                }
            }
            if (that.ageStart !== "") {
                //年龄转化为日期
                // console.log(ageForDate(JSON.parse(that.ageStart)));
                // that.add += "&endAge=" + ageForDate(JSON.parse(that.ageStart));
                if ((/^([1-9]\d*|[0]{1,1})$/).test(that.ageStart) && Number(that.ageEnd) > Number(that.ageStart)) {
                    that.add += "&startAge=" + that.ageStart
                } else {
                    that.$message('输入年龄必须为数字且小于结束年龄的整数')
                }
            }
            if (that.ageEnd !== "") {
                // that.add += "&startAge=" + ageForDate(JSON.parse(that.ageEnd));
                if ((/^([1-9]\d*|[0]{1,1})$/).test(that.ageEnd) && Number(that.ageEnd) > Number(that.ageStart)) {
                    that.add += "&endAge=" + that.ageEnd
                } else {
                    that.$message('必须为数字且大于起始年龄的整数')
                }
            }
            that.tags = that.checkList;
            //   根据条件查询患者列表
            // 当搜索出患者默认为从第一页开始
            that.currentPage4 = 1;
            this.getAllPatient(that.currentPage4, that.pagesize, that.keyNames, that.tags, that.sexs, that.typesss, that.add, that.systemCode);
        },
        addPatient() {
            this.$router.push("/patientManage/addPatient");
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
        handleClick(row) {
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
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.tags, this.sexs, this.typesss, this.add, this.systemCode);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage4 = val;
            this.getAllPatient(this.currentPage4, this.pagesize, this.keyNames, this.tags, this.sexs, this.typesss, this.add, this.systemCode);
        },
        advanced() {
            this.ifAdvanSearch = !this.ifAdvanSearch;
            (this.search == "高级搜索") ? this.search = "收起": this.search = "高级搜索";
        },
        //表格
        handleSelectionChange(val) {
            this.AOC = val;
        },
        //清空
        clear() {
            this.checkList = [];
            this.JTimeStart = "";
            this.JTimeEnd = "";
            this.typesss = "";
            this.add = "";
            this.keyNames = "";
            this.tags = '';
            this.sexs = "";
            this.ageStart = "";
            this.ageEnd = "";
            this.startTime = "";
            this.endTime = "";
            var that = this;
            //清空默认跑到第一页
            this.currentPage4 = 1;
            this.getAllPatient(that.currentPage4, that.pagesize, that.keyNames, that.tags, that.sexs, that.typesss, that.add, that.systemCode);

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
        },
        changNoTestType () {
            this.noSugarTestType = this.noTestTypeValue;
        }
    }
}
</script>

<style scoped>
.searc_med {
    width: 250px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.block {
    /*height: 90px;*/
    text-align: right;
    margin-top: 20px;
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
.addPatient {
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
.advanced {
    color: #267bf7;
    cursor: pointer;
}
.ipt {
    text-align: center;
    width: 112px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
}
input {
    cursor: pointer;
    outline: none;
}
select {
    cursor: pointer;
    outline: none;
}
.manage {
    position: absolute;
    top: 60px;
    /*width: 89.5%;
    left: 160px;*/
    width: calc( 100% - 180px - 200px);
    left: 360px;
    padding: 19px 0 19px 20px;
    background: #f7f8fa;
}
.manage-person {
    position: absolute;
    top: 60px;
    width: calc( 100% - 180px);
    left: 160px;
    padding: 19px 0 19px 20px;
    background: #f7f8fa;
}
@media screen and (max-width:1500px) {
    .manage {
        /*宽度 = 100%-leftNav宽度-部门科室栏宽度*/
        width: calc( 100% - 150px - 200px)!important;
        left: 330px !important;
        /*width: calc( 100% - 150px)!important;*/
        /*left: 130px !important;*/
    }
    .manage-person {
        /*宽度 = 100%-leftNav宽度-部门科室栏宽度*/
        width: calc( 100% - 150px)!important;
        left: 130px !important;
    }
}

h3 {
    font-size: 14px;
    color: #267bf7;
}
.managess {
    width: 100%;
    box-sizing: border-box;
    min-height: 812px;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
}
.name {
    width: 200px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 10px;
}
.name-placeholder {
    color: #999999;
}
.styles {
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 20px;
}
.styles option {
    text-align: center;
}

/**/

.boot-select {
    float: right;
    width: 80px;
}
.boot-nav {
    float: right;
}
.boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
}
.page-total {
    display: inline-block;
    vertical-align: middle;
}
.el-radio + .el-radio {
    margin-left: 0 !important;
}

.treeNode {
    background: #fff;
    z-index: 20;
    position: fixed;
    left: 162px;
    top: 0;
    height: 100vh;
    width: 200px;
    padding-top: 60px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -webkit-box-shadow: 3px 0px 3px 0px rgba(129, 156, 173, 0.1);
    box-shadow: 3px 0px 3px 0px rgba(129, 156, 173, 0.1);
}
@media screen and (max-width:1500px) {
  .treeNode {
    left: 132px !important;
  }
}

.treeNodeBox {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.allPatientTitle {
    /*color: #267BF7;*/
    color: #8b9eba;
    font-weight: bold;
    font-size: 15px;
    padding-left: 9px;
    line-height: 40px;
    cursor: pointer;
}
.allPatientTitle:hover {
    background-color: #f5f7fa;
}
.allPatientTitle.active{
    background-color: #f0f7ff;
    color: #267BF7;
}
</style>

<style lang="less">
/*重写覆盖elemeng-ui原有样式*/
/*---------------------*/
.treeNode .el-tree-node__loading-icon {
    margin-right: 5px;
    margin-left: 5px;
}
.treeNode .el-tree-node__content {
    height: 40px!important;
}

/*子级：左缩进*/
.treeNode .el-tree-node__content .el-tree-node__label {
    padding-left: 8px;
}
/*子级：前置icon*/
.treeNode .el-tree-node__content .el-tree-node__label:before {
    content: '● ';
    font-size: 14px;
    font-weight: bold;
}
/*无子级后的箭头cion*/
.treeNode .el-tree-node__content .el-tree-node__expand-icon.is-leaf {
    color: transparent!important;;
    cursor: default;
}
.treeNode .el-tree-node__content span {
    color: #8b9eba;
    font-size: 14px!important;
    line-height: 40px;
}
/*箭头icon位置*/
.treeNode .el-tree-node__content .el-tree-node__expand-icon {
    position: absolute;
    right: 10px;
}
/*更换默认的箭头icon*/
.treeNode .el-tree-node__content .el-icon-caret-right:before {
    content: "\E604"!important;
}

/*顶级：颜色与粗体*/
.treeNode .el-tree > .el-tree-node > .el-tree-node__content span {
    /*color: #267BF7;*/
    font-weight: bold;
}
/*顶级：前置icon*/
.treeNode .el-tree > .el-tree-node > .el-tree-node__content  > .el-tree-node__label:before {
    content: '○ ';
}
.treeNode .el-tree .is-current>.el-tree-node__content>span {
    color: #267BF7;
}
</style>
