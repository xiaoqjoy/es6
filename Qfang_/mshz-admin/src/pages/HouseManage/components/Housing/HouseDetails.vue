<template>
  <section class="house-details-section">
    <div class="house-details-header">
      <div class="font-l">
        <p class="font-bold">
          <span v-if="houseInfo.gardenName.indexOf('，') !== -1">{{houseInfo.gardenName.split('，')[0]}}</span>
          <span v-else>{{houseInfo.gardenName.split(',')[0]}}</span>
          <span class="font-12 c-9">（{{houseInfo.cityDesc}}）</span>
        </p>
        <p class="font-default">{{houseInfo.buildingName}}，{{houseInfo.floor}}层，{{houseInfo.number}}，
          <span class="font-b">{{houseInfo.houseType}}</span>，
          <span class="font-b">{{houseInfo.area}}㎡</span>
          <span v-if="houseInfo.directionDesc">，{{houseInfo.directionDesc}}</span>，{{houseInfo.decorationDesc}}，{{houseInfo.rentUseTypeDesc}}</p>
      </div>
      <div>
        <el-button size="small" @click="mapDialog=true" type="text">
          <i class="icon iconfont icon-dizhi"></i>{{positionInfo}}</el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="房源信息" name="first">
          <house-info :id="roomId" @getHouseInfo="getHouseInfo">
          </house-info>
        </el-tab-pane>
        <el-tab-pane label="合同信息" name="second" v-if="contractId !== '无合同id,合同尚未添加!'">
          <contarct-info :contractId="contractId" v-if="activeName === 'second' || contractId">
          </contarct-info>
        </el-tab-pane>
        <el-tab-pane label="跟进信息" name="third">
          <follow-info :id="roomId" @refreshListData="refreshListData" :activeIndex="activeIndex">
          </follow-info>
        </el-tab-pane>
        <el-tab-pane label="小区信息" name="fourth">
          <community-info :id="roomId" :city="houseInfo.city" :gardenId="houseInfo.gardenId" :gardenName="houseInfo.gardenName">
          </community-info>
        </el-tab-pane>
        <el-tab-pane label="审核记录" name="fifth" v-if="activeIndex!=='INTENTION_ROOM'">
          <audit-log :id="roomId"></audit-log>
        </el-tab-pane>
        <el-tab-pane label="修改记录" name="sixth">
          <amendant-record :id="roomId"></amendant-record>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog top="25vh" width="50%" :title="auditTitle" :visible.sync="innerVisible" append-to-body>
      <div>
        <h3 class="pd-20">确定{{message}} {{houseInfo.bdName}} 提交的“{{houseInfo.gardenName}} {{houseInfo.buildingName}} {{houseInfo.number}}”吗？</h3>
        <el-input type="textarea" :rows="7" :maxlength="200" v-model="remark"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button size="mini" @click="innerVisible = false,remark='' ">取消</el-button>
        <el-button type="primary" size="mini" @click="handleAudit">{{message}}</el-button>
      </div>
    </el-dialog>
    <div v-if="!readOnly" class="dialog-footer">
      <el-button type="danger" size="mini" @click="notPass" :disabled="disabled">{{auditState === 'firstReview' ? '初审不通过' : '复审不通过'}}
      </el-button>
      <el-button type="primary" size="mini" @click="Pass" :disabled="disabled">{{auditState === 'firstReview' ? '初审通过' : '复审通过'}}
      </el-button>
    </div>
    <el-dialog :visible.sync='mapDialog' :title="'地址：'+houseInfo.address" :close-on-click-modal="false" width="950px" append-to-body>
      <house-map :city="houseInfo.city" :gardenName="houseInfo.gardenName" :address="houseInfo.address" :coordinateProp="coordinate" :id="roomId">
      </house-map>
    </el-dialog>
  </section>
</template>
<script>
import HouseInfo from './HouseInfo'; // 房源详情
import FollowInfo from './FollowInfo'; // 跟进信息
import AuditLog from './AuditLog'; // 审核记录
import AmendantRecord from './AmendantRecord';
import CommunityInfo from './CommunityInfo';
// import ContarctInfo from '../ContractManage/ContarctInfo';
import ContarctInfo from '@/pages/OrdersManage/components/OwnerContract/ContarctInfo';
import HouseMap from './HouseMap';
// import { $jsonp } from '@/assets/js/utils.js';

export default {
  data() {
    return {
      disabled: false,
      message: '通过',
      activeName: 'first',
      auditTitle: '初审房源',
      innerVisible: false,

      bdName: '',
      gardenName: '',
      buildingName: '',
      number: '',

      remark: '',
      operateAction: '',
      contractId: '',
      houseInfo: {
        gardenName: ''
      },
      coordinate: {
        lat: 0,
        lng: 0
      },
      mapDialog: false,
      positionInfo: '地图'
    };
  },
  // props: ['roomId', 'readOnly', 'city', 'gardenId', 'gardenNameProps', 'activeIndex', 'auditState'],
  props: {
    roomId: {
      type: String
    },
    city: {
      type: String
    },
    gardenId: {
      type: String
    },
    gardenNameProps: {
      type: String
    },
    activeIndex: {
      type: String
    },
    auditState: {
      type: String,
      default: 'firstReview'
    },
    readOnly: {
      type: Boolean
    }
  },
  created() {
    if (this.auditState === 'firstReview') {
      this.requestUrl = '/security/room/audit';
    } else {
      this.requestUrl = '/security/room/reAudit';
      this.auditTitle = '复审房源';
    }
    // this.getAddress();
  },
  methods: {
    handleAudit() {
      if (this.operateAction === 'AUDIT_NO' && !(this.remark.trim().length > 0)) {
        this.$message.warning('请输入不通过原因');
        return false;
      }
      this.$axios.post(
        this.requestUrl,
        {
          remark: this.remark,
          id: this.roomId,
          operateAction: this.operateAction
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result) {
            this.$message.success('操作成功');
            this.$emit('refreshData');
            this.disabled = true;
          } else {
            this.$message.error('操作失败');
          }
          this.innerVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    notPass() {
      this.message = '不通过';
      this.innerVisible = true;
      this.operateAction = 'AUDIT_NO';
    },

    clouse() {
      this.$emit('changeDialog', false);
    },

    Pass() {
      this.message = '通过';
      this.innerVisible = true;
      this.operateAction = 'AUDIT_YES';
    },

    refreshListData() {
      this.$emit('refreshData');
    },

    // getParam(data) {
    //   this.bdName = data.bdName;
    //   this.gardenName = data.gardenName;
    //   this.buildingName = data.buildingName;
    //   this.number = data.number;
    // },
    getHouseInfo(data) {
      this.houseInfo = data;
      this.coordinate = {
        lat: data.lat,
        lng: data.lng
      };
      this.getAddress();
      this.contractId = data.contractId;
    },
    // 获取房源最近的地铁站
    getAddress() {
      let { lat, lng } = this.coordinate;
      let positionInfo = this.houseInfo.positionInfo;
      let errorCount = 0;
      let options = {
        url: 'http://api.map.baidu.com/place/v2/search',
        data: {
          query: '地铁站',
          location: lat + ',' + lng,
          radius: 2000,
          output: 'json',
          scope: 2,
          filter: 'sort_name:distance|sort_rule:1',
          ak: 'sRAW4s9H8ccgU2QFARzaQnl1WRoPsYb6'
        },
        callback: 'callback',
        success: (data) => {
          if (data.results.length) {
            let address = data.results[0];
            let subway = address.address.split(';')[0];
            this.positionInfo = '距离' + subway + address.name + address.detail_info.distance + '米';
          } else {
            this.positionInfo = positionInfo;
          }
        },
        fail: (err) => {
          // 失败后会再次请求，超出3次后将不再请求
          console.log(err);
          errorCount++;
          if (errorCount < 3) {
            setTimeout(() => {
              this.jsonp(options);
            }, 100);
          }
        }
      };
      this.jsonp(options);
    },
    // jsonp请求
    jsonp(options) {
      options = options || {};
      if (!options.url || !options.callback) {
        return;
      }
      // 创建 script 标签并加入到页面中
      let callbackName = ('jsonp_' + Math.random()).replace('.', '');
      let oHead = document.getElementsByTagName('head')[0];
      options.data[options.callback] = callbackName;
      let params = formatParams(options.data);
      let oS = document.createElement('script');
      oHead.appendChild(oS);
      // 创建jsonp回调函数
      window[callbackName] = (json) => {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
      };
      // 请求失败
      oS.onerror = (err) => {
        window[callbackName] = null;
        oHead.removeChild(oS);
        options.fail && options.fail(err);
      };
      // 发送请求
      oS.src = options.url + '?' + params;
      // 超时处理
      if (options.time) {
        oS.timer = setTimeout(() => {
          window[callbackName] = null;
          oHead.removeChild(oS);
          options.fail && options.fail({ message: '超时' });
        }, options.time);
      }
      // 格式化参数
      function formatParams(data) {
        let arr = [];
        for (let name in data) {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
      }
    }
    // jsonp请求
    // jsonp(options) {
    //   options = options || {};
    //   if (!options.url || !options.callback) {
    //     return;
    //   }
    //   // 创建 script 标签并加入到页面中
    //   let callbackName = ('jsonp_' + Math.random()).replace('.', '');
    //   let oHead = document.getElementsByTagName('head')[0];
    //   options.data[options.callback] = callbackName;
    //   let params = formatParams(options.data);
    //   let oS = document.createElement('script');
    //   oHead.appendChild(oS);
    //   // 创建jsonp回调函数
    //   window[callbackName] = (json) => {
    //     oHead.removeChild(oS);
    //     clearTimeout(oS.timer);
    //     window[callbackName] = null;
    //     options.success && options.success(json);
    //   };
    //   // 请求失败
    //   oS.onerror = (err) => {
    //     window[callbackName] = null;
    //     oHead.removeChild(oS);
    //     options.fail && options.fail(err);
    //   };
    //   // 发送请求
    //   oS.src = options.url + '?' + params;
    //   // 超时处理
    //   if (options.time) {
    //     oS.timer = setTimeout(() => {
    //       window[callbackName] = null;
    //       oHead.removeChild(oS);
    //       options.fail && options.fail({ message: '超时' });
    //     }, options.time);
    //   }
    //   // 格式化参数
    //   function formatParams(data) {
    //     let arr = [];
    //     for (let name in data) {
    //       arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    //     }
    //     return arr.join('&');
    //   }
    // }
  },
  components: {
    HouseInfo,
    FollowInfo,
    AuditLog,
    AmendantRecord,
    ContarctInfo,
    CommunityInfo,
    HouseMap
  }
};
</script>
<style lang="scss" scoped>
.house-details-section {
  .dialog-box {
    height: 551px;
  }
}
.house-details-header {
  padding: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dddddd;
  .font-bold {
    margin-bottom: 10px;
  }
  .font-b {
    font-weight: bold;
    color: #999;
  }
}
</style>

