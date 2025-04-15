import { Country } from "../interfaces/country.interface";
import { ResponseCountry } from "../interfaces/response-countries.interface";


export class CountryMapper {

  static mapRestCountryToCountry( restcountry: ResponseCountry ): Country {
    return {
      capital: restcountry.capital?.join(','),
      cca2: restcountry.cca2,
      flag: restcountry.flag,
      flagSvg: restcountry.flags.svg,
      name: restcountry.name.common,
      population: restcountry.population,
      region: restcountry.region,
      subRegion: restcountry.subregion,
    }
  }

  static mapRestCountryArrayToCountryArray( restCountries: ResponseCountry[] ): Country[] {
    return restCountries.map(this.mapRestCountryToCountry)
  }

}
