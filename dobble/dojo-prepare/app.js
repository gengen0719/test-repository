function DobbleGame(){
    const numberOfImageInCard = 8;
    const $card1 = $('#card1');
    const $card2 = $('#card2');

    function getImageResourceArray(){
        return [{'src':'img/black-circle.png'},
            {'src':'img/black-square.png'},
            {'src':'img/black-triangle.png'},
            {'src':'img/red-circle.png'},
            {'src':'img/red-square.png'},
            {'src':'img/red-triangle.png'},
            {'src':'img/yellow-circle.png'},
            {'src':'img/yellow-square.png'},
            {'src':'img/yellow-triangle.png'},
            {'src':'img/green-circle.png'},
            {'src':'img/green-square.png'},
            {'src':'img/green-triangle.png'},
            {'src':'img/blue-circle.png'},
            {'src':'img/blue-square.png'},
            {'src':'img/blue-triangle.png'}
        ];
    }

    function pickUpRandomImages(imageResourceArray){
        let randomImages = [];
        for(let i=0;i < numberOfImageInCard -1;i++){
            let randomIndex = Math.floor(Math.random() * imageResourceArray.length);
            randomImages.push(imageResourceArray[randomIndex]);
            imageResourceArray.splice(randomIndex,1);
        }
        return randomImages;
    }

    function appendImages($targetCard,imageResources){
        imageResources.forEach(function(current){
            let $appendImage = $('<img>',current);
            $appendImage.addClass('character-image');
            $targetCard.append($appendImage);              
        });
    }

    function startGame(){
        let imageResourceArray = getImageResourceArray();
        let card1Images = pickUpRandomImages(imageResourceArray);
        let card2Images = pickUpRandomImages(imageResourceArray);
        
        let answerIndex =  Math.floor(Math.random() * imageResourceArray.length);
        let answerImageObject = imageResourceArray[answerIndex];
        answerImageObject['class'] = 'answer';
        
        let card1AnswerIndex = Math.floor(Math.random() * card1Images.length);        
        card1Images.splice(card1AnswerIndex,0,answerImageObject);

        let card2AnswerIndex = Math.floor(Math.random() * card2Images.length);        
        card2Images.splice(card2AnswerIndex,0,answerImageObject);

        appendImages($card1,card1Images);
        appendImages($card2,card2Images);

        $('#game-field .answer').click(function(){
            alert('正解！');
            $card1.empty();
            $card2.empty();
            startGame();
        })
    }
    startGame();
}
DobbleGame();