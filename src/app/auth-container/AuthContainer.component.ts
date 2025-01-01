import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../Services/Authentication.service';
import { NavigatorLinks } from '../../Constants/navigator-links.constants';
import { LogoutIcon } from '../../Shared/Components/Icons/LogoutIcon.Component';
import { MediaQueryDirective } from '../../Directives/MediaQuery.directive';
import { MatchMediaQueries } from '../../Constants/styling.constants';
import { MenuIcon } from "../../Shared/Components/Icons/MenuIcon.Component";
import { CloseIcon } from "../../Shared/Components/Icons/CloseIcon.Component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [RouterOutlet, LogoutIcon, MediaQueryDirective, MenuIcon, CloseIcon, NgIf],
  templateUrl: './AuthContainer.component.html',
  styleUrls: ['./AuthContainer.component.scss'],
})
export class AuthContainerComponent {
  // Dependency injections
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  // Media query constants
  readonly matchMediaQueries = MatchMediaQueries;

  showAsideDraw = signal(false);
  /**
   * Logs out the user and navigates to the login page.
   */

  toggleAsideDraw(): void {
    this.showAsideDraw.update(v => !v);
  }
  logout(): void {
    try {
      this.authService.logout();
      this.router.navigate([NavigatorLinks.LOGIN], { replaceUrl: true });
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally show a notification or handle the error
    }
  }
}

