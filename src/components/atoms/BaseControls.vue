<template>
  <div>
    <label>{{ $attrs.label }}</label>
    <slot name="control"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseControls",
  inheritAttrs: false,
  props: { modelValue: String },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.help-message {
  margin: 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
