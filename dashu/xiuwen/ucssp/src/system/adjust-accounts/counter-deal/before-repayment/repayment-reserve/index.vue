<template>
  <div class="content">
    <!-- 标题 -->
    <div class="content_top">
      <span>还款预约</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <button class="add button" @click="add_alert()">+ 新增</button>
      <!-- 查询这一行 -->
      <div class="serach_row">
        <!-- 出账编号 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('loan_no', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')"
            v-model="loan_no"
            placeholder="出账编号"
            @focus="open_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')"
            @blur="blur_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')"
            ref="loan_noInput"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="loan_noRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>等于"{{loan_no}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>以"{{loan_no}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>包含"{{loan_no}}"</span>
            </div>
          </div>
        </div>
        <!-- 客户姓名 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('customer_name', /^[(\u4E00-\u9FA5\uf900-\ufa2d)||·]{0,15}$/g, '只允许输入汉字和“.“，最多输入15个字符')"
            v-model="customer_name"
            placeholder="客户姓名"
            @focus="open_select('icoToBottom2', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')"
            @blur="blur_select('icoToBottom1', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="customer_nameRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>等于"{{customer_name}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>以"{{customer_name}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>包含"{{customer_name}}"</span>
            </div>
          </div>
        </div>
        <!-- 放款机构 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('line_id', /^[(\u4E00-\u9FA5\uf900-\ufa2d)|-]{0,15}$/g, '只允许输入汉字，最多输入15个字符')"
            v-model="line_id"
            placeholder="放款机构"
            @focus="open_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')"
            @blur="blur_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop3, 'select_toBottom': icoToBottom3}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="line_idRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>等于"{{line_id}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>以"{{line_id}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>包含"{{line_id}}"</span>
            </div>
          </div>
        </div>
        <!-- 身份证号 -->
        <div class="demo-ruleForms">
          <!-- <input class="select_72" v-model="cert_no" placeholder="身份证号" @change="certNoChange('cert_no', /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g, '请输入正确的身份证号')"/> -->
          <input
            class="select_72"
            v-model="cert_no"
            placeholder="身份证号"
            @focus="open_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')"
            @blur="blur_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop4, 'select_toBottom': icoToBottom4}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="cert_noRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>等于"{{cert_no}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>以"{{cert_no}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>包含"{{cert_no}}"</span>
            </div>
          </div>
        </div>
        <!-- <el-input class="select_72" v-model="loan_no" placeholder="出账编号"></el-input>
            <el-input class="select_72" v-model="customer_name" placeholder="客户姓名"></el-input>
            <el-input class="select_72" v-model="line_id" placeholder="放款机构"></el-input>
        <el-input class="select_72" v-model="cert_no" placeholder="身份证号"></el-input>-->
        <el-button class="b_button query button" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty button" @click="empty()">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
      <div class="table_box">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          max-height="495"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%; border: 1px solid #E9E9E9;"
          @select-all="clickSelectAll"
          @select="select"
          @row-click="rowCheck"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="trans_serial_no" width="180" label="交易号"></el-table-column>
          <el-table-column prop="loan_no" width="180" label="出账编号"></el-table-column>
          <el-table-column prop="customer_name" width="100" label="客户姓名"></el-table-column>
          <el-table-column prop="appointDate" width="200" label="预约上门时间">
            <template slot-scope="scope">
              <div>{{scope.row.appointDate | date_filters}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="business_sum" width="100" label="总计应还金额"></el-table-column>
          <el-table-column prop="apply" width="150" label="申请人"></el-table-column>
          <el-table-column prop="apply_date" width="200" label="申请时间">
            <template slot-scope="scope">
              <div>{{scope.row.apply_date | date_filters}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="branch_name" width="200" label="分公司">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" v-if="scope.row.branch_name">
                <p class="ellipsis">{{scope.row.branch_name}}</p>
                <div slot="reference">
                  <p class="yincan ellipsis">{{scope.row.branch_name}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="trialDate" width="200" label="试算时间">
            <template slot-scope="scope">
              <div>{{scope.row.trialDate | date_filters}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="detail_alert(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page_box">
        <!-- 分页条 -->
        <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      </div>
      <!-- 删除和提交 -->
      <div class="delete_submit">
        <div>
          <el-button class="t_button dead_t button" @click="delete_fun">删除</el-button>
          <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
        </div>
      </div>
      <!-- 新增单笔还款  -->
      <addPriorMatch
        v-if="alert_"
        @clsoe_windowAlert="close_1"
        @prepaymentList='prepaymentList("", pageConfig.currentPage)'
      ></addPriorMatch>
      <!-- 详情 -->
      <sponsorDetail
        v-if="alert_detail"
        @clsoe_windowDetail="close_2"
        :tetailData="tetail_data"
        @reload="reload"
      ></sponsorDetail>
      <!--提交 再次确认组件 -->
      <reconfirmHint
        v-if="submit_hint"
        massage="是否提交选中的申请？"
        @close="sumit_close"
        @backFun="affirm_submit_fun"
      ></reconfirmHint>
      <!--删除 再次确认组件 -->
      <reconfirmHint
        v-if="delete_hint"
        massage="是否删除选中的申请？"
        @close="delete_close"
        @backFun="affirm_delete_fun"
      ></reconfirmHint>
      <!-- 提示窗 == 发送邮件 -->
      <div class="hint" v-if="email_flag">
        <div class="import-message">
          <div class="dialog-mask"></div>
          <div class="dialog-box" v-loading="loading" style="width: 456px; height: 336px;">
            <div class="dialog-msgbox__top dialog-msgbox__top2">
              <span class="dialog-font2">发送邮件</span>
              <span class="el-icon-close button button__close" @click="email_close"></span>
            </div>
            <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
              <div class="email_info">
                <div class="email_item">
                  <span class="item_left">收件人</span>
                  <!-- <input type="text" class="text" v-model="writeInfo.toAddress"> -->
                  <el-form-item prop="toAddress">
                    <el-input v-model="writeInfo.toAddress"></el-input>
                  </el-form-item>
                </div>
                <div class="email_item">
                  <span class="item_left">抄送至</span>
                  <!-- <input type="text" class="text" v-model="toCarBonCopy"> -->
                  <el-form-item prop="toCarBonCopy">
                    <el-input v-model="writeInfo.toCarBonCopy"></el-input>
                  </el-form-item>
                </div>
                <div class="email_item">
                  <span class="item_left">上传附件</span>
                  <input class="text" type="text" name="file" disabled :value="fileName" />
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadUrl"
                    :on-change="elOchange"
                    :data="uploadData"
                    :on-success="onSuccess"
                    :on-error="onError"
                    name="uploadFile"
                    :headers="headers"
                    :multiple="false"
                    :show-file-list="false"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" size="small" type="primary">浏览</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                  </el-upload>
                  <!-- elupload -->
                  <div class="hintDiv">
                    <div class="hint" v-if="hint">{{fileMsg}}</div>
                  </div>
                </div>
              </div>
            </el-form>
            <div class="email_affirm">
              <el-button class="t_button t_email button" @click="finish()">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
import pagination from "@components/pagination"; // 分页条
import addPriorMatch from "./addPriorMatch/"; // 新增单笔还款
import sponsorDetail from "./reserve-detail/"; // 发起-详情
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportValidator from "../../js/reportRules"; // 验证
import { token } from "@/common/js/localStorage";
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  data() {
    return {
      // 出账编号
      loan_no: "",
      // 客户姓名
      customer_name: "",
      // 放款机构
      line_id: "",
      // 身份证号
      cert_no: "",
      // 查询数据
      searchData: {
        flow_no: "repaymentFlow",
        phase_no: ["0010"],
        eq: {},
        likeRight: {},
        like: {}
      },
      // 出账编号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 客户姓名图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 放款机构图标方向
      icoToTop3: false,
      icoToBottom3: false,
      ico_flag3: true,
      // 身份证号图标方向
      icoToTop4: false,
      icoToBottom4: false,
      ico_flag4: true,
      for_: [], // 渲染数据列表
      submitDeleteData: [], // 提交删除接口参数
      loanNoList: [], // 选中的出账编号数组
      businessSum: "", // 选中得总计应还金额
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      alert_: false, // 新增单笔还款
      alert_detail: false, // 详情
      tetail_data: { a: "1", b: "2" }, // 传给详情的数据
      submit_hint: false, // 提交开关
      delete_hint: false, // 删除开关
      // 文件上传
      email_flag: false, // e-mail开关
      accept: ["XLS", "XLSX", "DOC", "DOCX", "PDF", "JPG", "PNG", "RAR", "ZIP"], // 上传文件格式
      hint: false, // 提示信息
      url: counterDealApi, // 下载模板方法
      fileName: "", // 绑定文本框的值
      fileId: "", // 文件ID
      file: "", // 上传文件的值
      fileMsg: "", // 提示信息文本的值
      filePostfix: [],
      loading: false,
      writeInfo: {
        toCarBonCopy: "", // 收件人
        toAddress: "" // 发送人
      },
      rules: {
        toCarBonCopy: [
          { trigger: "blur", validator: reportValidator.emailRuls }
        ],
        toAddress: [
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportValidator.emailRuls }
        ]
      },
      uploadData: {},
      headers: {
        // "Content-Type": false,
        // "Accept": "application/json",
        "DSF-token": token.getToken(),
        "X-REQ-NAME": "ucssp"
      },
      // 上传文件地址
      uploadUrl: counterDealApi.upload
    };
  },
  watch: {
    cert_no(newData, oldData) {
      console.log(newData, oldData);
      if (newData.length > 18) {
        this.cert_no = oldData;
      }
    }
  },
  filters: {
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = change(date.getDate()) + " ";
        let h = change(date.getHours()) + ":";
        let m = change(date.getMinutes()) + ":";
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
      } else {
        return "---";
      }
    }
  },
  created() {
    this.prepaymentList();
  },
  methods: {
    // 验证
    certNoChange(value, reg, massage) {
      if (!reg.test(this[value])) {
        this[value] = "";
        this.$message(massage);
      }
    },
    elOchange(file, filelist) {
      if (filelist.length > 1) {
        // 让上传文件只有一个
        this.$refs.upload.uploadFiles.shift();
      }
      this.fileMsg = "";
      this.hint = false;
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 20) {
        this.fileMsg = "上传文件不能大于20M！";
        this.hint = true;
      }
      this.fileName = file.name;
    },
    onSuccess(data) {
      if (data.code === "200") {
        // 上传成功， 发送邮件
        this.FileSaveFun();
      } else {
        this.$error(`邮件发送失败：文件上传失败！`);
        this.alert_email();
        this.loading = false;
        this.reload();
      }
    },
    // 上传失败
    onError(data) {
      this.$error(`邮件发送失败：文件上传失败！`);
      this.alert_email();
      this.loading = false;
      this.reload();
    },
    submitUpload() {
      let _that = this;
      let fileTypeArr = this.fileName.split(".");
      // 判断文件类型
      let fileType = fileTypeArr[fileTypeArr.length - 1];
      let data = {
        storageTime: "90d",
        extensionName: fileType,
        storageType: "NAS"
      };
      new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.newFile, data)
          .then(data => {
            // fileid
            _that.fileId = data.fileInfo.fileId;
            _that.uploadData = {
              fileId: _that.fileId,
              sessionToken: data.credentials.sessionToken,
              tmpSecretId: data.credentials.tmpSecretId,
              tmpSecretKey: data.credentials.tmpSecretKey
            };
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      })
        .then(data => {
          _that.$refs.upload.submit();
        })
        .catch(err => {
          this.$error(`邮件发送失败：文件上传失败！${err}`);
          this.alert_email();
          this.loading = false;
          this.reload();
        });
    },
    alert_email() {
      this.email_flag = false;
      this.file = "";
      this.fileName = "";
      this.fileMsg = "";
      this.fileId = "";
    },
    // 文件上传start
    // 关闭邮件提示
    email_close() {
      this.alert_email();
    },
    // 发送邮件
    prepaymentSendEMail(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentSendEMail, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
    },
    // FileSaveFun
    FileSaveFun() {
      let _that = this;
      let queryData = {
        attachFilesName: _that.fileName,
        attachFiles: _that.fileId,
        loanNo: _that.loanNoList[0],
        emailType: "APPLY", // 邮件流程
        toAddress: _that.writeInfo.toAddress, // 发件人
        toCarBonCopy: _that.writeInfo.toCarBonCopy // 收件人
      };
      let selfEmail = JSON.parse(localStorage.getItem("DSFUserInfo"));
      if (queryData.toCarBonCopy) {
        queryData.toCarBonCopy += `;${selfEmail.userId}@dashuf.com`;
      } else {
        queryData.toCarBonCopy = `${selfEmail.userId}@dashuf.com`;
      }
      this.prepaymentSendEMail(queryData)
        .then(data => {
          _that.reload();
          _that.$message(data.message);
          _that.alert_email();
          _that.loading = false;
        })
        .catch(err => {
          _that.reload();
          _that.$error(err);
          _that.alert_email();
          _that.loading = false;
        });
    },
    // 邮件保存按钮
    finish() {
      let _that = this;
      this.$refs.writeInfo.validate(valid => {
        if (valid) {
          // 文件不能超过20m
          if (this.hint) {
            return;
          }
          // 判断文件格式
          let fileTypeArr = this.fileName.split(".");
          let fileType = fileTypeArr[fileTypeArr.length - 1];
          this.hint = false;
          this.fileMsg = "";
          if (
            this.accept.indexOf(fileType.toLocaleUpperCase()) < 0 &&
            fileType
          ) {
            this.hint = true;
            this.fileMsg = "请选择正确的文件格式上传";
            return;
          }
          this.loading = true;
          // 提交数据
          let queryData = {
            phaseNo: "0010",
            flowNo: "repaymentFlow",
            objectNoList: _that.submitDeleteData
          };
          _that
            .submitPrepayment(queryData)
            .then(data => {
              // 邮件附件为空也可保存
              if (_that.fileName === null || this.fileName === "") {
                _that.FileSaveFun();
              } else {
                // 否则上传文件并保存
                _that.submitUpload();
              }
            })
            .catch(err => {
              this.$error(err);
              this.email_close();
              this.loading = false;
            });
        }
      });
    },
    // 提前还款-查询接口
    prepaymentList(res, current) {
      res = res || {
        flow_no: "repaymentFlow",
        phase_no: ["0010"]
      };
      current = current || 1;
      let url =
        counterDealApi.prepaymentList + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.submitDeleteData = [];
          this.loanNoList = [];
          this.businessSum = "";
          if (data.records.length < 1) {
            this.$message("查询结果为空！");
          }
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 提前还款-删除接口
    deletePrepaymentn(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.deletePrepaymentn, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
    },
    // 提前还款-提交接口
    submitPrepayment(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.submitPrepayment, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
    },
    // 提前还款-查询线上列表
    prepaymentOnLineList(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentOnLineList, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
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
      console.log(type, value, selectRef, "选中");
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
      console.log(this.searchData, "searchdata");
    },
    // 点击下拉箭头
    select_type_fun(icoBottom, icoTop, selectRef, flag) {
      if (this[flag]) {
        // 展开
        this[icoBottom] = false;
        this[icoTop] = true;
        this.$refs[selectRef].style.display = "block";
        this[flag] = false;
      } else {
        // 收起
        this[icoBottom] = true;
        this[icoTop] = false;
        this.$refs[selectRef].style.display = "none";
        this[flag] = true;
      }
    },
    // --查询框方法结束
    // 关闭提交提示窗口
    sumit_close() {
      this.submit_hint = false;
    },
    // 确认提交窗口
    affirm_submit_fun() {
      let _that = this;
      this.submit_hint = false;
      // 查询线上列表
      let prepaymentOnLineData = {
        loanNo: this.loanNoList
      };
      this.prepaymentOnLineList(prepaymentOnLineData)
        .then(data => {
          // 有线上的出账编号则弹窗
          if (data.loanNo.length > 0) {
            _that.email_flag = true;
            // 提示
            this.$message.success(
              "有" +
                data.loanNo.length +
                "条数据为线下对接机构，请发送邮件通知！"
            );
          } else {
            // 否则提交数据
            let queryData = {
              phaseNo: "0010",
              flowNo: "repaymentFlow",
              objectNoList: _that.submitDeleteData
            };
            _that
              .submitPrepayment(queryData)
              .then(data => {
                _that.reload();
              })
              .catch(err => {
                this.$error(err);
              });
          }
        })
        .catch(err => {
          this.$error(err);
        });
    },
    reload() {
      // 当前页
      let currentPage = this.pageConfig.currentPage;
      // 索搜条件
      let searchData = this.searchData;
      this.submitDeleteData = [];
      this.loanNoList = [];
      this.businessSum = "";
      // 刷新页面
      this.prepaymentList(searchData, currentPage);
    },
    // 关闭删除提示窗口
    delete_close() {
      this.delete_hint = false;
    },
    // 确认删除窗口
    affirm_delete_fun() {
      let queryData = {
        serialNos: this.submitDeleteData
      };
      this.deletePrepaymentn(queryData)
        .then(data => {
          // 当前页
          let currentPage = this.pageConfig.currentPage;
          this.prepaymentList("", currentPage);
          this.delete_hint = false;
        })
        .catch(err => {
          this.$error(err);
        });
    },
    // 详情
    detail_alert(rowData) {
      this.tetail_data = rowData;
      this.alert_detail = true;
    },
    // 子页面关闭详情函数
    close_2() {
      this.alert_detail = false;
    },
    // 新增
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增组件
    close_1() {
      this.alert_ = false;
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
        console.log(selection);
        this.submitDeleteData = [selection[0].trans_serial_no];
        this.loanNoList = [selection[0].loan_no];
        this.businessSum = selection[0].business_sum;
      } else {
        this.$refs.multipleTable.clearSelection();
        this.submitDeleteData = [];
        this.loanNoList = [];
        this.businessSum = "";
      }
    },
    select(selection, row) {
      if (selection.length === 0) {
        this.submitDeleteData = [];
        this.loanNoList = [];
        this.businessSum = "";
      } else if (selection.length === 1) {
        this.submitDeleteData = [row.trans_serial_no];
        this.loanNoList = [row.loan_no];
        this.businessSum = row.business_sum;
      } else {
        selection.shift();
        this.rowCheck(row);
      }
    },
    rowCheck(row, column, e) {
      if (!this.submitDeleteData[0]) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.submitDeleteData = [row.trans_serial_no];
        this.loanNoList = [row.loan_no];
        this.businessSum = row.business_sum;
      } else if (
        this.submitDeleteData[0] &&
        row.trans_serial_no === this.submitDeleteData[0]
      ) {
        this.$refs.multipleTable.clearSelection();
        this.submitDeleteData = [];
        this.loanNoList = [];
        this.businessSum = "";
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.submitDeleteData = [row.trans_serial_no];
        this.loanNoList = [row.loan_no];
        this.businessSum = row.business_sum;
      }
    },
    // 查询
    refer() {
      // 加上身份证
      //   this.searchData.eq.cert_no = this.cert_no;
      this.prepaymentList(this.searchData);
    },
    // 清空
    empty() {
      console.log("清空");
      // 出账编号
      this.loan_no = "";
      // 客户姓名
      this.customer_name = "";
      // 放款机构
      this.line_id = "";
      // 身份证号
      this.cert_no = "";
      // 查询数据
      this.searchData = {
        flow_no: "repaymentFlow",
        phase_no: ["0010"],
        eq: {},
        likeRight: {},
        like: {}
      };
    },
    // 删除
    delete_fun() {
      if (!this.submitDeleteData[0]) {
        this.$message("请至少选择一条数据删除");
      } else {
        this.delete_hint = true;
      }
    },
    // 提交
    submit_fun() {
      console.log(this.loanNoList);
      if (!this.submitDeleteData[0]) {
        this.$message("请至少选择一条数据提交!");
      } else if (!this.businessSum) {
        this.$message("总计应还金额为空,请先试算!");
      } else {
        this.submit_hint = true;
      }
    },
    jump(pageNum) {
      // 分页
      this.prepaymentList(this.searchData, pageNum);
    }
  },
  components: {
    pagination, // 分页
    addPriorMatch, // 增加
    reconfirmHint,
    sponsorDetail // 详情
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
  display: none;
}
// 中间部分
.content {
  min-height: 850px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  //   overflow: hidden;
  padding: 0px 30px;
  position: relative;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  .sponsor {
    width: 100%;
    // height: 100%;
    padding-top: 20px;
  }
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    // margin: 20px 30px;
  }
  // 查询这行的box
  .serach_row {
    margin-top: 20px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
      height: 40px;
      margin-right: 15px;
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #bbbbbb;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 12px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 12px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 12px;
      }
    }
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // padding-left: 15px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      margin-left: 18px;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格
  .table_box {
    width: 100%;
    height: 495px;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 40px;
  }
  // 删除和提交按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    // 删除提交公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .dead_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .initiate_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
