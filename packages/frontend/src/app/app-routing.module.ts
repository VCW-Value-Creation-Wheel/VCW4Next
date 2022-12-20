import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'shared';
import { NewVcwComponent } from 'features/vcw/new-vcw/new-vcw.component';
import { HomeComponent } from 'features/home/home.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'new-vcw', component: NewVcwComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
