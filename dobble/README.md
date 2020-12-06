# Dobble Gameを作ってみよう
実装例  
https://gengen0719.github.io/test-repository/dobble/index.html

## 今回学べること
- jQueryでのDOMの扱い
- 乱数の扱い、画像をランダムに表示する実装

## 事前準備
### 開発ツール
小林さんの回で使っていたVSCODEとLive Serverを使用します。
まだインストールできていない方はインストールしてください。  
vscodeのインストール  
https://code.visualstudio.com/download  
vscodeプラグインのインストール  
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer  
  
### 画像の準備
できるだけ正方形に近い形の好きなキャラクターの画像を16枚以上用意しておいてください。  
好きなキャラクターで実装すると私は楽しかったです。  
子供の好きなキャラクターで実装すると喜んで遊んでくれるかも。  
特に推しキャラがいない、探すのが面倒だという方には図形の画像を用意しています。  
(これはこれで脳トレとか知育っぽい感じになって良いかもしれない)  
外部公開する場合は著作権上問題のない画像を利用してください。  
Live Serverで立てたサーバーにWifi経由でiPhoneやiPadでアクセスすれば外部公開しなくても遊べる環境は作れます。  

## Dobble Gameとは？
細かいルールはいろいろあるようですが、  
「8つのイラストが描かれたカード2枚を見比べて同じイラストを見つける」
というのが基本ルールです。  
どのカードを見比べても必ず1つだけ同じイラストが見つかります。  
https://boku-boardgame.net/dobble  

## 実装
1つだけ同じイラストが描かれたカードを2枚表示して同じイラストをタップすると正解と表示される画面を実装してみます。  

### html,css,jsファイルの準備(小林さん回の復習)
```
-Dobble Game
--index.html
--app.js
--app.css
```
index.html  
- htmlと打って、html:5のテンプレートを選択
- body tagの最終行でapp.jsを読み込むためにscriptとうち、script:srcして、srcにapp.js
- head tag内でapp.cssを読み込むためにlinkとうち、link:cssして、srcにapp.css  
  
app.js   
- app.jsには読み込み確認のために、console.log('hello');を記載  
  
app.css   
- app.cssには読み込み確認のために、以下を記載  
  
```
body{
    background-color: grey;
}
```
index.htmlを選択して、右クリックOpen With Live Server  
灰色の画面で開く　-> css読み込みOK  
F12 consoleでhelloと出ていればjs読み込みOK  
出ていない場合はおそらくファイル名とsrc/hrefの指定がマッチしていないはず  

### 用意した画像ファイルを配置する
imgフォルダを作ってそこに画像を配置する。  
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
用意したファイルが無い方は以下のリンクから私が用意した画像ファイルをダウンロードして利用してください。  

### 静的な要素をHTMLに記載する
画面の完成図をイメージしてbodyタグ内に固定要素を記載する。  
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

### jQueryを読み込む
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

### imgタグを動的にappendする処理を書いてみる
このゲームでは毎回画像の並び順や重複する画像がランダムになっていないと面白くないです。  
そのため画像要素はjsで動的に作って追加する実装にします。  
まずcard1に1つの画像を追加する方法を実装してみましょう。jQueryを使います。  
  
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

### imgタグを配列から決まった数だけappendする処理を書いてみる
ただ前述のようにタグを一続きの文字列で表現すると、動的に要素を入れる際に少しやりづらいので書き方を変えます。  
```
let card1 = $('#card1');
let appendImage = $('<img>',{'src':'img/chocojiro.jpg'});
card1.append(appendImage);
```
動作は同じです。  
jQueryでは$()にタグを渡してあげるとそのタグの要素を生成します。  
さらに第2引数にオブジェクトを指定すると、そのオブジェクトのプロパティは、HTMLの属性として設定されます。  

関数化してみましょう。  
```
function appendImage($targetCard,imageResource){
    $targetCard.append($('<img>',imageResource));
}

let card1 = $('#card1');
let imageResource = {'src':'img/ahoudori.jpg'};
appendImage(card1,imageResource);
```
こうしておくと追加する画像のsrc部分を配列で用意しておけば、for文で回して追加できます。  
```
function appendImage($targetCard,imageResource){
    $targetCard.append($('<img>',imageResource));
}

let imageResourceArray = [
    {'src':'img/chocojiro.jpg'},
    {'src':'img/ahoudori.jpg'},
    {'src':'img/alexander.jpg'},
    {'src':'img/baniokun.jpg'},
    .....
];

let card1 = $('#card1');
imageResourceArray.forEach(function(currentImageResource){
    appendImage(card1,currentImageResource);
});
```
こんな感じです。  

### cssを編集して画面構成のイメージに近づける
- 画像のサイズがバラバラだったので追加するimgにclassをつけてcssでサイズを指定
- 画像の周りに少し余白を付ける
```
.character-image{
    width : 80px;
    height : 80px;
    margin: 4px;
}
```
```
function appendImage($targetCard,imageResource){
    let $appendImage = $('<img>',imageResource);
    $appendImage.addClass('character-image');
    $targetCard.append($appendImage);
}
```
- カードの背景を白にする
- flexで並べてみる
- カードの上部に余白を付ける
```
.game-card{
    background-color : white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
```
大きい画面にも対応させたい場合はmax-widthを指定したりよろしくやってください。  
Live Serverはcssの試行錯誤もサクっと反映されて便利ですね。

### ランダムな画像をappendする処理に改造する
最初に書きましたがこのゲームでは毎回画像の並び順や重複する画像をランダムにしてあげる必要があります。  
0から配列の長さ-1までの整数乱数を発生させられれば配列のランダムな要素にアクセスできます。  
つまりランダムな画像をappendできます。  
#### JavaScriptで乱数を発生させる方法
JavaScriptには0から1の間の乱数を発生させるメソッド `Math.random()` があります。  
`Math.random()` で発生させた乱数に配列の長さを掛けて `Math.floor()` で切り捨てると0から配列の長さ-1の範囲の整数乱数を発生させることができます。  
```
console.log(Math.floor(Math.random() * imageResourceArray.length));
```
コンソールに出力して確認してみましょう。  
これを利用してimageResourceArrayからランダムなimageResourceを取り出すメソッド書いてみましょう。  
```
function getRandomImageObject(targetImageResourceArray){
    let randomIndex = Math.floor(Math.random() * targetImageResourceArray.length);
    return targetImageResourceArray[randomIndex];
}
```
それを使ってそれぞれのカードに8個ずつ画像をappend  
```
let card1 = $('#card1');
let card2 = $('#card2');
const numberOfImageInCard = 8;
for(let i=0;i < numberOfImageInCard;i++){
    appendImage(card1,getRandomImageObject(imageResourceArray));   
    appendImage(card2,getRandomImageObject(imageResourceArray));   
}
```
だいぶやりたことに近づいてきました。   

### 重複しないランダムな画像をカードに7個ずつ追加し、最後に正解の画像をランダムな位置に挿入する
重複しないようにするためには、追加した画像を配列から削除してしまいましょう。  
```
function removeImageObject(targetImageResourceArray,targetImageObject){
    return targetImageResourceArray.filter(function(currentImageObject){
        return currentImageObject.src !== targetImageObject.src;
    });
}
```
filterはcallback関数がtrueを返した要素のみを残した配列を返してくれます。
この関数を利用して以下のように書くと削除できるので

```
for(let i=0;i < numberOfImageInCard;i++){
    let randomImageObject = getRandomImageObject(imageResourceArray);
    appendImage(card1,randomImageObject);   
    imageResourceArray = removeImageObject(imageResourceArray,randomImageObject);
}
```


### 正解の判定を実装する
