import { Action, PlayerAction, cards, sounds } from "./data";
import {
  cardHeight,
  cardWidth,
  drawCards,
  drawResources,
  drawTower,
  drawWall,
} from "./graphics";

// Types
export type PlayerState = {
  resources: {
    bricks: number;
    gems: number;
    recruits: number;

    quarry: number;
    magic: number;
    dungeon: number;
  };

  tower: number;
  wall: number;
};

// Constants
var PLAYER_TURN = 0 as const;
var ENEMY_TURN = 1 as const;

// Variables
var locations: number[][];
var playerHand: number[];
var bg: HTMLImageElement;
export var spriteSheet: HTMLImageElement;
var canvas: HTMLCanvasElement;
export var ctx: CanvasRenderingContext2D;

var turn: typeof PLAYER_TURN | typeof ENEMY_TURN;

var player: PlayerState;
var enemy: PlayerState;

//
// Init
//

function main(): void {
  // technically this could be set up with async and await,
  // but that's a lesson for another day
  loadImages(
    {
      bg: "Original game assets/Layout.bmp",
      spriteSheet: "Original game assets/SPRITES.png",
    },
    function (results: Record<string, HTMLImageElement>) {
      bg = results.bg;
      spriteSheet = results.spriteSheet;
      init();
    }
  );
}

main();

/**
 * Load a set of images all at once.
 *
 * @param {object} images - A dictionary. Key = image name. Value = URL.
 * @param {function} onDone - function to be called when loading is done
 *                            it will be called with the value of "results"
 */
function loadImages(
  images: Record<string, string>,
  onDone: (results: Record<string, HTMLImageElement>) => void
): void {
  // Dictionary from image name to Image.
  const results = {};

  let doneLoadCount = 0;
  let totalToLoad = 0;

  for (const name in images) {
    totalToLoad += 1;
  }

  function makeImage(name: string, src: string): void {
    const img = new Image();

    img.addEventListener("load", function () {
      results[name] = img;

      doneLoadCount += 1;

      if (doneLoadCount === totalToLoad) {
        onDone(results);
      }
    });

    img.addEventListener("error", function (error: unknown) {
      console.error("Error loading image", src, error);
    });

    img.src = src;
  }

  for (const name in images) {
    const src = images[name];
    makeImage(name, src);
  }
}

function init(): void {
  // initialize variables
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");

  locations = [
    [10, 331],
    [111, 324],
    [220, 324],
    [325, 327],
    [432, 325],
    [537, 327],
  ];

  playerHand = [
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
  ];

  turn = PLAYER_TURN;

  player = {
    resources: {
      quarry: 10,
      magic: 5,
      dungeon: 2,
      bricks: 30,
      gems: 30,
      recruits: 30,
    },
    wall: 10,
    tower: 20,
  };

  enemy = {
    resources: {
      quarry: 2,
      magic: 2,
      dungeon: 9,
      bricks: 50,
      gems: 5,
      recruits: 5,
    },
    wall: 10,
    tower: 20,
  };

  // set up event handlers

  // card collision
  canvas.addEventListener("click", function (e) {
    const pageOffSet = 10;
    const X = e.pageX - pageOffSet;
    const Y = e.pageY - pageOffSet;

    for (const i in locations) {
      const top = locations[i][1];
      const bottom = locations[i][1] + cardHeight;
      const left = locations[i][0];
      const right = locations[i][0] + cardWidth;

      if (X >= left && X < right && Y >= top && Y < bottom) {
        const cardNumber = playerHand[i];
        if (!canPlay(cardNumber)) {
          console.log("Not enough resources! Maybe next turn :(");
          return;
        }
        playCard(cardNumber);
        playerHand[i] = randomCard();

        // TODO: Change this when doing "play again" and "draw & discard".
        nextTurn();
      }
    }
  });

  loop();
}

/**
 * Game loop. After being called the first time, it is called 60 times per
 * second because of requestAnimationFrame().
 */
function loop(): void {
  update();
  draw();

  requestAnimationFrame(loop);
}

//
// Updates
//

/**
 * Updates game state for each new frame. Called once per frame.
 */
function update(): void {
  switch (turn) {
    case PLAYER_TURN:
      // TODO
      break;
    case ENEMY_TURN:
      // TODO
      nextTurn();
      break;
  }
}

function nextTurn(): void {
  let active;
  switch (turn) {
    case PLAYER_TURN:
      turn = ENEMY_TURN;
      active = enemy;
      break;
    case ENEMY_TURN:
      turn = PLAYER_TURN;
      active = player;
      break;
  }

  // Upkeep.
  active.resources.bricks += active.resources.quarry;
  active.resources.gems += active.resources.magic;
  active.resources.recruits += active.resources.dungeon;
}

function takeTurn(): void {}

//
// Draw code
//

/**
 * Draw a frame
 */
function draw(): void {
  // Draw background.
  ctx.drawImage(bg, 0, 0);

  // Resources
  drawResources(8, 56, player);
  drawResources(555, 56, enemy);

  // Towers
  drawTower(102, 297, player, false);
  drawTower(494, 297, enemy, true);

  // Walls
  drawWall(178, 297, player);
  drawWall(440, 297, enemy);

  // Cards
  for (var index in playerHand) {
    drawCards(locations[index][0], locations[index][1], playerHand[index]);
  }
}

//
// Input handlers
//

function playCard(cardNumber: number): void {
  const action = cards[cardNumber].effect(player, enemy);

  if (!canPlay(cardNumber)) {
    console.log("Not enough resources! Maybe next turn :(");
    return;
  }

  switch (cardColor(cardNumber)) {
    case 0:
      player.resources.bricks -= cards[cardNumber].cost;
      break;
    case 1:
      player.resources.gems -= cards[cardNumber].cost;
      break;
    case 2:
      player.resources.recruits -= cards[cardNumber].cost;
      break;
  }

  if (action.active) {
    applyPlayerAction(player, action.active);
  }

  if (action.enemy) {
    applyPlayerAction(enemy, action.enemy);
  }

  if (action.playAgain) {
    // TODO
  }

  console.log("player", player);
  console.log("enemy", enemy);
}

function play(snd: HTMLAudioElement): void {
  snd.currentTime = 0;
  snd.play();
}

function applyPlayerAction(player: PlayerState, action: PlayerAction): void {
  const r = player.resources;

  if (action.bricks) {
    r.bricks = Math.max(0, r.bricks + action.bricks);
  }
  if (action.gems) {
    r.gems = Math.max(0, r.gems + action.gems);
  }
  if (action.recruits) {
    r.recruits = Math.max(0, r.recruits + action.recruits);
  }
  if (action.bricks > 0 || action.gems > 0 || action.recruits > 0) {
    play(sounds.mm7.bricksUp);
  } else if (action.bricks < 0 || action.gems < 0 || action.recruits < 0) {
    play(sounds.mm7.bricksDown);
  }

  if (action.quarry) {
    r.quarry = Math.max(0, r.quarry + action.quarry);
  }
  if (action.magic) {
    r.magic = Math.max(0, r.magic + action.magic);
  }
  if (action.dungeon) {
    r.dungeon = Math.max(0, r.dungeon + action.dungeon);
  }
  if (action.quarry > 0 || action.magic > 0 || action.dungeon > 0) {
    play(sounds.mm7.quarryUp);
  } else if (action.quarry < 0 || action.magic < 0 || action.dungeon < 0) {
    play(sounds.mm7.quarryDown);
  }

  if (action.tower) {
    player.tower += action.tower;
    play(action.tower > 0 ? sounds.mm7.towerUp : sounds.mm7.damage);
  }
  if (action.wall) {
    player.wall += action.wall;
    play(action.wall > 0 ? sounds.mm7.wallUp : sounds.mm7.damage);
  }
  if (action.damage) {
    player.wall -= action.damage;
    if (player.wall < 0) {
      player.tower += player.wall;
      player.wall = 0;
    }
    play(sounds.mm7.damage);
  }

  player.wall = Math.max(0, player.wall);
  player.tower = Math.max(0, player.tower);
}

//
// Utilities
//

/**
 * Calculate a new valid card to choose to display
 *
 * @returns {number} - card number to select
 */
function randomCard(): number {
  const color = Math.floor(Math.random() * 3) * 40;
  const card = Math.floor(Math.random() * 34);
  return color + card;
}

function cardColor(cardNumber: number): number {
  return Math.floor(cardNumber / 40);
}

function canPlay(cardNumber: number): boolean {
  const card = cards[cardNumber];
  const cost = card.cost;

  switch (cardColor(cardNumber)) {
    case 0:
      return cost <= player.resources.bricks;
    case 1:
      return cost <= player.resources.gems;
    case 2:
      return cost <= player.resources.recruits;
  }
}
