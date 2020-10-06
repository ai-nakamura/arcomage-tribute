var cardWidth = 96;
var cardHeight = 128;

var sprites = {
	//                   x    y    w    h
	resourceBackground: [765,   0,  78, 216]
};

/**
 * Copies a rectangle from the source to the canvas
 *
 * @param source - source material that contiains the desired image
 * @param destRect - rectangular region to draw the image
 * @param srcOffSet - x y position to draw the source in such a way that
 * 					  the desired image aligns with the rectangular region
 */
function bitBlit(source, destRect, srcOffSet) {

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
function blitSprite(srcX, srcY, w, h, destX, destY) {

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
function drawResources(x, y, active) {

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
function drawResourceBackground(x, y) {

	blitSprite(...sprites.resourceBackground, x, y);

}

/**
 * Draw tower of given player
 * @param {number} x - x coordinate of the left of tower column
 * @param {number} columnBottom - y coordinate of the BOTTOM of tower column
 * @param {active} - which player's tower to draw
 */
function drawTower(x, columnBottom, active) {
	
	// height/column of tower
	var columnWidth = 45;
	var columnHeight = 200;
	var activeColumnHeight = (columnHeight / 50) * active.tower;

	var columnLeft = x;
	var columnTop = columnBottom - activeColumnHeight;

	var columnSpriteOffsetX = 892;
	var columnSpriteOffsetY = 0;

    var columnSheetX = columnLeft - columnSpriteOffsetX;
    var columnSheetY = columnTop - columnSpriteOffsetY;

	bitBlit(
		spriteSheet,
		[columnLeft, columnTop, columnWidth, activeColumnHeight],
		[columnSheetX, columnSheetY]
	);

	// top of tower
	
    var spriteWidth = 68;
    var spriteHeight = 94;

	var towerLeft = columnLeft - 11;
	var towerTop = columnTop - spriteHeight;

	var towerSpriteOffsetX = 384;
	var towerSpriteOffsetY = 0;
	if (active === enemy) { towerSpriteOffsetY += spriteHeight; }

    var towerSheetX = towerLeft - towerSpriteOffsetX;
    var towerSheetY = towerTop - towerSpriteOffsetY;

	bitBlit(
		spriteSheet,
		[towerLeft, towerTop, spriteWidth, spriteHeight],
		[towerSheetX, towerSheetY]
	);
	
	// console.log(`drew ${active}\'s tower`);
}


/**
 * Draw the player's cards
 *
 * @param {number} x - x coordinate of where card is to be drawn
 * @param {number} y - y coordinate of where card is to be drawn
 * @param {number} cardNum - index of card to be drawn
 */
function drawCards(x, y, cardNum) {

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
function drawYellowNumber(x, y, number) {

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
function drawYellowDigit(x, y, digit) {

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
function drawBlackNumber(x, y, number, resource) {

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
function drawBlackDigit(x, y, digit, resource) {

    var spriteWidth = 13;
    var spriteHeight = 10;

    var spriteOffsetX = 254 + spriteWidth * digit;
    var spriteOffsetY = 128;

    if (resource === "bricks")	 { spriteOffsetY += spriteHeight * 0; }
    if (resource === "gems")	 { spriteOffsetY += spriteHeight * 1; }
    if (resource === "recruits") { spriteOffsetY += spriteHeight * 2; }

    var sheetX = x - spriteOffsetX;
    var sheetY = y - spriteOffsetY;

    bitBlit(spriteSheet, [x, y, spriteWidth, spriteHeight], [sheetX, sheetY]);
}
