import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VcwRoutingModule } from './vcw-routing.module';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { VcwPageComponent } from './vcw-page/vcw-page.component';
import { VcwInteractiveComponent } from './vcw-page/vcw-interactive/vcw-interactive.component';



@NgModule({
  declarations: [DefineDiagonosticsComponent, VcwPageComponent, VcwInteractiveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VcwRoutingModule,
    SharedModule
  ]
})
export class VcwModule { }
