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

	/**
	 *
	 * interface Actions {
	 *     cost: number
     *     effect: () => {
	 *         active: Player
	 *         enemy: Player
	 *         play_again: boolean
     *     }
	 * }
	 *
	 * interface Player {
	 *     bricks: number
	 *     gems: number
	 *     recruits: number
	 *
	 *     quarry: number
	 *     magic: number
	 *     dungeon: number
	 *
	 *     tower: number
	 *     wall: number
	 *
	 */
	/***************************************/
	/*                                     */
	/*             RED CARDS               */
	/*                                     */
	/***************************************/
 
    // Brick Shortage: All players lose 8 bricks
	0: {
		cost: 0,
		effect: () => ({
			active: { bricks: -8 },
			enemy: { bricks: -8 },
		})
	},

	// Luck Cache: +2 Bricks, +2 Gems, Play again
	1: {
		cost: 0,
		effect: () => ({
			active: {
				bricks: 2,
				gems: 2
			},
			play_again: true
		})
	},

	// Friendly Terrain: +1 Wall, play again
	2: {
		cost: 1,
		effect: () => ({
			active: { wall: 1 },
			play_again: true
		})
	},

	// Miners: +1 Quarry
	3: {
		cost: 3,
		effect: () => ({
			active: { quarry: 1 }
		})
	},

	// Mother Lode: if ( quarry < enemy quarry ) { +2 quarry } else { +1 quarry }
	4: {
		cost: 4,
		effect: () => ({
			active: {
				quarry:
					player.resources.quarry < enemy.resources.quarry ? 2 : 1
			},
		})
	},

	// Dwarven Miners: +4 Wall, +1 Quarry
	5: {
		cost: 7,
		effect: () => ({
			active: {
				quarry: 1,
				wall: 4
			}
		})
	},

	// Work Overtime: +5 Wall, -6 gems
	6: {
	    cost: 2,
		effect: () => ({
			active: {
				gems: -6,
				wall: 5
			}
		})
	},

	// Copping the Tech: if ( quarry < enemy quarry ) {quarry = enemy quarry}
	7: {
		cost: 5,
		effect: () => ({
			active:
				player.resources.quarry < enemy.resources.quarry
					? enemy.resources.quarry
					: 0
		})
	},

	// Basic Wall: +3 Wall
	8: {
		cost: 2,
		effect: () => ({
			active: {
				wall: 3
			}
		})
	},

	// Sturdy Wall: +4 Wall
	9: {
		cost: 3,
		effect: () => ({
			active: {
				wall: 4
			}
		})
	},

	// Innovations: +1 to all players quarrys, you gain 4 gems
	10: {
		cost: 2,
		effect: () => ({
			active: {
				gems: 4,
				quarry: 1
			},
			enemy: {
				quarry: 1
			}
		})
	},

	// Foundations: if ( wall==0 ) { +6 Wall } else { +3 Wall }
	11: {
		cost: 0
	},

	// 
	12: {
		cost: 0
	},

	// 
	13: {
		cost: 0
	},

	// 
	14: {
		cost: 0
	},

	// 
	15: {
		cost: 0
	},

	// 
	16: {
		cost: 0
	},

	// 
	17: {
		cost: 0
	},

	// 
	18: {
		cost: 0
	},

	// 
	19: {
		cost: 0
	},

	// 
	20: {
		cost: 0
	},

	// 
	21: {
		cost: 0
	},

	// 
	22: {
		cost: 0
	},

	// 
	23: {
		cost: 0
	},

	// 
	24: {
		cost: 0
	},

	// 
	25: {
		cost: 0
	},

	// 
	26: {
		cost: 0
	},

	// 
	27: {
		cost: 0
	},

	// 
	28: {
		cost: 0
	},

	// 
	29: {
		cost: 0
	},

	// 
	30: {
		cost: 0
	},

	// 
	31: {
		cost: 0
	},

	// 
	32: {
		cost: 0
	},

	// 
	33: {
		cost: 0
	},

	// 
	34: {
		cost: 0
	},

	// 
	35: {
		cost: 0
	},

	// 
	36: {
		cost: 0
	},

	// 
	37: {
		cost: 0
	},

	// 
	38: {
		cost: 0
	},

	// 
	39: {
		cost: 0
	},


	/***************************************/
	/*                                     */
	/*             BLUE CARDS               */
	/*                                     */
	/***************************************/

	// 
	40: {
		cost: 0
	},

	// 
	41: {
		cost: 0
	},

	// 
	42: {
		cost: 0
	},

	// 
	43: {
		cost: 0
	},

	// 
	44: {
		cost: 0
	},

	// 
	45: {
		cost: 0
	},

	// 
	46: {
		cost: 0
	},

	// 
	47: {
		cost: 0
	},

	// 
	48: {
		cost: 0
	},

	// 
	49: {
		cost: 0
	},

	// 
	50: {
		cost: 0
	},

	// 
	51: {
		cost: 0
	},

	// 
	52: {
		cost: 0
	},

	// 
	53: {
		cost: 0
	},

	// 
	54: {
		cost: 0
	},

	// 
	55: {
		cost: 0
	},

	// 
	56: {
		cost: 0
	},

	// 
	57: {
		cost: 0
	},

	// 
	58: {
		cost: 0
	},

	// 
	59: {
		cost: 0
	},

	// 
	60: {
		cost: 0
	},

	// 
	61: {
		cost: 0
	},

	// 
	62: {
		cost: 0
	},

	// 
	63: {
		cost: 0
	},

	// 
	64: {
		cost: 0
	},

	// 
	65: {
		cost: 0
	},

	// 
	66: {
		cost: 0
	},

	// 
	67: {
		cost: 0
	},

	// 
	68: {
		cost: 0
	},

	// 
	69: {
		cost: 0
	},

	// 
	70: {
		cost: 0
	},

	// 
	71: {
		cost: 0
	},

	// 
	72: {
		cost: 0
	},

	// 
	73: {
		cost: 0
	},

	// 
	74: {
		cost: 0
	},

	// 
	75: {
		cost: 0
	},

	// 
	76: {
		cost: 0
	},

	// 
	77: {
		cost: 0
	},

	// 
	78: {
		cost: 0
	},

	// 
	79: {
		cost: 0
	},


	/***************************************/
	/*                                     */
	/*             GREEN CARDS             */
	/*                                     */
	/***************************************/

	// 
	80: {
		cost: 0
	},

	// 
	81: {
		cost: 0
	},

	// 
	82: {
		cost: 0
	},

	// 
	83: {
		cost: 0
	},

	// 
	84: {
		cost: 0
	},

	// 
	85: {
		cost: 0
	},

	// 
	86: {
		cost: 0
	},

	// 
	87: {
		cost: 0
	},

	// 
	88: {
		cost: 0
	},

	// 
	89: {
		cost: 0
	},

	// 
	90: {
		cost: 0
	},

	// 
	91: {
		cost: 0
	},

	// 
	92: {
		cost: 0
	},

	// 
	93: {
		cost: 0
	},

	// 
	94: {
		cost: 0
	},

	// 
	95: {
		cost: 0
	},

	// 
	96: {
		cost: 0
	},

	// 
	97: {
		cost: 0
	},

	// 
	98: {
		cost: 0
	},

	// 
	99: {
		cost: 0
	},

	// 
	100: {
		cost: 0
	},

	// 
	101: {
		cost: 0
	},

	// 
	102: {
		cost: 0
	},

	// 
	103: {
		cost: 0
	},

	// 
	104: {
		cost: 0
	},

	// 
	105: {
		cost: 0
	},

	// 
	106: {
		cost: 0
	},

	// 
	107: {
		cost: 0
	},

	// 
	108: {
		cost: 0
	},

	// 
	109: {
		cost: 0
	},

	// 
	110: {
		cost: 0
	},

	// 
	111: {
		cost: 0
	},

	// 
	112: {
		cost: 0
	},

	// 
	113: {
		cost: 0
	},

	// 
	114: {
		cost: 0
	},

	// 
	115: {
		cost: 0
	},

	// 
	116: {
		cost: 0
	},

	// 
	117: {
		cost: 0
	},

	// 
	118: {
		cost: 0
	},

	// 
	119: {
		cost: 0
	},

	// 
	120: {
		cost: 0
	}
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
