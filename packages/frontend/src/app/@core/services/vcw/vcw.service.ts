import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VCW } from '@core/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VcwService {

  private baseUrl = `${environment.api}/projects`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getProjectVcws(projectId: number): Observable<VCW[]> {
    const url = `${this.baseUrl}/${projectId}/vcws`;
    return this.http.get<VCW[]>(url, this.httpOptions);
  }

  createVcw(projectId: number, VcwData: VCW): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws`;
    return this.http.post(url, VcwData, this.httpOptions);
  }

  getVcw(projectId: number, vcwId: number): Observable<VCW> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}`;
    return this.http.get<VCW>(url, this.httpOptions);
  }
}
