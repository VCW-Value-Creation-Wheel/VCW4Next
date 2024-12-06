import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

const SERVICE_URL = 'assets/mocks/projects.json';

@Injectable({
  providedIn: 'root'
})
export class MockProjectService {

  constructor(private http: HttpClient) {}

  public projects(): Observable<Project[]> {
    return this.http.get<Project[]>(SERVICE_URL);
  }

  public getById(id: number): Observable<Project> {
    return this.http.get<Project[]>(SERVICE_URL).pipe(map(projects => projects.find(project => project.id == id)));
  }

}
