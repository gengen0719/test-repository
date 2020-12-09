# Dobble Gameを作ってみよう
実装例  
https://gengen0719.github.io/test-repository/dobble/dojo-prepare/index

## 学べること
- jQueryでのDOMの扱い
- JavaScriptでの配列の扱い
- JavaScriptでの乱数の扱い、画像をランダムに表示する実装

## Dobble Gameとは？
細かいルールはいろいろあるようですが、  
「8つのイラストが描かれたカード2枚を見比べて同じイラストを見つける」
というのが基本ルールです。    
https://boku-boardgame.net/dobble  
どのカードを見比べても1つだけ同じイラストが見つかるように作られているようです。

## 事前準備
### 開発ツール
小林さんの回で使っていたVSCODEとLive Serverを使用します。
まだインストールできていない方はインストールしてください。  
vscodeのインストール  
https://code.visualstudio.com/download  
Live Server(vscodeプラグイン)のインストール  
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer  
  
### 画像の準備
できるだけ正方形に近い形の好きなキャラクターの画像を15枚以上用意しておいてください。  
好きなキャラクターで実装すると私は楽しかったです。  
子供の好きなキャラクターで実装すると喜んで遊んでくれるかも。  
特に推しキャラがいない、探すのが面倒だという方には図形の画像を用意しています。  
(これはこれで脳トレとか知育っぽい感じになって良いかもしれない)   
  
> 以下のリンク先のdownloadというボタンを押してzipファイルをダウンロードし解凍して配置してください。  
> https://github.com/gengen0719/test-repository/blob/master/dobble/dojo-prepare/DobbleImages.zip  
  
外部公開する場合は著作権上問題のない画像を利用してください。  
Live Serverで立てたサーバーにWifi経由でiPhoneやiPadでアクセスすれば外部公開しなくても遊べる環境は作れます。   

## 実装
今回は1つだけ同じイラストが描かれたカードを2枚表示して同じイラストをタップすると正解と表示される画面を実装してみます。  

### html,css,jsファイルの準備(小林さん回の復習)
```
-Dobble Game
--index.html
--app.js
--app.css
```
VSCODEを立ち上げて、適当なフォルダ（例ではDobble Gameというフォルダ）を開き以下のファイルを作ります  
  
app.js   
- app.jsには読み込み確認のために、console.log('hello');を記載  
  
app.css   
- app.cssには読み込み確認のために、以下を記載   
```
body{
    background-color: grey;
}
```
  
index.html  
- htmlと打って、html:5のテンプレートを選択
- body tagの最終行でapp.jsを読み込むためにscriptとうち、script:srcを選んで、srcにapp.jsを指定
- head tag内でapp.cssを読み込むためにlinkとうち、link:cssを選んで、srcにapp.cssを指定  
  
index.htmlを選択して、右クリックOpen With Live Server  
灰色の画面で開く　-> css読み込みOK  
F12 consoleでhelloと出ていればjs読み込みOK  
出ていない場合はおそらくファイル名とsrc/hrefの指定がマッチしていないはずです  

### 用意した画像ファイルを配置する
imgフォルダを作ってそこに画像を配置します。  
```
-Dobble Game
--index.html
--app.js
--app.css
--img
---chocojiro.jpg
---uniguri.jpg
---moran.jpg
---etc...
```
自分で用意した画像ファイルがある方はそれらのファイルを、  
ファイルを用意していない方は私の用意した図形のファイルを使って実装してみてください。  
以下のリンク先のdownloadというボタンを押してzipファイルをダウンロードし解凍して配置してください。  
https://github.com/gengen0719/test-repository/blob/master/dobble/dojo-prepare/DobbleImages.zip  

### 静的な要素をHTMLに記載する
画面の完成図をイメージしてbodyタグ内に固定要素を記載します。  
```
<body>
    <header>        
        <h1>Dobble Game</h1>
    </header>
    
    <div id="game-field">
        <div id="game-message">
            <span>上下に一つだけ同じ画像があるよ</span><br>
            <span>探してタップしよう！</span><br>
        </div>
        <div id="card1" class="game-card"></div>
        <div id="card2" class="game-card"></div>
    </div>
    
    <script src="app.js"></script>
</body>
```
後で要素を足したり表示・非表示を切り替えたりcssでスタイルを指定しそうな要素にはあらかじめidやclassをつけておきます。  
idとclassの使い分けが分からない方は解説しているページがたくさんあるので読んでみてください。  
> HTML idとclassを間違いなく使い分けるために理解しておくべきこと  
> https://shu-sait.com/id-class-tukaiwake/  

### jQueryを配置して読み込む
今回はDOMの操作にjQueryを使うので、jQueryの準備をします。
- libフォルダを作り、そこにjQueryのサイトからjsファイルを取得して配置します  
https://code.jquery.com/jquery-3.5.1.js  
↑を名前をつけてリンク先を保存で良いです  

```
-Dobble Game
--index.html
--app.js
--app.css
--img
--lib
---jquery-3.5.1.js
```
- index.htmlのapp.jsの読み込みのひとつ前の行にscript:srcして、srcにlib/jquery-3.5.1.jsと記載します  

```
    <script src="lib/jquery-3.5.1.js"></script>
    <script src="app.js"></script>
```
この時必ず **app.jsよりも手前で読み込んでください** 

### imgタグを動的にappendする処理を書いてみる
このゲームでは毎回画像の並び順や重複する画像がランダムになっていないと面白くないです。  
そのため画像要素はjsで動的に作って追加する実装にします。  
まずcard1に1つの画像を追加する実装をしてみましょう。jQueryを使います。  
  
idを振っている要素の場合  
```
$("#card1")
```
のように書くとjQueryがその要素セレクトしてくれます。そこで
```
$('#card1').append('<img src="img/chocojiro.jpg" >')
```
のように書いてあげると要素を追加できます。  
動かしてみて要素が追加されるか見てみましょう。  

### imgタグを配列からappendする処理を書いてみる
ただ前述のようにタグを一続きの文字列で表現すると、動的に要素を入れる際に少しやりづらいので書き方を変えます。  
```
let $card1 = $('#card1');
let appendImage = $('<img>',{'src':'img/chocojiro.jpg'});
$card1.append(appendImage);
```
動作は同じです。  
jQueryでは$()にタグを渡してあげるとそのタグの要素を生成します。  
さらに第2引数にオブジェクトを指定すると、そのオブジェクトのプロパティは、HTMLの属性として設定されます。  

関数化してみましょう。  
```
function appendImage($targetCard,imageResource){
    $targetCard.append($('<img>',imageResource));
}

let $card1 = $('#card1');
let imageResource = {'src':'img/chocojiro.jpg'};
appendImage($card1,imageResource);
```
追加する画像のsrc部分を配列で用意して、for文で回して追加するように改造しましょう。
```
function appendImages($targetCard,imageResourceArray){
    imageResourceArray.forEach(element => {
        $targetCard.append($('<img>',element));        
    });
}

let imageResourceArray = [
    {'src':'img/chocojiro.jpg'},
    {'src':'img/ahoudori.jpg'},
    {'src':'img/alexander.jpg'},
    {'src':'img/baniokun.jpg'},
    .....
];
let $card1 = $('#card1');
let $card2 = $('#card2');
appendImages($card1,imageResources);
appendImages($card2,imageResources);
```

### cssを編集して画面構成のイメージに近づける
- 画像のサイズがバラバラだったので追加するimgにclassをつけてcssでサイズを指定
- 画像の周りに少し余白を付ける  
app.css  
```
.character-image{
    width : 80px;
    height : 80px;
    margin: 4px;
}
```
```
function appendImages($targetCard,imageResourceArray){
    imageResourceArray.forEach(element => {
        $appendImage = $('<img>',element);
        $appendImage.addClass('character-image');
        $targetCard.append($appendImage);        
    });
}
```
- カードの背景を白にする
- display : gridで並べてみる
- カードの上部に余白を付ける
- カードの最大幅を指定する
```
.game-card{
    background-color : white;
    display: grid;
    grid-template-columns : repeat(4,auto);
    grid-template-rows : repeat(2,auto);
    margin-top: 16px;
    max-width: 360px;
}
```
レスポンシブデザインにすることもできると思うので余力がある方はやってみてください。  

### ランダムな画像をappendする処理に改造する
最初に書きましたがこのゲームでは毎回画像の並び順や重複する画像をランダムにしてあげる必要があります。  
配列にはindexがあるので0から配列の長さ-1までの整数乱数を発生させられれば配列のランダムな要素にアクセスできます。  
それを応用すればランダムな画像をappendできます。  
#### JavaScriptで乱数を発生させる方法
JavaScriptには0から1の間の乱数を発生させるメソッド `Math.random()` があります。  
`Math.random()` で発生させた乱数に配列の長さを掛けて `Math.floor()` で切り捨てると0から配列の長さ-1の範囲の整数乱数を発生させることができます。  
```
console.log(Math.floor(Math.random() * imageResourceArray.length));
```
コンソールに出力して確認してみましょう。  
これを利用してランダムな画像を8個ずつ取り出すメソッドを書いてみましょう。  

```
const numberOfImagesInCard = 8;  
  
function pickUpRandomImages(targetImageResourceArray){
    let returnArray = [];
    for(let i=0 ; i<numberOfImagesInCard; i++){
        let randomIndex = Math.floor(Math.random() * targetImageResourceArray.length);
        returnArray.push(targetImageResourceArray[randomIndex]);
    }
    return returnArray;
}
```
それを使ってそれぞれのカードに画像をappend  
```
let $card1 = $('#card1');
let $card2 = $('#card2');
const numberOfImagesInCard = 8;
appendImages($card1,pickUpRandomImages(imageResources));
appendImages($card2,pickUpRandomImages(imageResources));
```
だいぶやりたことに近づいてきました。   

### 重複しないランダムな画像をカードに7個ずつ追加し、最後に正解の画像をランダムな位置に挿入する
重複しないようにするためには、追加した画像を配列から削除してしまいましょう。  
pickUprandomImagesをpickUpAndRemoveRandomImagesに改造しましょう。  
```
function pickUpAndRemoveRandomImages(targetImageResourceArray){
    let returnArray = [];
    for(let i=0 ; i<numberOfImagesInCard; i++){
        let randomIndex = Math.floor(Math.random() * targetImageResourceArray.length);
        returnArray.push(targetImageResourceArray[randomIndex]);
        targetImageResourceArray.splice(randomIndex,1);
    }
    return returnArray;
}
```
配列から要素を削除するにはspliceメソッドを使います。  
`splice(削除を開始するindex,削除する数)` なので `splice(randomIndex,1)` でrandomIndexの要素のみを削除できます。  
  
1つ正解の重複する画像を追加する必要があるのでpickUpAndRemoveRandomImagesで取り出す数を7つに減らします。  
```
    for(let i=0 ; i<numberOfImagesInCard -1 ; i++){
```
pickUpAndRemoveRandomImagesで取り出した値を一旦配列に入れて、そこに正解の画像を足すように改造します。  
```
let card1Images = pickUpAndRemoveRandomImages(imageResources);
let card2Images = pickUpAndRemoveRandomImages(imageResources);

let answerIndex = Math.floor(Math.random() * imageResources.length);
let answerImage = imageResources[answerIndex];
card1Images.push(answerImage);
card2Images.push(answerImage);
```
これでは必ず最後に正解が入ってしまいますね。  
card1,card2それぞれランダムな位置に挿入するように改造します。  
```
let card1Images = pickUpAndRemoveRandomImages(imageResources);
let card2Images = pickUpAndRemoveRandomImages(imageResources);

let answerIndex = Math.floor(Math.random() * imageResources.length);
let answerImage = imageResources[answerIndex];

let card1AnswerIndex = Math.floor(Math.random() * (card1Images.length + 1));
card1Images.splice(card1AnswerIndex,0,answerImage);

let card2AnswerIndex = Math.floor(Math.random() * (card2Images.length + 1));
card2Images.splice(card2AnswerIndex,0,answerImage);
```
実はspliceは第3引数にオブジェクトを渡すことでそのオブジェクトを配列に挿入することができます。  
また削除する数を0にすると削除せず挿入のみを行えます。  
`splice(操作を開始するindex,削除する要素の数,挿入するオブジェクト)`   
**配列の末尾に追加する場合もあるので乱数は0から配列の数+1までの範囲で生成する必要があります。**  
これでほぼ実装できました。  

### 正解の判定を実装する
正解の判定は正解の画像をタップした時だけイベントを発生させることで実現できます。  
まず正解の要素に正解であることが分かるようにclassを追加しましょう。  
```
let answerIndex = Math.floor(Math.random() * imageResources.length);
let answerImage = imageResources[answerIndex];
answerImage['class'] = 'answer';
```
こう書くことでanswerImageのclassフィールドにanswerがセットされ、それをもとに生成したDOMのclassにanswerが付きます。  
このclassにanswerがついている要素にイベントを書いてみましょう。  

```
$('#game-field .answer').click(function(){
    alert('正解！');
});
```
`#game-field .answer` これでid=game-fieldの子要素の中でclassにanswerがついている要素という意味になります。  
その要素にclickイベントをセットしてalertで正解と表示する実装になります。  

### 問題を繰り返し表示するようにする
正解したら繰り返し問題を表示するようにしてみましょう。  
繰り返したい部分をstartGameメソッドにします。   
正解を表示した後にcard1,card2の中身を空にしてstarGameメソッドを呼ぶようにします。  
メソッドにするとjsファイルを読み込んだ時に実行されなくなるので、startGameメソッドを実行する文も足します。  
（imageResourcesはメソッド内に持つと邪魔なのでgetするメソッドにして切り出しています）  

<details>
  <summary>完成コード</summary>
  <pre>
  <code> 
const $card1 = $('#card1');
const $card2 = $('#card2');
const numberOfImagesInCard = 8;

function appendImages($targetCard,imageResourceArray){
    imageResourceArray.forEach(element => {
        $appendImage = $('<img>',element);
        $appendImage.addClass('character-image');
        $targetCard.append($appendImage);        
    });
}

function pickUpAndRemoveRandomImages(targetImageResourceArray){
    let returnArray = [];
    for(let i=0 ; i<numberOfImagesInCard -1 ; i++){
        let randomIndex = Math.floor(Math.random() * targetImageResourceArray.length);
        returnArray.push(targetImageResourceArray[randomIndex]);
        targetImageResourceArray.splice(randomIndex,1);
    }
    return returnArray;
}

function getImageResources(){
    return [
        {'src':'img/chocojiro.jpg'},
        {'src':'img/ahoudori.jpg'},
        {'src':'img/alexander.jpg'},
        {'src':'img/baniokun.jpg'},
        {'src':'img/cock-kawasaki.jpg'},
        {'src':'img/ebi-fly.jpeg'},
        {'src':'img/gongchang.jpg'},
        {'src':'img/kenny.jpg'},
        {'src':'img/kodak.jpg'},
        {'src':'img/korirakuma.jpg'},
        {'src':'img/molang.jpg'},
        {'src':'img/ninja-slayer.jpg'},
        {'src':'img/panpanya.jpg'},
        {'src':'img/shown.jpg'},
        {'src':'img/snoopy.jpg'},
        {'src':'img/sushikun.jpg'},
        {'src':'img/unigurikun.jpg'},
    ];
}

function startGame(){
    let imageResources = getImageResources();

    let card1Images = pickUpAndRemoveRandomImages(imageResources);
    let card2Images = pickUpAndRemoveRandomImages(imageResources);

    let answerIndex = Math.floor(Math.random() * imageResources.length);
    let answerImage = imageResources[answerIndex];
    answerImage['class'] = 'answer';

    let card1AnswerIndex = Math.floor(Math.random() * (card1Images.length + 1));
    card1Images.splice(card1AnswerIndex,0,answerImage);

    let card2AnswerIndex = Math.floor(Math.random() * (card2Images.length + 1));
    card2Images.splice(card2AnswerIndex,0,answerImage);

    appendImages($card1,card1Images);
    appendImages($card2,card2Images);

    $('#game-field .answer').click(function(){
        alert('正解！');
        $card1.empty();
        $card2.empty();
        startGame();
    });
}

startGame();

  </code>
  </pre>
</details>

これで完成です◎  

### 早く終わった人へ  
- こんな機能を追加してみると良いかも？  
正解のエフェクトを追加する（ピンポンって音を鳴らすとか、〇が付くとか）  
正解した時に正解までにかかった時間を表示する  
正解までのベストタイムをローカルストレージに記録して、更新したら知らせてくれる  
- 画面共有して推しキャラについて語る
- 今回の実装内容に関連する読み物
```
JavaScriptで書く「var,let,const」の違いと使い分け方法  
https://techacademy.jp/magazine/14872   
varで書いてたおじさんだったので勉強になりました。

リストから複数の要素をランダムに重複なく効率よく取り出す  
https://qiita.com/sdkei/items/43d2902908efcfca7f25   
配列が大きくなるとこういうロジックにしてやる必要があるんだろうけど、業務ロジックからは意識せず使えるようにしたいですね。  
```
- サク山チョコ次郎について  
http://www.shoeidelicy.co.jp/chocojiro/index.html  
