
let diffEls = document.querySelectorAll(".diff__btn");


let diffEl = document.querySelector(".diff__btn.active").innerHTML;

let n = diffEl;
let colorsEl = document.querySelector(".colors");

let colorsBlocks;

let rgbEl = document.querySelector(".rgb");

let statusEl = document.querySelector(".status");

let colors = [];

createBlocks(n);

resetGame();

addGlobalEventListener("click", ".diff__btn", (e) => {
  [...e.target.parentElement.children].forEach((game) =>
    game.classList.remove("active")
  );
  e.target.classList.add("active");

  setNumberOfTiles(e.target.innerHTML);
});

addGlobalEventListener("click", ".colors__block", (e) => {
  checkColors(e);
});


function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

function checkColors(e) {
  if (rgbEl.innerText.toLowerCase() == e.target.style.backgroundColor) {
    statusEl.innerHTML = "You guessed the right color!";

    
    for (let i = 0; i < colorsBlocks.length; i++) {
      colorsBlocks[i].style.backgroundColor = e.target.style.backgroundColor;
    }

    setTimeout(() => {
      resetGame();
    }, 5000);

    
  } else {
    e.target.style.display = "none";
  }
}

function resetGame() {
  createBlocks(n);
  document.body.style.color = "black"; 
  colors = []; 
  pickColors(); 
  pickedColor = random(n);
  rgbEl.innerHTML = colors[pickedColor];
  setColors();
  statusEl.innerHTML =
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
}


function setColors() {
  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}


function pickColors() {
  for (let i = 0; i < n; i++) {
    colors.push(randomColor());
  }
}


function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

function random(r) {
  return Math.floor(Math.random() * r);
}


function setNumberOfTiles(e) {
  createBlocks(e);
  pickColors();
  setColors();
}

function createBlocks(num) {
  colorsEl.innerHTML = "";

  
  for (let i = 0; i < num; i++) {
    let block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }
  
  colorsBlocks = document.querySelectorAll(".colors__block");

  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
  }
}