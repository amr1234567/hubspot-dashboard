import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { BottomArrowIcon } from "../../../../Shared/Components/Icons/BottomArrowIcon.Component";
import { BieDirectionArrowIcon } from "../../../../Shared/Components/Icons/BieDirectionArrowIcon.Component";
import { DateRangeModelComponent } from "../DateRangeModel/DateRangeModel.component";
import { DateMappingType } from '../../../../Constants/dates-maping';

@Component({
  selector: 'app-date-range-container',
  standalone: true,
  imports: [CommonModule, BottomArrowIcon, BieDirectionArrowIcon, DateRangeModelComponent],
  templateUrl: './DateRangeContainer.component.html',
  styleUrl: './DateRangeContainer.component.scss',
  host: {
    class: 'date-range-container',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeContainerComponent {


  dateFrom = input<Date | null | undefined>(null)
  dateTo = input<Date | null | undefined>(null)
  confirmRange = output<DateMappingType>();
  resetRange = output<void>();

  showDateDialog = signal(false);


  onConfirmRange(date: DateMappingType) {
    this.confirmRange.emit(date);
    this.toggleDialog();
  }

  onResetRange() {
    this.resetRange.emit();
  }
  toggleDialog() {
    this.showDateDialog.update(v => !v);
  }

}
