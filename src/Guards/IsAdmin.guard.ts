import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication.service';
import { map, tap } from 'rxjs';
import { NavigatorLinks } from '../Constants/navigator-links.constants';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router);
  return authService.isUserAdmin().pipe(map((isAdmin) => {
    if (isAdmin)
      return true;
    else
      return router.createUrlTree([NavigatorLinks.CONTACTS]);
  }))
};
