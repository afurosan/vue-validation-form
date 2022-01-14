<template>
  <div class="sample">
    <h1>{{ age }}</h1>
    <button @click="calcM">リンク計算</button>
    <!-- <p>{{ saySomething() }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import * as Enumerable from "linq-es2015";

export default defineComponent({
  props: {
    msg: {
      type: String,
    },
  },
  setup() {
    // const saySomething = (): string => {
    //   const something = "CCC";
    //   return something;
    // };

    //明示的な型付け
    const age = ref<number | string>(5); // Ref<number | string>型

    const calcM = () => {
      let result = Enumerable.range(1, 10).Where(i => i % 3 == 0).Select(i => i * 10)
      console.log(result.ToArray());
    }

    return {
      age,
      calcM,
      // saySomething,
    };
  },
});
</script>

<style scoped>

</style>