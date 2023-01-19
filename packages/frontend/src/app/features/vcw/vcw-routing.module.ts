import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewVcwComponent } from './new-vcw/new-vcw.component';
import { DefineDiagonosticsComponent } from './phases/1/define-diagonostics/define-diagonostics.component';

const routes: Routes = [

    {
        path: 'new-vcw',
        component: NewVcwComponent
    },
    {
        path: ':vcw_id/phases/1a',
        component: DefineDiagonosticsComponent
    }
]

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class VcwRoutingModule {}
