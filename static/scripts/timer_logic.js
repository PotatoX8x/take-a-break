var timer_button = document.querySelector('#timer_button');
var reset_button = document.querySelector('#reset_button');
var display = document.querySelector('#clock');
var inputs = document.querySelectorAll("input[type=number]");
var work_minutes, work_seconds, break_minutes, break_seconds;
var remaining_minutes, remaining_seconds;
var interval;
var current_mode = "reset"; // "reset", "start", or "stop"
var work_mode = "work";


function runInterval(start_minutes, start_seconds){
    let duration = parseInt(start_minutes) * 60 + parseInt(start_seconds);

    if (isNaN(duration) || duration <= 0) {
        stopTimer();
        return;
    }

    updateClockMode(); // Apply color for current mode

    interval = setInterval(function(){
        if (duration-- <= 0) {
            clearInterval(interval);

            // Switch phase
            if (work_mode === "work") {
                work_mode = "break";
                startTimer(parseInt(break_minutes), parseInt(break_seconds));
            } else {
                work_mode = "work";
                startTimer(parseInt(work_minutes), parseInt(work_seconds));
            }

            return;
        }

        remaining_minutes = parseInt(duration / 60, 10).toString().padStart(2, '0');
        remaining_seconds = parseInt(duration % 60, 10).toString().padStart(2, '0');
        display.textContent = remaining_minutes + ":" + remaining_seconds;
    }, 1000);
}


function updateClockMode() {
    display.classList.remove("work_mode", "break_mode");
    display.classList.add(work_mode === "work" ? "work_mode" : "break_mode");
}


timer_button.onclick = function () {
    if(current_mode === "reset"){
        setTimer();
        startTimer(parseInt(work_minutes), parseInt(work_seconds));
    }
    else if (current_mode === "start"){
        stopTimer();
    }
    else if (current_mode === "stop"){
        startTimer(parseInt(remaining_minutes), parseInt(remaining_seconds));
    }
}

reset_button.onclick = function () {
    resetTimer();
}


function setTimer(){
    work_minutes = document.querySelector("#work_input_minute").value || "00";
    work_seconds = document.querySelector("#work_input_second").value || "00";
    break_minutes = document.querySelector("#break_input_minute").value || "00";
    break_seconds = document.querySelector("#break_input_second").value || "00";
    display.textContent = work_minutes.padStart(2, '0') + ":" + work_seconds.padStart(2, '0');
}


function startTimer(minutes, seconds){
    timer_button.textContent = "Stop";
    timer_button.classList.remove("start_mode");
    timer_button.classList.add("stop_mode");
    runInterval(minutes, seconds);
    current_mode = "start";
}


function stopTimer(){
    timer_button.textContent = "Start";
    timer_button.classList.remove("stop_mode");
    timer_button.classList.add("start_mode");
    clearInterval(interval);
    current_mode = "stop";
}


function resetTimer() {
    timer_button.textContent = "Start";
    timer_button.classList.remove("stop_mode", "start_mode");
    timer_button.classList.add("start_mode");
    clearInterval(interval);
    interval = null;
    display.classList.remove("work_mode", "break_mode");
    display.textContent = "00:00";
    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = "00";
    }
    current_mode = "reset";
    work_mode = "work";
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