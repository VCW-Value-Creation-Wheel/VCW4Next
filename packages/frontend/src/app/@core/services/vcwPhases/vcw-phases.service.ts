import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criteria, ExpectedKPIs, Idea, IdeaCriteriaPair, SwotFieldRow, VCWChallenge} from '@core/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VcwPhasesService {

  baseUrl = `${environment.api}/projects`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Phase 1a
  getDiagnostics(vcwId: number, projectId: number): Observable<SwotFieldRow[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/diagnostics`;
    return this.http.get<SwotFieldRow[]>(url, this.httpOptions);
  }

  createDiagnostic(vcwId: number, projectId: number, diagnosticData: SwotFieldRow): Observable<SwotFieldRow> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/diagnostics`;
    return this.http.post<SwotFieldRow>(url, diagnosticData, this.httpOptions);
  }

  deleteDiagnostic(vcwId: number, projectId: number, diagnosticId: number): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/diagnostics/${diagnosticId}`;
    return this.http.delete(url, this.httpOptions);
  }

  editDiagnostic(vcwId: number, projectId: number, diagnosticId: number, diagnosticData: SwotFieldRow): Observable<SwotFieldRow> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/diagnostics/${diagnosticId}`;
    return this.http.put<SwotFieldRow>(url, diagnosticData, this.httpOptions);
  }

  // Phase 1b
  getChallenge(vcwId: number, projectId: number): Observable<VCWChallenge> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/challenges`;
    return this.http.get<VCWChallenge>(url, this.httpOptions);
  }

  createChallenge(vcwId: number, projectId: number, data: VCWChallenge): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/challenges`;
    return this.http.post(url, data, this.httpOptions);
  }

  editChallenge(vcwId: number, projectId: number, data: VCWChallenge): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/challenges`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  //Phase 1c
  getExpectedKPIs(vcwId: number, projectId: number): Observable<ExpectedKPIs> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/kpis`;
    return this.http.get<ExpectedKPIs>(url, this.httpOptions);
  }

  createExpectedKPIs(vcwId: number, projectId: number, data: ExpectedKPIs): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/kpis`;
    return this.http.post(url, data, this.httpOptions);
  }

  editExpectedKPIs(vcwId: number, projectId: number, data: ExpectedKPIs): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/kpis`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  // Phase 2a
  getIdeas(vcwId: number, projectId: number): Observable<Idea[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideas`;
    return this.http.get<Idea[]>(url, this.httpOptions);
  }

  createIdea(vcwId: number, projectId: number, ideaData: Idea): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideas`;
    return this.http.post(url, ideaData, this.httpOptions);
  }

  editIdea(vcwId: number, projectId: number, ideaId: number, ideaData: Idea): Observable<Idea> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideas/${ideaId}`;
    return this.http.put<Idea>(url, ideaData, this.httpOptions);
  }

  deleteIdea(vcwId: number, projectId: number, ideaId: number): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideas/${ideaId}`;
    return this.http.delete(url, this.httpOptions);
  }

  // Phase 2b
  getCriterias(vcwId: number, projectId: number): Observable<Criteria[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/criterias`;
    return this.http.get<Criteria[]>(url, this.httpOptions);
  }

  createCriteria(vcwId: number, projectId: number, CriteriaData: Criteria): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/criterias`;
    return this.http.post(url, CriteriaData, this.httpOptions);
  }

  editCriteria(vcwId: number, projectId: number, CriteriaId: number, CriteriaData: Criteria): Observable<Criteria> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/criterias/${CriteriaId}`;
    return this.http.put<Criteria>(url, CriteriaData, this.httpOptions);
  }

  deleteCriteria(vcwId: number, projectId: number, CriteriaId: number): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/criterias/${CriteriaId}`;
    return this.http.delete(url, this.httpOptions);
  }

  // Phase 2c
  getIdeaCriteriaPairs(vcwId: number, projectId: number): Observable<IdeaCriteriaPair[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideasAndCriterias`;
    return this.http.get<IdeaCriteriaPair[]>(url, this.httpOptions);
  }

  createIdeaCriteriaPair(vcwId: number, projectId: number, ideaCriteriaData: IdeaCriteriaPair): Observable<IdeaCriteriaPair> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideasAndCriterias`;
    return this.http.post<IdeaCriteriaPair>(url, ideaCriteriaData, this.httpOptions);
  }

  editIdeaCriteriaPair(vcwId: number,
                       projectId: number,
                       ideaCriteriaPairId: number,
                       ideaCriteriaData: IdeaCriteriaPair): Observable<IdeaCriteriaPair> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideasAndCriterias/${ideaCriteriaPairId}`;
    return this.http.put<IdeaCriteriaPair>(url, ideaCriteriaData, this.httpOptions);
  }

  deleteIdeaCriteriaPair(vcwId: number, projectId: number, ideaCriteriaPairId: number): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ideasAndCriterias/${ideaCriteriaPairId}`;
    return this.http.delete(url, this.httpOptions);
  }
}
