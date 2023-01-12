import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'features/home/home.component';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./features/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'vcw',
    loadChildren: () => import('./features/vcw/vcw.module').then(m => m.VcwModule)
  },
  {
    path: '',
    component: HomeComponent
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