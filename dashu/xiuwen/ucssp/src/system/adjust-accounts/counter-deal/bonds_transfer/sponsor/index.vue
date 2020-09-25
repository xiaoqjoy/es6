<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add  button" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
            <!-- 批次号 -->
            <div class="demo-ruleForms">
                <input class="select_72" @change="certNoChange('batchNo', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')" v-model="batchNo" placeholder="批次号" @focus="open_select('icoToBottom1', 'icoToTop1', 'batchNoRef', 'ico_flag1', 'batchNo')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'batchNoRef', 'ico_flag1', 'batchNo')" ref="batchNoInput" />
                <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
                <div class="select_option" ref="batchNoRef">
                    <div class="opton_item" @click="selected_fun('eq', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>等于"{{batchNo}}"</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('likeRight', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>以"{{batchNo}}"开头</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('like', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>包含"{{batchNo}}"</span>
                    </div>
                </div>
            </div>
            <!-- 申请人 -->
            <div class="demo-ruleForms">
                <input class="select_72" @change="certNoChange('operateId', /^[a-zA-Z0-9]{0,15}$/g, '[a-zA-Z0-9]，最多输入15个字符')" v-model="operateId" placeholder="申请人" @focus="open_select('icoToBottom2', 'icoToTop2', 'operateIdRef', 'ico_flag2', 'operateId')" @blur="blur_select('icoToBottom1', 'icoToTop2', 'operateIdRef', 'ico_flag2', 'operateId')"/>
                <span :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}" ref="select_type_btn"></span>
                <div class="select_option" ref="operateIdRef">
                    <div class="opton_item" @click="selected_fun('eq', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>等于"{{operateId}}"</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('likeRight', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>以"{{operateId}}"开头</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('like', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>包含"{{operateId}}"</span>
                    </div>
                </div>
            </div>
            <el-date-picker
                v-model="applicationDate"
                class="repayDateCss"
                type="daterange"
                align="right"
                range-separator="至"
                start-placeholder="申请日期"
                end-placeholder="申请日期">
            </el-date-picker>
            <el-button class="b_button query button" @click="refer">查询</el-button>
            <el-button class="b_button empty button" @click="empty">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @select-all="clickSelectAll"
            @select="select"
            @row-click="rowCheck">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="batchNo"
                width="180"
                label="批次号">
            </el-table-column>
            <el-table-column
                prop="fileName"
                width="200"
                label="文件名称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.fileName">
                        <p class="ellipsis">
                            {{scope.row.fileName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.fileName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="applyBy"
                width="180"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="applyTime"
                width="180"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="phaseName"
                label="当前阶段">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">明细</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button dead_t button" @click="import_file_fun">导入还款文件</el-button>
        <el-button class="t_button upload_t button" @click="delete_fun">删除</el-button>
        <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
      </div>
      <!-- 新增单笔还款 -->
      <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1' @reload='reload'></addPriorMatch>
      <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
      <!-- 导入文件 -->
      <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
      <!-- 提示窗 == 提交 -->
      <div class="hint" v-if="submit_hint">
          <div class="import-message">
              <div class="dialog-mask"></div>
              <div class="dialog-box">
                  <div class="dialog-msgbox__top">
                  <span class="el-icon-close button button__close" @click="sumit_close"></span>
                  </div>
                  <div class="text-center">是否确认提交选中的申请？</div>
                    <div class="affirm_select">
                      <el-button class="t_button cancel_t button" @click="cancel_submit_fn">取消</el-button>
                      <el-button class="t_button affirm_t button" @click="affirm_submit_fun">确认</el-button>
                  </div>
              </div>
          </div>
      </div>
      <!-- 提示窗 == 删除 -->
      <div class="hint" v-if="delete_hint">
          <div class="import-message">
              <div class="dialog-mask"></div>
              <div class="dialog-box">
                  <div class="dialog-msgbox__top">
                  <span class="el-icon-close button button__close" @click="delete_close"></span>
                  </div>
                  <div class="text-center">是否确认删除选中的申请？</div>
                    <div class="affirm_select">
                      <el-button class="t_button cancel_t button" @click="cancel_delete_fn">取消</el-button>
                      <el-button class="t_button affirm_t button" @click="affirm_delete_fun">确认</el-button>
                  </div>
              </div>
          </div>
      </div>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addPriorMatch from "./addPriorMatch/"; // 新增单笔还款
import upload from './upload/index.vue'; // 导入文件
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
export default {
  data() {
    return {
      alert_detail: false, // 明细
      tetail_data: '123', // 传给明细的数据
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      batchNo: "", // 批次号
      operateId: "", // 操作人
      applicationDate: '',
       // 批次号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 申请人图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 查询数据
      searchData: {
        "flowNo": "boundsTransferFlow",
        "phaseNo": ["0010"],
        "eq": {},
        "likeRight": {},
        "like": {}
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      deleteSubmitData: null, // 删除接口参数
      alert_: false, // 新增单笔还款
      uploadBox: false, // 导入文件开关
      submit_hint: false, // 提交开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
      this.boundsTransferTransRepayment();
  },
  methods: {
    // 毫秒数转成时间数组
    date_filter(list) {
        list = list || [];
        let array = [];
        list.forEach((element, index) => {
            var year = element.getFullYear();
            var month = element.getMonth() + 1;
                month = month < 10 ? ('0' + month) : month;
            var day = element.getDate();
                day = day < 10 ? ('0' + day) : day;
            var hour = element.getHours();
                hour = hour < 10 ? ('0' + hour) : hour;
            var minute = element.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
            var second = element.getSeconds();
                second = second < 10 ? ('0' + second) : second;
            let dates = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            array.push(dates);
        });
        return array;
    },
    // 点击明细
    detail_alert(res) {
        this.tetail_data = res;
        this.alert_detail = true;
    },
    // 关闭明细
    close_2() {
        this.alert_detail = false;
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 查询按钮
    refer() {
        this.reload();
    },
    // 清空按钮
    empty() {
        this.batchNo = '';
        this.operateId = '';
        this.applicationDate = '';
        this.searchData = {
            "flowNo": "boundsTransferFlow",
            "phaseNo": ["0010"],
            "eq": {},
            "likeRight": {},
            "like": {}
        };
    },
    // reload
    reload(pageNum) {
        let queryData = this.searchData;
        // 加上时间
        queryData.operateStart = this.date_filter(this.applicationDate)[0];
        queryData.operateEnd = this.date_filter(this.applicationDate)[1];
        let current = pageNum || 1;
        this.deleteSubmitData = null;
        this.boundsTransferTransRepayment(queryData, current);
    },
    // 代偿申请查询列表接口
    boundsTransferTransRepayment(res, current) {
        res = res || {
            "flowNo": "boundsTransferFlow",
            "phaseNo": ["0010"]
        };
        current = current || 1;
        let url = counterDealApi.boundsTransferTransRepayment + "?current=" + current + "&size=10";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 10;
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 一般还款总单删除(支持单笔/批量)
    batchRepaymentDeleteRepay(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.batchRepaymentDeleteRepay, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    },
    // 单笔还款提交（支持批量/单笔)
    batchRepaymentSubmitReview(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.batchRepaymentSubmitReview, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    },
    // 批量代偿发起文件保存
     boundsTransferFileSave(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.boundsTransferFileSave;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    clickSelectAll(selection, row) {
        if (selection.length > 0) {
            selection.splice(1, selection.length);
        }
        // 单选选中的数据
        // 删除提交的参数
        this.deleteSubmitData = selection[0];
    },
    select(selection, row) {
       if (selection.length === 0) {
                this.deleteSubmitData = null;
            } else if (selection.length === 1) {
                this.deleteSubmitData = row;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
    },
    rowCheck(row, column, e) {
      if (!this.deleteSubmitData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteSubmitData = row;
      } else if (this.deleteSubmitData && row.batchNo === this.deleteSubmitData.batchNo) {
        this.$refs.multipleTable.clearSelection();
        this.deleteSubmitData = null;
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteSubmitData = row;
      }
    },
    // 试算
    add_alert(rowData) {
        this.alert_ = true;
    },
    // 关闭文件导入
    closeUpload () {
        this.uploadBox = false;
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
        let saveData = {
            fileId: _that.fileId,
            fileName: _that.fileName,
            relatedId: _that.deleteSubmitData.batchNo
        };
        _that.boundsTransferFileSave(saveData)
        .then((data) => {
            _that.reload();
        })
        .catch((err) => {
            this.$error(err);
        });
    },
    // 关闭新增组件
    close_1() {
    this.alert_ = false;
    },
    // 导入文件按钮
    import_file_fun() {
        if (!this.deleteSubmitData) {
            this.$message("请选择一条数据!");
        } else {
             if (this.deleteSubmitData.fileName !== null || this.deleteSubmitData.fileName) {
                this.$message("您已导入过文件，不能重复导入！");
            } else {
                this.uploadBox = true;
            }
        }
    },
    // 删除按钮
    delete_fun() {
        if (!this.deleteSubmitData) {
            this.$message("请选择一条数据!");
        } else {
            this.delete_hint = true;
        }
    },
    // 提交按钮
    submit_fun() {
        if (!this.deleteSubmitData) {
            this.$message("请选择一条数据");
        } else if (this.deleteSubmitData.fileName !== null || this.deleteSubmitData.fileName) {
            this.submit_hint = true;
        } else {
            this.$message("请导入还款文件");
        }
    },
    // 关闭提交提示窗口
    sumit_close() {
        this.submit_hint = false;
    },
    // 关闭删除提示窗口
    delete_close() {
        this.delete_hint = false;
    },
    // 取消提交窗口
    cancel_submit_fn() {
        this.submit_hint = false;
    },
    // 确认提交窗口
    affirm_submit_fun() {
        this.submit_hint = false;
        let submitData = {
            relatedId: [this.deleteSubmitData.batchNo],
            "flowNo": "boundsTransferFlow"
        };
        // 单笔还款提交复核接口方法
        this.batchRepaymentSubmitReview(submitData)
            .then((res) => {
                this.reload();
            })
            .catch((err) => {
                this.$error(err);
            });
    },
    // 取消删除窗口
    cancel_delete_fn() {
        this.delete_hint = false;
    },
    // 确认删除窗口
    affirm_delete_fun() {
        // 调用删除接口
            let deleteData = {
                relatedId: [this.deleteSubmitData.batchNo]
            };
            this.batchRepaymentDeleteRepay(deleteData)
                .then((data) => {
                    this.reload();
                    this.delete_hint = false;
                })
                .catch((err) => {
                    this.$error(err);
                    this.delete_hint = false;
                });
    },
    // 验证
    certNoChange(value, reg, massage) {
          if (!reg.test(this[value])) {
              this[value] = '';
              this.$message(massage);
          }
    },
    // --查询框方法开始
    // input失去焦点，关闭下拉框
    blur_select(icoBottom, icoTop, selectRef, flag, value) {
        // 清空seardata 里的value
        this.filter_search_type(this.searchData, value);
        // 默认为eq
        this.searchData.eq[value] = this[value];
        setTimeout(() => {
            this[icoBottom] = true;
            this[icoTop] = false;
            this.$refs[selectRef].style.display = "none";
            this[flag] = true;
        }, 200);
    },
    // input聚焦，打开下拉框
    open_select(icoBottom, icoTop, selectRef, flag, value) {
        this[icoBottom] = false;
        this[icoTop] = true;
        this.$refs[selectRef].style.display = "block";
        this.$refs[selectRef].style.height = "124px";
        this[flag] = false;
    },
    // 去掉重复的查询条件
    filter_search_type(searchData, value) {
        for (const item in this.searchData) {
                for (const item2 in this.searchData[item]) {
                // 如果这个对象里有当前的key值，把eq,like,likeright对象里的这个key值清空，再给对应的eq，like,likeright赋属性名
                if (item2 === value) {
                    delete this.searchData[item][item2];
                }
                }
            }
    },
    // 选中
    selected_fun(type, value, selectRef, flag, icoBottom, icoTop) {
        console.log(type, value, selectRef, '选中');
        this[icoBottom] = true;
        this[icoTop] = false;
        this.$refs[selectRef].style.display = "none";
        this[flag] = true;
        switch (type) {
            case "eq":
            this.filter_search_type(this.searchData, value);
            this.searchData[type][value] = this[value];
            break;
            case "likeRight":
            this.filter_search_type(this.searchData, value);
            this.searchData[type][value] = this[value];
            break;
            case "like":
            this.filter_search_type(this.searchData, value);
            this.searchData[type][value] = this[value];
            break;
        }
        console.log(this.searchData, 'searchdata');
    },
    // 点击下拉箭头
    select_type_fun(icoBottom, icoTop, selectRef, flag) {
        if (this[flag]) { // 展开
            this[icoBottom] = false;
            this[icoTop] = true;
            this.$refs[selectRef].style.display = "block";
            this[flag] = false;
        } else { // 收起
            this[icoBottom] = true;
            this[icoTop] = false;
            this.$refs[selectRef].style.display = "none";
            this[flag] = true;
        }
    }
    //  --查询框方法结束
  },
  components: {
    addPriorMatch, // 增加
    pagination, // 分页组件
    sponsorDetail, // 明细
    fontHint, // 文字提示组件
    upload // 导入文件
  }
};
</script>
<style lang="less" scoped>
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
/deep/ .el-table--fit{
    max-height: 550px;
}
/deep/ .el-table__body-wrapper{
     max-height: 500px;
     overflow-y: auto;
}
</style>
