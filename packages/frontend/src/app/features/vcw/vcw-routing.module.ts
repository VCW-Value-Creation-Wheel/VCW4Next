import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewVcwComponent } from './new-vcw/new-vcw.component';
import { ChallengeComponent } from './phases/1/challenge/challenge.component';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { SelectIdeasComponent } from './phases/3/select-ideas/select-ideas.component';
import { CreateIdeasComponent } from './phases/2/create-ideas/create-ideas.component';
import { PurificationPageComponent } from './phases/2/purification-page/purification-page.component';
import { VcwPageComponent } from './vcw-page/vcw-page.component';
import { CriteriaPageComponent } from './phases/2/criteria-page/criteria-page.component';
import { SelectCriteriaComponent } from './phases/3/select-criteria/select-criteria.component';
import { ExpectedKpisComponent } from './phases/1/expected-kpis/expected-kpis.component';
import { RankWeightCriteriaComponent } from './phases/3/rank-weight-criteria/rank-weight-criteria.component';
import { PrototypeComponent } from './phases/4/prototype/prototype.component';
import { TestAndKpisEvaluationComponent } from './phases/5/test-and-kpis-evaluation/test-and-kpis-evaluation.component';

const routes: Routes = [
    {
        path: ':vcw_id',
        component: VcwPageComponent
    },
    {
        path: ':vcw_id/phases/1a',
        component: DefineDiagonosticsComponent
    },
    {
        path: ':vcw_id/phases/1b',
        component: ChallengeComponent
    },
    {
        path: ':vcw_id/phases/1c',
        component: ExpectedKpisComponent
    },
    {
        path: ':vcw_id/phases/2a',
        component: CreateIdeasComponent
    },
    {
        path: ':vcw_id/phases/2b',
        component: CriteriaPageComponent
    },
    {
        path: ':vcw_id/phases/2c',
        component: PurificationPageComponent
    },
    {
        path: ':vcw_id/phases/3a',
        component: SelectIdeasComponent
    },
    {
        path: ':vcw_id/phases/3b',
        component: SelectCriteriaComponent
    },
    {
        path: ':vcw_id/phases/3c',
        component: RankWeightCriteriaComponent
    },
    {
        path: ':vcw_id/phases/4c',
        component: PrototypeComponent
    },
    {
        path: ':vcw_id/phases/5b',
        component: TestAndKpisEvaluationComponent
    },

    
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class VcwRoutingModule {}
