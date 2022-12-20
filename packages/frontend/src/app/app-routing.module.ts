import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'shared';
import { NewVcwComponent } from 'features/vcw/new-vcw/new-vcw.component';

const routes: Routes = [
{
  path:'new-vcw',
  component: NewVcwComponent
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
