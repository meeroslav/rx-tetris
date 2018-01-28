import { ShapeColors, BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, GAP_SIZE } from './constants';
import { Block, Point2D, Shape, Scene } from './shapes';

export function renderScene(ctx: CanvasRenderingContext2D, scene: Scene) {
  renderBackground(ctx);
  renderBoard(ctx, scene.board);
  if (scene.block) {
    renderBlock(ctx, scene.block);
  }
}

function renderBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = ShapeColors[0];
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
}

function renderBoard(ctx: CanvasRenderingContext2D, board: Shape) {
  board.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) {
      paintCell(ctx, { x, y }, cell);
    }
  }));
}

function renderBlock(ctx: CanvasRenderingContext2D, block: Block) {
  block.shape.forEach((row, y) => row.forEach((cell, x) => {
    const point = { x: x + block.x, y: y + block.y };
    if (cell && inBounds(point)) {
      paintCell(ctx, point, block.colorIndex);
    }
  }));
}

function paintCell(ctx: CanvasRenderingContext2D, point: Point2D, colorIndex: number) {
  const x = point.x * CELL_SIZE + (point.x * GAP_SIZE);
  const y = point.y * CELL_SIZE + (point.y * GAP_SIZE);

  ctx.fillStyle = ShapeColors[colorIndex];
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function inBounds(point: Point2D) {
  return !(point.x > BOARD_WIDTH || point.y > BOARD_HEIGHT || point.x < 0 || point.y < 0);
}
