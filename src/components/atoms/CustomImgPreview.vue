<template>
  <div id="preview-container">
    <slot name="preview-header" />
    <div id="area-tools">
      <button class="tool-btn" type="button" @click="closeImage">close</button>
      <div v-for="(item,index) in zoomTable" :key="index">
        <button :class="item.zoomValue===zoomValue ? 'tool-btn-sel' : 'tool-btn'"
                type="button" @click="changeZoom(item.zoomValue)">{{ item.zoomName }}</button>
      </div>
      <input  class="tool-btn" type="color" v-model="backColor">
    </div>
    <div id="area-img">
      <base-image
        :img-src="imgSrc"
        :img-alt="imgAlt"
        :img-width="imgWidth"
        :img-height="imgHeight"
        :img-background-color="backColor"
        :img-border="imgBorder"
        :img-zoom-value="zoomValue"
      >
      </base-image>
    </div>
    <slot name="preview-footer" />
  </div>
  <!-- <button type="button" @click="test1">test1</button> -->
  <!-- <button type="button" @click="test2">test2</button> -->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import BaseImage from '@/components/atoms/BaseImage.vue';
//export default {
export default defineComponent({
  name: "CustomImgPreview",
  inheritAttrs: false,
  components: { BaseImage },
  emits: ["close-image"],
  props:{
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
    //ズーム値
    imgZoomValue: { type: String, default: "0", },
  },
  setup(props, context) {

    //表示された画像表示エリアを非表示にする
    const closeImage = (): void => {
      //イメージなので後処理とかあったら。
      // 同じ名前で 子 → 親へと続かせておくが、
      //このコンポーネントは imgUrl がないとき非表示にしているので、
      //ここでは とくにやることはない。 親にemitしておく。
      console.log("CustomImgPreview.closeImage");
      context.emit("close-image");
    };

    //ズーム種類
    const zoomTable = ref([
      { zoomName: "adjust", zoomValue: "0" },
      { zoomName: "50%"   , zoomValue: "0.5" },
      { zoomName: "100%"  , zoomValue: "1" },
      { zoomName: "150%"  , zoomValue: "1.5" },
      { zoomName: "200%"  , zoomValue: "2.0" },
    ]);
    //ズーム値
    const zoomValue = ref(props.imgZoomValue);
    //ズームボタンイベント用
    const changeZoom = (v: string): void => {
      console.log("CustomImgPreview.changeZoom(" + v + ")");
      zoomValue.value = v;
    }

    //イメージ背景の色
    const backColor = ref(props.imgBackgroundColor);


    const test1 = () => {
      console.log("CustomImgPreview.test1");
    };
    const test2 = () => {
      console.log("CustomImgPreview.test2");
    };

    return {
      closeImage,
      changeZoom,
      backColor,
      zoomValue,
      zoomTable,
      test1,
      test2,
    }
  },
});
</script>



<style scoped>
/* メインコンテナ */
#preview-container {
  overflow: auto;
}
/* ツール エリア */
#area-tools {
}
/* イメージ エリア */
#area-img {
  clear: both;
}

/*ツールボタン*/
.tool-btn {
  float: left;
  width: 80px;
  Height: 36px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #254060;
  background: #EEEEEE;
  color: #254060;
  cursor: pointer;
  vertical-align: middle;
}
.tool-btn-sel {
  float: left;
  width: 80px;
  Height: 36px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #254060;
  background: #254060;
  color: #FFFFFF;
  cursor: pointer;
  vertical-align: middle;
}
</style>
