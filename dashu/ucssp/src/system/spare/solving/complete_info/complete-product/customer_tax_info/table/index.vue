<template>
  <div class="tax_table_wrap">
    <div class="dialog-box__middle-top" v-if="tabTitle">
      <h5 class="title"><span class="icon icon__gan"></span>{{ tabTitle }}</h5>
    </div>
    <div class="horizon"></div>
    <!-- 表格 -->
    <div class="tax_table" v-if="comTabShow" :class="{need_page: isNeedPage}">
      <el-table :data="tableData" style="100%" :height="tabHeight">
        <el-table-column
          v-for="(item, key) in columnList"
          :key="key"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth || minWidth">
            <template slot-scope="scope">
              <el-tooltip :effect="item.effect || effect" :content="scope.row[item.prop]* 100 + '%'" :placement="item.placement || placement" v-if="item.prop === 'investmentPct'">
                <div class="ellipsis">
                  {{scope.row.investmentPct * 100}}%
                </div>
              </el-tooltip>
              <!-- content 只接受string，所以加个'' -->
              <el-tooltip :effect="item.effect || effect" :content="scope.row[item.prop] + ''" :placement="item.placement || placement" v-else>
                <div class="ellipsis">
                  {{scope.row[item.prop]}}
                </div>
              </el-tooltip>
            </template>
        </el-table-column>
      </el-table>
      <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
      v-if="isNeedPage"></pagination>
    </div>
    <div class="base_info" v-if="!comTabShow">
      <div v-for="(item, index) in baseInfoLabel" :key="index">
        <span class="color_999">{{item | baseInfoLabelFilter(labelFliterMap)}}</span>: <span class="color_000"> {{baseInfoData[item]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import pagination from "@components/pagination";
  import { mapState } from 'vuex';
  import {spareApi} from '@system/spare/js/server.js';
  export default {
    data() {
      return {
        name: 'table render',
        tableData: [],
        baseInfoData: {},
        minWidth: 150,
        popWith: '400',
        effect: 'dark',
        placement: 'top',
        pageConfig: {
          account: 20, // 总条数
          pageSize: 10, // 当前多少条数据
          currentPage: 1, // 当前页
          showJumpButton: true // 显示跳转按钮
        } // 分页
      };
    },
    props: {
      columnList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      tabHeight: {
        type: Number,
        default: () => {
          return 180;
        }
      },
      tabTitle: {
        type: String,
        default: () => {
          return '';
        }
      },
      baseInfoLabel: {
        type: Array,
        default: () => {
          return [];
        }
      },
      labelFliterMap: {
        type: Object,
        default: () => {
          return {};
        }
      },
      isNeedPage: {
        type: Boolean,
        default: () => {
          return true;
        }
      },
      api: {
        type: String,
        default: () => {
          return '';
        }
      },
      comTabShow: {
        type: Boolean,
        default: () => {
          return true;
        }
      }
    },
    methods: {
      getAllSelectValue(name) {
        return new Promise((resolve) => {
          this.$MyFetch.get(spareApi.commonSelectAll, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      jump(_pageNum) {
        // console.log(this.tabTitle);
        this.pageConfig.currentPage = _pageNum;
        this.getTabList(this.pageConfig.currentPage);
      },
      getContactType(_type = '', _list = [], _key = 'itemCode') {
        return _list.find((_n) => {
          return _type === _n[_key];
        });
      },
      getTabList(_pageNum) {
        let params = {
          pageNum: _pageNum,
          pageSize: this.pageConfig.pageSize,
          applicationId: this.taxLoan.taxpayerNum
          // applicationId: 'RL20190318095353'
        };
        let promise = new Promise((resolve, reject) => {
          this.$MyFetch.get(this.api, params).then(data => {
            resolve(data);
          }).catch(_erro => {
            this.$error(_erro.message);
          });
        });
        if (this.tabTitle === '联系人信息') {
          Promise.all(
            [promise, this.getAllSelectValue('tl_contact_type_cd')]
          ).then(_data => {
            if (this.$lodash.isEmpty(_data)) {
              return false;
            }
            let dataList = _data[0].list;
            let codeList = _data[1];
            this.$lodash.each(dataList, (_e, _i) => {
              _e.contactType = this.getContactType(_e.contactTypeCd, codeList).itemDesc;
            });
            this.tableData = dataList;
            this.pageConfig.account = _data[0].total;
            this.pageConfig.currentPage = _data[0].pageNum;
          });
        } else {
          promise.then(data => {
            if (!data) {
              this.$error('纳税人基本信息为空');
              return false;
            }
            if (data.list instanceof Array) {
              this.tableData = data.list;
              let index = 0;
              this.$lodash.each(this.tableData, (_e) => {
                _e.num = ++index;
              });
              this.pageConfig.account = data.total;
              this.pageConfig.currentPage = data.pageNum;
            }
            if (data instanceof Object) {
              this.baseInfoData = data;
            }
          });
        }
      }
    },
    mounted() {
      // console.log(this.comHeight);
      this.getTabList(1);
    },
    computed: {
      ...mapState(['taxLoan']),
      comHeight() {
        let h = '';
        if (this.tabHeight) {
          h = this.tabHeight;
        }
        return h;
      }
      // comTabShow() {
      //   return !this.$lodash.isEmpty(this.tableData);
      // }
    },
    filters: {
      baseInfoLabelFilter(_val, _map) {
        return _map[_val];
      }
    },
    components: {
      pagination
    }
  };
</script>
<style lang="less">
  .tax_table_wrap {
    width: 1160px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
    background: #FFFFFF;
    padding: 20px 25px;
    border-radius: 4px;
    margin-bottom: 20px;
    .horizon {
      height: 1px;
      width: 1110px;
      background-color: #d0d0d0;
      margin-bottom: 20px;
    }
    .dialog-box__middle-top{
      padding: 0 5px 20px 5px;
      .title{
        font-size: 16px;
        text-align: left;
        .icon__gan{
          margin-right: 10px;
        }
      }
    }
    .need_page {
      padding-bottom: 10px;
    }
    .tax_table {
      font-size: 14px;
      background: #FFFFFF;
      // box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      margin:0 5px;
      .el-table {
        border: 1px solid #d0d0d0;
      }
      .el-table.el-table--fit {
        border-radius: 4px;
      }
      /deep/ .el-table__header {
        font-size: 12px;
      }
       /deep/ .el-table__header thead tr > th{
        padding: 3px 0;
        background: #ececec;
      }
      .pagination {
        margin-top: 10px;
        margin-right: 10px;
      }
    }
    .base_info {
      display: flex;
      padding: 0 5px;
      flex-wrap: wrap;
      margin-top: -5px;
    }
    .base_info > div {
      width: 25%;
      font-size: 14px;
      padding: 7px 0;
      line-height: 20px;
      text-align: left;
      .color_999 {
        color: #666;
      }
      .color_000 {
        color: #000;
        padding-left: 3px;
      }
    }
  }
</style>
