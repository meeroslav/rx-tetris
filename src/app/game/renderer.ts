import { ShapeColors, BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, GAP_SIZE } from './constants';
import { Block, Point2D, Shape, Scene } from './shapes';

const CANVAS_WIDTH = BOARD_WIDTH * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
const CANVAS_HEIGHT = BOARD_HEIGHT * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;

export function renderScene(ctx: CanvasRenderingContext2D, scene: Scene) {
  renderBackground(ctx);
  renderBoard(ctx, scene.board);
  if (scene.block) {
    renderBlock(ctx, scene.block);
  }
}

export function renderGameOver(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;

  ctx.fillStyle = '#000000';
  ctx.font = `bold 25px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText('GAME OVER!', textX, textY);
}

function renderBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = ShapeColors[0];
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
