<template>
<div class="adress-control-select">
  <el-select class="adress-control adress-province" v-show="provinceShow" :disabled="provinceDisable" v-model="province" placeholder="省">
    <el-option v-for="item in address" :key="item.value" :label="item.label" :value-key="item.label" :value="item"></el-option>
  </el-select>
  <el-select class="adress-control adress-city" v-show="provinceShow && cityShow" :disabled="!provinceDisable && cityDisable" v-model="city" placeholder="市">
    <el-option v-for="item in province.children" :key="item.value" :label="item.label" :value-key="item.label" :value="item"></el-option>
  </el-select>
  <el-select class="adress-control adress-area" v-show="provinceShow && cityShow && areaShow" :disabled="!provinceDisable && !cityDisable && areaDisable" v-model="area" placeholder="区">
    <el-option v-for="item in city.children" :key="item.value" :label="item.label" :value-key="item.label" :value="item"></el-option>
  </el-select>
</div>
</template>

<script>
export default {
  name: 'city-picker',
  props: {
    value: {
      type: String,
      default: function () {
        return '';
      }
    },
    provinceDisable: {
      type: Boolean,
      default: false
    },
    cityDisable: {
      type: Boolean,
      default: false
    },
    areaDisable: {
      type: Boolean,
      default: false
    },
    provinceShow: {
      type: Boolean,
      default: true
    },
    cityShow: {
      type: Boolean,
      default: true
    },
    areaShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      address: [], // 所有地址数据
      province: {}, // 所选省及下辖市
      city: {}, // 所选市及下辖区
      area: {}, // 所选区域
      checkedModel: { // 选中的地址数据
        areaCode: '',
        province: '',
        city: '',
        area: ''
      },
      init: false
    };
  },
  watch: {
    province: function (newProvince, oldProvince) {
      this.checkedModel.areaCode = newProvince.value;
      this.checkedModel.province = newProvince.label;
      if (!this.init) {
        this.city = {};
      }
    },
    city: function (newCity, oldCity) {
      if (newCity.value) {
        this.checkedModel.areaCode = newCity.value;
        this.checkedModel.city = newCity.label;
      }
      if (!this.init) {
        this.area = {};
      }
    },
    area: function (newArea, oldArea) {
      if (newArea.value) {
        this.checkedModel.areaCode = newArea.value;
        this.checkedModel.area = newArea.label;
      }
      this.init = false;
    },
    value: function(newValue, oldValue) {
      if (newValue) {
        this.init = false;
        if (newValue.substr(0, 2) !== oldValue.substr(0, 2)) {
          this.city = {};
        }
        return;
      }
      this.province = {};
      this.city = {};
      this.area = {};
      this.checkedModel = {
        areaCode: '',
        province: '',
        city: '',
        area: ''
      };
    }
  },
  created() {
    // 获取选项数据
    this.getData();
  },

  methods: {
    getData() {
      this.getArea().then(res => {
        let municipalitiesArr = ['110000', '120000', '310000', '500000'];
        for (let p of res) {
          if (municipalitiesArr.indexOf(p.value) !== -1) {
            let c = {
              label: p.label,
              value: p.value,
              children: []
            };
            c.children.push(p);
            this.address.push(c);
          } else {
            this.address.push(p);
          }
        }
        this.initData();
      }).catch(err => {
        console.log(err);
      });
    },
    initData() {
      if (this.value) {
        this.init = true;
        for (let p of this.address) {
          if (this.value.substr(0, 2) === p.value.substr(0, 2)) {
            this.province = p;
            for (let c of this.province.children) {
              if (this.value.substr(0, 4) === c.value.substr(0, 4)) {
                this.city = c;
                for (let a of this.city.children) {
                  if (this.value === a.value) {
                    this.area = a;
                    return;
                  }
                }
              }
            }
          }
        }
      };
    }
  },
  updated() {
    this.$emit('change', this.checkedModel);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.adress-control-select{
  display:flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width:460px;
  float:left;
  margin-right:20px;
}
.adress-control{
  width:140px;
}
</style>
