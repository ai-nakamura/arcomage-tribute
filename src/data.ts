import { PlayerState } from './app';

export var sounds = {
	arcomage: {
		damage:			new Audio('Sounds/Archmage/damage.wav'),
		deal:			new Audio('Sounds/Archmage/deal.wav'),
		defeat:			new Audio('Sounds/Archmage/defeat.wav'),
		quarryDown:		new Audio('Sounds/Archmage/quarry_down.wav'),
		shuffle:		new Audio('Sounds/Archmage/shuffle.wav'),
		start:			new Audio('Sounds/Archmage/start.wav'),
		towerUp:		new Audio('Sounds/Archmage/tower_up.wav'),
		typing:			new Audio('Sounds/Archmage/typing.wav'),
		victory:		new Audio('Sounds/Archmage/victory.wav'),
	},

	mm7: {
		bricksDown:		new Audio('Sounds/Might and Magic 7/bricks down.wav'),
		bricksUp:		new Audio('Sounds/Might and Magic 7/bricks up.wav'),
		damage:			new Audio('Sounds/Might and Magic 7/damage.wav'),
		deal:			new Audio('Sounds/Might and Magic 7/deal.wav'),
		defeat:			new Audio('Sounds/Might and Magic 7/defeat.wav'),
		quarryDown:		new Audio('Sounds/Might and Magic 7/quarry down.wav'),
		quarryUp:		new Audio('Sounds/Might and Magic 7/quarry up.wav'),
		shuffle:		new Audio('Sounds/Might and Magic 7/shuffle.wav'),
		towerUp:		new Audio('Sounds/Might and Magic 7/tower up.wav'),
		typing:			new Audio('Sounds/Might and Magic 7/typing.wav'),
		victory:		new Audio('Sounds/Might and Magic 7/victory.wav'),
		wallUp:			new Audio('Sounds/Might and Magic 7/wall up.wav'),
	},

	mm8: {
		bricksDown:		new Audio('Sounds/Might and Magic 8/bricks down.wav'),
		bricksUp:		new Audio('Sounds/Might and Magic 8/bricks up.wav'),
		damage:			new Audio('Sounds/Might and Magic 8/damage.wav'),
		deal:			new Audio('Sounds/Might and Magic 8/deal.wav'),
		defeat:			new Audio('Sounds/Might and Magic 8/defeat.wav'),
		quarryDown:		new Audio('Sounds/Might and Magic 8/quarry down.wav'),
		quarryUp:		new Audio('Sounds/Might and Magic 8/quarry up.wav'),
		shuffle:		new Audio('Sounds/Might and Magic 8/shuffle.wav'),
		towerUp:		new Audio('Sounds/Might and Magic 8/tower up.wav'),
		typing:			new Audio('Sounds/Might and Magic 8/typing.wav'),
		victory:		new Audio('Sounds/Might and Magic 8/victory.wav'),

		wallUp:			new Audio('Sounds/Might and Magic 8/wall up.wav'),
	}


} as const;

type Card = {
    cost: number
    effect: (active: PlayerState, enemy: PlayerState) => Action;
};
export type Action = {
    active?: PlayerAction
    enemy?: PlayerAction
    playAgain?: boolean
};

export type PlayerAction = {
    bricks?: number
    gems?: number
    recruits?: number

    quarry?: number
    magic?: number
    dungeon?: number

    tower?: number
    wall?: number
    damage?: number
};

export var cards: Record<number, Card> = {

	/***************************************/
	/*                                     */
	/*             RED CARDS               */
	/*                                     */
	/***************************************/

    // Brick Shortage: All players lose 8 bricks
	0: {
		cost: 0,
		effect: () => ({
			active: {
				bricks: -8
            },
			enemy: {
				bricks: -8
            },
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
			playAgain: true
		})
	},

	// Friendly Terrain: +1 Wall, play again
	2: {
		cost: 1,
		effect: () => ({
			active: { wall: +1 },
			playAgain: true
		})
	},

	// Miners: +1 Quarry
	3: {
		cost: 3,
		effect: () => ({
			active: {
				quarry: +1
				}
		})
	},

	// Mother Lode: if ( quarry < enemy quarry ) { +2 quarry } else { +1 quarry }
	4: {
		cost: 4,
		effect: (active, enemy) => ({
			active: {
				quarry:
					active.resources.quarry < enemy.resources.quarry ? +2 : +1
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
		effect: (active, enemy) => ({
			active: {
				quarry:
					active.resources.quarry < enemy.resources.quarry
						? enemy.resources.quarry : 0
			}
		})
	},

	// Basic Wall: +3 Wall
	8: {
		cost: 2,
		effect: () => ({
			active: {
				wall: +3
				}
		})
	},

	// Sturdy Wall: +4 Wall
	9: {
		cost: 3,
		effect: () => ({
			active: {
				wall: +4
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
				quarry: +1
            }
		})
	},

	// Foundations: if ( wall==0 ) { +6 Wall } else { +3 Wall }
	11: {
		cost: 3,
		effect: (active, enemy) => ({
			active: {
				wall: active.wall === 0 ? +6 : +3
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
			playAgain: true
		})
	},

	// Secret Room: +1 Magic. Play again
	13: {
		cost: 8,
		effect: () => ({
			active: {
				magic: +1
			},
			playAgain: true
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
				wall: +6
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
				quarry: +2
			}
		})
	},

	// Strip Mine: -1 quarry, +10 wall. You gain 5 gems
	18: {
		cost: 0,
		effect: () => ({
			active: {
				gems: +5,
				quarry: -1,
				wall: +10
			}
		})
	},

	// Reinforced Wall: +8 Wall
	19: {
		cost: 8,
		effect: () => ({
			active: {
				wall: +8
			}
		})
	},

	// Porticulus: +5 Wall, +1 Dungeon
	20: {
		cost: 9,
		effect: () => ({
			active: {
				dungeon: +1,
				wall: +5
			}
		})
	},

	// Crystal Rocks: +7 Wall, gain 7 gems
	21: {
		cost: 9,
		effect: () => ({
			active: {
				gems: +7,
				wall: +7
			}
		})
	},

	// Harmonic Ore: +6 Wall, +3 Tower
	22: {
		cost: 11,
		effect: () => ({
            active: {
            	wall: +6,
				tower: +3
			}
		})
	},

	// Mondo Wall: +12 Wall
	23: {
		cost: 13,
		effect: () => ({
			active: {
				wall: +12
			}
		})
	},

	// Focused Designs: +8 Wall, +5 Tower
	24: {
		cost: 15,
		effect: () => ({
            active: {
				wall: +8,
				tower: +5
            }
		})
	},

	// Great Wall: +15 Wall
	25: {
		cost: 0,
		effect: () => ({
			active: {
				wall: +15
			}
		})
	},

	// Rock Launcher: +6 Wall, 10 Damage to Enemy
	26: {
		cost: 0,
		effect: () => ({
			active: {
				wall: +6
			},
			enemy: {
				damage: +10
			}
		})
	},

	// Dragon's Heart: +20 Wall, +8 Tower
	27: {
		cost: 24,
		effect: () => ({
			active: {
				wall: +20,
				tower: +8
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
		effect: (active, enemy) => {
			var action: Action = {};
			if (active.wall <= enemy.wall) {
				action.active = {
					dungeon: -1,
					tower: -2
				};
			}
			if (enemy.wall <= active.wall) {
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
		effect: (active, enemy) => ({
			active: {
				recruits: +6,
				wall: +6,
				dungeon: active.resources.dungeon < enemy.resources.dungeon ? +1 : 0
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
		effect: (active, enemy) => ({
			active: {
				wall: enemy.wall - active.wall
			},
			enemy: {
				wall: active.wall - enemy.wall
			}
		})
	},

	/***************************************/
	/*                                     */
	/*             BLUE CARDS               */
	/*                                     */
	/***************************************/

	// Quartz: +1 Tower, play again
	40: {
		cost: 1,
		effect: () => ({
			active: {
				tower: +1
			},
			playAgain: true
		})
	},

	// Smoky Quartz: 1 Damage to enemy tower, Play again
	41: {
		cost: 2,
		effect: () => ({
			enemy: {
				tower: -1
			},
			playAgain: true
		})
	},

	// Amethyst: +3 Tower
	42: {
		cost: 2,
		effect: () => ({
			active: {
				tower: +3
			}
		})
	},

	// Spell Weavers: +1 Magic
	43: {
		cost: 3,
		effect: () => ({
			active: {
				magic: +1
			}
		})
	},

	// TODO::: Prism: Draw 1, Discard 1 card, Play again
	44: {
		cost: 2,
		effect: () => ({
			playAgain: true
		})
	},

	// TODO::: Lodestone: +3 Tower. This card can't be discarded without playing it
	45: {
		cost: 5,
		effect: () => ({
			active: {
				tower: +3
			}
		})
	},

	// Solar Flare: +2 Tower, 2 Damage to enemy tower
	46: {
		cost: 4,
		effect: () => ({
			active: {
				tower: +2
			},
			enemy: {
				tower: -2	
			}
		})
	},

	// Crystal Matrix: +1 Magic, +3 Tower, +1 Enemy tower
	47: {
		cost: 6,
		effect: () => ({
			active: {
				magic: +1,
				tower: +3
			},
			enemy: {
				tower: +1
			}
		})
	},

	// Gemstone Flaw: 3 Damage to enemy tower
	48: {
		cost: 2,
		effect: () => ({
			enemy: {
				tower: -3
			}
		})
	},

	// Ruby: +5 Tower
	49: {
		cost: 3,
		effect: () => ({
			active: {
				tower: +5
			}
		})
	},

	// Gem Spear: 5 Damage to enemy tower
	50: {
		cost: 4,
		effect: () => ({
			enemy: {
				tower: -5
			}
		})
	},

	// Power Burn: 5 Damage to your tower, +2 Magic
	51: {
		cost: 3,
		effect: () => ({
			active: {
				magic: +2,
				tower: -5
			}
		})
	},

	// Harmonic Vibe: +1 Magic, +3 Tower, +3 Wall
	52: {
		cost: 7,
		effect: () => ({
			active: {
				magic: +1,
				tower: +3,
				wall: +3
			}
		})
	},

	// Parity: All player's magic equals the highest player's magic
	53: {
		cost: 7,
		effect: (active, enemy) => {
			var action: Action = {};
			var pMagic = active.resources.magic;
			var eMagic = enemy.resources.magic;

			if ( pMagic < eMagic ) {
				action.active = {
					magic: eMagic
				};
			}
			if ( eMagic < pMagic ) {
				action.enemy = {
					magic: pMagic
				};
			}
			return action;
		}
	},

	// Emerald: +8 Tower
	54: {
		cost: 6,
		effect: () => ({
			active: {
				tower: +3
			}
		})
	},

	// Pearl of Wisdom: +5 Tower, +1 Magic
	55: {
		cost: 9,
		effect: () => ({
			active: {
				magic: +1,
				tower: +5
			}
		})
	},

	// Shatterer: -1 Magic, 9 Damage to enemy tower
	56: {
		cost: 8,
		effect: () => ({
			active: {
				magic: -1
			},
			enemy: {
				tower: -9
			}
		})
	},

	// Crumblestone: +5 Tower, Enemy loses 6 bricks
	57: {
		cost: 7,
		effect: () => ({
			active: {
				tower: +5
			},
			enemy: {
				bricks: -6
			}
		})
	},

	// Sapphire: +11 Tower
	58: {
		cost: 10,
		effect: () => ({
			active: {
				tower: +11
			}
		})
	},

	// Discord: 7 Damage to all towers, all player's magic -1
	59: {
		cost: 5,
		effect: () => ({
			active: {
				magic: -1,
				tower: -7
			},
			enemy: {
				magic: -1,
				tower: -7
			}
		})
	},

	// Fire Ruby: +6 Tower, 4 Damage to all enemy towers
	60: {
		cost: 13,
		effect: () => ({
			active: {
				tower: +6
			},
			enemy: {
				tower: -4
			}
		})
	},

	// Quarry's Help: +7 Tower, Lose 10 bricks
	61: {
		cost: 4,
		effect: () => ({
			active: {
				bricks: -10,
				tower: +10
			}
		})
	},

	// Crystal Shield: +8 Tower, +3 Wall
	62: {
		cost: 12,
		effect: () => ({
			active: {
				tower: +8,
				wall: +3
			}
		})
	},

	// Empathy Gem: +8 Tower, +1 Dungeon
	63: {
		cost: 14,
		effect: () => ({
			active: {
				dungeon: +1,
				tower: +8
			}
		})
	},

	// Diamond: +15 Tower
	64: {
		cost: 16,
		effect: () => ({
			active: {
				tower: +15
			}
		})
	},

	// Sanctuary: +10 Tower, +5 Wall, Gain 5 recruits
	65: {
		cost: 15,
		effect: () => ({
			active: {
				recruits: +5,
				tower: +10,
				wall: +5
			}
		})
	},

	// Lava Jewel: +12 Tower, 6 Damage to all enemies
	66: {
		cost: 17,
		effect: () => ({
			active: {
				tower: +12
			},
			enemy: {
				damage: -6
			}
		})
	},

	// Dragon's Eye: +20 Tower
	67: {
		cost: 21,
		effect: () => ({
			active: {
				tower: +20
			}
		})
	},

	// Crystalize: +11 Tower, -6 Wall
	68: {
		cost: 8,
		effect: () => ({
			active: {
				tower: +11,
				wall: -6
			}
		})
	},

	// Bag of Baubles: If Tower < enemy Tower +2 Tower, else +1 Tower
	69: {
		cost: 0,
		effect: (active, enemy) => ({
			active: {
				tower: (active.tower < enemy.tower) ? +2 : +1
			}
		})
	},

	// Rainbow: +1 Tower to all players. You gain 3 gems
	70: {
		cost: 0,
		effect: () => ({
			active: {
				gems: +3,
				tower: +1
			},
			enemy: {
				tower: +1
			}
		})
	},

	// Apprentice: +4 Tower, you lose 3 recruits. 2 damage to enemy Tower
	71: {
		cost: 5,
		effect: () => ({
			active: {
				recruits: -3,
				tower: +4
			},
			enemy: {
				tower: -2
			}
		})
	},

	// Lightning Shard: If Tower > enemy Wall, 8 damage to enemy Tower, else 8 damage
	72: {
		cost: 11,
		effect: (active, enemy) => {
			var action: Action = {};
			if (active.tower > enemy.wall) {
				action.enemy = {
					tower: -8
				};
			} else {
				action.enemy = {
					damage: 8
				};
			}
			return action;
		}
	},

	// Phase Jewel: +13 Tower, +6 recruits, +6 bricks
	73: {
		cost: 18,
		effect: () => ({
			active: {
				bricks: +6,
				recruits: +6,
				tower: +13
			}
		})
	},

	/***************************************/
	/*                                     */
	/*             GREEN CARDS             */
	/*                                     */
	/***************************************/

	// Mad Cow Disease: All players lose 6 recruits
	80: {
		cost: 0,
		effect: () => ({
			active: {
				recruits: -6
			},
			enemy: {
				recruits: -6
			}
		})
	},

	// Faerie: 2 Damage, Play again
	81: {
		cost: 1,
		effect: () => ({
			enemy: {
				damage: 2
			},
			playAgain: true
		})
	},

	// Moody Goblins: 4 Damage, You lose 3 gems
	82: {
		cost: 1,
		effect: () => ({
			active: {
				gems: -3
			},
			enemy: {
				damage: -4
			}
		})
	},

	// Minotaur: +1 Dungeon
	83: {
		cost: 3,
		effect: () => ({
			active: {
				dungeon: +3
			}
		})
	},

	// TODO: Elven Scout: Draw 1 card, Discard 1 card, Play again
	84: {
		cost: 2,
		effect: () => ({
			playAgain: true
		})
	},

	// Goblin Mob: 6 Damage, You take 3 damage
	85: {
		cost: 3,
		effect: () => ({
			active: {
				damage: 3
			},
			enemy: {
				damage: 6
			}
		})
	},

	// Goblin Archers: 3 Damage to enemy tower, You take 1 damage
	86: {
		cost: 4,
		effect: () => ({
			active: {
				damage: 1
			},
			enemy: {
				tower: -3
			}
		})
	},

	// Shadow Faerie: 2 Damage to enemy tower, Play again
	87: {
		cost: 6,
		effect: () => ({
			enemy: {
				tower: -2
			},
			playAgain: true
		})
	},

	// Orc: 5 Damage
	88: {
		cost: 3,
		effect: () => ({
			enemy: {
				damage: 5
			}
		})
	},

	// Dwarves: 4 Damage, +3 Wall
	89: {
		cost: 5,
		effect: () => ({
			active: {
				wall: +3
			},
			enemy: {
				damage: 4
			}
		})
	},

	// Little Snakes: 4 Damage to enemy tower
	90: {
		cost: 6,
		effect: () => ({
			enemy: {
				tower: -4
			}
		})
	},

	// Troll Trainer: +2 Dungeon
	91: {
		cost: 7,
		effect: () => ({
			active: {
				dungeon: +2
			}
		})
	},

	// Tower Gremlin: 2 Damage, +4 Wall, +2 Tower
	92: {
		cost: 8,
		effect: () => ({
			active: {
				tower: +2,
				wall: +4
			},
			enemy: {
				damage: 2
			}
		})
	},

	// Full Moon: +1 to all player's Dungeon, You gain 3 recruits
	93: {
		cost: 0,
		effect: () => ({
			active: {
				recruits: +3,
				dungeon: +1
			},
			enemy: {
				dungeon: +1
			}
		})
	},

	// Slasher: 6 Damage
	94: {
		cost: 5,
		effect: () => ({
			enemy: {
				damage: 6
			}
		})
	},

	// Ogre: 7 Damage
	95: {
		cost: 6,
		effect: () => ({
			enemy: {
				damage: 7
			}
		})
	},

	// Rabid Sheep: 6 Damage, Enemy loses 3 recruits
	96: {
		cost: 6,
		effect: () => ({
			enemy: {
				recruits: -3,
				damage: 6
			}
		})
	},

	// Imp: 6 Damage. All players lose 5 bricks, 5 gems, and recruits
	97: {
		cost: 5,
		effect: () => ({
			active: {
				bricks: -5,
				gems: -5,
				recruits: -5
			},
			enemy: {
				bricks: -5,
				gems: -5,
				recruits: -5
			}
		})
	},

	// Spizzer: If enemy wall = 0, 10 damage, else 6 damage
	98: {
		cost: 8,
		effect: (active, enemy) => ({
			enemy: {
				damage: (enemy.wall === 0) ? 10 : 6
			}
		})
	},

	// Werewolf: 9 damage
	99: {
		cost: 9,
		effect: () => ({
			enemy: {
				damage: 9
			}
		})
	},

	// Corrosion Cloud: If enemy wall > 0, 10 damage, else 7 damage
	100: {
		cost: 11,
		effect: (active, enemy) => ({
			enemy: {
				damage: (enemy.wall > 0) ? 10 : 7
			}
		})
	},

	// Unicorn: If magic > enemy magic, 12 damage, else 8 damage
	101: {
		cost: 9,
		effect: (active, enemy) => ({
			enemy: {
				damage: (active.resources.magic > enemy.resources.magic) ? 12 : 8
			}
		})
	},

	// Elven Archers: If wall > enemy wall, 6 damage to enemy tower, else 6 damage
	102: {
		cost: 10,
		effect: (active, enemy) => {
			var action: Action = {}
			if (active.wall > enemy.wall) {
				action.enemy = { tower: -6 }
			} else {
				action.enemy = { damage: 6 }
			}
            return action
		}
	},

	// Succubus: 5 Damage to enemy tower, enemy loses 8 recruits
	103: {
		cost: 14,
		effect: () => ({
			enemy: {
				recruits: -8,
				tower: -5
			}
		})
	},

	// Rock Stompers: 8 Damage, -1 Enemy quarry
	104: {
		cost: 11,
		effect: () => ({
			enemy: {
				quarry: -1,
				damage: 8
			}
		})
	},

	// TODO: Thief: Enemy loses 10 gems, 5 bricks, you gain 1/2 amt. round up
	105: {
		cost: 12,
		effect: () => ({

		})
	},

	// Stone Giant: 10 Damage, +4 Wall
	106: {
		cost: 15,
		effect: () => ({
			active: {
				wall: +4
			},
			enemy: {
				damage: 10
			}
		})
	},

	// Vampire: 10 Damage. Enemy loses 5 recruits, -1 enemy dungeon
	107: {
		cost: 17,
		effect: () => ({
			enemy: {
				recruits: -5,
				dungeon: -1,
				damage: 10
			}
		})
	},

	// Dragon: 20 Damage. Enemy loses 10 gems, -1 enemy dungeon
	108: {
		cost: 25,
		effect: () => ({
			enemy: {
				gems: -10,
				dungeon: -1,
				damage: 20
			}
		})
	},

	// Spearman: If Wall > enemy Wall do 3 Damage else do 2 Damage
	109: {
		cost: 2,
		effect: (active, enemy) => ({
			enemy: {
				damage: (active.wall > enemy.wall) ? 3 : 2
			}
		})
	},

	// Gnome: 3 Damage, +1 gem
	110: {
		cost: 2,
		effect: () => ({
			active: {
				gems: +1
			},
			enemy: {
				damage: 3
			}
		})
	},

	// Berserker: 8 Damage. 3 Damage to your Tower
	111: {
		cost: 4,
		effect: () => ({
			active: {
				tower: -4
			},
			enemy: {
				damage: 8
			}
		})
	},

	// Warlord: 13 Damage. You lose 3 gems
	112: {
		cost: 13,
		effect: () => ({
			active: {
				gems: -3
			},
			enemy: {
				damage: 13
			}
		})
	},

	// Pegasus Lancer: 12 Damage to enemy tower
	113: {
		cost: 18,
		effect: () => ({
			enemy: {
				tower: -12
			}
		})
	}

};
/**
 * macros for data enetering
 *
 * add active: 'jddOactive: {}ki				'
 * add enemy: 'jddOenemy: {}Oi				'
 * add both: 'jddOactive: {}ki				ja,okjddOenemy: {}Oi				kkka'
 */

