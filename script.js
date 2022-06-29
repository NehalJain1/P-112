prediction_label = "";
prediction_accuracy = "";
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach( '#webcam' );

 function TakeSnapshot() {
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById('result').innerHTML ='<img id="captured_image" src="'+data_uri+'"/>';
    } );
 }

 console.log("ml5 version -",ml5.version);

 classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/RQI2nP68a/model.json",model_loaded);

 function model_loaded() {
     console.log("Model has loaded!");
 }

 function Speak() {
    //Synth is the variable which is holding the text to speech API
    var synth = window.speechSynthesis;
    var speak_data1 = "The prediction is"+prediction_label;
    var speak_data2 = "with the accuracy"+prediction_accuracy;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis) ;
 }

 function PredictEmotion() {
   captured_img = document.getElementById("captured_image");
     classifier.classify(captured_img,gotresults); 
 }

 function gotresults(error,results) {
     if(error) {
         console.error(error);
     }
     else {
    console.log(results);
    document.getElementById("gesture_name").innerHTML = results[0].label;
    document.getElementById("gesture_accuracy").innerHTML = results[0].confidence.toFixed(2)*100 + "%";
    prediction_label = results[0].label ;
    prediction_accuracy = results[0].confidence.toFixed(2)*100 + "%" ;
    Speak();
     //-----------------------------------------------------------------------
     if (results[0].label == "Thumbs up") {
        document.getElementById("hand_gesture").innerHTML = "&#128077;" ;
        }
        if (results[0].label == "Victory hand") {
         document.getElementById("hand_gesture").innerHTML = "&#9996;" ;
         }
         if (results[0].label == "Thumbs down") {
             document.getElementById("hand_gesture").innerHTML = "&#128078;" ;
             }
         if (results[0].label == "Clap hand") {
             document.getElementById("hand_gesture").innerHTML = "&#128079;" ;
             }
             if (results[0].label == "Okay hand") {
              document.getElementById("hand_gesture").innerHTML = "&#128076;" ;
              }
       if (results[0].label == "Waving hand") {
                  document.getElementById("hand_gesture").innerHTML = "&#128075;" ;
                  }
      }
  }
