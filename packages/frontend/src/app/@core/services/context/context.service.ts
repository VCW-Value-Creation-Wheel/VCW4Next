import { Injectable } from '@angular/core';
import { Project, VCW } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  private selectedProject: Project;
  private selectedVCW: VCW;

  setProjectContext(project: Project) {
    this.selectedProject = project;
  }

  setVCWContext(vcw: VCW) {
    this.selectedVCW = vcw;
  }

  getProjectContext() {
    return this.selectedProject;
  }

  getVCWContext() {
    return this.selectedVCW;
  }
}
