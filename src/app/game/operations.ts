import { Block, BoardShape, getRandomColorIndex, getRandomShape, rotateShape, Scene, Shape } from './shapes';
import { BOARD_WIDTH, Keys } from './constants';

export function modifyScene(scene: Scene, keyAction: Keys) {
  let result;
  switch(keyAction) {
    case Keys.ArrowDown:
      result = move(scene, 0, 1);
      if (!canMove(result.board, result.block, 0, 1)) {
        if (result.block.y >= 0) {
          result.board = addBlock(result.board, result.block);

          const rowIndexes = getFullRows(result.board);
          result.board = removeRows(result.board, rowIndexes);

          // create new block
          result.block = generateBlock();
        }
      }
      break;
    case Keys.ArrowLeft:
      result = move(scene, -1, 0);
      break;
    case Keys.ArrowRight:
      result = move(scene, 1, 0);
      break;
    case Keys.Space:
      result = rotate(scene);
      break;
  }

  return result;
}

export function isGameOver(scene) {
  if (canMove(scene.board, scene.block, 0, 1)) {
    return false;
  }
  return scene.block.y < 0;
}

export function generateScene(): Scene {
  return {
    board: BoardShape,
    block: generateBlock()
  };
}

function generateBlock() {
  const shape = getRandomShape();

  return {
    shape: shape,
    colorIndex: getRandomColorIndex(),
    x: ~~((BOARD_WIDTH - shape[0].length) / 2),
    y: -shape.length
  };
}

function move(scene: Scene, deltaX: number = 0, deltaY: number = 0) {
  if (canMove(scene.board, scene.block, deltaX, deltaY)) {
    scene.block.x += deltaX;
    scene.block.y += deltaY;
  }
  return scene;
}

function rotate(scene: Scene) {
  if (canRotate(scene.board, scene.block)) {
    scene.block.shape = rotateShape(scene.block.shape);
  }
  return scene;
}

function isInCollision(board: Shape, block: Block) {
  return block.shape.some((row: number[], i: number) =>
    row.some((cell: number, j: number) => {
      if (!cell) {
        return;
      }
      const { x, y } = block;
      if (y + i < 0) {
        return;
      }
      return !board[y + i] || (board[y + i][x + j] !== 0);
    })
  );
}

function canMove(board: Shape, block: Block, deltaX: number = 0, deltaY: number = 0) {
  const clone = { ...block } as Block;
  clone.x += deltaX;
  clone.y += deltaY;
  return !isInCollision(board, clone);
}

function canRotate(board: Shape, block: Block) {
  const clone = { ...block } as Block;
  clone.shape = rotateShape(clone.shape);
  return !isInCollision(board, clone);
}

function getFullRows(board: Shape) {
  return board.reduce((acc, row, index) => {
    if (row.every(cell => !!cell)) {
      acc.push(index);
    }
    return acc;
  }, []);
}

function removeRows(board: Shape, rowIndexes: number[]) {
  rowIndexes.forEach(index => {
    board.splice(index);
    board.unshift(Array(BOARD_WIDTH).fill(0));
  });

  return board;
}

function addBlock(board: Shape, block: Block) {
  const { x, y, shape, colorIndex } = block;
  shape.forEach((row: number[], i: number) =>
    row.forEach((cell: number, j: number) => {
      if (cell) {
        board[y + i][x + j] = colorIndex;
      }
    })
  );
  return board;
}
