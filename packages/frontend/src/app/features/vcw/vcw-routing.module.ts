import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewVcwComponent } from './new-vcw/new-vcw.component';
import { ChallengeComponent } from './phases/1/challenge/challenge.component';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { CreateIdeasComponent } from './phases/2/create-ideas/create-ideas.component';
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
        path: ':vcw_id/phases/2a',
        component: CreateIdeasComponent
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
