import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, Thumbnail } from '@core';
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

  createProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsBaseUrl, projectData, this.httpOptions);
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.projectsBaseUrl}/${projectId}`;
    return this.http.get<Project>(url, this.httpOptions);
  }

  getProjectThumbnail(projectId: number): Observable<Thumbnail> {
    const url = `${this.projectsBaseUrl}/${projectId}/thumbnails`;
    return this.http.get<Thumbnail>(url);
  }

  createProjectThumbnail(projectId: number, thumbnail: any): Observable<Thumbnail>{
    const url = `${this.projectsBaseUrl}/${projectId}/thumbnails`;
    return this.http.post<Thumbnail>(url, thumbnail);
  }

}
