# Dobble Gameを作ってみよう
実装例  
https://gengen0719.github.io/test-repository/dobble/index.html

## 今回学べること
- jQueryでのDOMの扱い
- 乱数の扱い、画像をランダムに表示する実装

## 事前準備
小林さんの回で使っていたVSCODEとLive Serverを使用します  
まだインストールできていない方はインストールしてください。  
vscodeのインストール  
https://code.visualstudio.com/download  
vscodeプラグインのインストール  
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer  
  
できるだけ正方形に近い形の好きなキャラクターの画像を16枚以上用意しておいてください。  
好きなキャラクターで実装すると楽しくなれます。  
子供の好きなきゃらくたーで実装うると喜んでくれるかも。  
特に推しキャラがいない、探すのが面倒だという方は私の推しキャラで実装してみてください。  

## Dobble Gameとは？
細かいルールはいろいろありますが、「2枚のカードの中から同じイラストを素早く見つける」というのが基本ルールです  
https://boku-boardgame.net/dobble
  
ドラえもんやワンピースのカードもあるようです。  

## 実装しよう１ -問題を１問表示し、正解の画像をタップすると正解と出るところまで-

