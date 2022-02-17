<template>
  <div id="base-overlay" @click="clickEvent">
    <div id="base-modal" @click.stop="stopEvent">
      <slot name="base-item" />
      <!-- <button type="button" @click="clickEvent">close</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BaseModal",
  inheritAttrs: false,
  components: {  },
  emits: ["close-modal"],
  props:{
  },
  setup(props, context) {

    const clickEvent = (): void => {
      console.log("clickEvent");
      // base-overlay上のクリックはモーダル終了とする
      context.emit("close-modal");
    };

    const stopEvent = (): void => {
      console.log("stopEvent");
      // base-modal上のクリックはイベントの伝搬をキャンセルする
      // @click.stop で event.stopPropagation() が呼ばれるのでここでは何もしなくてよい
    };

    return {
      clickEvent,
      stopEvent,
    }
  },
});
</script>

<style scoped>
#base-overlay{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#base-modal{
  z-index: 10;
  width: 90%;
  padding: 1em;
  background:#EEEEEE;
}
</style>
