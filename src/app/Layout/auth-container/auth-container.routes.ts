import { Route } from "@angular/router";
import { AuthContainerComponent } from "./AuthContainer.component";
import canActivateApp from "../../../Guards/canActive.guard";
import datesMappingProvider from "../../../Constants/dates-maping";
import { NavigatorLinks } from "../../../Constants/navigator-links.constants";
import { isAdminGuard } from "../../../Guards/IsAdmin.guard";
import { ownersResolver } from "../../../Resolvers/owners.resolver";
import { dashaboardDetailsResolver } from "../../../Resolvers/dashaboardDetails.resolver";
import { OwnersService } from "../../../Services/Owners.service";
import { DashboardService } from "../../../Services/Dashboard.service";
import { ContactsPageComponent } from "../../Pages/contacts-page/contacts-page.component";
import { ContactPageComponent } from "../../Pages/contact-page/contact-page.component";
import { DashBoardComponent } from "../../Pages/DashBoard/DashBoard.component";


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