import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SynveltDrawerModule } from '@synvelt/components/drawer';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        SynveltDrawerModule,
        MatButtonModule,
    ],
    exports: [SettingsComponent],
})
export class SettingsModule {}
