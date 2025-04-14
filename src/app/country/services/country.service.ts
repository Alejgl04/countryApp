import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

import { ResponseCountry } from '../interfaces/response-countries.interface';

import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<ResponseCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(1000),
      catchError(() => {
        return throwError(
          () => new Error(`We could not find that capital with this query ${query}`)
        );
      })
    ).pipe(
    )
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<ResponseCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError(() => {
        return throwError(
          () => new Error(`We could not find the country with this query ${query}`)
        );
      })
    )
  }

  searchCountryByCode( code: string ) {

    return this.http.get<ResponseCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map( (countries) => countries.at(0)),
      delay(2000),
      catchError(() => {
        return throwError(
          () => new Error(`We could not find the country with this code: ${code}`)
        );
      })
    )
  }
}
