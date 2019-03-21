<template>
  <div class="apply_form">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="box">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="经办人信息" name="1">
            <div class="info">
              <el-form-item label="客户经理:">
                <el-select v-model="form.customerManager" placeholder="">
                  <el-option label="张三" value="shanghai"></el-option>
                  <el-option label="李四" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="部门:">
                <el-select v-model="form.department" placeholder="">
                  <el-option label="担保一部" value="shanghai"></el-option>
                  <el-option label="担保一部" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="电话:">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>

              <span class="btn" @click="addDom(1)">
                <i class="icon iconfont icon-jia"></i>新增合伙人
              </span>
            </div>
            <div v-for="item in txt.txtCustomer">
              <div class="info" :data-id="item">
                <el-form-item label="合伙人:">
                  <el-select v-model="form.customerManager" placeholder="">
                    <el-option label="张三" value="shanghai"></el-option>
                    <el-option label="李四" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="部门:">
                  <el-select v-model="form.department" placeholder="">
                    <el-option label="担保一部" value="shanghai"></el-option>
                    <el-option label="担保一部" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="电话:">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>

                <span class="btn" @click="deleteDom(1)">
                  <i class="icon iconfont icon-jian"></i>
                </span>
              </div>
            </div>
            <!-- <div v-html="txt"></div> -->
          </el-collapse-item>

          <el-collapse-item title="业务信息" name="2">
            <div class="info">
              <el-form-item label="业务类型:" prop="serviceType">
                <el-select v-model="form.serviceType" placeholder="" style="width: 495px;">
                  <el-option label="交易类额度赎楼" value="shanghai"></el-option>
                  <el-option label="交易类额度赎楼" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="来源:" prop="source">
                <el-select v-model="form.source" placeholder="请选择">
                  <el-option label="担保一部" value="shanghai"></el-option>
                  <el-option label="担保一部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="info">
              <el-form-item label="" prop="source">
                <el-checkbox>关联单</el-checkbox>
                <el-select v-model="form.source" placeholder="请选择" style="width: 385px;">
                  <el-option label="担保一部" value="shanghai"></el-option>
                  <el-option label="担保一部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-collapse-item>

          <tabs :status="1" :tabsData="tabsProperty">
            <div class="info" slot="info">   <!--根据具名插槽把HTML带到子组件里面去 -->
              <el-form-item label="物业:" prop="serviceType">
                <el-select v-model="form.serviceType" placeholder="物业名称" style="width: 100px;">
                  <el-option label="1" value="shanghai"></el-option>
                  <el-option label="2" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.serviceType" placeholder="座落" style="width: 100px;">
                  <el-option label="3" value="shanghai"></el-option>
                  <el-option label="4" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.serviceType" placeholder="房号" style="width: 100px;">
                  <el-option label="5" value="shanghai"></el-option>
                  <el-option label="6" value="beijing"></el-option>
                </el-select>
                <el-checkbox>无建模物业</el-checkbox>
              </el-form-item>

              <el-form-item label="用途:">
                <el-input v-model="form.use"></el-input>
              </el-form-item>

              <el-form-item label="面积:">
                <el-input v-model="form.area">
                   <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
            </div>
            <div class="info" slot="info">
              <el-form-item label="用途:" prop="serviceType">
                <el-input v-model="form.use" style="width: 495px;"></el-input>
              </el-form-item>

              <el-form-item label="产证类型:" prop="source">
                <el-select v-model="form.source" placeholder="请选择">
                  <el-option label="担保一部" value="shanghai"></el-option>
                  <el-option label="担保一部" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="产证编号:" prop="source">
                <el-select v-model="form.source" placeholder="2018" style="width: 100px;">
                  <el-option label="担保一部" value="shanghai"></el-option>
                  <el-option label="担保一部" value="beijing"></el-option>
                </el-select>
                <el-input v-model="form.use" style="width: 100px;margin-left: -5px;"></el-input>
                <span class="btn">查档</span>
              </el-form-item>
            </div>
            <tabs slot="info" :status="2" :tabsData="tabsOwner">
              <div class="info" slot="info">

                <el-form-item label="姓名:">
                  <el-input v-model="form.use"></el-input>
                </el-form-item>

                <el-form-item label="联系电话:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="产权份额:">
                  <el-input v-model="form.area">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="国籍:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="info" slot="info">
                <el-form-item label="证件类型:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="证件号码:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="住址:">
                  <el-input v-model="form.area" style="width: 495px;"></el-input>
                </el-form-item>
              </div>
            </tabs>

          </tabs>

          <el-collapse-item title="买方" name="3">
            <tabs :status="2" :tabsData="tabsCustomer">
              <div class="info" slot="info">

                <el-form-item label="姓名:">
                  <el-input v-model="form.use"></el-input>
                </el-form-item>

                <el-form-item label="联系电话:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="产权份额:">
                  <el-input v-model="form.area">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="国籍:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="info" slot="info">
                <el-form-item label="证件类型:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="证件号码:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="住址:">
                  <el-input v-model="form.area" style="width: 495px;"></el-input>
                </el-form-item>
              </div>
            </tabs>
          </el-collapse-item>

          <el-collapse-item title="原贷款情况" name="4">
            <div class="info">
              <el-form-item label="原贷款形式:" prop="source">
                <el-select v-model="form.source" placeholder="请选择">
                  <el-option label="按揭贷款" value="shanghai"></el-option>
                  <el-option label="2222" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="原贷款金额:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="原贷款余额:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="info">
              <el-form-item label="原商贷银行:" prop="source">
                <el-select v-model="form.source" placeholder="请选择银行">
                  <el-option label="111" value="shanghai"></el-option>
                  <el-option label="2222" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="商贷金额:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="银行联系人:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <el-form-item label="银行联系电话:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>

            <div class="info">
              <el-form-item label="主借款人:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <el-form-item label="共借人:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>

            <div class="info">
              <el-form-item label="备注:" style="width: 1200px;">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>

          </el-collapse-item>

          <el-collapse-item title="成交情况" name="5">
            <div class="info">
              <el-form-item label="成交总价:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="付款方式:" prop="serviceType">
                <el-select v-model="form.serviceType" placeholder="" >
                  <el-option label="交易类额度赎楼" value="shanghai"></el-option>
                  <el-option label="交易类额度赎楼" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="定金:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="公证日期:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>

          <el-collapse-item title="新贷款情况" name="6">
            <div class="info">
              <span class="symbol">01</span>
              <el-form-item label="监管银行:" prop="source">
                <el-select v-model="form.source" placeholder="请选择银行">
                  <el-option label="111" value="shanghai"></el-option>
                  <el-option label="2222" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="监管金额:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="联系人:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <el-form-item label="电话:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <span class="btn" @click="addDom(2)">
                <i class="icon iconfont icon-jia"></i>
              </span>
            </div>

            <div v-for="item in txt.txtBank">
              <div class="info">
                <span class="symbol">0{{ item+1 }}</span>
                <el-form-item label="监管银行:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择银行">
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="监管金额:">
                  <el-input v-model="form.area">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="联系人:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="电话:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <span class="btn" @click="deleteDom(2)">
                  <i class="icon iconfont icon-jian"></i>
                </span>
              </div>
            </div>

            <div class="split_line"></div>

            <div class="info">
              <el-form-item label="退尾款账户名:" prop="source">
                <el-select v-model="form.source" placeholder="请选择银行">
                  <el-option label="111" value="shanghai"></el-option>
                  <el-option label="2222" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="账号:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <el-form-item label="开户行:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>

            <div class="info">
              <el-form-item label="监管账户名:" prop="source">
                <el-select v-model="form.source" placeholder="请选择银行">
                  <el-option label="111" value="shanghai"></el-option>
                  <el-option label="2222" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="账号:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>

              <el-form-item label="开户行:">
                <el-input v-model="form.area"></el-input>
              </el-form-item>
            </div>

          </el-collapse-item>

          <el-collapse-item title="担保情况" name="7">
            <div class="info">
              <el-form-item label="申请人:" prop="serviceType">
                <el-select v-model="form.serviceType" placeholder="选择申请人" >
                  <el-option label="1" value="shanghai"></el-option>
                  <el-option label="2" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="赎楼比例:">
                <el-input v-model="form.area">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </div>

            <tabs :status="2" :tabsData="tabsPayment">
              <div class="info" slot="info">
                <el-form-item label="回款来源:" prop="source">
                  <el-select v-model="form.source" placeholder="担保人/证明人">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="回款金额:">
                  <el-input v-model="form.use">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="账户名:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="账号:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>
              </div>

              <div class="info" slot="info">
                <el-form-item label="开户行:">
                  <el-input v-model="form.area" style="width: 495px;"></el-input>
                </el-form-item>
              </div>

              <div class="split_line" slot="info"></div>

              <div class="info" slot="info">
                <el-form-item label="备注:">
                  <el-input v-model="form.area" style="width: 1200px;"></el-input>
                </el-form-item>
              </div>

              <div class="info" slot="info">
                <el-form-item label="反担保人:" prop="source">
                  <el-select v-model="form.source" placeholder="担保人/证明人">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </tabs>

            <tabs :status="2" :tabsData="tabsGuarantee">
              <div class="info" slot="info">
                <span class="symbol">01</span>
                <el-form-item label="房产名称:">
                  <el-input v-model="form.use"></el-input>
                </el-form-item>

                <el-form-item label="房产类型:" prop="source">
                  <el-select v-model="form.source" placeholder="房地产证书">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="产证编号:" prop="source">
                  <el-select v-model="form.source" placeholder="2018" style="width: 100px;">
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                  </el-select>
                  <el-input v-model="form.use" style="width: 100px;margin-left: -5px;"></el-input>
                  <span class="btn">查档</span>
                </el-form-item>

                <el-form-item label="产权份额:">
                  <el-input v-model="form.area">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>

                <span class="btn" @click="addDom(3)">
                  <i class="icon iconfont icon-jia"></i>
                </span>
              </div>

              <div class="info" slot="info">
                <div v-for="item in txt.txtHome" style="position:relative;">
                  <span class="symbol">0{{ item+1 }}</span>
                  <el-form-item label="房产名称:">
                    <el-input v-model="form.use"></el-input>
                  </el-form-item>

                  <el-form-item label="房产类型:" prop="source">
                    <el-select v-model="form.source" placeholder="房地产证书">
                      <el-option label="大陆" value="shanghai"></el-option>
                      <el-option label="2222" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="产证编号:" prop="source">
                    <el-select v-model="form.source" placeholder="2018" style="width: 100px;">
                      <el-option label="1" value="shanghai"></el-option>
                      <el-option label="2" value="beijing"></el-option>
                    </el-select>
                    <el-input v-model="form.use" style="width: 100px;margin-left: -5px;"></el-input>
                    <span class="btn">查档</span>
                  </el-form-item>

                  <el-form-item label="产权份额:">
                    <el-input v-model="form.area">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>

                  <span class="btn" @click="deleteDom(3)">
                    <i class="icon iconfont icon-jian"></i>
                  </span>
                </div>
              </div>

              <div class="split_line" slot="info"></div>

              <div class="info" slot="info">

                <el-form-item label="姓名:">
                  <el-input v-model="form.use"></el-input>
                </el-form-item>

                <el-form-item label="联系电话:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="证件类型:" prop="source">
                  <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="大陆" value="shanghai"></el-option>
                    <el-option label="2222" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="证件号码:">
                  <el-input v-model="form.area"></el-input>
                </el-form-item>

              </div>

              <div class="info" slot="info">
                <el-form-item label="住址:">
                  <el-input v-model="form.area" style="width: 495px;"></el-input>
                </el-form-item>
              </div>
            </tabs>

          </el-collapse-item>

          <el-collapse-item title="收费情况" name="8">
            <div class="info">
              <span class="symbol">01</span>
              <el-form-item label="借款金额:">
                <el-input v-model="form.use">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="用款天数:" prop="source">
                <el-input v-model="form.area">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>

              <el-form-item label="每日费率:">
                <el-input v-model="form.area">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>

              <span class="btn" @click="addDom(4)">
                <i class="icon iconfont icon-jia"></i>
              </span>
            </div>

            <div v-for="item in txt.txtMoney">
              <div class="info">
                <span class="symbol">0{{ item+1 }}</span>
                <el-form-item label="借款金额:">
                  <el-input v-model="form.use">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="用款天数:" prop="source">
                  <el-input v-model="form.area">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="每日费率:">
                  <el-input v-model="form.area">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>

                <span class="btn" @click="deleteDom(4)">
                  <i class="icon iconfont icon-jian"></i>
                </span>
              </div>
            </div>

            <div class="info">
              <el-form-item label="借款金额:">
                <el-input v-model="form.use" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="用款天数:" prop="source">
                <el-input v-model="form.area" disabled>
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>

              <el-form-item label="每日费率:">
                <el-input v-model="form.area" disabled>
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="split_line"></div>

            <div class="info">
              <el-form-item label="应收咨询费:">
                <el-input v-model="form.use">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="手续费:" prop="source">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>

              <el-form-item label="应收合计:">
                <el-input v-model="form.area">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </div>

            <div class="info">
              <el-form-item label="开票:">
                <el-checkbox v-model="checked">需要发票</el-checkbox>
              </el-form-item>
            </div>

          </el-collapse-item>

        </el-collapse>

      </div>
    </el-form>
    <div class="footer">
      <el-button class="save" @click="save('form')">保存</el-button>
      <el-button type="warning" @click="hideAddSet('form')">提交报单</el-button>
    </div>
  </div>
</template>
<script>
import tabs from "./components/tabs";
  export default {
    data() {
      return {
        tabsProperty: ['物业1','物业2'],
        tabsCustomer: ['客户1','客户2'],
        tabsOwner: ['业主1','业主2'],
        tabsPayment: ['回款1','回款2'],
        tabsGuarantee: ['担保人1','担保人2'],
        activeNames: ['1','2','3','4','5','6','7','8'],
        checked: false,
        txt: {
          txtCustomer: [1],
          indexCustomer: 1,
          txtBank: [1],
          indexBank: 1,
          txtHome: [1],
          indexHome: 1,
          txtMoney: [1],
          indexMoney: 1
        },
        form: {
          customerManager: '',
          department: '',
          phone: '135-5623-5623',
          serviceType: '',
          source: '',
          use: '',
          area: ''
        },
        rules: {
          serviceType: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '请选择来源', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      tabs
    },
    mounted() {

    },
    created(){

    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addDom(a){
        console.log(a)
        if(a == 1){
          this.txt.txtCustomer.push(++this.txt.indexCustomer)
        }else if(a == 2){
          this.txt.txtBank.push(++this.txt.indexBank)
        }else if(a == 3){
          this.txt.txtHome.push(++this.txt.indexHome)
        }else if(a == 4){
          this.txt.txtMoney.push(++this.txt.indexMoney)
        }
        // let i = this.txt[0];
        // console.log(this.txt)
        //this.txt.push(++this.i)
        // let html = this.$refs.infoItem.innerHTML;
        // this.arr.push(html);

        // this.txt = this.arr.join('');
        // console.log(this.txt)
      },
      deleteDom(a){
        function truncate(arr) {
          var m = arr.slice(0);
          m.splice(m.length-1,1);
          return m;
        }
        if(a == 1){
          if(this.txt.txtCustomer.length == 1){
            return;
          }
          this.txt.txtCustomer = truncate(this.txt.txtCustomer)
        }else if(a == 2){
          if(this.txt.txtBank.length == 1){
            return;
          }
          this.txt.txtBank = truncate(this.txt.txtBank)
        }else if(a == 3){
          if(this.txt.txtHome.length == 1){
            return;
          }
          this.txt.txtHome = truncate(this.txt.txtHome)
        }else if(a == 4){
          if(this.txt.txtMoney.length == 1){
            return;
          }
          this.txt.txtMoney = truncate(this.txt.txtMoney)
        }

      }
    }
  }

</script>
<style scoped lang="less">
.apply_form{
  padding: 0 15px 15px;
  .footer{
    position: fixed;
    left: 0;
    bottom: 0px;
    height: 70px;
    width: 100%;
    line-height: 70px;
    text-align: center;
    margin-top: 20px;
    background: white;
    z-index: 99;
    box-shadow: 0px -8px 8px 0px rgba(0, 0, 0, 0.05);
    .save{
      background-color: #0958a5;
      color: white;
    }
    button{
      width: 120px;
      height: 40px;
      font-size: 18px;
    }
  }
  .box{
    margin-bottom: 80px;
    .split_line{
      height: 2px;
      width: 98%;
      border-bottom: dashed 2px #e5e5e5;
      margin: 15px 1%;
    }
    .info{
      position: relative;
      .symbol{
        width: 18px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        background-color: #999999;
        color: white;
        position: absolute;
        top: 14px;
        left: 15px;
      }
    }
    .el-tabs{
      width: 98%;
      margin: 0 auto;
    }
    .el-collapse-item{
      margin-top: 15px;
    }
    .el-form-item{
      margin-bottom: 0px;
    }
    .btn{
      font-size: 12px;
      color: #0958a5;
      cursor: pointer;
      margin-left: 15px;
    }
  }

}
</style>
