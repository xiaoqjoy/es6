<template>
  <section class="routeitem-box bgc-f1 pd-20"
    v-loading="loading"
    v-if="Object.keys(LRentHouseEdit).length > 0">
    <!-- 表单主体 -->
    <div class="bmodule-info">
      <!-- 楼盘基本信息 -->
      <div class="head-info pdv-20 bold-bdb">
        <div class="pdb-10 c-3 flex-between"
          v-if="LRentHouseEdit.roomInfo">
          <div class="font-l">
            <span class="head-info-item font-20">{{LRentHouseEdit.roomInfo.gardenName}}</span>
            <span class="head-info-item font-14">{{LRentHouseEdit.roomInfo.buildingName}}</span>
            <span class="head-info-item font-14">{{LRentHouseEdit.roomInfo.number}}</span>
            <span class="c-green facility-head">{{isEntireRent ? '整租' : '合租' }}</span>
            <span class="c-green label-sec-type"
              v-if="LRentHouseEdit.longChamberList && LRentHouseEdit.longChamberList.length > 0 && isEntireRent">
              <span>{{LRentHouseEdit.longChamberList[0].roomStockStateEnumDesc}}</span>
            </span>
          </div>
          <div>
            <div class="address-div">
              <i class="icon iconfont icon-dizhi"></i>
              <p>{{LRentHouseEdit.roomInfo.positionInfo || '--'}}</p>
              <span class="address-subway">{{positionInfo}}</span>
            </div>
          </div>
        </div>
        <div class="flex-between">
          <div class="flex-start">
            <slot v-if="LRentHouseEdit.roomInfo">
              <information-item labelInfo="房编号"
                class="pdr-30">
                {{LRentHouseEdit.roomInfo.commitNumber || '--'}}
              </information-item>
              <!-- <information-item labelInfo="类型"
              class="pdr-30">
              {{LRentHouseEdit.leaseTypeDesc || '--'}}
            </information-item> -->
              <information-item labelInfo="楼层"
                class="pdr-30">
                {{`${LRentHouseEdit.roomInfo.floor || '--'}/${LRentHouseEdit.roomInfo.totalFloor || '--'}`}}层
              </information-item>

              <information-item labelInfo="户型"
                class="pdr-30">
                {{LRentHouseEdit.roomInfo.houseStyle || '--'}}
              </information-item>

              <information-item labelInfo="面积"
                class="pdr-30">
                {{LRentHouseEdit.roomInfo.area || '--'}}
              </information-item>

              <information-item labelInfo="朝向"
                class="pdr-30">
                {{LRentHouseEdit.roomInfo.directionDesc || '--'}}
              </information-item>
            </slot>
            <information-item labelInfo="综合管家"
              class="pdr-30">
              {{LRentHouseEdit.roomInfo.gardenManagerName || '--'}}
            </information-item>

            <information-item labelInfo="服务管家"
              class="pdr-30">
              {{LRentHouseEdit.roomInfo.serviceManagerName || '--'}}
            </information-item>
          </div>

        </div>
      </div>
      <div class="">
        <el-form size="mini"
          label-position="right"
          label-width="100px"
          ref="LRentHouseEdit"
          :model="LRentHouseEdit"
          :rules="FormRules">
          <!-- 生活费用 -->
          <div class="pdv-20">
            <div>
              <header>
                <span class="line-header">生活费信息</span>
              </header>
              <div class="line-head-pd">
                <el-row :gutter="3">
                  <el-col :span="5">
                    <el-form-item label="水费："
                      prop="waterCharges">
                      <el-input :maxlength="5"
                        v-model="LRentHouseEdit.waterCharges">
                        <template slot="append">
                          元/吨
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="waterMeterReading">
                      <el-input placeholder="请输入内容"
                        size="mini"
                        maxlength="10"
                        v-model="LRentHouseEdit.waterMeterReading">
                        <template slot="prepend">抄表</template>
                        <template slot="append">吨</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="3">
                  <el-col :span="5">
                    <el-form-item label="电费："
                      prop="electricCharges">
                      <el-input :maxlength="5"
                        v-model="LRentHouseEdit.electricCharges">
                        <template slot="append">
                          元/度
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="electricMeterReading">
                      <el-input placeholder="请输入内容"
                        size="mini"
                        maxlength="10"
                        v-model="LRentHouseEdit.electricMeterReading">
                        <template slot="prepend">抄表</template>
                        <template slot="append">度</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="3">
                  <el-col :span="5">
                    <el-form-item label="燃气费："
                      prop="gasCharges">
                      <el-input :maxlength="5"
                        v-model="LRentHouseEdit.gasCharges">
                        <template slot="append">
                          元/立方
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="gasMeterReading">
                      <el-input placeholder="请输入内容"
                        size="mini"
                        maxlength="10"
                        v-model="LRentHouseEdit.gasMeterReading">
                        <template slot="prepend">抄表</template>
                        <template slot="append">立方</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 整租 -->
          <slot v-if="isEntireRent">
            <!-- 图片 -->
            <header>
              <span class="line-header">房屋图片</span> <span class="font-12 c-9">最多10张</span>
            </header>
            <div class="line-head-pd font-12 c-3">
              <div class="clearfix pdb-20"
                :class="{ 'error-border': housePics}">
                <el-form-item label-width="0px"
                  prop="entirePictureList"
                  :rules="[...FormRules.roomPictureList]">
                  <my-image-upload v-model="LRentHouseEdit.entirePictureList"
                    :postAction="'/mshz-mgr/security/room/longSituation/uploadPicture'"
                    :showType="false"
                    :maximum="10">
                  </my-image-upload>
                </el-form-item>
              </div>
            </div>
            <!-- 房屋评价 -->
            <header>
              <span class="line-header">房屋评价</span>
            </header>
            <div class="line-head-pd font-12 c-3">
              <el-form-item label-width="0px"
                prop="title">
                <!-- <my-textarea :model.sync="LRentHouseEdit.title"
                  placeholder="请输入房源点评"
                  :rows="7"
                  :minlength="8"
                  :maxlength="500">
                </my-textarea> -->
                <v-editor class="origin-style"
                  :content="LRentHouseEdit.title"
                  :height="300"
                  @change="updateItemData"
                  ref="editor">
                </v-editor>
              </el-form-item>
            </div>

            <header>
              <span class="line-header">房间押金</span>
            </header>
            <div class="line-head-pd font-12 c-3">
              <el-form-item label="押金："
                prop="longChamberList[0].depositType"
                :rules="[...FormRules.depositType]">
                <div class="w300">
                  <el-select placeholder="请选择"
                    v-model="LRentHouseEdit.longChamberList[0].depositType"
                    @change="entireRentDepositChange"
                    clearable>
                    <el-option v-for="(item, index) in depositTypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <header>
              <span class="line-header">房间服务费</span>
            </header>
            <div class="line-head-pd font-12 c-3">
              <el-form-item label="服务费："
                prop="longChamberList[0].chamberService"
                :rules="[...FormRules.monthServicePrice]">
                <div class="w300">
                  <el-input :maxlength="5"
                    clearable
                    @input="entireRentServicePriceChange"
                    v-model="LRentHouseEdit.longChamberList[0].chamberService">
                    <template slot="append">
                      %
                    </template>
                  </el-input>
                </div>
              </el-form-item>
            </div>
          </slot>
          <!-- 房间信息 -->
          <div class="pd-20 room-info"
            v-if="LRentHouseEdit.longChamberList.length > 0">
            <el-tabs v-model="activeName"
              @tab-click="handleTabClick">
              <el-tab-pane v-for="(roomItem, index) in LRentHouseEdit.longChamberList"
                :disabled="roomItem.situationId !== currentSituationId && roomItem.canPublish && !isEntireRent"
                :name="roomItem.name"
                :key="index">
                <div slot="label"
                  class="room-tab-label">{{roomItem.name}} <span v-if="roomItem.canPublish && !isEntireRent"
                    class="label-sec-type room-tab-locate">{{roomItem.roomStockStateEnumDesc}}</span>
                </div>
                <div class="pdv-20">
                  <!-- 房间信息 -->
                  <header>
                    <span class="line-header">房间信息</span>
                  </header>
                  <div class="flex-start line-head-pd">
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
                      {{roomItem.attachedChamber && roomItem.attachedChamber.indexOf('BALCONY') === -1 ?'无':'有'}}
                    </information-item>
                    <information-item labelInfo="独卫"
                      class="pdr-30">
                      {{roomItem.attachedChamber && roomItem.attachedChamber.indexOf('TOILET') === -1 ?'无':'有'}}
                    </information-item>
                  </div>

                  <slot v-if="roomItem.canPublish">
                    <!-- 租金 -->
                    <header>
                      <span class="line-header">租金信息</span>
                    </header>
                    <div class="line-head-pd font-12 c-3">
                      <!-- 月付 -->
                      <div class="input-center flex-start-s">
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberPrice'"
                            :rules="[ ...FormRules.monthPrice ]">
                            <el-input v-model.number="roomItem.chamberPrice"
                              :disabled="!checkPermission('LONG_SITUATION_CHANGE_PRICE')"
                              @input="handleCalculation(index)">
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  月付
                                </span>
                              </template>
                              <template slot="append">元/月</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberService'"
                            :rules="[...FormRules.monthServicePrice]">
                            <el-input @input="handleServiceRate(index)"
                              :disabled="!checkPermission('LONG_SITUATION_CHANGE_PRICE') || isEntireRent"
                              v-model.number="roomItem.chamberService">
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  服务费
                                </span>
                              </template>
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="w300">
                          <span class="input-display">{{(roomItem.chamberPrice*roomItem.chamberService / 100).toFixed(2)}}元/月</span>
                        </div>
                      </div>
                      <!-- 季付 -->
                      <div class="input-center flex-start-s">
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberSeasonPrice'"
                            :rules="[ ...FormRules.monthPrice ]">
                            <el-input v-model.number="roomItem.chamberSeasonPrice"
                              disabled>
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  季付
                                </span>
                              </template>
                              <template slot="append">元/月</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberSeasonService'"
                            :rules="[...FormRules.monthServicePrice]">
                            <el-input disabled
                              v-model.number="roomItem.chamberSeasonService">
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  服务费
                                </span>
                              </template>
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="w300">
                          <span class="input-display">{{(roomItem.chamberSeasonPrice*roomItem.chamberSeasonService / 100).toFixed(2)}}元/月</span>
                        </div>
                      </div>
                      <!-- 半年付 -->
                      <div class="input-center flex-start-s">
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberHalfYearPrice'"
                            :rules="[ ...FormRules.monthPrice ]">
                            <el-input v-model.number="roomItem.chamberHalfYearPrice"
                              disabled>
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  半年付
                                </span>
                              </template>
                              <template slot="append">元/月</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberHalfYearService'"
                            :rules="[...FormRules.monthServicePrice]">
                            <el-input disabled
                              v-model.number="roomItem.chamberHalfYearService">
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  服务费
                                </span>
                              </template>
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="w300">
                          <span class="input-display">{{(roomItem.chamberHalfYearPrice*roomItem.chamberHalfYearService / 100).toFixed(2)}}元/月</span>
                        </div>
                      </div>
                      <!-- 年付 -->
                      <div class="input-center flex-start-s">
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberYearPrice'"
                            :rules="[ ...FormRules.monthPrice ]">
                            <el-input v-model.number="roomItem.chamberYearPrice"
                              disabled>
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  年付
                                </span>
                              </template>
                              <template slot="append">元/月</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="pdr-10 w300">
                          <el-form-item label-width="0px"
                            :prop="'longChamberList.'+index+'.chamberYearService'"
                            :rules="[...FormRules.monthServicePrice]">
                            <el-input disabled
                              v-model.number="roomItem.chamberYearService">
                              <template slot="prefix">
                                <span style="line-height:30px;">
                                  服务费
                                </span>
                              </template>
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="w300">
                          <span class="input-display">{{(roomItem.chamberYearPrice*roomItem.chamberYearService / 100).toFixed(2)}}元/月</span>
                        </div>
                      </div>
                    </div>
                  </slot>

                  <slot v-if="roomItem.canPublish && !isEntireRent">
                    <!-- 标题 暂时不做-->
                    <!-- <header>
                      <span class="line-header">标题</span>
                    </header>
                    <div class="line-head-pd font-12 c-3 w600">
                      <el-form-item label="标题："
                        :prop="'longChamberList.'+index+'.title'"
                        :rules="[...FormRules.title]">
                        <el-input :maxlength="5"
                          v-model="roomItem.title">
                          <template slot="append">
                            限30个字
                          </template>
                        </el-input>
                      </el-form-item>
                    </div> -->
                    <!-- 活动 暂时不做-->
                    <!-- <header>
                      <span class="line-header">活动</span>
                    </header>
                    <div class="line-head-pd font-12 c-3 w300">
                      <el-form-item label="活动："
                        :prop="'longChamberList.'+index+'.activityCode'"
                        :rules="[...FormRules.depositType]">
                        <el-select placeholder="请选择"
                          v-model="roomItem.activityCode"
                          clearable>
                          <el-option label="有"
                            :value="1"></el-option>
                          <el-option label="无"
                            :value="0"></el-option>
                        </el-select>
                      </el-form-item>
                    </div> -->
                    <!-- 押金 -->
                    <header>
                      <span class="line-header">房间押金</span>
                    </header>
                    <div class="line-head-pd font-12 c-3 w300">
                      <el-form-item label="押金："
                        :prop="'longChamberList.'+index+'.depositType'"
                        :rules="[...FormRules.depositType]">
                        <el-select placeholder="请选择"
                          v-model="roomItem.depositType"
                          clearable>
                          <el-option v-for="(item, index) in depositTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <!-- <el-form-item label="租金支付方式："
                        :prop="'longChamberList.'+index+'.payType'"
                        :rules="[...FormRules.depositType]">
                        <el-select placeholder="请选择"
                          v-model="roomItem.payType"
                          clearable>
                          <el-option v-for="(item, index) in payTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="月付租金："
                        :prop="'longChamberList.'+index+'.chamberPrice'"
                        :rules="[...FormRules.monthPrice]">
                        <el-input :maxlength="5"
                          v-model="roomItem.chamberPrice">
                          <template slot="append">
                            元/月
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="服务费："
                        :prop="'longChamberList.'+index+'.monthServicePrice'"
                        :rules="[...FormRules.monthServicePrice]">
                        <el-input :maxlength="5"
                          v-model="roomItem.monthServicePrice">
                          <template slot="append">
                            %
                          </template>
                        </el-input>
                      </el-form-item> -->
                    </div>
                    <!-- 房屋评价 -->
                    <header>
                      <span class="line-header">房屋评价</span>
                    </header>
                    <div class="line-head-pd font-12 c-3">
                      <el-form-item label-width="0px"
                        :rules="[...FormRules.roomRemarkRules]"
                        :prop="'longChamberList.'+index+'.roomRemark'">
                        <v-editor class="origin-style"
                          :content="roomItem.roomRemark"
                          :height="300"
                          @change="updateItemData"
                          ref="editor">
                        </v-editor>
                        <!-- <my-textarea :model.sync="roomItem.roomRemark"
                          placeholder="请输入房源点评"
                          :rows="7"
                          :minlength="8"
                          :maxlength="500">
                        </my-textarea> -->
                      </el-form-item>
                    </div>
                  </slot>
                  <slot v-if="!isEntireRent&&roomItem.canPublish">
                    <!-- 房屋图片 -->
                    <header>
                      <span class="line-header">房屋图片</span> <span class="font-12 c-9">最多10张</span>
                    </header>
                    <div class="line-head-pd font-12 c-3">
                      <div class="clearfix"
                        :class="{ 'error-border': housePics}">
                        <el-form-item label-width="0px"
                          :prop="'longChamberList.'+index+'.pictureList'"
                          :rules="[...FormRules.roomPictureList]">
                          <my-image-upload :ref="'imageUpload'+index"
                            isAutoType
                            :autoType="roomItem.name"
                            v-model="LRentHouseEdit.longChamberList[index].pictureList"
                            :postAction="'/mshz-mgr/security/room/longSituation/uploadPicture'"
                            :showType="false"
                            :maximum="10">
                          </my-image-upload>
                        </el-form-item>
                      </div>
                    </div>
                  </slot>
                  <!-- 房屋配置 -->
                  <header>
                    <span class="line-header">房屋配置</span>
                  </header>
                  <div class="line-head-pd font-12 c-3">
                    <el-checkbox :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-form-item label-width="0px"
                      :prop="'longChamberList.'+index+'.furniture'"
                      :rules="[...FormRules.furnitures]">
                      <el-checkbox-group v-model="roomItem.furniture"
                        @change="handleCheckedFurnitureChange">
                        <el-checkbox v-for="(item,index) in baseData.furniture"
                          :key="index"
                          :name="item.value"
                          :label="item.key">{{item.value}}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form>
      </div>

      <!-- 按钮 -->
      <div class="pd-20 bdt-ddd">
        <el-button type="primary"
          size="mini"
          :loading="auditting"
          :disabled="submitting"
          v-if="LRentHouseEdit.status !== 'ENABLED'"
          @click="handleCheck('/security/room/longSituation/saveAndUp', 'saveup')">{{auditting? '执行中...' : '上架'}}</el-button>
        <el-button type="danger"
          size="mini"
          :disabled="auditting"
          :loading="submitting"
          @click="handleCheck('/security/room/longSituation/save', 'save')">{{submitting? '执行中...' : '保存'}}</el-button>
        <!-- <el-button size="mini"
          @click="closeDialog">取消</el-button> -->
      </div>
    </div>

  </section>
  <section v-else
    class="routeitem-box bgc-f1 pd-20"
    v-loading="loading">

  </section>
</template>

<script>
import VueHtml5Editor from 'vue-html5-editor';
import informationItem from '@/components/InformationItem';
import MyImageUpload from '@/components/MyImageUpload';
import myTextarea from '@/components/MyTextarea';
import { $jsonp } from '@/assets/js/utils';

// 租金支付方式
const payTypeList = [{ label: '月付', value: 'MONTH_PAY' }, { label: '季付', value: 'SEASON_PAY' }, { label: '半年付', value: 'HALF_YEAR_PAY' }, { label: '年付', value: 'YEAR_PAY' }];
const depositTypeList = [{ label: '一个月', value: 'ONE_MONTH' }, { label: '二个月', value: 'TWO_MONTH' }, { label: '三个月', value: 'THREE_MONTH' }];
export default {
  name: 'InventoryHouseEdit',
  data() {
    const handleTest = (value) => {
      if (isNaN(+value)) {
        return '请输入数字';
      } else if (value === '') {
        return '请输入该费用';
      } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
        return '最多支持两位小数';
      } else if (!(/^\d{1,3}(\.\d+)?$/).test(value)) {
        return '输入限制在1-3位数';
      } else {
        return false;
      }
    };

    const chargeRules = (rule, value, callback) => {
      if (!this.emptyCheck && !value) {
        callback();
      } else {
        let res = handleTest(value);
        if (res) {
          callback(new Error(res));
        } else {
          callback();
        }
        callback();
      }
    };
    // 抄表规则
    const valueReadingRules = (name, readValue) => {
      return (rule, value, callback) => {
        if (!+value > 0) {
          callback(new Error(`请输入${name}表数`));
        } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('最多支持两位小数'));
        } else if (!(/^\d{1,10}(\.\d+)?$/).test(value)) {
          callback(new Error('输入限制在1-10位数'));
        } else if (value < (readValue || 0)) {
          callback(new Error('不可以小于收房抄表'));
        }
        callback();
      };
    };
    // 押金
    const depositTypeRule = (rule, value, callback) => {
      if (!this.emptyCheck && !value) {
        callback();
      } else {
        if (value) {
          callback();
        } else {
          callback(new Error('请选择'));
        }
      }
    };
    // 房评
    const titleRule = (rule, value, callback) => {
      if (!this.emptyCheck && !value) {
        callback();
      } else {
        if (value && /^.{2,500}$/.test(value)) {
          callback();
        } else {
          callback(new Error('长度在 2 到 500 个字符'));
        }
      }
    };
    // 杂项费用
    const waterChargesRule = (rule, value, callback) => {
      chargeRules(rule, value, callback);
      if (value && /^\d{1,3}(\.\d+)?$/.test(value)) {
        callback();
      } else {
        callback(new Error('输入限制在1-3位数'));
      }
    };
    // 月租金
    const monthPriceRule = (rule, value, callback) => {
      if (!this.emptyCheck && !value) {
        callback();
      } else {
        if (value && /^[0-9]{3,6}$/.test(value)) {
          callback();
        } else {
          callback(new Error('请输入3到6位正整数'));
        }
      }
    };
    // 服务费
    const monthServicePriceRule = (rule, value, callback) => {
      if (!this.emptyCheck && !value) {
        callback();
      } else {
        if (value && /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/.test(value)) {
          callback();
        } else {
          callback(new Error('请输入服务费，必须为小于20,且支持1位小数'));
        }
      }
    };
    // 图片
    const roomPictureListRule = (rule, value, callback) => {
      if (!this.emptyCheck && !value.length) {
        callback();
      } else {
        if (value.length) {
          callback();
        } else {
          callback(new Error('请上传图片'));
        }
      }
    };
    // 配置项
    const furnitureRules = (rule, value, callback) => {
      if (!this.emptyCheck && !value.length) {
        callback();
      } else {
        if (value.length) {
          callback();
        } else {
          callback(new Error('请选择配置项'));
        }
      }
    };

    return {
      requestSource: null, // 取消请求
      submitting: false, // 正在提交保存
      auditting: false, // 正在提交保存
      emptyCheck: false,
      chargeRules, // 杂费检验规则
      valueReadingRules, // 抄表简要规则
      furnitureRules,
      // propertyRules,
      positionInfo: '',
      managerDialog: false,
      facilitiesDialog: false, // 设施选择
      baseData: {}, // 返回的枚举

      LRentHouseEdit: {
        leaseType: 'SHARED_RENT',
        seasonDiscount: 0,
        halfYearDiscount: 0,
        yearDisCount: 0,
        chamberOtherInfo: {},
        roomInfo: {},
        gasCharges: 0,
        gasMeterReading: 0,
        gasYield: 0,
        longChamberList: [
          { roomRemark: '', pictureList: [] },
          { roomRemark: '', pictureList: [] }
          // { roomRemark: '', pictureList: [] }
        ]
      },

      FormRules: {
        depositType: [{ validator: depositTypeRule, trigger: 'change' }], // 押金
        title: [{ validator: titleRule, trigger: 'blur' }], // 标题
        waterCharges: [
          { validator: waterChargesRule, trigger: 'blur' }
          // { pattern: /^\d{1,3}(\.\d+)?$/, message: '输入限制在1-3位数' }
        ],
        monthPrice: [
          { validator: monthPriceRule, trigger: 'blur' }
          // { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
          // { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
          // { required: this.emptyCheck, message: '请输入租金', trigger: 'blur' }
        ],
        monthServicePrice: [
          { validator: monthServicePriceRule, trigger: 'change' }
          // { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,且支持1位小数' },
          // { required: this.emptyCheck, message: '请输入服务费', trigger: 'blur' }
        ],
        roomPictureList: [
          { validator: roomPictureListRule, trigger: 'change' }
          // { type: 'array', required: this.emptyCheck, message: '请上传图片', trigger: 'change' }
        ],
        roomRemarkRules: [{ validator: titleRule, trigger: 'change' }],
        furnitures: [{ validator: furnitureRules, trigger: 'change' }], // furnitureRules
        electricCharges: [{ validator: chargeRules, trigger: 'blur' }],
        gasCharges: [{ validator: chargeRules, trigger: 'blur' }],
        gasMeterReading: [{ validator: valueReadingRules('天然气', 0), trigger: 'blur' }],
        electricMeterReading: [{ validator: valueReadingRules('电', 0), trigger: 'blur' }],
        waterMeterReading: [{ validator: valueReadingRules('水', 0), trigger: 'blur' }]
        // gasMeterReading: [{ validator: valueReadingRules('天然气', this.LRentHouseEdit.gasYield), trigger: 'blur' }],
        // electricMeterReading: [{ validator: valueReadingRules('电', this.LRentHouseEdit.electricConsume), trigger: 'blur' }],
        // waterMeterReading: [{ validator: valueReadingRules('水', this.LRentHouseEdit.waterYield), trigger: 'blur' }]

        // propertyCharges: [{ validator: propertyRules, trigger: 'blur' }]
      },
      // 图片上传的默认参数
      housePics: false,
      checkAll: false,
      isIndeterminate: true,
      depositTypeList: depositTypeList,
      payTypeList: payTypeList,
      furnitureAll: [],
      facilityIndex: 0, // 选中的tab
      activeName: '0',  // 选中的 tab name
      loading: false,

      currentSituationId: '',
      currentId: '',

      entireRentDepositType: null, // 整组押金
      entireRentServicePrice: 0, // 整组押金服务费
      isEntireRent: true // 整租： true， 合租： false
    };
  },

  created() {
    if (this.$route.params) {
      this.currentId = this.$route.params.id;
      this.currentSituationId = this.$route.params.situationId;
    }
    (async () => {
      try {
        await this.requestBaseData();
        this.requestData();
      } catch (e) {
        console.log(e);
      }
    })();
  },
  methods: {
    // 获取下来框的数据
    requestBaseData() {
      return this.$axios.get('/security/room/longSituation/queryReturn'
      ).then((res) => {
        this.baseData = JSON.parse(res.data.result);
        this.baseData.furniture.forEach(element => {
          this.furnitureAll.push(element.key);
        });
      }).catch((e) => {
        console.log(e);
      });
    },

    // 获取楼盘基本信息
    requestData() {
      this.loading = true;
      this.$axios.get('/security/room/longSituation/pickSituationEdit', {
        params: {
          id: this.currentId,
          situationId: this.currentSituationId
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          const houseBase = res.data.result;
          this.isEntireRent = houseBase.leaseType === 'ENTIRE_RENT';

          // 整租图片处理
          if (houseBase.entirePictureList.length > 0) {
            houseBase.entirePictureList = houseBase.entirePictureList.map((item, index) => {
              return {
                thumb: item.url.replace('{size}', '160x120'),
                url: item.url,
                pictureType: item.picDepend,
                id: item.id,
                typeInfo: 'networkcomin'
              };
            });
          }
          // 每间房间数据处理
          for (let i = 0; i < houseBase.longChamberList.length; i++) {
            let currentItem = houseBase.longChamberList[i];

            if (!this.isEntireRent && currentItem.situationId === this.currentSituationId) {
              this.facilityIndex = i;
              this.activeName = currentItem.name;
            }

            // 房间配置
            if (currentItem.furniture.trim().length > 0) {
              currentItem.furniture = currentItem.furniture.split(',');
            } else {
              currentItem.furniture = [];
            }

            // 请求回来的图片添加到上传图片插件中
            if (currentItem.pictureList.length > 0) {
              let picList = currentItem.pictureList.map((item, index) => {
                return {
                  thumb: item.url.replace('{size}', '160x120'),
                  url: item.url,
                  pictureType: item.picDepend,
                  id: item.id,
                  typeInfo: 'networkcomin'
                };
              });
              currentItem.pictureList = picList;
            }
          }

          if (this.isEntireRent) {
            // 整租的一些数据初始化
            this.facilityIndex = 0;
            this.activeName = houseBase.longChamberList[0].name;
            this.entireRentDepositType = houseBase.longChamberList[0].depositType;
            this.entireRentServicePrice = houseBase.longChamberList[0].chamberService;
          }
          this.$set(this, 'LRentHouseEdit', houseBase);

          this.getAddress(houseBase.roomInfo);
          // console.log(this.LRentHouseEdit);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((e) => {
        this.loading = false;
        this.$message.error('服务器异常');
        console.log(e);
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
    // 修改图片列表的数据结构符合发请求
    mapPicList(data = []) {
      if (data.length > 0) {
        // 先清空 后台返回的图片 list
        // 遍历 上传组件中的数据
        let returnList = [];
        for (let i = 0; i < data.length; i++) {
          let url;
          let id;
          let picDepend = data[i].pictureType;
          // 上传的图片 且上传成功的
          if (data[i].success && data[i].response && data[i].response.result) {
            let resultData = JSON.parse(data[i].response.result);
            if (resultData.status === 'C0000') {
              url = resultData.result.url;
            }
          } else if (data[i].typeInfo) {
            // 请求返回的图片
            url = data[i].url;
            id = data[i].id;
          }
          if (url) {
            returnList.push({
              url,
              picDepend,
              id
            });
          }
        }
        return returnList;
      } else {
        return [];
      }
    },

    handleCheckHouseForm() {
      return new Promise((resolve, reject) => {
        this.$refs.LRentHouseEdit.validate((valid) => {
          if (valid) {
            resolve(valid);
          } else {
            this.$message.error('请完善表单信息！');
            reject(valid);
          }
        });
      });
    },

    // 表单处理
    handleCheck(url, type = 'save') {
      this.emptyCheck = type === 'saveup';
      this.handleCheckHouseForm().then((res) => {
        const myHouseDate = JSON.parse(JSON.stringify(this.LRentHouseEdit));
        myHouseDate.situationIds = [];
        // 整租 合租？
        if (this.isEntireRent) {
          // 整租图片处理
          myHouseDate.entirePictureList = this.mapPicList(myHouseDate.entirePictureList);
        } else {
          // situationIds 处理
          myHouseDate.situationIds = [this.currentSituationId];
        }
        for (let i = 0; i < myHouseDate.longChamberList.length; i++) {
          let currentItem = myHouseDate.longChamberList[i];

          if (currentItem.pictureList.length > 0 && !this.isEntireRent) {
            // 合租图片处理
            currentItem.pictureList = this.mapPicList(currentItem.pictureList);
          } else {
            (currentItem.canPublish && currentItem.situationId) && myHouseDate.situationIds.push(currentItem.situationId);
          }

          // 房间配置
          if (currentItem.furniture.length > 0) {
            currentItem.furniture = currentItem.furniture.join(',');
          } else {
            currentItem.furniture = '';
          }
        }
        if (url === '/security/room/longSituation/saveAndUp') {
          this.auditting = true;
        } else {
          this.submitting = true;
        }
        if (type === 'save') {
          this.handleSubmitForm(url, myHouseDate, type);
        } else {
          this.handleUp(myHouseDate);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 上架
    handleUp(data) {
      this.$confirm('上架后，租客将会看到该房源，您确认已经编辑好了吗？', '确定上架？', {
        confirmButtonText: '确定',
        cancelButtonText: '再看看',
        type: 'warning'
      }).then(() => {
        this.handleSubmitForm('/security/room/longSituation/saveAndUp', data);
      }).catch(() => {
        this.auditting = false;
        this.submitting = false;
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    handleSubmitForm(url, myHouseDate = {}, type = undefined) {
      this.requestSource = this.$axios.CancelToken.source();
      this.$axios.post(url, myHouseDate, {
        cancelToken: this.requestSource.token
      }).then((res) => {
        this.auditting = false;
        this.submitting = false;
        if (res.data.status === 'C0000') {
          if (type === 'save') {
            this.openConfirm('保存成功', '将保留本次编辑的数据，下次进入是继续编辑');
          } else {
            this.$message.success('操作成功！');
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.auditting = false;
        this.submitting = false;
        console.log(err);
        this.$message.error(err.message || '服务器异常');
      });
    },

    // 关闭表格
    closeDialog(flag) {
      if (flag !== 'success') {
        this.cancelRequest();
      };
      this.$emit('changeDialog', false);
    },

    // 取消请求
    cancelRequest() {
      if (this.requestSource && typeof this.requestSource.cancel === 'function') {
        // 取消请求
        this.requestSource.cancel('请求已取消！');
      };
    },

    handleCheckAllChange(val) {
      this.LRentHouseEdit.longChamberList[this.facilityIndex].furniture = val ? this.furnitureAll : [];
      this.isIndeterminate = false;
    },

    handleCheckedFurnitureChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.baseData.furniture.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.baseData.furniture.length;
    },

    handleTabClick(tab, event) {
      this.facilityIndex = tab.index;
      this.checkAll = this.LRentHouseEdit.longChamberList[this.facilityIndex].furniture.length === this.baseData.furniture.length;
    },

    // 算费
    handleCalculation(index) {
      let myLongChamberList = this.LRentHouseEdit.longChamberList;
      if (+myLongChamberList[index].chamberPrice < 100) {
        myLongChamberList[index].chamberSeasonPrice = 0;
        myLongChamberList[index].chamberHalfYearPrice = 0;
        myLongChamberList[index].chamberYearPrice = 0;
        return;
      }
      myLongChamberList[index].chamberSeasonPrice = Math.round(myLongChamberList[index].chamberPrice);
      myLongChamberList[index].chamberHalfYearPrice = Math.round(myLongChamberList[index].chamberPrice);
      myLongChamberList[index].chamberYearPrice = Math.round(myLongChamberList[index].chamberPrice);
    },

    // 计算服务费
    handleServiceRate(index) {
      let myLongChamberListRate = this.LRentHouseEdit.longChamberList;
      myLongChamberListRate[index].chamberSeasonService = (myLongChamberListRate[index].chamberService * this.LRentHouseEdit.seasonDiscount).toFixed(2);
      myLongChamberListRate[index].chamberHalfYearService = (myLongChamberListRate[index].chamberService * this.LRentHouseEdit.halfYearDiscount).toFixed(2);
      myLongChamberListRate[index].chamberYearService = (myLongChamberListRate[index].chamberService * this.LRentHouseEdit.yearDisCount).toFixed(2);
    },

    openConfirm(title, content) {
      this.$alert(content, title, {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.back();
        }
      });
    },
    entireRentDepositChange(value) {
      this.LRentHouseEdit.longChamberList.forEach((item, index) => {
        item.canPublish && (item.depositType = value);
      });
    },
    entireRentServicePriceChange(value) {
      this.LRentHouseEdit.longChamberList.forEach((item, index) => {
        if (item.canPublish) {
          item.chamberService = value;
          this.handleServiceRate(index);
        }
      });
    },
    // 房评
    updateItemData(content) {
      if (this.isEntireRent) {
        this.LRentHouseEdit.title = content;
      } else {
        this.LRentHouseEdit.longChamberList[this.facilityIndex].roomRemark = content;
      }
    }
  },
  components: {
    MyImageUpload,
    myTextarea,
    informationItem,
    'v-editor': new VueHtml5Editor({
      language: 'zh-cn',
      i18n: {
        // specify your language here
        'zh-cn': {
          'align': '对齐方式',
          'image': '图片',
          'list': '列表',
          'link': '链接',
          'unlink': '去除链接',
          'table': '表格',
          'font': '文字',
          'full screen': '全屏',
          'text': '排版',
          'eraser': '格式清除',
          'info': '关于',
          'color': '颜色',
          'please enter a url': '请输入地址',
          'create link': '创建链接',
          'bold': '加粗',
          'italic': '倾斜',
          'underline': '下划线',
          'strike through': '删除线',
          'subscript': '上标',
          'superscript': '下标',
          'heading': '标题',
          'font name': '字体',
          'font size': '文字大小',
          'left justify': '左对齐',
          'center justify': '居中',
          'right justify': '右对齐',
          'ordered list': '有序列表',
          'unordered list': '无序列表',
          'fore color': '前景色',
          'background color': '背景色',
          'row count': '行数',
          'column count': '列数',
          'save': '确定',
          'upload': '上传',
          'progress': '进度',
          'unknown': '未知',
          'please wait': '请稍等',
          'error': '错误',
          'abort': '中断',
          'reset': '重置'
        }
      },
      visibleModules: [
        // 隐藏富文本编辑器的其他功能
        // 'text',
        // 'color',
        // 'font',
        // 'align',
        // 'list',
        // 'link',
        // 'unlink',
        // 'tabulation',
        // 'image',
        // 'hr',
        // 'eraser',
        // 'undo'
      ]
    })
  }
  // watch: {
  //   entireRentServicePrice(value) {
  //     this.LRentHouseEdit.longChamberList.forEach((item, index) => {
  //       if (item.canPublish) {
  //         item.chamberService = value;
  //         this.handleServiceRate(index);
  //       }
  //     });
  //   }
  // }
};
</script>

<style scoped>
/* .head-info {
  padding-left: 20px;
} */
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
/* .head-info-item:first-of-type {
  padding: 0 15px 0 0;
  border-left: none;
} */
.header-info {
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-weight: 600;
  padding: 0 20px;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
  color: #333;
}
.facility-head {
  font-size: 12px;
  margin: 2px 5px;
  padding: 2px 15px;
  border-radius: 12px;
  border: 1px solid #008842;
}
/* .facility-item:first-of-type {
  margin: 5px 10px 5px 0;
} */

.house-info {
  min-height: 100px;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}

.pd-10-20 {
  padding: 10px 20px;
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
/* nnn */
/* .room-info {
  height: 300px;
} */

.input-center >>> .el-input--prefix > input {
  text-align: center;
}
.input-display {
  -webkit-appearance: none;
  background-color: #eeeeee;
  border-radius: 4px;
  border: 1px solid #d8dce5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #5a5e66;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 10px !important;
  width: 100%;
  height: 30px;
  line-height: 30px;
  cursor: default;
}

.tab-item {
  width: 70px;
  text-align: center;
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
.w300 {
  width: 300px;
}
.w600 {
  width: 600px;
}
.pay-label {
  font-size: 12px;
  text-align: right;
  width: 100px;
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
.label-sec-type {
  display: inline-block;
  padding: 0px 10px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
  border-radius: 24px 20px 20px 0px;
  border-width: 1px;
  border-style: solid;
  /* border-color: #008842; */
  /* border: 1px solid rgba(0, 136, 66, 1); */
}
.room-tab-locate {
  position: relative;
  top: -12px;
  right: 6px;
}
.room-info >>> .el-tabs__item {
  height: 50px;
  line-height: 50px;
}
.flex-start-s {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
