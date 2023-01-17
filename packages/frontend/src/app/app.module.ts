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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectListComponent } from './features/project/project-list/project-list.component';
import { NewVcwComponent } from 'features/vcw/new-vcw/new-vcw.component';
import { ProjectPageComponent } from './features/project/project-page/project-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewVcwComponent,
    NewProjectComponent,
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
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
