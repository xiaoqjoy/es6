<template>
  <section>
    <div class="dialog-box">
      <el-row>
        <el-col>
          <div class="dialog-l">
            <el-form ref="houseForm"
              :model="houseInfo"
              :rules="houseRules"
              size="mini"
              label-position="right"
              label-width="90px">
              <!-- 房源信息 -->
              <div class="house-info">
                <header class="header-info">房源信息</header>
                <div class="info-box">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="类型："
                        prop="roomType">
                        <el-radio-group v-model="houseInfo.roomType">
                          <el-radio label="DISTRIBUTED_MODEL">分散式</el-radio>
                          <el-radio label="CENTRALIZED_MODEL">集中式</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="模式："
                        prop="pattern">
                        <el-radio-group v-model="houseInfo.pattern"
                          @change="handleChangePattern">
                          <el-radio label="LONG">长租</el-radio>
                          <el-radio label="SHORT">短租</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="城市："
                        prop="city">
                        <el-select v-model="houseInfo.city"
                          placeholder="请选择城市"
                          @change="hendleEmpty(5)"
                          clearable
                          :disabled="houseDisabse">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.City"
                            :key="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="楼盘："
                        prop="gardenName">
                        <el-select v-model="houseInfo.gardenName"
                          filterable
                          remote
                          placeholder="请输入关键字"
                          :remote-method="remoteMethod"
                          @change="handleSelectGDId"
                          clearable
                          :loading="gardenLoading"
                          :disabled="!houseInfo.city.length || houseDisabse">
                          <el-option v-for="(item, index) in gardenNameList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            <p>
                              <span>{{ item.label }}</span>
                              <span class="c-9">({{ item.geographyArea }})</span>
                            </p>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="用途："
                        prop="rentUseType">
                        <el-select v-model="houseInfo.rentUseType"
                          placeholder="请选择用途"
                          :disabled="!houseInfo.city.length || houseDisabse"
                          @change="handleSelectUseType"
                          clearable
                          no-data-text='该楼盘无此楼盘用途'>
                          <el-option :label="item.rentUseTypeDesc"
                            :value="item.rentUseType"
                            v-for="(item, index) in rentUseTypeList"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="楼栋："
                        prop="buildingName">
                        <el-select v-model="houseInfo.buildingName"
                          placeholder="请选择楼栋"
                          :disabled="!houseInfo.rentUseType || houseDisabse"
                          @change="handleSelectBuildingName"
                          clearable
                          no-data-text='该楼盘无此楼栋信息'>
                          <el-option :label="item.buildingName"
                            :value="item.buildingId"
                            v-for="(item, index) in buildingNameList"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="房号："
                        prop="number">
                        <div @click="openNumberList"
                          class="house-number">
                          <el-input placeholder="请选择房间号"
                            readonly
                            v-model="houseInfo.number"
                            :disabled="!houseInfo.buildingName || houseDisabse"></el-input>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="楼层："
                        prop="floor">
                        <!-- <el-row>
                          <el-col :span="10"> -->
                        <el-form-item prop="floor">
                          <el-input placeholder="请输入楼层"
                            readonly
                            disable
                            v-model.number="houseInfo.floor"
                            :maxlength='3'>
                            <template slot="append">层</template>
                          </el-input>
                        </el-form-item>
                        <!-- </el-col> -->
                        <!-- <el-col :span="4" class="font-c">
                            <span>共</span>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item prop="totalFloor">
                              <el-input placeholder="楼层" v-model.number="houseInfo.totalFloor" :maxlength='2' >
                                <template slot="append">层</template>
                              </el-input>
                            </el-form-item>
                          </el-col> -->
                        <!-- </el-row> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="户型："
                        prop="bedRoom">
                        <div class="house-type">
                          <el-row :gutter="0">
                            <el-col :span="5">
                              <div class="huxing-i-box">
                                <input type="text"
                                  :disabled="putaway"
                                  @blur="handleChangeRoomCount"
                                  autocomplete="off"
                                  v-model.number="houseInfo.bedRoom"
                                  class="huxing-input"
                                  maxlength="2">
                                <div class="huxing-append">房</div>
                              </div>
                            </el-col>
                            <el-col :span="5">
                              <div class="huxing-i-box">
                                <input type="text"
                                  :disabled="putaway"
                                  autocomplete="off"
                                  @blur="handleCreateMyChamberList('客厅', houseInfo.livingRoom)"
                                  v-model.number="houseInfo.livingRoom"
                                  class="huxing-input"
                                  maxlength="2">
                                <div class="huxing-append">厅</div>
                              </div>
                            </el-col>
                            <el-col :span="5">
                              <div class="huxing-i-box">
                                <input type="text"
                                  :disabled="putaway"
                                  autocomplete="off"
                                  @blur="handleCreateMyChamberList('卫生间', houseInfo.toilet)"
                                  v-model.number="houseInfo.toilet"
                                  class="huxing-input"
                                  maxlength="2">
                                <div class="huxing-append">卫</div>
                              </div>
                            </el-col>
                            <el-col :span="5">
                              <div class="huxing-i-box">
                                <input type="text"
                                  :disabled="putaway"
                                  autocomplete="off"
                                  @blur="handleCreateMyChamberList('厨房', houseInfo.kitchen)"
                                  v-model.number="houseInfo.kitchen"
                                  class="huxing-input"
                                  maxlength="2">
                                <div class="huxing-append">厨</div>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="huxing-i-box">
                                <input type="text"
                                  :disabled="putaway"
                                  autocomplete="off"
                                  @blur="handleCreateMyChamberList('阳台', houseInfo.balcony)"
                                  v-model.number="houseInfo.balcony"
                                  class="huxing-input"
                                  maxlength="1">
                                <div class="huxing-append last-append">阳</div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div>
                        <el-form-item label="面积："
                          prop="area">
                          <div>
                            <el-input placeholder="请输入面积"
                              v-model.number="houseInfo.area"
                              :maxlength="6"
                              @blur="countPrice">
                              <template slot="append">平米</template>
                            </el-input>
                          </div>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="朝向："
                        prop="direction">
                        <el-select v-model="houseInfo.direction"
                          placeholder="请选择">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.Direction"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="装修："
                        prop="decoration">
                        <el-select v-model="houseInfo.decoration"
                          placeholder="请选择装修状况">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.decoration"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- dataResource ENTRUST_INSERT(委托房源),INTRODUCE_INSERT(转介房源)") -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="来源："
                        prop="source">
                        <el-select v-model="houseInfo.source"
                          :disabled="houseInfo.dataResource === 'INTRODUCE_INSERT'"
                          placeholder="请选择来源">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.source"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="管家："
                        prop="bdName">
                        <div @click="manageDialog = true">
                          <el-input placeholder="请选择管家"
                            readonly
                            v-model="houseInfo.bdName"></el-input>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 联系信息 -->
              <div class="owner-info">
                <header class="header-info">
                  <span>联系信息</span>
                  <el-button type="text"
                    size="mini"
                    class="owner-add"
                    @click="addUser">
                    <i class="icon iconfont icon-tianjia font-14"></i>
                    添加
                  </el-button>
                </header>
                <div class="info-box">
                  <el-row :gutter="20"
                    v-for="(item, index) in houseInfo.ownerList"
                    :key="index">
                    <el-col :span="7">
                      <el-form-item label="姓名："
                        :prop=" 'ownerList.'+index +'.ownerName'"
                        :rules="[
                            { required: true, message: '请输入姓名', trigger: 'change' },
                            { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'blur'}
                          ]">
                        <el-input v-model="item.ownerName"
                          :maxlength="13"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="手机："
                        :prop="'ownerList.'+index +'.ownerPhone'"
                        :rules="[
                            { required: true, message: '请输入手机号', trigger: 'change' },
                            { pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8|9])\d{8,10}$/ ,message: '请输入正确的电话号码'}
                          ]">
                        <el-input v-model="item.ownerPhone"
                          :maxlength='11'
                          :disabled="item.id.trim().length > 0"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="关系："
                        :prop="'ownerList.'+index +'.personRoomRelation'"
                        :rules="[
                            { required: true, message: '请选择关系', trigger: 'change' },
                          ]">
                        <el-select v-model="item.personRoomRelation"
                          placeholder="请选择关系"
                          clearable
                          :disabled="item.id.trim().length > 0 && houseInfo.state !== 'EDITING'">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.personRoomRelation"
                            :key="index"></el-option>
                        </el-select>
                        <!-- <el-input v-model="item.personRoomRelation"
                          :maxlength='11'
                          :disabled="!item.id"></el-input> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <div class="owner-del font-r"
                        :disabled="item.id !== ''"
                        v-if="houseInfo.ownerList.length > 1">
                        <el-button plain
                          size="mini"
                          @click="delUser(index)">删除</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 租金信息 -->
              <div class="lease-info"
                v-if="houseInfo.leaseholdModel">
                <header class="header-info">租金信息</header>
                <div class="info-box">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="租金："
                        prop="leaseholdModel.rentMoney">
                        <el-input placeholder="请输入租金"
                          v-model="houseInfo.leaseholdModel.rentMoney"
                          :minlength="3"
                          :maxlength="5"
                          @change="countPrice">
                          <template slot="append">元/月</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="单价："
                        prop="leaseholdModel.leaseRoomPrice">
                        <el-input v-model="houseInfo.leaseholdModel.leaseRoomPrice">
                          <template slot="append">元/平方/月</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="押金："
                        prop="leaseholdModel.depositMoney">
                        <el-input placeholder="请输入押金"
                          v-model="houseInfo.leaseholdModel.depositMoney"
                          :maxlength="5">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="保证金：" prop="leaseholdModel.earnestMoney">
                        <el-input placeholder="请输入保证金" v-model="houseInfo.leaseholdModel.earnestMoney" :maxlength="6">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="免租期："
                        prop="leaseholdModel.rentFreeDays">
                        <el-input placeholder="请输入免租期"
                          :maxlength="4"
                          v-model="houseInfo.leaseholdModel.rentFreeDays">
                          <template slot="append">天/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="装修期："
                        prop="leaseholdModel.decorateDays">
                        <el-input placeholder="请输入装修期"
                          :maxlength="4"
                          v-model.number="houseInfo.leaseholdModel.decorateDays">
                          <template slot="append">天</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="付款方式："
                        prop="leaseholdModel.payType">
                        <el-select placeholder="请选择付款方式"
                          v-model="houseInfo.leaseholdModel.payType">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.PayType"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="租期："
                        prop="leaseholdModel.leaseDays">
                        <el-input placeholder="请输入租期"
                          v-model="houseInfo.leaseholdModel.leaseDays"
                          :maxlength="2">
                          <template slot="append">年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="18">
                      <div class="pay-rate-box flex-start-grow">
                        <div class="pdh-ten">
                          <el-button type="text"
                            :disabled="+houseInfo.leaseholdModel.leaseDays <= 1 || +houseInfo.leaseholdModel.leaseDays > 15"
                            @click="rentIncreaseDialog = true"
                            size="mini">设置租金递增</el-button>
                        </div>
                        <div class="show-pay-rate flex-1 font-12 c-6">
                          <div v-if="Object.entries(houseInfo.leaseholdModel.leasePriceRateDesc).length > 0"
                            class="pdh-ten text-ellips">
                            <span v-for="(item,index) in Object.values(houseInfo.leaseholdModel.leasePriceRateDesc)[0].split(',')"
                              :key="index">
                              <span v-if="index !==0">，
                              </span>第{{index + 2}}年{{item || 0}}{{Object.keys(houseInfo.leaseholdModel.leasePriceRateDesc)[0] === 'RADIO_INCREASE' ? '%' : '元'}}
                            </span>
                          </div>
                          <div v-else
                            class="pdh-ten">暂无递增计划</div>
                        </div>
                      </div>
                      <!-- <el-form-item label="租金递增："
                        prop="leaseholdModel.payRate"
                        :rules="[
                      { pattern: /^(([1-9]|[12][0-9]|30)|(([1-9]|[12][0-9])\.[0-9]{1,2}))$/, message: '必须为小于30' },
                      ]">
                        <el-input placeholder="请输入租金递增"
                          v-model.number="houseInfo.leaseholdModel.payRate"
                          :maxlength="5"
                          >
                          <template slot="append">%/年</template>
                        </el-input>
                      </el-form-item> -->
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 装修信息 -->
              <div v-if="houseInfo.pattern === 'LONG'"
                class="model-border">
                <header class="model-header">装修信息</header>
                <div class="pd-20">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="装修风格："
                        prop="leaseholdModel.decorationStyle">
                        <el-select v-model="houseInfo.leaseholdModel.decorationStyle"
                          placeholder="请选择装修风格">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.decorationStyle"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="增加隔间："
                        prop="leaseholdModel.compartState">
                        <el-select v-model="houseInfo.leaseholdModel.compartState"
                          @change="handleSelectCompartState"
                          placeholder="请选择隔间状况"
                          :disabled="houseInfo.leaseholdModel.decorationStyle === 'NONE_DECORATION' || putaway">
                          <el-option :label="item.value"
                            :value="item.key"
                            v-for="(item, index) in baseData.compartState"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="预计成本："
                        prop="leaseholdModel.expectDecorationCost"
                        :rules="[
                      { validator: predictRules, trigger: 'change' },
                      ]">
                        <el-input placeholder="请输入预计成本"
                          :maxlength="7"
                          v-model.number="houseInfo.leaseholdModel.expectDecorationCost"
                          :disabled="houseInfo.leaseholdModel.decorationStyle === 'NONE_DECORATION'">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 出房信息 -->
              <div v-if="houseInfo.pattern === 'LONG'"
                class="note-info">
                <header class="header-info">出房信息</header>
                <div class="pd-20">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="出房方式："
                        prop="chambersType">
                        <el-select v-model="houseInfo.chambersType"
                          @change="handleAmount"
                          :disabled="putaway"
                          placeholder="请选择出房方式">
                          <el-option :label="'合租'"
                            :value="'SHARED_RENT'">
                          </el-option>
                          <el-option :label="'整租'"
                            :value="'ENTIRE_RENT'">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="估计出房价："
                        prop="expectHousePrice">
                        <el-input placeholder="请输入估计出房价"
                          :maxlength="6"
                          :minlength="3"
                          v-model.number="houseInfo.expectHousePrice"
                          :disabled="houseInfo.chambersType === 'SHARED_RENT'">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-if="(houseInfo.chamberList.length) || (houseInfo.myChamberList.length)"
                    class="bd-ddd">
                    <div class="my-row flex-start-grow"
                      v-for="(chamberItem,index) in houseInfo.chamberList"
                      :key="index"
                      v-if="chamberItem.canPublish">
                      <div class="font-w house-list-head bgc-fa">
                        {{chamberItem.name}}
                      </div>
                      <div class="flex-1">
                        <el-row class="pdt-15">
                          <el-col v-if="houseInfo.chambersType === 'SHARED_RENT'"
                            :span="7">
                            <el-form-item label="预计出房价："
                              :prop="'chamberList.'+index+'.expectRoomPrice'"
                              :rules="[
                              { validator: handleCheck, trigger: 'change' },
                              { pattern: /^[0-9]{3,6}$/, message: '长度在 3 到 6 位' }]">
                              <el-input placeholder="请输入"
                                @blur="handleAmount"
                                :maxlength="7"
                                v-model.number="chamberItem.expectRoomPrice">
                                <template slot="append">元/月</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <el-form-item label="面积："
                              label-width="50px"
                              :prop="'chamberList.'+index+'.area'"
                              :rules="[{ pattern: /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/, message: '输入范围0-100' }]">
                              <el-input placeholder="请输入"
                                :maxlength="4"
                                v-model.number="chamberItem.area">
                                <template slot="append">平方</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item label="朝向："
                              label-width="50px"
                              :prop="'chamberList.'+index+'.direction'">
                              <el-select v-model="chamberItem.direction"
                                placeholder="请选择">
                                <el-option :label="item.value"
                                  :value="item.key"
                                  v-for="(item, index) in baseData.Direction"
                                  :key="index"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label-width="10px"
                              :prop="'chamberList.'+index+'.attachedChamber'">
                              <el-checkbox-group v-model="chamberItem.attachedChamber"
                                size="mini">
                                <el-checkbox label="BALCONY"
                                  key="BALCONY">阳台</el-checkbox>
                                <el-checkbox label="TOILET"
                                  key="TOILET">卫生间</el-checkbox>
                                <el-checkbox disabled
                                  v-if="chamberItem.attachedChamber && chamberItem.attachedChamber.includes('COMPARTMENT')"
                                  label="COMPARTMENT"
                                  key="COMPARTMENT">隔间</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <!-- 卧室以外 -->
                    <div class="my-row flex-start-grow"
                      v-for="(chamberItem,index) in houseInfo.myChamberList"
                      :key="index">
                      <div class="font-w house-list-head bgc-fa">
                        {{chamberItem.name}}
                      </div>
                      <div class="flex-1">
                        <el-row class="pdt-15">
                          <el-col :span="5">
                            <el-form-item label="面积："
                              label-width="60px"
                              :prop="'myChamberList.'+index+'.area'"
                              :rules="[{ pattern: /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/, message: '输入范围0-100' }]">
                              <el-input placeholder="请输入"
                                :maxlength="4"
                                v-model.number="chamberItem.area">
                                <template slot="append">平方</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <el-form-item label="朝向："
                              label-width="60px"
                              :prop="'myChamberList.'+index+'.direction'">
                              <el-select v-model="chamberItem.direction"
                                placeholder="请选择">
                                <el-option :label="item.value"
                                  :value="item.key"
                                  v-for="(item, index) in baseData.Direction"
                                  :key="index"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 备注说明 -->
              <div class="note-info">
                <header class="header-info">备注说明</header>
                <div class="room-desc">
                  <!-- <el-form-item prop="roomDescription"> -->
                  <el-input type="textarea"
                    :maxlength="300"
                    :autosize="{ minRows: 2}"
                    placeholder="请输入你要备注的内容"
                    v-model="houseInfo.roomDescription">
                  </el-input>
                  <!-- </el-form-item> -->
                </div>
              </div>
            </el-form>

            <!-- 房源图片 -->
            <div class="house-img">
              <header class="header-info">房源图片
                <span class="font-default">(限10张)</span>
                <span v-if="housePic"
                  class="font-red">至少上传一张图片</span>
              </header>
              <div :class="{'borderRed': housePic ,'clearfix': true, 'pdb-20': true}">
                <my-image-upload ref="imageUpload"
                  v-model="picList.files"
                  :postAction="'/mshz-mgr/security/room/manage/uploadPicture'"
                  :pictureTypeList="baseData.Picture"
                  :maximum="10">
                </my-image-upload>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <slot v-if="source !== 'entrust'">
        <el-button type="primary"
          size="mini"
          :loading="auditting"
          v-if="DialogType !== 'Revise'"
          @click="handleAudit">{{auditting? '执行中...' : '提交收房'}}
        </el-button>

        <el-button type="danger"
          v-if="houseInfo.state === 'EDITING' || DialogType === 'Revise' || DialogType === 'add'"
          size="mini"
          :loading="submitting"
          @click="handleSubmit">{{submitting? '执行中...' : '保存'}}
        </el-button>
      </slot>
      <slot v-else>
        <el-button type="primary"
          size="mini"
          :loading="submitting"
          @click="handleSubmit">{{submitting? '执行中...' : '确定'}}
        </el-button>
      </slot>

      <el-button size="mini"
        @click="closeDialog">取 消
      </el-button>
    </div>

    <el-dialog title="添加房间号"
      :visible.sync='houseNumberDialog'
      v-if="houseNumberDialog"
      :close-on-click-modal="false"
      append-to-body
      width="950px">
      <div class="dialog-box">
        <section class="bgceee">
          <div class="square-box">
            <div>
              <span class="inb square bgc-f bd-ddd"></span>
              <span class="font-12">未添加</span>
            </div>
            <div>
              <span class="inb square bgc-blue bd-ddd"></span>
              <span class="font-12">资料盘</span>
            </div>
            <div>
              <span class="inb square bgc-simple-greens bd-ddd"></span>
              <span class="font-12">已添加</span>
            </div>
            <div>
              <span class="inb square bgc-ddd bd-ddd"></span>
              <span class="font-12">已收房</span>
            </div>
          </div>
          <div class="out">
            <span class="line"></span>
            <em class="tr font-14">序号</em>
            <em class="lb font-14">楼层</em>
          </div>
          <el-table :data="houseNumberList"
            header-align="center"
            ref="multipleTable"
            size="small"
            height="366"
            style="width:100%;"
            border
            cell-class-name="default-color"
            class="talbe-box">
            <el-table-column prop="floor"
              label="楼层"
              align="center"
              fixed
              width="126"
              class-name="bgc-fa"></el-table-column>
            <el-table-column v-for="(item,index) in houseNumberList[maxlengthIndex].roomList"
              :key="index"
              :label="index+1+''"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.roomList.length > 0 && scope.row.roomList[index]">
                  <div v-if="scope.row.roomList[index].roomNumberState"
                    :class="{'number-contaner': true,
                    'bgc-simple-greens': scope.row.roomList[index].roomNumberState === 'ADDED' || scope.row.roomList[index].number === houseInfo.number,
                    'bgc-ddd': scope.row.roomList[index].roomNumberState === 'HAVE_SIGNED',
                    'bgc-blue': scope.row.roomList[index].roomNumberState === 'TRANSFERRED' && scope.row.roomList[index].number !== houseInfo.number}"
                    @click="selectNumber($event,scope.row.roomList[index])">
                    {{scope.row.roomList[index].number}}
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <div class="dialog-footer">
          <el-button type="primary"
            size="mini"
            @click="handleSelectNumber">确定</el-button>
          <el-button size="mini"
            @click="houseNumberDialog = false,numberData = null;">取 消</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync='manageDialog'
      top="20vh"
      title="选择管家"
      :close-on-click-modal="false"
      width="950px"
      append-to-body>
      <organization v-if="manageDialog"
        :type="'addhouse'"
        :managerName="houseInfo.bdName"
        v-on:selectManager="handleSelectManager">
      </organization>
    </el-dialog>

    <el-dialog title="设置租金递增"
      top="20vh"
      append-to-body
      :close-on-clcik-modal="false"
      :visible.sync="rentIncreaseDialog">
      <rent-increasing v-if="rentIncreaseDialog"
        :leaseDays="+houseInfo.leaseholdModel.leaseDays"
        :myIncreaseType="Object.keys(houseInfo.leaseholdModel.leasePriceRateDesc)[0]"
        :increaseData="Object.values(houseInfo.leaseholdModel.leasePriceRateDesc)[0]"
        :rentIncreaseDialog.sync="rentIncreaseDialog"
        @updateLeasePriceRate="updateLeasePriceRate">
      </rent-increasing>
    </el-dialog>

    <reckon-dialog ref="reckon"
      :houseInfo="houseInfo"
      :compartmentCount="compartmentCount"
      @handleAuditHouse="handleSubmitForm('/security/room/manage/addToAudit', 'audit')"
      @handleCancelRequest="cancelRequest">
    </reckon-dialog>

  </section>
</template>
<script>
import { mapState } from 'vuex';
import FileUpload from 'vue-upload-component';
import Organization from '../HouseRelease/Organization';
import RentIncreasing from './RentIncreasing';
import MyImageUpload from '@/components/MyImageUpload';
import reckonDialog from './ReckonDialog';
export default {
  name: 'AddHouse',
  data() {
    // 租期
    const leaseDaysRules = (rule, value, callback) => {
      // console.log(value, this.saveHouse);
      if (!this.saveHouse) {
        return callback();
      } else if (!value && this.saveHouse) {
        callback(new Error('请输入租期'));
      } else if (!(/^[1-9]\d*$/).test(value)) {
        callback(new Error('请输入正整数且不能小于1'));
      }
      // if (+value > 0) {
      //   if ((this.houseInfo.decoration === 'HARDCOVER' || this.houseInfo.decoration === 'LUXURY') && value < 2) {
      //     callback(new Error('精装租期至少两年'));
      //   } else if (this.houseInfo.decoration === 'SIMPLE' && value < 5) {
      //     callback(new Error('普装租期至少五年'));
      //   } else if (this.houseInfo.decoration === 'BLANK' && value < 8) {
      //     callback(new Error('毛坯租期至少八年'));
      //   }
      // } else
      callback();
    };
    // 租金
    const rentMoneyRules = (rule, value, callback) => {
      // console.log(value.length);
      if (+value > 0) {
        if (!(/^[0-9]\d*$/).test(value)) {
          callback(new Error('请输入正整数'));
        } else if (!(/^[0-9]{3,5}$/).test(value)) {
          callback(new Error('数字长度在 3 到 5 位'));
        }
      } else if (this.saveHouse) {
        callback(new Error('请输入租金'));
      }
      callback();
    };
    // 单价
    const leaseRoomPriceRules = (rule, value, callback) => {
      // value = value.trim();
      if (+value > 0) {
        if (!(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('最多支持两位小数'));
        } else if (!(/^\d{1,3}(\.\d+)?$/).test(value)) {
          callback(new Error('数字长度在 1 到 3 位'));
        }
      } else if (this.saveHouse) {
        callback(new Error('请输入单价'));
      }
      callback();
    };
    // 付款方式
    const payTypeRules = (rule, value, callback) => {
      // value = value.trim();
      if (value && value.trim().length > 0) {
        callback();
      } else if (this.saveHouse) {
        callback(new Error('请选择一种付款方式'));
      }
      callback();
    };

    // 除装修风格为不装修外，必填，限输入1-6位正整数字
    const predictRules = (rule, value, callback) => {
      if (+value > 0) {
        if (this.houseInfo.leaseholdModel.decorationStyle !== 'NONE_DECORATION') {
          if (!(/^[0-9]{1,6}$/).test(value)) {
            callback(new Error('请输入1-6位正整数字'));
          }
        } else {
          callback();
        }
      }
      callback();
    };

    const handleCheck = (rule, value, callback) => {
      if (!value) {
        if (this.saveHouse) {
          callback(new Error('该项不能为空'));
        } else {
          callback();
        }
      }
      callback();
    };

    // 租期
    // const checkEnsureMoney = (rule, value, callback) => {
    //   if (!this.saveHouse) {
    //     return callback();
    //   } else if (!value && this.saveHouse) {
    //     callback(new Error('请输入保证金'));
    //   } else if (!(/^[0-9]{1,6}$/).test(value)) {
    //     callback(new Error('不得超过6位数字'));
    //   }
    //   callback();
    // };

    return {
      handleCheck, // 是否必填
      requestSource: null, // 取消请求
      submitting: false, // 正在提交保存
      auditting: false, // 正在提交保存
      saveHouse: false, // 是否操作保存
      needPic: false, // 是否需要验证图片
      putaway: false, // 改房源是否上架

      leaseDaysRules,
      rentMoneyRules,
      leaseRoomPriceRules,
      predictRules,

      houseStatus: false, // 租约信息禁改
      houseDisabse: false, // 房源信息禁改
      housePic: false, // 图片错误提示
      gardenLoading: false,
      gardenList: [],
      gardenNameList: [], // 楼盘联想列表
      baseData: {},
      houseInfo: {
        pattern: 'LONG',
        bedRoom: '', // 房间数
        livingRoom: '', // 客厅数
        toilet: '', // 厕所数
        kitchen: '', // 厨房数
        balcony: '', // 阳台数
        roomType: 'DISTRIBUTED_MODEL', // 类型
        city: '', // 区域
        gardenName: '', // 楼盘
        number: '', // 房号
        area: '', // 面积
        decoration: '', // 装修
        bdName: '', // BD
        rentUseType: '', // 用途
        buildingName: '', // 楼栋
        totalFloor: '', // 总楼层
        floor: '', // 所在的楼层
        gardenId: '1',
        houseType: '', // 户型
        direction: null, // 朝向
        state: 'EDITING',
        // roomState: '', // 房源审核状态
        roomDescription: '', // 备注说明
        expectHousePrice: '', // 预计出房价
        expectLiveRate: '', // 预计住房率
        leaseholdModel: {
          leasePriceRateDesc: { 'RADIO_INCREASE': '' },
          leasePriceRate: {},
          compartState: 'NONE_COMPARTMENT',
          decorationStyle: 'SIMPLE_DECORATION',
          // earnestMoney: '', // 保证金
          rentMoney: '', // 租金
          depositMoney: '', // 押金
          payType: null, // 付款方式
          payRate: '', // 付款增率
          rentFreeDays: '', // 免租期
          decorateDays: '', // 装修期
          leaseDays: 0, // 租期
          // leaseCreateTime: '2017-10-23', // 租约创造时间
          // leaseFinalTime: '2020-10-23', // 租约结束时间
          leaseRoomPrice: '' // 租约房源价格
        },
        ownerList: [
          {
            ownerName: '',
            ownerPhone: '',
            id: '',
            personRoomRelation: 'PROPERTY_OWNER'
          }
        ],
        chamberList: [],
        myChamberList: [],
        chambersType: 'SHARED_RENT',
        pictureList: []
      },
      houseRules: {
        roomType: [{ required: true, message: '请选择公寓类型', trigger: 'change' }],
        chambersType: [{ validator: handleCheck, trigger: 'change' }],
        pattern: [{ required: true, message: '请选择模式类型', trigger: 'change' }],
        // direction: [{ required: true, message: '请选择朝向', trigger: 'change' }],
        bedRoom: [{ required: true, message: '至少要输入房间数', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        gardenName: [{ required: true, message: '请输入楼盘名称', trigger: 'change' }],
        number: [{ required: true, message: '请选择房间号', trigger: 'change' }],
        area: [
          { required: true, message: '请输入面积', trigger: 'change' },
          { pattern: /^\d{1,3}(\.\d+)?$/, message: '长度在 1 到 3 位数整数' },
          { pattern: /^\d+(\.\d{0,2})?$/, message: '支持两位小数' }
        ],
        // { pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '长度在 1 到 3 位数整数' }
        decoration: [{ required: true, message: '请选择装修状况', trigger: 'change' }],
        bdName: [{ required: true, message: '请填写BD', trigger: 'change' }],
        rentUseType: [{ required: true, message: '请至少选择一种用途', trigger: 'change' }],
        buildingName: [{ required: true, message: '请输入楼栋', trigger: 'change' }],
        floor: [
          { required: true, message: '请输入楼层', trigger: 'change' },
          { pattern: /^-?[0-9]\d*$/, message: '请输入整数' },
          { pattern: /^-?[0-9]{1,2}$/, message: '最多为2位数' }
        ],
        expectHousePrice: [
          { validator: handleCheck, trigger: 'change' },
          { pattern: /^[0-9]\d*$/, message: '长度在 3 到 6 位' }
        ],
        houseType: [{ required: true, message: '至少要输入房间数', trigger: 'change' }],
        source: [{ required: true, message: '请至少选择一个来源', trigger: 'change' }],
        'leaseholdModel.compartState': [{ required: true, message: '请选择', trigger: 'change' }],
        'leaseholdModel.depositMoney': [
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
          { pattern: /^[0-9]{3,5}$/, message: '输入长度在 3 到 5 位' }
        ],
        // 'leaseholdModel.earnestMoney': [
        //   { validator: checkEnsureMoney, trigger: 'change' }
        // ],
        'leaseholdModel.leaseDays': [
          { validator: leaseDaysRules, trigger: 'change' }
        ],
        'leaseholdModel.rentMoney': [
          { validator: rentMoneyRules, trigger: 'change' }
        ],
        'leaseholdModel.leaseRoomPrice': [
          { validator: leaseRoomPriceRules, trigger: 'change' }
        ],
        'leaseholdModel.payType': [
          { validator: payTypeRules, trigger: 'change' }
        ],
        'leaseholdModel.rentFreeDays': [
          { pattern: /^[0-9]{1,3}$/, message: '输入长度在 1 到 3 位' },
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' }
        ],
        'leaseholdModel.decorateDays': [{ pattern: /^[0-9]\d*$/, message: '请输入正整数' }]
      },
      // // 图片上传的默认参数
      picList: {
        files: []
      },

      rentUseTypeList: [],
      buildingNameList: [],
      houseNumberDialog: false,
      houseNumberList: [],
      maxlengthIndex: 0,
      targetElement: null,
      numberData: null,
      manageDialog: false, // 选择管家
      rentIncreaseDialog: false, // 设置租金递增
      compartmentCount: 0, // 隔间数
      reckonData: {}
    };
  },
  // props: ['DialogType', 'roomId'],
  props: {
    DialogType: {
      type: String,
      default: 'add'
    },
    roomId: {
      type: String
    },
    source: {
      type: String,
      default: 'houseManage'
    }
  },

  created() {
    this.requestUrl = '/security/room/manage/addRoom';
    this.requestBaseData();
    if (this.DialogType === 'Editor' || this.DialogType === 'Revise') {
      this.requestData(this.roomId);
    }
  },

  beforeMount() {
    // 没有管家信息就从缓存获取
    if (!this.houseInfo.bdName.trim().length) {
      this.houseInfo.bdName = this.userInfo.name;
      this.houseInfo.bdId = this.userInfo.id;
    }
  },

  methods: {

    // 获取下来框的数据
    requestBaseData() {
      this.$axios.get(
        '/security/room/queryReturn'
      ).then((res) => {
        // console.log(res, '--------baseData');
        if (res.data.status === 'C0000') {
          this.baseData = JSON.parse(res.data.result);
          // JSON.stringify(jsonobj)
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        // this.$message.error('异常');
        console.log(err);
      });
    },

    // 编辑房源的数据
    requestData(requestId) {
      this.$axios.get(
        '/security/room/manage/queryRoomDetail',
        {
          params: {
            id: (requestId || this.roomId)
          }
        }
      ).then((res) => {
        // console.log(res, '---------------房源详情');
        if (res.data.status === 'C0000') {
          let { result } = res.data;

          // 如果租金递增（leasePriceRateDesc）为 null ，默认为空对象
          if (!result.leaseholdModel.leasePriceRateDesc) {
            result.leaseholdModel.leasePriceRateDesc = {};
            result.leaseholdModel.leasePriceRate = {};
          }

          // 如果是资料盘，管家去当前登录人
          if (result.commitState === 'INFORMATION_ROOM') {
            result.bdName = this.userInfo.name;
            result.bdId = this.userInfo.id;
          }

          // 长租模式 才会有出房信息
          if (result.pattern === 'LONG') {
            let changechamberList = result.chamberList || [];
            let myChangeChamberList = [];
            if (changechamberList.length > 0) {
              // 区分 卧室 和 厨阳卫厅
              for (let i = changechamberList.length - 1; i >= 0; i--) {
                changechamberList[i].attachedChamber = changechamberList[i].attachedChamberEnum;
                // changechamberList[i].attachedChamber = changechamberList[i].attachedChamber.trim().length ? changechamberList[i].attachedChamber.split(',') : [];
                // canPublish 为 false 则 为厨阳卫厅
                if (!changechamberList[i].canPublish) {
                  myChangeChamberList.unshift(...changechamberList.splice(i, 1));
                }
              }
            }
            result.myChamberList = myChangeChamberList;
            // 初始化 隔间数
            this.handleCompartmentCount(result.leaseholdModel.compartState);
          } else {
            result.chamberList = [];
            result.myChamberList = [];
          }

          result.renewDescription = '';
          this.$set(this, 'houseInfo', result);
          if (!this.houseInfo.leaseholdModel.leaseRoomPrice) {
            this.countPrice();
          }

          // 数据初始化完成后，如果 户型有数据但 chamberList 为空，则前端默认生成数据
          if ((this.houseInfo.pattern === 'LONG') && !(this.houseInfo.chamberList.length)) {
            this.handleHouseType();
          }

          // 初始化 图片数据
          if (this.houseInfo.pictureList.length) {
            let picList = this.houseInfo.pictureList.map((item, index) => {
              return {
                // item.thumb = item.pictureUrl.replace('{size}', '300x300')
                thumb: item.pictureUrl.replace('{size}', '160x120'),
                pictureUrl: item.pictureUrl,
                pictureType: item.pictureType,
                pictureTypeDesc: item.pictureTypeDesc,
                id: item.id,
                type: 'image/jpeg',
                typeInfo: 'networkcomin'
              };
            });

            this.picList.files = picList;
            this.houseInfo.pictureList = [];
          }

          this.getState();
          // 请求成功后先默认赋值给 “rentUseTypeList”，等请求数据后来后再替换换。免得请求慢后“闪变”
          this.rentUseTypeList = [{ rentUseType: 'APARTMENT', rentUseTypeDesc: '住宅' }, { rentUseType: 'LIVINGBUILDING', rentUseTypeDesc: '商住' },
          { rentUseType: 'VILLA', rentUseTypeDesc: '别墅' }, { rentUseType: 'FARMERS', rentUseTypeDesc: '农民房' }];
          if (this.houseNumberDialog) {
            this.houseNumberDialog = false;
          }
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 获取用途数据
    requestrentUseTypeList() {
      return this.$axios.post(
        '/security/room/returnGardenUseType',
        {
          city: this.houseInfo.city,
          gardenName: this.houseInfo.gardenName,
          gardenId: this.houseInfo.gardenId
        }).then((res) => {
          if (res.data.status === 'C0000') {
            this.rentUseTypeList = res.data.result;
          } else {
            this.rentUseTypeList = [];
            this.$message.error(res.data.message);
          }
        }).catch((error) => {
          console.log(error, '获取楼盘用途错误');
          this.$message.error('服务出错');
        });
    },

    // 获取楼栋信息
    requestbuildingNameList() {
      return this.$axios.post(
        '/security/room/returnBuildingInfo',
        {
          city: this.houseInfo.city,
          gardenId: this.houseInfo.gardenId,
          rentUseType: this.houseInfo.rentUseType
        }).then((res) => {
          if (res.data.status === 'C0000') {
            this.buildingNameList = res.data.result;
          } else {
            this.buildingNameList = [];
            this.$message.error(res.data.message);
          }
        }).catch((error) => {
          console.log(error, '获取楼栋错误');
          this.$message.error('服务出错');
        });
    },

    // 获取房间信息
    requestNumberList() {
      return this.$axios.post(
        '/security/room/returnRoomNumInfo',
        {
          city: this.houseInfo.city,
          gardenId: this.houseInfo.gardenId,
          buildingId: this.houseInfo.buildingId,
          buildingName: this.houseInfo.buildingName
        }).then((res) => {
          if (res.data.status === 'C0000' && res.data.result.length > 0) {
            this.houseNumberList = res.data.result;

            let maxlength = this.houseNumberList[0].roomList.length;
            const listLength = this.houseNumberList.length;
            for (let i = 1; i < listLength; i++) {
              if (this.houseNumberList[i].roomList.length > maxlength) {
                maxlength = this.houseNumberList[i].roomList.length;
                this.maxlengthIndex = i;
              }
            }
          } else {
            this.houseNumberList = [];
            this.$message.error(res.data.message);
          }
        }).catch((error) => {
          console.log(error, '获取房号错误');
          this.$message.error('服务出错');
        });
    },

    // 房源的状态
    getState() {
      let houseCondition = this.houseInfo.state;
      // (EDITING待发布/ENABLED已发布/DISABLED已下架)
      this.putaway = this.houseInfo.situationStatus === 'ENABLED';
      if (houseCondition) {
        // 是否禁用 编辑房源基本信息
        if (this.DialogType === 'add') {
          this.houseDisabse = false;
        } else {
          this.houseDisabse = true;
        }
        // 修改房源能修改部分（房源待添加合同，合同带审核，已签约）
        this.houseStatus = houseCondition !== 'EDITING';
        // 图片是必要验证（房源待审核，带添加合同，合同待审核，已签约）
        this.needPic = houseCondition !== 'EDITING';
        if (this.houseStatus) {
          this.saveHouse = true;
          // 租约信息是否必要
          this.houseInfo.leaseholdModel.need = true;
        } else {
          this.saveHouse = false;
          this.houseInfo.leaseholdModel.need = false;
        }
      } else {
        this.houseInfo.leaseholdModel.need = false;
        this.saveHouse = false;
      }
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

    // 修改图片列表的数据结构符合发请求
    mapPicList() {
      if (!this.picList.files.length) {
        this.houseInfo.pictureList = [];
        return false;
      }
      this.houseInfo.pictureList = [];
      let filesList = this.picList.files;
      let filesListLength = this.picList.files.length;
      for (let i = 0; i < filesListLength; i++) {
        let pictureUrl;
        let id;
        // 上传成功，接口有返回值的图片
        if (filesList[i].success && filesList[i].response && filesList[i].response.result) {
          let resultData = JSON.parse(filesList[i].response.result);
          if (resultData.status === 'C0000') {
            pictureUrl = resultData.result.url;
          }
          // typeInfo === ‘networkcomin’则是接口请求回来的图片，有id。
        } else if (filesList[i].typeInfo) {
          pictureUrl = filesList[i].pictureUrl;
          id = filesList[i].id;
        }
        let pictureType = filesList[i].pictureType;
        if (pictureUrl) {
          this.houseInfo.pictureList.push({
            pictureUrl,
            pictureType,
            id
          });
        }
      }
    },

    // 检验表单信息
    handleCheckHouseForm() {
      return new Promise((resolve, reject) => {
        this.$refs.houseForm.validate((valid) => {
          if (valid) {
            resolve(valid);
          } else {
            this.$message.error('请完善表单信息！');
            reject(valid);
          }
        });
      });
    },

    // 提交表单
    handleSubmitForm(url, type) {
      let myHouseInfo = JSON.parse(JSON.stringify(this.houseInfo));
      // 短租模式不需要提交 出房信息 相关的字段
      if (this.houseInfo.pattern === 'SHORT') {
        delete myHouseInfo.myChamberList;
        delete myHouseInfo.chamberList;
      } else {
        myHouseInfo.chamberList.push(...myHouseInfo.myChamberList);
        delete myHouseInfo.myChamberList;
      }
      myHouseInfo.leaseholdModel.leasePriceRate = myHouseInfo.leaseholdModel.leasePriceRateDesc;
      // 预计出房价 预计住房率 暂时默认值
      myHouseInfo.expectLiveRate = 80;
      // 防止请求慢时，重复操作提交
      if (type === 'save') {
        this.submitting = true;
      } else {
        this.auditting = true;
      }
      this.requestSource = this.$axios.CancelToken.source();
      this.$axios.post(
        url,
        myHouseInfo,
        {
          cancelToken: this.requestSource.token
        }
      ).then((res) => {
        if (type === 'save') {
          this.submitting = false;
        } else {
          this.auditting = false;
          this.clouseReckon();
        }
        if (res.data.status === 'C0000') {
          this.$message.success('处理成功');
          this.closeDialog('success');
          this.$store.commit('handleRefreshHouseTable', 'COMMIT_ROOM,INTENTION_ROOM');
          this.$emit('refreshData');
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        if (type === 'save') {
          this.submitting = false;
        } else {
          this.auditting = false;
          this.clouseReckon();
        }
        this.$message.error(err.message || '处理失败');
      });
    },

    // 保存房源
    handleSubmit() {
      // 获取房源的状态，并做配置
      this.getState();
      this.mapPicList();
      // 判断是不是修改房源还是添加房源
      if (this.DialogType === 'Editor') {
        // 修改
        this.requestUrl = '/security/room/manage/updateRoom';
      } else if (this.DialogType === 'Revise') {
        // 特改
        this.requestUrl = '/security/room/manage/reviseRoom';
      } else {
        // 添加
        this.requestUrl = '/security/room/manage/addRoom';
      }
      // 修改图片列表的数据结构符合发请求
      /* 有图片则检测
        或是房源到了必要图片的状态检测
      */
      if (this.houseInfo.pictureList.length > 0 || this.needPic) {
        this.housePic = false;
        if (this.needPic && this.houseInfo.pictureList.length === 0) {
          // 为 true 提醒需要上传图片
          this.$message({
            type: 'warning',
            message: '请上传图片',
            duration: 3000
          });
          this.housePic = true;
          return false;
        }
        Promise.all([this.handleCheckHouseForm(), this.$refs.imageUpload.handleCheckType()]).then((res) => {
          this.handleSubmitForm(this.requestUrl, 'save');
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.handleCheckHouseForm().then((res) => {
          this.handleSubmitForm(this.requestUrl, 'save');
        }).catch(err => {
          console.log(err);
        });
      }
    },

    // 提交审核
    handleAudit() {
      this.saveHouse = true;
      this.mapPicList();
      if (!this.houseInfo.chamberList.length && this.houseInfo.pattern === 'LONG') {
        this.$message.warning('房间数不能为空');
        return;
      }
      Promise.all([this.handleCheckHouseForm(), this.$refs.imageUpload.handleCheckType()]).then((res) => {
        if (!this.handleCheckHouseType()) {
          return false;
        }
        let flag = this.houseInfo.ownerList.some((item, index) => {
          return item.personRoomRelation === 'PROPERTY_OWNER';
        });

        if (!flag) {
          this.$message.warning('联系人至少有一个"产权人"！！');
          return;
        }
        if (this.houseInfo.pictureList.length > 0) {
          this.housePic = false;
        } else {
          this.housePic = true;
          this.$message({
            type: 'warning',
            message: '请上传图片',
            duration: 3000
          });
          return false;
        }
        this.handleReckon();
      }).catch((err) => {
        console.log(err);
      });
    },

    handleCheckHouseType() {
      // let checkRuslt = ((this.houseInfo.kitchen || this.houseInfo.kitchen === 0) &&
      //   (this.houseInfo.livingRoom || this.houseInfo.livingRoom === 0) &&
      //   (this.houseInfo.balcony || this.houseInfo.balcony === 0) &&
      //   (this.houseInfo.toilet || this.houseInfo.toilet === 0)
      // );
      let checkRuslt = true;
      let tipMesg = '房间';
      let { kitchen, livingRoom, balcony, toilet } = this.houseInfo;
      // 厨房数, 客厅数, 阳台数, 厕所数
      let checkList = [
        { count: kitchen, type: '厨房' },
        { count: livingRoom, type: '客厅数' },
        { count: balcony, type: '阳台数' },
        { count: toilet, type: '厕所数' }
      ];

      for (let j = 0; j < checkList.length; j++) {
        if (!(checkList[j].count || checkList[j].count === 0)) {
          tipMesg = checkList[j].type;
          checkRuslt = false;
          break;
        }
      }
      if (!checkRuslt) {
        this.$message({
          message: `请完善户型字段，"${tipMesg}"不能为空`,
          type: 'warning',
          duration: 3000
        });
      }
      return checkRuslt;
    },

    // 增删业主
    addUser() {
      if (this.houseInfo.ownerList.length >= 5) {
        return;
      }
      this.houseInfo.ownerList.push({ ownerName: '', ownerPhone: '', id: '', personRoomRelation: 'PROPERTY_OWNER' });
    },

    delUser(index) {
      this.houseInfo.ownerList.splice(index, 1);
    },

    // 单价计算
    countPrice() {
      if (this.houseInfo.leaseholdModel.rentMoney && this.houseInfo.area) {
        this.houseInfo.leaseholdModel.leaseRoomPrice = (this.houseInfo.leaseholdModel.rentMoney / this.houseInfo.area).toFixed(2);
      }
    },

    // 卧室
    handleCreateChamberList(count, handle = 'addRoom') {
      let chamberListLength = this.houseInfo.chamberList.length || 0;
      let decadeCount;
      let myLength;
      let myChamberList = [];
      for (let i = 1; i < (count + 1); ++i) {
        myLength = chamberListLength;
        // 获取 十位 的值，每个位数 上都有 四
        decadeCount = parseInt(((myLength + i) % 100) / 10);
        // 已有的跳过每个 4 ；
        myLength = myLength + decadeCount;
        // 如果新添加的 有 4 跳过 直接 加 1
        if ((/^(([4-9]|[1-9][4-9]))$/).test(myLength + i)) {
          // 房间名字不要含有“4”；
          myLength = myLength + 1;
        }
        myChamberList.push({
          area: '',
          attachedChamber: handle === 'addCompartment' ? ['COMPARTMENT'] : [],
          attachedChamberDesc: '',
          direction: null,
          directionDesc: '',
          expectRoomPrice: '',
          id: '',
          leaseType: 'SHARED_RENT',
          leaseTypeDesc: '',
          name: myLength + i >= 10 ? (myLength + i) + '卧室' : '0' + (myLength + i) + '卧室',
          roomId: '',
          canPublish: true
        });
      };
      return myChamberList;
    },

    // 厨厅阳卫
    handleCreateMyChamberList(name, val) {
      // console.log(name, val);
      if (this.houseInfo.pattern === 'SHORT') {
        return;
      }
      let handle = +val > 0 ? undefined : 'del';

      let findIndex;
      // console.log(this.houseInfo, '----watch');
      let flag = this.houseInfo.myChamberList.some((item, index) => {
        findIndex = index;
        return item.name === name;
      });

      if (handle === 'del' && flag) {
        this.houseInfo.myChamberList.splice(findIndex, 1);
      } else if (handle === 'del' && !flag) {
        return;
      }

      //  如果有了 不新增
      if (flag) { return; }

      this.houseInfo.myChamberList.push({
        area: '',
        canPublish: false,
        name: name,
        direction: null
      });
    },

    // 房间数量发生改变
    handleChangeRoomCount(handle) {
      // console.log(this.houseInfo, handle);
      // handle 区别是增加隔间还是 一般的卧室
      if (this.houseInfo.pattern === 'SHORT') {
        return;
      }
      // 原数组长度
      let myLength = this.houseInfo.chamberList.length || 0;
      // 新数组长度
      let newLength = this.houseInfo.bedRoom + this.compartmentCount;
      // 差值
      let differCount = Math.abs(newLength - myLength);
      // console.log(newLength, myLength);
      // 复制数组
      let myChangeChamberList = this.houseInfo.chamberList.concat([]);
      if (newLength === myLength) {
        return false;
      } else if (newLength > myLength) {
        // 如果是新增 直接添加到数组
        myChangeChamberList.push(...this.handleCreateChamberList(differCount, handle));
        this.$set(this.houseInfo, 'chamberList', myChangeChamberList);
      } else {
        // 如果是删除，先判断是删除 隔间 还是 一般卧室
        let delCount = 1;
        let compartmentList = myChangeChamberList.filter((item, index, arr) => {
          // 是否是隔间
          let flag = item.attachedChamber && item.attachedChamber.includes('COMPARTMENT');
          // 如果操作的是隔间
          if (handle === 'addCompartment') {
          } else {
            // 如果不是隔间 flag 为 false，取反为 true
            flag = !flag;
          }
          if (flag && (delCount <= differCount)) {
            delCount++;
            return false;
          } else {
            return true;
          }
        });
        // myChangeChamberList.splice(myLength - (myLength - newLength), (myLength - newLength));
        // 删完 重命名
        compartmentList.forEach((item, index) => {
          let itemName = 1;
          if ((/^(([4-9]|[1-9][4-9]))$/).test(index + itemName)) {
            // 房间名字不要含有“4”；
            itemName = itemName + 1;
          }
          item.name = index + itemName >= 10 ? (index + itemName) + '卧室' : '0' + (index + itemName) + '卧室';
        });
        this.$set(this.houseInfo, 'chamberList', compartmentList);
      }
    },
    // 隔间数
    handleCompartmentCount(val) {
      switch (val) {
        case 'ONE_COMPARTMENT':
          this.compartmentCount = 1;
          break;
        case 'TWO_COMPARTMENT':
          this.compartmentCount = 2;
          break;
        default:
          this.compartmentCount = 0;
      }
    },
    // 隔间状态
    handleSelectCompartState(val) {
      this.handleCompartmentCount(val);
      this.handleChangeRoomCount('addCompartment');
    },

    // 生成 户型 数据
    handleHouseType() {
      this.handleChangeRoomCount();
      this.handleCreateMyChamberList('厨房', this.houseInfo.kitchen);
      this.handleCreateMyChamberList('客厅', this.houseInfo.livingRoom);
      this.handleCreateMyChamberList('卫生间', this.houseInfo.toilet);
      this.handleCreateMyChamberList('阳台', this.houseInfo.balcony);
    },

    // 切换长短租
    handleChangePattern(val) {
      if (val === 'LONG') {
        this.handleHouseType();
      } else {
        // 清空隔间数
        this.houseInfo.leaseholdModel.compartState = 'NONE_COMPARTMENT';
      }
    },

    // handleDelCompartment() {

    // },

    createFilter(queryString) {
      return (list) => {
        return (list.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    // 楼盘
    remoteMethod(query) {
      this.gardenLoading = true;
      if (query) {
        this.$axios.post(
          '/security/room/returnGardenInfo',
          {
            city: this.houseInfo.city,
            searchName: query,
            importDutyGarden: true
          }
        ).then((res) => {
          this.gardenLoading = false;
          if (res.data.status === 'C0000') {
            this.gardenList = res.data.result.map((item) => {
              return {
                value: item.id,
                label: item.gardenName,
                gardenId: item.id,
                geographyArea: item.geographyArea
              };
            });

            this.gardenNameList = this.gardenList;
            // .filter(item => {
            //   return item.label.toLowerCase()
            //     .indexOf(query.toLowerCase()) > -1;
            // });
          } else {
            this.gardenNameList = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.gardenNameList = [];
      }
    },

    // 选择楼盘 获取楼盘id
    handleSelectGDId(val) {
      // console.log(val);
      this.hendleEmpty(4);
      if (!val) {
        return;
      }
      for (let i = 0; i < this.gardenNameList.length; i++) {
        if (this.gardenNameList[i].gardenId === val) {
          this.houseInfo.gardenId = val;
          this.houseInfo.gardenName = this.gardenNameList[i].label;
          break;
        }
      }
      this.requestrentUseTypeList();
    },

    // 选择用途
    handleSelectUseType(val) {
      this.hendleEmpty(3);
      if (!val) {
        return;
      }
      this.requestbuildingNameList();
      // 选择用途后，请求楼栋列表
    },

    // 选择楼栋
    handleSelectBuildingName(val) {
      this.hendleEmpty(2);
      if (!val) {
        return;
      }
      for (let i = 0; i < this.buildingNameList.length; i++) {
        if (this.buildingNameList[i].buildingId === val) {
          this.houseInfo.buildingId = val;
          this.houseInfo.buildingName = this.buildingNameList[i].buildingName;
          this.houseInfo.elevator = this.buildingNameList[i].elevator;
          break;
        }
      }
      this.requestNumberList();
    },

    // 打开选择房号的弹窗
    openNumberList() {
      if (this.houseDisabse) {
        return;
      } else if (!this.houseInfo.buildingName.trim().length || (!this.houseNumberList.length)) {
        this.$message.error('楼盘字典无此房间号信息');
        return;
      }
      this.houseNumberDialog = true;
    },

    // 选择房间号
    selectNumber(e, data) {
      if (data.roomNumberState === 'NOT_ADDED' || data.roomNumberState === 'TRANSFERRED') {
        this.numberData = data;
        if (this.targetElement !== null) {
          this.targetElement.style.background = '';
          this.targetElement = e.target;
          this.targetElement.style.background = '#008842';
        } else {
          this.targetElement = e.target;
          this.targetElement.style.background = '#008842';
        }
        // console.log(this.targetElement);
      } else if (data.roomNumberState === 'ADDED') {
        this.$axios.post(
          '/security/room/returnRoomBdPositionInfo',
          {
            commitState: data.commitState,
            dictionaryRoomId: data.dictionaryRoomId
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.$alert(`房源${data.number}已是${res.data.result.bdName}（${res.data.result.orgName}）的意向房源，不能添加`, {
              confirmButtonText: '确定'
            }).then(e => {
              console.log(e);
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },

    // 确定房号
    handleSelectNumber() {
      if (this.numberData === null || !(this.numberData.number && this.numberData.dictionaryRoomId)) {
        this.$message.warning('请选择房间号');
        return;
      }
      this.houseInfo.number = this.numberData.number;
      this.houseInfo.dictionaryRoomId = this.numberData.dictionaryRoomId;
      this.houseInfo.roomCode = this.numberData.roomCode;
      if (this.numberData.roomNumberState === 'TRANSFERRED') {
        // 如果是资料盘，则去资料盘的数据
        this.requestDatum();
      } else {
        // 否取楼盘字典的
        this.$axios.post(
          '/security/room/returnRoomOtherInfo',
          {
            city: this.houseInfo.city,
            dictionaryRoomId: this.houseInfo.dictionaryRoomId
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.updateBaseInfo(result);
            // 确定房号获取基本信息后
            this.houseNumberDialog = false;
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
          this.$message.error(err.message || '获取房源基本信息出错了！');
        });
      }
    },
    // 资料盘
    requestDatum() {
      this.requestData(this.numberData.roomId);
    },

    // 更新数据
    updateBaseInfo(data) {
      const myHouseInfo = JSON.parse(JSON.stringify(this.houseInfo));
      myHouseInfo.area = data.area;
      myHouseInfo.bedRoom = data.bedRoom || 0;
      myHouseInfo.decoration = data.decoration;
      myHouseInfo.decorationDesc = data.decorationDesc;
      myHouseInfo.direction = data.direction;
      myHouseInfo.directionDesc = data.directionDesc;
      myHouseInfo.floor = data.floor;
      myHouseInfo.kitchen = data.kitchen || 0;
      myHouseInfo.livingRoom = data.livingRoom || 0;
      myHouseInfo.toilet = data.toilet || 0;
      myHouseInfo.totalFloor = data.totalFloor;
      myHouseInfo.balcony = data.balcony || 0;

      this.$set(this, 'houseInfo', myHouseInfo);
      // 跟进互相生成默认数据
      this.handleHouseType();
    },

    hendleEmpty(val) {
      // console.log(val);
      let houseInfoData = this.houseInfo;
      // 城市改变
      if (val > 4) {
        houseInfoData.gardenId = '';
        houseInfoData.gardenName = '';
      }
      // 楼盘改变
      if (val > 3) {
        houseInfoData.rentUseType = '';
      }
      // 用途改变
      if (val > 2) {
        houseInfoData.buildingName = '';
        houseInfoData.buildingId = '';
      }
      // 楼栋改变
      houseInfoData.number = '';
      houseInfoData.dictionaryRoomId = '';

      houseInfoData.area = '';
      houseInfoData.bedRoom = '';
      houseInfoData.decoration = '';
      houseInfoData.decorationDesc = '';
      houseInfoData.direction = '';
      houseInfoData.directionDesc = '';
      houseInfoData.floor = '';
      houseInfoData.kitchen = '';
      houseInfoData.livingRoom = '';
      houseInfoData.toilet = '';
      houseInfoData.totalFloor = '';
    },

    // 选择管家
    handleSelectManager(data) {
      this.houseInfo.bdName = data.name;
      this.houseInfo.bdId = data.id;
      this.manageDialog = data.flag;
    },

    // 更新 租金递增
    updateLeasePriceRate(data) {
      this.$set(this.houseInfo.leaseholdModel, 'leasePriceRateDesc', data);
      this.houseInfo.leaseholdModel.leasePriceRate = data;
    },

    // 计算总价
    handleAmount() {
      if (this.houseInfo.chambersType !== 'SHARED_RENT') { return; }
      let amount = 0;
      if (this.houseInfo.chamberList.length > 0) {
        for (let i = 0; i < this.houseInfo.chamberList.length; i++) {
          this.houseInfo.chamberList[i].expectRoomPrice && (amount = amount + this.houseInfo.chamberList[i].expectRoomPrice);
        }
      }
      this.houseInfo.expectHousePrice = amount;
    },

    // 提价测算
    handleReckon() {
      this.$refs.reckon.handleReckon();
    },

    clouseReckon() {
      this.$refs.reckon.clouseReckon();
    }
  },

  components: {
    FileUpload,
    Organization,
    RentIncreasing,
    MyImageUpload,
    reckonDialog
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  }
};
</script>
<style scoped>
.house-info {
  min-height: 300px;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}
.lease-info {
  min-height: 225px;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}
.owner-info {
  min-height: 100px;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}
.note-info {
  /* min-height: 100px; */
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}
.house-img {
  min-height: 240px;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
  background-color: #fff;
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
.info-box {
  padding: 20px 20px 0px 0;
}
.dialog-l {
  padding: 20px;
  background-color: #eeeeee;
}
.el-select {
  display: block;
}
.house-type {
  border-radius: 3px;
  overflow: hidden;
}
.huxing-i-box {
  line-height: normal;
  display: inline-table;
  width: 100%;
  height: 30px;
  border-collapse: separate;
}
.huxing-input {
  height: 30px;
  -webkit-appearance: none;
  background-color: #fff;
  /* border-radius: 4px; */
  border: 1px solid #999;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #5a5e66;
  display: inline-block;
  font-size: inherit;
  line-height: 1;
  outline: 0;
  padding: 0 2px !important;
  width: 100%;
}
.huxing-i-box:first {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.huxing-append {
  display: inline-block;
  background-color: #f5f7fa;
  color: #878d99;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #999;
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
.huxing-i-box .last-append {
  border-right: 1px solid #999;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.owner-add {
  color: #4b83af;
  cursor: pointer;
  float: right;
}
.owner-label {
  display: inline-block;
  width: 100px;
}
.owner-info-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.owner-del {
  border-left: 1px solid #ccc;
}

.decorate {
  background-color: #ccc;
  height: 30px;
  line-height: 30px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
/* //  */
.mart-18 {
  margin-top: -18px;
}
.room-desc >>> .el-textarea .el-textarea__inner {
  border: none;
}

.info-box >>> div.el-form-item__content {
  height: 30px;
}
/* .house-number {
  cursor: pointer;
} */
.square-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
}
.square {
  width: 15px;
  height: 15px;
  margin-left: 10px;
  vertical-align: middle;
}

.talbe-box {
  border: 1px solid #ddd;
}
.talbe-box >>> .el-table__row td .cell {
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.talbe-box >>> tbody .el-table__row td {
  padding: 0;
  /* height: 40px; */
}
.number-contaner {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}

.out {
  width: 124px;
  height: 38px;
  background-color: #fafafa;
  position: absolute;
  z-index: 2050;
  top: 99px;
  left: 22px;
}
.line {
  width: 1px;
  height: 132px;
  background-color: #ddd;
  display: inline-block;
  transform: rotate(-73deg);
  position: absolute;
  top: -47px;
  left: 61px;
}
.tr {
  font-style: normal;
  display: block;
  position: absolute;
  top: 3px;
  left: 81px;
  white-space: nowrap;
}
.lb {
  font-style: normal;
  display: block;
  position: absolute;
  top: 16px;
  left: 25px;
  white-space: nowrap;
}
.pay-rate-box {
  height: 30px;
  line-height: 30px;
  border: 1px solid #a6a6a6;
  border-radius: 4px;
  overflow: hidden;
}
.show-pay-rate {
  border-left: 1px solid #a6a6a6;
  background-color: #eee;
}
.my-row {
  min-height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
}
.my-row:last-of-type {
  border-bottom: none;
}
.house-list-head {
  height: 62px;
  width: 62px;
  text-align: center;
  border-right: 1px solid #ddd;
}
.pdt-15 {
  padding-top: 15px;
}
.my-row >>> .el-form-item--mini.el-form-item {
  margin-bottom: 15px;
}
.bdb-dashed {
  border-bottom: 1px dashed #ddd;
}
</style>

