import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from 'shared';
import { NewVcwComponent } from 'features/vcw/new-vcw/new-vcw.component';



@NgModule({
  declarations: [ProjectPageComponent, NewVcwComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
