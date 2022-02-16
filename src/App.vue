<template>
  <form-validate />
  <!-- <form-test /> -->

<!--
  <hr>
  <form-local-image-s
      content-caption="複数画像のサムネイルとポップアップ（ローカルドライブにあるファイル）"
      content-border="2px solid #254060"
      thumb-img-alt="画像は表示できません"
      thumb-img-width="240px"
      thumb-img-height="200px"
      thumb-img-background-color="#EEEEEE"
      thumb-img-border="1px solid #254060"
      preview-img-alt="画像は表示できません"
      preview-img-width="640px"
      preview-img-height="480px"
      preview-img-border="1px solid #254060"
      preview-img-zoom-value="0"
  >
  </form-local-image-s>
  <hr>
  <form-local-image
      content-caption="１つの画像をプレビュー（ローカルドライブにあるファイル）"
      content-border="2px solid #254060"
      img-alt="画像は表示できません"
      img-width="640px"
      img-height="480px"
      img-border="1px solid #254060"
      img-zoom-value="0"
  >
  </form-local-image>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
-->

</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormValidate from "@/components/templates/FormValidate.vue";
//import FormTest from "@/components/templates/FormTest.vue";
//import FormLocalImage from "@/components/templates/FormLocalImage.vue";
//import FormLocalImageS from "@/components/templates/FormLocalImageS.vue";

export default defineComponent({
  name: "App",
  components: {
    FormValidate,
//    FormTest,
//    FormLocalImage,
//    FormLocalImageS,
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
