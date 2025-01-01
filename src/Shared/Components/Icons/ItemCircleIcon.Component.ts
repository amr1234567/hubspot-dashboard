import { Component, input } from "@angular/core"
import { BaseIconComponent } from "../Base/IconBase.Component"

@Component({
    template: `<svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3291 8.66667C15.3291 12.349 12.3448 15.3333 8.66454 15.3333C4.98428 15.3333 2 12.349 2 8.66667C2 4.9843 4.98428 2 8.66454 2C12.3448 2 15.3291 4.9843 15.3291 8.66667Z" [attr.stroke]="color()"  [attr.stroke-width]="stroke()"/>
</svg>
`,
    standalone: true,
    selector: 'app-item-circle-icon'
})
export class ItemCircleIcon extends BaseIconComponent {
    stroke = input<number>(4)
}

