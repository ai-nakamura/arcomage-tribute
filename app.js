var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bg;
var spriteSheet;

var locations = [
	[10, 331],
	[111, 324],
	[220, 324],
	[325, 327],
	[432, 325],
	[537, 327]
];

var cards = [
	72,
	41,
	20,
	81,
	108,
	19
];

// Game loop. After being called the first time, it is called 60 times per
// second because of requestAnimationFrame().
function loop() {
	update();
	draw();

	requestAnimationFrame(loop);
}

// Updates game state for each new frame. Called once per frame.
function update() {
}

// Draws the whole screen. Called once per frame.
function draw() {
	// Draw bg 
	ctx.drawImage(bg, 0, 0);

	for (var index in cards) {
		clipCards(ctx, spriteSheet, locations[index][0], locations[index][1], cards[index]);
	}
}

function main() {
	loadImages(
		{
			bg: 'Original game assets/Layout.bmp',
			spriteSheet: 'Original game assets/SPRITES.bmp',
		},
		function(results) {
			bg = results.bg;
			spriteSheet = results.spriteSheet;

			loop();
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
 * @param {object} ctx - Canvas.context
 * @param {Image} spriteSheet - spriteSheet with all game assets
 * @param {number} x - x coordinate of where card is to be drawn
 * @param {number} y - y coordinate of where card is to be drawn
 * @param {number} cardNum - index of card to be drawn
 */
function clipCards(ctx, spriteSheet, x, y, cardNum) {
	// 1. figure out the x, y coordinate of where I want to draw the card
	var cardWidth = 96;
	var cardHeight = 128;
	var cardStartHeight = 220;

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
