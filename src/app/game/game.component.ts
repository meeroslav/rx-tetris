import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, FPS, GAME_SPEED, GAP_SIZE, Keys } from './constants';
import { generateScene, isGameOver, modifyScene } from './operations';
import { renderGameOver, renderScene } from './renderer';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { map, filter, scan, takeWhile, withLatestFrom, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  template: `
    <canvas #gameCanvas>
    </canvas>
  `,
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.canvasRef.nativeElement.width = BOARD_WIDTH * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    this.canvasRef.nativeElement.height = BOARD_HEIGHT * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.startGame(ctx);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  startGame(ctx: CanvasRenderingContext2D) {
    const action$ = new Subject();

    // on key down
    fromEvent(document, 'keydown')
      .pipe(
        map((event: KeyboardEvent) => Keys[event.code]),
        filter(key => !!key),
        takeUntil(this.destroy$)
      )
      .subscribe(action$);

    // on tick
    interval(GAME_SPEED)
      .pipe(
        map(_ => Keys.ArrowDown),
        takeUntil(this.destroy$)
      )
      .subscribe(action$);

    // modify scene on action
    const scene$ = action$
      .pipe(
        scan(modifyScene, generateScene())
      );

    interval(1000 / FPS, animationFrame)
      .pipe(
        withLatestFrom(scene$, (_, scene) => scene),
        takeWhile(scene => !isGameOver(scene)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: scene => renderScene(ctx, scene),
        complete: () => renderGameOver(ctx)
      });
  }
}
