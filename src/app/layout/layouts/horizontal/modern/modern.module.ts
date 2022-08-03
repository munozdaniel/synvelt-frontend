import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SynveltFullscreenModule } from '@synvelt/components/fullscreen';
import { SynveltLoadingBarModule } from '@synvelt/components/loading-bar';
import { SynveltNavigationModule } from '@synvelt/components/navigation';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { ModernLayoutComponent } from 'app/layout/layouts/horizontal/modern/modern.component';

@NgModule({
  declarations: [ModernLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SynveltFullscreenModule,
    SynveltLoadingBarModule,
    SynveltNavigationModule,
    UserModule,
    SharedModule,
  ],
  exports: [ModernLayoutComponent],
})
export class ModernLayoutModule {}
