import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SynveltScrollbarModule } from '@synvelt/directives/scrollbar/public-api';
import { SynveltHorizontalNavigationBasicItemComponent } from '@synvelt/components/navigation/horizontal/components/basic/basic.component';
import { SynveltHorizontalNavigationBranchItemComponent } from '@synvelt/components/navigation/horizontal/components/branch/branch.component';
import { SynveltHorizontalNavigationDividerItemComponent } from '@synvelt/components/navigation/horizontal/components/divider/divider.component';
import { SynveltHorizontalNavigationSpacerItemComponent } from '@synvelt/components/navigation/horizontal/components/spacer/spacer.component';
import { SynveltHorizontalNavigationComponent } from '@synvelt/components/navigation/horizontal/horizontal.component';
import { SynveltVerticalNavigationAsideItemComponent } from '@synvelt/components/navigation/vertical/components/aside/aside.component';
import { SynveltVerticalNavigationBasicItemComponent } from '@synvelt/components/navigation/vertical/components/basic/basic.component';
import { SynveltVerticalNavigationCollapsableItemComponent } from '@synvelt/components/navigation/vertical/components/collapsable/collapsable.component';
import { SynveltVerticalNavigationDividerItemComponent } from '@synvelt/components/navigation/vertical/components/divider/divider.component';
import { SynveltVerticalNavigationGroupItemComponent } from '@synvelt/components/navigation/vertical/components/group/group.component';
import { SynveltVerticalNavigationSpacerItemComponent } from '@synvelt/components/navigation/vertical/components/spacer/spacer.component';
import { SynveltVerticalNavigationComponent } from '@synvelt/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        SynveltHorizontalNavigationBasicItemComponent,
        SynveltHorizontalNavigationBranchItemComponent,
        SynveltHorizontalNavigationDividerItemComponent,
        SynveltHorizontalNavigationSpacerItemComponent,
        SynveltHorizontalNavigationComponent,
        SynveltVerticalNavigationAsideItemComponent,
        SynveltVerticalNavigationBasicItemComponent,
        SynveltVerticalNavigationCollapsableItemComponent,
        SynveltVerticalNavigationDividerItemComponent,
        SynveltVerticalNavigationGroupItemComponent,
        SynveltVerticalNavigationSpacerItemComponent,
        SynveltVerticalNavigationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        SynveltScrollbarModule,
    ],
    exports: [
        SynveltHorizontalNavigationComponent,
        SynveltVerticalNavigationComponent,
    ],
})
export class SynveltNavigationModule {}
