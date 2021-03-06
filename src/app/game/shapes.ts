import { BOARD_HEIGHT, BOARD_WIDTH, ShapeColors } from './constants';

export interface Point2D {
  x: number;
  y: number;
}

export type Shape = number[][];

export interface Block {
  x: number;
  y: number;
  shape: Shape;
  colorIndex: number;
}

export function getRandomColorIndex() {
 return ~~(Math.random() * (ShapeColors.length - 1) + 1);
}

export const Shapes: Shape[] = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
];

export function getRandomShape() {
  return Shapes[~~(Math.random() * Shapes.length)];
}

export function rotateShape(shape: Shape) {
  let rotated: Shape = [];
  shape.forEach((row: number[], i: number) => {
    rotated[i] = [];
    row.forEach((_, j: number) => {
      rotated[i][j] = shape[row.length - 1 - j][i];
    });
  });
  return rotated;
}

export function invertShape(shape: Shape) {
  let rotated: Shape = [];
  shape.forEach((row: number[], i: number) => {
    rotated[i] = [];
    row.forEach((cell, j: number) => {
      rotated[i][j] = cell ? -cell : cell;
    });
  });
  return rotated;
}

export const BoardShape: Shape = Array(BOARD_HEIGHT)
  .fill(void 0)
  .map(_ => Array(BOARD_WIDTH)
  .fill(0));

export interface Scene {
  board: Shape;
  block?: Block;
}
