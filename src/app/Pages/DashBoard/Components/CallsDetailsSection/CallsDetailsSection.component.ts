import { ChangeDetectionStrategy, Component, computed, inject, input, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MoreOptionsIcon } from '../../../../../Shared/Components/Icons/MoreOptionsIcon.Component';
import { WhatsAppIcon } from '../../../../../Shared/Components/Icons/WhatsAppIcon.Component';
import { CallIcon } from '../../../../../Shared/Components/Icons/CallIcon.Component';
import { DashboardService } from '../../../../../Services/Dashboard.service';
import { DoubleValue, initialDashboardDto } from '../../../../../Models/dashboard.model';

@Component({
  selector: 'app-calls-details-section',
  standalone: true,
  imports: [CommonModule, CallIcon, WhatsAppIcon, MoreOptionsIcon],
  templateUrl: './CallsDetailsSection.component.html',
  styleUrl: './CallsDetailsSection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallsDetailsSectionComponent implements OnInit {

  private dashboardServices = inject(DashboardService);
  ngOnInit(): void { }

  dashboard = toSignal(this.dashboardServices.dashboard$);

  callDetails = computed(() =>
  ({
    answered: (this.dashboard() ?? initialDashboardDto).numberOfCallsAnswered,
    notAnswered: (this.dashboard() ?? initialDashboardDto).numberOfCallsNotAnswered
  }))
  whasAppDetails = computed(() =>
  ({
    answered: (this.dashboard() ?? initialDashboardDto).numberOfWhatsAppAnswered,
    notAnswered: (this.dashboard() ?? initialDashboardDto).numberOfWhatsAppNotAnswered
  }))


  staticData = computed(() => [
    {
      title: "Calls",
      value: this.callDetails(),
      widthPrecentage: this.getWidthPrecentage(this.callDetails()),
      color: "orange",
    },
    {
      title: "Whatsapp",
      value: this.whasAppDetails(),
      widthPrecentage: this.getWidthPrecentage(this.whasAppDetails()),
      color: "green",
    }
  ])

  getWidthPrecentage(value: { answered: DoubleValue, notAnswered: DoubleValue }): number {
    if (value.answered.recentlyCreatedValue === 0)
      return 0;
    return (value.answered.recentlyCreatedValue / (value.answered.recentlyCreatedValue + value.notAnswered.recentlyCreatedValue)) * 100;
  }
}
