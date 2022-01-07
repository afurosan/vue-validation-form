<template>
  <div class="TextInput">
    <base-controls v-bind="$attrs" :error-msg="errorMessage">
      <template #control>
        <input
          :value="inputValue"
          @input="handleChange"
          @blur="handleBlur"
          v-bind="selectAttribute"
        />
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
  setup(p, c) {
    //  子コンポーネントへ渡すHTMLのAttributes
    const selectAttribute = computed(() => {
      let { name, type, placeholder } = c.attrs;
      return { name, type, placeholder };
    });

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

<style scoped></style>
