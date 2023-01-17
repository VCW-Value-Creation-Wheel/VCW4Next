import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectPageComponent } from './project-page/project-page.component';


const routes: Routes = [

    {
        path: '',
        component: ProjectListComponent
    },
    {
        path: 'new-project',
        component: NewProjectComponent
    },
    {
        path: 'project/:project_id',
        component: ProjectPageComponent
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
