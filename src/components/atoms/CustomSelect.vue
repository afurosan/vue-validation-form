<template>
  <div>
    <base-controls v-bind="$attrs">
      <template #control>
        <!-- <select v-model="selectValue"> -->
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
        <p class="help-message" v-show="errorMessage">
          {{ errorMessage }}
        </p>
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
    // selectedValue: { type: String, default: "" },
    options: { type: Array, require: true },
  },
  setup(p, c) {
    // const selectValue = computed({
    //   get: () => String(toRefs(p).selectedValue.value),
    //   set: (v: string) => {
    //     c.emit("update:selectedValue", v);
    //   },
    // });

    const {
      value: selectedValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(String(c.attrs.name), undefined, {
      initialValue: "",
    });

    return { selectedValue, errorMessage, handleBlur, handleChange, meta };
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
