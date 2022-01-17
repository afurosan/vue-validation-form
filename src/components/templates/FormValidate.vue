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

<!--    <custom-check-box
      :options="favorites"
      v-bind="ccArray.favorites.attributes"
      v-model="values.favorites"
    />-->

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
    <button type="button" @click="push({ useremail: '', username: '' })">
      Add User +</button
    ><br /><br />

    <div>
      <p>コンポーネント間のデータの受け渡し</p>
      <input v-model="userItems.item_name" title="名前" style="margin-right: 5px"/>
      <input v-model="userItems.item_email" title="メール" style="margin-right: 5px"/>
      <button @click="adduser">ユーザー追加</button>
      <hr />

      <FormDetails
          :user-items="userItems"
      ></FormDetails>

    </div>

    <custom-button type="submit" :disabled="!meta.valid"
      >送信する</custom-button
    >
    <p>{{ values }}</p>
    <p>{{ meta }}</p>
    <!-- </Form> -->
  </form>

  <CustomMultiInput v-model:name="name" v-model:email="email" v-model:tel="tel"/>

  <div>
    <h4>明細追加テスト</h4>
    <hr />
    <div>
      <p>明細にデータを追加します。</p>

      <table border="2">
        <thead>
        <tr>
          <th v-for="(header, index) in details.header" :key="index">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in details.items" :key="index">
          <td v-for="(value, index) in item" :key="index">{{ value }}</td>
          <td><button @click="removeItem(index)">削除</button></td>
        </tr>
        </tbody>
      </table>
      <button @click="addItem" style="margin: 10px">明細追加</button>

    </div>
  </div>


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
//import CustomCheckBoxAdd from "@/components/atoms/CustomCheckBoxAdd.vue";
//import {boolean} from "yup";
//import CustomCheckBoxes from "@/components/atoms/CustomCheckBoxesAdd.vue";
//import { Member } from "@/Member";

import CustomMultiInput from "@/components/atoms/CustomMultiInput.vue"
import FormDetails from "@/components/templates/FormDetails.vue";

export default defineComponent({
  name: "FormValidate",
  components: {
    //CustomCheckBoxes,
    // Form,
    CustomInput,
    CustomButton,
    CustomSelect,
    CustomRadio,
    CustomCheckBox,
    CustomMultiInput,
    ErrorMessage,
    Field,
    FormDetails,
  },
  props: {},
  setup() {
    // const member = ref(new Member());
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
      favorites: Yup.array().min(1).required(),
      users: Yup.array().of(
        Yup.object({
          username: Yup.string().required().label("name"),
          useremail: Yup.string().email().required().label("email"),
        })
      ),
    });

    const schema2 = Yup.object().shape({
      item_name: Yup.string().required(),
      item_mail: Yup.string().required(),
    })
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

   // vue2共通
   // 明細にデータを追加したい
    const details = reactive({
      header: ["ID", "商品名", "枝番名", "価格", ""],
      items: [
        { id: 1, name: "ダニエルウェリントン", branch_name: "34mm シルバー", price: 15000 },
        { id: 2, name: "フォッシル", branch_name: "40mm ブラック", price: 10000 },
        { id: 3, name: "スカーゲン", branch_name: "40mm ブラック", price: 18000 },
      ],
    });

    // vue2共通
    const addItem = () => {
      details.items.push({
        id: 4,
        name: "ポールスミス",
        branch_name: "42mm シルバー",
        price: 23000,
      });
    };

    // {index:number}をつけないと、TS7031：暗黙anyエラー
    const removeItem = (index: {index:number}) => {
          details.items.splice(1, 1);};

    const name = ref('鈴木　三郎')
    const email = ref('suzuki3@abc.co.jp')
    const tel = ref('090-3333-3333')

    const userItems = reactive({
      header: ["ID", "名前", "メール", ""],
      item_name: "",
      item_email: "",
      user: [
        { name: "鈴木　一郎", email: "suzuki@abc.co.jp"},
        { name: "佐藤　二郎", email: "satou@abc.co.jp"},
      ],
    });

    const adduser = () => {
      //連想配列の追加
      schema2.validate(userItems).then( v => {
        console.log('then',v);
        let item = { name: userItems.item_name, email: userItems.item_email };
        userItems.user.push(item);
        userItems.item_name = "";
        userItems.item_email = "";
      })
      .catch(error =>{
        console.log('catch',"");

      });

       // let item = { name: userItems.item_name, email: userItems.item_email };
       // userItems.user.push(item);
       // userItems.item_name = "";
       // userItems.item_email = "";
    };


    // vue2形式
    //const removeItem = (index) => {
    //      details.items.splice(index, 1);

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
      details,
      addItem,
      removeItem,
      name,
      email,
      tel,
      userItems,
      adduser,
      schema2,
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
