export enum snakeKey {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ENTER,
}

export interface KeyboardMap {
  [key: string]: snakeKey;
}

export let MAP_A = {
  ArrowUp: snakeKey.UP,
  ArrowDown: snakeKey.DOWN,
  ArrowLeft: snakeKey.LEFT,
  ArrowRight: snakeKey.RIGHT,
  Enter: snakeKey.ENTER,
};
export let MAP_B = {
  w: snakeKey.UP,
  s: snakeKey.DOWN,
  a: snakeKey.LEFT,
  d: snakeKey.RIGHT,
};
