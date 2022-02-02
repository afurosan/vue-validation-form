<template>
  <table border="2">
    <thead>
    <tr>
      <th v-for="(header, index) in Object.keys(fieldItems)" :key="index">
        {{ fieldItems[header].label }}
      </th>
    </tr>
    </thead>
    <tbody>
<!--    <tr v-for="(item, index) in userItems" :key="index">-->
<!--      <td v-for="(value, index) in item" :key="index">{{ value }}</td>-->
<!--      <td><button @click="removeItem(index)">削除</button></td>-->
<!--    </tr>-->
    </tbody>
  </table>


<!--  <div>-->
<!--    <p>明細</p>-->
<!--      <ol>-->
<!--        &lt;!&ndash; keyにはindexをつける &ndash;&gt;-->
<!--          <li v-for="(header, index) in Object.keys(fieldItems)" :key="index">-->
<!--            {{ fieldItems[header].label }}-->
<!--          </li>-->
<!--&lt;!&ndash;          <li v-for="(user, index) in userItems" :key="index">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ user.name }} {{ user.mail }}&ndash;&gt;-->
<!--&lt;!&ndash;            <button :disabled="!(childCorrectFlg === 0)" @click="removeItem(index)">削除</button>&ndash;&gt;-->
<!--&lt;!&ndash;            <button :disabled="!(childCorrectFlg === 0)" @click="correctItem(index)">修正</button>&ndash;&gt;-->
<!--&lt;!&ndash;          </li>&ndash;&gt;-->
<!--      </ol>-->
<!--    <br />-->
<!--  </div>-->
</template>

<script lang="ts">
import { computed } from "vue";
import { reactive } from 'vue'
export default {
  name: "FormDetails",
  props: {
    userItems: {
      type: Object,
    },
    fieldItems: {
      type: Object,
    },
    value: {
      type: Number,
    },
    childCorrectFlg:{
      type: Number,
      default:0,
    }
  },


  setup(props:any, context:any) {
    const fs = reactive(props.userItems);
    const ca = reactive(props.fieldItems);
    const removeItem = (i:number) => {fs.user.splice(i,  1)};

    // console.log(ca.name.label);
    // console.log(ca[Object.keys(ca)[0]].label);
    // console.log(fs);

    function correctItem(i: number){
      // console.log(context.target.name);
      // console.log(fs.user[i].name);
      context.emit('onDataSet',fs.user[i],i);

    }

    return {
      removeItem,
      correctItem,
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