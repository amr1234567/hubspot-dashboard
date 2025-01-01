import { ChangeDetectionStrategy, Component, computed, inject, input, type OnInit } from '@angular/core';
import { DashBoardDto, initialDashboardDto } from '../../../Models/dashboard.model';
import { QualifiedContactFillIcon } from '../../../Shared/Components/Icons/QualifiedContactFillIcon.Component';
import { UnqualifiedContactIcon } from '../../../Shared/Components/Icons/UnqualifiedContactIcon.Component';
import { OpportunityContactEmptyIcon } from '../../../Shared/Components/Icons/OpportunityContactEmptyIcon.Component';
import { CommonModule, NgSwitch } from '@angular/common';
import { DashboardService } from '../../../Services/Dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-section',
  standalone: true,
  imports: [CommonModule, QualifiedContactFillIcon, OpportunityContactEmptyIcon, UnqualifiedContactIcon],
  templateUrl: './ContactsSection.component.html',
  styleUrl: './ContactsSection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsSectionComponent implements OnInit {
  private dashboardServices = inject(DashboardService)
  ngOnInit(): void { }

  dashboard = toSignal(this.dashboardServices.dashboard$)
  staticData = computed(() => [
    {
      icon: QualifiedContactFillIcon,
      title: "Qualified",
      value: (this.dashboard() ?? initialDashboardDto).numberOfQualifiedContacts,
      color: "green"
    },
    {
      icon: OpportunityContactEmptyIcon,
      title: "Opportunity",
      value: (this.dashboard() ?? initialDashboardDto).numberOfOpportunitiesContacts,
      color: "blue"
    },
    {
      icon: UnqualifiedContactIcon,
      title: "Unqualified",
      value: (this.dashboard() ?? initialDashboardDto).numberOfUnQualifiedAsLeadStatusContacts,
      color: "red"
    },
  ])

  staticTitles = [
    {
      className: "lead-overview",
      title: "Lead Overview"
    },
    {
      className: "lead-total",
      title: "Total Leads",
    }
  ]
}