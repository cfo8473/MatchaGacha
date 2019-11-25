https://matchagacha-2bdba.firebaseapp.com/

# Matcha Gacha

An idle game made with Javascript that involves the use of the popular Gacha system. The user will have an automatic stat gain that can be augmented by manually clicking or pressing on specific keys. Items can be rolled by gambling away currency.

The goal of the game is to protect the green tea tree (or bush if you prefer realism.)

[ A S D F ] to tap

[ Q W E R ] for limit breaks

[ Z X C V ] to upgrade 

## Technologies
Matcha Gacha was created using vanilla Javascript with the intentional avoidance of other libraries or functionalities in order to practice the language.

## Features

<h1>
  <img
       align="center"
       src="https://i.imgur.com/oEblT7S.png"
       alt="Matcha Gacha features"
  </img>
</h1>

- Idle clicker functionality
- 4 character system with different auto attack timers
- A scrolling "infinity" background comprised of 7 different canvases to give the illusion of a circular movement
- Mob support (regular enemies, bosses and lootboxes)
  * Every boss has phases with visual representation as animations based on the landscape using z-index manipulation
- Ability to upgrade characters
- Scaling difficulty based on level (number of defeated foes)
= Limit break system where special attacks can be used based on intervals
  * Each limit break has a unique effect on the background canvas
  ```js
  this.canvasList = ["game-canvas", "menu-canvas", "hill-canvas", "sky-canvas", 
      "fuji-canvas", "cloud-layer-a-canvas", "cloud-layer-c-canvas",
      "boss-layer-c-canvas", "mountains-canvas", "background-mountains-canvas"];

    this.canvasList.forEach( (canvas) => {
      document.getElementById(canvas).style.width = "50%";
      document.getElementById(canvas).style.top = "100px";
      document.getElementById(canvas).style.filter = "blur(2px)";
      document.getElementById(canvas).style.opacity = "0.8";
    });
  ```
  

## Setup
Clone the repository onto your desktop and open `./dist/index.html`

You may also run `firebase serve` and access the demo using localhost:5000

