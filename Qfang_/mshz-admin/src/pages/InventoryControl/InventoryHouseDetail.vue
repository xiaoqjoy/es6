<template>
  <section class="routeitem-box bgc-f1 pd-20"
    v-loading="loading">
    <div class="bmodule-info">
      <!-- 楼盘基本信息 -->
      <div class="head-info pdv-20 bold-bdb">
        <div class="divdb-10 c-3 flex-between"
          v-if="LRentHouseForm.roomInfo">
          <div class="font-l">
            <span class="head-info-item font-20">{{LRentHouseForm.roomInfo.gardenName}}</span>
            <span class="head-info-item font-14">{{LRentHouseForm.roomInfo.buildingName}}</span>
            <span class="head-info-item font-14">{{LRentHouseForm.roomInfo.number}}</span>
            <span class="c-green facility-head">{{isEntireRent ? '整租' : '合租'}}</span>
            <span class="c-green label-sec-type"
              v-if="LRentHouseForm.longChamberList && LRentHouseForm.longChamberList.length > 0 && isEntireRent">
              <span>{{LRentHouseForm.longChamberList[0].roomStockStateEnumDesc}}</span>
            </span>
          </div>
          <div>
            <el-row>
              <div class="address-div">
                <i class="icon iconfont icon-dizhi"></i>
                <p>{{LRentHouseForm.roomInfo.positionInfo || '--'}}</p>
                <span class="address-subway">{{positionInfo}}</span>
              </div>
              <!-- <information-item labelInfo="地点">
              </information-item> -->
            </el-row>
          </div>
        </div>
        <div class="flex-between">
          <div class="flex-start">
            <slot v-if="LRentHouseForm.roomInfo">
              <information-item labelInfo="房编号"
                class="pdr-30">
                {{LRentHouseForm.roomInfo.commitNumber || '--'}}
              </information-item>

              <information-item labelInfo="楼层"
                class="pdr-30">
                {{`${LRentHouseForm.roomInfo.floor || '--'}/${LRentHouseForm.roomInfo.totalFloor || '--'}`}}层
              </information-item>

              <information-item labelInfo="户型"
                class="pdr-30">
                {{LRentHouseForm.roomInfo.houseStyle || '--'}}
              </information-item>

              <information-item labelInfo="面积"
                class="pdr-30">
                {{LRentHouseForm.roomInfo.area + '㎡' || '--'}}
              </information-item>
            </slot>

            <information-item labelInfo="朝向"
              class="pdr-30">
              {{LRentHouseForm.roomInfo.directionDesc || '--'}}
            </information-item>

            <information-item labelInfo="综合管家"
              class="pdr-30">
              {{LRentHouseForm.roomInfo.gardenManagerName || '--'}}
            </information-item>

            <information-item labelInfo="服务管家"
              class="pdr-30">
              {{LRentHouseForm.roomInfo.serviceManagerName || '--'}}
            </information-item>
          </div>

        </div>
      </div>
      <!-- 房间公共信息 -->
      <div class="pdv-20">
        <div v-for="(item, index) in LRentHouseForm.myChangeChamberList"
          :key="index">
          <header>
            <span class="line-header">{{item.name}}</span>
          </header>
          <div class="flex-start line-head-pd">
            <information-item labelInfo="面积"
              class="pdr-30">
              {{item.area ? item.area + '㎡' : '未知'}}
            </information-item>
            <information-item labelInfo="朝向"
              class="pdr-30">
              {{item.directionDesc || '未知'}}
            </information-item>
            <information-item labelInfo="配置"
              class="pdr-30">
              <slot v-if="item.furnitureDesc.length">
                <span class="facility-item"
                  v-for="(j,i) in item.furnitureDesc"
                  :key="i">{{j}}</span>
              </slot>
              <slot v-else>
                暂无配置
              </slot>
            </information-item>
          </div>
        </div>
        <!-- 抄表信息 -->
        <div>
          <header>
            <span class="line-header">抄表信息</span>
          </header>
          <div class="line-head-pd">
            <div class="flex-start">
              <information-item labelInfo="水表"
                class="pdr-30">
                <span>{{LRentHouseForm.waterMeterReading || 0}}吨</span>
              </information-item>
              <information-item labelInfo="电表"
                class="pdr-30">
                <span>{{LRentHouseForm.electricMeterReading || 0}}度</span>
              </information-item>
              <information-item labelInfo="燃气表"
                class="pdr-30">
                <span>{{LRentHouseForm.gasMeterReading || 0}}立方</span>
              </information-item>
            </div>
          </div>
        </div>
        <!-- 生活费用信息 -->
        <div>
          <header>
            <span class="line-header">生活费用信息</span>
          </header>
          <div class="line-head-pd">
            <div class="flex-start">
              <information-item labelInfo="水费"
                class="pdr-30">
                {{ LRentHouseForm.waterCharges || 0}}元/吨
                <!-- <span class="font-12 c-9">（抄表：{{LRentHouseForm.waterMeterReading || 0}}吨）</span> -->
              </information-item>
              <information-item labelInfo="电费"
                class="pdr-30">
                {{ LRentHouseForm.electricCharges || 0}}元/度
              </information-item>
              <information-item labelInfo="燃气费"
                class="pdr-30">
                {{ LRentHouseForm.gasCharges || 0}}元/立方
              </information-item>
            </div>
            <!-- <slot v-if="LRentHouseForm.leaseType === 'ENTIRE_RENT'">
              <div class="flex-start-grow">
                <div class="pay-label c-9 line-h-30">月付租金：</div>
                <div v-for="(roomItem, index) in LRentHouseForm.longChamberList"
                  :key="index">
                  <div v-if="roomItem.canPublish"
                    class="pay-item">
                    <div class="pay-room-name font-c bdb-ddd">{{roomItem.name}}</div>
                    <div class="pd-ten">
                      <div class="pay-i-box">
                        <div class="pay-append pdr-10 font-w">月租金</div>
                        <div class="pay-input">{{roomItem.chamberPrice}}</div>
                        <div class="pay-append">元/月</div>
                      </div>
                      <div class="pay-i-box">
                        <div class="pay-append pdr-10 font-w">服务费</div>
                        <div class="pay-input">
                          {{(roomItem.chamberPrice * LRentHouseForm.longChamberList[0].monthServicePrice * 0.01).toFixed(2)}}
                        </div>
                        <div class="pay-append c-green font-w">元/月</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slot> -->
          </div>
        </div>
      </div>

      <slot v-if="isEntireRent">
        <!-- 房间押金 -->
        <header>
          <span class="line-header">房间押金</span>
        </header>
        <div class="line-head-pd">
          <information-item labelInfo="押金">
            <span v-if="LRentHouseForm.longChamberList && LRentHouseForm.longChamberList.length > 0"> {{LRentHouseForm.longChamberList[0].depositTypeDesc}}</span>
            <span v-else>--</span>
          </information-item>
        </div>

        <!-- 整租图片 -->
        <header>
          <span class="line-header">房源图片</span>
        </header>
        <div class="clearfix pdt-5 pdb-30 pdl-ten">
          <viewer :options="options"
            :images="LRentHouseForm.entirePictureList"
            @inited="inited"
            class="viewer"
            ref="viewerReleasein">
            <template slot-scope="scope">
              <div v-for="(imgItem, index) in LRentHouseForm.entirePictureList"
                :key="index"
                class="img-item-box">
                <img :src="imgItem.url.replace('{size}', '160x120')"
                  :data-source="imgItem.url.replace('{size}', '800x600')+'?tailor=false'"
                  class="img-content">
                <p v-if="scope.images.length> 0"
                  class="font-c font-12 pdt-10">{{scope.images[index].attachTypeDesc}}</p>
              </div>
            </template>
          </viewer>
        </div>
        <!-- 房评 -->
        <header>
          <span class="line-header">房评</span>
        </header>
        <div class="line-head-pd font-12 c-3">
          <!-- {{LRentHouseForm.title || '暂无点评'}} -->
          <slot v-if="LRentHouseForm.title && LRentHouseForm.title.trim().length > 0">
            <div class="notice-content"
              v-html="LRentHouseForm.title"></div>
          </slot>
          <slot v-else>暂无点评</slot>
        </div>
      </slot>
      <div>
        <div class="room-info">
          <el-tabs v-model="activeName"
            @tab-click="handleTabClick">
            <el-tab-pane v-for="(roomItem, index) in LRentHouseForm.longChamberList"
              :key="index"
              :name="roomItem.name"
              lazy>
              <div slot="label"
                class="room-tab-label">{{roomItem.name}} <span v-if="!isEntireRent"
                  class="label-sec-type room-tab-locate">{{roomItem.roomStockStateEnumDesc}}</span>
              </div>
              <div class="pdv-20">
                <!-- 房间信息 -->
                <header class="flex-between">
                  <span class="line-header">房间信息</span>
                  <el-button plain
                    size="mini"
                    type="primary"
                    @click="handleShowHouseLog">查看房间日志
                  </el-button>
                </header>
                <div class="line-head-pd">
                  <div class="flex-start">
                    <information-item labelInfo="房间编号"
                      class="pdr-30">
                      {{roomItem.chamberNumber || '--'}}
                    </information-item>
                    <information-item labelInfo="面积"
                      class="pdr-30">
                      {{roomItem.area ? roomItem.area + '㎡' : '未知'}}
                    </information-item>
                    <information-item labelInfo="朝向"
                      class="pdr-30">
                      {{roomItem.directionDesc || '未知'}}
                    </information-item>
                    <information-item labelInfo="阳台"
                      class="pdr-30">
                      {{roomItem.attachedChamber.indexOf('BALCONY')===-1?'无':'有'}}
                    </information-item>
                    <information-item labelInfo="独卫"
                      class="pdr-30">
                      {{roomItem.attachedChamber.indexOf('TOILET')===-1?'无':'有'}}
                    </information-item>
                  </div>
                  <div>
                    <information-item labelInfo="配置"
                      class="pdr-30">
                      <slot v-if="roomItem.furnitureDesc.length">
                        <span class="facility-item"
                          v-for="(item,i) in roomItem.furnitureDesc"
                          :key="i">{{item}}</span>
                      </slot>
                      <slot v-else>
                        暂无配置
                      </slot>
                    </information-item>
                  </div>
                </div>

                <!-- 房间押金 -->
                <slot v-if="!isEntireRent">
                  <header>
                    <span class="line-header">房间押金</span>
                  </header>
                  <div class="line-head-pd">
                    <information-item labelInfo="押金">
                      <span> {{roomItem.depositTypeDesc}}</span>
                    </information-item>
                  </div>
                </slot>

                <!-- 出房价 -->
                <header>
                  <span class="line-header">出房价</span>
                </header>
                <div class="line-head-pd out-room">
                  <div class="flex-start">
                    <information-item labelInfo="月付"
                      class="pdr-30">
                      {{roomItem.chamberPrice || '--'}}元/月
                    </information-item>
                    <information-item labelInfo="服务费率"
                      class="pdr-30">
                      {{roomItem.chamberService || '--'}}%
                    </information-item>
                    <information-item labelInfo="服务费"
                      class="pdr-30">
                      {{(roomItem.chamberPrice*roomItem.chamberService / 100).toFixed(2) || '--'}}元/月
                    </information-item>
                  </div>
                  <div class="flex-start">
                    <information-item labelInfo="季付"
                      class="pdr-30">
                      {{roomItem.chamberSeasonPrice || '--'}}元/月
                    </information-item>
                    <information-item labelInfo="服务费率"
                      class="pdr-30">
                      {{roomItem.chamberSeasonService || '--'}}%
                    </information-item>
                    <information-item labelInfo="服务费"
                      class="pdr-30">
                      {{(roomItem.chamberSeasonPrice*roomItem.chamberSeasonService / 100).toFixed(2) || '--'}}元/月
                    </information-item>
                  </div>
                  <div class="flex-start">
                    <information-item labelInfo="半年付"
                      class="pdr-30">
                      {{roomItem.chamberHalfYearPrice || '--'}}元/月
                    </information-item>
                    <information-item labelInfo="服务费率"
                      class="pdr-30">
                      {{roomItem.chamberHalfYearService || '--'}}%
                    </information-item>
                    <information-item labelInfo="服务费"
                      class="pdr-30">
                      {{(roomItem.chamberHalfYearPrice*roomItem.chamberHalfYearService / 100).toFixed(2) || '--'}}元/月
                    </information-item>
                  </div>
                  <div class="flex-start">
                    <information-item labelInfo="年付"
                      class="pdr-30">
                      {{roomItem.chamberYearPrice || '--'}}元/月
                    </information-item>
                    <information-item labelInfo="服务费率"
                      class="pdr-30">
                      {{roomItem.chamberYearService || '--'}}%
                    </information-item>
                    <information-item labelInfo="服务费"
                      class="pdr-30">
                      {{(roomItem.chamberYearPrice*roomItem.chamberYearService / 100).toFixed(2) || '--'}}元/月
                    </information-item>
                  </div>
                </div>

                <!-- 下定信息 -->
                <slot v-if="roomItem.bookingInfo">
                  <header>
                    <span class="line-header">下定信息</span>
                  </header>
                  <div class="line-head-pd">
                    <information-item labelInfo="管家">
                      <span> {{roomItem.bookingInfo.bookingManager}}</span>
                    </information-item>
                    <information-item labelInfo="下定租客">
                      <span class="inb pdr-20"> {{roomItem.bookingInfo.bookingCustomer}}</span>
                      <span class="inb"> {{roomItem.bookingInfo.bookingPhone}}</span>
                    </information-item>
                    <information-item labelInfo="下定日">
                      <span> {{roomItem.bookingInfo.bookingTimeDesc}}</span>
                    </information-item>
                  </div>
                </slot>

                <!-- 标题 -->
                <!-- <header>
                  <span class="line-header">标题</span>
                </header>
                <div class="line-head-pd font-12 c-3">
                  {{roomItem.title || '--'}}
                </div> -->

                <!-- 活动 -->
                <!-- <header>
                  <span class="line-header">活动</span>
                </header>
                <div class="line-head-pd font-12 c-3">
                  {{roomItem.area || '--'}}
                </div> -->

                <!-- 房源图片 -->
                <slot v-if="!isEntireRent">
                  <div class="pdv-20">
                    <header>
                      <span class="line-header">房源图片</span>
                    </header>
                    <div class="clearfix pdt-5 pdb-30 pdl-ten">
                      <slot v-if="roomItem.pictureList.length > 0">
                        <viewer :options="options"
                          :images="roomItem.pictureList"
                          @inited="inited"
                          class="viewer">
                          <!-- <template slot-scope="scope"> -->
                          <div v-for="(imgItem, index) in roomItem.pictureList"
                            :key="index"
                            class="img-item-box">
                            <img :src="imgItem.url.replace('{size}', '160x120')"
                              :data-source="imgItem.url.replace('{size}', '800x600')+'?tailor=false'"
                              class="img-content">
                            <!-- <p v-if="scope.images.length> 0"
                                class="font-c font-12 pdt-10">
                                {{scope.images[index].picDepend}}
                              </p> -->
                          </div>
                          <!-- </template> -->
                        </viewer>
                      </slot>
                      <slot v-else>
                        <div class="noimg-box">
                          <img src="../../../static/img/notImage.jpg"
                            alt="">
                        </div>
                      </slot>
                    </div>
                  </div>

                  <!-- 房评 -->
                  <header>
                    <span class="line-header">房评</span>
                  </header>
                  <div class="line-head-pd font-12 c-3">
                    <!-- {{roomItem.roomRemark || '暂无点评'}} -->
                    <slot v-if="roomItem.roomRemark  && roomItem.roomRemark.trim().length > 0">
                      <div class="notice-content"
                        v-html="roomItem.roomRemark"></div>
                    </slot>
                    <slot v-else>暂无点评</slot>
                  </div>
                </slot>

                <!-- 已租信息 -->
                <slot v-if="roomItem.rentState === 'ALREADY_RENT' && roomItem.situationContractModel">
                  <!-- 合同信息 -->
                  <div class="pdv-20">
                    <header class="flex-between">
                      <span class="line-header">租客合同</span>
                      <el-button plain
                        v-if="roomItem.situationContractModel.leaseContractUrl"
                        size="mini"
                        type="primary"
                        @click="handleShowHouseCont(roomItem.situationContractModel.leaseContractUrl)">查看租客合同
                      </el-button>
                    </header>
                    <div class="line-head-pd"
                      v-if="roomItem.situationContractModel">
                      <el-row>
                        <el-col :span="6">
                          <information-item labelInfo="出房管家">
                            {{roomItem.situationContractModel.managerName || '--'}}
                          </information-item>
                        </el-col>
                        <el-col :span="6">
                          <information-item labelInfo="合同期限">
                            {{roomItem.situationContractModel.startTimeDesc || '--'}} 至 {{roomItem.situationContractModel.endTimeDesc || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <information-item labelInfo="租客姓名">
                            {{roomItem.situationContractModel.tenantModel.name || '--'}}
                          </information-item>
                        </el-col>
                        <el-col :span="6">
                          <information-item labelInfo="手机号">
                            {{roomItem.situationContractModel.tenantModel.phone || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <information-item labelInfo="证件类型">
                            {{roomItem.situationContractModel.tenantModel.certType || '--'}}
                          </information-item>
                        </el-col>
                        <el-col :span="6">
                          <information-item labelInfo="证件号">
                            {{roomItem.situationContractModel.tenantModel.certNo || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <information-item labelInfo="签约时间">
                            {{roomItem.situationContractModel.signTimeDesc || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <information-item labelInfo="房间租金">
                            {{roomItem.situationContractModel.rentPreMonth || '--'}}
                          </information-item>
                        </el-col>
                        <el-col :span="6">
                          <information-item labelInfo="房间押金">
                            {{roomItem.situationContractModel.deposit || '--'}}
                          </information-item>
                        </el-col>
                        <el-col :span="6">
                          <information-item labelInfo="支付方式">
                            {{roomItem.situationContractModel.payMethod || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <information-item labelInfo="合同备注">
                            {{roomItem.situationContractModel.remark || '--'}}
                          </information-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 证件附件 -->
                    <header>
                      <span class="line-header">证件附件</span>
                    </header>
                    <div class="clearfix pdt-5 pdb-30 pdl-ten">
                      <slot v-if="roomItem.situationContractModel.attachModelList.length > 0">
                        <viewer :options="options"
                          :images="roomItem.situationContractModel.attachModelList"
                          @inited="inited"
                          class="viewer"
                          ref="viewerReleasein">
                          <template slot-scope="scope">
                            <div v-for="(imgItem, index) in roomItem.situationContractModel.attachModelList"
                              :key="index"
                              class="img-item-box">
                              <img :src="imgItem.picAddr.replace('{size}', '160x120')"
                                :data-source="imgItem.picAddr.replace('{size}', '800x600')+'?tailor=false'"
                                class="img-content">
                              <p v-if="scope.images.length> 0"
                                class="font-c font-12 pdt-10">{{scope.images[index].attachTypeDesc}}</p>
                            </div>
                          </template>
                        </viewer>
                      </slot>
                      <slot v-else>
                        <div class="noimg-box">
                          <img src="../../../static/img/notImage.jpg"
                            alt="">
                        </div>
                      </slot>
                    </div>
                  </div>

                  <!-- 账单明细 -->
                  <div class="pdv-20">
                    <header>
                      <span class="line-header">账单明细</span>
                    </header>
                    <div class="line-head-pd">
                      <el-table :data="roomItem.situationLongBillList"
                        stripe
                        style="width: 100%"
                        size="mini">
                        <el-table-column prop="cycleDate"
                          label="账单"
                          min-width="120"
                          align="center">
                          <!-- <template slot-scope="scope">
                            {{scope.row.billCreateTime}} 至 {{scope.row.billEndTime}}
                          </template> -->
                        </el-table-column>
                        <el-table-column prop="billTypeDesc"
                          label="账单类型"
                          align="center"
                          min-width="100">
                        </el-table-column>
                        <el-table-column prop="totalPrice"
                          label="账单金额"
                          align="center"
                          min-width="100">
                        </el-table-column>
                        <el-table-column prop="dueDateDesc"
                          label="付款截止日"
                          align="center"
                          min-width="100">
                        </el-table-column>
                        <el-table-column prop="billStatusDesc"
                          label="账单状态"
                          align="center"
                          min-width="100">
                        </el-table-column>
                        <el-table-column prop="tenantName"
                          label="账单对象"
                          align="center"
                          min-width="100">
                        </el-table-column>
                        <el-table-column label="操作"
                          align="center"
                          min-width="120">
                          <template slot-scope="scope">
                            <el-button type="text"
                              v-if="checkPermission('RENT_BILL_MESSAGE') && scope.row.billStatus === 'WAIT_COLLECTING_RENT'"
                              :disabled="!scope.row.totalPrice"
                              @click="handleRental(scope.row)"
                              size="mini">催款</el-button>
                            <slot v-if="scope.row.billType === 'RENT_BILL'">
                              <el-button type="text"
                                @click="handleCollect(scope.row, scope.row.billType)"
                                size="mini">查看</el-button>
                            </slot>
                            <slot v-else>
                              <el-button type="text"
                                @click="handleLiveOrder(scope.row, scope.row.billType)"
                                size="mini">查看</el-button>
                            </slot>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </slot>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <el-dialog title="房间日志"
      :visible.sync='houseLogDialog'
      :close-on-click-modal="false"
      append-to-body
      width="950px">
      <div class="dialog-box"
        v-if="LRentHouseForm.longChamberList && LRentHouseForm.longChamberList.length > 0">
        <el-table :data="currentRoomRecordModelList"
          header-align="center"
          stripe
          size="mini"
          style="width:100%;"
          height="400px"
          border
          class="talbe-box">
          <el-table-column prop="recordTimeDesc"
            label="时间"
            align="center"
            min-width="126">
          </el-table-column>
          <el-table-column prop="operateName"
            label="操作人"
            align="center"
            min-width="126">
          </el-table-column>
          <el-table-column prop="contentRecord"
            label="操作记录"
            align="center"
            min-width="126">
          </el-table-column>
          <el-table-column prop="typeEnumDesc"
            label="记录类型"
            align="center"
            min-width="126">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="合同信息"
      :visible.sync='houseContDialog'
      v-if="houseContDialog"
      :close-on-click-modal="false"
      append-to-body
      width="950px">
      <cont-preview :leaseContractUrl="leaseContractUrl"></cont-preview>
    </el-dialog>

    <el-dialog title="租客账单"
      append-to-body
      :visible.sync='rentBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-bill v-if="rentBillDialog"
        :billType="billType"
        :billNo="billNo"
        :source="'houseDetail'"
        :propsLeaseType="LRentHouseForm.leaseType"
        @closeDialog="closeDialog">
      </long-rent-bill>
    </el-dialog>

    <el-dialog title="生活账单"
      append-to-body
      :visible.sync='extraBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <extra-bill v-if="extraBillDialog"
        :billNo="billNo"
        :extraBillDialog.sync="extraBillDialog">
      </extra-bill>
    </el-dialog>

    <el-dialog title="租客账单"
      top="30vh"
      append-to-body
      :visible.sync='rentFirstBillDialog'
      :close-on-click-modal="false"
      width="800px">
      <rent-bill v-if="rentFirstBillDialog"
        :bill="bill"
        :manager="manager"
        @closeDialog="closeDialog">
      </rent-bill>
    </el-dialog>

    <el-dialog title="发送账单"
      append-to-body
      top="20vh"
      :visible.sync='rentalDialog'
      :close-on-click-modal="false"
      width="600px">
      <speed-rental v-if="rentalDialog"
        @closeDialog="closeDialog"
        :source="'houseDetail'"
        :messagesInfo="messagesInfo"
        :requestUrl="requestUrl"
        :billNo="billNo">
      </speed-rental>
    </el-dialog>
  </section>

</template>

<script>
import informationItem from '@/components/InformationItem';
import contPreview from './components/ContPreview';
import { $jsonp } from '@/assets/js/utils';
import rentBill from '@/pages/HouseManage/components/LongRentState/RentBill'; // 催租
import speedRental from '@/pages/HouseManage/components/LongRentState/SpeedRental'; // 催租
import extraBill from '@/pages/HouseManage/components/LongRentState/ExtraBill'; // 催租
import longRentBill from '@/pages/HouseManage/components/LongRentState/LongRentBill'; // 催租
export default {
  name: 'InventoryHouseDetail',
  data() {
    return {
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      LRentHouseForm: {
        extras: '',
        depositType: '',
        electricCharges: 0, // 电费
        waterCharges: 0, // 水费
        propertyCharges: 0, // 物业费
        internetCharges: 0, // 宽带费
        managerName: '',
        leaseType: '',
        chamberOtherInfo: {},
        roomInfo: {},
        pictureList: [ // 房源图片
          {
            roomLongId: '',
            picDepend: '',
            url: '',
            pictureType: ''
          }
        ],
        longChamberList: [],
        myChangeChamberList: [],
        entirePictureList: [],
        room: {
          gardenName: '',
          bulidingName: '',
          bedRoom: '', // 房间数
          livingRoom: '', // 客厅数
          toilet: '', // 厕所数
          kitchen: '', // 厨房数
          balcony: '', // 阳台数
          rentUseTypeDesc: '',
          area: ''
        },
        title: '' // 标题
      },
      loading: false,
      houseLogDialog: false, // 房间日志
      houseContDialog: false, // 租客电子合同
      rentBillDialog: false, // 租金详情
      extraBillDialog: false, // 生活费详情
      rentalDialog: false, // 催租信息
      rentFirstBillDialog: false, // 租客账单
      leaseContractUrl: undefined, // 电子合同url
      isEntireRent: true, // 整租： true， 合租： false
      activeName: '01卧室',
      activeIndex: 100,
      positionInfo: '',
      currentRoomRecordModelList: []
    };
  },
  components: {
    informationItem,
    contPreview,
    rentBill,
    speedRental,
    extraBill,
    longRentBill
  },

  created() {
    if (this.$route.params) {
      this.currentId = this.$route.params.id;
      this.currentSituationId = this.$route.params.situationId;
    }
    this.requestData();
  },
  methods: {
    // 获取楼盘基本信息
    requestData() {
      this.loading = true;
      this.$axios.get('/security/room/longSituation/pickSituationDetail', {
        params: {
          id: this.currentId,
          situationId: this.currentSituationId
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          let changechamberList = result.longChamberList || [];
          result.myChangeChamberList = [];
          for (let i = changechamberList.length - 1; i >= 0; i--) {
            // canPublish 为 false 则 为厨阳卫厅
            if (!changechamberList[i].canPublish) {
              result.myChangeChamberList.unshift(...changechamberList.splice(i, 1));
            }
          }
          this.$set(this, 'LRentHouseForm', result);
          this.isEntireRent = this.LRentHouseForm.leaseType === 'ENTIRE_RENT';
          if (this.isEntireRent) {
            this.activeIndex = '0';
            this.activeName = this.LRentHouseForm.longChamberList[0].name;
          } else {
            this.LRentHouseForm.longChamberList.forEach((item, i) => {
              if (changechamberList[i].situationId === this.currentSituationId) {
                this.activeName = changechamberList[i].name;
                this.activeIndex = i;
              }
            });
          }
          this.getAddress(result.roomInfo);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },
    // 获取房源最近的地铁站
    getAddress({ lat, lng }) {
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
          }
        },
        fail: (err) => {
          // 失败后会再次请求，超出3次后将不再请求
          console.log(err);
          errorCount++;
          if (errorCount < 3) {
            setTimeout(() => {
              $jsonp(options);
            }, 100);
          }
        }
      };
      $jsonp(options);
    },
    inited(viewer) {
      this.$viewerReleasein = viewer;
    },

    show() {
      this.$viewerReleasein.show();
    },

    handleShowHouseLog() {
      this.houseLogDialog = true;
    },

    handleShowHouseCont(url) {
      this.houseContDialog = true;
      this.leaseContractUrl = url;
    },

    // 关闭表格
    closeDialog(data) {
      if (data === 'LongRentBill') {
        this.rentBillDialog = false;
      } else if (data === 'MeterReading') {
        this.meterDialog = false;
      } else if (data === 'speedrental') {
        this.rentalDialog = false;
      }
    },

    handleCollect(data, type) {
      this.rentBillDialog = true;
      this.billNo = data.billNo;
      this.billType = type;
    },

    // 催款
    handleRental(data) {
      let url;
      // 生活账单催租
      if (data.billType === 'EXTRA_BILL') {
        url = '/security/extraBill/billRent';
        this.requestUrl = '/security/extraBill/sendRentMessage';
      } else {
        // 租金账单催租
        url = '/security/longOrder/billRent';
        this.requestUrl = '/security/longOrder/sendRentMessage';
      }
      this.billNo = data.billNo;
      this.$axios.get(url, {
        params: {
          keyword: this.billNo,
          type: 1
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialog = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    // 生活账单
    handleLiveOrder(data) {
      if (data.billType === 'BOOKING_BILL') {   // 打开预定信息页的弹窗
        this.$axios.get('/security/longorder/booking/queryBookingInfoByBookingNo', {
          params: { bookingNo: data.billNo }
        }).then((res) => {
          const { result } = res.data;
          if (result && res.data.status === 'C0000') {
            this.rentFirstBillDialog = true;
            this.bill = result;
            this.manager = result.bookingManager.managerName;
          }
        }).catch(err => {
          console.log(err);
        });
      } else {    // 打开原先的弹窗
        this.extraBillDialog = true;
        this.billNo = data.billNo;
      }
    },

    handleTabClick(tab, event) {
      !this.isEntireRent && (this.activeIndex = tab.index);
    }
  },
  watch: {
    activeIndex: {
      handler(value) {
        if (this.LRentHouseForm.longChamberList && this.LRentHouseForm.longChamberList.length > 0) {
          this.currentRoomRecordModelList = this.LRentHouseForm.longChamberList[value].roomRecordModelList || [];
        } else {
          this.currentRoomRecordModelList = [];
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.routeitem-box {
  box-sizing: border-box;
  min-width: 1200px;
  height: 100%;
  /* width: 1000px; */
  overflow: hidden;
  overflow-y: auto;
}
.head-info-item {
  display: inline-block;
  padding-right: 15px;
  font-weight: 900;
}
.address-div {
  font-size: 12px;
  color: #3b3b3b;
  display: flex;
  align-items: center;
}
.address-div p {
  padding: 0 10px;
}
.address-subway {
  color: #008842;
}
.huanhang {
  word-break: break-all;
  word-wrap: break-word;
}
.line-30 {
  line-height: 30px;
}
.facility-label {
  padding: 7px 0;
  box-sizing: border-box;
}

.facility-item {
  display: inline-block;
  margin: 2px 5px;
  height: 20px;
  padding: 0 10px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 12px;
  border: 1px solid #eee;
}

.img-item-box {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
}

.huanhang {
  word-break: break-all;
  word-wrap: break-word;
}
.line-30 {
  line-height: 30px;
}
.facility-label {
  padding: 7px 0;
  box-sizing: border-box;
}
.bmodule-info {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.line-header {
  display: inline-block;
  height: 20px;
  padding-left: 20px;
  line-height: 20px;
  font-size: 16px;
  border-left: 3px solid #84c6a4;
}
.line-head-pd {
  padding: 10px 10px 10px 24px;
}
.facility-head {
  display: inline-block;
  margin: 0px 5px;
  height: 18px;
  padding: 0 10px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 12px;
  border: 1px solid #008842;
}
.label-sec-type {
  display: inline-block;
  padding: 0px 10px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 12px;
  border-radius: 24px 20px 20px 0px;
  border-width: 1px;
  border-style: solid;
  /* border-color: #008842; */
  /* border: 1px solid rgba(0, 136, 66, 1); */
}
/* .el-tabs__item.is-active .label-sec-type {
  color: #008842;
} */
.noimg-box {
  width: 160px;
  height: 120px;
  position: relative;
  cursor: pointer;
}
.noimg-box > img {
  display: block;
  width: 100%;
  height: 100%;
}
.pay-label {
  font-size: 12px;
  width: 60px;
}
.pay-item {
  width: 290px;
  height: 122px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid rgba(215, 215, 215, 1);
}
.pay-room-name {
  height: 30px;
  line-height: 30px;
  /* margin-bottom: 10px; */
}
.pay-i-box {
  line-height: normal;
  display: inline-table;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  font-size: 12px;
  border-collapse: separate;
}
.pay-input {
  height: 30px;
  line-height: 30px;
  -webkit-appearance: none;
  background-color: #fff;
  /* border-radius: 4px; */
  border: 0px solid #999;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #5a5e66;
  display: inline-block;
  font-size: inherit;
  /* text-align: right; */
  /* line-height: 1; */
  outline: 0;
  padding: 0 2px !important;
  width: 100%;
}

.pay-append {
  display: inline-block;
  /* background-color: #f5f7fa; */
  color: #878d99;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 0px solid #999;
  /* border-radius: 4px; */
  width: 1px;
  line-height: 1;
  font-size: inherit;
  white-space: nowrap;
  border-left: 0;
  border-right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.pdl-46 {
  padding-left: 46px;
}
/* .room-tab-label {
} */
.room-tab-locate {
  position: relative;
  top: -12px;
  right: 6px;
}
.room-info >>> .el-tabs__item {
  height: 50px;
  line-height: 50px;
}
.out-room .content-item-twelve {
  min-width: 150px;
}
.notice-content {
  text-align: left;
  max-height: 220px;
  /* padding: 10px 20px; */
  overflow: auto;
}
</style>
