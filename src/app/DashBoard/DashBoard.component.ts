import { Component, computed, inject } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ContactsSectionComponent } from "./ContactsSection/ContactsSection.component";
import { ContactIcon } from "../../Shared/Components/Icons/ContactsIcon.Component";
import { CommonModule } from '@angular/common';
import { CustomersAndLeadsSectionComponent } from "./CustomersAndLeadsSection/CustomersAndLeadsSection.component";
import { CallsDetailsSectionComponent } from "./CallsDetailsSection/CallsDetailsSection.component";
import { LeadStatusSectionComponent } from "./LeadStatusSection/LeadStatusSection.component";
import { DashboardService } from '../../Services/Dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashBoardDto } from '../../Models/dashboard.model';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    HeaderComponent,
    ContactsSectionComponent,
    ContactIcon, CommonModule,
    CustomersAndLeadsSectionComponent,
    CallsDetailsSectionComponent,
    LeadStatusSectionComponent
  ],
  templateUrl: './DashBoard.component.html',
  styleUrl: './DashBoard.component.scss',
})
export class DashBoardComponent {

  private dashboardServices = inject(DashboardService);

  dashboardAsSignal = toSignal(this.dashboardServices.dashboard$);
  ContactsNumber = computed(() => this.dashboardAsSignal()?.numberOfContacts.recentlyCreatedValue ?? 0);
}
