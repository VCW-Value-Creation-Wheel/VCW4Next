import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewVcwComponent } from 'features/vcw/new-vcw/new-vcw.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { EditProjectComponent } from './edit-project/edit-project.component';


const routes: Routes = [

    {
        path: ':project_id/vcw',
        loadChildren: () => import('./../vcw/vcw.module').then(m => m.VcwModule)
    },
    {
        path: ':project_id/new-vcw',
        component: NewVcwComponent
    },
    {
        path: ':project_id',
        component: ProjectPageComponent
    },
    {
        path: ':project_id/edit-project',
        component: EditProjectComponent
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
export class ProjectRoutingModule {}
