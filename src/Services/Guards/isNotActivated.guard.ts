import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../Authentication.service";
import { NavigatorLinks } from "../../Constants/navigator-links.constants";
import { map, Observable } from "rxjs";

const isNotLoggedIn: CanActivateFn = (route, state) => {
    const authServices = inject(AuthenticationService);
    const router = inject(Router);

    // Return an Observable<boolean | UrlTree>
    return authServices.isAuthenticated().pipe(
        map((isAuthenticated) => {
            // If authenticated, redirect to the dashboard
            if (isAuthenticated) {
                return router.createUrlTree([NavigatorLinks.DASHBOARD]);
            }
            // Otherwise, allow access to the route
            return true;
        })
    );
};

export default isNotLoggedIn;
