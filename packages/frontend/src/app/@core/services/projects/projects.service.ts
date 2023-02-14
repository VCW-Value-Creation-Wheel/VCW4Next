import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private id: number;

  private projectsBaseUrl = `${environment.api}/projects`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  public get projectId() {
    return this.id;
  }

  public set projectId(newId: number) {
    this.id = newId;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsBaseUrl, this.httpOptions);
  }

  createProject(projectData: Project): Observable<any> {
    return this.http.post(this.projectsBaseUrl, projectData, this.httpOptions);
  }

}
