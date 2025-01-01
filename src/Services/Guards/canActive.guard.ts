import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../Authentication.service";
import { NavigatorLinks } from "../../Constants/navigator-links.constants";
import { map } from "rxjs";


const canActivateApp: CanActivateFn = (route, state) => {
    const authServices = inject(AuthenticationService);
    const router = inject(Router);
    return authServices.isAuthenticated().pipe(
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true; // Allow navigation
            }
            return router.createUrlTree([NavigatorLinks.LOGIN]); // Redirect to login
        })
    );
}

export default canActivateApp;