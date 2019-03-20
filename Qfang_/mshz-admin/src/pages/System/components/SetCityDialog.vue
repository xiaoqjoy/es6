<template>
  <section>
    <div class="pdt-20 set-city">
      <el-row class="pdb-10">
        <el-col :offset="1"
          :span="5"
          class="font-r">
          城市分公司：
        </el-col>
        <el-col :span="18">
          {{loadCityCompanyData.orgName}}
        </el-col>
      </el-row>
      <el-row class="pdb-10">
        <el-col :offset="1"
          :span="5"
          class="font-r line-h-30">
          城市：
        </el-col>
        <el-col :span="16">
          <el-select size="mini"
            v-model="setCity"
            filterable
            placeholder="请输入关键词"
            @change="selectGardenName"
            clearable>
            <el-option v-for="(item, index) in loadCityCompanyData.validCityList"
              :key="index"
              :label="item.cityName"
              :value="item.city">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6"
          :span="16">
          <el-tag :key="tag.city"
            v-for="tag in cityTags"
            color="#fff"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.cityName}}
          </el-tag>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="saveCity">保存</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消
      </el-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loadCityCompanyData: {
        validCityList: []
      },
      options: [],
      cityTags: [],
      setCity: ''
    };
  },
  props: {
    id: {
      type: String,
      require: true
    },
    orgId: {
      type: String,
      require: true
    },
    cityDialog: {
      type: Boolean
    }
  },
  created() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios.get(
        '/security/oms/cityCompany/loadCityCompany',
        {
          params: {
            id: this.id || undefined,
            orgId: this.orgId || undefined
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.loadCityCompanyData = res.data.result;
          this.$set(this, 'cityTags', res.data.result.cityList);
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    // // 城市联想
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.$axios.get(
    //       '/security/oms/cityManager/darkSelectCityInfo',
    //       {
    //         params: {
    //           city: query
    //         }
    //       }
    //     ).then((res) => {
    //       if (res.data.status === 'C0000') {
    //         let cityList = res.data.result.map((item) => {
    //           return {
    //             value: item.name,
    //             label: item.alias
    //           };
    //         });
    //         this.options = cityList.filter(item => {
    //           return item.label.toLowerCase()
    //             .indexOf(query.toLowerCase()) > -1;
    //         });
    //       } else {
    //         this.options = [];
    //       }
    //     }).catch((res) => {
    //       console.log(res);
    //     });
    //   } else {
    //     this.options = [];
    //   }
    // },

    selectGardenName(val) {
      const cityItem = this.loadCityCompanyData.validCityList.find((item, index) => {
        return item.city === val;
      });

      if (!cityItem) { return; }

      const falg = this.cityTags.find((item, index) => {
        return item.city === val;
      });

      if (!falg) {
        this.cityTags.push({
          city: cityItem.city,
          cityName: cityItem.cityName
        });
      }
    },

    handleClose(tag) {
      this.cityTags.splice(this.cityTags.indexOf(tag), 1);
    },

    saveCity() {
      if (!this.cityTags.length) {
        this.$message.warning('请选择城市');
        return;
      }
      let selectCity = [];
      this.cityTags.forEach((item, index) => {
        selectCity.push(item.city);
      });
      this.$axios.post('/security/oms/cityCompany/editCityCompany', {
        citys: selectCity,
        id: this.id || undefined,
        orgId: this.orgId || undefined
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('保存成功！！');
          this.$emit('refresh');
          this.closeDialog();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.message || '服务异常');
      });
    },

    closeDialog() {
      this.$emit('update:cityDialog', false);
    }

  }
};
</script>
<style scoped>
.set-city {
  min-height: 400px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

