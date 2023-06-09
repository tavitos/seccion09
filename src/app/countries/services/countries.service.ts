import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    // Función de refactorización llamada por searchCapital
    private getCountriesRequest(url: string):Observable<Country[]>{
        return this.http.get<Country[]>(url)
            .pipe(
                catchError( () => of([])),
                delay(2000)
            );
    }

    // searchCountryByAlphaCode( code: string):Observable<Country[]> {
    //     const url = `${ this.apiUrl }/alpha/${ code }`;
    //     return this.http.get<Country[]>( url )
    //         .pipe(
    //             catchError( () => of([]))
    //         );
    // }

    // Refactorización 
    searchCountryByAlphaCode( code: string):Observable<Country | null> {
        const url = `${ this.apiUrl }/alpha/${ code }`;
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0]: null ),
                catchError( () => of(null))
            );
    }
    
    // searchCapital( term: string):Observable<Country[]>{

    //     return this.http.get<Country[]>(`${ this.apiUrl }/capital/${ term }`)
    //         .pipe(
    //             // tap( countries => console.log('Tap1', countries)),
    //             // map( countries => [] ),
    //             // tap( countries => console.log('Tap2', countries)),

    //             // catchError( error => of([]) ) /** El of devuelve un nuevo observable como parámetro en su argumento */
                
    //             catchError( () => of([]) ) /** El of devuelve un nuevo observable como parámetro en su argumento */
    //             // ponemos paréntesis porque el error no se usa

    //             // Técnicamente también se puede
    //             // catchError( error => {
    //             //     console.log(error);
    //             //     return of([]);
    //             // } ) 
    //         );

    //     // También se podría hacer de la siguiente manera:
    //     // const url = `${ this.apiUrl }/capital/${ term }`
    //     // return this.http.get<Country[]>( url );

    // }

    // Refactorización de searchCapital
    searchCapital( term: string ):Observable<Country[]>{
        const url = `${ this.apiUrl }/capital/${ term }`
        return this.getCountriesRequest(url);
    }

    // searchCountry( term: string):Observable<Country[]>{
    //     return this.http.get<Country[]>(`${ this.apiUrl }/name/${ term }`)
    //         .pipe(
    //             catchError( () => of([]))
    //         );
    // }

    // Refactorización de searchCountry
    searchCountry( term: string):Observable<Country[]>{
        const url = `${ this.apiUrl }/name/${ term }`
        return this.getCountriesRequest(url);
    }
    
    // searchRegion( region: string):Observable<Country[]>{
    //     return this.http.get<Country[]>(`${ this.apiUrl }/region/${ region }`)
    //         .pipe(
    //             catchError( () => of([]))
    //         );
    // }

    // Refactorización de searchRegion
    searchRegion( region: string):Observable<Country[]>{
        const url = `${ this.apiUrl }/region/${ region }`
        return this.getCountriesRequest(url);
    }

}
