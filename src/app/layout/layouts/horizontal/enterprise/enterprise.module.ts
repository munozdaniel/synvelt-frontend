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
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { EnterpriseLayoutComponent } from 'app/layout/layouts/horizontal/enterprise/enterprise.component';

@NgModule({
  declarations: [EnterpriseLayoutComponent],
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
    MessagesModule,
    NotificationsModule,
    QuickChatModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
    SharedModule,
  ],
  exports: [EnterpriseLayoutComponent],
})
export class EnterpriseLayoutModule {}
