import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  // private debouncer: Subject<string> = new Subject<string>() // <-- Esta también es una forma de declararlo
  private debouncer = new Subject<string>()
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';
  
  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  // public onValue = new EventEmitter<string>() // FOrma corta
  
  @Output()
  public onDebounce = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
      // console.log('debouncer value', value);
      this.onDebounce.emit(value);
    });
  }


  ngOnDestroy(): void {
    // console.log('Destruido');
    // this.debouncer.unsubscribe();
    this.debouncerSuscription?.unsubscribe();
  }

  termSearch( term: string ):void {
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string){
    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }

}
