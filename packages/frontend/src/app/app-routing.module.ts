import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'features/home/home.component';
import { NewProjectComponent } from 'features/project/new-project/new-project.component';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./features/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new-project',
    component: NewProjectComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
