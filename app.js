// Constants
var PLAYER_TURN = 0;
var ENEMY_TURN = 1;


// Variables
var canvas, ctx, bg, spriteSheet, locations, playerHand;

var turn;

var player;
var enemy;


//
// Init
//

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
			recruits: 30
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
				var cardNumber = playerHand[i];
				if (!canPlay(cardNumber)) {
					console.log('Not enough resources! Maybe next turn :(');
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
function loop() {

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
function update() {
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

function nextTurn() {
	var active;
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

function takeTurn() {
}


//
// Draw code
//

/**
 * Draw a frame
 */
function draw() {

	// Draw background.
	ctx.drawImage(bg, 0, 0);

	// Resources
	drawResources(8, 56, player);
	drawResources(555, 56, enemy);

	// Towers
	drawTower(102, 297, player);
	drawTower(494, 297, enemy);

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

function playCard(cardNumber) {

	var action = cards[cardNumber].effect();

	if (!canPlay(cardNumber)) {
		console.log('Not enough resources! Maybe next turn :(');
		return;
	}

	switch(cardColor(cardNumber)) {
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

	//sounds.mm7.tower_up.play();  // doesn't work on Chrome :(

	if (action.active) {
		applyPlayerAction(player, action.active);
	}

	if (action.enemy) {
		applyPlayerAction(enemy, action.enemy);
	}

	if (action.play_again) {
		// TODO
	}

	console.log('player', player);
	console.log('enemy', enemy);

}

function applyPlayerAction(player, action) {

	var r = player.resources;

	if (action.bricks) {
		r.bricks = Math.max(0, r.bricks + action.bricks);
	}
	if (action.gems) {
		r.gems = Math.max(0, r.gems + action.gems);
	}
	if (action.recruits) {
		r.recruits = Math.max(0, r.recruits + action.recruits);
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

	if (action.tower) {
		player.tower += action.tower;
	}
	if (action.wall) {
		player.wall += action.wall;
	}
	if (action.damage) {
		player.wall -= action.damage;
		if (player.wall < 0) {
			player.tower += player.wall;
			player.wall = 0;
		}
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
function randomCard() {

	var color = Math.floor(Math.random() * 3) * 40;
	var card = Math.floor(Math.random() * 34);
	return color + card;

}

function cardColor(cardNumber) {

	return Math.floor(cardNumber / 40);

}

function canPlay(cardNumber) {

	var card = cards[cardNumber];
	var cost = card.cost;

	switch (cardColor(cardNumber)) {
		case 0:
			return cost <= player.resources.bricks;
		case 1:
			return cost <= player.resources.gems;
		case 2:
			return cost <= player.resources.recruits;
	}

}
