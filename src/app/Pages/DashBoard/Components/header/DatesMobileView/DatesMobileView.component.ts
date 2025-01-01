import { ChangeDetectionStrategy, Component, inject, input, output, signal, type OnInit } from '@angular/core';
import { datesMappingTokenInjector } from '../../../../../../Constants/dates-maping';

@Component({
  selector: 'app-dates-mobile-view',
  standalone: true,
  imports: [],
  templateUrl: './DatesMobileView.component.html',
  styleUrl: './DatesMobileView.component.scss',
  host: {
    class: 'custom-dropdown',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatesMobileViewComponent implements OnInit {

  ngOnInit(): void { }

  filtersButtons = inject(datesMappingTokenInjector);

  selectOption = output<number>();
  currentIndex = input.required<number>();
  dropdownOpen = signal(false);

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  onSelectOption(index: number): void {
    this.dropdownOpen.set(false);
    this.selectOption.emit(index);
  }
}
