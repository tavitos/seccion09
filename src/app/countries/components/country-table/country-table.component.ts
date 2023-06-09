import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img{
      width: 25px;
    }`
  ]
})
export class CountryTableComponent implements OnInit {

  @Input()
  public countries: Country[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
