<template>
  <div class="sample">
    <h1>{{ age }}</h1>
    <button @click="calcM">リンク計算</button>
    <!-- <p>{{ saySomething() }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import * as Enumerable from "linq-es2015";
import { asEnumerable } from 'linq-es2015';

export default defineComponent({
  props: {
    msg: {
      type: String,
    },
  },
  setup() {
    // const saySomething = (): string => {
    //   const something = "CCC";
    //   return something;
    // };

    //明示的な型付け
    const age = ref<number | string>(5); // Ref<number | string>型

    const orders =
        [{
          place: '秋葉原',
          products: ['ホットコーヒー', 'ホットコーヒー', 'ホットコーヒー', 'ホットコーヒー'],
          amounts: 920
        }, {
          place: '秋葉原',
          products: ['アイスコーヒー', 'アイスカフェモカ', 'アイスティー'],
          amounts: 680
        }, {
          place: '上越',
          products: ['ホットコーヒー', 'アイスコーヒー', 'コーラ'],
          amounts: 690
        }, {
          place: '上越',
          products: ['コーラ', 'マンゴーソーダ'],
          amounts: 680
        },{
          place: '秋葉原',
          products: ['ホットコーヒー', 'ホットティー', 'アイスティー'],
          amounts: 790
        }
        ];

      const calcM = () => {

        //条件一致のパターン
      let result = Enumerable.range(1, 10).Where(i => i % 3 == 0).Select(i => i * 10)
      console.log(result.ToArray());

      //集計のパターン
      let res = Enumerable.from(orders)
            .GroupBy(
                x => x.place,
                x => x,
                ( key, items) => {
                  const g = asEnumerable(items);
                  return {
                    place: key,
                    avg: g.Average(i => i.amounts),
                    min: g.Min(i => i.amounts),
                    max: g.Max(i => i.amounts),
                    sum: g.Sum(i => i.amounts),
                  }
                }
            ).ToArray();

          console.log(res);
    }



    return {
      age,
      calcM,
      // saySomething,
    };
  },
});
</script>

<style scoped>

</style>