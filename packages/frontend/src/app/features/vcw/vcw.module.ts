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
import { SelectCriteriaComponent } from './phases/3/select-criteria/select-criteria.component';
import { ExpectedKpisComponent } from './phases/1/expected-kpis/expected-kpis.component';
import { RankWeightCriteriaComponent } from './phases/3/rank-weight-criteria/rank-weight-criteria.component';
import { PrototypeComponent } from './phases/4/prototype/prototype.component';
import { TestAndKpisEvaluationComponent } from './phases/5/test-and-kpis-evaluation/test-and-kpis-evaluation.component';
import { ValueCreationFunnelComponent } from './phases/4/value-creation-funnel/value-creation-funnel.component';
import { ConceptAndValuePropositionComponent } from './phases/4/concept-and-value-proposition/concept-and-value-proposition.component';
import { MsAndBusinessModelComponent } from './phases/5/ms-and-business-model/ms-and-business-model.component';
import { ImplementationControlComponent } from './phases/5/implementation-control/implementation-control.component';



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
    CriteriaPageComponent,
    ExpectedKpisComponent,
    SelectCriteriaComponent,
    RankWeightCriteriaComponent,
    PrototypeComponent,
    TestAndKpisEvaluationComponent,
    ValueCreationFunnelComponent,
    ConceptAndValuePropositionComponent,
    MsAndBusinessModelComponent,
    ImplementationControlComponent
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
