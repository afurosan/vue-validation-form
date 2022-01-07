<template>
  <div>
    <label>{{ $attrs.label }}</label>
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
.error-message {
  margin: 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
