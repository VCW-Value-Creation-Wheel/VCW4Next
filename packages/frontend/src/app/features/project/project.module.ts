import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from 'shared';



@NgModule({
  declarations: [NewProjectComponent, ProjectListComponent, ProjectPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
