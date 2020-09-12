var mobilenet;
var classifier;
var video;
var label = "Add your images and train";
var value = 0;

var inputLabel;
// Best buttons in the market
var bt_train;
var bt_add;
var bt_save;
var bt_load;

function modelReady() {
  console.log("Model is ready!");
}

function videoReady() {
  console.log("Video is ready!");
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label = results[0].label;
    classifier.classify(gotResults);
    //var prob = results[0].confidence;

    // createP(label);
    // createP(prob);
  }
}
function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  classifier = mobilenet.classification(video, videoReady);

  inputLabel = createInput();

  bt_add = createButton("Add Image");
  bt_add.mousePressed(function () {
    var ImageLabel = inputLabel.value();
    classifier.addImage(ImageLabel);
  });

  bt_train = createButton("Train Model");
  bt_train.mousePressed(function () {
    console.log("Training...");
    label = "Training...";
    classifier.train(whileTraining);
  });

  bt_save = createButton("Save");
  bt_save.mousePressed(function () {
    classifier.save();
  });

  bt_load = createButton("Load");
  bt_load.mousePressed(function () {
    // classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
