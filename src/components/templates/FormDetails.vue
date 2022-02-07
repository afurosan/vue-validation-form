<template>
  <tr v-show="index!=0">
    <td>{{ index }}</td>
    <td>{{ item.name }}</td>
    <td v-if="!isEdit">{{ item.quantity }}</td>
    <td v-else><input type="number" :value="fs.quantity" @input="fs.quantity=$event.target.value"></td>
    <td v-if="!isEdit"><button :disabled="isEdit" type="button" @click="isEdit=true">修正モード</button></td>
    <td v-else><button :disabled="!isEdit" type="button" @click="correctNum($event, index)">修正登録</button>
    <button type="button" @click="isEdit=false">キャンセル</button></td>
  </tr>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  name: "FormDetails",
  props:['item','key','index'],


  setup(props:any, context:any) {
    const fs = reactive(props.item);
    // const removeItem = (i:number) => {fs.user.splice(i,  1)};
    //
    // function correctItem(i: number){
    //   context.emit('onDataSet',fs.user[i],i);
    //   console.log(fs.user[i].name);
    // }
    const isEdit = ref(false);

    const correctNum = (event:any,i:number) => {
      console.log(isEdit.value);
      console.log(fs.quantity);

      context.emit('update', fs, i);
      isEdit.value = false;
    };

    return {
      isEdit,
      correctNum,
      fs,
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