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
    <fieldset
      class="InputGroup"
      v-for="(field, idx) in fields"
      :key="field.key"
    >
      <legend>User #{{ idx }}</legend>
      <label :for="`name_${idx}`">Name</label>
      <Field :id="`name_${idx}`" :name="`users[${idx}].username`" />
      <p><ErrorMessage :name="`users[${idx}].username`" /></p>
      <label :for="`email_${idx}`">Email</label>
      <Field
        :id="`email_${idx}`"
        :name="`users[${idx}].useremail`"
        type="email"
      />
      <p><ErrorMessage :name="`users[${idx}].useremail`" /></p>
      <button type="button" @click="remove(idx)">x</button>
    </fieldset>
    <button type="button" @click="push({ useremail: '', username: '' })">
      Add User +</button
    ><br /><br />
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
import {
  // Form,
  useForm,
  // useField,
  useFieldArray,
  ErrorMessage,
  Field,
} from "vee-validate";
import * as Yup from "yup";

import {
  CustomControl,
  ControlAttribute,
} from "@/components/classes/CustomControl";
import CustomInput from "@/components/atoms/CustomInput.vue";
import CustomSelect from "@/components/atoms/CustomSelect.vue";
import CustomRadio from "@/components/atoms/CustomRadio.vue";
import CustomCheckBox from "@/components/atoms/CustomCheckBox.vue";
import CustomButton from "@/components/atoms/CustomButton.vue";
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
    ErrorMessage,
    Field,
  },
  props: {},
  setup() {
    // const member = ref(new Member());
    let ca: ControlAttribute = {
      name: "name",
      type: "text",
      label: "名前",
      placeholder: "名前を入力します",
      initialValue: "あ",
    };
    const cName = new CustomControl(ca);

    ca = {
      name: "mail",
      type: "email",
      label: "メールアドレス",
      placeholder: "メールアドレスを入力します",
      initialValue: "a@a.co.jp",
    };
    const cMail = new CustomControl(ca);

    ca = {
      name: "password",
      type: "password",
      label: "パスワード",
      placeholder: "パスワードを入力します",
      initialValue: "aaaaaa",
    };
    const cPassword = new CustomControl(ca);

    ca = {
      name: "confirm_password",
      type: "password",
      label: "パスワード",
      placeholder: "パスワードを入力します",
      initialValue: "aaaaaa",
    };
    const cConfirmPassword = new CustomControl(ca);

    ca = {
      name: "prefecture",
      label: "都道府県",
      initialValue: "2",
    };
    const cPrefecture = new CustomControl(ca);

    ca = {
      name: "sex",
      type: "radio",
      label: "性別",
      initialValue: "",
    };
    const cSex = new CustomControl(ca);

    ca = {
      name: "favorites",
      type: "checkbox",
      label: "趣味",
      initialValue: "",
    };
    const cFavorites = new CustomControl(ca);

    const ccArray: { [key: string]: CustomControl } = {};
    ccArray[cName.name] = cName;
    ccArray[cMail.name] = cMail;
    ccArray[cPassword.name] = cPassword;
    ccArray[cConfirmPassword.name] = cConfirmPassword;
    ccArray[cPrefecture.name] = cPrefecture;
    ccArray[cSex.name] = cSex;
    ccArray[cFavorites.name] = cFavorites;

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
      users: Yup.array().of(
        Yup.object({
          username: Yup.string().required().label("name"),
          useremail: Yup.string().email().required().label("email"),
        })
      ),
    });

    // //  初期値の設定
    // const initialValues = {
    //   users: [{ username: "", useremail: "" }],
    // };

    const { values, meta, handleSubmit } = useForm({
      validationSchema: schema,
      // initialValues: initialValues,
    });

    const { fields, push, remove } = useFieldArray("users");

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
      values,
      meta,
      fields,
      push,
      remove,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}
.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
