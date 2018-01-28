import { Block, rotateShape, Shape } from './shapes';
import { BOARD_WIDTH } from './constants';

export function isInCollision(board: Shape, block: Block) {
  return block.shape.some((row: number[], i: number) =>
    row.some((cell: number, j: number) => {
      if (!cell) {
        return;
      }
      const { x, y } = block;
      return board[y + i] && (board[y + i][x + j] !== 0);
    })
  );
}

export function canMove(board: Shape, block: Block, delta: number) {
  const clone = { ...block } as Block;
  clone.x += delta;
  return isInCollision(board, clone);
}

export function canRotate(board: Shape, block: Block) {
  const clone = { ...block } as Block;
  clone.shape = rotateShape(clone.shape);
  return isInCollision(board, clone);
}

export function getFullRows(board: Shape) {
  return board.reduce((acc, row, index) => {
    if (row.every(cell => !!cell)) {
      acc.push(index);
    }
    return acc;
  }, []);
}

export function removeRows(board: Shape, rowIndexes: number[]) {
  rowIndexes.forEach(index => {
    board.splice(index);
    board.unshift(Array(BOARD_WIDTH).map(_ => 0));
  });

  return board;
};

export function addBlock(board: Shape, block: Block) {
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
