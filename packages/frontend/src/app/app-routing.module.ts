import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from 'features/project/new-project/new-project.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'shared';

const routes: Routes = [{
  path:'new-project', component: NewProjectComponent
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
