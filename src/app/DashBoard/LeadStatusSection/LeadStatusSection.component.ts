import { ChangeDetectionStrategy, Component, computed, inject, input, type OnInit } from '@angular/core';
import { DoubleValue, initialDashboardDto } from '../../../Models/dashboard.model';
import { MoreOptionsIcon } from "../../../Shared/Components/Icons/MoreOptionsIcon.Component";
import { ItemCircleIcon } from "../../../Shared/Components/Icons/ItemCircleIcon.Component";
import { DashboardService } from '../../../Services/Dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lead-status-section',
  standalone: true,
  imports: [MoreOptionsIcon, ItemCircleIcon, CommonModule],
  templateUrl: './LeadStatusSection.component.html',
  styleUrl: './LeadStatusSection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadStatusSectionComponent implements OnInit {

  private dashboardServices = inject(DashboardService);
  ngOnInit(): void { }

  dashboard = toSignal(this.dashboardServices.dashboard$)
  dashboardNotNull = computed(() => (this.dashboard() ?? initialDashboardDto));

  staticData = computed(() => [
    {
      title: "New Leads",
      value: (this.dashboard() ?? initialDashboardDto).numberOfLeadContacts,
      color: "#FDC007",
      width: this.getPrecentage(this.dashboardNotNull().numberOfLeadContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "In Progress",
      value: (this.dashboard() ?? initialDashboardDto).numberOfInProgressContacts,
      color: "#666666",
      width: this.getPrecentage(this.dashboardNotNull().numberOfInProgressContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Attempted",
      value: this.dashboardNotNull().numberOfAttemptedContacts,
      color: "#A5A2F2",
      width: this.getPrecentage(this.dashboardNotNull().numberOfAttemptedContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Waiting in Products",
      value: (this.dashboard() ?? initialDashboardDto).numberOfWaitingInProductsContacts,
      color: "#08DAE9",
      width: this.getPrecentage(this.dashboardNotNull().numberOfWaitingInProductsContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Store in Design",
      value: this.dashboardNotNull().numberOfStoreInDesignContacts,
      color: "#5C67F7",
      width: this.getPrecentage(this.dashboardNotNull().numberOfStoreInDesignContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Store Delivered",
      value: this.dashboardNotNull().numberOfStoreDeliveredContacts,
      color: "#00A389",
      width: this.getPrecentage(this.dashboardNotNull().numberOfStoreDeliveredContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Bad Timing",
      value: this.dashboardNotNull().numberOfBadTimingContacts,
      color: "#FF8E6F",
      width: this.getPrecentage(this.dashboardNotNull().numberOfBadTimingContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    },
    {
      title: "Unqualified",
      value: this.dashboardNotNull().numberOfUnQualifiedAsLeadStatusContacts,
      color: "#F26457",
      width: this.getPrecentage(this.dashboardNotNull().numberOfUnQualifiedAsLeadStatusContacts,
        this.dashboardNotNull().numberOfContacts.globalValue)
    }
  ])

  total = computed(() => {
    return (
      this.dashboardNotNull().numberOfLeadContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfInProgressContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfAttemptedContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfWaitingInProductsContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfStoreInDesignContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfStoreDeliveredContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfBadTimingContacts.recentlyCreatedValue +
      this.dashboardNotNull().numberOfUnQualifiedAsLeadStatusContacts.recentlyCreatedValue
    );
  });


  getPrecentage(value: DoubleValue, total: number): number {
    if (this.total() === 0 || value.recentlyCreatedValue === 0) {
      return 0;
    }
    return (value.recentlyCreatedValue / this.total()) * 100 - 1;
  }
}
