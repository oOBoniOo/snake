export enum snakeKey {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export interface KeyboardMap {
	[key: string]: snakeKey;
}

export let MAP_A = {
	ArrowUp: snakeKey.UP,
	ArrowDown: snakeKey.DOWN,
	ArrowLeft: snakeKey.LEFT,
	ArrowRight: snakeKey.RIGHT,
};
export let MAP_B = {
	w: snakeKey.UP,
	s: snakeKey.DOWN,
	a: snakeKey.LEFT,
	d: snakeKey.RIGHT,
};
