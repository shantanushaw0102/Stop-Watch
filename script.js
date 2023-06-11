let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchStartTime;
let stopwatchElapsedTime = 0;

let timerInterval;
let timerRunning = false;
let timerStartTime;
let timerDuration = 0;

function startPause() {
  if (stopwatchRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
}

function startStopwatch() {
  stopwatchStartTime = new Date().getTime() - stopwatchElapsedTime;
  stopwatchInterval = setInterval(updateStopwatch, 10);
  stopwatchRunning = true;
  document.getElementById("startPauseButton").textContent = "Pause";
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  document.getElementById("startPauseButton").textContent = "Start";
}

function updateStopwatch() {
  const currentTime = new Date().getTime();
  stopwatchElapsedTime = currentTime - stopwatchStartTime;
  const formattedTime = formatTime(stopwatchElapsedTime);

  const [hours, minutes, seconds, milliseconds] = formattedTime.split(":");
  document.getElementById("stopwatch-hr").textContent = hours;
  document.getElementById("stopwatch-min").textContent = minutes;
  document.getElementById("stopwatch-sec").textContent = seconds;
  document.getElementById("stopwatch-count").textContent = milliseconds;
}

function split() {
  const splitTime = formatTime(stopwatchElapsedTime);
  const currentTime = new Date().toLocaleString();
  const splitItem = document.createElement("li");
  splitItem.textContent = `Split: ${splitTime} - ${currentTime}`;
  document.getElementById("splitsList").appendChild(splitItem);
}

function reset() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchElapsedTime = 0;
  document.getElementById("stopwatch-hr").textContent = "00";
  document.getElementById("stopwatch-min").textContent = "00";
  document.getElementById("stopwatch-sec").textContent = "00";
  document.getElementById("stopwatch-count").textContent = "00";
  document.getElementById("startPauseButton").textContent = "Start";
  document.getElementById("splitsList").innerHTML = "";
}

function startTimer() {
  if (!timerRunning) {
    const durationInput = document.getElementById("timerInput").value;
    if (durationInput.trim() === "" || isNaN(durationInput)) {
      alert("Please enter a valid duration in seconds.");
      return;
    }
    timerDuration = parseInt(durationInput, 10) * 1000;
    timerStartTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 10);
    timerRunning = true;
  }
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - timerStartTime;
  const remainingTime = timerDuration - elapsedTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timer-hr").textContent = "00";
    document.getElementById("timer-min").textContent = "00";
    document.getElementById("timer-sec").textContent = "00";
    document.getElementById("timer-count").textContent = "00";
    alert("Timer finished!");
  } else {
    const formattedTime = formatTime(remainingTime);

    const [hours, minutes, seconds, milliseconds] = formattedTime.split(":");
    document.getElementById("timer-hr").textContent = hours;
    document.getElementById("timer-min").textContent = minutes;
    document.getElementById("timer-sec").textContent = seconds;
    document.getElementById("timer-count").textContent = milliseconds;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById("timer-hr").textContent = "00";
  document.getElementById("timer-min").textContent = "00";
  document.getElementById("timer-sec").textContent = "00";
  document.getElementById("timer-count").textContent = "00";
  document.getElementById("timerInput").value = "";
}

function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function switchToStopwatch() {
  document.getElementById("stopwatch").style.display = "block";
  document.getElementById("timer").style.display = "none";
  resetTimer();
}

function switchToTimer() {
  document.getElementById("stopwatch").style.display = "none";
  document.getElementById("timer").style.display = "block";
  reset();
}
