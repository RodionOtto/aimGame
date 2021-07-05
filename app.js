const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "DarkSalmon",
  "MediumAquamarine",
  "DarkOliveGreen",
  "LightCyan",
  "DarkMagenta",
  "Wheat",
  "Ivory",
  "Tomato",
  "LimeGreen",
  "IndianRed",
  "Gold",
  "MediumSlateBlue",
  "Teal",
  "Olive",
];
let score = 0;
let time = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircles();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircles();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timer.innerHTML = `00:${value}`;
}

function finishGame() {
  timer.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счёт: <span class='primary'>${score}<span></h1>`;
}

function createRandomCircles() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 70);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.backgroundColor = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
