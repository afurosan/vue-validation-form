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
            <button @click="removeItem(index)">削除</button>
          </li>
      </ol>
    <br />
  </div>
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
    value: {
      type: Number,
    },

  },

  setup(props:any) {
    const fs = reactive(props.userItems);
    const removeItem = (i:number) => {fs.user.splice(i,  1)};

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