<template>
  <form-validate />
  <!-- <form-test /> -->

<!--  <hr>-->
<!--  <form-local-image-->
<!--      top-msg="画像をプレビュー（ローカルドライブにあるファイル）"-->
<!--      alt-msg="画像は表示できません"-->
<!--  />-->
<!--  <form-local-image-->
<!--      top-msg="画像をプレビュー（ローカルドライブにあるファイル）"-->
<!--      alt-msg="画像は表示できません"-->
<!--  />-->

</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormValidate from "@/components/templates/FormValidate.vue";
import FormTest from "@/components/templates/FormTest.vue";
import FormLocalImage from "@/components/templates/FormLocalImage.vue";

export default defineComponent({
  name: "App",
  components: {
    FormValidate,
    // FormTest,
    // FormLocalImage,
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
