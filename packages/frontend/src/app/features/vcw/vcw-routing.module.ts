import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewVcwComponent } from './new-vcw/new-vcw.component';
import { ChallengeComponent } from './phases/1/challenge/challenge.component';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { SelectIdeasComponent } from './phases/3/select-ideas/select-ideas.component';
import { VcwPageComponent } from './vcw-page/vcw-page.component';

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
        path: ':vcw_id/phases/3a',
        component: SelectIdeasComponent
    }
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
