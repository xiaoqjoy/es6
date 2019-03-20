<template>
  <section class="textarea-wrapper">
    <el-input type="textarea" :placeholder="placeholder" v-model="content" :rows="rows" :maxlength="maxlength" @input="updateCounter"></el-input>
    <div class="count-label">{{count}}/{{maxlength}}</div>
  </section>
</template>
<script>
export default {
  name: 'MyTextarea',
  data() {
    return {
      content: this.model,
      count: 0
    };
  },
  props: {
    model: {
      type: String,
      default: '',
      required: true
    },
    minlength: {
      type: Number
    },
    maxlength: {
      type: Number,
      required: true
    },
    placeholder: String,
    rows: Number
  },
  watch: {
    model(val) {
      this.content = val;
    }
  },
  mounted() {
    // 默认获取一次输入的数量；
    this.count = this.content.length;
  },
  updated() {
    this.content = this.model;
  },
  methods: {
    updateCounter() {
      this.count = this.content.length;
      this.$emit('update:model', this.content);
    }
  }
};
</script>
<style scoped>
.textarea-wrapper {
  position: relative;
}

.count-label {
  position: absolute;
  right: 4px;
  bottom: 0;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  pointer-events: none;
}
</style>
