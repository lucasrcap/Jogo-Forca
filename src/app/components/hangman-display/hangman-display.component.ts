import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.scss']
})
export class HangmanDisplayComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
  MAX_MISTAKES = 7;
  mistakesRemaining;
  sucess: boolean = false;
  constructor() { 
    this.mistakesRemaining = this.MAX_MISTAKES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
      ) {
        this.mistakesRemaining = this.MAX_MISTAKES;
        this.sucess = false;
      }
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if(
    guessesCurrentValue && 
    guessesCurrentValue.length && 
    guessesCurrentValue!== changes['guesses'].previousValue
    ) {
      const char = [...guessesCurrentValue].pop();
      this.checkGuess(char);
    }
    
}

  checkGuess(letter: string){
    let didWin = true;
    this.mistakesRemaining -= this.wasGuessAMistake(letter);
    for(let i = 0; i < this.question.length; i++) {
       if(
        !this.guesses.find(
        (guess) => guess.toLowerCase() === this.question[i].toLowerCase()
        )
       ){
        didWin = false;
        break;
       }
  }
    this.sucess = didWin;
    if (this.sucess || this.mistakesRemaining === 0){
    this.gameFinished.emit(this.sucess);
  }
}

  wasGuessAMistake(letter: string) {
    for (let i = 0; i < this.question.length; i++ ) {
      if (this.question[i].toLowerCase() === letter.toLowerCase()){
        return 0;
      }
    }
    return  1;
  }

  ngOnInit(): void {}
}