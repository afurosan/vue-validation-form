<template>
  <form @submit.prevent="onSubmit">
    <div id="overlay" @click="clickEvent">
      <div id="content" @click="stopEvent">
        <p><slot></slot></p>
        <ol>
          <li>
            <label for="item">商品</label>
            <input id="item" type="text" v-model="name" />
            <p>{{ errors.name }}</p>
          </li>
          <li>
            <label for="count">数量</label>
            <input id="count" type="number" v-model="quantity">
            <p>{{ errors.quantity }}</p>
          </li>
        </ol>
        <button @click="clickEvent" type="button">キャンセル</button>
        <button type="submit" :disabled="!meta.valid">追加</button>
      </div>
    </div>
  </form>
</template>

<script type="ts">
import {useField, useForm} from 'vee-validate';
import * as Yup from 'yup';
import {ref} from 'vue';
export default {
  name: "PopupItem",

  setup(props,context){
    // 順番も大事。先にuseField持ってきたら機能しなかった
    const schema = Yup.object({
      name:Yup.string().required("必須入力です"),
      quantity:Yup.number().required("必須入力です").min(1,"1以上を入力してください"),
    });
    // 初期値
    const formValues = {
      name:'名前',
      quantity:1,
      isedit:false,
    };
    const { errors, meta, handleSubmit, isSubmitting } = useForm({
      validationSchema:schema,
      initialValues:formValues,
    })
    const onSubmit = handleSubmit((values, { resetForm }) => {
      console.log("submit");
      console.log(values);
      let detail={name:name.value, quantity:quantity.value};
      context.emit('addDetail',detail);
      context.emit('from-child');
      resetForm();
    });
    const { value: name } = useField('name');
    const { value: quantity, handleChange } = useField('quantity');
    const { value: isedit } = useField('isedit')

    const stopEvent = () => event.stopPropagation();
    const clickEvent = () => {
      context.emit('from-child');
    }

    return{
      errors,
      meta,
      onSubmit,
      stopEvent,
      clickEvent,
      name,
      quantity,
      isedit,
    }
  }
}
</script>

<style scoped>
#overlay{
  /* 要素を重ねた時の順番 */
  z-index:1;

  /* 画面全体を覆う設定 */
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  justify-content: center;

}
#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>