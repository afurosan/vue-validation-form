<template>
  <base-controls v-bind="$attrs">
    <template #control>
      <div class="item" v-for="option in options" :key="option.id">
        <Field
          :name="`${selectAttribute.name}.${option.id}`"
          :type="selectAttribute.type"
          :value="true"
        />
        <!-- <input
            :value="option.id"
            v-bind="selectAttribute"
            @change="handleChange"
          /> -->
        <!-- </Field> -->
        {{ option.name }}
      </div>
      <!-- <p class="help-message" v-show="errorMessage">
        {{ errorMessage }}
      </p>
      <p>{{ meta }}</p> -->
    </template>
  </base-controls>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Field, useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent({
  name: "CustomCheckBox",
  inheritAttrs: false,
  components: { BaseControls, Field },
  props: {
    options: { type: Array, require: true },
  },
  setup(p, c) {
    //  子コンポーネントへ渡すHTMLのAttributes
    const selectAttribute = computed(() => {
      let { name, type } = c.attrs;
      return { name, type };
    });

    return {
      selectAttribute,
    };
  },
});
</script>

<style scoped>
div.item {
  display: inline-block;
}
.help-message {
  margin: 0;
  font-size: 14px;
  color: var(--error-color);
}
</style>
