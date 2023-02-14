import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idea, SwotFieldRow } from '@core/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VcwPhasesService {

  vcwBaseUrl = `${environment.api}/vcws`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // Phase 1a
  getDiagnostics(vcwId: number): Observable<SwotFieldRow[]> {
    const url = `${this.vcwBaseUrl}/${vcwId}/diagnostics`;
    return this.http.get<SwotFieldRow[]>(url, this.httpOptions);
  }

  createDiagnostic(vcwId: number, diagnosticData: SwotFieldRow): Observable<any> {
    const url = `${this.vcwBaseUrl}/${vcwId}/diagnostics`;
    return this.http.post(url, diagnosticData, this.httpOptions);
  }

  deleteDiagnostic(vcwId: number, diagnosticId: number): Observable<any> {
    const url = `${this.vcwBaseUrl}/${vcwId}/diagnostics/${diagnosticId}`;
    return this.http.delete(url, this.httpOptions);
  }

  editDiagnostic(vcwId: number, diagnosticId: number, diagnosticData: SwotFieldRow): Observable<SwotFieldRow> {
    const url = `${this.vcwBaseUrl}/${vcwId}/diagnostics/${diagnosticId}`;
    return this.http.put<SwotFieldRow>(url, diagnosticData, this.httpOptions);
  }

  // Phase 1b
  getChallenge(vcwId: number): Observable<string> {
    const url = `${this.vcwBaseUrl}/${vcwId}/challenges`;
    return this.http.get<string>(url, this.httpOptions);
  }

  createChallenge(vcwId: number, data: string): Observable<any> {
    const url = `${this.vcwBaseUrl}/${vcwId}/challenges`;
    return this.http.post(url, data, this.httpOptions);
  }

  editChallenge(vcwId: number, data: string): Observable<string> {
    const url = `${this.vcwBaseUrl}/${vcwId}/challenges`;
    return this.http.put<string>(url, data, this.httpOptions);
  }

  // Phase 2a
  getIdeas(vcwId: number): Observable<Idea[]> {
    const url = `${this.vcwBaseUrl}/${vcwId}/ideas`;
    return this.http.get<Idea[]>(url, this.httpOptions);
  }

  createIdea(vcwId: number, ideaData: Idea): Observable<any> {
    const url = `${this.vcwBaseUrl}/${vcwId}/ideas`;
    return this.http.post(url, ideaData, this.httpOptions);
  }

  editIdea(vcwId: number, ideaId: number, ideaData: Idea): Observable<Idea> {
    const url = `${this.vcwBaseUrl}/${vcwId}/ideas/${ideaId}`;
    return this.http.put<Idea>(url, ideaData, this.httpOptions);
  }

  deleteIdea(vcwId: number, ideaId: number): Observable<any> {
    const url = `${this.vcwBaseUrl}/${vcwId}/ideas/${ideaId}`;
    return this.http.delete(url, this.httpOptions);
  }
}
