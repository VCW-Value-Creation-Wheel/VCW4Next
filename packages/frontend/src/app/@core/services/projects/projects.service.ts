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


  editProject(projectId: number,projectData: Project): Observable<Project>{
    const url = `${this.projectsBaseUrl}/${projectId}`;
    return this.http.put<Project>(url, projectData, this.httpOptions);

  }
  
  getUser(user:any) {
    const url = `${environment.api}/users?search=${user}`;
    return this.http.get(url, this.httpOptions);
  }

  getRoles(){
    const url = `${environment.api}/roles`;
    return this.http.get(url, this.httpOptions);
  }

  addUserRoleToProject(userId: string, roleId: string, projectId:number){
    const url =`${this.projectsBaseUrl}/${projectId}/users`;
    return this.http.post(url,{userId,roleId},this.httpOptions);
  }

}
