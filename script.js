//Making use of the speech recognition module provided by the chrome(webkit)


//checking if the object webkitSpeechRecognition is available in the browser

if("webkitSpeechRecognition" in window){

var sr=new webkitSpeechRecognition();//defining the new object webkitSpeechRecognition
var final="";//defining the final statement
sr.continuous=true;//providing the continuous property of the object as true
sr.interimResults=true;//providing the interimResults property of the object as true

//on start function for speech recognition
sr.onstart=()=>{
    document.querySelector("#status").style.visibility="visible";//displays the listening message on the start of the function
};

//on error function for speech recognition
sr.onerror=()=>{
    document.querySelector("#status").style.visibility="hidden";//hides the listening message if an error occurs
};

//on end function for speech recognition
sr.onend=()=>{
    document.querySelector("#status").style.visibility="hidden";//hides the listening message at the end of the event
}

//the main function that calculates the results(final+interim)
sr.onresult=(event)=>{
    var interim="";//defining interim 

    //loop to calculate and store the words in the form of array......unsure words go under interim and then finally go to the final variable and gets added by their inner HTML
    for(var i=event.resultIndex;i<event.results.length;++i){
        if(event.results[i].isFinal){
            final+=event.results[i][0].transcript;
        }
        else{
            interim+=event.results[i][0].transcript;
        }
    }
    document.querySelector("#confirm").innerHTML=final;
    document.querySelector("#interim").innerHTML=interim;
};

//start function to call on clicking start button
function start(){
    sr.start();
}

//stop function to call on clicking stop button
function stop(){
    sr.stop();
}

//clear function to clear the inner text and the array of final as well
function c(){
    final=""
    document.getElementById("confirm").innerText=""
}
}

//if webkit not available then displays an error message in the console and the document as well
else{
    console.log("Error...Supported by webkit only")
    document.write("Error...Supported by webkit only")
}



//print function to print the speech to text and also exporting in the pdf format
function p(){
    window.print()
}



//event listener added in order to confirm before leaving the site unsaved or before unsaved work is printed or exported
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "";

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});