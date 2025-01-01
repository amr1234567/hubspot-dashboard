import { ChangeDetectionStrategy, Component, computed, inject, input, type OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeadIcon } from '../../../../../Shared/Components/Icons/LeadIcon.Component';
import { CustomerIcon } from '../../../../../Shared/Components/Icons/CustomerIcon.Component';
import { DashboardService } from '../../../../../Services/Dashboard.service';
import { initialDashboardDto } from '../../../../../Models/dashboard.model';

@Component({
  selector: 'app-customers-and-leads-section',
  standalone: true,
  imports: [CommonModule, LeadIcon, CustomerIcon, LeadIcon],
  templateUrl: './CustomersAndLeadsSection.component.html',
  styleUrl: './CustomersAndLeadsSection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersAndLeadsSectionComponent implements OnInit {

  private dashboardServices = inject(DashboardService)
  ngOnInit(): void { }

  dashboard = toSignal(this.dashboardServices.dashboard$);

  staticData = computed(() => [
    {
      title: "Leads",
      value: (this.dashboard() ?? initialDashboardDto).numberOfLeadContacts,
    },
    {
      title: "Customers",
      value: (this.dashboard() ?? initialDashboardDto).numberOfCustomerContacts,
    },
  ])
}
