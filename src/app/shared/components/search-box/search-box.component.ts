import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  // public onValue = new EventEmitter<string>() // FOrma corta


  constructor() { }

  ngOnInit(): void {
  }

  termSearch( term: string ):void {
    this.onValue.emit(term);
  }

}
