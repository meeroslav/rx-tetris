import {
  Block, BoardShape, getRandomColorIndex, getRandomShape, invertShape, rotateShape, Scene,
  Shape
} from './shapes';
import { BOARD_WIDTH, Keys } from './constants';

export function modifyScene(scene: Scene, keyAction: Keys) {
  let result;
  switch(keyAction) {
    case Keys.ArrowDown:
      result = move(scene, 0, 1);
      if (!result) {
        result = scene;
        if (result.block.y >= 0) {
          result.board = addBlock(result.board, result.block);
          // remove lines
          const rowIndexes = getFullRows(result.board);
          result.board = removeRows(result.board, rowIndexes);
          // create new block
          result.block = generateBlock();
        } else {
          result.block.shape = invertShape(result.block.shape);
        }
      }
      break;
    case Keys.ArrowLeft:
      result = move(scene, -1, 0) || scene;
      break;
    case Keys.ArrowRight:
      result = move(scene, 1, 0) || scene;
      break;
    case Keys.Space:
      result = rotate(scene) || scene;
      break;
  }

  return result;
}

export function isGameOver(scene) {
  return scene.block.shape.some(row => row.some(cell => cell < 0));
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
    y: -shape.length + 1
  };
}

function move(scene: Scene, deltaX: number = 0, deltaY: number = 0) {
  if (canMove(scene.board, scene.block, deltaX, deltaY)) {
    return {
      board: scene.board,
      block: {
        shape: scene.block.shape,
        colorIndex: scene.block.colorIndex,
        x: scene.block.x + deltaX,
        y: scene.block.y + deltaY
      }
    };
  }
  return;
}

function rotate(scene: Scene) {
  if (canRotate(scene.board, scene.block)) {
    return {
      board: scene.board,
      block: {
        shape: rotateShape(scene.block.shape),
        colorIndex: scene.block.colorIndex,
        x: scene.block.x,
        y: scene.block.y
      }
    };
  }
  return;
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
  if (rowIndexes.length) {
    const emptyLines = Array(rowIndexes.length)
      .fill(void 0)
      .map(_ => Array(BOARD_WIDTH)
        .fill(0));

    const result = [
      ...emptyLines,
      ...board.filter((_, i) => rowIndexes.indexOf(i) === -1)
    ];
    return result;
  }
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
