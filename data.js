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
	 *
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
	 *     damage: number
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
				bricks: +2,
				gems: +2
			},
			play_again: true
		})
	},

	// Friendly Terrain: +1 Wall, play again
	2: {
		cost: 1,
		effect: () => ({
			active: { wall: +1 },
			play_again: true
		})
	},

	// Miners: +1 Quarry
	3: {
		cost: 3,
		effect: () => ({
			active: { quarry: +1 }
		})
	},

	// Mother Lode: if ( quarry < enemy quarry ) { +2 quarry } else { +1 quarry }
	4: {
		cost: 4,
		effect: () => ({
			active: {
				quarry:
					player.resources.quarry < enemy.resources.quarry ? +2 : +1
			},
		})
	},

	// Dwarven Miners: +4 Wall, +1 Quarry
	5: {
		cost: 7,
		effect: () => ({
			active: {
				quarry: +1,
				wall: +4
			}
		})
	},

	// Work Overtime: +5 Wall, -6 gems
	6: {
	    cost: 2,
		effect: () => ({
			active: {
				gems: -6,
				wall: +5
			}
		})
	},

	// Copping the Tech: if ( quarry < enemy quarry ) {quarry = enemy quarry}
	7: {
		cost: 5,
		effect: () => ({
			active: {
				quarry:
					player.resources.quarry < enemy.resources.quarry
						? enemy.resources.quarry : 0
			}
		})
	},

	// Basic Wall: +3 Wall
	8: {
		cost: 2,
		effect: () => ({
			active: { wall: +3 }
		})
	},

	// Sturdy Wall: +4 Wall
	9: {
		cost: 3,
		effect: () => ({
			active: { wall: +4 }
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
			enemy: { quarry: +1 }
		})
	},

	// Foundations: if ( wall==0 ) { +6 Wall } else { +3 Wall }
	11: {
		cost: 3,
		effect: () => ({
			active: {
				wall: player.wall === 0 ? 6 : 3
			}
		})
	},

	// Tremors: All walls take 5 damage. Play again
	12: {
		cost: 7,
		effect: () => ({
			active: {
				wall: -5
			},
			enemy: {
				wall: -5
			},
			play_again: true
		})
	},

	// Secret Room: +1 Magic. Play again
	13: {
		cost: 8,
		effect: () => ({
			active: {
				magic: 1
			},
			play_again: true
		})
	},

	// Earthquake: -1 to all Player's quarrys
	14: {
		cost: 0,
		effect: () => ({
			active: {
				quarry: -1
			},
			enemy: {
				quarry: -1
			}
		})
	},

	// Big Wall: +6 Wall
	15: {
		cost: 5,
		effect: () => ({
			active: {
				wall: 6
			}
		})
	},

	// Collapse! -1 Enemy quarry
	16: {
		cost: 4,
		effect: () => ({
			enemy: {
				quarry: -1
			}
		})
	},

	// New Equipment: +2 quarry
	17: {
		cost: 6,
		effect: () => ({
			active: {
				quarry: 2
			}
		})
	},

	// Strip Mine: -1 quarry, +10 wall. You gain 5 gems
	18: {
		cost: 0,
		effect: () => ({
			active: {
				gems: 5,
				quarry: -1,
				wall: 10
			}
		})
	},

	// Reinforced Wall: +8 Wall
	19: {
		cost: 8,
		effect: () => ({
			active: {

			}
		})
	},

	// Porticulus: +5 Wall, +1 Dungeon
	20: {
		cost: 9,
		effect: () => ({
			active: {
				dungeon: 1,
				wall: 5
			}
		})
	},

	// Crystal Rocks: +7 Wall, gain 7 gems
	21: {
		cost: 9,
		effect: () => ({
			active: {
				gems: 7,
				wall: 7
			}
		})
	},

	// Harmonic Ore: +6 Wall, +3 Tower
	22: {
		cost: 11,
		effect: () => ({
            active: {
            	wall: 6,
				tower: 3
			}
		})
	},

	// Mondo Wall: +12 Wall
	23: {
		cost: 13,
		effect: () => ({
			active: {
				wall: 12
			}
		})
	},

	// Focused Designs: +8 Wall, +5 Tower
	24: {
		cost: 15,
		effect: () => ({
            active: {
				wall: 8,
				tower: 5
            }
		})
	},

	// Great Wall: +15 Wall
	25: {
		cost: 0,
		effect: () => ({
			active: {
				wall: 15
			}
		})
	},

	// Rock Launcher: +6 Wall, 10 Damage to Enemy
	26: {
		cost: 0,
		effect: () => ({
			active: {
				wall: 6
			},
			enemy: {
				damage: 10
			}
		})
	},

	// Dragon's Heart: +20 Wall, +8 Tower
	27: {
		cost: 24,
		effect: () => ({
			active: {
				wall: 20,
				tower: 8
			}
		})
	},

	// Forced Labor: +9 Wall, Lose 5 recruits
	28: {
		cost: 7,
		effect: () => ({
			active: {
				wall: +9,
				recruits: -5
			}
		})
	},

	// Rock Garden: +1 Wall, +1 Tower, +2 recuits
	29: {
		cost: 1,
		effect: () => ({
			active: {
				wall: +1,
				tower: +1,
				recruits: +2
			}
		})
	},

	// Flood Water: Player(s) w/lowest Wall are -1 Dungeon and 2 damage to Tower
	30: {
		cost: 6,
		effect: () => {
			var action = {};
			if (player.wall <= enemy.wall) {
				action.active = {
					dungeon: -1,
					tower: -2
				};
			}
			if (enemy.wall <= player.wall) {
				action.enemy = {
					dungeon: -1,
					tower: -2
				};
			}
			return action;
		}
	},

	// Barracks: +6 recruits, +6 Wall, If dungeon < enemy dungeon, +1 dungeon
	31: {
		cost: 10,
		effect: () => ({
			active: {
				recruits: +6,
				wall: +6,
				dungeon: player.dungeon < enemy.dungeon ? +1 : 0
			}
		})
	},

	// Battlements: +7 Wall, 6 damage to enemy
	32: {
		cost: 14,
		effect: () => ({
			active: {
				wall: +7
			},
			enemy: {
				damage: 6
			}
		})
	},

	// Shift: Switch your Wall with enemy Wall
	33: {
		cost: 17,
		effect: () => ({
			active: {
				wall: enemy.wall - player.wall
			},
			enemy: {
				wall: player.wall - enemy.wall
			}
		})
	},

	/***************************************/
	/*                                     */
	/*             BLUE CARDS               */
	/*                                     */
	/***************************************/

	// 
	40: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	41: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	42: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	43: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	44: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	45: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	46: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	47: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	48: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	49: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	50: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	51: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	52: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	53: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	54: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	55: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	56: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	57: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	58: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	59: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	60: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	61: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	62: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	63: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	64: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	65: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	66: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	67: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	68: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	69: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	70: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	71: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	72: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	73: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	74: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	75: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	76: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	77: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	78: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	79: {
		cost: 0,
		effect: () => ({

		})
	},


	/***************************************/
	/*                                     */
	/*             GREEN CARDS             */
	/*                                     */
	/***************************************/

	// 
	80: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	81: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	82: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	83: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	84: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	85: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	86: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	87: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	88: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	89: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	90: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	91: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	92: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	93: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	94: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	95: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	96: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	97: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	98: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	99: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	100: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	101: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	102: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	103: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	104: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	105: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	106: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	107: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	108: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	109: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	110: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	111: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	112: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	113: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	114: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	115: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	116: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	117: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	118: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	119: {
		cost: 0,
		effect: () => ({

		})
	},

	// 
	120: {
		cost: 0,
		effect: () => ({

		})
	}
};

