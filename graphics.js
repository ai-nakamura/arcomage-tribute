var cardWidth = 96;
var cardHeight = 128;

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
 * Draw a resource background
 * @param x = x position on canvas to draw the resource
 * @param y = y position on canvas to draw the resource
 */
function drawResourceBackground(x, y) {

    var spriteWidth = 78;
    var spriteHeight = 216;

    var spriteOffsetX = 765;
    var spriteOffsetY = 0;

    var sheetX = x - spriteOffsetX;
    var sheetY = y - spriteOffsetY;

    bitBlit(spriteSheet, [x, y, spriteWidth, spriteHeight], [sheetX, sheetY]);

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
