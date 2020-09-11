var mobilenet;
var predictor;
var tucano;
var video;
var label = '';
var value = 0;

// Best buttons in the market 
var bt_train;
var slider;
var bt_add;

function modelReady(){
    console.log('Model is ready!');
}

function videoReady(){
    console.log('Video is ready!');
}

function whileTraining(loss){
    if(loss == null){
        console.log('Training Complete');
        predictor.predict(gotResults);
    }else{
        console.log(loss);
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results.value);
        value = results.value;
        predictor.predict(gotResults);
        //var prob = results[0].confidence;

        // createP(label);
        // createP(prob);
    }
}
function setup(){
    createCanvas(640,550);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    predictor = mobilenet.regression(video, videoReady);

    slider = createSlider(0 ,1, 0.5, 0.01);

    bt_add = createButton('Add Image');
    bt_add.mousePressed(function(){
        predictor.addImage(slider.value());
    });

    bt_train = createButton('Train Model');
    bt_train.mousePressed(function(){
        console.log("Training...");
        predictor.train(whileTraining);
    });
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(value, 10, height - 20);
}

