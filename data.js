var sounds = {
	archmage: {
		damage:			new Audio('Sounds/Archmage/damage.wav'),
		deal:			new Audio('Sounds/Archmage/deal.wav'),
		defeat:			new Audio('Sounds/Archmage/defeat.wav'),
		quarry_down:	new Audio('Sounds/Archmage/quarry_down.wav'),
		shuffle:		new Audio('Sounds/Archmage/shuffle.wav'),
		start:			new Audio('Sounds/Archmage/start.wav'),
		tower_up:		new Audio('Sounds/Archmage/tower_up.wav'),
		typing:			new Audio('Sounds/Archmage/typing.wav'),
		victory:		new Audio('Sounds/Archmage/victory.wav'),
	},

	mm7: {
		bricks_down:	new Audio('Sounds/Might and Magic 7/bricks down.wav'),
		bricks_up:		new Audio('Sounds/Might and Magic 7/bricks up.wav'),
		damage:			new Audio('Sounds/Might and Magic 7/damage.wav'),
		deal:			new Audio('Sounds/Might and Magic 7/deal.wav'),
		defeat:			new Audio('Sounds/Might and Magic 7/defeat.wav'),
		quarry_down:	new Audio('Sounds/Might and Magic 7/quarry down.wav'),
		quarry_up:		new Audio('Sounds/Might and Magic 7/quarry up.wav'),
		shuffle:		new Audio('Sounds/Might and Magic 7/shuffle.wav'),
		tower_up:		new Audio('Sounds/Might and Magic 7/tower up.wav'),
		typing:			new Audio('Sounds/Might and Magic 7/typing.wav'),
		victory:		new Audio('Sounds/Might and Magic 7/victory.wav'),
		wall_up:		new Audio('Sounds/Might and Magic 7/wall up.wav'),
	},

	mm8: {
		bricks_down:	new Audio('Sounds/Might and Magic 8/bricks down.wav'),
		bricks_up:		new Audio('Sounds/Might and Magic 8/bricks up.wav'),
		damage:			new Audio('Sounds/Might and Magic 8/damage.wav'),
		deal:			new Audio('Sounds/Might and Magic 8/deal.wav'),
		defeat:			new Audio('Sounds/Might and Magic 8/defeat.wav'),
		quarry_down:	new Audio('Sounds/Might and Magic 8/quarry down.wav'),
		quarry_up:		new Audio('Sounds/Might and Magic 8/quarry up.wav'),
		shuffle:		new Audio('Sounds/Might and Magic 8/shuffle.wav'),
		tower_up:		new Audio('Sounds/Might and Magic 8/tower up.wav'),
		typing:			new Audio('Sounds/Might and Magic 8/typing.wav'),
		victory:		new Audio('Sounds/Might and Magic 8/victory.wav'),
		wall_up:		new Audio('Sounds/Might and Magic 8/wall up.wav'),
	}


};

var cards = {
    // Brick Shortage: All players lose 8 bricks
	0: {
		bCost: 0
	},
	// Luck Cache: +2 Bricks, +2 Gems, Play again
	1: {
		bCost: 0
	},
	// Friendly Terrain: +1 Wall, play again
	2: {
		bCost: 1
	},
	// Miners: +1 Quarry
	3: {
		bCost: 3
	},
    // Mother Lode: if quarry < enemy quarry, +2 quarry. Else +1 quarry
	4: {
		bCost: 4
	},
	// Dwarven Miners: +4 Wall, +1 Quarry
	3: {
		bCost: 7
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
	3: {
		bCost: 0
	},
};

/**
var cards =	{
	
	// Brick Shortage
	0:
		quarry
		magic
		dungeon

		bricks
		gems
		recruits

		tower
		wall

		play again
		draw card
		discard

		if statements

		who is affected

		*swap wall
		*card can't be discarded
		*all players resource = highest players
		*thief

};
*/
