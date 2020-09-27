<template>
  <div class="content partner-mail-inquiry">
    <div class="content_top">
      <span>合作方邮件查询</span>
    </div>
      <div class="sponsor">
        <!-- 查询这一行 -->
        <div class="serach_row">
          <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
            <el-form-item prop="sort">
              <el-select v-model="searchInfo.sort" placeholder="类别" filterable clearable>
                <el-option v-for="item in sorts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="partner_organ">
              <el-select v-model="searchInfo.partner_organ" placeholder="合作机构名称" @change="changeOrg" filterable clearable>
                <el-option
                v-for="item in partnerList"
                :key="item.partnerCd"
                :value="item.partnerCd"
                :label="item.partnerName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="EmailAddress">
              <el-select v-if="false" v-model="searchInfo.EmailAddress" placeholder="发送邮箱" filterable clearable>
                <el-option v-for="item in send_emails" :key="item" :value="item" :label="item"></el-option>
              </el-select>
              <el-autocomplete
                popper-class="partner-mail-inquiry-autocomplete"
                v-model="searchInfo.EmailAddress"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                placeholder="发送邮箱"
                filterable
                clearable
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item }}</div>
                  </template>
              </el-autocomplete>
            </el-form-item>
            <!-- <el-form-item prop="StartTime">
              <el-date-picker
              v-model="searchInfo.StartTime"
              align="left"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="发送日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="EndTime">
              <el-date-picker
              v-model="searchInfo.EndTime"
              align="left"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item class='dateRange' prop="StartTime">
              <el-date-picker
                v-model="searchInfo.StartTime"
                type="datetime"
                align="left"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </el-form-item>
            <el-form-item class='dateRange el-form-item-last' prop="EndTime">
              <el-date-picker
                v-model="searchInfo.EndTime"
                type="datetime"
                align="left"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="el-form-item-btn">
                <el-button class="width100" type="primary" @click="getList(1)">查询</el-button>
                <el-button class="width100 claer_btn" type="primary" plain @click="clearSearch">清空</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="tables">
          <div class="emali-table-w" v-loading='tableLoading'>
            <div class="emali-table">
              <div class="emali-table-head">
                  <ul class='clearfix'>
                    <div class="clearfix f__left">
                      <li class="emali-check"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox></li>
                    </div>
                    <div class="clearfix f__left emali-cont-item-info">
                      <li class="emali-send">发件人</li>
                      <li class="emali-content">主题</li>
                      <li class="emali-time">时间</li>
                    </div>
                  </ul>
              </div>
              <el-checkbox-group v-model="checkedEmails" @change="handleCheckedEmailsChange" style="overflow-x:auto;">
                <div class="emali-table-cont" v-for="(item, index) in tableDatas" :key="index">
                  <div class='emali-cont-time'>{{item.desc}}<span>({{item.list.length}}封)</span></div>
                  <div class='emali-cont-list'>
                    <div class="emali-cont-item"
                      v-for="(i, t) in item.list" :key="t">
                      <ul class='clearfix'>
                        <div class="clearfix f__left">
                          <li class="emali-check">
                            <el-checkbox
                            name="type"
                            :key="i.attachFiles"
                            :label="i"
                            ></el-checkbox>
                          </li>
                        </div>
                        <div @click="open_windowAlert(i)" class="clearfix f__left emali-cont-item-info">
                          <li class="emali-send">{{i.userName}}</li>
                          <li class="emali-content li">{{i.subject}}</li>
                          <li class="emali-time"><span>{{i.updatedDate ? (new Date(i.updatedDate)).normalizeTime().strTime : '-'}}</span></li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <!-- 详情组件 -->
        <!-- <detail v-if="dataliVisible" :formData='detailForm' @clsoe_windowAlert='clsoe_windowAlert'></detail> -->
        <div class="delete_submit">
          <div>
            <el-button class="t_button export_t button" @click="exportEmail">导出</el-button>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { accountApi } from "../../account/js/server.js"; // 接口
// import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
import "@common/css/dialog";
// import detail from "./detail"; // 详情组件
export default {
  name: "partner-mail-inquiry",
  // components: {
  //   detail // 详情组件
  // },
  data() {
    return {
      // 查询信息
      searchInfo: {
        sort: "",
        partner_organ: "",
        EmailAddress: "",
        StartTime: "",
        EndTime: ""
      },
      sorts: [
        {
          value: 1,
          label: "发送"
        },
        {
          value: 2,
          label: "接收"
        }
      ],
      partnerList: [], // 合作机构
      send_emails: [],
      tableLoading: false,
      // 表格信息
      checked: "",
      checkedEmails: [],
      checkedEmail: [],
      tableDatas: [
        {
          time: "today",
          desc: "今天",
          list: []
        },
        {
          time: "yesterday",
          desc: "昨天",
          list: []
        },
        {
          time: "lastweek",
          desc: "上周",
          list: []
        }
      ],
      isIndeterminate: true, // 是否全选
      checkAll: false,
      exportLoading: false,
      dataliVisible: false,
      detailForm: {},
      emaliData: [],
      activeOrgInfo: [],
      pickerOptions0: {
        // disabledDate: time => {
        //   if (this.searchInfo.EndTime) {
        //     return time.getTime() > Date.now() || time.getTime() > this.searchInfo.EndTime;
        //   } else {
        //     return time.getTime() > Date.now();
        //   }
        // }
      },
      pickerOptions1: {
        // disabledDate: time => {
        //   return time.getTime() < this.searchInfo.StartTime || time.getTime() > Date.now();
        // }
      }
    };
  },
  mounted() {
    // 获取数据列表
    // this.getList(true);
    this.getEmaliInfo();
    this.changeCondition();
  },
  methods: {
    open_windowAlert(item) {
      // console.log(item);
      // this.detailForm = item;
      // this.dataliVisible = true;
      this.$router.push({
        path: "email-detail",
        query: { json: encodeURIComponent(JSON.stringify(item)) }
      });
    },
    // clsoe_windowAlert() {
    //   this.dataliVisible = false;
    // },
    handleCheckAllChange(val) {
      // console.log(val);
      this.checkedEmails = val ? this.checkedEmail : [];
      this.isIndeterminate = false;
    },
    handleCheckedEmailsChange(value) {
      // console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.total;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.total;
      // console.log(this.checkAll);
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      // this.searchInfo.StartTime = null;
      // this.searchInfo.EndTime = null;
      // this.getList(1);
    },
    // 获取数据列表
    getList() {
      // console.log(valid);
      if (
        this.searchInfo.sort ||
        this.searchInfo.EmailAddress ||
        this.searchInfo.StartTime ||
        this.searchInfo.EndTime
      ) {
        // console.log('flag');
        this.checkAll = false;
        this.checkedEmails = [];
        // let req = Object.assign({}, this.searchInfo);
        let req = {};
        if (this.searchInfo.EmailAddress) {
          req.EmailAddress = this.searchInfo.EmailAddress;
        }
        if (this.searchInfo.StartTime) {
          req.StartTime = this.searchInfo.StartTime;
        }
        if (this.searchInfo.EndTime) {
          req.EndTime = this.searchInfo.EndTime;
        }
        let self = this;
        let url =
          self.searchInfo.sort === 1
            ? accountApi.partner_mail_inquiry.getEmailList
            : accountApi.partner_mail_inquiry.getReceiveEmailList;
        for (var j = 0; j < self.tableDatas.length; j++) {
          self.tableDatas[j].list = [];
        }
        self.checkedEmail = [];
        this.tableLoading = true;
        // console.log(req);
        this.$MyFetch
          .get(url, req)
          .then((data = {}) => {
            // console.log(data);
            var compare = function(obj1, obj2) {
              var val1 = obj1.updatedDate;
              var val2 = obj2.updatedDate;
              if (val1 > val2) {
                return -1;
              } else if (val1 < val2) {
                return 1;
              } else {
                return 0;
              }
            };
            let result = data.sort(compare);
            self.total = result.length;
            for (var i = 0; i < result.length; i++) {
              self.checkedEmail.push(result[i]);
              // console.log(self.ckeckTime(data[i].time));
              for (var j = 0; j < self.tableDatas.length; j++) {
                if (
                  self.ckeckTime(result[i].updatedDate) ===
                  self.tableDatas[j].desc
                ) {
                  self.tableDatas[j].list.push(result[i]);
                }
              }
            }
            if (this.total === 0) {
              this.$error("无查询结果", "error");
            }
            this.tableLoading = false;
          })
          .catch(err => {
            this.$error(err.message);
            this.tableLoading = false;
          });
      } else {
        this.$error("请至少输入一个查询条件");
      }
    },
    ckeckTime(d) {
      // console.log(d);
      var td = new Date();
      td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
      var od = new Date(d);
      od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
      var xc = (od - td) / 1000 / 60 / 60 / 24;
      if (xc < -1) {
        return "上周";
      } else if (xc < 0) {
        return "昨天";
      } else if (xc === 0) {
        return "今天";
      }
    },
    // 导出
    exportEmail() {
      if (this.checkedEmails.length === 0) {
        this.confirmFn("您还没有选中合作方邮件", "error");
      } else if (this.checkedEmails.length > 5) {
        this.confirmFn("最高下载数量为5封", "error");
      } else {
        this.confirmFn(`确认导出吗？`, "warning").then(() => {
          var fileList = this.checkedEmails;
          for (var i = 0; i < fileList.length; i++) {
            this.toZip(fileList[i]);
          }
        });
      }
    },
    // 打包
    toZip(fileList) {
      // console.log(fileList[i]);
      let _that = this;
      let url = accountApi.idToUrls;
      const getUrl = (url, id) => {
        return new Promise((resolve, reject) => {
          this.$MyFetch
            .post(url, { fileId: id })
            .then((data = {}) => {
              this.tableLoading = false;
              // console.log(data);
              resolve(data.fileUrl);
            })
            .catch(err => {
              this.tableLoading = false;
              this.$error(err.message);
            });
        });
      };
      const getFile = url => {
        return new Promise((resolve, reject) => {
          _that.$MyFetch
            .get(url, "", "arraybuffer")
            .then((data = {}) => {
              // console.log(data);
              resolve(data);
            })
            .catch(err => {
              _that.$message.error(err.message);
              reject(err.toString());
              // console.log(err);
            });
        });
      };
      if (fileList.attachFiles) {
        let fileIdList = fileList.attachFiles.split(";");
        let fileNameList = fileList.attachFilesName.split(";");
        let zipName = fileList.subject + ".zip";
        fileIdList.pop();
        fileNameList.pop();
        // console.log(fileIdList);
        // console.log(fileNameList);
        const fileUrls = [];
        const zip = new JSZip();
        const cache = {};
        for (var j = 0; j < fileIdList.length; j++) {
          const fileUrl = getUrl(url, fileIdList[j]).then(data => {
            // console.log(data);
            let obj = {
              fileUrl: data,
              fileName: fileNameList,
              zipName: zipName
            };
            return obj;
          });
          fileUrls.push(fileUrl);
        }
        Promise.all(fileUrls)
          .then(data => {
            // console.log(data);
            const p = [];
            data.forEach((item, index) => {
              // console.log(item);
              const ps = getFile(item.fileUrl).then(data => {
                // 下载文件, 并存成ArrayBuffer对象
                // const arrName = item.split("/");
                // const fileName = arrName[arrName.length - 1]; // 获取文件名
                var fileName = item.fileName[index];
                zip.file(fileName, data, { binary: true }); // 逐个添加文件
                cache[fileName] = data;
              });
              p.push(ps);
            });
            Promise.all(p)
              .then(() => {
                zip.generateAsync({ type: "blob" }).then(content => {
                  // 生成二进制流
                  FileSaver.saveAs(content, zipName); // 利用file-saver保存文件
                });
              })
              .catch(error => {
                // console.log(promises);
                console.log(error);
                _that.confirmFn("下载文件失败", "success");
              });
          })
          .catch(error => {
            this.$error(error);
            console.log(error);
          });
      }
    },
    // 选择合作机构
    changeOrg(val) {
      // console.log(val);
      this.searchInfo.EmailAddress = "";
      for (var i = 0; i < this.activeOrgInfo.length; i++) {
        if (this.activeOrgInfo[i].lineId === val) {
          this.send_emails = this.activeOrgInfo[i].data;
          break;
        } else {
          this.send_emails = [];
        }
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.send_emails;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.toLowerCase().indexOf(queryString.toLowerCase()) > 0;
      };
    },
    handleSelect(item) {
      // console.log(item);
      this.searchInfo.EmailAddress = item;
    },
    // 获取邮件信息
    getEmaliInfo() {
      let para = {
        systemCode: "DSPM", // 必输 信贷系统:DSPM；核算系统：ACCT; 前端：front
        // linkBranchDs: this.linkBranchDs,
        stageType: "CZ" // 必输 待放款出账CZ/贷后DH
      };
      // console.log(data);
      this.$MyFetch
        .post(accountApi.email_config.queryLoanSendSet, para)
        .then((data = {}) => {
          // console.log(data);
          let emaliData = data.list ? data.list : data;
          // console.log(this.emaliData);
          var map = {};
          var dest = [];
          for (var i = 0; i < emaliData.length; i++) {
            var ai = emaliData[i];
            if (!map[ai.lineId]) {
              dest.push({
                lineId: ai.lineId,
                data: [ai.senderAddress]
              });
              map[ai.lineId] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.lineId === ai.lineId) {
                  dj.data.push(ai.senderAddress);
                  break;
                }
              }
            }
          }
          this.activeOrgInfo = dest;
          // console.log(dest);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取合作机构
    changeCondition() {
      let para = {};
      this.$MyFetch
        .post(accountApi.queryPartnerInfoList, para)
        .then((data = {}) => {
          // console.log(data);
          this.partnerList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>

<style lang="less">
.partner-mail-inquiry-autocomplete {
  width: auto !important;
}
.partner-mail-inquiry {
  .el-table {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .e-table {
    .el-checkbox__label {
      display: none;
    }
  }
  .emali-table-cont {
    .el-checkbox__label {
      display: none;
    }
  }
  .el-table__empty-block {
    display: none;
  }
}
</style>

<style lang="less" scoped>
.content.partner-mail-inquiry {
  background-color: #ffffff;
  min-height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  padding: 0px 30px;
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
    .upload-export {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 0px;
      z-index: 1;
      color: #538bf1;
      span {
        color: #538bf1;
        font-weight: 400;
      }
    }
  }
  .sponsor {
    width: 100%;
    padding-top: 20px;
    min-height: calc(100% - 60px);
    .tables {
      // height: calc(100% - 170px);
      // overflow-y: auto;
      .emali-table-w {
        overflow-x: auto;
        .emali-table {
          // min-width: 1130px;
          // min-height: 158px;
          background: #ececec;
          border: 1px solid #e9e9e9;
          border-radius: 4px;
          ul li {
            float: left;
            height: 38.9px;
            line-height: 38.9px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #bbbbbb;
            letter-spacing: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 0 18px;
          }
          .emali-check {
            width: 50px;
            text-align: center;
          }
          .emali-cont-item-info {
            width: calc(100% - 50px);
          }
          .emali-send {
            // width: 200px;
            width: 11%;
          }
          .emali-content {
            // width: 680px;
            width: 74%;
          }
          .emali-time {
            // width: 180px;
            width: 15%;
          }
          .emali-table-cont {
            .emali-cont-list {
              background: #ffffff;
              ul {
                li {
                  font-family: PingFang-SC-Regular;
                  font-size: 14px;
                  color: #333333;
                  letter-spacing: 0;
                  height: 60px;
                  line-height: 60px;
                  cursor: pointer;
                }
                .emali-content.li:hover {
                  color: #409eff;
                }
              }
              .el-checkbox__label {
                display: none;
              }
            }
          }
          .emali-cont-time {
            padding-left: 12px;
            height: 38.9px;
            line-height: 38.9px;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #538bf1;
            letter-spacing: 0;
            border-top: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            span {
              margin-left: 10px;
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              color: #3f3f3f;
              letter-spacing: 0;
              line-height: 20px;
            }
          }
        }
      }
    }
    // 搜索栏样式
    .search {
      .el-form-item {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 170px;
      }
      .el-input--prefix .el-input__inner {
        padding: 0 15px;
        padding-left: 15px;
      }
      .el-form-item-btn {
        width: auto;
        margin-right: 0;
      }
      .el-form-item-last {
        margin-right: 35px;
      }
    }
  }
  // 按钮颜色
  .el-button--primary {
    background: #538bf1;
    color: #fff;
  }
  // 清空按钮
  .claer_btn {
    border: 1px solid #538bf1;
    background-color: #ffffff;
    color: #538bf1;
  }
  // 底部按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    // 删除提交公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .lg_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .export_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
.e-table {
  min-width: 1090px;
  .el-checkbox__label {
    display: none;
  }
  .el-table__body,
  .el-table__header {
    width: 100%;
  }
  th {
    height: 38px;
    line-height: 38px;
    background: rgb(249, 250, 251);
    margin: 0;
    padding: 0;
    .cell {
      text-align: left;
    }
  }
  td {
    border-bottom: none;
    .cell {
      text-align: left;
    }
  }
}
</style>
