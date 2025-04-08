import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Search')
  searchvalue = output<string>();

  onSearch(value: string) {
    this.searchvalue.emit(value);
  }
}
