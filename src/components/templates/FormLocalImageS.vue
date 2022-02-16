<template>
  <div id="content-container"
       @dragenter="dragEnter($event)"
       @dragleave="dragLeave($event)"
       @dragover.prevent
       @drop.prevent="dropFile($event)"
  >
    <slot name="content-header" />
    <div>{{ contentCaption }}</div>
    <div id="area-thumb" v-if="fileItems.imgSrcFiles.length">
      <!-- サムネイルコンポーネント -->
      <CustomImgThumb
        :img-src-files="fileItems.imgSrcFiles"
        :img-alt="thumbImgAlt"
        :img-width="thumbImgWidth"
        :img-height="thumbImgHeight"
        :img-background-color="thumbImgBackgroundColor"
        :img-border="thumbImgBorder"
        @click-image="openModal"
        @click-ctrl-btn="deleteImage"
      >
      </CustomImgThumb>
      <button id="clear-thumbnails-btn" type="button" @click="clearThumbnails">すべてクリア</button>
    </div>
    <div v-else>
      <p style="text-align:center;">＞＞ ドラッグ＆ドロップ ＜＜</p>
    </div>
    <div id="area-modal" v-show="previewImgSrc">
      <!-- モーダル表示コンポーネントをここに置く -->
      <base-modal
          @close-modal="closeModal"
          v-show="showModalFlag"
      >
        <template #base-item>
          <!-- イメージプレビューコンポーネントを突っ込む -->
          <CustomImgPreview
            :img-src="previewImgSrc"
            :img-alt="previewImgAlt"
            :img-width="previewImgWidth"
            :img-height="previewImgHeight"
            :img-background-color="previewImgBackgroundColor"
            :img-border="previewImgBorder"
            :img-zoom-value="previewImgZoomValue"
            @close-image="previewClose"
          ></CustomImgPreview>
        </template>
      </base-modal>
    </div>
    <input id="file-box" type="file" ref="refSelectFile" @change="uploadToBrows" multiple>
    <slot name="content-footer" />
  </div>
  <!-- <button type="button" @click="test1">test1</button> -->
  <!-- <button type="button" @click="test2">test2</button> -->
</template>

<script lang="ts">

//export interface ImgInfo {
//  name: string;
//  src: string;
//}

import { defineComponent, ref, reactive } from 'vue';
//import { defineComponent, ref, reactive, PropType  } from 'vue';
import BaseModal from '@/components/atoms/BaseModal.vue';
import CustomImgPreview from '@/components/atoms/CustomImgPreview.vue';
import CustomImgThumb from '@/components/atoms/CustomImgThumb.vue';
export default defineComponent ({
  name: "FormLocalImageS",
  inheritAttrs: false,
  components: {
    BaseModal,
    CustomImgPreview,
    CustomImgThumb,
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

    //サムネイル画像の表示不可メッセージ
    thumbImgAlt: { type: String, default: "", },
    //サムネイル画像幅
    thumbImgWidth: { type: String,  default: "160px", },
    //サムネイル画像高さ
    thumbImgHeight: { type: String, default: "120px", },
    //サムネイル画像背景の色
    thumbImgBackgroundColor: { type: String, default: "#EEEEEE", },
    //サムネイル画像枠のスタイル
    thumbImgBorder: { type: String, default: "0px solid #000000", },

    //プレビュー画像の表示不可メッセージ
    previewImgAlt: { type: String, default: "", },
    //プレビュー画像のイメージ幅
    previewImgWidth: { type: String, default: "640px", },
    //プレビュー画像のイメージ高さ
    previewImgHeight: { type: String, default: "480px", },
    //プレビュー画像のイメージ背景の色
    previewImgBackgroundColor: { type: String, default: "#EEEEEE", },
    //プレビュー画像枠のイメージ枠のスタイル
    previewImgBorder: { type: String, default: "0px solid #000000", },
    //プレビュー画像のズーム値
    previewImgZoomValue: { type: String, default: "0", },
//    ccc: Array as PropType<ImgInfo[]>,
  },

  setup() {

    //ファイル選択をrefで参照する
    const refSelectFile = ref<HTMLInputElement>();

    //複数ファイルの情報
    const fileItems = reactive({
      imgSrcFiles: [
        { imgName: "ファイル名", imgSrc: "ソースのURL" },
      ],
    });
    fileItems.imgSrcFiles.splice(0);

    // プレビュー画像用のURL（ブラウザ内の一時的なもの)
    const previewImgSrc = ref("");

    // ファイル選択ボタンでファイル選択された
    const uploadToBrows = () => {
      console.log("FormLocalImageS.uploadToBrows");

      if (refSelectFile.value instanceof HTMLInputElement && refSelectFile.value.files) {
        //ファイル情報を取り出す
        const files = refSelectFile.value?.files;
        if (files) {
          for(let i=0; i<files.length;i++){
            let item = { imgName: files[i].name, imgSrc: URL.createObjectURL(files[i]) };
            fileItems.imgSrcFiles.push(item); //追加型に
          }
        }
        // 閉じるで非表示にした後、同じ画像を選択されても表示できない対処。
        refSelectFile.value.value = "";
      }
    };

    //全サムネイルクリア処理（親でコミット後のリセット呼び出しとかでも必要か？）
    const clearThumbnails = () => {
      console.log("FormLocalImageS.clearAll");
      //作成した一時的なブラウザ内のURLを開放しておく
      for(let i=0; i<fileItems.imgSrcFiles.length;i++){
        URL.revokeObjectURL(fileItems.imgSrcFiles[i].imgSrc);
      }
      fileItems.imgSrcFiles.splice(0);

      // 閉じるで非表示にした後、同じ画像を選択されても表示できない対処。
      if (refSelectFile.value instanceof HTMLInputElement && refSelectFile.value.files) {
        refSelectFile.value.value = "";
      }
    };

    //サムネイル画像の右上ボタンがクリックされた
    const deleteImage = (index: number) => {
      console.log("FormLocalImageS.deleteImage");
      //作成した一時的なブラウザ内のURLを開放しておく
      URL.revokeObjectURL(fileItems.imgSrcFiles[index].imgSrc);
      //削除
      fileItems.imgSrcFiles.splice(index, 1);
    }

    //モーダル表示フラグ
    const showModalFlag = ref(false);

    //モーダルプレビュー表示から[close]が押された
    const previewClose = () => {
      console.log("FormLocalImageS.previewClose");

      //モーダルのプレビューを閉じる
      previewImgSrc.value ='';
      showModalFlag.value = false;
    };

    //サムネイル画像がクリックされた。 ここではモーダル表示開始をする
    const openModal = (index: number) => {
      console.log("FormLocalImageS.openModal");
      //モーダル表示
      previewImgSrc.value = fileItems.imgSrcFiles[index].imgSrc;
      showModalFlag.value = true;
    };

    //モーダル表示からモーダル終了のお知らせ(未使用)
    const closeModal = () => {
      console.log("FormLocalImageS.closeModal");
      //モーダル非表示
      showModalFlag.value = false;
    };

    //ファイルドラッグ＆ドロップ系
    //エクスプローラからドラッグされた処理。 ← これを実装すると、ブラウザに表示中の画像からもドラッグできる。
    const isDragEnter = ref(false); //←ドラッグ中に何か変化させるときはこれを使う
    const dragEnter = (event : any) => {
      console.log("FormLocalImageS.dragEnter", event);
      isDragEnter.value = true;
    }
    const dragLeave = (event : any) => {
      console.log("FormLocalImageS.dragLeave", event);
      isDragEnter.value = false;
    }
    const dropFile = (event : any) => {
      console.log("FormLocalImageS.dropFile", event);
      isDragEnter.value = false;

      if(!showModalFlag.value) { //←モーダル表示中でもドロップはできてしまう。さずがにこれは止めておく。
        //ファイル情報を取り出す
        const files = event.dataTransfer.files;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            let item = {imgName: files[i].name, imgSrc: URL.createObjectURL(files[i])};
            fileItems.imgSrcFiles.push(item); //追加型に
          }
        }
      }
    }

    const test1 = () => {
      console.log("FormLocalImageS.test1");
    };
    const test2 = () => {
      console.log("FormLocalImageS.test2");
    };


    return {
      uploadToBrows,
      refSelectFile,
      previewImgSrc,
      previewClose,
      deleteImage,
      clearThumbnails,

      //モーダル系
      showModalFlag,
      closeModal,
      openModal,

      //ファイルドラッグ＆ドロップ系
      dragEnter,
      dragLeave,
      dropFile,
      isDragEnter,

      fileItems,
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
/* サムネイルエリア */
#area-thumb {

}
/* モーダルエリア */
#area-modal {

}
/* ファイル選択 */
#file-box {
  clear: both;
  float: left;
}
/* サムネイル全クリア */
#clear-thumbnails-btn {
  clear: both;
  float: left;
}
</style>

