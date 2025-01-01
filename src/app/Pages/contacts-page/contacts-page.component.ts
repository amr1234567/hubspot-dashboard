import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IfAdminDirective } from '../../../Directives/IfAdmin.directive';
import { AuthenticationService } from '../../../Services/Authentication.service';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [RouterLink, IfAdminDirective],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent {
  private authServices = inject(AuthenticationService)

  get getIsAdmin() {
    return this.authServices.isUserAdmin();  // Example method to check if user is admin
  }
}
