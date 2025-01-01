import { Route } from "@angular/router";
import { AuthContainerComponent } from "./AuthContainer.component";
import canActivateApp from "../../Services/Guards/canActive.guard";
import datesMappingProvider from "../../Constants/dates-maping";
import { NavigatorLinks } from "../../Constants/navigator-links.constants";
import { DashBoardComponent } from "../DashBoard/DashBoard.component";
import { isAdminGuard } from "../../Services/Guards/IsAdmin.guard";
import { ownersResolver } from "../../Services/Resolvers/owners.resolver";
import { dashaboardDetailsResolver } from "../../Services/Resolvers/dashaboardDetails.resolver";
import { ContactsPageComponent } from "../contacts-page/contacts-page.component";
import { ContactPageComponent } from "../contact-page/contact-page.component";
import { OwnersService } from "../../Services/Owners.service";
import { DashboardService } from "../../Services/Dashboard.service";


const authRoutes: Route = {
    path: '',
    component: AuthContainerComponent,
    canActivate: [canActivateApp],
    providers: [datesMappingProvider, OwnersService, DashboardService],
    children: [
        {
            path: NavigatorLinks.DASHBOARD,
            component: DashBoardComponent,
            canActivate: [isAdminGuard],
            resolve: {
                owners: ownersResolver,
                dashboard: dashaboardDetailsResolver
            },
        },
        {
            path: NavigatorLinks.CONTACTS,
            component: ContactsPageComponent
        },
        {
            path: NavigatorLinks.CONTACT_DETAILS + "/:contactId",
            component: ContactPageComponent
        }
    ]
}


export default authRoutes;