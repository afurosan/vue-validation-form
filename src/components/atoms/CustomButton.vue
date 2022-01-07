<template>
  <button type="button" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onSubmitClick"],
  setup(p, c) {
    const onClick = (): void => {
      c.emit("onSubmitClick");
    };

    return { onClick };
  },
});
</script>

<style scoped></style>
