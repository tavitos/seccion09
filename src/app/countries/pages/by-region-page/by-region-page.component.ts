import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

// type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'; /** El type es como una interface solo que no se expande */

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country [] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; /** Declaración de la propiedad utilizando el type Region */
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region ;
  }

  // searchByRegion( region: string):void {
  searchByRegion( region: Region):void {

    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
      });
  }

}
