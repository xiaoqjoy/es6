<template>
  <div>
    <!--机构科室tree-->
    <div class="treeNode" v-if="isShowDept">
      <div class="scrollBar treeNodeBox">
        <div class="allPatientTitle active" @click="queryAllPatient" v-text="'● 全部患者（'+totalPatient+'）'"></div>
        <el-tree :props="props" highlight-current :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <!--<my-load :loading="loading" :msg="msg"></my-load>-->
    <!--管理员样式manage；一般用户样式manage-person-->
    <div class="positionContent" :class="{manage: isShowDept}">
      <h3>患者管理</h3>
      <div class="managess contentBorder">
        <div class="tops">
          <el-input v-model="keyNames" placeholder="档案号/姓名/身份证/手机号" size="small" class="searc_med" style="margin-bottom: 10px;"></el-input>
          <el-select size="small" v-model="diabetesType" placeholder="全部类型" style="width: 140px;">
            <el-option v-for="item in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="noSugarTestType" placeholder="全部患者" style="width: 150px;">
            <el-option v-for="item in noSugarTestTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-if='isShowSearchDrop' v-model="doctorId" placeholder="服务医生" style="width: 140px;">
            <el-option v-for="item in doctorList" :key="item.userId" :label="item.nickname" :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
          <el-select size="small" v-if='isShowSearchDrop' v-model="nurseId" placeholder="教育护士" style="width: 140px;">
            <el-option v-for="item in nurseList" :key="item.userId" :label="item.nickname" :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>

          <div class="search" @click="searchs">搜索</div>
          <div class="clear" @click="clear">清空</div>
          <span class="advanced" @click="ifAdvanSearch = !ifAdvanSearch" v-text='ifAdvanSearch?"收起":"高级搜索"'></span>
          <div class="addPatient" v-if="!isNurse" @click="addPatient">添加患者</div>
          <!--高级搜索-->
          <div class="AdvanSearch" v-show="ifAdvanSearch">
            <el-select size="small" v-model="sexs" placeholder="性别" style="margin-right:20px;width: 80px;">
              <el-option v-for="item in sexArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey"></el-option>
            </el-select>
            <span>年龄：</span>
            <el-input size="small" v-model="ageStart" style="width: 55px;"></el-input>
            <span>至</span>
            <el-input size="small" v-model="ageEnd" style="width: 55px;"></el-input>
            <span>岁</span> &nbsp;&nbsp;&nbsp;
            <div class="intervention" style="margin-bottom: 10px;">
              <span>建档时间：</span>
              <el-date-picker size="small" v-model="JTimeStart" type="datetime" style="width: 164px;" placeholder="选择日期时间" :picker-options="pickerOptionsJTimeStart">
              </el-date-picker>
              <span>至</span>
              <el-date-picker size="small" v-model="JTimeEnd" type="datetime" style="width: 164px;" placeholder="选择日期时间" :picker-options="pickerOptionsJTimeEnd">
              </el-date-picker>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div class="intervention">
              <span>最近干预：</span>
              <el-date-picker size="small" v-model="startTime" type="datetime" style="width: 164px;" placeholder="选择日期时间" :picker-options="pickerOptionsStartTime">
              </el-date-picker>
              <span>至</span>
              <el-date-picker size="small" v-model="endTime" type="datetime" style="width: 164px;" placeholder="选择日期时间" :picker-options="pickerOptionsEndTime">
              </el-date-picker>
            </div>
            <!--
            <div class="labelling">
              <span style="vertical-align: middle;">标签：</span>
              <el-checkbox-group size="small" v-model="checkList">
                <el-checkbox-button v-for="it in patientTags" :label="it.tagId" :key="it.tagId">{{it.tagName}}
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
            -->
          </div>

        </div>
        <div class="mainss">
          <div class="batch" @click="batchHandle('inter')">批量干预</div>
          <div class="batch" @click="batchHandle('remind')">批量提醒</div>
          <div class="batch" @click="batchHandle('follow')">批量随访</div>
          <div class="batch" @click="changeDoctor()" v-if="isAdmin">更改医生</div>
          <div class="batch" @click="delPatient" v-if="isAdmin">批量删除</div>
          <!--表格-->
          <el-table class="multipleTable" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="margin-top: 20px;width: 100%;border-left:1px solid #eff2f5;border-right:1px solid #eff2f5;border-top: 1px solid #eff2f5" @selection-change="handleSelectionChange" @select-all="ifCheckedAll">
            <el-table-column fixed width="80" label="选择" type="selection">
            </el-table-column>
            <!--
            <el-table-column fixed width="150" label="档案号" align="center">
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
            <el-table-column prop="birthday" label="年龄" width="100" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="120" align="center">
            </el-table-column>
            <el-table-column prop="diabetesType" label="类型" width="160" align="center">
            </el-table-column>
            <!--
            <el-table-column prop="createFileDate" label="建档时间" width="140" align="center">
            </el-table-column>
            -->
            <el-table-column prop="lastInterventionTime" label="最后干预时间" width="140" align="center">
            </el-table-column>
            <el-table-column prop="doctorName" label="服务医生" align="center">
            </el-table-column>
            <el-table-column prop="nurseName" label="教育护士" align="center">
            </el-table-column>
            <!--
            <el-table-column prop="tags" label="标签" width="160" align="center" show-overflow-tooltip>
            </el-table-column>
            -->
            <el-table-column label="操作" width="160" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button @click="intermeddle(scope.row)" type="text" size="small">干预</el-button>
                <el-button @click="newRemind(scope.row)" type="text" size="small">提醒</el-button>
                <el-button @click="newFollow(scope.row)" type="text" size="small">随访</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block" style="width: 100%; overflow: hidden;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--更改医生弹窗-->
    <div v-if="isChangeDoctor">
      <el-dialog title="更改医生" :visible.sync="isChangeDoctor" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="handleClose" width="320px">
      <p style="font-size: 15px; margin-bottom: 20px;">&nbsp;&nbsp;确定要修改当前选中的 <span v-text="AOC.length" style="color: red;"></span> 位患者吗？</p>
      <el-form :model="changeDoctorForm" :rules="changeRules" ref="changeDoctorForm" label-width="90px">
        <el-form-item label="服务医生:" prop="doctorId">
          <el-select size="small" v-model="changeDoctorForm.doctorId" placeholder="请选择服务医生" style="width: 180px;">
            <el-option v-for="item in doctorList" :key="item.userId" :label="item.nickname" :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教育护士:" prop="nurseId">
          <el-select size="small" v-model="changeDoctorForm.nurseId" placeholder="请选择教育护士" style="width: 180px;">
            <el-option v-for="item in nurseList" :key="item.userId" :label="item.nickname" :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitChangeDoctor('changeDoctorForm')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import funBus from '../../assets/js/funBus'

  export default {
    name: 'patient',
    data() {
      return {
        isNurse: false, //登陆用户是否护士
        isAdmin: false, //是否管理员
        isShowDept: false, // 是否显示机构树形列表
        isShowSearchDrop: true, // 搜索栏是否显示服务医生与教育护士下拉
        //organAndCustomerList: [],
        props: {
          label: 'name', // 名称
          organizationId: 'organizationId', //机构主键ID
          type: "type", //机构类型(int)， 1：机构，2：科室,
          count: "count", //患者数量(int)
          children: 'children'
        },
        systemCode: '', // 科室编号ID
        //loading: false, // 加载
        msg: '加载中…',
        //tags: '',
        sexs: '',
        diabetesType: '',
        noSugarTestTypeArr: [], // 未测量周期
        doctorArray: [], //服务医生数组
        doctorId: '', // 服务医生id
        nurseArray: [], //教育护士数组
        nurseId: '', // 教育护士id
        noSugarTestType: 1, //查询未测量时间段的类型(1-全部患者；2-7天为测量；3-3天未测量)
        add: '',
        //checkList: [], //搜索栏所选的标签
        //patientTags: "", //标签数组
        sexArr: [{
            itemValue: "男",
            itemKey: "1"
          },
          {
            itemValue: "女",
            itemKey: "2"
          }
        ],
        totalNum: 0,
        diabetesTypeArr: [], // 糖尿病类型(搜索栏)
        ageStart: "",
        ageEnd: "",
        JTimeStart: "",
        JTimeEnd: "",
        startTime: "",
        endTime: "",
        keyNames: "", //搜索栏搜索关键词
        ifAdvanSearch: false, // 是否显示高级搜索
        pickerOptionsJTimeStart: {
          disabledDate: (time) => {
            if (this.JTimeEnd != "") {
              return time.getTime() > Date.now() || time.getTime() > this.JTimeEnd;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptionsJTimeEnd: {
          disabledDate: (time) => {
            return time.getTime() < this.JTimeStart || time.getTime() > Date.now();
          }
        },
        pickerOptionsStartTime: {
          disabledDate: (time) => {
            if (this.endTime != "") {
              return time.getTime() > Date.now() || time.getTime() > this.endTime;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptionsEndTime: {
          disabledDate: (time) => {
            return time.getTime() < this.startTime || time.getTime() > Date.now();
          }
        },
        //表格
        tableData3: [],
        currentPage4: 1,
        pagesize: 15,
        AOC: "",
        totalPatient: 0,
        isAllPatient: false, // 是否全选患者
        isChangeDoctor: false, // 是否显示修改医生弹窗
        doctorList: [], //更改医生弹窗的医生列表
        nurseList: [], //更改医生弹窗的护士列表
        changeDoctorForm: { //更改医生
          doctorId: '',
          nurseId: '',
        },
        changeRules: {
          doctorId: [{
            required: true,
            message: '请选择医生',
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      let user = JSON.parse(sessionStorage.getItem('user'));

      //roleType:1医生；2护士；3管理员
      this.isNurse = user.roleType == '2' ? true : false;
      this.isAdmin = user.roleType == '3' ? true : false;

      let args = this.$route.query;
      if (!!args.from && args.from == 'weekNoGauged') {
        this.noSugarTestType = 2;
      }
      if (!!args.dates && args.dates == 'today') {
        let today = this.formatDate(Date.parse(new Date()));
        this.JTimeStart = today.split(' ')[0] + ' 00:00:00';
        this.JTimeEnd = today.split(' ')[0] + ' 23:59:59';
      }
      this.getAllPatient();

      if (user.dataRange == 3) { //1个人权限；2科室权限；3机构权限
        //是否显示机构树形结构
        this.isShowDept = true;

        //统计患者数量
        var count = 0;
        if (!!sessionStorage.getItem('orgList')) {
          let ol = JSON.parse(sessionStorage.getItem('orgList'));
          for (let i = 0, len = ol.length; i < len; i++) {
            count += ol[i].count;
          }
          this.totalPatient = count;
        }
      } else if (user.dataRange == 1) { //个人权限
        this.isShowSearchDrop = false; // 搜索栏不显示服务医生与教育护士下拉
      }

      let data = {
        organizationId: user.organizationId,
      }
      funBus.queryUserList(this, data); //获取服务医生、教育护士

    },
    mounted: function () {
      let that = this;
      //搜索栏患者标签
      //funBus.getPatientTags(that);
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
      funBus.getDictionarysByTypeCode(that, 'noSugarTestType'); //未测量时段类型
    },
    methods: {
      queryAllPatient() { //机构科室tree，全部患者
        this.systemCode = '';
        this.clear();

        //全部患者添加高亮
        document.getElementsByClassName('allPatientTitle')[0].classList.add('active');
        //去掉数结构上的高亮效果
        var cl = document.getElementsByClassName('is-current');
        if (cl.length > 0) {
          cl[0].classList.remove("is-current");
        }
      },
      handleNodeClick(data) { // 根据点击的科室，载入患者
        if (data.type == 2) { // 1机构，2科室
          this.systemCode = data.systemCode;
          //加载患者列表
          this.clear();
        }
        //全部患者清除高亮
        document.getElementsByClassName('allPatientTitle')[0].classList.remove('active');
      },
      loadNode(node, resolve) { //机构载入事件
        //预加载顶级
        if (node.level === 0) {
          var ol = sessionStorage.getItem('orgList');
          if (ol.length > 0) {
            return resolve(JSON.parse(ol));
          }
          return;
        }

        setTimeout(() => {
          if (node.data.type == 1) { // 点击的节点如为机构，则获取机构的下级机构或科室； 1:机构，2:科室
            var that = this;
            var data = {
              organizationId: node.data.organizationId || ''
            };
            that.$api.queryOrganAndCustomerCountList(data, res => {
              if (res.data.code == 0) {
                res.data.data.map(function (e) {
                  e.name += '（' + e.count + '）';
                });
                resolve(res.data.data);
              }
            });
          } else { //科室节点
            resolve([]);
          }
        }, 200);
      },
      //设置查询参数
      setSearchParam() {
        let vm = this;
        return {
          currentPage: vm.currentPage4, //当前页码
          pageSize: vm.pagesize,
          //tagIds: vm.tags, //标签
          keyName: vm.keyNames, //关键词
          diabetesType: vm.diabetesType, //糖尿病类型
          noSugarTestType: vm.noSugarTestType, //未测量类型
          doctorId: vm.doctorId, //服务医生
          nurseId: vm.nurseId, //教育护士
          sex: vm.sexs, //性别
          systemCode: vm.systemCode, //科室id
          startAge: vm.ageStart, //开始年龄
          endAge: vm.ageEnd, //结束年龄
          startCreateFileDate: !!vm.JTimeStart ? vm.formatDate(vm.JTimeStart) : '', //建档时间起始
          endCreateFileDate: !!vm.JTimeEnd ? vm.formatDate(vm.JTimeEnd) : '', //建档时间截止
          startInterventionDate: !!vm.startTime ? vm.formatDate(vm.startTime) : '', //干预时间起始
          endInterventionDate: !!vm.endTime ? vm.formatDate(vm.endTime) : '' //干预时间截止
        }
      },
      // 患者管理数据
      getAllPatient() {
        let vm = this;
        let data = vm.setSearchParam(); //设置查询参数

        vm.$api.pagedQueryPatientList(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              vm.totalNum = res.data.data.totalNum;
              let dt = res.data.data.items;
              for (let i = 0, len = dt.length; i < len; i++) {
              	
              	//糖尿病类型
              	let diabetesType = dt[i].diabetesType;
              	dt[i].diabetesType = diabetesType != null ? diabetesType : '无';
              	
              	//建档时间格式转换
              	//let ct = dt[i].createFileDate;
              	//dt[i].createFileDate = !!ct ? vm.formatDate(ct).slice(0, 16) : '无';
              	
              	//最后干预时间格式转换
              	let lastTime = dt[i].lastInterventionTime;
              	dt[i].lastInterventionTime = !!lastTime ? vm.formatDate(lastTime).slice(0, 16) : '无';
              	
              	//生日转年龄
              	let birthday = dt[i].birthday;
              	dt[i].birthday = !!birthday ? vm.jsGetAge(vm.formatDate(birthday)) : '';
              	
              }
              vm.tableData3 = dt;
            }
          }
        }, res => {
          vm.$message(res.data.errMsg || res.data.data);
        })
      },
      searchs() {
        //that.tags = that.checkList;
        //   根据条件查询患者列表
        let that = this;
        if (that.ageStart !== "") {
          if (!(/^([1-9]\d*|[0]{1,1})$/).test(that.ageStart) || isNaN(that.ageStart)) {
            that.$message('起始年龄必须为整数数字');
            return;
          }
        }
        if (that.ageEnd !== "") {
          if (!(/^([1-9]\d*|[0]{1,1})$/).test(that.ageEnd) || isNaN(that.ageEnd)) {
            that.$message('截止年龄必须为整数数字');
            return;
          }
        }
        if(that.ageStart !== "" && that.ageEnd !== "" && Number(that.ageStart) >= Number(that.ageEnd)) {
          that.$message('起始年龄不能大于截止年龄');
          return;
        }
        this.currentPage4 = 1;
        this.getAllPatient();
      },
      addPatient() {
        this.$router.push("/patientManage/addPatient");
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
          this.$api.queryListToCustomerId(data, res=>{
            target.allPatientId = res.data.data;
          }, res => {
            this.$message(res.data.errMsg || res.data.data);
          });
        } else {
          //被选中患者
          target.ruleForm.multi = vm.AOC;
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
        this.getAllPatient();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage4 = val;
        this.getAllPatient();
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
        //this.checkList = [];
        this.JTimeStart = "";
        this.JTimeEnd = "";
        this.diabetesType = "";
        this.add = "";
        this.keyNames = "";
        //this.tags = '';
        this.sexs = "";
        this.ageStart = "";
        this.ageEnd = "";
        this.startTime = "";
        this.endTime = "";
        this.noSugarTestType = 1;
        this.doctorId = '';
        this.nurseId = '';
        this.currentPage4 = 1;
        this.getAllPatient();
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
      // 批量删除患者
      delPatient() {
        let vm = this;

        if (vm.AOC.length > 0) {
          let customerIds = [];
          for (let i = 0, len = vm.AOC.length; i < len; i++) {
            if (!!vm.AOC[i].customerId) {
              customerIds.push(vm.AOC[i].customerId);
            }
          }

          //MessageBox弹窗
          this.$confirm('确定要删除所选的（' + vm.AOC.length + '）位患者吗？ 删除后患者从机构中移除！', '删除患者', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning', //消息类型，用于显示图标  success/info/warning/error
            closeOnClickModal: false, //是否可通过点击遮罩关闭
            closeOnPressEscape: false, //是否可通过按下 ESC 键关闭
            customClass: 'delMsgBox', // 指定添加样式
          }).then(() => { // 确定

            this.openLoading();
            let data = {
              customerIds: customerIds
            }
            this.$api.deletePatientById(data, res => {

              this.$message.success('删除成功!');
              vm.$refs.multipleTable.clearSelection();
              this.getAllPatient();
              this.closeLoading();
            }, res => {
              this.$message(res.data.errMsg || res.data.data);
            });

          }).catch((msg) => { // 取消时的回调，msg为cancel
            //console.log(msg);
            vm.$refs.multipleTable.clearSelection();
          });
        } else {
          vm.$message('请先选择患者');
        }
      },
      // 更改医生
      changeDoctor() {
        let vm = this;
        if (vm.AOC.length > 0) {
          vm.isChangeDoctor = true;

          //vm.isChooseAllPatient(); //判断是否全选患者

          if (vm.AOC.length == 1) {
            vm.$set(vm.changeDoctorForm, 'doctorId', vm.AOC[0].doctorId);
            vm.$set(vm.changeDoctorForm, 'nurseId', vm.AOC[0].nurseId);
          }

        } else {
          vm.$message('请先选择患者');
        }
      },
      // 提交更改医生
      submitChangeDoctor(formName) {
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.openLoading();

            let data = {
              customerIds: [],
              userCustomerIds: [],
              doctorId: '',
              doctorName: '',
              nurseId: '',
              nurseName: '',
            };

            // 被选中的患者
            let customerIds = [],
              userCustomerIds = [];
            for (let i = 0, len = vm.AOC.length; i < len; i++) {
              if (!!vm.AOC[i].customerId) {
                customerIds.push(vm.AOC[i].customerId);
                userCustomerIds.push(vm.AOC[i].userCustomerId);
              }
            }
            data.customerIds = customerIds;
            data.userCustomerIds = userCustomerIds;

            //获取医生姓名
            if (!!vm.changeDoctorForm.doctorId) {
              data.doctorId = vm.changeDoctorForm.doctorId;
              for (let i = 0, len = vm.doctorList.length; i < len; i++) {
                if (vm.doctorList[i].userId == vm.changeDoctorForm.doctorId) {
                  data.doctorName = vm.doctorList[i].nickname;
                  break;
                }
              }
            }
            //获取护士姓名
            if (!!vm.changeDoctorForm.nurseId) {
              data.nurseId = vm.changeDoctorForm.nurseId;
              for (let i = 0, len = vm.nurseList.length; i < len; i++) {
                if (vm.nurseList[i].userId == vm.changeDoctorForm.nurseId) {
                  data.nurseName = vm.nurseList[i].nickname;
                  break;
                }
              }
            }

            vm.$api.updateByDoctor(data, res => {
              if (res.data.code == 0) {
                vm.$message.success('修改成功！');
                vm.$refs[formName].resetFields();
                vm.isChangeDoctor = false;
                vm.$refs.multipleTable.clearSelection();
                vm.getAllPatient();
              } else {
                vm.$message(res.data.errMsg || res.data.data)
              }
              vm.closeLoading();
            }, res => {
              vm.closeLoading();
              vm.$message(res.data.errMsg || res.data.data)
            });

          }
        })

      },
      // 关闭更改医生弹窗
      handleClose() {
        this.$refs['changeDoctorForm'].resetFields();
        this.isChangeDoctor = false;
        this.$refs.multipleTable.clearSelection();
      },
    }
  }
</script>

<style scoped>
  .mainss {
    padding: 20px 0 0;
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
  .advanced {
    color: #267bf7;
    cursor: pointer;
  }
  .AdvanSearch {
    margin-top: 20px;
  }
  .AdvanSearch > .el-select {
    margin-bottom: 20px;
  }
  .tops {
    padding: 2px 0 11px 0;
  }
  .tops span {
    padding: 0;
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
  .manage {
    position: absolute;
    top: 60px;
    left: 330px;
    width: calc( 100% - 330px);
    padding: 19px 20px;
    background: #f7f8fa;
  }
  .manage-person {
    position: absolute;
    top: 60px;
    width: calc( 100% - 200px);
    left: 130px;
    padding: 19px 0 19px 20px;
    background: #f7f8fa;
  }
  .managess {
    width: 100%;
    box-sizing: border-box;
    /*min-height: 812px;*/
    min-height: calc(100vh - 137px);
    background-color: #ffffff;
    padding: 20px;
    margin: 19px auto;
  }
  .treeNode {
    background: #fff;
    z-index: 20;
    position: fixed;
    left: 132px;
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
  .treeNodeBox {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .allPatientTitle {
    background: #fff;
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
</style>

<style lang="less">
  .delMsgBox p {
    margin: 20px auto;
    font-size: 16px;
  }
  /*重写覆盖elemeng-ui原有样式*/
  /*table表格checkbox列表头label内容*/

  .el-table.multipleTable .el-table__fixed-header-wrapper .el-table-column--selection .el-checkbox::after {
    content: ' 全选';
  }
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
    color: transparent!important;
    ;
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
    /*font-weight: bold;*/
  }
  /*顶级：前置icon*/

  .treeNode .el-tree > .el-tree-node > .el-tree-node__content > .el-tree-node__label:before {
    content: '○ ';
  }
  .treeNode .el-tree .is-current > .el-tree-node__content > span {
    color: #267BF7;
  }
</style>
