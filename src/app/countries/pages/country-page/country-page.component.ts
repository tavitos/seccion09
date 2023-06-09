import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countryService: CountriesService
    ) { }

  // ngOnInit(): void {
    // Problema: Observable Hell observable dentro de otro
    // observable.
    // this.activatedRoute.params
      // .subscribe( (params) => { /** <-- Tiene implicito el tipo Params */
      //   console.log({ params: params['id']}); /** <-- Por tanto podemos referenciar así */
      // });

      // .subscribe( ({ id }) => { /** <-- Con desestructuración */
      //   // console.log({ params: id}); /** Por tanto podemos referenciar así */
      //   this.countryService.searchCountryByAlphaCode(id)
      //   .subscribe( country => {
      //     console.log({country});
      //   });

      // });
  // }

  // Posible solución del Observable Hell

      // ngOnInit(): void {

      //   this.activatedRoute.params
      //     .subscribe( ({ id }) => { 
      //       this.searchCountry(id) /** Llama a la función */
      //     });
      // }

      // // Creación de un método
      // searchCountry( code: string){
      //   this.countryService.searchCountryByAlphaCode(code)
      //     .subscribe( country => {
      //       console.log({country});
      //     });
      // }

  // Fin Posible solución del Observable Hell

  // Solución del Observable Hell con operadores RXJS
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countryService.searchCountryByAlphaCode(id) ),
      )
      .subscribe( country => {
        // console.log({country});
        if (!country) return this.router.navigateByUrl('');
        // console.log('TENEMOS UN PAIS');
        return this.country = country;
        // return;
      });
  }

}
