var canvas, ctx, bg, spriteSheet, locations, cards;

var cardWidth = 96;
var cardHeight = 128;
var cardStartHeight = 220;

// Game loop. After being called the first time, it is called 60 times per
// second because of requestAnimationFrame().
function loop() {
	update();
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
		72,
		41,
		20,
		81,
		108,
		19
	];

	// set up event handlers
    // collision
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
			}

		}
	});

	// call loop
	loop();

}

// Updates game state for each new frame. Called once per frame.
function update() {
}

// Draws the whole screen. Called once per frame.
function draw() {
	// Draw bg 
	ctx.drawImage(bg, 0, 0);

	for (var index in cards) {
		clipCards(locations[index][0], locations[index][1], cards[index]);
	}
}

function main() {
	// technically this could be set up with async and wait, but that's a lessons for another day
	loadImages(
		{
			bg: 'Original game assets/Layout.bmp',
			spriteSheet: 'Original game assets/SPRITES.bmp',
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
 * Load a set of images all at once.
 *
 * @param {number} x - x coordinate of where card is to be drawn
 * @param {number} y - y coordinate of where card is to be drawn
 * @param {number} cardNum - index of card to be drawn
 */
function clipCards(x, y, cardNum) {

	// 1. figure out the x, y coordinate of where I want to draw the card
	var xSpriteSheetOffset = 0 + cardWidth * (cardNum % 10);
	var ySpriteSheetOffset = cardStartHeight + cardHeight * Math.floor(cardNum / 10);

	var xSprite = x - xSpriteSheetOffset;
	var ySprite = y - ySpriteSheetOffset;

	// 2. make rect there (x, y, 94, 126)
	ctx.save();
	ctx.beginPath();
	ctx.rect(x, y, cardWidth, cardHeight);

	// 3. .clip()
	ctx.clip();

	// 4. draw spriteSheet at the x, y to line up with the desired card
	ctx.drawImage(spriteSheet, xSprite, ySprite);
	ctx.restore();
}
