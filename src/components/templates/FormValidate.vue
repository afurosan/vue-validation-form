<template>
  <form @submit="onSubmitClick">
    <!-- <Form
      @submit="onSubmitClick"
      :validation-schema="schema"
      v-slot="{ values }"
    > -->
    <custom-input v-bind="ccArray.name.attributes" />
    <custom-input v-bind="ccArray.mail.attributes" />
    <custom-input v-bind="ccArray.password.attributes" />
    <custom-input v-bind="ccArray.confirm_password.attributes" />
    <custom-select
      :options="prefecture"
      v-bind="ccArray.prefecture.attributes"
    />
    <custom-radio :options="sex" v-bind="ccArray.sex.attributes" />
    <custom-check-box
      :options="favorites"
      v-bind="ccArray.favorites.attributes"
    />
    <!-- <custom-button @onSubmitClick="onSubmitClick" :disabled="false"
        >登録</custom-button
      > -->
    <!-- <custom-check-box-2 v-bind="ccArray.drinks.attributes" value="1" />
      <custom-check-box-2 v-bind="ccArray.drinks.attributes" value="2" />
      <custom-check-box-2 v-bind="ccArray.drinks.attributes" value="3" /> -->
    <custom-button type="submit" :disabled="!meta.valid"
      >送信する</custom-button
    >
    <p>{{ values }}</p>
    <p>{{ meta }}</p>
    <!-- </Form> -->
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Form, useForm, useField } from "vee-validate";
import * as Yup from "yup";

import { CustomControl } from "@/components/classes/CustomControl";
import CustomInput from "@/components/atoms/CustomInput.vue";
import CustomSelect from "@/components/atoms/CustomSelect.vue";
import CustomRadio from "@/components/atoms/CustomRadio.vue";
import CustomCheckBox from "@/components/atoms/CustomCheckBox.vue";
import CustomButton from "@/components/atoms/CustomButton.vue";
import CustomCheckBox2 from "../atoms/CustomCheckBox2.vue";
//import { Member } from "@/Member";

export default defineComponent({
  name: "FormValidate",
  components: {
    // Form,
    CustomInput,
    CustomButton,
    CustomSelect,
    CustomRadio,
    CustomCheckBox,
    // CustomCheckBox2,
  },
  props: {},
  setup() {
    // const member = ref(new Member());

    const cName = new CustomControl(
      "name",
      "text",
      "名前",
      "名前を入力します",
      "あ"
    );
    const cMail = new CustomControl(
      "mail",
      "email",
      "メールアドレス",
      "メールアドレスを入力します",
      "a@a.co.jp"
    );
    const cPassword = new CustomControl(
      "password",
      "password",
      "パスワード",
      "パスワードを入力します",
      "aaaaaa"
    );
    const cConfirmPassword = new CustomControl(
      "confirm_password",
      "password",
      "パスワード",
      "パスワードを入力します",
      "aaaaaa"
    );
    const cPrefecture = new CustomControl(
      "prefecture",
      "",
      "都道府県",
      "",
      "2"
    );
    const cSex = new CustomControl("sex", "radio", "性別", "", "");
    const cFavorites = new CustomControl("favorites", "checkbox", "趣味", "");

    const cDrinks = new CustomControl("drinks", "checkbox", "飲み物");

    const ccArray: { [key: string]: CustomControl } = {};
    ccArray[cName.name] = cName;
    ccArray[cMail.name] = cMail;
    ccArray[cPassword.name] = cPassword;
    ccArray[cConfirmPassword.name] = cConfirmPassword;
    ccArray[cPrefecture.name] = cPrefecture;
    ccArray[cSex.name] = cSex;
    ccArray[cFavorites.name] = cFavorites;
    ccArray[cDrinks.name] = cDrinks;

    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   mail: Yup.string().email().required(),
    //   password: Yup.string().min(6).required(),
    //   confirm_password: Yup.string()
    //     .required()
    //     .oneOf([Yup.ref("password")]),
    //   prefecture: Yup.string().required(),
    //   sex: Yup.string().required(),
    //   // favorites: Yup.array(),
    // });

    const schema = Yup.object({
      name: Yup.string().required(),
      mail: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")]),
      prefecture: Yup.string().required(),
      sex: Yup.string().required(),
      // favorites: Yup.array(),
    });

    const { values, meta, handleSubmit } = useForm({
      validationSchema: schema,
      // initialValues: initialValues,
    });

    // const onSubmitClick = (values: string): void => {
    //   console.log(JSON.stringify(values));
    //   //console.log(values);
    // };
    const onSubmitClick = handleSubmit((v, { resetForm }) => {
      console.log(v);

      // resetForm();
    });

    interface KeyValue {
      id: string;
      name: string;
    }

    const prefecture: Array<KeyValue> = [
      { id: "", name: "都道府県を選択" },
      { id: "1", name: "北海道" },
      { id: "2", name: "東京" },
      { id: "3", name: "福岡" },
    ];

    const sex: Array<KeyValue> = [
      { id: "1", name: "女性" },
      { id: "2", name: "男性" },
      { id: "3", name: "LGBT" },
    ];

    const favorites: Array<KeyValue> = [
      { id: "a", name: "テニス" },
      { id: "b", name: "サッカー" },
      { id: "c", name: "野球" },
    ];

    return {
      ccArray,
      prefecture,
      sex,
      favorites,
      onSubmitClick,
      schema,
      // water,
      // coffee,
      // tea,
      values,
      meta,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
