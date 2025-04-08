import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";
import { CountryLayoutComponent } from "./layouts/CountryLayout/CountryLayout.component";
import { ByCountryPageComponent } from "./pages/by-country-page/by-country-page.component";
import { ByRegionPageComponent } from "./pages/by-region-page/by-region-page.component";
import { ByCodePageComponent } from "./pages/by-code-page/by-code-page.component";

export const CountryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent
      },
      {
        path: 'by-code/:code',
        component: ByCodePageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  },
];


export default CountryRoutes;
