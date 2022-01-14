<template>
  <!-- スロットにいれてみる -->
  <base-image>

    <template #control>


      <!-- div>{{ altMsg }}</div--> 
      <!-- 画像表示エリア -->
      <div class="BoxArea" v-if="imgUrl"> <!-- URLがセットされているかどうかで表示・非表示を切り替えてみる -->

        <!--  Vuetifyのv-imgてすと
          <div>
            <v-img :src="imgUrl" max-height="100" max-width="100" > </v-img>
          </div>
        -->


        <!-- ボタン表示 -->
        <div class="BoxFuncs">
          <button class="FncBtn" @click="hideImage">閉じる</button>
          <button class="FncBtn" @click="zoom1">50%</button>
          <button class="FncBtn" @click="zoom2">100%</button>
          <button class="FncBtn" @click="zoom3">150%</button>
          <input class="FncBtn" type="color" v-model="backColor">
        </div>

        <!-- イメージ表示 -->
        <div class="BoxImgView">
          <img class="BoxImage" :alt="altMsg" :src="imgUrl" ref="refImg" >
        </div>

      </div>
    </template>

  </base-image>  

</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import BaseImage from '@/components/atoms/BaseImage.vue'; 

export default defineComponent({
  name: "CustomImgPreview",
  inheritAttrs: false,
  components: { BaseImage },
  props:{
    altMsg: String,       
    imgUrl: String,        
  },

  setup(props, context) {

    //イメージの情報を取って何かする
    //const refImg = ref(null);             // 今までの書き方
    //const refImg = ref<HTMLImageElement>(); // TSで型を指定するならこれかな？


    //背景の色
    const backColor = ref("#E0E0E0");
//  const backColor = ref("#7b2d43");


    //ズーム系 styleタグ内でv-bind用 (値は適当)
    const zoom = ref<"30%" | "50%" | "100%">("100%");
    //ズームボタンイベント用
    const zoom1 = (): void => {
      zoom.value="30%";
    }
    const zoom2 = (): void => {
      zoom.value="50%";
    }
    const zoom3 = (): void => {
      zoom.value="100%";
    }


    //表示された画像表示エリアを非表示にする
    const hideImage = (): void => {
        //イメージなので後処理とかあったら。 
        // 同じ名前で 子 → 親へと続かせておくが、
        //このコンポーネントは imgUrl がないとき非表示にしているので、
        //ここでは とくにやることはない。 親にemitしておく。
        console.log("hideImage CustomImgPreview");
        context.emit("hide-image");

    };

    return {
      hideImage,
      backColor,
      zoom,
      zoom1,
      zoom2,
      zoom3,
    }
  },
});
</script>



<style scoped>

.BoxArea {
}
.BoxImgView {
  max-width: 100%;
  border: 6px solid #AAAAAA;
  background-color: v-bind(backColor); /* styleタグ内でv-bindしてみる */
  /* overflow: hidden; */
  overflow: scroll; 
}

.BoxImage {
  width: v-bind("zoom");  /* styleタグ内でv-bindパターン２ */
  border: 6px solid #FF0000;
/*  width: v-bind('zoom==="50%" ? "50%" : "20%"'); */
/*  width: v-bind('zoom==="50%" ? "50%" : (zoom==="200%" ? "200%" : "100%")'); */


/*  width: 50%; */
  /*
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;*/
}
.BoxFuncs {
}
.FncBtn {
  width: 80px;
  Height: 36px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #68779a;
  background: #254060;;
  color: #FFFFFF;
  cursor: pointer;
  vertical-align: middle;
}
</style>
