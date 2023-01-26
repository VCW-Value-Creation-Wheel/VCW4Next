import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VcwRoutingModule } from './vcw-routing.module';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { ChallengeComponent } from './phases/1/challenge/challenge.component';
import { VcwPageComponent } from './vcw-page/vcw-page.component';
import { VCWMethodComponent } from './vcw-page/vcw-method/vcw-method.component';
import { VcwJourneyComponent } from './vcw-page/vcw-journey/vcw-journey.component';
import { VcwSprintComponent } from './vcw-page/vcw-sprint/vcw-sprint.component';
import { SelectIdeasComponent } from './phases/3/select-ideas/select-ideas.component';



@NgModule({
  declarations: [
    DefineDiagonosticsComponent, 
    VcwPageComponent, 
    VCWMethodComponent, 
    VcwJourneyComponent, 
    VcwSprintComponent,
    ChallengeComponent,
    SelectIdeasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VcwRoutingModule,
    SharedModule
  ]
})
export class VcwModule { }
