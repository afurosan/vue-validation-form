<template>
  <tr>
    <td>{{ user.id }}</td>
    <td v-if="!isEdit">{{ user.name }}</td>
    <td v-else><input type="text" :value="user.name" @input="fs.name=$event.target.value"></td>
    <td v-if="!isEdit">{{ user.email }}</td>
    <td v-else><input type="text" :value="user.email" @input="fs.email=$event.target.value"></td>
    <td v-if="!isEdit"><button :disabled="isEdit" type="button" @click="isEdit=true">修正</button></td>
    <td v-else><button :disabled="!isEdit" type="button" @click="correctuser($event,index)">修正登録</button></td>
    <td v-if="isEdit"><button type="button" @click="isEdit=false">キャンセル</button></td>
  </tr>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
export default {
  name: "FormDetails2",
  props:['user','index','key'],

  setup(props: any, context: any){
    const fs = reactive(props.user);
    const isEdit = ref(false);

    const correctuser = (event: any,i:number) => {
      context.emit('update', fs, i);
      isEdit.value = false;
    };

    return {
      isEdit,
      correctuser,
      fs,
    }
  }
}
</script>

<style scoped>

</style>