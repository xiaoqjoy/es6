<template>
  <section class="dialog-box bgceee">
    <div class="model-border">
      <header class="model-header">
        <span :class="{'c-red':takingDetailInfo.leadLookStatusEnum !== 'ALREADY_LEAD_LOOK', 'c-green':takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK'}">
          <i class="el-icon-time"></i> {{takingDetailInfo.leadLookWarnDesc ? takingDetailInfo.leadLookWarnDesc:takingDetailInfo.leadLookStatusEnumDesc}}
        </span>
        <!-- <span v-else-if="takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK'"
          class="c-green">
          <i class="el-icon-circle-check-outline"></i> {{takingDetailInfo.leadLookStatusEnumDesc}}
        </span> -->
        <!-- v-if="takingDetailInfo.leadLookStatusEnum === 'CANCEL_LEAD_LOOK' || takingDetailInfo.leadLookStatusEnum === 'EXPIRED_LEAD_LOOK'" -->
        <!-- <span v-else-if="takingDetailInfo.leadLookStatusEnum === 'CANCEL_LEAD_LOOK'"
          class="c-red">
          <i class="el-icon-circle-close-outline"></i> {{takingDetailInfo.leadLookStatusEnumDesc}}
        </span>
        <span v-else
          class="c-red">
          <i class="el-icon-circle-close-outline"></i> {{takingDetailInfo.leadLookStatusEnumDesc}}
        </span> -->
      </header>
      <div class="pd-20">
        <el-row class="min-h50">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">{{takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK'? '带看时间：' : '预约时间：'}}</span>{{takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK'? takingDetailInfo.leadLookDateDesc : takingDetailInfo.reserveDateDesc}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">带看客户：</span>{{takingDetailInfo.prvtCustInfo.name}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">客户手机：</span>{{takingDetailInfo.prvtCustInfo.phone}}
              <el-button type="text"
                v-if="takingDetailInfo.prvtCustInfo.showViewButton"
                size="mini"
                @click="handleWachtPhone">查看</el-button>
            </p>
          </el-col>
        </el-row>
        <el-row v-if="takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK'"
          class="min-h50">
          <el-col>
            <p class="content-item">
              <span class="content-item-label">陪看人：</span>
              <slot v-if="takingDetailInfo.lookAccompanyItem.length>0">
                <span v-for="(item,index) in takingDetailInfo.lookAccompanyItem"
                  :key="index"> <i v-if="index>0">，</i> {{item.accompanyName}}</span>
              </slot>
              <span v-else>--</span>
            </p>
          </el-col>
        </el-row>
        <el-row class="min-h50">
          <el-col :span="24">
            <p class="content-item flex-start-grow">
              <span class="content-item-label">{{takingDetailInfo.leadLookStatusEnum === 'ALREADY_LEAD_LOOK' ||takingDetailInfo.leadLookStatusEnum === 'CANCEL_LEAD_LOOK'? '带看反馈' : '备注'}}：</span>
              <span style="flex:1;word-break: break-all;">{{takingDetailInfo.remark ? takingDetailInfo.remark : '--'}}</span>
            </p>
          </el-col>
        </el-row>
        <el-row class="min-h50">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">带看房源：</span>{{takingDetailInfo.roomModels.length}}套
            </p>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <div class="border-ddd">
          <el-table :data="takingDetailInfo.roomModels"
            header-align="center"
            style="width: 100%"
            size="mini">
            <el-table-column align="center"
              label="房源"
              :min-width="250">
              <template slot-scope="scope">
                {{scope.row.gardenName}} <br/> {{scope.row.buildingName}} {{scope.row.roomNumber}} {{scope.row.bedRoomNum}}
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="longLeaseTypeDesc"
              label="模式"
              :min-width="80">
            </el-table-column>
            <el-table-column align="center"
              label="户型"
              :min-width="100">
              <template slot-scope="scope">
                {{scope.row.bedRoom}}房{{scope.row.livingRoom}}厅
              </template>
            </el-table-column>
            <el-table-column align="center"
              label="面积"
              :min-width="80">
              <template slot-scope="scope">
                {{scope.row.area}}㎡
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="managerName"
              label="管家"
              :min-width="80">
            </el-table-column>
            <slot v-if="myLeadLookStatusEnum === 'ALREADY_LEAD_LOOK'">
              <el-table-column align="center"
                prop="intentionEnumDesc"
                label="意向"
                :min-width="100">
              </el-table-column>
            </slot>
          </el-table>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
export default {
  data() {
    return {
      followInfo: '',
      takingDetailInfo: {
        'leadLookDate': '',
        'leadLookDateDesc': '',
        'leadLookNo': '',
        'leadLookStatusEnum': 'NO_LEAD_LOOK',
        'leadLookStatusEnumDesc': '',
        'leadLookWarnDesc': '',
        'leadRoomCount': '',
        'lookAccompanyItem': [
          {
            'additionalProp1': '',
            'additionalProp2': '',
            'additionalProp3': ''
          }
        ],
        'managerId': '',
        'prvCustId': '',
        'prvtCustInfo': {
          'custSource': 'Sina',
          'custSourceDesc': '',
          'id': '',
          'name': '',
          'phone': '',
          'showViewButton': false,
          'viewTime': ''
        },
        'remark': '',
        'reserveDate': '',
        'reserveDateDesc': '',
        'roomModels': [
          {
            'area': 0,
            'bedRoom': '',
            'bedRoomNum': '',
            'buildingName': '',
            'gardenName': '',
            'id': '',
            'intentionEnum': 'HVAE',
            'intentionEnumDesc': '',
            'livingRoom': '',
            'longLeaseType': 'SHARED_RENT',
            'longLeaseTypeDesc': '',
            'managerName': '',
            'roomNumber': ''
          }
        ]
      }
    };
  },
  props: ['leadLookNo', 'myLeadLookStatusEnum'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.$axios.get(
        '/security/leadLook/selectLeadLookDetail',
        {
          params: {
            id: this.leadLookNo
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.takingDetailInfo = res.data.result;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '获取信息异常！');
        console.log(err);
      });
    },
    handleWachtPhone() {
      this.$axios.post(
        '/security/customer/updatePrivateCust',
        {
          id: this.takingDetailInfo.prvtCustInfo.id
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
    }

  }
};
</script>
<style scoped>
.min-h50 {
  min-height: 50px;
  line-height: 50px;
}
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
</style>


