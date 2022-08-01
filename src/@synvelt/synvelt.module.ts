import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SynveltConfirmationModule } from '@synvelt/services/confirmation';
import { SynveltLoadingModule } from '@synvelt/services/loading';
import { SynveltMediaWatcherModule } from '@synvelt/services/media-watcher/media-watcher.module';
import { SynveltSplashScreenModule } from '@synvelt/services/splash-screen/splash-screen.module';
import { SynveltUtilsModule } from '@synvelt/services/utils/utils.module';

@NgModule({
  imports: [
    SynveltConfirmationModule,
    SynveltLoadingModule,
    SynveltMediaWatcherModule,
    SynveltSplashScreenModule,
    SynveltUtilsModule,
  ],
  providers: [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
})
export class SynveltModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: SynveltModule) {
    if (parentModule) {
      throw new Error(
        'SynveltModule has already been loaded. Import this module in the AppModule only!'
      );
    }
  }
}
