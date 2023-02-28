import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsBaseUrl = `${environment.api}/projects`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsBaseUrl, this.httpOptions);
  }

  createProject(projectData: Project): Observable<any> {
    return this.http.post(this.projectsBaseUrl, projectData, this.httpOptions);
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.projectsBaseUrl}/${projectId}`;
    return this.http.get<Project>(url, this.httpOptions);
  }

}
