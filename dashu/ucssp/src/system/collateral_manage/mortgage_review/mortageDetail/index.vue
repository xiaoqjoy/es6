<template>
  <div class="mortage_detail_com">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white strong">{{uploadConfig.mortageTitle}}</h5>
        <span class="el-icon-close button button__close" @click="closeDetail()"></span>
      </div>
      <div class="dialog_main">
        <div class="detail_top">
          <p v-for="item in detailTop" :key="item.code">
            <span class="title">{{item.label}}: </span>
            <span class="content">{{mortageDetail[item.code]}}</span>
          </p>
        </div>
        <div class="seal" v-if="mortageDetail.mortgageState !== 'BACK' && showSeal">
          <div class="circle_outer">
            <div class="circle_inter">
              <p>{{mortageStatus[mortageDetail.mortgageState]}}</p>
            </div>
          </div>
        </div>
        <div class="mortage_detail_main">
          <el-form :ref="'mortageDetail' + index" :model="estateList[index]"
            v-for="(item, index) in estateList" :key="index"
            :rules="mortageDetailRule">
            <div>
              <!-- 他项上传不需要 -->
              <p class="video_wapper" v-if="!uploadConfig.showUpload && !uploadConfig.showImg">
                <span @click="$showImage(applicationId, '押品管理', {menuId: menuId} )" v-show="index === 0">影像件查看</span>
                <span v-if="item.hasVideo" @click="downloadVideo(index)">视频查看</span>
                <ul class="dropdown_list" :class="{show: item.showDropdown}">
                  <li v-for="(ele, _i) in item.imgVideoList" :key="_i">
                    <a :href="ele" target="_blank">视频{{_i + 1}}</a>
                  </li>
                </ul>
              </p>
              <div class="mortage_detail">
                <h5 class="title bg__white strong">房产{{index + 1}}</h5>
                <div class="property_info">
                <div class="property_info_left">
                  <p v-for="ele in propertyInfoLeft[index]" :key="ele.code">
                    <span class="title">{{ele.label}}: </span>
                    <span class="content">{{item[ele.code]}}</span>
                  </p>
                </div>
                <div class="property_info_right">
                  <p v-for="ele in propertyInfoRight[index]" :key="ele.code">
                    <span class="title">{{ele.label}}: </span>
                    <span class="content">{{item[ele.code]}}</span>
                  </p>
                </div>
                </div>
                <div v-if="!uploadConfig.showUpload && !uploadConfig.showImg">
                  <!-- <p>退回记录</p> -->
                  <p class="backoff_record">{{item.record}}</p>
                  <div v-if="item.mortgageState === 'SUBMIT' || item.mortgageState === 'INIT'">
                    <el-form-item prop="reviewState" class="radio_group">
                      <el-radio-group v-model="item.reviewState">
                        <el-radio label="REJECT">不通过</el-radio>
                        <el-radio label="BACK">退回</el-radio>
                        <el-radio label="PASSED">通过</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="reviewReason" v-if="item.reviewState === 'BACK' || item.reviewState === 'REJECT'">
                      <el-input type="textarea" v-model="item.reviewReason" rows="5"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div v-if="uploadConfig.showUpload" class="other_items">
                  <el-form-item class="forensics"
                    label="他项取证时间"
                    prop="pledgeOtherDate"
                    :rules="[
                      { required: true, message: '请填写他项取证日期', trigger: 'change' },
                      { validator: pledgeOtherDateValidate(index), trigger: 'change' }
                    ]">
                    <el-date-picker format="yyyy/MM/dd"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="item.pledgeOtherDate"
                      type="date">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="请上传他项权证" prop="hasVideo">
                    <upload :index="index" @success="uploadSuccess" :accept="['jpg', 'jpeg', 'png']"></upload>
                    <input type="hidden" v-model="item.hasVideo">
                  </el-form-item>
                </div>
                <p v-if="uploadConfig.showImg" style="font-size: 14px; color: #666;">他项权证</p>
                <ul v-if="item.imageList !== 0">
                  <li v-for="(ele) in item.imageList" :key="ele">
                    <img :src="ele" alt="" @click="openBigImg(ele)">
                  </li>
                </ul>
              </div>
            </div>
          </el-form>
          <div class="btn_wraper" v-if="!editState">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="el-image-viewer__wrapper" v-show="!!imgUrl" ref="imageWrapper">
      <div class="big_img_mask"></div>
      <span class="el-image-viewer__btn el-image-viewer__close" @click="colseImg">
        <i class="el-icon-circle-close"></i>
      </span>
      <div class="el-image-viewer__canvas">
        <img style="max-width: 100%; max-height:100%;" :src="imgUrl" alt="" @click="colseImg">
      </div>
    </div>
  </div>
</template>

<script>
import {collateralApi} from './../../js/server';
import upload from './../../other_items_upload/upload';
let renderList = [
  {code: 'address', label: '房产地址'},
  {code: 'addressDesc', label: '房产详细地址'},
  {code: 'mortgageIndLabel', label: '本次办理的顺位抵押'}
];
let rightList = [
  {code: 'housingAuthority', label: '办押房管局'},
  {code: 'pledgeStateLabel', label: '抵押登记办理情况'}
];
export default {
  props: {
    applicationId: {
      type: String,
      default: ''
    },
    submitUrl: {
      type: String,
      default: ''
    },
    detailUrl: {
      type: String,
      default: ''
    },
    editState: {
      type: Boolean,
      default: false // 可编辑 false为可编辑，true为不可编辑
    },
    showSeal: {
      type: Boolean,
      default: false
    },
    uploadConfig: {
      type: Object,
      default: () => {
        return {
          mortageTitle: '办押详情',
          showUpload: false, // 展示他项上传
          showImg: false // 展示图片
        };
      }
    },
    dict: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      menuId: 'mortgage/review',
      detailTop: [
        {code: 'customerName', label: '客户姓名'},
        {code: 'certificateNum', label: '客户身份证号'},
        {code: 'loanAmount', label: '贷款金额'},
        {code: 'orgName', label: '合作机构'},
        {code: 'customerManager', label: '客户经理'}
      ],
      propertyInfoLeft: [renderList, renderList],
      propertyInfoRight: [[].concat(rightList), [].concat(rightList)],
      mortageDetail: {
        customerName: '',
        certificateNum: '',
        loanAmount: '',
        orgName: '',
        customerManager: '',
        mortgageState: 'BACK'
      },
      mortageStatus: {
        SUBMIT: '办押中',
        BACK: '退回',
        PASSED: '复核通过',
        REJECT: '复核否决',
        CUSTOMER_GIVE_UP: '客户放弃',
        SYSTEM_REJECT: '放款否决'
      },
      mortageDetailRule: {
        reviewState: [
          { required: true, message: "请勾选审批意见", trigger: "change" }
        ],
        reviewReason: [
          { required: true, message: "退回或否决原因不能为空", trigger: "blur" }
        ],
        pledgeOtherDate: [
          { required: true, message: "他项取证日期不可为空", trigger: "change" },
          { validator: this.test, trigger: 'blur' }
        ],
        hasVideo: [
          { required: true, message: "相关证件不可为空", trigger: "input" }
        ]
      },
      imgUrl: '',
      estateList: []
    };
  },
  methods: {
    downloadVideo(_index) {
      this.estateList[_index].showDropdown = !this.estateList[_index].showDropdown;
    },
    uploadSuccess(_data) {
      const {index, fileId} = _data;
      // 表单校验添加值进去
      this.estateList[index].hasVideo = true;
      this.$refs[`mortageDetail${index}`][0].validateField('hasVideo');
      this.$MyFetch.post(collateralApi.id2Url, {fileId: fileId}).then(_data => {
        this.estateList[index].imageList.push(_data.fileUrl);
        this.estateList[index].imgIdList.push(fileId);
      });
    },
    openBigImg(ele) {
      this.imgUrl = ele;
    },
    colseImg() {
      this.imgUrl = '';
    },
    escKeyUp(event) {
      if (this.imgUrl && event.keyCode === 27) {
        this.colseImg();
      }
    },
    closeDetail(reflesh) {
      this.$emit('closeDetail', reflesh);
    },
    pledgeOtherDateValidate(index) {
      return (rule, value, callback) => {
        if (!this.estateList[index].pledgeReceiptDate) {
          return callback();
        }
        // 去掉 时分秒，只比较日期
        let date = this.estateList[index].pledgeReceiptDate.split(' ')[0];
        // 抵押回执取得时间 只读
        let pledgeReceiptDateTime = new Date(date).getTime();
        // 他项取证时间 可写
        let pledgeOtherDateTime = new Date(value.split(' ')[0]).getTime();
        if (pledgeOtherDateTime >= pledgeReceiptDateTime) {
          return callback();
        }
        return callback(new Error('他项取证时间不得早于抵押回执取得时间'));
      };
    },
    getDetail() {
      if (!this.uploadConfig.showUpload && !this.uploadConfig.showOtherDate) {
        renderList.push({code: 'remark', label: '备注'});
        // this.propertyInfoRight.push({code: 'pledgeReason', label: '失败原因'});
      }
      if (this.uploadConfig.showOtherDate) {
        renderList.push({code: 'pledgeOtherDate', label: '他项取证时间'});
      }
      this.$MyFetch.get(this.detailUrl, {
        applicationId: this.applicationId
      }).then(data => {
        data.loanAmount = parseFloat(data.loanAmount) + '元';
        this.mortageDetail = JSON.parse(JSON.stringify(data));
        // 遍历获取共有产权人
        data.estateList.forEach((_item, _i) => {
          // 图片上传校验，hasVideo为false时，初始化为空字符串
          _item.hasVideo = _item.hasVideo || '';
          // 用于提交用，初始化为空list
          _item.imgIdList = [];
          // 用于展示
          _item.imageList = _item.imageList || [];
          // 视频查看下拉
          _item.showDropdown = false;
          _item.pledgeStateLabel = _item.pledgeState === null ? '' : _item.pledgeState ? '成功' : '失败';
          _item.pledgeAmt = parseFloat(_item.pledgeAmt) + '元';
          if (_item.pledgeState === null || _item.pledgeState) {
            this.propertyInfoRight[_i].splice(
              2,
              0,
              {code: 'pledgeType', label: '抵押类型'},
              {code: 'pledgePerson', label: '抵押权人'},
              {code: 'pledgeAmt', label: '债权金额'},
              {code: 'pledgeReceiptDate', label: '抵押回执取得时间'}
            );
          } else {
            this.propertyInfoRight[_i].splice(
              2,
              0,
              {code: 'pledgeReason', label: '失败原因'}
            );
          }
          // 拆分共有产权人
          if (_item.coownerNames) {
            let coownerNames = _item.coownerNames.split(',');
            let renderListTemp = JSON.parse(JSON.stringify(renderList));
            coownerNames.forEach((ele, index) => {
              let code = 'coownerName' + (index + 1);
              let label = '共有产权人' + (index + 1);
              _item[code] = ele;
              // 向渲染列表插入共有产权人
              renderListTemp.splice(index + 2, 0, {code, label});
            });
            // 将预置渲染列表替换掉
            this.propertyInfoLeft.splice(_i, 1, renderListTemp);
          }
          // 处理展示取值
          _item.mortgageIndLabel = _item.mortgageInd ? '二押' : '一押';
        });
        this.estateList = data.estateList;
      }).catch(err => {
        this.$error(err.message);
      });
    },
    serializeMortageStatus(dict) {
      let list = dict.mortgage_state_review;
      if (!list) return;
      if (list instanceof Array && list.length === 0) return;
      list.forEach(_item => {
        this.mortageStatus[_item.itemCode] = _item.itemDesc;
      });
    },
    submit() {
      if (this.estateList.length === 0) {
        return;
      }
      let validate = true;
      let data = [];
      for (let i = 0; i < this.estateList.length; i++) {
        this.$refs[`mortageDetail${i}`][0].validate(_val => {
          if (!_val) {
            validate = false;
          }
          if (_val) {
            data[i] = {
              applicationId: this.applicationId,
              estateNum: this.estateList[i].estateNum,
              // reviewState
              reviewState: this.estateList[i].reviewState,
              reviewReason: this.estateList[i].reviewReason,
              pledgeOtherDate: this.estateList[i].pledgeOtherDate,
              imageList: this.estateList[i].imgIdList
            };
          }
        });
      }
      if (validate) {
        this.$MyFetch.post(this.submitUrl, data).then(_data => {
          this.$message.success(_data.message);
          this.closeDetail(true);
        }).catch(err => {
          this.$error(err.message);
        });
      }
    }
  },
  created() {
    this.getDetail();
    this.serializeMortageStatus(this.dict);
    // 不可编辑状态，影像平台不可编辑
    if (this.editState) {
      this.menuId = 'mortgage/review-done';
    }
  },
  mounted() {
    document.addEventListener('keyup', this.escKeyUp);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.escKeyUp);
    renderList = [
      {code: 'address', label: '房产地址'},
      {code: 'addressDesc', label: '房产详细地址'},
      {code: 'mortgageIndLabel', label: '本次办理的顺位抵押'}
    ];
  },
  components: {
    upload
  }
};
</script>

<style lang="less">
  .mortage_detail_com {
    .dialog-box {
      width: 1000px;
      height: 700px;
      .el-form-item {
        display: block;
        margin-right: 0;
        font-size: inherit;
      }
      .dialog_main {
        padding: 20px;
        position: relative;
        .title {
          padding-right: 5px;
          color: #666;
        }
        .content {
          color: #151515;
        }
        // 否决印章
        .seal {
          position: absolute;
          top: 0%;
          right: 14%;
          .circle_outer {
            border: 2px solid red;
            border-radius: 50% !important;
            width: 100px;
            height: 100px;
            position: relative;
            display: flex;
            .circle_inter {
              border: 2px solid red;
              border-radius: 50% !important;
              width: 80px;
              height: 80px;
              margin: auto;
              > p {
                width: 120px;
                height: 32px;
                line-height: 26px;
                border: 2px solid red;
                text-align: center;
                transform: rotate(-17deg);
                top: 34px;
                left: -10px;
                position: absolute;
                background-color: #fff;
              }
            }
          }
        }
        .detail_top {
          display: flex;
          flex-wrap: wrap;
          box-shadow: 0px 10px 9px -7px #d0d0d0;
          margin-bottom: 10px;
          > p {
            flex-basis: 50%;
            height: 30px;
          }
        }
        .mortage_detail_main{
          overflow: scroll;
          height: 500px;
          .video_wapper {
            text-align: right;
            height: 25px;
            color: #409eff;
            padding: 0 10px;
            position: relative;
            > span {
              padding: 0 10px;
              cursor: pointer;
            }
            .dropdown_list {
              display: none;
              position: absolute;
              right: 2%;
              box-shadow: 0 2px 12px 0 #d0d0d0;
              top: 25px;
              > li {
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                width: 70px;
                text-align: center;
                background: #fff;
                > a {
                  text-decoration: none;
                  color: #409eff;
                }
                > a:active, a:hover, a:visited {
                  color: #409eff;
                }
              }
            }
            .dropdown_list.show {
              display: block;
            }
          }
          .mortage_detail {
            border-top: 1px solid #d0d0d0;
            padding: 10px;
            .property_info {
              display: flex;
              > div {
                flex: 1;
                > p {
                  padding: 5px 0;
                }
              }
            }
            .backoff_record {
              border: 1px solid #d0d0d0;
              border-radius: 4px;
              white-space: pre-line;
              padding: 10px 5px;
              margin-top: 10px;
              color: #666;
              line-height: 20px;
            }
            .radio_group.is-error {
              .el-radio__label {
                color: #F56C6C;
              }
            }
            .other_items {
              margin-top: 10px;
              // display: flex;
              // flex-wrap: wrap;
              > div {
                // flex-basis: 50%;
                width: 57%;
              }
              .forensics {
                // flex-basis: 35%;
                width: 40%;
              }
            }
            > ul {
              flex-basis: 100%;
              display: flex;
              flex-wrap: wrap;
              > li {
                width: 100px;
                height: 80px;
                overflow: hidden;
                padding: 5px;
                cursor: pointer;
                img {
                  min-width: 100%;
                  max-width: 100%;
                  min-height: 100%;
                }
              }
            }
          }
          .btn_wraper {
            text-align: right;
            padding: 0 20px;
          }
        }
      }
    }
    .el-image-viewer__wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2000;
      .el-image-viewer__canvas {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-image-viewer__close {
        top: 70px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 40px;
        color: #fff;
      }
      .el-image-viewer__btn {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
      }
      .big_img_mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000;
        z-index: -1;
      }
    }
  }
</style>
