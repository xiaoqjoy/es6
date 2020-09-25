<template>
  <div>
    <div class="content">
        <button class="add button" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <!-- 合作方编号 -->
        <el-input class="select_72" v-model="fundOrg" placeholder="合作方编号" clearable></el-input>
          <!-- 合作方名称 -->
         <el-select v-model="fundOrgName" class="select_72" placeholder="合作方名称" clearable>
            <el-option v-for="(item, index) in ChannelList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="555"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @selection-change="handleSelectionChange">
            <!-- <el-table-column
                type="selection">
            </el-table-column> -->
            <!-- <el-table-column
                prop="loanNo"
                label="流水号">
            </el-table-column> -->
            <el-table-column
                prop="itemNo"
                label="合作方编号">
            </el-table-column>
            <el-table-column
                prop="itemName"
                label="合作方名称">
            </el-table-column>
            <el-table-column
                prop="itemDescription"
                label="备注">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="delete_fun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    <!-- 新增组件 -->
    <alterHint v-if="alterHintFlag" @clsoe_windowAlert="alterHintClose" @reload='reload'></alterHint>
    <!-- 再次确认组件 -->
    <reconfirmHint v-if="reconfirmFlag" massage="是否确认删除该条数据？" @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import alterHint from "../payment-card/alter-hint"; // 新增组件alter-hint
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  name: 'channel-alter',
  data() {
    return {
      reconfirmFlag: false, // 再次确认组件开关
      fontHintFlag: false, // 文字提示开关
      alterHintFlag: false, // 新增提示开关
      fontHintMsg: '', // 文字提示内容
      fundOrg: "", // 合作方编号
      fundOrgName: null, // 合作方名称
      pageConfig: {
        account: 0, // 总条数
        pageSize: 30, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      ChannelList: [], // 扣款银行列表
      rowData: {}, // 行选中参数
      transSerialNos: [] // 删除接口参数
    };
  },
  mounted() {
        this.ChannelListApi(); // 渠道列表接口
        this.RepayCardChangeList();
  },
  methods: {
      // 合作机构下拉
    ChannelListApi(res = {codeNo: "LineNo"}) {
      this.$MyFetch.get(counterDealApi.FundOrgNameList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          console.log(this.ChannelList);
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 关闭文字提示组件
    fontHintClose() {
        this.fontHintFlag = false;
    },
    // 关闭文字提示组件alterHintClose
    alterHintClose() {
        this.alterHintFlag = false;
    },
    // 关闭再次确认组件
    reconfirmClose() {
      this.reconfirmFlag = false;
    },
    // 再次确认组件点击确定执行函数
    reconfirmBackFun() {
        let rowData = {
            itemNo: this.rowData.itemNo
        };
        this.RepayCardChangeDelete(rowData)
        .then((res) => {
            this.reload();
        })
        .catch((err) => {
            this.$error(err);
        });
      this.reconfirmFlag = false;
    },
    // 查询按钮
    refer() {
        this.reload();
        //  if (!(this.fundOrg || this.fundOrgName)) {
        //     this.$message("请输入查询条件!");
        // } else {
        //     this.reload();
        // }
    },
    // 清空按钮
    empty() {
        this.fundOrg = ''; // 合作方机构
        this.fundOrgName = ''; // 合作方名称
    },
    // 修改
    delete_fun(rowData) {
        this.rowData = rowData;
        this.reconfirmFlag = true;
    },
    // reload
    reload(pageNum) {
        let data = {
            fundOrg: this.fundOrg,
            fundOrgName: this.fundOrgName
        };
        let current = pageNum || 1;
        this.RepayCardChangeList(data, current);
    },
    // 还款卡变更列表支持分页
    RepayCardChangeList(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.RepayCardChangeList + "?current=" + current + "&size=30";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            if (data.records.length < 1) {
              this.fontHintMsg = '查询结果为空'; // 文字提示内容
              this.fontHintFlag = true; // 文字提示开关
            };
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 30;
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 还款卡变更--删除
    RepayCardChangeDelete(res) {
      return new Promise((resolve, reject) => {
            let url = counterDealApi.RepayCardChangeDelete;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
      });
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
        // 清空删除的参数
        this.transSerialNos = [];
        data.forEach(element => {
            this.transSerialNos.push(element.relateId);
        });
    },
    // 新增
    add_alert() {
        this.alterHintFlag = true;
    },
    // 文件名字
    getFileName(data) {
        this.fileName = data;
    },
    // 文件id
    getFileId(data) {
        this.fileId = data;
    },
    // FileSaveFun
    FileSaveFun() {
        let _that = this;
        let queryData = {
            fileName: _that.fileName,
            fileId: _that.fileId,
            fileType: 'buyBack'
        };
        _that.CheckBuybackFile(queryData)
            .then((data) => { // 文件不存在，保存
                if (!data.success) {
                    _that.fontHintMsg = data.msg;
                    _that.fontHintFlag = true;
                } else {
                    let saveData = {
                        fileId: _that.fileId,
                        fileName: _that.fileName,
                        fileType: 'buyBack',
                        flowNo: 'buyBackFlow'
                    };
                    _that.CheckBuybackFileSave(saveData)
                    .then((data) => {
                        _that.reload();
                    })
                     .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    // 提交按钮
    submit_fun() {
        this.alterHintFlag = true;
        // if (this.transSerialNos.length < 1) {
        //     this.$message("请至少选择一条数据！");
        // } else {
        //     // this.fontHintMsg = '不能修改【新扣款渠道】以外的字段';
        //     // this.fontHintFlag = true;
        // }
    }
  },
  components: {
    pagination, // 分页组件
    fontHint, // 文字提示组件
    reconfirmHint, // 再次确认组件
    alterHint // 修改组件
  },
  created() {}
};
</script>

<style lang="less" scoped>
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>
