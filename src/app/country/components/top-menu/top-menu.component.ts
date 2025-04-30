import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme, ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  themeService = inject(ThemeService);

  isLight = model(this.themeService.getCurrentTheme()() === 'light');
}
