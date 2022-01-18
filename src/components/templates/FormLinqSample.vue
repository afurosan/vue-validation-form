<template>
  <div class="sample">
    <h3>{{ age }}</h3>
    <h3>{{ saySomething("テスト") }}</h3>
    <button @click="calcM" style="margin: 5px">リンク計算</button>
    <button @click="callbackChk">コールバック関数チェック</button>

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

    //型推論で書く 分かり切っているものは冗長になるため
    //let hasVaule : boolean = true;
    //let sMsg : string = "あいうえお";←こういのんとかstringってわかるから
    let hasVaule  = true;
    let sMsg  = "あいうえお";
    //型注釈はいつ使うのか こういう場合は型はanyになるので明示的に型注釈をつける 後は上手く推論してくれない場合とか
    //let hello;
    let hello : string;

    //オブジェクト型の場合はどうするか 何々の型;セミコロンつける
    const person: {
      name : string;
      age : number;
    } = {
      name : "山下清",
      age:35
    }
    //型をつけてない場合はperson.ってやった場合の候補のnameの横にstringとか型が表示されていない
    const person2 = {
      name : "型なし"
    }

    //console.log(person.);

    //配列の場合 複数の型を使いたい場合はUnion型で書く どんなもの良いならAnyを使う事もあるけど、できるだけ指定する
    const fruit : (string | number)[] = ['Apple', 'Orange', 'Banana', 1];

    //Tuple型を使用して厳しい制限を設ける 3つの型を[]のカンマくぐりで書く。そうしたら4,5,6と指定できなし、違う方を入れるとエラーになる
    const book : [string, number, boolean]= ["本の名前", 1500, true];
    //book[1] = 'あああ';numberやからエラーになるよと
    book.push(21); //追加 これはエラーがでないので注意する！あくまでの初期値の設定においては厳しいだがその後はゆるい
    //book[3]; //pushで追加しても参照する場合はエラーを出してくれるので安心といえば安心。

    //Enumをつかう 特定の纏まったもの扱う
    enum CoffeSize {
      SHORT, //値は0
      TALL,  //1
      GRANDE, //2
      VENTI   //3
    }

    const coffe = {
      hot :true,
      size: CoffeSize.TALL,
    //  name : "ソイラテ"
    }

    //CoffeSize型になる
    //coffe.size

    //any型はなんでも入れれるのでなるべく使わないようにする事！！あくまでもJavaScriptからの移行に際してのどうしても使いたい場合のみ
    let anything: any =  true;
    // anything = 'hello';
    // anything.aa = "あああ";
    // anything = {};
    //let names = "あいうえお";
    // names = anything;

    //明示的な型付け
    const age = ref<number | string>(5); // Ref<number | string>型

    //関数の指定の方法 パラメーターには必ず型をつけるようにするanyになっちゃうから 戻り値もできるだけつけるようにする
    const saySomething = (msg : string): string => {
      //const something = "CCC";
      msg = "「使用中の文字は'" + msg + "'」です"
      return msg;
    };

    //何も戻り値がない場合はvoidを指定する
    const sayHello = (msg : string) : void =>{
      console.log(msg);
    }

    //callback関数の型の書き方
    const doubledHandle = (num : number, cb : (num : number) => number) : void => {
      const doubleNum = cb(num * 2);
      console.log(doubleNum);
    }

    const callbackChk = () : void => {
      doubledHandle(100, doubleNum => {
        return doubleNum;
      })
    }

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
      let res = asEnumerable(orders)
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
      saySomething,
      callbackChk,
    };
  },
});
</script>

<style scoped>

</style>