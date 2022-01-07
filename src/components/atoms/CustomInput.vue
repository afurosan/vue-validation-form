<template>
  <div class="TextInput">
    <base-controls v-bind="$attrs">
      <template #control>
        <!-- <input v-model="inputValue" v-bind="selectAttribute" /> -->
        <input
          :value="inputValue"
          @input="handleChange"
          @blur="handleBlur"
          v-bind="selectAttribute"
        />
        <p class="help-message" v-show="errorMessage">
          {{ errorMessage }}
        </p>
        <!-- <p>{{ meta }}</p> -->
      </template>
    </base-controls>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent({
  name: "CustomInput",
  inheritAttrs: false,
  components: { BaseControls },
  // props: { modelValue: String },
  // emits: ["update:modelValue"],
  setup(p, c) {
    //  子コンポーネントへ渡すHTMLのAttributes
    const selectAttribute = computed(() => {
      let { name, type, placeholder } = c.attrs;
      return { name, type, placeholder };
    });

    // const inputValue = computed({
    //   get: () => String(toRefs(p).modelValue.value),
    //   set: (v: string) => {
    //     c.emit("update:modelValue", v);
    //   },
    // });
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(String(c.attrs.name), undefined, {
      initialValue: c.attrs.initialValue,
    });

    return {
      selectAttribute,
      inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    };
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
