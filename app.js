var canvas, ctx, bg, spriteSheet, locations, cards;

var cardWidth = 96;
var cardHeight = 128;

var player;
var enemy;




// Game loop. After being called the first time, it is called 60 times per
// second because of requestAnimationFrame().
function loop() {
	// update();
	draw();

	requestAnimationFrame(loop);
}

function init() {
	// initialize variables
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	locations = [
		[10, 331],
		[111, 324],
		[220, 324],
		[325, 327],
		[432, 325],
		[537, 327]
	];

	cards = [
		randomCard(),
		randomCard(),
		randomCard(),
		randomCard(),
		randomCard(),
		randomCard()
	];

	player = {
		resources: {
			quarry: 20,
			magic: 5,
			dungeon: 2,
			bricks: 5,
			gems: 2,
			recruits: 5
		},
		wall: 10,
		tower: 20
	};

	enemy = {
		resources: {
			quarry: 2,
			magic: 2,
			dungeon: 2,
			bricks: 50,
			gems: 5,
			recruits: 5
		},
		wall: 10,
		tower: 20
	};

	// set up event handlers

    // card collision
    canvas.addEventListener('click', function(e) {
		var pageOffSet = 10;
		var X = e.pageX - pageOffSet;
		var Y = e.pageY - pageOffSet;

		for (var i in locations) {
			var top = locations[i][1];
    		var bottom = locations[i][1] + cardHeight;
    		var left = locations[i][0];
    		var right = locations[i][0] + cardWidth;

    		if (X >= left && X < right &&
				Y >= top  && Y < bottom) {
				console.log(`card ${cards[i]} was clicked`);
				cards[i] = randomCard();
				// sounds.mm7.tower_up.play(); // doesn't work on chrome :(
			}
		}
	});

	// call loop
	loop();

}

// Updates game state for each new frame. Called once per frame.
// function update() {
// 	startTurn(player);
// 	startTurn(enemy);
// }

// Take a turn.
// function startTurn(activePlayer) {
// 	activePlayer.resources.bricks += activePlayer.resources.quarry;
// 	activePlayer.resources.gems += activePlayer.resources.magic;
// 	activePlayer.resources.recruits += activePlayer.resources.dungeon;
// }

// Draws the whole screen. Called once per frame.
function draw() {
	// Draw background.
	ctx.drawImage(bg, 0, 0);

	// Resources
	drawResources(8, 56, player);
	drawResources(555, 56, enemy);

	// Cards
	for (var index in cards) {
		drawCards(locations[index][0], locations[index][1], cards[index]);
	}
}

function drawResources(x, y, active) {

	drawResourceBackground(x, y);

	drawYellowNumber(x + 6, y + 36, active.resources.quarry);
	drawYellowNumber(x + 6, y + 108, active.resources.magic);
	drawYellowNumber(x + 6, y + 180, active.resources.dungeon);

	drawBlackNumber(x + 3, y + 58, active.resources.bricks, "bricks");
	drawBlackNumber(x + 3, y + 130, active.resources.gems, "gems");
	drawBlackNumber(x + 3, y + 202, active.resources.recruits, "recruits");

}

function main() {
	// technically this could be set up with async and wait,
	// but that's a lessons for another day
	loadImages(
		{
			bg: 'Original game assets/Layout.bmp',
			spriteSheet: 'Original game assets/SPRITES.png',
		},
		function(results) {
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
function loadImages(images, onDone) {
	// Dictionary from image name to Image.
	var results = {};

	var doneLoadCount = 0;
	var totalToLoad = 0;

	for (var name in images) {
		totalToLoad += 1;
	}

	function makeImage(name, src) {
		var img = new Image;

		img.addEventListener('load', function() {
			results[name] = img;

			doneLoadCount += 1;

			if (doneLoadCount === totalToLoad) {
				onDone(results);
			}
		});

		img.addEventListener('error', function(error) {
			console.error('Error loading image', src, error);
		});

		img.src = src;
	}

	for (var name in images) {
		var src = images[name];
		makeImage(name, src);
	}
}

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
 * Calculate a new valid card to choose to display
 *
 * @returns {number} - card number to select
 */
function randomCard() {

	var color = Math.floor(Math.random() * 3) * 40;
	var card = Math.floor(Math.random() * 34);
	return color + card;

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