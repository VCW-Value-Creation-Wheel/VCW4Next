import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@core';
import { Observable } from 'rxjs';

const SERVICE_URL = 'assets/mocks/projects.json';

@Injectable({
  providedIn: 'root'
})
export class MockProjectService {

  constructor(private http: HttpClient) {}

  public projects(): Observable<Project[]> {
    return this.http.get<Project[]>(SERVICE_URL);
  }
}
