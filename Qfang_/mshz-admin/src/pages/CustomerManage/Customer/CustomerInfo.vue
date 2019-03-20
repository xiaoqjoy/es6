<template>
  <section class="dialog-box bgceee">
    <div class="model-border">
      <header class="model-header">基本信息</header>
      <div class="pd-20">
        <el-row>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">姓名：</span>{{customerInfo.name}}
            </p>
          </el-col>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">手机：</span>{{customerInfo.phone}}
              <el-button type="text"
                v-if="customerInfo.showViewButton"
                size="mini"
                @click="handleWachtPhone">查看</el-button>
            </p>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">

          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row> -->
      </div>

    </div>
    <div class="model-border">
      <header class="model-header">意向信息</header>
      <div class="pd-20">
        <el-row>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">户型：</span>{{customerInfo.intentionModel.houseTypeListDesc}}
            </p>
          </el-col>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">面积：</span>{{showEarea}}
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">价格：</span>{{showPrice}}
            </p>
          </el-col>
          <el-col :span="12">
            <p class="content-item">
              <span class="content-item-label">客户来源：</span>{{customerInfo.custSourceDesc}}
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <p class="content-item flex-start-grow">
              <span class="content-item-label">客户要求：</span>
              <span class="break-all flex-1">{{customerInfo.intentionModel.remark ? customerInfo.intentionModel.remark : '--'}}</span>
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">跟进信息</header>
      <div class="pd-20">
        <el-row v-if="!userInfo.manager"
          class="pdb-20">
          <el-col :span="22">
            <textarea type="textarea"
              rows="2"
              v-model="followInfo"
              maxlength="100"
              autocomplete="off"
              validateevent="true"
              class="v-textarea"
              style="min-height: 33px;"></textarea>
          </el-col>
          <el-col :span="2">
            <button class="v-button"
              @click="handleSubmit">
              <span>保存</span>
            </button>
          </el-col>
        </el-row>
        <div class="follow-table border-ddd">
          <el-table :data="customerFollowModelList"
            height="300"
            style="width: 100%"
            size="mini">
            <!-- 5-300字 -->
            <el-table-column prop="remark"
              :min-width="200"
              label="跟进信息"
              align="left">
            </el-table-column>
            <el-table-column prop="managerName"
              :min-width="100"
              label="跟进人"></el-table-column>
            <!-- <el-table-column prop="followPersonName" label="跟进人" align="left" width="180">
        </el-table-column> -->
            <el-table-column prop="createTime"
              label="日期"
              align="center"
              :min-width="180">
            </el-table-column>
          </el-table>
          <div class="user-pagination">
            <el-pagination class="user-page"
              @size-change="oRhandleSizeChange"
              @current-change="oRhandlePageChange"
              :current-page.sync="orcurrentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="orpageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-count="orpageCount"
              :total="ortotal">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      followInfo: '',
      showEarea: '',
      showPrice: '',
      customerFollowModelList: [],
      customerInfo: {
        'aliasName': 'string',
        'custId': 'string',
        'customerFollowModelList': [
          {
            'id': {},
            'remark': 'string'
          }
        ],
        'customerModel': {
          'custSource': 'Sina',
          'custSourceDesc': 'string',
          'id': {},
          'name': 'string',
          'phone': 'string'
        },
        'id': 'string',
        'intentionModel': {
          'areaEnd': 0,
          'areaStart': 0,
          'houseType': 'ONE_ROOM',
          'houseTypeDesc': 'string',
          'id': {},
          'priceEnd': 0,
          'priceStart': 0,
          'privateCustId': 'string',
          'remark': 'string'
        },
        'managerId': 'string',
        'phone': 'string',
        'viewSituation': 'string',
        'viewTime': '2018-05-16T10:56:57.519Z'
      },

      ortotal: 0, // 数据总数
      orpageSize: 10, // 每页的数据量
      orcurrentPage: 1,
      orpageCount: null /// 总页数
    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  props: ['custId'],
  created() {
    Promise.all([this.requestData(), this.requestCustomerFollowData()]);
  },
  methods: {
    // 获取
    requestData() {
      return this.$axios.get(
        '/security/customer/queryCustomerDetail',
        {
          params: {
            id: this.custId
          }
        }
      ).then((res) => {
        if (res.data.result && res.data.status === 'C0000') {
          this.customerInfo = res.data.result;
          this.$emit('setCustName', this.customerInfo.name);
          this.handleShowInfo('area');
          this.handleShowInfo('price');
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '获取租客信息异常！');
        console.log(err);
      });
    },
    handleWachtPhone() {
      this.$axios.post(
        '/security/customer/updatePrivateCust',
        {
          id: this.custId
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.requestData();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '获取租客信息异常！');
        console.log(err);
      });
    },
    // 保存跟进信息
    handleSubmit() {
      if (this.followInfo.trim().length === 0) {
        this.$message.warning('请输入跟进信息');
        return false;
      }
      this.$axios.post(
        '/security/customer/addCustomerFollow',
        {
          privateCustId: this.custId,
          remark: this.followInfo.trim()
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('操作成功');
          this.requestCustomerFollowData();
          // this.customerInfo.customerFollowModelList.push({
          //   remark: this.followInfo.trim()
          // });
          this.followInfo = '';
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.message || '服务异常');
      });
    },
    requestCustomerFollowData() {
      return this.$axios.get(
        '/security/customer/queryCustomerFollow',
        {
          params: {
            privateCustId: this.custId,
            pageSize: this.orpageSize,
            currentPage: this.orcurrentPage
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.customerFollowModelList = res.data.result.items;
          this.orpageCount = res.data.result.pageCount;
          this.ortotal = res.data.result.recordCount;
        } else {
          this.customerFollowModelList = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.customerFollowModelList = [];
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },
    handleShowInfo(type) {
      let myCustData = this.customerInfo;
      let myStart = type === 'area' ? myCustData.intentionModel.areaStart : myCustData.intentionModel.priceStart;
      let myEnd = type === 'area' ? myCustData.intentionModel.areaEnd : myCustData.intentionModel.priceEnd;
      if (myStart > 0 && myEnd > 0 && myStart !== myEnd) {
        if (type === 'area') {
          this.showEarea = myStart + '-' + myEnd + '㎡';
        } else {
          this.showPrice = myStart + '-' + myEnd + '元/月';
        }
      } else if (myStart > 0 && !myEnd > 0) {
        if (type === 'area') {
          this.showEarea = myStart + '㎡以上';
        } else {
          this.showPrice = myStart + '元/月以上';
        }
      } else if (!myStart > 0 && myEnd > 0) {
        if (type === 'area') {
          this.showEarea = myEnd + '㎡以下';
        } else {
          this.showPrice = myEnd + '元/月以下';
        }
      } else if (myStart > 0 && myStart === myEnd) {
        if (type === 'area') {
          this.showEarea = myStart + '㎡';
        } else {
          this.showPrice = myStart + '元/月';
        }
      } else {
        if (type === 'area') {
          this.showEarea = '';
        } else {
          this.showPrice = '';
        }
      }
    },
    // 分页每页几条
    oRhandleSizeChange(val) {
      this.orpageSize = val;
      this.requestCustomerFollowData();
    },

    // 跳到第几页
    oRhandlePageChange(val) {
      this.orcurrentPage = val;
      this.requestCustomerFollowData();
    }
  }
};
</script>
<style scoped>
.v-textarea {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #5a5e66;
  background-color: #fff;
  border: 1px solid #a6a6a6;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.v-textarea:focus {
  outline: 0;
  border: 1px solid #008842;
}
.v-button {
  display: inline-block;
  height: 54px;
  width: 100%;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #008842;
  border: 1px solid #42905b;
  color: #ffffff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.v-button:hover {
  background-color: #4c9c65;
  border: 1px solid #26743f;
}
.v-button:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.user-pagination {
  /* display: none; */
  width: 100%;
  left: 0;
  bottom: 0;
  height: 50px;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fafafa;
}
.user-page {
  margin-top: 8px;
  float: left;
}
.break-all {
  word-break: break-all;
}
</style>


