import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewVcwComponent } from './new-vcw/new-vcw.component';
import { VcwRoutingModule } from './vcw-routing.module';



@NgModule({
  declarations: [NewVcwComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VcwRoutingModule,
    SharedModule
  ]
})
export class VcwModule { }
