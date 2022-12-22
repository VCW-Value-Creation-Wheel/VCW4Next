import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'features/home/home.component';
import { ProjectPageComponent } from 'features/project/project-page/project-page.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'project/:project_id', component: ProjectPageComponent
  },
  {
    path:'project', component: ProjectPageComponent
  },
  
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