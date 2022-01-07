<template>
  <form-validate />
  <!-- <form-test /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormValidate from "@/components/templates/FormValidate.vue";
import FormTest from "@/components/templates/FormTest.vue";

export default defineComponent({
  name: "App",
  components: {
    FormValidate,
    // FormTest,
  },
});
</script>

<style>
:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}
</style>
