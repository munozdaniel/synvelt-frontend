import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SynveltConfirmationConfig } from '@synvelt/services/confirmation/confirmation.types';

@Component({
    selector: 'synvelt-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        /* language=SCSS */
        `
            .synvelt-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SynveltConfirmationDialogComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SynveltConfirmationConfig,
        public matDialogRef: MatDialogRef<SynveltConfirmationDialogComponent>
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
