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
(これはこれで知育っぽい感じになって良いかもしれない)  
外部公開する場合は著作権上問題のない画像を利用してください。  
Live Serverで立てたサーバーにWifi経由でiPhoneやiPadでアクセスすれば外部公開しなくても遊べる環境は作れます。  

## Dobble Gameとは？
細かいルールはいろいろありますが、「2枚のカードの中から同じイラストを素早く見つける」というのが基本ルールです  
https://boku-boardgame.net/dobble
  
ドラえもんやワンピースのカードもあるようです。  

## 実装
今回は問題を１問表示し正解の画像をタップすると正解と出るところまでを実装します。
### 実装の準備(小林さん回の復習)
```
-Dobble Game
--index.html
--app.js
--app.css
```
index.html  
index.htmlはindexとうち、html:5
- body tagの最終行でapp.jsを読み込むためにscriptとうち、script:srcして、srcにapp.js
- head tag内でapp.cssを読み込むためにlinkとうち、link:cssして、srcにapp.css
app.js
- app.jsには読み込み確認のために、console.log('hello');を記載
app.css
- app.cssには読み込み確認のために、以下を記載
```
body{
    background-color: pink;
}
```
index.htmlを選択して、右クリックOpen With Live Server  
ピンクの画面で開く　-> css読み込みOK F12 consoleでhello world　-> js読み込みOK  
とでていればOK　でてない場合はおそらくファイル名とsrc/hrefの指定がマッチしていないはず  

### 用意した画像ファイルを配置する
```
-Dobble Game
--index.html
--app.js
--app.css
--img
---chocojiro.jpg
---uniguri.jpg
---moran.jpg
....
```


### どういう画面構成にするのかイメージする

