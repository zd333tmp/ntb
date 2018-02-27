import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

/**
 * Dumb component that takes care of search flow.
 * TODO: would be good to add type-ahead functionality
 * and convert entered words to chips.
 */
@Component({
  selector: 'ntb-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  @Input() keywords: Array<string>;
  @Output() updateKeywords = new EventEmitter<Array<string>>();

  getInputValue(): string {
    if (!this.keywords || !this.keywords.length) {
      return null;
    }
    return this.keywords.join(' ');
  }

  onInput(inputElement: HTMLInputElement): void {
    if (!inputElement) {
      return;
    }
    const inputString = inputElement.value;

    if (!inputString) {
      this.updateKeywords.emit([]);
      return;
    }
    this.updateKeywords.emit(inputString.split(' '));
  }
}
