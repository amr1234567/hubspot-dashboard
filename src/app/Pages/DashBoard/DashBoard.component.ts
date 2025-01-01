import { Component, computed, inject } from '@angular/core';
import { ContactsSectionComponent } from "./Components/ContactsSection/ContactsSection.component";
import { CommonModule } from '@angular/common';
import { CallsDetailsSectionComponent } from "./Components/CallsDetailsSection/CallsDetailsSection.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './Components/header/header.component';
import { ContactIcon } from '../../../Shared/Components/Icons/ContactsIcon.Component';
import { CustomersAndLeadsSectionComponent } from './Components/CustomersAndLeadsSection/CustomersAndLeadsSection.component';
import { LeadStatusSectionComponent } from './Components/LeadStatusSection/LeadStatusSection.component';
import { DashboardService } from '../../../Services/Dashboard.service';

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
