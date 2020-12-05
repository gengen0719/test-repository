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
### フォルダを準備しhtml,css,jsファイルを配置する
### htmlファイルにcssファイル,jsファイルを読み込ませる

