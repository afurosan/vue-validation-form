<template>
  <base-controls v-bind="$attrs" :error-msg="errorMessage">
    <template #control>
      <div class="item" v-for="option in options" :key="option.id">
        <label>          
          <input
            type="radio"
            :name="`${selectAttribute.name}.${option.id}`"
            :value="option.id"
            v-model="selectedValue"/>
          {{ option.name }}
        </label>
      </div>
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
    options: { type: Array, require: true },
  },
  setup(p, c) {

    //  子コンポーネントへ渡すHTMLのAttributes
    const selectAttribute = computed(() => {
      let { name, type } = c.attrs;
      return { name, type };
    });

    console.log('ini', c.attrs.initialValue)

    const {
      value: selectedValue,
      errorMessage,
      handleChange,
      meta,
    } = useField(String(c.attrs.name), undefined, {
      initialValue: c.attrs.initialValue,
    });

    return {
      selectedValue,
      selectAttribute,
      errorMessage,
      handleChange,
      meta,
    };
  },
});
</script>

<style scoped>
div.item {
  display: inline-block;
}
</style>
