import { Component, ViewEncapsulation } from '@angular/core';
import { synveltAnimations } from '@synvelt/animations';

@Component({
    selector: 'auth-confirmation-required',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: synveltAnimations,
})
export class AuthConfirmationRequiredComponent {
    /**
     * Constructor
     */
    constructor() {}
}
