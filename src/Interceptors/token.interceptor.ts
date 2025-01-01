import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, tap, of } from "rxjs";
import { NavigatorLinks } from "../Constants/navigator-links.constants";
import { ApiStatusCode } from "../Constants/api.constants";
import { AuthenticationService } from "../Services/Authentication.service";

let refreshingToken = false;  // Flag to track if the token is being refreshed

const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authServices = inject(AuthenticationService);
    const router = inject(Router);

    // Get the token from the service
    let token: string = "";
    const connection = authServices.userModel.subscribe(u => {
        if (u && u.token) {
            token = u.token;
        }
    });

    // If no token, redirect to login
    if (!token) {
        router.navigate([NavigatorLinks.LOGIN]);
        return next(req);
    }

    // Clone the request and add the Authorization header
    const updatedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // If the token is expired and being refreshed, don't send another request to refresh it
    if (refreshingToken) {
        return next(updatedReq);
    }

    return next(updatedReq).pipe(
        tap((t) => {
            connection.unsubscribe();
        }),
        catchError((error) => {
            connection.unsubscribe();
            if (error instanceof HttpErrorResponse && error.status === ApiStatusCode.UNAUTHORIZED) {
                // Token refresh logic
                if (!refreshingToken) {
                    refreshingToken = true;
                    return authServices.refreshTheTokenWithAccessToken(token).pipe(
                        switchMap((newTokenModel) => {
                            if (newTokenModel) {
                                // Update the token after refresh
                                refreshingToken = false; // Reset the flag
                                const conn = authServices.userModel.subscribe(u => {
                                    if (u && u.token) {
                                        token = u.token;
                                    }
                                });
                                const retryReq = req.clone({
                                    headers: req.headers.set('Authorization', `Bearer ${token}`),
                                });
                                conn.unsubscribe();
                                return next(retryReq);
                            } else {
                                // Redirect to login if refresh failed
                                router.navigate([NavigatorLinks.LOGIN]);
                                refreshingToken = false; // Reset the flag
                                return throwError(() => new Error('Token refresh failed, redirecting to login.'));
                            }
                        }),
                        catchError(() => {
                            router.navigate([NavigatorLinks.LOGIN]);
                            refreshingToken = false; // Reset the flag
                            return throwError(() => new Error('Unauthorized'));
                        })
                    );
                }
            }
            return throwError(() => error);
        })
    );
};

export default tokenInterceptor;
