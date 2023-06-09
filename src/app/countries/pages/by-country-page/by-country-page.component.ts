import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country [] = [];

  constructor( private countriesService: CountriesService) { }

  ngOnInit(): void {
  }

  searchByCountry( term: string):void {
    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries; 
      });
  }

}
