<template>
  <div class="popup" @click="clickEvent">
    <div @click="stopEvent">
      <p><slot></slot></p>
      <ol>
        <li>
          <label for="item">商品</label>
          <input id="item" type="text" v-model="itemname">
        </li>
        <li>
          <label for="count">数量</label>
          <input id="count" type="number" v-model="itemquantity">
        </li>
      </ol>
      <button @click="clickEvent" type="button">閉じる</button>
      <button @click="addEvent" type="button">追加</button>
    </div>
  </div>
</template>

<script type="ts">
import {ref} from 'vue';
export default {
  name: "PopupItem",
  // methods :{
  //   clickEvent: function(){
  //     this.$emit('from-child')
  //   },
  //   stopEvent: function(){
  //     event.stopPropagation()
  //   },
  //   testfunc(){
  //
  //   }
  // },

  setup(props,context){
    const stopEvent = () => event.stopPropagation();
    const clickEvent = () => {
      context.emit('from-child');
    }
    const addEvent = () => {
      let detail={name:itemname.value, quantity:itemquantity.value};
      // console.log(detail);
      context.emit('addDetail',detail);
      context.emit('from-child');
      itemname.value='';
      itemquantity.value=1;
    }
    console.log('1');

    const itemname=ref('');
    const itemquantity=ref(1);
    return{
      stopEvent,
      clickEvent,
      addEvent,
      itemname,
      itemquantity,
    }
  }
}
</script>

<style scoped>
.popup{
  border-style: solid;
  border-width: 1px;
  border-color: #FF0000;
}
</style>