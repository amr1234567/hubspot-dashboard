import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DateMappingType, datesMappingTokenInjector } from '../../../Constants/dates-maping';
import { FormsModule } from '@angular/forms';
import { Owner } from '../../../Models/owner.model';
import { MediaQueryDirective } from '../../../Directives/MediaQuery.directive';
import { MatchMediaQueries } from '../../../Constants/styling.constants';
import { OwnerDropDownComponent } from "./OwnerDropDown/OwnerDropDown.component";
import { DateRangeContainerComponent } from "./DateRangeContainer/DateRangeContainer.component";
import { DashboardService, GetDashBoardParams } from '../../../Services/Dashboard.service';
import { DatesMobileViewComponent } from "./DatesMobileView/DatesMobileView.component";
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, MediaQueryDirective, OwnerDropDownComponent, DateRangeContainerComponent, DatesMobileViewComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly matchMediaQueries = MatchMediaQueries;

  currentIndex = signal<number>(0);
  showRange = signal(false);
  date = signal<DateMappingType | null>(null);
  selectedOwner = signal<Owner | null>(null);

  selectedOption = signal<string | null>(null);
  dropdownOpen = signal(false);
  filtersButtons = inject(datesMappingTokenInjector);


  private destroyRef = inject(DestroyRef);

  private dashboardServices = inject(DashboardService);

  selectTimeOption(index: number): void {
    this.currentIndex.set(index);
    if (index === this.filtersButtons.length - 1) {
      this.showRange.set(true);
    } else {
      this.showRange.set(false);
      this.date.set(null);
      this.ReloadDashBoard();
    }
  }

  selectOwner(owner: Owner | null) {
    this.selectedOwner.set(owner);
    this.ReloadDashBoard();
  }

  confirmRange(date: DateMappingType) {
    this.date.set(date);
    this.ReloadDashBoard();
  }

  resetRange() {
    this.date.set({});
    this.ReloadDashBoard();
  }

  private ReloadDashBoard() {
    const params: GetDashBoardParams = {};
    console.log(this.date());
    const dateValue = this.date();

    if (dateValue !== null) {
      if (dateValue.dateFrom) {
        const dateFrom = this.ensureDate(dateValue.dateFrom);
        if (isNaN(dateFrom.getTime())) {
          console.error('Invalid dateFrom:', dateValue.dateFrom);
        } else {
          const existingTime = dateFrom.getTime() % (24 * 60 * 60 * 1000);
          params.dateFrom = new Date(dateFrom.setHours(0, 0, 0, 0) + existingTime);
        }
      }
      if (dateValue.dateTo) {
        const dateTo = this.ensureDate(dateValue.dateTo);
        if (isNaN(dateTo.getTime())) {
          console.error('Invalid dateTo:', dateValue.dateTo);
        } else {
          const existingTime = dateTo.getTime() % (24 * 60 * 60 * 1000);
          params.dateTo = new Date(dateTo.setHours(0, 0, 0, 0) + existingTime);
        }
      }
    } else {
      params.dateFrom = this.filtersButtons[this.currentIndex()].dateFrom;
      params.dateTo = this.filtersButtons[this.currentIndex()].dateTo;
    }

    if (this.selectedOwner() !== null) {
      params.ownerId = this.selectedOwner()?.id;
    }

    const newDashboardConnection = this.dashboardServices.reloadDashboard(params).subscribe()
    this.destroyRef.onDestroy(() => newDashboardConnection.unsubscribe());
  }

  private ensureDate = (date: string | Date): Date => {
    return typeof date === 'string' ? new Date(date) : date;
  };
}
