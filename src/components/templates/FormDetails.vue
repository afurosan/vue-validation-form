<template>
  <div>
    <p>子コンポーネント</p>
      <ol>
        <!-- keyにはindexをつける -->
          <li v-for="(header, index) in userItems.header" :key="index">
            {{ header }}
          </li>
          <li v-for="(user, index) in userItems.user" :key="index">
            {{ user.name }} {{ user.email }}
            <button :disabled="!(childCorrectFlg === 0)" @click="removeItem(index)">削除</button>
            <button :disabled="!(childCorrectFlg === 0)" @click="correctItem(index)">修正</button>
          </li>
      </ol>
    <br />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { reactive } from 'vue'
export default {
  name: "FormDetails",
  props: {
    userItems: {
      type: Object,
    },
    value: {
      type: Number,
    },
    childCorrectFlg:{
      type: Number,
      default:0,
    }
  },


  setup(props:any, context:any) {
    const fs = reactive(props.userItems);
    const removeItem = (i:number) => {fs.user.splice(i,  1)};

    function correctItem(i: number){
      context.emit('onDataSet',fs.user[i],i);
      console.log(fs.user[i].name);
    }

    return {
      removeItem,
      correctItem,
    };
  },
};
</script>

<style scoped>
ol {
  border: 2px tan solid;
  padding: 0;
}
li {
  line-height: 2em;
  border-bottom: 1px solid tan;
  list-style-position: inside;
  padding-left: 15px;
}
</style>