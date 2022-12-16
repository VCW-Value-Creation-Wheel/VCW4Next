import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { SharedModule } from 'shared';
import { CoreModule } from '@core';
import { NewProjectComponent } from './features/project/new-project/new-project.component';
import { AppRoutingModule } from 'app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
