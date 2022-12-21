import { PlayerState, ctx, spriteSheet } from "./app";

type Rectangle = [number, number, number, number];
type Point = [number, number];

export var cardWidth = 96;
export var cardHeight = 128;

type SpriteName =
  | "resourceBackground"
  | "playerTower"
  | "enemyTower"
  | "column"
  | "wall";

var sprites: Record<SpriteName, Rectangle> = {
  //                   x    y    w    h
  resourceBackground: [765, 0, 78, 216],
  playerTower: [384, 0, 68, 94],
  enemyTower: [384, 94, 68, 94],
  column: [892, 0, 45, 200],
  wall: [843, 0, 22, 200],
};

/**
 * Copies a rectangle from the source to the canvas
 *
 * @param source - source material that contiains the desired image
 * @param destRect - rectangular region to draw the image
 * @param srcOffSet - x y position to draw the source in such a way that
 *                      the desired image aligns with the rectangular region
 */
function bitBlit(
  source: HTMLImageElement,
  destRect: Rectangle,
  srcOffSet: Point
): void {
  ctx.save();
  ctx.beginPath();
  ctx.rect(...destRect);
  ctx.clip();
  ctx.drawImage(source, ...srcOffSet);
  ctx.restore();
}

/**
 * Copies an image from within a spritesheet to the screen
 *
 *
 */
function blitSprite(
  srcX: number,
  srcY: number,
  w: number,
  h: number,
  destX: number,
  destY: number
): void {
  var sheetOffsetX = destX - srcX;
  var sheetOffsetY = destY - srcY;

  bitBlit(spriteSheet, [destX, destY, w, h], [sheetOffsetX, sheetOffsetY]);
}

/**
 *
 * @param {number} x - x position
 * @param {number} y - y position
 * @param {object} active - player whose resources are to be drawn
 */
export function drawResources(x: number, y: number, active: PlayerState): void {
  drawResourceBackground(x, y);

  drawYellowNumber(x + 6, y + 36, active.resources.quarry);
  drawYellowNumber(x + 6, y + 108, active.resources.magic);
  drawYellowNumber(x + 6, y + 180, active.resources.dungeon);

  drawBlackNumber(x + 3, y + 58, active.resources.bricks, "bricks");
  drawBlackNumber(x + 3, y + 130, active.resources.gems, "gems");
  drawBlackNumber(x + 3, y + 202, active.resources.recruits, "recruits");
}

/**
 * Draw a resource background
 * @param {number} x - x position
 * @param {number} y - y position
 */
function drawResourceBackground(x: number, y: number): void {
  blitSprite(...sprites.resourceBackground, x, y);
}

/**
 * Draw tower of given player
 *
 * @param {number} left - x coordinate of the LEFT of the tower column
 * @param {number} bottom - y coordinate of the BOTTOM of the tower column
 * @param {object} active - which player's tower to draw
 * @param {boolean} isEnemy - whether this is the player's or enemy's tower
 *
 */
export function drawTower(
  left: number,
  bottom: number,
  active: PlayerState,
  isEnemy: boolean
): void {
  var column: Rectangle = [...sprites.column];
  var activeColumnHeight = (column[3] / 50) * active.tower;
  column[3] = activeColumnHeight;

  var columnTop = bottom - activeColumnHeight;

  blitSprite(...column, left, columnTop);

  // top of tower

  var spriteHeight = sprites.playerTower[3];

  var towerLeft = left - 11;
  var towerTop = columnTop - spriteHeight;

  var sprite = isEnemy ? sprites.enemyTower : sprites.playerTower;

  blitSprite(...sprite, towerLeft, towerTop);
}

/**
 * Draw wall of given player
 *
 * @param {number} left - x coordinate of the LEFT of the wall
 * @param {number} bottom - y coordinate of the BOTTOM of the wall
 * @param {object} active - which player's wall to draw
 *
 */
export function drawWall(
  left: number,
  bottom: number,
  active: PlayerState
): void {
  var wall: Rectangle = [...sprites.wall];
  var activeWallHeight = (wall[3] / 50) * active.wall;
  wall[3] = activeWallHeight;

  var top = bottom - activeWallHeight;

  blitSprite(...wall, left, top);
}

/**
 * Draw the player's cards
 *
 * @param {number} x - x coordinate of where card is to be drawn
 * @param {number} y - y coordinate of where card is to be drawn
 * @param {number} cardNum - index of card to be drawn
 */
export function drawCards(x: number, y: number, cardNum: number): void {
  var spriteWidth = cardWidth;
  var spriteHeight = cardHeight;

  var spriteOffsetX = 0 + spriteWidth * (cardNum % 10);
  var spriteOffsetY = 220 + spriteHeight * Math.floor(cardNum / 10);

  var sheetX = x - spriteOffsetX;
  var sheetY = y - spriteOffsetY;

  bitBlit(spriteSheet, [x, y, spriteWidth, spriteHeight], [sheetX, sheetY]);
}

/**
 * Draw the yellow digit to represent the number of quarry/magic/dungeon
 * @param {number} x - x coordinate of where the number is to be drawn
 * @param {number} y - y coordinate of where the number is to be drawn
 * @param {number} number - the number of quarry/magic/dungeon to be drawn
 */
function drawYellowNumber(x: number, y: number, number: number): void {
  if (number >= 10) {
    var digit = Math.floor(number / 10);
    drawYellowDigit(x, y, digit);

    x += 22;
    number %= 10;
  }

  drawYellowDigit(x, y, number);
}

/**
 * Logic to draw individual yellow digits
 * @param {number} x - x coordinate of where the digit is to be drawn
 * @param {number} y - y coordinate of where the digit is to be drawn
 * @param {number} digit - digit to be drawn
 */
function drawYellowDigit(x: number, y: number, digit: number): void {
  var spriteWidth = 22;
  var spriteHeight = 17;

  var spriteOffsetX = 192 + spriteWidth * digit;
  var spriteOffsetY = 190;

  var sheetX = x - spriteOffsetX;
  var sheetY = y - spriteOffsetY;

  // FIXME: Make darker.
  bitBlit(spriteSheet, [x, y, spriteWidth, spriteHeight], [sheetX, sheetY]);
}

/**
 * Draw the black digit to represent the number of individual resources
 * @param {number} x - x coordinate of where the number is to be drawn
 * @param {number} y - y coordinate of where the number is to be drawn
 * @param {number} number - the number of individual resources to be drawn
 * @param {string} resource - type of digit to use
 */
function drawBlackNumber(
  x: number,
  y: number,
  number: number,
  resource: string
): void {
  if (number >= 10) {
    var digit = Math.floor(number / 10);
    drawBlackDigit(x, y, digit, resource);

    x += 13;
    number %= 10;
  }

  drawBlackDigit(x, y, number, resource);
}

/**
 * Logic to draw individual black digits
 * @param {number} x - x coordinate of where the digit is to be drawn
 * @param {number} y - y coordinate of where the digit is to be drawn
 * @param {number} digit - digit to be drawn
 * @param {string} resource - type of digit to use
 */
function drawBlackDigit(
  x: number,
  y: number,
  digit: number,
  resource: string
): void {
  var spriteWidth = 13;
  var spriteHeight = 10;

  var spriteOffsetX = 254 + spriteWidth * digit;
  var spriteOffsetY = 128;

  if (resource === "bricks") {
    spriteOffsetY += spriteHeight * 0;
  }
  if (resource === "gems") {
    spriteOffsetY += spriteHeight * 1;
  }
  if (resource === "recruits") {
    spriteOffsetY += spriteHeight * 2;
  }

  var sheetX = x - spriteOffsetX;
  var sheetY = y - spriteOffsetY;

  bitBlit(spriteSheet, [x, y, spriteWidth, spriteHeight], [sheetX, sheetY]);
}
