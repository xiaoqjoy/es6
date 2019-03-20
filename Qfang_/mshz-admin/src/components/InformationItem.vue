<template>
  <div class="content-item-twelve c-3">
    <span class="content-item-label-auto c-9">
      <span :class="{'content-item-label-justify-four' : !labelAuto}">{{labelInfo}}</span>：
    </span>
    <slot></slot>
    <span v-if="$slots.footer">
      <slot name="footer"></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'informationItem',
  data() {
    return {
    };
  },
  props: {
    labelInfo: {
      type: String,
      required: true,
      default: 'label'
    },
    labelAuto: {
      type: Boolean,
      default: false
    }
  }
};
</script>
