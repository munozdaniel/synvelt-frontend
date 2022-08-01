import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SynveltConfirmationService } from '@synvelt/services/confirmation/confirmation.service';
import { SynveltConfirmationDialogComponent } from '@synvelt/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SynveltConfirmationDialogComponent],
    imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
    providers: [SynveltConfirmationService],
})
export class SynveltConfirmationModule {
    /**
     * Constructor
     */
    constructor(
        private _synveltConfirmationService: SynveltConfirmationService
    ) {}
}
