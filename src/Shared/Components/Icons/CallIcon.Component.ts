import { Component } from "@angular/core"
import { BaseIconComponent } from "../Base/IconBase.Component"

@Component({
    template: `<svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 22.75H9C4.59 22.75 3.25 21.41 3.25 17V7C3.25 2.59 4.59 1.25 9 1.25H15C19.41 1.25 20.75 2.59 20.75 7V17C20.75 21.41 19.41 22.75 15 22.75ZM9 2.75C5.42 2.75 4.75 3.43 4.75 7V17C4.75 20.57 5.42 21.25 9 21.25H15C18.58 21.25 19.25 20.57 19.25 17V7C19.25 3.43 18.58 2.75 15 2.75H9Z" [attr.fill]="color()"/>
<path d="M14 6.25H10C9.59 6.25 9.25 5.91 9.25 5.5C9.25 5.09 9.59 4.75 10 4.75H14C14.41 4.75 14.75 5.09 14.75 5.5C14.75 5.91 14.41 6.25 14 6.25Z" [attr.fill]="color()"/>
<path d="M12 19.86C10.73 19.86 9.70001 18.83 9.70001 17.56C9.70001 16.29 10.73 15.26 12 15.26C13.27 15.26 14.3 16.29 14.3 17.56C14.3 18.83 13.27 19.86 12 19.86ZM12 16.75C11.56 16.75 11.2 17.11 11.2 17.55C11.2 17.99 11.56 18.35 12 18.35C12.44 18.35 12.8 17.99 12.8 17.55C12.8 17.11 12.44 16.75 12 16.75Z" [attr.fill]="color()"/>
</svg>

`,
    standalone: true,
    selector: 'app-call-icon'
})
export class CallIcon extends BaseIconComponent {
}
