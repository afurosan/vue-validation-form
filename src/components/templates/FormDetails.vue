<template>
  <tr>
    <td>{{ index+1 }}</td>
    <td>{{ item.value.name }}</td>
    <td v-if="!item.value.isedit">{{ item.value.quantity }}</td>
    <td v-else><input v-model="quantity" type="number" /></td>
    <td v-if="!item.value.isedit">
      <button type="button" @click="childremove(index)">削除</button>
      <button :disabled="item.value.isedit" type="button" @click="childedit(item.value,1, index)">修正モード</button>
    </td>
    <td v-else>
      <button :disabled="!meta.valid" type="button" @click="childupdate(item.value, quantity, index)">修正</button>
      <button type="button" @click="childedit(item.value,0, index)">キャンセル</button>
    </td>
  </tr>
</template>

<script lang="ts">
import {Field, useField, useForm} from "vee-validate";
import * as Yup from 'yup';

export default {
  name: "FormDetails",
  props:['item','key','index'],


  setup(props:any, context:any) {
    // バリデーションルール
    const schema = Yup.object({
      quantity:Yup.number().required().min(3),  // とりあえず3以上
    });
    // 初期値
    const formValues = {
      quantity:props.item.value.quantity,
    };
    const { errors, meta } = useForm({
      validationSchema:schema,
      initialValues:formValues,
    })

    const { value:quantity } = useField('quantity' );

    // 削除
    const childremove = (index: number) =>{
      context.emit('cremove', index);
    };
    // 修正
    const childupdate = (data: any, quantity: number, idx:number) =>{
      console.log("childupdate");
      context.emit('cupdate', data, quantity, idx);
    };
    // モードチェンジ
    const childedit = (data:any, flg:number, idx:number) => {
      // キャンセルのときは、修正前の値に戻す。他にやり方ありそう・・・
      if (flg===0){ quantity.value = data.quantity }
      context.emit('cedit', data, flg, idx)
    };

    return {
      errors,
      meta,
      quantity,
      childedit,
      childremove,
      childupdate,
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