var canvas, ctx, bg, spriteSheet, locations, cards;

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
			gems: 0,
			recruits: 5
		},
		wall: 10,
		tower: 20
	};

	enemy = {
		resources: {
			quarry: 2,
			magic: 2,
			dungeon: 9,
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
 * Draw a frame
 */
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
