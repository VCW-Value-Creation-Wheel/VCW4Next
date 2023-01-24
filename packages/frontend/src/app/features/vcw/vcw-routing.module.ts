import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';
import { VcwPageComponent } from './vcw-page/vcw-page.component';

const routes: Routes = [
    {
        path: ':vcw_id',
        component: VcwPageComponent
    },
    {
        path: ':vcw_id/phases/1a',
        component: DefineDiagonosticsComponent
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
