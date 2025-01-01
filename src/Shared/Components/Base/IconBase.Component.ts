import { Component, input } from '@angular/core';

@Component({
    selector: 'app-base-icon',
    template: '',
    host: {
        '[class]': 'className()',
        "[style.display]": "'flex'",
        "[style.justifyContent]": "'center'",
        "[style.alignItems]": "'center'",
    },
})
export class BaseIconComponent {
    className = input<string>("")  // Input to define the icon name
    color = input<string>("#ffffff")
    height = input<number>(20)
    width = input<number>(20)

    constructor() { }
}
