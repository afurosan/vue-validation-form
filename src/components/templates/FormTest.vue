<template>
  <form @submit="onSubmit">
    <div>
      <div>
        <input type="checkbox" v-model="water" />Water
        <input type="checkbox" v-model="coffee" />Coffee
        <input type="checkbox" v-model="tea" />Tea
      </div>
      <button type="submit">送信</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "FormTest",
  props: {},
  setup() {
    const validationSchema = yup.object({
      drink: yup.object({
        water: yup.boolean().label("Water"),
        coffee: yup.boolean().label("Coffee"),
        tea: yup.boolean().label("Tea"),
      }),
    });

    const {
      errors,
      //  入力データを取得できる
      handleSubmit,
    } = useForm({
      validationSchema: validationSchema,
      //   initialValues: initialValues,
    });

    const { value: water } = useField("drink.water");
    const { value: coffee } = useField("drink.coffee");
    const { value: tea } = useField("drink.tea");

    //  submitの処理
    const onSubmit = handleSubmit(async (v, { resetForm }) => {
      console.log(v);
      resetForm();
    });
    return {
      validationSchema,
      errors,
      water,
      coffee,
      tea,

      onSubmit,
    };
  },
});
</script>

<style></style>
