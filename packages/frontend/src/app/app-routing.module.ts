import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from 'features/project/new-project/new-project.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'shared';
import { ProjectListComponent } from 'features/project/project-list/project-list.component';
import { HomeComponent } from 'features/home/home.component';
import { ProjectPageComponent } from 'features/project/project-page/project-page.component';

const routes: Routes = [
  {
    path:'project/:project_id', component: ProjectPageComponent
  },
  {
    path:'project', component: ProjectPageComponent
  },
  {
    path:'new-project', component: NewProjectComponent
  },
  {
    path:'', component: HomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }