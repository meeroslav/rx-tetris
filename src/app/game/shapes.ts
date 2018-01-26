export interface Point2D {
  x: number;
  y: number;
}

export type Shape = number[][];

export interface Block {
  shape: Shape;
  x: number;
  y: number;
}

export const ShapeColors  = [
  '#ffffff',
  '#0080bf',
  '#a0cf77',
  '#d9534f',
  '#f0ad4e',
  '#ff5b77',
  '#613d7c'
];

export const getRandomColor = () => {
 return ShapeColors[~~(Math.random() * (ShapeColors.length - 1) + 1)];
};

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

export const getRandomShape = () => {
  return Shapes[~~(Math.random() * Shapes.length)];
};

export const rotateShape = (shape: Shape) => {
  let rotated: Shape = [];
  shape.forEach((row: number[], i: number) => {
    rotated[i] = [];
    row.forEach((_, j: number) => {
      rotated[i][j] = shape[row.length - 1 - j][i];
    });
  });
  return shape;
};
