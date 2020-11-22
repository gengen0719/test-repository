var resultArray = [];
const questionNumber = 10;
const currentQuestionNumber = $("#question-no");
const replayLink = $("#replay");

const board1 = $("#board1");
const board2 = $("#board2");
const gameField = $("#game-field");
const resultField = $("#result-field");
const resultBody = $("#result-body");
const numberOfPictuerInBoard = 8;
var answerImage;
var startTime;

replayLink.click(function(){
    resultBody.empty();
    resultArray = [];
    start1Question();
});


start1Question();

function start1Question(){
    board1.empty();
    board2.empty();
    gameField.show();
    resultField.hide();
    currentQuestionNumber.html(resultArray.length + 1);

    var imageObjects = getImageObjects();
    answerImage =  pickUpRandomOneImage(imageObjects);
    answerImage.isAnswer = true;
    removeOneImage(imageObjects,answerImage);
    console.log(answerImage.id);

    var board1Images = pickUpRandomImages(imageObjects,numberOfPictuerInBoard -1);
    pushImageAtRandomPosition(board1Images,answerImage);
    var board2Images = pickUpRandomImages(imageObjects,numberOfPictuerInBoard -1);
    pushImageAtRandomPosition(board2Images,answerImage);

    board1Images.forEach(element => {
        appendCard(board1,element);
    });

    board2Images.forEach(element => {
        appendCard(board2,element);
    });

    gameField.find('.answer').click(clear1Question);
    startTime =  Date.now();

}

function clear1Question(){
    var clearTime = Date.now() - startTime;
    console.log(clearTime);
    resultArray.push({clearTime : clearTime,answerImage : answerImage});
    alert('正解！');
    if(resultArray.length === questionNumber){
        gameField.hide();
        resultField.show();
        resultArray.forEach(function(element,index){
            appendResultCard(index + 1,element);
        });
    } else{
        start1Question();
    }
}

function pushImageAtRandomPosition(imageArray,pushedImage){
    var randomIndex = Math.floor(Math.random() * imageArray.length);
    imageArray.splice(randomIndex,0,pushedImage);
}


function pickUpRandomImages(imageArray,numberOfPickupImage){
    var pickUpImageArray = [];
    for(var i=1;i<=numberOfPickupImage;i++){
        var pickUpOneImage = pickUpRandomOneImage(imageArray);
        removeOneImage(imageArray,pickUpOneImage);
        pickUpImageArray.push(pickUpOneImage);
    }
    return pickUpImageArray;
}

function pickUpRandomOneImage(imageArray){
    var pickUpImageIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[pickUpImageIndex];
}

function removeOneImage(imageArray,removeImage){
    imageArray.forEach(function(currentItem , index){
        if(currentItem.id === removeImage.id){
            imageArray.splice(index,1);
        }
    });
}

function getImageObjects(){
    return  [
        {id:"gong", name : "ごんちゃん",filePath : "img/gongchang.jpg",isAnswer : false , context : "フジロック会場に多数生息する石。"},
        {id:"ebi-fly", name : "えびふらいのしっぽ" , filePath : "img/ebi-fly.jpeg" , isAnswer : false , context : "私は割と残さず食べる派。"},
        {id : "snoopy" , name : "スヌーピー",filePath : "img/snoopy.jpg",isAnswer : false ,context : "世界的に有名な犬。"},
        {id:"alexander", name : "アレクサンダ",filePath : "img/alexander.jpg",isAnswer : false,context : "ゼンマイ仕掛けのねずみと友達になった心優しいねずみ。"},
        {id:"kodak", name : "コダック",filePath : "img/kodak.jpg",isAnswer : false,context : "常に頭痛に悩まされているアヒル。かわいそう。"},
        {id : "moran" , name : "モラン",filePath : "img/molang.jpg",isAnswer : false,context : "ムーミン谷で一番かわいい。体は氷のように冷たい。"},
        {id : "kenny" , name : "ケニー",filePath : "img/kenny.jpg",isAnswer : false,context : "ケダモノ！"},
        {id : "shown", name : "ショーン",filePath : "img/shown.jpg",isAnswer : false,context : "羊"},
        {id : "uniguri" , name : "うにぐりくん",filePath : "img/unigurikun.jpg",isAnswer : false,context : "ずとまよのMVに出てくるハリネズミ"},
        {id : "sushi", name : "寿司くん",filePath : "img/sushikun.jpg",isAnswer : false,context : "酢飯を飛ばしてくる迷惑な寿司"},
        {id : "ahoudori" ,  name : "あほうどり",filePath : "img/ahoudori.jpg",isAnswer : false,context : "数を三つまでしか数えられないかわいそうな鳥"},
        {id : "ninja", name : "ニンジャスレイヤー=サン",filePath : "img/ninja-slayer.jpg",isAnswer : false,context : "アイエエエエ！？ニンジャ！？ニンジャナンデ！？"},
        {id : "kuma" , name : "コリラックマ",filePath : "img/korirakuma.jpg",isAnswer : false,context : "自由に生きる熊"},
        {id : "wani" , name : "ばにお",filePath : "img/baniokun.jpg",isAnswer : false,context : "熱川バナナワニ園のマスコット。血に飢えている。"},
        {id : "panpanya", name : "panpanyaの漫画の主人公",filePath : "img/panpanya.jpg",isAnswer : false,context : "名も知らぬたぶん女の子"},
        {id : "kawasaki" , name : "コックカワサキ",filePath : "img/cock-kawasaki.jpg",isAnswer : false,context : "サイコパス"},
        {id : "chocojiro", name : "サク山チョコ次郎",filePath : "img/chocojiro.jpg",isAnswer : false,context : "スーパーやコンビニで見つけたら保護してください"}];
}

function appendCard(targetBoard,imageObject){
    if(imageObject.isAnswer){
        targetBoard.append('<img class="card answer" src=' + imageObject.filePath +' alt='+ imageObject.name + '>');
    } else{
        targetBoard.append('<img class="card" src=' + imageObject.filePath +' alt='+ imageObject.name + '>');
    }
}

function appendResultCard(questionNo,resultObject){
    resultBody.append('<div class="result-card">'
        + '<div class="result-card-header">' + '<span>' + questionNo + '問目 ' +  resultObject.clearTime / 1000 + '秒</span>' + '</div>'
        + '<div class="reuslt-card-body">'
        + '<img class="card" src =' + resultObject.answerImage.filePath + ' alt=' + resultObject.answerImage.name + '>'
        + '<div class"result-card-name-and-context">'
        + '<span class="character-name">' + resultObject.answerImage.name + '</span><br>' 
        + '<span class="character-context">' + resultObject.answerImage.context + '</span>' 
        + '</div></div></div>');
}