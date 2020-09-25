
<template>
  <el-select
    :disabled="disabled"
    v-model="selectValue"
    :placeholder="placeholder"
    @change="onSelectorChoose"
  >
    <el-option
      v-for="item in viewOptions"
      :key="item.itemCode"
      :label="item.itemDesc"
      :value="item.itemCode"></el-option>
  </el-select>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DQuerySelector",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    alias: {
      type: String,
      required: true
    },
    mappingValue: {
      type: String,
      default: "itemCode"
    },
    mappingText: {
      type: String,
      default: "itemDesc"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterDict: {
      type: Function,
      default: () => true
    }
  },
  data() {
    return {
      options: [],
      selectValue: ''
    };
  },
  async created() {
    await this.loadCommonQueryInfo();
    if (this.value) {
      this.selectValue = this.value;
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectValue = newValue;
      },
      immediate: false
    }
  },
  computed: {
    viewOptions() {
      return this.options.filter(this.filterDict).map(option => {
        return { ...option, text: option[this.mappingText], value: option[this.mappingValue] };
      });
    }
  },
  methods: {
    ...mapActions("system", ["getBaseConfig"]),
    onSelectorChoose() {
      let selectValue = this.selectValue;
      this.viewOptions.forEach(option => {
        if (option.value !== selectValue) {
          return;
        }
        this.$emit('input', option.value);
        if (this.value !== option.value) {
          this.$emit("change", option);
        }
      });
    },
    async loadCommonQueryInfo() {
      let data = await this.getBaseConfig({ categoryCode: this.alias });
      this.options.splice(0);
      this.options.push(...data);
    }
  }
};
</script>
<style></style>
