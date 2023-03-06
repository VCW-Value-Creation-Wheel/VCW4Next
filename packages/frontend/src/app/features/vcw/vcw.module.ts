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
import { CreateIdeasComponent } from './phases/2/create-ideas/create-ideas.component';
import { PurificationPageComponent } from './phases/2/purification-page/purification-page.component';
import { CriteriaPageComponent } from './phases/2/criteria-page/criteria-page.component';



@NgModule({
  declarations: [
    DefineDiagonosticsComponent,
    VcwPageComponent,
    VCWMethodComponent,
    VcwJourneyComponent,
    VcwSprintComponent,
    ChallengeComponent,
    CreateIdeasComponent,
    PurificationPageComponent,
    CreateIdeasComponent,
    SelectIdeasComponent,
    CriteriaPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VcwRoutingModule,
    SharedModule
  ]
})
export class VcwModule { }
