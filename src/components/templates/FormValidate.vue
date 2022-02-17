<template>
  <form @submit="onSubmitClick">
    <!-- <Form
      @submit="onSubmitClick"
      :validation-schema="schema"
      v-slot="{ values }"
      v-model="values.favorites"
       v-model="values.sex"
    > -->
    <custom-input v-bind="ccArray.name.attributes" />
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

  <button @click="openModal">商品追加</button>
  <popup-item v-show="showContent" @from-child="closeModal" @addDetail="addItem">
    商品追加
  </popup-item>

  <table border="1">
    <thead>
    <tr>
      <td>No</td>
      <td>なまえ</td>
      <td>数量</td>
      <td>機能</td>
    </tr>
    </thead>
    <tbody>
    <form-details  v-for="(item,idx) in items" :item="item" :key="item.key" :index="idx"
                 @cupdate="updateData" @cremove="removeData" @cedit="editMode">
    </form-details>
    </tbody>
  </table>
  <custom-button type="submit" :disabled="!meta.valid">
    >送信する</custom-button
  >
        <p>{{ errors }}</p>
        <p>{{ values }}</p>
        <p>{{ meta }}</p>
  </form>

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
import PopupItem from "@/components/templates/PopupItem.vue";
export default defineComponent({
  name: "FormValidate",
  components: {
    PopupItem,
    //CustomCheckBoxes,
    // Form,
    CustomInput,
    CustomButton,
    CustomSelect,
    CustomRadio,
    CustomCheckBox,
    // CustomMultiInput,
    // ErrorMessage,
    // Field,
    FormDetails,

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
      items: Yup
          .array()
          .required()
          .min(1)
          .of(
              Yup.object({
                name: Yup.string().required().label("名前"),
                quantity: Yup.number().required().min(3).label("数量"),
              })
          ),
    });

    const { errors, values, meta, handleSubmit } = useForm({
      validationSchema: schema,
      // initialValues: initialValues,
    });

    const { fields: items, push, remove, update } = useFieldArray("items");

    const onSubmitClick = handleSubmit((v, { resetForm }) => {
      console.log(v);
      resetForm();
    });

   //  // vue2共通
   // // 明細にデータを追加したい
   //  const details = reactive({
   //    header: ["ID", "商品名", "枝番名", "価格", ""],
   //    items: [
   //      { id: 1, name: "ダニエルウェリントン", branch_name: "34mm シルバー", price: 15000 },
   //      { id: 2, name: "フォッシル", branch_name: "40mm ブラック", price: 10000 },
   //      { id: 3, name: "スカーゲン", branch_name: "40mm ブラック", price: 18000 },
   //    ],
   //  });
   //
   //  // vue2共通
   //  const addItem = () => {
   //    details.items.push({
   //      id: 4,
   //      name: "ポールスミス",
   //      branch_name: "42mm シルバー",
   //      price: 23000,
   //    });
   //  };

    // vue2形式
    //const removeItem = (index) => {
    //      details.items.splice(index, 1);

    // {index:number}をつけないと、TS7031：暗黙anyエラー
    // const removeItem = (index: {index:number}) => {
    //       details.items.splice(1, 1);};
    //
    // const name = ref('鈴木三郎')
    // const email = ref('suzuki3@abc.co.jp')
    // const tel = ref('090-3333-3333')


    const errorMessage = ref("")

    // const adduser = () => {
    //   //連想配列の追加
    //     errorMessage.value="";
    //     schema2.validate(userItems).then( v => {
    //     console.log('then',v);
    //     let item = { name: userItems.item_name, email: userItems.item_email };
    //     userItems.user.push(item);
    //     userItems.item_name = "";
    //     userItems.item_email = "";
    //   })
    //   .catch(error => {
    //     console.log('catch',error.errors);
    //     console.log('catch1', !Object.keys(userItems['user']).length);
    //     errorMessage.value=error.errors[0];
    //   });
    // };

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

    const showContent=ref(false);

    const updateData = (item: any, quantity: number, idx: number) => {
      console.log("updateData");
      console.log(values);
      // let upd={name:values.name, email:values.email};
      let upitem={id:item.id, name:item.name, quantity:quantity, isedit:false};
      update(idx, upitem);
      console.log("updateData success");
    };

    const removeData = (idx: number) =>{
      remove(idx);
    };

    const editMode = (item: any, flg: number, idx: number) => {
      let upitem={id:item.id, name:item.name, quantity:item.quantity,
        isedit:(flg===0 ? false: true)};
      update(idx, upitem);
    };

    const openModal = () => showContent.value = true;
    const closeModal = () => showContent.value = false;
    const addItem = (value:any) =>{
      push(value);
    };

    return {
      errors,
      ccArray,
      prefecture,
      sex,
      favorites,
      onSubmitClick,
      schema,
      values,
      meta,
      items,
      push,
      remove,
      updateData,
      editMode,
      removeData,
      errorMessage,
      showContent,
      openModal,
      closeModal,
      addItem,
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
