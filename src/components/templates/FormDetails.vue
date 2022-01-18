<template>
  <div>
    <p>子コンポーネント</p>
      <ol>
        <!-- keyにはindexをつける -->
          <th v-for="(header, index) in userItems.header" :key="index">
            {{ header }}
          </th>
          <li v-for="(user, index) in userItems.user" :key="index">
            {{ user.name }} {{ user.email }}
            <!-- <button @click="addToCart(user)" style="margin: 5px">追加</button> -->
            <button @click="removeItem(index)">削除</button>
          </li>
      </ol>
    <br />
  </div>
</template>

<script>

import { computed } from "vue";

export default {
  //inject: ['$validator'],
  name: "FormDetails",
  props: {

    userItems: {
      type: Object,

    },

    value: {
      type: Number,
    },

  },

  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const fs = props.userItems;
    const removeItem = (i) => fs.user.splice(i, 1);

    return {
      removeItem,
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