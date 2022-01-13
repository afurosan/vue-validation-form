<template>
  <base-controls v-bind="$attrs">
    <template #control>
      <div class="item" v-for="{ id, name } in options" :key="id">
        <label>            
          <input 
            type="checkbox" 
            :name="`${selectAttribute.name}.${id}`" 
            :value="id"
            v-model="selectedValue"/>
          {{ name }}
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
  name: "CustomCheckBox",
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

    const {
      value: selectedValue,
      errorMessage,
      handleChange,
      meta,
    } = useField(String(c.attrs.name), undefined, {
      initialValue: c.attrs.initialValues,
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
