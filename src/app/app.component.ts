import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from './game/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas') canvasRef: ElementRef;
  private game: Game;

  ngOnInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.game = new Game(ctx);
  }

  toggleGame() {
    this.game.toggleGame();
  }
}
