<template>
  <div class="dialog-box bgceee">
    <div class="model-border">
      <div class="model-title">
        <h3 class="fl">{{ContarctInfo.leaseForm.gardenName}}{{ContarctInfo.leaseForm.buildingName}} {{ContarctInfo.leaseForm.number}}房</h3>
        <p class="content-item fr">
          <span class="content-item-label">管家：</span>{{ContarctInfo.leaseForm.bdName}}
        </p>
      </div>
      <div class="model-title-address">
        <span class="head-info-item">{{ContarctInfo.leaseForm.address}}</span>
      </div>
      <div class="model-title-status">
        <span class="head-info-item fl">{{ContarctInfo.rentAcctName}}(合同周期：{{ContarctInfo.leaseForm.leaseCreateTimeDesc}}至{{ContarctInfo.leaseForm.leaseFinalTimeDesc}})</span>
        <span class="fr">{{ContarctInfo.stateDesc}}</span>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">基本信息</header>
      <div class="pd-nb">
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">业主姓名：</span>{{ContarctInfo.rentAcctName}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">手机号码：</span>{{ContarctInfo.rentAcctPhone}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">证件号：</span>{{ContarctInfo.rentAcctIdCard}}
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">开户行：</span>{{ContarctInfo.rentAcctBank}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">收租账号：</span>{{ContarctInfo.rentAcctBankcardId}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">签约日期：</span>{{ContarctInfo.signupTimeDesc}}
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">纸质合同编号：</span>{{ContarctInfo.paperContractNumber}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">交房日期：</span>{{ContarctInfo.commitHouseDesc}}
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="20">
            <p class="content-item">
              <span class="content-item-label">合同备注：</span>{{ContarctInfo.contractDescription}}
            </p>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">免租期：</span>{{ContarctInfo.leaseForm.rentFreeDays}}天/年
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">装修期：</span>{{ContarctInfo.leaseForm.decorateDays}}天
            </p>
          </el-col>


        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">交房日期：</span>{{ContarctInfo.commitHouseDesc}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">租期：</span>{{ContarctInfo.leaseForm.leaseCreateTimeDesc}}至{{ContarctInfo.leaseForm.leaseFinalTimeDesc}}
            </p>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">委托信息</header>
      <div class="pd-nb">
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">租金：</span>{{ContarctInfo.leaseForm.rentMoney}}元/月
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">面积：</span>{{ContarctInfo.leaseForm.area}}平米
            </p>
          </el-col>

          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">单价：</span>{{ContarctInfo.leaseForm.leaseRoomPrice}}元/平方/月
            </p>
          </el-col>

        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">押金：</span>{{ContarctInfo.leaseForm.depositMoney}}元
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">付款方式：</span>{{ContarctInfo.leaseForm.payTypeDesc}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">宽带：</span>{{ContarctInfo.chargeForm.internetCharges}}元/月
            </p>
          </el-col>
          <!-- <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">租金递增：</span>{{ContarctInfo.leaseForm.payRate}}%/年
            </p> -->
          <!-- </el-col> -->

        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">水表：</span>{{ContarctInfo.chargeForm.waterYield}}吨
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">电表：</span>{{ContarctInfo.chargeForm.electricConsume}}度
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">燃气表：</span>{{ContarctInfo.chargeForm.gasYield}}立方
            </p>
          </el-col>

        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">水费：</span>{{ContarctInfo.chargeForm.waterCharges}}元/吨
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">电费：</span>{{ContarctInfo.chargeForm.electricCharges}}元/度
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">燃气费：</span>{{ContarctInfo.chargeForm.gasCharges}}元/立方
            </p>
          </el-col>
        </el-row>
        <el-row>
          <!-- <div class="pay-rate-box flex-start-grow">
            <div class="pdh-ten">
              租金递增：
            </div>
            <div class="show-pay-rate flex-1 font-12 c-6">
              <div v-if="Object.entries(ContarctInfo.leaseForm.leasePriceRateDesc).length > 0"
                class="pdh-ten text-ellips">
                <span v-for="(item,index) in Object.values(ContarctInfo.leaseForm.leasePriceRateDesc)[0].split(',')"
                  :key="index">
                  <span v-if="index !==0">，
                  </span>第{{index + 2}}年{{item || 0}}{{Object.keys(ContarctInfo.leaseForm.leasePriceRateDesc)[0] === 'RADIO_INCREASE' ? '%' : '元'}}
                </span>
              </div>
              <div class="pdh-ten">暂无递增计划</div>
            </div>
          </div> -->
          <el-col :span="8">
            <div class="content-item">
              <span class="content-item-label">租金递增：</span>
              <slot v-if="Object.entries(ContarctInfo.leaseForm.leasePriceRateDesc).length > 0"
                class="pdh-ten text-ellips">
                <span v-for="(item,index) in Object.values(ContarctInfo.leaseForm.leasePriceRateDesc)[0].split(',')"
                  :key="index"
                  class="font-12 c-6">
                  <span v-if="index !==0">，
                  </span>第{{index + 2}}年{{item || 0}}{{Object.keys(ContarctInfo.leaseForm.leasePriceRateDesc)[0] === 'RADIO_INCREASE' ? '%' : '元'}}
                </span>
              </slot>
              <span v-else>暂无递增计划</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">附件信息</header>
      <div class="bdb-ddd">
        <header class="tentan-header">业主身份证附件</header>
        <div class="pd-ten">
          <div class="clearfix">
            <viewer :options="options"
              :images="filesIDcard"
              class="viewer"
              ref="viewerFilesIDcard">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in filesIDcard"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.pictureUrl.replace('{size}', '160x120')"
                    :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                </div>
              </template>
            </viewer>
          </div>
        </div>
      </div>
      <div class="bdb-ddd">
        <header class="tentan-header">房产证附件</header>
        <div class="pd-ten">
          <div class="clearfix">
            <viewer :options="options"
              :images="filesHouse"
              class="viewer"
              ref="viewerFilesHouse">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in filesHouse"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.pictureUrl.replace('{size}', '160x120')"
                    :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                </div>
              </template>
            </viewer>
          </div>
        </div>
      </div>
      <div class="bdb-ddd">
        <header class="tentan-header">合同附件</header>
        <div class="pd-ten">
          <div class="clearfix">
            <viewer :options="options"
              :images="filesContract"
              class="viewer"
              ref="viewerFilesContract">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in filesContract"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.pictureUrl.replace('{size}', '160x120')"
                    :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                </div>
              </template>
            </viewer>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!showOldList"
      class="model-border">
      <header class="model-header">合同历史</header>
      <div class="pd-20">
        <div class="boder">
          <el-table :data="ContarctInfo.oldContractForm"
            style="width: 100%"
            size="mini"
            @row-click="handleRow">
            <!-- 5-300字 -->
            <el-table-column prop="contractNumber"
              label="合同编号"
              :width="100"
              align="center">
            </el-table-column>
            <el-table-column prop="signupTimeDesc"
              label="签约时间"
              :width="100"
              align="center">
            </el-table-column>
            <el-table-column label="租期"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.leaseCreateTimeDesc}}至{{scope.row.leaseFinalTimeDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stateDesc"
              label="状态"
              align="center"
              :width="80">
            </el-table-column>
            <el-table-column prop="bDName"
              label="管家"
              align="center"
              :width="100">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div v-if="!showOldList"
      class="model-border">
      <header class="model-header">未执行合同</header>
      <div class="pd-20">
        <div class="boder">
          <el-table :data="ContarctInfo.unstartContract"
            style="width: 100%"
            size="mini"
            @row-click="handleRow">
            <!-- 5-300字 -->
            <el-table-column prop="contractNumber"
              label="合同编号"
              :width="100"
              align="center">
            </el-table-column>
            <el-table-column prop="signupTimeDesc"
              label="签约时间"
              :width="100"
              align="center">
            </el-table-column>
            <el-table-column label="租期"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.leaseCreateTimeDesc}}至{{scope.row.leaseFinalTimeDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stateDesc"
              label="状态"
              align="center"
              :width="80">
            </el-table-column>
            <el-table-column prop="bDName"
              label="管家"
              align="center"
              :width="100">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContarctInfo',
  data() {
    return {
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      num1: 1,
      filesIDcard: [],
      filesHouse: [],
      filesContract: [],
      ContarctInfo: {
        'chargeForm': {
          'electricCharges': '',
          'electricConsume': '',
          'gasCharges': '',
          'internetCharges': '',
          'waterCharges': '',
          'waterYield': ''
        },
        'leaseForm': {
          'buildingName': '',
          'city': '',
          'decorateDays': '',
          'depositMoney': '',
          'gardenName': '',
          'leaseCreateTime': '',
          'leaseCreateTimeDesc': '1',
          'leaseDays': '',
          'leaseFinalTime': '',
          'leaseFinalTimeDesc': '',
          'leaseRoomPrice': '',
          'number': '',
          'payRate': '',
          'payType': '',
          'payTypeDesc': '',
          'rentFreeDays': '',
          'rentMoney': '',
          'roomId': '',
          leasePriceRateDesc: {}
        },
        'oldContractForm': [
        ],
        'unstartContract': [],
        'pictureList': [
          // {
          //   'contractId': '',
          //   'createOperatorId': '',
          //   'createTime': null,
          //   'id': '5eabada2-6d0b-496a-b4f9-e8ebc9999392',
          //   'pictureType': 'IDCARD_FRONT',
          //   'pictureUrl': 'houseCert250.new.com',
          //   'updateOperatorId': '',
          //   'updateTime': null
          // },
        ],
        'rentAcctBank': '',
        'rentAcctBankcardId': '',
        'rentAcctName': '',
        'signupTime': null,
        'signupTimeDesc': '',
        'commitHouse': null,
        'commitHouseDesc': ''
      }
    };
  },
  props: ['dialogVisible', 'id', 'contractId', 'showOldList'],
  created() {
    this.requestData();
  },
  methods: {
    // 分类返回的图片
    forPicList(list) {
      for (var j = 0, len = list.length; j < len; j++) {
        list[j].pictureUrl.replace('{size}', '160x120');
        if (list[j].pictureType === 'IDCARD_FRONT') {
          // 正面
          this.filesIDcard.push(list[j]);
        }
        if (list[j].pictureType === 'IDCARD_VERSE') {
          // 反面
          this.filesIDcard.push(list[j]);
        }
        if (list[j].pictureType === 'HOUSE_CERT') {
          // 房产证
          this.filesHouse.push(list[j]);
        }
        if (list[j].pictureType === 'CONTRACT_ATTACH') {
          // 合同
          this.filesContract.push(list[j]);
        }
      }
      // this.$refs.upload.add;
    },
    // 编辑获取数据
    requestData() {
      // /security/room/contract/queryContractDetail
      this.$axios.get(
        '/security/room/contract/queryContractDetail',
        {
          params: {
            // id: '70ede68e-e192-4f33-8020-5817ddf02f5a'
            id: this.contractId
          }
        }
      ).then((res) => {
        // console.log(res);
        if (res.data.status === 'C0000') {
          this.ContarctInfo = res.data.result;
          this.ContarctInfo.leaseForm.leasePriceRateDesc = this.ContarctInfo.leaseForm.leasePriceRate ? JSON.parse(this.ContarctInfo.leaseForm.leasePriceRate) : {};
          this.forPicList(this.ContarctInfo.pictureList);
          this.setData();
        } else {
          this.$message.error('查询合同失败');
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    setData() {
      this.$emit('setParam', { // 父子组件之间的传值
        gardenName: this.ContarctInfo.leaseForm.gardenName,
        buildingName: this.ContarctInfo.leaseForm.buildingName,
        number: this.ContarctInfo.leaseForm.number,
        roomId: this.ContarctInfo.leaseForm.roomId,
        bdName: this.ContarctInfo.leaseForm.bdName
      });
    },
    handleRow(row, event, column) {
      this.$emit('setOldcontractId', {
        oldContractId: row.id
      });
    }
  }
  // components: {
  // }
};
</script>
<style scoped>
.model-title {
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  text-align: left;
  background-color: #fafafa;
}
.model-title-address {
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
  background-color: #fafafa;
  color: #555;
}
.model-title-status {
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
  background-color: #f5f5f5;
}
.model-title-status .fr {
  color: skyblue;
  padding-right: 30px;
}
/* el-select el-select--mini */
.funds-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #dddddd;
}
.funds-info-item {
  margin-left: 10px;
}

.img-item {
  margin: 15px;
  width: 160px;
  height: 160px;
  float: left;
}
.img-item-content {
  width: 160px;
  height: 120px;
  position: relative;
}
.del-img {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 30px;
  text-align: center;
  color: #999;
  background-color: #333;
}
.upload-info {
  position: absolute;
  top: 30px;
  left: 0;
}
/* .img-content {
  display: block;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
} */
.pd-nb {
  padding: 20px 20px 0 20px;
}
.boder {
  border: 1px solid #ddd;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.tentan-header {
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
}
</style>
