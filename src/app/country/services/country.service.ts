import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';

import { ResponseCountry } from '../interfaces/response-countries.interface';

import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<Region, Country[]>();


  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if ( this.queryCacheByCapital.has(query) ) {
      return of( this.queryCacheByCapital.get(query) ?? [] );
    }

    return this.http.get<ResponseCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheByCapital.set(query, countries)),
      delay(1000),
      catchError(() => {
        return throwError(
          () => new Error(`We could not find that capital with this query ${query}`)
        );
      })
    )
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if ( this.queryCacheByCountry.has(query) ) {
      return of( this.queryCacheByCountry.get(query) ?? [] );
    }

    return this.http.get<ResponseCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheByCountry.set(query, countries)),
      delay(1000),
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

  searchByRegion( region: Region ) {

    if ( this.queryCacheByRegion.has(region) ) {
      return of( this.queryCacheByRegion.get(region) ?? [] );
    }

    return this.http.get<ResponseCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( countries => this.queryCacheByRegion.set(region, countries)),
      delay(2000),
      catchError(() => {
        return throwError(
          () => new Error(`We could not find the country with this region: ${region}`)
        );
      })
    )
  }
}
