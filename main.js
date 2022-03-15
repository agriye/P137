objects = [];
status = "";
function setup() {
  canvas = createCanvas(380, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,300);
  video.hide();
}
function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}
function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  name = document.getElementById("name").value;
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw() {
  image(video, 0, 0, 380, 300);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill("red");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("red");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == name)
          {
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = name + " is found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(name + "is found");
            synth.speak(utterThis);
            synth.stop();
          }
          else
          {
            document.getElementById("object_status").innerHTML = name + " is not found";
            speak = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(name + "is not found");
            speak.speak(utterThis);
            speak.stop();
          }          
         }
      }
}