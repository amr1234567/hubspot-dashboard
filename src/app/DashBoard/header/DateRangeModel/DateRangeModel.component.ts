import { ChangeDetectionStrategy, Component, computed, Input, input, output, signal, type OnInit } from '@angular/core';
import { DateMappingType } from '../../../../Constants/dates-maping';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './DateRangeModel.component.html',
  styleUrl: './DateRangeModel.component.scss',
  host: {
    "class": "model",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeModelComponent implements OnInit {

  ngOnInit(): void { }

  @Input() dateFrom: Date | null | undefined = null;
  @Input() dateTo: Date | null | undefined = (null);

  confirm = output<DateMappingType>();
  reset = output();
  onConfirm() {
    const date: DateMappingType = {
      dateFrom: null,
      dateTo: null,
      dateName: 'Custom'
    };
    if (this.dateFrom) {
      date.dateFrom = this.dateFrom;
    }
    if (this.dateTo) {
      date.dateTo = this.dateTo;
    }
    if (date.dateFrom && date.dateTo && date.dateFrom > date.dateTo) {
      let swaper = date.dateFrom;
      date.dateFrom = date.dateTo;
      date.dateTo = swaper;
      this.dateFrom = date.dateFrom;
      this.dateTo = date.dateTo;
    }
    this.confirm.emit(date);
  }

  onReset() {
    this.reset.emit();
  }

  get maxDateForDateTo(): string {
    return new Date().toISOString().split('T')[0]; // Current date in yyyy-MM-dd
  }
}
