let timerInterval;
let timeLeft = 0; // In seconds

let user;

// Form elements
const name = document.getElementById("name");
const age = document.getElementById("age");
const timeWorking = document.getElementById("time-working");
const timeRest = document.getElementById("time-rest");

class User {
  constructor(name, age, timeWorking, timeRest) {
    this.name = name;
    this.age = age;
    this.timeWorking = timeWorking;
    this.timeRest = timeRest;
  }
}

const formButton = document.getElementById("form-button");
formButton.addEventListener("click", () => {
  console.log("Form button clicked");
  user = new User(name.value, age.value, timeWorking.value, timeRest.value);

  takeInformation();
});

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  console.log("Start button clicked");
  startTimer();
});

function takeInformation() {
  setTimer(parseInt(user.timeWorking)); // Establece el temporizador en segundos
  // startTimer();
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
      setTimer(timeWorking); //Reset the timer but with hardcode value
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function setTimer(timeInSeconds) {
  timeLeft = timeInSeconds;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Update the HTML with the new time
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function showNotification() {
  alert("Time's up!");
}
