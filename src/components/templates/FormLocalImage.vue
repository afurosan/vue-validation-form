<template>
  <div id="content-container"
       @dragenter="dragEnter($event)"
       @dragleave="dragLeave($event)"
       @dragover.prevent
       @drop.prevent="dropFile($event)"
  >
    <slot name="content-header" />
    <div>{{ contentCaption }}</div>
    <div id="area-preview" v-if="imgSrc">
      <!-- イメージプレビューコンポーネント -->
      <CustomImgPreview
          :img-src="imgSrc"
          :img-alt="imgAlt"
          :img-width="imgWidth"
          :img-height="imgHeight"
          :img-background-color="imgBackgroundColor"
          :img-border="imgBorder"
          :img-zoom-value="imgZoomValue"
          @close-image="hideImage"
      ></CustomImgPreview>
    </div>
    <div v-else>
      <p style="text-align:center;">＞＞ ドラッグ＆ドロップ ＜＜</p>
    </div>
    <input id="file-box" type="file" ref="refSelectFile" @change="uploadToBrows">
    <slot name="content-footer" />
  </div>
  <!-- <button type="button" @click="test1">test1</button> -->
  <!-- <button type="button" @click="test2">test2</button> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CustomImgPreview from '@/components/atoms/CustomImgPreview.vue';
export default defineComponent ({
  name: "FormLocalImage",
  inheritAttrs: false,
  components: {
    CustomImgPreview
  },
  props:{
    //メインキャプション
    contentCaption: { type: String, default: "", },
    //メイン背景の色
    contentBackgroundColor: { type: String, default: "#EEEEEE", },
    //メイン枠のスタイル
    contentBorder: { type: String, default: "0px solid #000000", },
    //メイン overflowプロパティ
    contentOverflow: { type: String, default: "auto", },

    //イメージの表示不可のメッセージ
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
  setup() {

    //ファイル選択ボタンのrefを取る
    //Composition APIでは$refsで取得しない？
    // const refSelectFile = ref(null);             // 今までの書き方
    const refSelectFile = ref<HTMLInputElement>(); // TSで型を指定するならこれかな？

    // 画像のURL（ブラウザ内の一時的なもの)
    const imgSrc = ref("");

    //ファイル選択ボタンでファイル選択された
    const uploadToBrows = () => {
      console.log("FormLocalImage.uploadToBrows");

      //先頭ファイル情報を取り出す
      // const file = refSelectFile.value.files[0];
      const files = refSelectFile.value?.files;
      if (files) {
        //ファイル情報から一時的なブラウザ内のURLへ変換
        imgSrc.value = URL.createObjectURL(files[0]);

        console.log(files[0]);
      }
    };

    //表示された画像表示エリアを非表示にする
    const hideImage = () => {
      console.log("FormLocalImage.hideImage");

      //作成した一時的なブラウザ内のURLを開放しておく
      URL.revokeObjectURL(imgSrc.value);
      //URLをクリアする（URLの有無で表示・非表示を切り替えてる)
      imgSrc.value = '';

      // 閉じるで非表示にした後、同じ画像を選択されても表示できない対処。
      if (refSelectFile.value instanceof HTMLInputElement && refSelectFile.value.files) {
        refSelectFile.value.value = "";
      }
    };

    //ファイルドラッグ＆ドロップ系
    //エクスプローラからドラッグされた処理。 ← これを実装すると、ブラウザに表示中の画像からもドラッグできる。
    const isDragEnter = ref(false); //←ドラッグ中に何か変化させるときはこれを使う
    const dragEnter = (event : any) => {
      console.log("FormLocalImage.dragEnter", event);
      isDragEnter.value = true;
    }
    const dragLeave = (event : any) => {
      console.log("FormLocalImage.dragLeave", event);
      isDragEnter.value = false;
    }
    const dropFile = (event : any) => {
      console.log("FormLocalImage.dropFile", event);
      isDragEnter.value = false;
      //先頭ファイル情報を取り出す
      const files = event.dataTransfer.files;
      if (files) {
        //ファイル情報から一時的なブラウザ内のURLへ変換
        imgSrc.value = URL.createObjectURL(files[0]);
      }
    }

    const test1 = () => {
      console.log("FormLocalImage.test1");
    };
    const test2 = () => {
      console.log("FormLocalImage.test2");
    };

    return {
      uploadToBrows,
      hideImage,
      refSelectFile,
      imgSrc,

      //ファイルドラッグ＆ドロップ系
      dragEnter,
      dragLeave,
      dropFile,
      isDragEnter,

      test1,
      test2,
    }
  },
})
</script>

<style scoped>
/* メインコンテナ */
#content-container {
  background-color: v-bind(contentBackgroundColor);
  border: v-bind(contentBorder);
  overflow: v-bind(contentOverflow);
  padding: 10px; /* ###コンテンツ内側 */
}
/* プレビューエリア */
#area-preview {

}
/* ファイル選択 */
#file-box {
  clear: both;
  float: left;
}
</style>

