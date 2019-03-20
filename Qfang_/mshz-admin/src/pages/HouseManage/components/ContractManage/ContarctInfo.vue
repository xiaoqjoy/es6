<template>
  <div class="dialog-box bgceee">
    <div class="model-border">
      <div class="pd-nb">
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">楼盘：</span>{{ContarctInfo.leaseForm.gardenName}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">楼栋：</span>{{ContarctInfo.leaseForm.buildingName}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">房号：</span>{{ContarctInfo.leaseForm.number}}
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">面积：</span>{{ContarctInfo.leaseForm.area}}平米
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">租金：</span>{{ContarctInfo.leaseForm.rentMoney}}元/月
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
              <span class="content-item-label">租金递增：</span>{{ContarctInfo.leaseForm.payRate}}%/年
            </p>
          </el-col>

        </el-row>
        <el-row :gutter="10">
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
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">签约日期：</span>{{ContarctInfo.signupTimeDesc}}
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
        </el-row>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">收租账号</header>
      <div class="pd-nb">
        <el-row :gutter="20">
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">姓名：</span>{{ContarctInfo.rentAcctName}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">开户银行：</span>{{ContarctInfo.rentAcctBank}}
            </p>
          </el-col>
          <el-col :span="8">
            <p class="content-item">
              <span class="content-item-label">银行账户：</span>{{ContarctInfo.rentAcctBankcardId}}
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">业主身份证</header>
      <div class="pd-ten">
        <div class="clearfix">
          <!-- <div class="img-item" v-for="(imgItem, index) in filesIDcard" :key="index">
            <div class="img-item-content">
              <img class="img-content" v-if="imgItem.pictureUrl" :src="imgItem.pictureUrl.replace('{size}', '160x120')" />
            </div>
            <p>{{imgItem.pictureTypeDesc}}</p>
          </div> -->
          <!-- @inited="initeFfilesIDcard" -->
          <viewer :options="options" :images="filesIDcard" class="viewer" ref="viewerFilesIDcard">
            <template slot-scope="scope">
              <div v-for="(imgItem, index) in filesIDcard" :key="index" class="img-item-box">
                <img :src="imgItem.pictureUrl.replace('{size}', '160x120')" :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
              </div>
            </template>
          </viewer>
        </div>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">房产证</header>
      <div class="pd-ten">
        <div class="clearfix">
          <!-- <div class="img-item" v-for="(imgItem, index) in filesHouse" :key="index">
            <div class="img-item-content">
              <img class="img-content" v-if="imgItem.pictureUrl" :src="imgItem.pictureUrl.replace('{size}', '160x120')" />
            </div>
            <p>{{imgItem.pictureTypeDesc}}</p>
          </div> -->
          <!-- @inited="initedFilesHouse" -->
          <viewer :options="options" :images="filesHouse" class="viewer" ref="viewerFilesHouse">
            <template slot-scope="scope">
              <div v-for="(imgItem, index) in filesHouse" :key="index" class="img-item-box">
                <img :src="imgItem.pictureUrl.replace('{size}', '160x120')" :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
              </div>
            </template>
          </viewer>
        </div>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">合同附件</header>
      <div class="pd-ten">
        <div class="clearfix">
          <!-- <div class="img-item" v-for="(imgItem, index) in filesContract" :key="index">
            <div class="img-item-content">
              <img class="img-content" v-if="imgItem.pictureUrl" :src="imgItem.pictureUrl.replace('{size}', '160x120')" />
            </div>
            <p>{{imgItem.pictureTypeDesc}}</p>
          </div> -->
          <!-- @inited="initedContract" -->
          <viewer :options="options" :images="filesContract" class="viewer" ref="viewerFilesContract">
            <template slot-scope="scope">
              <div v-for="(imgItem, index) in filesContract" :key="index" class="img-item-box">
                <img :src="imgItem.pictureUrl.replace('{size}', '160x120')" :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
              </div>
            </template>
          </viewer>
        </div>
      </div>
    </div>
    <div v-if="!showOldList" class="model-border">
      <header class="model-header">合同历史</header>
      <div class="pd-20">
        <div class="boder">
          <el-table :data="ContarctInfo.oldContractForm" style="width: 100%" size="mini" @row-click="handleRow">
            <!-- 5-300字 -->
            <el-table-column prop="contractNumber" label="合同编号" :width="100" align="center">
            </el-table-column>
            <el-table-column prop="signupTimeDesc" label="签约时间" :width="100" align="center">
            </el-table-column>
            <el-table-column label="租期" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.leaseCreateTimeDesc}}至{{scope.row.leaseFinalTimeDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stateDesc" label="状态" align="center" :width="80">
            </el-table-column>
            <el-table-column prop="bDName" label="BD" align="center" :width="100">
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
          'roomId': ''
        },
        'oldContractForm': [
        ],
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
            // id: '613d342e-b6ee-4f5f-b252-3c1401ff7737'
            id: this.contractId
          }
        }
      ).then((res) => {
        // console.log(res, '合同info');
        if (res.data.status === 'C0000') {
          this.ContarctInfo = res.data.result;
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
      this.$emit('setParam', {
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
</style>
