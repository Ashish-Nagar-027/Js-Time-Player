//========  Top Switch Buttons==========
const switchToCountDown = document.querySelector('.countdown-switch')
const switchToStopWatch = document.querySelector('.stopwatch-switch')
const switchToClock = document.querySelector('.clock-switch')
const stopWatch = document.querySelector('.stopwatch')
const countDown = document.querySelector('#countdown')
const clock = document.querySelector('#clock')
const pageSwitchBar = document.querySelector('.page-switch')


// switching between clock, stopwatch and countdown
pageSwitchBar.addEventListener('click', (e) => {
    if(e.target.classList.contains('stopwatch-switch')){
        stopWatch.style.display = 'flex'
        countDown.style.display = 'none'
        clock.style.display = 'none'
    }

    if(e.target.classList.contains('clock-switch')){
        stopWatch.style.display = 'none'
        countDown.style.display = 'none'
        clock.style.display = 'flex'
    }

    if(e.target.classList.contains('countdown-switch')){
        stopWatch.style.display = 'none'
        countDown.style.display = 'flex'
        clock.style.display = 'none'
    }
})


// by default values default screen
document.addEventListener('DOMContentLoaded', ()=> {
    stopWatch.style.display = 'flex'
    countDown.style.display = 'none'
    clock.style.display = 'none'
})


// ===================================
//     stopWatch code start here
// ==============================

// selecting time
const timerDiv = document.querySelector('.time')

// selecting button
const start = document.querySelector('.start')
const pause = document.querySelector('.pause')
const reset = document.querySelector('.reset')


// Global Variables
let timerId;
let startTime = 0;
let pauseTime = 0


// Event listners
start.addEventListener('click', startTimer)
pause.addEventListener('click', pauseTimer)
reset.addEventListener('click', resetTimer)


// function to start timer
function startTimer() {
    start.disabled = true
    pause.disabled = false
    reset.disabled = true
    startTime =   Date.now();

    timerId = requestAnimationFrame(updateTimer)
}

// pauseing timer
function pauseTimer() {
    start.disabled = false
    pause.disabled = true
    reset.disabled = false
    pauseTime += Date.now() - startTime
    cancelAnimationFrame(timerId)
}

// reset timer
function resetTimer() {
    reset.disabled = true
    timerDiv.innerHTML = ' <span>00</span> : <span>00</span> : <span>000</span> '
    pauseTime = 0;
}

function updateTimer() {
    const millisElapsed = Date.now() - startTime + pauseTime
    const secondsElapsed = millisElapsed / 1000;
    const minutesElapsed = secondsElapsed / 60;
    
    const millisText = millisElapsed % 1000
    const secondsText = Math.floor(secondsElapsed) % 60
    const minutesText = Math.floor(minutesElapsed)

    timerDiv.innerHTML =  `<span>${minutesText}</span> : <span> ${secondsText }</span> : <span>${millisText} </span>`;
    timerId = requestAnimationFrame(updateTimer)
}


// ===================================
// stopWatch  ends here
// ==============================


// ===================================
//    Clock  starts here
// ==============================
const clockTime = document.querySelector('.clockTime')

var clockStopId ; 
function ClockTimeUpdate() {
    const date = new Date()
    let clockHours = date.getHours()
    let clockMinutes = date.getMinutes()
    let clockSeconds = date.getSeconds()
    clockTime.innerHTML = `<span>${clockHours}</span> : <span> ${clockMinutes }</span> : <span>${clockSeconds} </span>`;
    clockStopId = window.requestAnimationFrame(ClockTimeUpdate)
}

window.requestAnimationFrame(ClockTimeUpdate)

// ===================================
//    Clock ends  here
// ==============================
  

// ===================================
//    countDown  starts here
// ==============================


const resetCountDownBtn = document.querySelector('.reset-countdown')

const allCountDownInput = document.querySelectorAll("input[type='number']")

const startCountdownBtn = document.querySelector(".start-countdown")
const hrsInput = document.querySelector(".hrs-input")
const minInput = document.querySelector(".min-input")
const secInput = document.querySelector(".sec-input")


// on  page reload default value reset
document.addEventListener('DOMContentLoaded', ()=> {
    allCountDownInput.forEach(element => {
        element.value = 0
    });
    resetCountDownBtn.disabled = true
})


// starting event
startCountdownBtn.addEventListener('click' , startCountDown)


const toMilliseconds = (hrs,min,sec) => {
    let secondsToMilliSec = sec * 1000
    let minutesToMilliSec = min * 60000
    let hoursToMilliSec = hrs * 3600000 
    // console.log(secondsToMilliSec,minutesToMilliSec,hoursToMilliSec)
    return (secondsToMilliSec + minutesToMilliSec + hoursToMilliSec)
}


let CountDownStartId;
function startCountDown() {
    const timeInMilliSeconds = toMilliseconds(hrsInput.value ,minInput.value, secInput.value)
    const endTime = (Date.now() + timeInMilliSeconds)  
    // console.log(hrsInput.value,minInput.value,secInput.value)
   
    if(secInput.value === '0' && minInput.value === '0' &&  hrsInput.value === '0' ){
        return false
    }
    else {
        CountDownStartId = setInterval(() => ChangeCountDown(endTime),1000)
    }

    startCountdownBtn.disabled = true
    resetCountDownBtn.disabled = false
    
}


function ChangeCountDown(endTime) {
   let secondsLeft = Math.floor(((endTime - Date.now())/1000) % 60)
   let minutesLeft = Math.floor((((endTime -  Date.now()) /1000) / 60) % 60 ) 
   let  hoursLeft = Math.floor(((endTime -  Date.now()) / (1000 * 60 * 60)) % 24 ) 
    
     secInput.value = secondsLeft
     minInput.value = minutesLeft
     hrsInput.value = hoursLeft

     if(secInput.value === '0' && minInput.value === '0' &&  hrsInput.value === '0' ){
        clearInterval(CountDownStartId)
        startCountdownBtn.disabled = false
        resetCountDownBtn.disabled = true
   }
}


resetCountDownBtn.addEventListener('click',()=> {

    allCountDownInput.forEach(element => {
        element.value = 0
    });
    clearInterval(CountDownStartId)
    startCountdownBtn.disabled = false
    resetCountDownBtn.disabled = true
})


// ===================================
//    countDown  ends here
// ==============================


// logo link
const myLogo = document.querySelector('.logo-img')
myLogo.addEventListener('click',()=> {
    window.open("https://ashish-nagar.netlify.app/", '_blank');
})