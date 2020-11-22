const board1 = $("#board1");
const board2 = $("#board2");
const gameField = $("#game-field");
const numberOfPictuerInBoard = 8;
var answerImage;

gameStart();

function gameStart(){
    var imageObjects = getImageObjects();
    var answerImage =  pickUpRandomOneImage(imageObjects);
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

    gameField.find('.answer').click(gameClear);
}

function gameClear(){
    alert('正解！');
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
        {id:"gong", name : "ごんちゃん",filePath : "img/gongchang.jpg",isAnswer : false},
        {id : "snoopy" , name : "スヌーピー",filePath : "img/snoopy.jpg",isAnswer : false},
        {id:"alexander", name : "アレクサンダー",filePath : "img/alexander.jpg",isAnswer : false},
        {id:"kodak", name : "コダック",filePath : "img/kodak.jpg",isAnswer : false},
        {id : "moran" , name : "モラン",filePath : "img/molang.jpg",isAnswer : false},
        {id : "kenny" , name : "ケニー",filePath : "img/kenny.jpg",isAnswer : false},
        {id : "shown", name : "ショーン",filePath : "img/shown.jpg",isAnswer : false},
        {id : "uniguri" , name : "うにぐりくん",filePath : "img/unigurikun.jpg",isAnswer : false},
        {id : "sushi", name : "寿司くん",filePath : "img/sushikun.jpg",isAnswer : false},
        {id : "ahoudori" ,  name : "あほうどり",filePath : "img/ahoudori.jpg",isAnswer : false},
        {id : "ninja", name : "ニンジャスレイヤー=サン",filePath : "img/ninja-slayer.jpg",isAnswer : false},
        {id : "kuma" , name : "コリラックマ",filePath : "img/korirakuma.jpg",isAnswer : false},
        {id : "wani" , name : "ばにお",filePath : "img/baniokun.jpg",isAnswer : false},
        {id : "panpanya", name : "panpanyaの漫画の主人公",filePath : "img/panpanya.jpg",isAnswer : false},
        {id : "kawasaki" , name : "コックカワサキ",filePath : "img/cock-kawasaki.jpg",isAnswer : false},
        {id : "chocojiro", name : "サク山チョコ次郎",filePath : "img/chocojiro.jpg",isAnswer : false}];
}



function appendCard(targetBoard,imageObject){
    if(imageObject.isAnswer){
        targetBoard.append('<img class="card answer" src=' + imageObject.filePath +' alt='+ imageObject.name + '>');
    } else{
        targetBoard.append('<img class="card" src=' + imageObject.filePath +' alt='+ imageObject.name + '>');
    }


}