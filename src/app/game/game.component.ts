import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, GAP_SIZE } from './constants';
import { renderScene } from './renderer';
import { BoardShape } from './shapes';

@Component({
  selector: 'app-game',
  template: `
    <canvas #gameCanvas>
    </canvas>
  `,
})
export class GameComponent implements OnInit {
  @ViewChild('gameCanvas') canvasRef: ElementRef;

  ngOnInit() {
    this.canvasRef.nativeElement.width = BOARD_WIDTH * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    this.canvasRef.nativeElement.height = BOARD_HEIGHT * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.startGame(ctx);
  }

  startGame(ctx: CanvasRenderingContext2D) {
    console.log('This should start game');
    renderScene(ctx, { board: BoardShape });
  }
}
