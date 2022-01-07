<template>
  <base-controls v-bind="$attrs">
    <template #control>
      <input v-bind="selectAttribute" @change="handleChange(value)" />
      <p class="help-message" v-show="errorMessage">
        {{ errorMessage }}
      </p>
      <p>{{ meta }}</p>
    </template>
  </base-controls>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent({
  name: "CustomCheckBox",
  inheritAttrs: false,
  components: { BaseControls },
  props: {
    value: {
      type: String,
    },
  },
  setup(p, c) {
    //  子コンポーネントへ渡すHTMLのAttributes
    const selectAttribute = computed(() => {
      let { name, type } = c.attrs;
      return { name, type };
    });

    const { checked, handleChange, errorMessage, meta } = useField(
      String(c.attrs.name),
      undefined,
      {
        type: "checkbox",
        checkedValue: p.value,
      }
    );

    return {
      //   checked,
      selectAttribute,
      handleChange,
      errorMessage,
      meta,
    };
  },
});
</script>

<style scoped>
div {
  display: inline-block;
}
.help-message {
  margin: 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
