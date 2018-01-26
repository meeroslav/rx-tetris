import { Block, rotateShape, Shape } from './shapes';
import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';

export const BoardShape: Shape = Array(BOARD_HEIGHT).map(() => Array(BOARD_WIDTH).map(() => 0));

export const isInCollision = (board: Shape, block: Block) => {
  return block.shape.some((row: number[], i: number) =>
    row.some((cell: number, j: number) => {
      if (!cell) {
        return;
      }
      const { x, y } = block;
      return board[y + i] && (board[y + i][x + j] !== 0);
    })
  );
};

export const canMove = (board: Shape, block: Block, delta: number) => {
  const clone = { ...block };
  clone.x += delta;
  return isInCollision(board, clone);
};

export const canRotate = (board: Shape, block: Block) => {
  const clone = { ...block };
  clone.shape = rotateShape(clone.shape);
  return isInCollision(board, clone);
};

export const getFullRows = (board: Shape) => {
  return board.reduce((acc, row, index) => {
    if (row.every(cell => !!cell)) {
      acc.push(index);
    }
    return acc;
  }, []);
};

export const removeRows = (board: Shape, rowIndexes: number[]) => {
  rowIndexes.forEach(index => {
    board.splice(index);
    board.unshift(Array(BOARD_WIDTH).map(_ => 0));
  });

  return board;
};

export const addBlock = (board: Shape, block: Block) => {
  const { x, y, shape } = block;
  shape.forEach((row: number[], i: number) =>
    row.forEach((cell: number, j: number) => {
      if (cell && board[y + i]) {
        board[y + i][x + j] = cell;
      }
    })
  );
  return board;
};
