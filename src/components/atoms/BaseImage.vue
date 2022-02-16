<template>
  <div id="base-container">
    <slot name="base-img-header" />
    <div id="base-panel">
      <div id="area-ctrl-s" v-show="imgCtrlBtn">
        <button class="ctrl-button" type="button" @click="clickCtrlBtn">{{ imgCtrlBtn }}</button>
      </div>
      <img :id="dynamicImageId" :src="imgSrc" :alt="imgAlt" @click="clickImage">
    </div>
    <slot name="base-img-footer" />
    <!-- <button type="button" @click="test1">test1</button> -->
    <!-- <button type="button" @click="test2">test2</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: "BaseImage",
  inheritAttrs: false,
  emits: ["click-ctrl-btn","click-image"],
  props: {
    //indexキー
    imgIndex: { type: Number, default: 0, },
    //イメージURL
    imgSrc: { type: String, default: "", },
    //イメージ表示不可のメッセージ
    imgAlt: { type: String, default: "", },
    //イメージ幅
    imgWidth: { type: String, default: "640px", },
    //イメージ高さ
    imgHeight: { type: String, default: "480px", },
    //イメージ背景の色
    imgBackgroundColor: { type: String, default: "#EEEEEE", },
    //イメージ枠のスタイル
    imgBorder: { type: String, default: "0px solid #000000", },
    //右上ボタン
    imgCtrlBtn: { type: String, default: "", },
    //ズーム値
    imgZoomValue: { type: String, default: "0", },
  },
  setup(props, context) {

    //フィット or ズーム でタグを動的に入れ替える
    //const dynamicImageId = ref(p.imgZoomValue==="0" ? "base-img-fit" : "base-img-zoom");
    const dynamicImageId = ref(computed(() => {
      return props.imgZoomValue==="0" ? "base-img-fit" : "base-img-zoom";
    }));

    const clickCtrlBtn = (): void => {
      console.log("BaseImage.clickCtrlBtn");
      context.emit("click-ctrl-btn", props.imgIndex);
    };

    const clickImage = (): void => {
      console.log("BaseImage.clickImage");
      context.emit("click-image", props.imgIndex);
    };

    const test1 = () => {
      console.log("BaseImage.test1");
    };
    const test2 = () => {
      console.log("BaseImage.test2");
    };

    return {
      dynamicImageId,
      clickCtrlBtn,
      clickImage,
      test1,
      test2,
    }
  },
});
</script>

<style scoped>
#base-container {
  float: left;
}
/* イメージ */
#base-panel {
  /* イメージではなくコンテナにバインドして調整する */
  width: v-bind(imgWidth);
  height: v-bind(imgHeight);
  border: v-bind(imgBorder);
  background-color: v-bind(imgBackgroundColor);
  overflow: auto;
}
/* 右上ボタンエリア */
#area-ctrl-s {
  /* 画像の右上に重ねる */
  position: sticky;
  top: 0;
  height: 0;
  text-align: right;
}
/* コントロールボタン */
.ctrl-button {

}
/* タグ動的入替え (枠フィットストレッチ用) */
#base-img-fit {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
/* タグ動的入替え (ズーム用) */
#base-img-zoom {
  display: block;
  object-fit: none;
  zoom: v-bind(imgZoomValue);
}
</style>
