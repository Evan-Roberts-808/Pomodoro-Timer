let breakTime = 5 * 60;
let workTime = 25 * 60;
let isSessionMode = true;
let workTimer;
let breakTimer
const workDefault = 25 * 60;
const breakDefault = 5 * 60;
const breakMinus = document.getElementById("break-minus");
const breakSession = document.getElementById("break-session");
const breakPlus = document.getElementById("break-plus");
const workMinus = document.getElementById("work-minus");
const workSession = document.getElementById("work-session");
const workPlus = document.getElementById("work-plus");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const title = document.getElementById("title");
const audio = new Audio('https://github.com/Evan-Roberts-808/Pomodoro-Timer/blob/main/src/chime.wav');


// Subtracts Minutes From Break
breakMinus.addEventListener("click", () => {
    if (breakTime - 60 === 0) {
        return;
    }
    
    breakTime -= 60;
    breakSession.textContent = breakTime / 60;
});

// Adds Minutes to Break
breakPlus.addEventListener("click", () => {
    breakTime += 60;
    breakSession.textContent = breakTime / 60;
});

// Subtracts Minutes From Work
workMinus.addEventListener("click", () => {
    if (workTime - 60 === 0) {
        return;
    }
   
    workTime -= 60;
    workSession.textContent = workTime / 60;

    if (isSessionMode) {
        timerMinutes.textContent = workTime / 60;
    }
});

// Adds Minutes to Work
workPlus.addEventListener("click", () => {
    workTime += 60;
    workSession.textContent = workTime / 60;

    if (isSessionMode) {
        timerMinutes.textContent = workTime / 60;
    }
});

// Function to update the timers minutes and seconds
function updateTimer(length) {
    if(Math.floor(length / 60).toString().length === 1){
        timerMinutes.textContent = "0" + Math.floor(length / 60);
    } else {
         timerMinutes.textContent = Math.floor(length / 60);
        }
    
    if ((length % 60).toString().length === 1) {
        timerSeconds.textContent = "0" + (length % 60);
    } else {
        timerSeconds.textContent = length % 60;
    }
}

// Functionality for work timer
function startWork() {
    clearInterval(breakTimer)
    isSessionMode = true
    title.textContent = " Work Session";

    workTimer = setInterval(() => {
        workTime -= 1;
        updateTimer(workTime);

        if(workTime === 0) {
            breakTime = parseInt(breakSession.textContent, 10) * 60;
            updateTimer(breakTime);
            startBreak();
            audio.play();
        }
    }, 1000);
}

// Switches to break timer when work timer hits 0
function startBreak() {
    clearInterval(workTimer)
    isSessionMode = false
    title.textContent = "Break Session";

    breakTimer = setInterval(() => {
        breakTime -= 1;
        updateTimer(breakTime);

        if(breakTime === 0){
          workTime = parseInt(workSession.textContent, 10) * 60;
           updateTimer(workTime); 
            startWork();
            audio.play();
        }
    }, 1000);
}


// Play button functionality
play.addEventListener("click", () => {
    if(isSessionMode) {
        startWork();
    } else {
        startBreak();
    }
})

// Pause button functionality
pause.addEventListener("click", () => {
    if(isSessionMode) {
        clearInterval(workTimer);
    }
})

// Reset button functionality
function resetTimer() {
    isSessionMode = true;
    breakTime = breakDefault;
    workTime = workDefault;
    breakSession.textContent = breakDefault / 60;
    workSession.textContent = workDefault / 60;
    clearInterval(workTimer);
    timerMinutes.textContent = workDefault / 60;
    timerSeconds.textContent = "00";
}

reset.addEventListener("click", () => {
    resetTimer();
})

// 
