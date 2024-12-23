import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SnackbarService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
 }
