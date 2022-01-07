<template>
  <base-controls v-bind="$attrs">
    <template #control>
      <div v-for="option in options" :key="option.id">
        <input
          :value="option.id"
          @change="handleChange"
          v-bind="selectAttribute"
        />
        {{ option.name }}
      </div>
      <p class="help-message" v-show="errorMessage">
        {{ errorMessage }}
      </p>
      <!-- <p>{{ meta }}</p> -->
    </template>
  </base-controls>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent({
  name: "CustomRadio",
  inheritAttrs: false,
  components: { BaseControls },
  props: {
    // selectedValue: { type: String, default: "" },
    options: { type: Array, require: true },
  },
  setup(p, c) {
    //  子コンポーネントへ渡すHTMLのAttributes
    // const selectAttribute = "";
    const selectAttribute = computed(() => {
      let { name, type } = c.attrs;
      return { name, type };
    });

    // const selectValue = computed({
    //   get: () => String(toRefs(p).selectedValue.value),
    //   set: (v: string) => {
    //     console.log(v);
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

    return {
      selectedValue,
      selectAttribute,
      errorMessage,
      handleBlur,
      handleChange,
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
