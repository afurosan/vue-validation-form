<template>
  <div class="multi-v-model">
    <base-controls v-bind="$attrs" :error-msg="errorMessage">
      <template #control>
        <div>
          <div>ユーザー名：</div>
          <input v-bind:value="name" v-on:input="updateName($event.target.value)">
        </div>
        <div>
          <div>email：</div>
          <input v-bind:value="email" v-on:input="updateEmail($event.target.value)">
        </div>
        <div>
          <div>tel：</div>
          <input v-bind:value="tel" v-on:input="updateTel($event.target.value)">
        </div>
      </template>
    </base-controls>
  </div>
</template>
<script>

import { defineComponent, computed } from "vue";
import { useField } from "vee-validate";
import BaseControls from "@/components/atoms/BaseControls.vue";

export default defineComponent ({
  name: "CustomMultiInput",
  inheritAttrs: false,
  components: { BaseControls },
  // v-modelディレクティブで指定されるプロパティ
  props: {
    name: String,
    email: String,
    tel: String,
  },
  // コンポーネント設定処理
  setup(props, context) {
    // name変更時の処理
    function updateName(value) {
      context.emit('update:name', value) // 変更イベントを発生
    }
    // email変更時の処理
    function updateEmail(value) {
      context.emit('update:email', value) // 変更イベントを発生
    }
    // tel変更時の処理
    function updateTel(value) {
      context.emit('update:tel', value) // 変更イベントを発生
    }

    return {
      updateName, updateEmail,updateTel,
    }
  }
});

</script>
<style scoped>
.multi-v-model {
  background-color: #ccccf5;
}
</style>