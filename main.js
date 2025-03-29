let timerInterval;
let timeLeft = 0; // In seconds

let user;

let timerStatus;

// Form elements
const name = document.getElementById("name");
const age = document.getElementById("age");
const timeWorking = document.getElementById("time-working");
const timeRest = document.getElementById("time-rest");

// Sections
const formSection = document.getElementById("form-section");
const startButtonSection = document.getElementById("start-button-section");
const activeWorkingContainer = document.getElementById(
  "active-working-container"
);
const onPausedSection = document.getElementById("on-paused");
const onActiveButtons = document.getElementById("on-active-buttons");
const actiivePauseContainer = document.getElementById("active-pause-container");

// Buttons
const formButton = document.getElementById("form-button");
formButton.addEventListener("click", () => {
  console.log("Form button clicked");
  user = new User(name.value, age.value, timeWorking.value, timeRest.value);
  // hidden form section
  formSection.style.display = "none";
  // show start button section
  startButtonSection.style.display = "block";
  takeInformation();
});

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  console.log("Start button clicked");
  timerStatus = "active";
  // hidden start button section
  startButtonSection.style.display = "none";
  // show active working container
  activeWorkingContainer.style.display = "flex";
  startTimer();
});

const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", () => {
  console.log("Continue button clicked");
  startTimer();
  timerStatus = "active";
  console.log(timerStatus);

  // hidden continue button
  onPausedSection.style.display = "none";
  onActiveButtons.style.display = "flex";
});

const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
  console.log("Pause button clicked");
  pauseTimer();

  //hidden pause button
  onActiveButtons.style.display = "none";
  onPausedSection.style.display = "block";
});

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
  console.log("Stop button clicked");
  stopTimer();
  timerStatus = "stopped";
  // hidden active working container
  activeWorkingContainer.style.display = "none";
  // show start button section
  startButtonSection.style.display = "block";
});

class User {
  constructor(name, age, timeWorking, timeRest) {
    this.name = name;
    this.age = age;
    this.timeWorking = timeWorking;
    this.timeRest = timeRest;
  }
}

function takeInformation() {
  setTimer(parseInt(user.timeWorking)); // Establece el temporizador en segundos
  // startTimer();
}

function setTimer(timeInSeconds) {
  if (timerStatus === "paused") {
    timeLeft = timeLeft;
  } else {
    timeLeft = timeInSeconds;
  }
  updateTimerDisplay();
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
      console.log(timeLeft);
    } else {
      clearInterval(timerInterval);
      showNotification();
      setTimer(timeWorking);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerStatus = "paused";
  console.log("Timer paused");
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStatus = "stopped";
  console.log("Timer stopped");
  timeLeft = 0; // Reset the timer
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Update the HTML with the new time
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  activePause();
}

function activePause() {
  if (timerStatus === "active" && timeLeft === 0) {
    console.log("Active pause");
    timerStatus = "stopped";
    // hidden active working container
    activeWorkingContainer.style.display = "none";
    // show active pause container
    actiivePauseContainer.style.display = "flex";
  }
}

function showNotification() {
  alert("Time's up!");
}
