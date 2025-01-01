import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../Services/Authentication.service';

@Directive({
  selector: '[appIfAdmin]',  // The directive's selector,
  standalone: true
})
export class IfAdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) { }

  // This will control whether the element should be displayed
  ngOnInit() {
    if (this.authService.isUserAdmin()) {
      // If the user is an admin, add the element to the DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // If the user is not an admin, remove the element from the DOM
      this.viewContainer.clear();
    }
  }
}
