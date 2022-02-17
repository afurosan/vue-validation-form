<template>
  <div id="thumb-container">
    <slot name="thumb-header" />
    <div id="area-img-s">
      <div v-for="(item,index) in imgSrcFiles" :key="index"> <!-- {{ isf.imgName }} {{ isf.imgSrc }} -->
        <base-image
          :img-index="index"
          :img-src="item.imgSrc"
          :img-alt="imgAlt"
          :img-width="imgWidth"
          :img-height="imgHeight"
          :img-background-color="imgBackgroundColor"
          :img-border="imgBorder"
          :img-ctrl-btn = "imgCtrlBtn"
          img-zoom-value="0"
          @click-image="clickImage"
          @click-ctrl-btn="clickCtrlBtn"
        >
          <template #base-img-footer>
            <div class="name-text" :title="item.imgName">
              [{{ index + 1 }}] {{ item.imgName }}
            </div>
          </template>
        </base-image>
      </div>
    </div>
    <slot name="thumb-footer" />
  </div>
  <!-- <button type="button" @click="test1">test1</button> -->
  <!-- <button type="button" @click="test2">test2</button> -->
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import BaseImage from '@/components/atoms/BaseImage.vue';
export default defineComponent ({
  name: "CustomImgThumb",
  inheritAttrs: false,
  components: {
    BaseImage,
  },
  emits: ["click-image","click-ctrl-btn"],
  props:{
    //サムネイル画像URLの配列
    imgSrcFiles: { type: Object },
    //サムネイル画像の表示不可メッセージ
    imgAlt: { type: String, default: "", },
    //サムネイル画像幅
    imgWidth: { type: String,  default: "160px", },
    //サムネイル画像高さ
    imgHeight: { type: String, default: "120px", },
    //サムネイル画像背景の色
    imgBackgroundColor: { type: String, default: "#EEEEEE", },
    //サムネイル画像枠のスタイル
    imgBorder: { type: String, default: "0px solid #000000", },
    //サムネイル画像の右上ボタン
    imgCtrlBtn: { type: String, default: "×", },
  },
  setup(props, context) {

    //サムネイル画像がクリックされた
    const clickImage = (index: number) => {
      console.log("CustomImgThumb.clickImage(" + index + ")");
      context.emit("click-image", index);
    }

    //サムネイル画像の右上ボタンがクリックされた
    const clickCtrlBtn = (index: number) => {
      console.log("CustomImgThumb.clickCtrlBtn(" + index + ")");
      context.emit("click-ctrl-btn", index);
    }

    const test1 = () => {
      console.log("CustomImgThumb.test1");
    };
    const test2 = () => {
      console.log("CustomImgThumb.test2");
    };

    return {
      clickImage,
      clickCtrlBtn,

      test1,
      test2,
    }
  },
})
</script>

<style scoped>
/* メインコンテナ */
#thumb-container {
  overflow: auto;
}
/* イメージサムネイルエリア */
#area-img-s {
  clear: both;
}
/* イメージファイル名 */
.name-text {
  width: v-bind(imgWidth);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0px 30px 30px 0px;  /* ###テキストの左と下側 */
}
</style>
