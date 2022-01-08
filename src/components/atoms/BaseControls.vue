<template>
  <div class="base_item">
    <label class="item-title">{{ $attrs.label }}</label>
    <slot name="control" />
    <p class="error-message">{{ errorMsg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseControls",
  inheritAttrs: false,
  props: { modelValue: String, errorMsg: String },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.base_item {
  padding: 3px;
}
.item-title {
  background-color: burlywood;
  margin-right: 2px;
}
.error-message {
  margin: 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
