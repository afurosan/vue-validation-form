<template>
  <div>
    <base-controls v-bind="$attrs" :error-msg="errorMessage">
      <template #control>
        <select :value="selectedValue" @change="handleChange">
          <option
            v-for="option in options"
            :key="option.id"
            :value="option.id"
            :selected="option.id === selectedValue"
          >
            {{ option.name }}
          </option>
        </select>
        <!-- <p>{{ meta }}</p> -->
      </template>
    </base-controls>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent({
  name: "CustomSelect",
  inheritAttrs: false,
  components: { BaseControls },
  props: {
    options: { type: Array, require: true },
  },
  setup(p, c) {
    const {
      value: selectedValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(String(c.attrs.name), undefined, {
      initialValue: c.attrs.initialValue,
    });

    return { selectedValue, errorMessage, handleBlur, handleChange, meta };
  },
});
</script>

<style scoped></style>
