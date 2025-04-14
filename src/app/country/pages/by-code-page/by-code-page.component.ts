import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-by-code-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './by-code-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCodePageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByCode(request.code);
    },
  });
}
