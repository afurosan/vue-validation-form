<template>
  <div class="BoxMain">

    <div>{{ topMsg }}</div>

    <!-- 子コントロール -->
    <CustomImgPreview
        :alt-msg="altMsg"
        :img-url="urlInBrows"
        @hide-image="hideImage"
    ></CustomImgPreview>

    <!-- ファイル選択ボタン -->
    <input type="file" ref="refSelectFile" @change="uploadToBrows" class="fsel">

  </div>  
</template>

<script>
import { ref } from 'vue';
import CustomImgPreview from '@/components/atoms/CustomImgPreview.vue';
export default {
  name: "FormLocalImage",
  inheritAttrs: false,
  components: {
      CustomImgPreview
  },
  props:{
      topMsg: String,        
      altMsg: String,        
  },

  setup(props, context) {
    
    //ファイル選択ボタンのrefを取る
    //Composition APIでは$refsで取得しない？
    const refSelectFile = ref(null);             // 今までの書き方
    //const refSelectFile = ref<HTMLInputElement>(); // TSで型を指定するならこれかな？
    
    // 画像のURL（ブラウザ内の一時的なもの)
    const urlInBrows = ref(""); 
    
    //ファイル選択ボタンでファイル選択された
    const uploadToBrows = () => {

        //先頭ファイル情報を取り出す
        const file = refSelectFile.value.files[0];

        //ファイル情報から一時的なブラウザ内のURLへ変換
        urlInBrows.value = URL.createObjectURL(file);
       
        //console.log(urlInBrows);
    };

    //表示された画像表示エリアを非表示にする
    const hideImage = () => {
        //URLをクリアする（URLの有無で表示・非表示を切り替えてる)
        urlInBrows.value ='';
        
        //作成した一時的なブラウザ内のURLを開放しておく
        URL.revokeObjectURL('');

        // 閉じるで非表示にした後、同じ画像を選択されても表示できない対処。
        refSelectFile.value.value = "";

        console.log("hideImage FormLocalImage");

        alert("とじた！");

    };


    return {
      uploadToBrows,
      refSelectFile,
      urlInBrows,
      hideImage,
    }
  },
}
</script>

<style scoped>
.fsel {
  /*
  text-align: left;
  float:left; */
}

.BoxMain {
  border: 6px solid #254060;
  overflow: scroll; 

}

</style>

