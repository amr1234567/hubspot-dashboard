import { Routes } from '@angular/router';
import { NavigatorLinks } from '../Constants/navigator-links.constants';
import { LoginComponent } from './loginPage/login.component';
import isNotLoggedIn from '../Services/Guards/isNotActivated.guard';
import { AppComponent } from './app.component';
import authRoutes from './auth-container/auth-container.routes';

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
            {
                path: NavigatorLinks.LOGIN,
                component: LoginComponent,
                canActivate: [isNotLoggedIn],
            },
            authRoutes
        ]
    },
    {
        path: "**",
        redirectTo: NavigatorLinks.CONTACTS
    }
];
