var start_button = document.querySelector('#start_button');
var reset_button = document.querySelector('#reset_button');
var display = document.querySelector('#clock');
var inputs = document.querySelectorAll("input[type=number]");
var work_minutes = document.querySelector("#work_input_minute").value;
var work_seconds = document.querySelector("#work_input_second").value;
var break_minutes = document.querySelector("#break_input_minute").value;
var break_seconds = document.querySelector("#break_input_second").value;
var remaining_minutes, remaining_seconds;
var interval;
var current_mode = "reset";
var work_mode = "work";

function runInterval(start_minutes, start_seconds){
    var duration = parseInt(start_minutes) * 60 + parseInt(start_seconds);
    interval = setInterval(function(){
        if (duration-- == 0) {
            stopTimer();
            return;
        }
        remaining_minutes = parseInt(duration / 60, 10).toString().padStart(2, '0');
        remaining_seconds = parseInt(duration % 60, 10).toString().padStart(2, '0');
        display.textContent = remaining_minutes + ":" + remaining_seconds;
    }, 1000);
}

start_button.onclick = function () {
    if(current_mode == "reset"){
        setTimer();
        startTimer(work_minutes, work_seconds);
    }
    else if (current_mode == "start"){
        stopTimer();
    }
    else if (current_mode == "stop"){
        startTimer(remaining_minutes, remaining_seconds);
    }
}

reset_button.onclick = function () {
    resetTimer();
}

function setTimer(){
    work_minutes = document.querySelector("#work_input_minute").value;
    work_seconds = document.querySelector("#work_input_second").value;
    break_minutes = document.querySelector("#break_input_minute").value;
    break_seconds = document.querySelector("#break_input_second").value;
    display.textContent = work_minutes + ":" + work_seconds;
}

function startTimer(minutes, seconds){
    start_button.textContent = "Stop";
    start_button.id = "stop_button";
    runInterval(minutes, seconds);
    current_mode = "start";
}

function stopTimer(){
    start_button.textContent = "Start"
    start_button.id = "start_button";
    clearInterval(interval);
    current_mode = "stop";
}

function resetTimer() {
    start_button.textContent = "Start";
    start_button.id = "start_button";
    clearInterval(interval);
    interval = null;
    display.textContent =  "00:00";
    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = "00";
    }
    current_mode = "reset";
}

function addLeadingZero(event) {
    const maxLength = parseInt(event.target.getAttribute("maxlength"));
    let newValue = ("0".repeat(maxLength) + Math.abs(event.target.value).toString()).slice(-maxLength);
    if(newValue < event.target.min){
        newValue = "00";
    }
    else if(newValue > event.target.max){
        newValue = "60";
    }
    event.target.value = newValue;
}

for (var i = 0; i < inputs.length; ++i) {
    inputs[i].addEventListener('input', addLeadingZero);
}