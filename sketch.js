var mobilenet;
var classifier;
var tucano;
var video;
var label = '';

// Best buttons in the market 
var bt_smile;
var bt_monster;
var bt_train;

function modelReady(){
    console.log('Model is ready!');
}

function videoReady(){
    console.log('Video is ready!');
}

function whileTraining(loss){
    if(loss == null){
        console.log('Training Complete');
        classifier.classify(gotResults);
    }else{
        console.log(loss);
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        // console.log(results);
        label = results[0].label;
        classifier.classify(gotResults);
        //var prob = results[0].confidence;

        // createP(label);
        // createP(prob);
    }
}
function setup(){
    createCanvas(640,550);
    // tucano = createImg('img/tucano.jpg',imgReady);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    // tucano.hide();
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    bt_smile = createButton('Smile');
    bt_smile.mousePressed(function(){
        classifier.addImage('Yellow Smile');
    });

    bt_monster = createButton('Monster');
    bt_monster.mousePressed(function(){
        classifier.addImage('Orange Monster');
    });

    bt_train = createButton('Train Model');
    bt_train.mousePressed(function(){
        console.log("Training...");
        classifier.train(whileTraining);
    });
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}

// function imgReady(){
//     image(tucano,0,0,width,height);
// }