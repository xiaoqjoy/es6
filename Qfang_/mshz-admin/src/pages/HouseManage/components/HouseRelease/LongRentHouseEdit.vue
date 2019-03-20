<template>
  <section>
    <div class="dialog-box">
      <div class="head-info pd-10-20">

        <h3 class="font-l pdb-10">{{houseItemData.gardenName}}</h3>

        <div class="font-l">
          <span class="head-info-item">楼栋：{{houseItemData.buildingName}}</span>

          <span class="head-info-item">房号：{{houseItemData.number}}</span>

          <span class="head-info-item">{{houseItemData.houseStyle}}</span>

          <span class="head-info-item">{{houseItemData.area}}平米</span>
        </div>
      </div>
      <div class="pd-ten bgceee">
        <el-form size="mini"
          label-position="right"
          label-width="90px"
          ref="LRentHouseEdit"
          :model="LRentHouseEdit"
          :rules="FormRules">
          <div class="house-base-info model-border pdt-20 pdl-20 pdr-20">
            <el-row>
              <el-col>
                <el-form-item label="房间标题："
                  prop="title">
                  <el-input v-model="LRentHouseEdit.title"
                    clearable>
                    <template slot="append">限30个字</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="出租方式："
                  prop="leaseType">
                  <el-radio-group v-model="LRentHouseEdit.leaseType"
                    :disabled="LRentHouseEdit.status === 'ENABLED'"
                    @change="handleToggleLeaseType">
                    <el-radio label="SHARED_RENT">合租</el-radio>
                    <el-radio label="ENTIRE_RENT">整租</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="押金："
                  prop="depositType">
                  <el-select v-model="LRentHouseEdit.depositType"
                    placeholder="请选择"
                    clearable>
                    <el-option :label="item.value"
                      :value="item.key"
                      v-for="(item, index) in baseData.depositType"
                      :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管家："
                  prop="managerName">
                  <div @click="managerDialog = true">
                    <el-input placeholder="请选择管家"
                      readonly
                      v-model="LRentHouseEdit.managerName"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="LRentHouseEdit.leaseType === 'ENTIRE_RENT' && LRentHouseEdit.longChamberList.length">
              <el-form-item label="租金："
                required>
                <el-row class="input-center">
                  <el-col :span="7"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].monthPrice"
                      :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位整数' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                      { required: true, message: '请输入租金', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        :disabled="!checkPermission('LONG_SITUATION_CHANGE_PRICE')"
                        @input="handleCalculation(0)"
                        v-model.number="LRentHouseEdit.longChamberList[0].monthPrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            月付
                          </span>
                        </template>
                        <template slot="append">元/月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7"
                    :offset="1"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].monthServicePrice"
                      :rules="[
                      { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,支持1位小数' },
                      { required: true, message: '请输入服务费', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        :disabled="!checkPermission('LONG_SITUATION_CHANGE_PRICE')"
                        @input="handleServiceRate(0)"
                        v-model.number="LRentHouseEdit.longChamberList[0].monthServicePrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            服务费
                          </span>
                        </template>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <span class="input-display">{{(LRentHouseEdit.longChamberList[0].monthPrice*LRentHouseEdit.longChamberList[0].monthServicePrice / 100).toFixed(2)}}元/月</span>
                  </el-col>
                </el-row>
                <el-row class="input-center">
                  <el-col :span="7"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].seasonPrice"
                      :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位整数' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                      { required: true, message: '请输入租金', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].seasonPrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            季付
                          </span>
                        </template>
                        <template slot="append">元/月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7"
                    :offset="1"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].seasonServicePrice"
                      :rules="[
                      { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,支持1位小数' },
                      { required: true, message: '请输入服务费', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].seasonServicePrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            服务费
                          </span>
                        </template>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <span class="input-display">{{(LRentHouseEdit.longChamberList[0].seasonPrice*LRentHouseEdit.longChamberList[0].seasonServicePrice / 100).toFixed(2)}}元/月</span>
                  </el-col>
                </el-row>
                <el-row class="input-center">
                  <el-col :span="7"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].halfYearPrice"
                      :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位整数' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                      { required: true, message: '请输入租金', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].halfYearPrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            半年付
                          </span>
                        </template>
                        <template slot="append">元/月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7"
                    :offset="1"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].halfYearServicePrice"
                      :rules="[
                      { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,支持1位小数' },
                      { required: true, message: '请输入服务费', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].halfYearServicePrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            服务费
                          </span>
                        </template>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <span class="input-display">{{(LRentHouseEdit.longChamberList[0].halfYearPrice*LRentHouseEdit.longChamberList[0].halfYearServicePrice / 100).toFixed(2)}}元/月</span>
                  </el-col>
                </el-row>
                <el-row class="input-center">
                  <el-col :span="7"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].yearPrice"
                      :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                      { required: true, message: '请输入租金', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].yearPrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            年付
                          </span>
                        </template>
                        <template slot="append">元/月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7"
                    :offset="1"
                    class="pdr-10">
                    <el-form-item prop="longChamberList[0].yearServicePrice"
                      :rules="[
                      { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,支持1位小数' },
                      { required: true, message: '请输入服务费', trigger: 'blur'}]">
                      <el-input :maxlength="10"
                        disabled
                        v-model.number="LRentHouseEdit.longChamberList[0].yearServicePrice">
                        <template slot="prefix">
                          <span style="line-height:30px;">
                            服务费
                          </span>
                        </template>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <span class="input-display">{{(LRentHouseEdit.longChamberList[0].yearPrice*LRentHouseEdit.longChamberList[0].yearServicePrice / 100).toFixed(2)}}元/月</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row>
          </div>
          <!-- 房间信息 -->
          <div class="model-border">
            <header class="model-header header-info">
              <span>房间信息</span>
            </header>
            <div class="pd-20 room-info">
              <el-tabs type="border-card"
                tabPosition="left">
                <el-tab-pane v-for="(roomItem, index) in LRentHouseEdit.longChamberList"
                  :key="index"
                  :closable="roomItem.closeTab">
                  <span slot="label">
                    <span class="tab-item inb">
                      {{roomItem.name}}
                      <!-- <i v-if="roomItem.closeTab"
                        @click="closeTabPane"
                        class="el-icon-close"></i> -->
                    </span>
                  </span>
                  <div>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="面积：">
                          <span>{{roomItem.area ? roomItem.area + '平米' : '未知'}}</span>
                          <!-- <el-input disabled
                            v-model.number="roomItem.area">
                            <template slot="append">平米</template>
                          </el-input> -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="朝向："
                          style="margin-left: -40px;">
                          <span>{{roomItem.directionDesc || '未知'}}</span>
                          <!-- <el-select disabled
                            v-model="roomItem.direction"
                            placeholder="请选择"
                            clearable>
                            <el-option :label="item.value"
                              :value="item.key"
                              v-for="(item, i) in baseData.direction"
                              :key="i"></el-option>
                          </el-select> -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="阳台："
                          style="margin-left: -40px;">
                          <el-select disabled
                            placeholder="请选择"
                            v-model="roomItem.balcony"
                            clearable>
                            <el-option label="有"
                              :value="1"></el-option>
                            <el-option label="无"
                              :value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item label="卫生间："
                          style="margin-left: -40px;">
                          <el-select disabled
                            placeholder="请选择"
                            clearable
                            v-model="roomItem.toilet">
                            <el-option label="有"
                              :value="1"></el-option>
                            <el-option label="无"
                              :value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="roomItem.canPublish && LRentHouseEdit.leaseType !== 'ENTIRE_RENT'">
                      <el-form-item label="租金：">
                        <el-row class="input-center">
                          <el-col :span="7"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.monthPrice'"
                              :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
                              { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                              { required: true, message: '请输入租金', trigger: 'blur'}]">
                              <el-input v-model.number="roomItem.monthPrice"
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
                          </el-col>
                          <el-col :span="7"
                            :offset="1"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.monthServicePrice'"
                              :rules="[
                              { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,且支持1位小数' },
                              { required: true, message: '请输入服务费', trigger: 'blur'}]">
                              <el-input @input="handleServiceRate(index)"
                                :disabled="!checkPermission('LONG_SITUATION_CHANGE_PRICE')"
                                v-model.number="roomItem.monthServicePrice">
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    服务费
                                  </span>
                                </template>
                                <template slot="append">%</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <span class="input-display">{{(roomItem.monthPrice*roomItem.monthServicePrice / 100).toFixed(2)}}元/月</span>
                          </el-col>
                        </el-row>
                        <el-row class="input-center">
                          <el-col :span="7"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.seasonPrice'"
                              :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
                              { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                              { required: true, message: '请输入租金', trigger: 'blur'}]">
                              <el-input v-model.number="roomItem.seasonPrice"
                                disabled>
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    季付
                                  </span>
                                </template>
                                <template slot="append">元/月</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7"
                            :offset="1"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.seasonServicePrice'"
                              :rules="[
                              { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,且支持1位小数' },
                              { required: true, message: '请输入服务费', trigger: 'blur'}]">
                              <el-input disabled
                                v-model.number="roomItem.seasonServicePrice">
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    服务费
                                  </span>
                                </template>
                                <template slot="append">%</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <span class="input-display">{{(roomItem.seasonPrice*roomItem.seasonServicePrice / 100).toFixed(2)}}元/月</span>
                          </el-col>
                        </el-row>
                        <el-row class="input-center">
                          <el-col :span="7"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.halfYearPrice'"
                              :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
                              { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                              { required: true, message: '请输入租金', trigger: 'blur'}]">
                              <el-input v-model.number="roomItem.halfYearPrice"
                                disabled>
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    半年付
                                  </span>
                                </template>
                                <template slot="append">元/月</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7"
                            :offset="1"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.halfYearServicePrice'"
                              :rules="[
                              { pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,且支持1位小数' },
                              { required: true, message: '请输入服务费', trigger: 'blur'}]">
                              <el-input disabled
                                v-model.number="roomItem.halfYearServicePrice">
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    服务费
                                  </span>
                                </template>
                                <template slot="append">%</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <span class="input-display">{{(roomItem.halfYearPrice*roomItem.halfYearServicePrice / 100).toFixed(2)}}元/月</span>
                          </el-col>
                        </el-row>
                        <el-row class="input-center">
                          <el-col :span="7"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.yearPrice'"
                              :rules="[ { pattern: /^[0-9]{3,6}$/, message: '输入长度在 3 到 6 位' },
                              { pattern: /^[1-9]\d*$/, message: '请输入正整数' },
                              { required: true, message: '请输入租金', trigger: 'blur'}]">
                              <el-input v-model.number="roomItem.yearPrice"
                                disabled>
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    年付
                                  </span>
                                </template>
                                <template slot="append">元/月</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="7"
                            :offset="1"
                            class="pdr-10">
                            <el-form-item :prop="'longChamberList.'+index+'.yearServicePrice'"
                              :rules="[{ pattern: /^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,2}))$/, message: '必须为小于20,且支持1位小数' },{ required: true, message: '请输入服务费', trigger: 'blur'}]">
                              <el-input disabled
                                v-model.number="roomItem.yearServicePrice">
                                <template slot="prefix">
                                  <span style="line-height:30px;">
                                    服务费
                                  </span>
                                </template>
                                <template slot="append">%</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <span class="input-display">{{(roomItem.yearPrice*roomItem.yearServicePrice / 100).toFixed(2)}}元/月</span>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-row>
                    <div class="flex-start-grow">
                      <p class="font-r facility-label">
                        <span>设施：</span>
                      </p>
                      <div class="flex-1">
                        <p class="line-30 clearfix">
                          <span class="facility-item float-l"
                            v-for="(item,i) in roomItem.furnitureDesc"
                            :key="i">{{item}}</span>
                          <span class="facility-item float-l">
                            <el-button type="text"
                              @click="handleSelectFacility(roomItem.furniture, index)"
                              size="mini">
                              <i class="icon iconfont icon-tianjia font-14"></i>
                              添加</el-button>
                          </span>
                        </p>
                      </div>
                    </div>
                    <el-row v-if="roomItem.canPublish && LRentHouseEdit.leaseType !== 'ENTIRE_RENT'">
                      <div class="flex-start-grow">
                        <p class="font-r facility-label">
                          <span>房源点评：</span>
                        </p>
                        <div class="flex-1">
                          <p class="line-h-40 font-red font-12">请认真填写，客户在Q房网外网可见
                          </p>
                          <my-textarea :model.sync="roomItem.roomRemark"
                            placeholder="请输入房源点评"
                            :rows="7"
                            :minlength="8"
                            :maxlength="500">
                          </my-textarea>
                        </div>
                      </div>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <!-- 房源点评，整租展示的位置 -->
          <div v-if="LRentHouseEdit.leaseType === 'ENTIRE_RENT' && LRentHouseEdit.longChamberList.length"
            class="model-border">
            <header class="model-header">房源点评
              <span class="float-r font-red">请认真填写，客户在Q房网外网可见</span>
            </header>
            <div class="pd-20">
              <div class="pdt-10">
                <my-textarea :model.sync="LRentHouseEdit.longChamberList[0].roomRemark"
                  placeholder="请输入房源点评"
                  :rows="7"
                  :minlength="8"
                  :maxlength="500">
                </my-textarea>
              </div>
            </div>
          </div>
          <!-- 生活费用 -->
          <div class="model-border">
            <header class="model-header">生活费信息
              <span class="float-r c-9">注：未勾选水、电、燃气表示不收租客对应费用</span>
            </header>
            <div class="pd-ten pdt-20 pdl-20 pdr-20">
              <el-row :gutter="3">
                <el-col :span="2">
                  <el-form-item style="margin-left:-90px;">
                    <!-- @change="changeExtras('WATER_CHARGES',$event)" -->
                    <el-checkbox v-model="incidentals.WATER_CHARGES.isHasItem"
                      label="水费"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item style="margin-left:-90px;"
                    prop="waterCharges">
                    <el-input :maxlength="5"
                      v-model="LRentHouseEdit.waterCharges"
                      :disabled="!incidentals.WATER_CHARGES.isHasItem">
                      <template slot="append">
                        元/吨
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item style="margin-left:-90px;"
                    prop="waterMeterReading">
                    <el-input placeholder="请输入内容"
                      size="mini"
                      maxlength="10"
                      v-model="LRentHouseEdit.waterMeterReading">
                      <template slot="prepend">抄表</template>
                      <template slot="append">吨</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="2"
                  :offset="2">
                  <el-form-item style="margin-left:-90px;">
                    <!-- @change="changeExtras('ELECTRIC_CHARGES',$event)" -->
                    <el-checkbox v-model="incidentals.ELECTRIC_CHARGES.isHasItem"
                      label="电费"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item style="margin-left:-90px;"
                    prop="electricCharges">
                    <el-input :maxlength="5"
                      v-model="LRentHouseEdit.electricCharges"
                      :disabled="!incidentals.ELECTRIC_CHARGES.isHasItem">
                      <template slot="append">
                        元/度
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item style="margin-left:-90px;"
                    prop="electricMeterReading">
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
                <el-col :span="2">
                  <el-form-item style="margin-left:-90px;">
                    <!-- @change="changeExtras('GAS_CHARGES',$event)" -->
                    <el-checkbox v-model="incidentals.GAS_CHARGES.isHasItem"
                      label="燃气费"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item style="margin-left:-90px;"
                    prop="gasCharges">
                    <el-input :maxlength="5"
                      v-model="LRentHouseEdit.gasCharges"
                      :disabled="!incidentals.GAS_CHARGES.isHasItem">
                      <template slot="append">
                        元/立方
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item style="margin-left:-90px;"
                    prop="gasMeterReading">
                    <el-input placeholder="请输入内容"
                      size="mini"
                      maxlength="10"
                      v-model="LRentHouseEdit.gasMeterReading">
                      <template slot="prepend">抄表</template>
                      <template slot="append">立方</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <!-- 发布房源去掉 宽带费 需求（1.24.0）2018-10-18
                  <el-col :span="2"
                  :offset="2">
                  <el-form-item style="margin-left:-90px;">
                    <el-checkbox v-model="incidentals.INTERNET_CHARGES.isHasItem"
                      label="宽带费"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item style="margin-left:-90px;"
                    prop="internetCharges">
                    <el-input :maxlength="5"
                      v-model="LRentHouseEdit.internetCharges"
                      :disabled="!incidentals.INTERNET_CHARGES.isHasItem">
                      <template slot="append">
                        元/月
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col> -->

                <!-- <el-col :span="2"
                  :offset="2">
                  <el-form-item style="margin-left:-90px;">
                    <el-checkbox v-model="incidentals.PROPERTY_CHARGES.isHasItem"
                      @change="changeExtras('PROPERTY_CHARGES',$event)"
                      label="物业费"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item style="margin-left:-90px;"
                    prop="propertyCharges">
                    <el-input :maxlength="5"
                      v-model="LRentHouseEdit.propertyCharges"
                      :disabled="!incidentals.PROPERTY_CHARGES.isHasItem">
                      <template slot="append">
                        元/月
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </div>
        </el-form>
        <div class="model-border">
          <header class="header-info">房源图片
            <span class="font-default">(限20张)</span>
            <span v-if="housePics"
              class="font-red">至少上传一张图片</span>
          </header>
          <div class="clearfix pdb-20"
            :class="{ 'error-border': housePics}">
            <my-image-upload ref="imageUpload"
              v-model="houseImages.files"
              :postAction="'/mshz-mgr/security/room/longSituation/uploadPicture'"
              :pictureTypeList="myImageTypeList"
              :maximum="20">
            </my-image-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="auditting"
        :disabled="submitting"
        v-if="LRentHouseEdit.status !== 'ENABLED'"
        @click="handleSave('/security/room/longSituation/saveAndUp')">{{auditting? '执行中...' : '上架'}}</el-button>
      <el-button type="danger"
        size="mini"
        :disabled="auditting"
        :loading="submitting"
        @click="handleSave('/security/room/longSituation/save')">{{submitting? '执行中...' : '保存'}}</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>
    </div>

    <el-dialog :visible.sync='managerDialog'
      :close-on-click-modal="false"
      width="950px"
      top="20vh"
      append-to-body>
      <organization v-if="managerDialog"
        :type="'addhouse'"
        v-on:selectManager="handleSelectManager"
        :managerName="LRentHouseEdit.managerName">
      </organization>
    </el-dialog>

    <el-dialog title="设施选择"
      width="600"
      top="25vh"
      append-to-body
      :visible.sync="facilitiesDialog"
      :close-on-click-modal="false">
      <section class="bgceee facilityForm">
        <el-checkbox-group v-model="facilityForm">
          <el-checkbox v-for="(item,index) in baseData.furniture"
            :key="index"
            :name="item.value"
            :label="item.key"
            border>{{item.value}}
          </el-checkbox>
        </el-checkbox-group>
      </section>
      <div class="dialog-footer">
        <el-button type="primary"
          @click="addFacility"
          size="mini">添加</el-button>
        <el-button size="mini"
          @click="facilitiesDialog = false, facilityForm = []">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import FileUpload from 'vue-upload-component';
import Organization from './Organization';
import MyImageUpload from '@/components/MyImageUpload';
import myTextarea from '@/components/MyTextarea';
export default {
  name: 'LRentHouseEdit',
  data() {
    const handleTest = (value) => {
      if (isNaN(+value)) {
        return '请输入数字';
      } else if (!+value) {
        return '请输入该费用';
      } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
        return '最多支持两位小数';
      } else if (!(/^\d{1,3}(\.\d+)?$/).test(value)) {
        return '输入限制在1-3位数';
      } else {
        return false;
      }
    };
    const internetRules = (rule, value, callback) => {
      if (this.incidentals.INTERNET_CHARGES.isHasItem) {
        let res = handleTest(value);
        if (res) { callback(new Error(res)); } else { callback(); }
        // if (!+value > 0) {
        //   callback(new Error('请输入宽带费用'));
        // } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
        //   callback(new Error('最多支持两位小数'));
        // } else if (!(/^\d{1,3}(\.\d+)?$/).test(value)) {
        //   callback(new Error('输入限制在1-3位数'));
        // }
      }
      callback();
    };
    const waterRules = (rule, value, callback) => {
      if (this.incidentals.WATER_CHARGES.isHasItem) {
        let res = handleTest(value);
        if (res) { callback(new Error(res)); } else { callback(); }
      }
      callback();
    };
    const electricRules = (rule, value, callback) => {
      if (this.incidentals.ELECTRIC_CHARGES.isHasItem) {
        let res = handleTest(value);
        if (res) { callback(new Error(res)); } else { callback(); }
      }
      callback();
    };
    const gasRules = (rule, value, callback) => {
      if (this.incidentals.GAS_CHARGES.isHasItem) {
        let res = handleTest(value);
        if (res) { callback(new Error(res)); } else { callback(); }
      }
      callback();
    };
    const electricMeterReadingRules = (rule, value, callback) => {
      if (this.incidentals.ELECTRIC_CHARGES.isHasItem) {
        if (!+value > 0) {
          callback(new Error('请输入电表数'));
        } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('最多支持两位小数'));
        } else if (!(/^\d{1,10}(\.\d+)?$/).test(value)) {
          callback(new Error('输入限制在1-10位数'));
        } else if (value < (this.LRentHouseEdit.electricConsume || 0)) {
          callback(new Error('不可以小于收房抄表'));
        }
      }
      callback();
    };
    const waterMeterReadingRules = (rule, value, callback) => {
      if (this.incidentals.WATER_CHARGES.isHasItem) {
        if (!+value > 0) {
          callback(new Error('请输入电表数'));
        } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('最多支持两位小数'));
        } else if (!(/^\d{1,10}(\.\d+)?$/).test(value)) {
          callback(new Error('输入限制在1-10位数'));
        } else if (value < (this.LRentHouseEdit.waterYield || 0)) {
          callback(new Error('不可以小于收房抄表'));
        }
      }
      callback();
    };
    const gasMeterReadingRules = (rule, value, callback) => {
      if (this.incidentals.GAS_CHARGES.isHasItem) {
        if (!+value > 0) {
          callback(new Error('请输入电表数'));
        } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('最多支持两位小数'));
        } else if (!(/^\d{1,10}(\.\d+)?$/).test(value)) {
          callback(new Error('输入限制在1-10位数'));
        } else if (value < (this.LRentHouseEdit.gasYield || 0)) {
          callback(new Error('不可以小于收房抄表'));
        }
      }
      callback();
    };
    // const propertyRules = (rule, value, callback) => {
    //   if (this.incidentals.PROPERTY_CHARGES.isHasItem) {
    //     if (!+value > 0) {
    //       callback(new Error('请输入物业费用'));
    //     } else if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
    //       callback(new Error('最多支持两位小数'));
    //     } else if (!(/^\d{1,5}(\.\d+)?$/).test(value)) {
    //       callback(new Error('输入限制在1-5位数'));
    //     }
    //   }
    //   callback();
    // };
    return {
      requestSource: null, // 取消请求
      submitting: false, // 正在提交保存
      auditting: false, // 正在提交保存
      addIndex: 0,
      isHandleAdd: true,

      internetRules,
      waterRules,
      electricRules,
      gasRules,
      // propertyRules,
      electricMeterReadingRules,
      waterMeterReadingRules,
      gasMeterReadingRules,

      managerDialog: false,
      facilitiesDialog: false, // 设施选择
      facilityForm: [],
      facilityIndex: '',
      baseData: {}, // 返回的枚举
      requestRoomInfo: {
        ReLeaseType: '',
        totalPrices: 0,
        roomListInfo: []
      },
      LRentHouseEdit: {
        leaseType: 'SHARED_RENT',
        seasonDiscount: 0,
        halfYearDiscount: 0,
        yearDisCount: 0,
        longChamberList: [
          { roomRemark: '' }
        ]
      },
      // incidentals: {},
      incidentals: {
        ELECTRIC_CHARGES: { isHasItem: false }, // 电费
        GAS_CHARGES: { isHasItem: false }, // 燃气
        WATER_CHARGES: { isHasItem: false }, // 水费
        // PROPERTY_CHARGES: { isHasItem: false }, // 物业费
        INTERNET_CHARGES: { isHasItem: false }// 宽带费
      },
      myImageTypeList: [
        {
          value: '户型图',
          key: '户型图'
        }
      ],
      FormRules: {
        depositType: [{ required: true, message: '请选择押金', trigger: 'change' }], // 押金
        title: [
          { min: 2, max: 30, message: ' 长度在 2 到 30 个字符 ', trigger: 'blur' }
        ], // 标题
        internetCharges: [
          { validator: internetRules, trigger: 'blur' },
          { pattern: /^\d{1,3}$/, message: '输入限制在1-3位正整数' }
        ],
        waterCharges: [
          { validator: waterRules, trigger: 'blur' },
          { pattern: /^\d{1,3}(\.\d+)?$/, message: '输入限制在1-3位数' }
        ],
        electricCharges: [{ validator: electricRules, trigger: 'blur' }],
        gasCharges: [{ validator: gasRules, trigger: 'blur' }],
        gasMeterReading: [{ validator: gasMeterReadingRules, trigger: 'blur' }],
        electricMeterReading: [{ validator: electricMeterReadingRules, trigger: 'blur' }],
        waterMeterReading: [{ validator: waterMeterReadingRules, trigger: 'blur' }]

        // propertyCharges: [{ validator: propertyRules, trigger: 'blur' }]
      },
      // 图片上传的默认参数
      housePics: false,
      pictype: '',
      houseImages: { files: [] } // 为了可以传入 el-form 进行验证
    };
  },
  props: ['houseItemData'],
  created() {
    (async () => {
      try {
        await this.requestBaseData();
        this.requestData();
      } catch (e) {
        console.log(e);
      }
    })();
    // this.requestBaseData();
    // this.requestData();
  },
  methods: {
    // 获取下来框的数据
    requestBaseData() {
      return this.$axios.get(
        '/security/room/longSituation/queryReturn'
      ).then((res) => {
        this.baseData = JSON.parse(res.data.result);
        // JSON.stringify(jsonobj)
      }).catch((e) => {
        console.log(e);
      });
    },

    // 获取楼盘基本信息
    requestData() {
      this.$axios.get(
        '/security/room/longSituation/pickSituationDetail',
        {
          params: {
            id: this.houseItemData.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          const houseBase = res.data.result;
          let myRoomListInfo = JSON.parse(JSON.stringify(houseBase.longChamberList));
          // 接口所需
          let allPrice = 0;
          for (let i = 0; i < houseBase.longChamberList.length; i++) {
            let currentItem = houseBase.longChamberList[i];
            currentItem.balcony = 0;
            currentItem.toilet = 0;
            myRoomListInfo[i].balcony = 0;
            myRoomListInfo[i].toilet = 0;
            if (currentItem.attachedChamber.indexOf('BALCONY') !== -1) {
              currentItem.balcony = 1;
              myRoomListInfo[i].balcony = 1;
            }
            if (currentItem.attachedChamber.indexOf('TOILET') !== -1) {
              currentItem.toilet = 1;
              myRoomListInfo[i].toilet = 1;
            }
            this.myImageTypeList.push({
              key: currentItem.name,
              value: currentItem.name
            });
            if (currentItem.direction === '') {
              currentItem.direction = null;
            }
            if (currentItem.canPublish) {
              allPrice += (+currentItem.monthPrice);
              // 如果是整租, 存取一份“价格”，用于整租 => 合租的默认价格
              if (houseBase.leaseType === 'ENTIRE_RENT' && i > 0) {
                myRoomListInfo[i].monthPrice = myRoomListInfo[0].monthPrice;
                myRoomListInfo[i].seasonPrice = myRoomListInfo[0].seasonPrice;
                myRoomListInfo[i].halfYearPrice = myRoomListInfo[0].halfYearPrice;
                myRoomListInfo[i].yearPrice = myRoomListInfo[0].yearPrice;
                myRoomListInfo[i].yearServicePrice = myRoomListInfo[0].yearServicePrice;
                myRoomListInfo[i].halfYearServicePrice = myRoomListInfo[0].halfYearServicePrice;
                myRoomListInfo[i].seasonServicePrice = myRoomListInfo[0].seasonServicePrice;
                myRoomListInfo[i].monthServicePrice = myRoomListInfo[0].monthServicePrice;
              }
            }
          }

          this.$set(this, 'LRentHouseEdit', houseBase);
          // 储存接口回来的房间数据,用于切换 合租，整租。
          this.requestRoomInfo.ReLeaseType = houseBase.leaseType;
          this.requestRoomInfo.totalPrices = allPrice;
          this.$set(this.requestRoomInfo, 'roomListInfo', myRoomListInfo);
          // 请求回来的图片添加到上传图片插件中
          if (houseBase.pictureList.length > 0) {
            let picList = houseBase.pictureList.map((item, index) => {
              return {
                // item.thumb = item.pictureUrl.replace('{size}', '300x300')
                thumb: item.url.replace('{size}', '160x120'),
                url: item.url,
                pictureType: item.picDepend,
                id: item.id,
                typeInfo: 'networkcomin'
              };
            });

            this.houseImages.files = picList;
          }
          // extras 接口返回的 “杂费枚举” array
          const { extras = [] } = this.baseData;
          // houseBase.extras 接口返回的已选 “杂费” 的选择，是 string 类型，用逗号分格
          // 遍历 extras 添加 属性到 incidentals（object）页面展示需要
          for (let i = 0; i < extras.length; i++) {
            let itemData = Object.assign({}, extras[i]);
            // 增加 isHasItem 属性 该项是否已选
            itemData['isHasItem'] = houseBase.extras.indexOf(extras[i].key) !== -1;
            this.$set(this.incidentals, [extras[i].key], itemData);
          }
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((e) => {
        this.$message.error('服务器异常');
        console.log(e);
      });
    },

    // 修改图片列表的数据结构符合发请求
    mapPicList() {
      if (this.houseImages.files.length > 0) {
        // 先清空 后台返回的图片 list
        this.LRentHouseEdit.pictureList = [];
        // 遍历 上传组件中的数据
        for (let i = 0; i < this.houseImages.files.length; i++) {
          let url;
          let id;
          let picDepend = this.houseImages.files[i].pictureType;

          // 上传的图片 且上传成功的
          if (this.houseImages.files[i].success && this.houseImages.files[i].response && this.houseImages.files[i].response.result) {
            let resultData = JSON.parse(this.houseImages.files[i].response.result);
            if (resultData.status === 'C0000') {
              url = resultData.result.url;
            }
            // url = JSON.parse(this.houseImages.files[i].response.result).result.url;
          } else if (this.houseImages.files[i].typeInfo) {
            // 请求返回的图片
            url = this.houseImages.files[i].url;
            id = this.houseImages.files[i].id;
          }
          if (url) {
            this.LRentHouseEdit.pictureList.push({
              url,
              picDepend,
              id
            });
          }
        }

        if (!this.LRentHouseEdit.pictureList.length > 0) {
          this.housePics = true;
          return false;
        } else {
          this.housePics = false;
          return true;
        }
      } else {
        this.LRentHouseEdit.pictureList = [];
        this.housePics = true;
        return false;
      }
    },

    // 算费
    handleCalculation(index) {
      let myLongChamberList = this.LRentHouseEdit.longChamberList;
      if (+myLongChamberList[index].monthPrice < 100) {
        myLongChamberList[index].seasonPrice = 0;
        myLongChamberList[index].halfYearPrice = 0;
        myLongChamberList[index].yearPrice = 0;
        return;
      }
      myLongChamberList[index].seasonPrice = Math.round(myLongChamberList[index].monthPrice);
      myLongChamberList[index].halfYearPrice = Math.round(myLongChamberList[index].monthPrice);
      myLongChamberList[index].yearPrice = Math.round(myLongChamberList[index].monthPrice);
    },

    // 计算服务费
    handleServiceRate(index) {
      let myLongChamberListRate = this.LRentHouseEdit.longChamberList;
      myLongChamberListRate[index].seasonServicePrice = (myLongChamberListRate[index].monthServicePrice * this.LRentHouseEdit.seasonDiscount).toFixed(2);
      myLongChamberListRate[index].halfYearServicePrice = (myLongChamberListRate[index].monthServicePrice * this.LRentHouseEdit.halfYearDiscount).toFixed(2);
      myLongChamberListRate[index].yearServicePrice = (myLongChamberListRate[index].monthServicePrice * this.LRentHouseEdit.yearDisCount).toFixed(2);
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

    // 保存
    handleSave(url) {
      // 是否上传图片
      let dat = this.mapPicList();
      if (!dat) {
        return false;
      }

      Promise.all([this.handleCheckHouseForm(), this.$refs.imageUpload.handleCheckType()]).then((res) => {
        const myHouseDate = JSON.parse(JSON.stringify(this.LRentHouseEdit));
        let myExtras = '';
        for (let i in this.incidentals) {
          if (this.incidentals[i].isHasItem) {
            myExtras = myExtras + ',' + this.incidentals[i].key;
          } else {
            // 杂费项没勾选，都为 0
            // this.changeExtras(this.incidentals[i].key, this.incidentals[i].isHasItem);
          }
        }
        // 去掉一个逗号
        myHouseDate.extras = myExtras.trim().slice(1);
        if (url === '/security/room/longSituation/saveAndUp') {
          this.auditting = true;
        } else {
          this.submitting = true;
        }
        this.requestSource = this.$axios.CancelToken.source();
        this.$axios.post(
          url,
          myHouseDate,
          {
            cancelToken: this.requestSource.token
          }
        ).then((res) => {
          this.auditting = false;
          this.submitting = false;
          if (res.data.status === 'C0000') {
            // 操作“上架” 或者 上架后操作“保存"通知刷新房态
            if (url === '/security/room/longSituation/saveAndUp' || this.LRentHouseEdit.status === 'ENABLED') {
              if (this.LRentHouseEdit.leaseType === 'ENTIRE_RENT') {
                this.$store.commit('freshenLREntireHouseStataus', true);
              } else {
                this.$store.commit('freshenLRJointHouseStataus', true);
              }
            }
            this.$emit('refreshData');
            this.$message.success('操作成功！');
            this.closeDialog('success');
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          this.auditting = false;
          this.submitting = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
      }).catch(err => {
        console.log(err);
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

    // 选择设施
    handleSelectFacility(data, index) {
      if (data.trim().length > 0) {
        this.facilityForm = data.split(',');
      } else {
        this.facilityForm = [];
      }
      this.facilityIndex = index;
      this.facilitiesDialog = true;
    },

    // 添加设施
    addFacility() {
      this.facilitiesDialog = false;
      this.facilityForm = this.facilityForm.join(',');
      let furnitureDescList = [];
      for (let i = 0; i < this.baseData.furniture.length; i++) {
        if (this.facilityForm.indexOf(this.baseData.furniture[i].key) !== -1) {
          furnitureDescList.push(this.baseData.furniture[i].value);
        }
      }

      this.LRentHouseEdit.longChamberList[this.facilityIndex].furniture = this.facilityForm;
      this.LRentHouseEdit.longChamberList[this.facilityIndex].furnitureDesc = furnitureDescList;
    },

    // 选择管家
    handleSelectManager(data) {
      this.LRentHouseEdit.managerName = data.name;
      this.LRentHouseEdit.managerId = data.id;
      this.managerDialog = data.flag;
    },

    // 杂费项 选项
    changeExtras(item, $event) {
      let mydata = this.LRentHouseEdit;
      switch (item) {
        case 'ELECTRIC_CHARGES':
          !$event && (mydata.electricCharges = 0);
          break;
        case 'GAS_CHARGES':
          !$event && (mydata.gasCharges = 0);
          break;
        case 'WATER_CHARGES':
          !$event && (mydata.waterCharges = 0);
          break;
        // case 'PROPERTY_CHARGES':
        //   !$event && (mydata.propertyCharges = 0);
        //   break;
        case 'INTERNET_CHARGES':
          !$event && (mydata.internetCharges = 0);
          break;
      }
    },

    // 改出租方式：合租，整租
    handleToggleLeaseType(val) {
      let { roomListInfo, totalPrices } = this.requestRoomInfo;
      // 切回原来的 取存储值。
      if (this.requestRoomInfo.ReLeaseType === val) {
        // 保护储存的值不给更改
        this.$set(this.LRentHouseEdit, 'longChamberList', JSON.parse(JSON.stringify(roomListInfo)));
      } else {
        // 如果切换 整租 => 合租；
        if (val === 'SHARED_RENT') {
          this.$set(this.LRentHouseEdit, 'longChamberList', JSON.parse(JSON.stringify(roomListInfo)));
        } else {
          // 合租 => 整租
          //  if (currentItem.attachedChamber.indexOf('BALCONY') !== -1) {
          //   currentItem.balcony = 1;
          // }
          // if (currentItem.attachedChamber.indexOf('TOILET') !== -1) {
          //   currentItem.toilet = 1;
          // }
          let myFistID = this.LRentHouseEdit.longChamberList[0].id;
          this.$set(this.LRentHouseEdit.longChamberList, 0, {
            area: 0,
            canPublish: true,
            direction: null,
            furniture: '',
            balcony: roomListInfo[0].balcony,
            toilet: roomListInfo[0].toilet,
            halfYearPrice: totalPrices,
            halfYearServicePrice: roomListInfo[0].halfYearServicePrice,
            id: myFistID,
            monthPrice: totalPrices,
            monthServicePrice: roomListInfo[0].monthServicePrice,
            name: '01卧室',
            seasonPrice: totalPrices,
            seasonServicePrice: roomListInfo[0].seasonServicePrice,
            yearPrice: totalPrices,
            roomRemark: '',
            yearServicePrice: roomListInfo[0].yearServicePrice
          });
        }
      }
    }

  },
  components: {
    FileUpload,
    Organization,
    MyImageUpload,
    myTextarea
  }
};
</script>

<style scoped>
/* .head-info {
  padding-left: 20px;
} */
.head-info-item {
  display: inline-block;
  padding: 0 15px;
  font-size: 14px;
  line-height: 16px;
  color: #999;
  border-left: 1px solid #eee;
}
.head-info-item:first-of-type {
  padding: 0 15px 0 0;
  border-left: none;
}
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
.facility-item {
  margin: 5px 10px;
  padding: 2px 15px;
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #eee;
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

/* nnn */
/* .room-info {
  height: 300px;
} */
.room-info >>> .el-tabs__nav-scroll {
  padding: 0;
}
.room-info >>> .el-tabs--border-card {
  height: 100%;
  box-shadow: none;
  border-color: #dddddd;
}
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
  cursor: default;
}
.facility-label {
  line-height: 40px;
  width: 80px;
}
.facility-item.float-l >>> .el-button--mini {
  padding: 0;
}
.facilityForm >>> .el-checkbox.is-bordered {
  margin-left: 10px;
  margin-top: 10px;
}
.pd-20.room-info >>> .el-tabs__new-tab {
  float: none;
  display: inline-block;
  border: 1px solid #d3dce6;
  height: 20px;
  width: 40px;
  line-height: 20px;
  margin: 10px 0 9px 35px;
  border-radius: 3px;
  text-align: center;
  font-size: 18px;
  color: #d3dce6;
  cursor: pointer;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}
.pd-20.room-info >>> .el-tabs__new-tab:hover {
  color: #008842;
  border-color: #cee4d5;
  background-color: #eff6f1;
}
.pd-20.room-info >>> .el-tabs__new-tab:focus {
  outline: none;
}
.pd-20.room-info >>> .el-tabs--left .el-tabs__item {
  text-align: left;
}

.pd-20.room-info >>> .el-tabs__new-tab:active {
  color: #519567;
  border-color: #519567;
  outline: none;
}
.tab-item {
  width: 70px;
  text-align: left;
}
.error-border {
border: 1px solid red;
}
</style>
