import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { SharedModule } from 'shared';
import { CoreModule } from '@core';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectListComponent } from './features/project/project-list/project-list.component';
import { ProjectPageComponent } from './features/project/project-page/project-page.component';
import { AppRoutingModule } from 'app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    ProjectListComponent,
    ProjectPageComponent
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
