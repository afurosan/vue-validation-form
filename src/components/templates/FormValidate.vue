<template>
  <form @submit="onSubmitClick">
    <!-- <Form
      @submit="onSubmitClick"
      :validation-schema="schema"
      v-slot="{ values }"
      v-model="values.favorites"
       v-model="values.sex"
    > -->
    <custom-input v-bind="ccArray.name.attributes" @input="ccArray.name.value" />
    <custom-input v-bind="ccArray.mail.attributes" />
    <custom-input v-bind="ccArray.password.attributes" />
    <custom-input v-bind="ccArray.confirm_password.attributes" />
    <custom-select
      :options="prefecture"
      v-bind="ccArray.prefecture.attributes"
    />
    <!-- v-model="values.sex" を追加> -->
    <custom-radio :options="sex" v-bind="ccArray.sex.attributes" />

    <!-- v-model="values.favorites" を追加 > -->
    <custom-check-box
        :options="favorites"
        v-bind="ccArray.favorites.attributes"
        v-model="values.favorites"
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
<!--        <button type="button" @click="push({ useremail: '', username: '' })">Add User +</button><br /><br />-->

    <div>
        <button @click="adduser" type="button">ユーザー追加</button>

      <hr />

      <FormDetails
          :user-items="fields" :field-items="ccArray"
          :child-correct-flg="parentCorrectFlg"
      ></FormDetails>




    </div>


<!--    <custom-button type="submit" :disabled="!meta.valid || !Object.keys(fields['user']).length">-->
<!--      >送信する</custom-button-->
<!--    >-->
<!--    <p>{{ccArray}}</p>-->
<!--    <p>{{ values }}</p>-->
<!--    <p>{{ meta }}</p>-->
    <!-- </Form> -->
  </form>

<!--  <CustomMultiInput v-model:name="name" v-model:email="email" v-model:tel="tel"/>-->

</template>

<script lang="ts">

// vue2での参照方法
//import { reactive } from "@vue/composition-api";
// vue3での参照方法
//import { reactive } from "vue"

import {defineComponent, ref,reactive,  vModelCheckbox} from "vue";
import {
  // Form,
  useForm,
  useField,
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
//import CustomCheckBoxAdd from "@/components/atoms/CustomCheckBoxAdd.vue";
//import {boolean} from "yup";
//import CustomCheckBoxes from "@/components/atoms/CustomCheckBoxesAdd.vue";
//import { Member } from "@/Member";

import CustomMultiInput from "@/components/atoms/CustomMultiInput.vue"
import FormDetails from "@/components/templates/FormDetails.vue";
import FormDetails2 from "@/components/templates/FormDetails2.vue";
export default defineComponent({
  name: "FormValidate",
  components: {
    //CustomCheckBoxes,
    // Form,
    CustomInput,
    // CustomButton,
    CustomSelect,
    CustomRadio,
    CustomCheckBox,
    // CustomMultiInput,
    // ErrorMessage,
    // Field,
    FormDetails,
    // FormDetails2,

  },
  props: {},
  setup() {
    let ca: ControlAttribute = {
      name: "name",
      type: "text",
      label: "名前",
      placeholder: "名前を入力します",
      initialValue: "あいう",
    };
    const cName = new CustomControl(ca);

    ca = {
      name: "mail",
      type: "email",
      label: "メールアドレス",
      placeholder: "メールアドレスを入力して下さい",
      initialValue: "abc@a.co.jp",
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
      initialValue: "1",
    };
    const cPrefecture = new CustomControl(ca);

    ca = {
      name: "sex",
      type: "radio",
      label: "性別",
      initialValue:"2",
    };
    const cSex = new CustomControl(ca);

    ca = {
      name: "favorites",
      type: "checkbox",
      label: "趣味",
      initialValues: ['c'],
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
      favorites: Yup.array().required(),
      users: Yup.array().of(
        Yup.object({
          username: Yup.string().required().label("name"),
          useremail: Yup.string().email().required().label("mail"),
        })
      ),
    });

    // コンポーネント化した明細入力関連
     const schema2 = Yup.object({
        item_name: Yup.string().required('名前は入力必須です。'),
        item_email: Yup.string().email('メール形式が不正です。').required('メールは入力必須です。'),
     });

    const { values, meta, handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { fields, push, remove, update } = useFieldArray("users");

    const onSubmitClick = handleSubmit((v, { resetForm }) => {
      console.log(v);
      // resetForm();
    });

    const errorMessage = ref("")

    const adduser = () => {
      // console.log(values);
      const additem={name:"aaa",mail:"bbb",password:"aaa",confirm_password:"aaa",prefecture:"1",
        sex:"2", favorites:"['a']"};
      push(additem);
    }


    interface KeyValue {
      id: string;
      name: string;
    }

    /*interface KeyValue2 {  初回ボツ案
      id: string;
      name: string;
      option: boolean;
    }
*/
    const prefecture: Array<KeyValue> = [
      { id: "", name: "都道府県を選択" },
      { id: "1", name: "北海道" },
      { id: "2", name: "東京" },
      { id: "3", name: "福岡" },
    ];

    const sex: Array<KeyValue> = [
      { id: "1", name: "女性"},
      { id: "2", name: "男性"},
      { id: "3", name: "LGBT"},
    ];

    /*const sex: Array<KeyValue2> = [ 初回ボツ案
      { id: "1", name: "女性", option:true },
      { id: "2", name: "男性", option:false},
      { id: "3", name: "LGBT", option:false},
    ];*/

    const favorites: Array<KeyValue> = [
      { id: "a", name: "テニス" },
      { id: "b", name: "サッカー" },
      { id: "c", name: "野球" },
    ];

    let midx=ref(-1);
    let parentCorrectFlg=ref(0);

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
      adduser,
      schema2,
      errorMessage,
      // dataSet,
      midx,
      parentCorrectFlg,
      // correctuser,
      // canceluser,
      // // users,
      // corUser,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ErrorMessage{
  color: #FF0000;
}
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
