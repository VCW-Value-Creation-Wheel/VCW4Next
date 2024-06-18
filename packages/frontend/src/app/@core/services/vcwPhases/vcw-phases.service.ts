import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criteria, CriteriaRanking, ExpectedKPIs, Idea, IdeaCriteriaPair, SwotFieldRow, Thumbnail, VCWBusinessModel, VCWChallenge, VCWConcept, VCWHasCriteria, VCWHasIdea, VCWPrototype, VCWTestAndKpisEvaluation, VCWThreeMs, VCWValueProposition, VCWImplementationAndControl, VcfIdeas} from '@core/models';
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

  //Phase 3a
  getSelectedIdeas(vcwId: number, projectId: number): Observable<VCWHasIdea[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/selectedIdeas`;
    return this.http.get<VCWHasIdea[]>(url, this.httpOptions);
  }

  selectIdea(vcwId: number, projectId: number, ideaId: number, ideaSelectedData: VCWHasIdea): Observable<VCWHasIdea> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/selectedIdeas/${ideaId}`;
    return this.http.put<VCWHasIdea>(url, ideaSelectedData, this.httpOptions);
  }

  //Phase 3b
  getSelectedCriterias(vcwId: number, projectId: number): Observable<VCWHasCriteria[]> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/selectedCriterias`;
    return this.http.get<VCWHasCriteria[]>(url, this.httpOptions);
  }

  selectCriteria(vcwId: number, projectId: number, criteriaId: number, criteriaSelectedData: VCWHasCriteria): Observable<VCWHasCriteria> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/selectedCriterias/${criteriaId}`;
    return this.http.put<VCWHasCriteria>(url, criteriaSelectedData, this.httpOptions);
  }

  //Phase 3c
  updateCriteriaRanking(vcwId: number, projectId: number, criteriaId: number, rankingData: CriteriaRanking): Observable<CriteriaRanking> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/selectedCriterias/rank/${criteriaId}`;
    return this.http.put<CriteriaRanking>(url, rankingData, this.httpOptions);
  }

  //Phase 4a
  getValueCreationFunnel(vcwId: number, projectId: number): Observable<VcfIdeas>{
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/ValueCreationFunnel`;
    return this.http.get<VcfIdeas>(url, this.httpOptions);
  }

  // Phase 4b
   getConcept(vcwId: number, projectId: number): Observable<VCWConcept> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/concepts`;
    return this.http.get<VCWConcept>(url, this.httpOptions);
  }

  createConcept(vcwId: number, projectId: number, data: VCWConcept): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/concepts`;
    return this.http.post(url, data, this.httpOptions);
  }

  editConcept(vcwId: number, projectId: number, data: VCWConcept): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/concepts`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  getValueProposition(vcwId: number, projectId: number): Observable<VCWValueProposition> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/valueProposition`;
    return this.http.get<VCWValueProposition>(url, this.httpOptions);
  }

  createValueProposition(vcwId: number, projectId: number, data: VCWValueProposition): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/valueProposition`;
    return this.http.post(url, data, this.httpOptions);
  }

  editValueProposition(vcwId: number, projectId: number, data: VCWValueProposition): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/valueProposition`;
    return this.http.put<any>(url, data, this.httpOptions);
  }



   // Phase 4c
  getPrototype(vcwId: number, projectId: number): Observable<VCWPrototype> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/prototypes`;
    return this.http.get<VCWPrototype>(url, this.httpOptions);
  }

  createPrototype(vcwId: number, projectId: number, data: VCWPrototype): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/prototypes`;
    return this.http.post(url, data, this.httpOptions);
  }

  editPrototype(vcwId: number, projectId: number, data: VCWPrototype): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/prototypes`;
    return this.http.put<any>(url, data, this.httpOptions);
  }


  // Phase 5a
  getThreeMs(vcwId: number, projectId: number): Observable<VCWThreeMs> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/threeMs`;
    return this.http.get<VCWThreeMs>(url, this.httpOptions);
  }

  createThreeMs(vcwId: number, projectId: number, data: VCWThreeMs): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/threeMs`;
    return this.http.post<VCWPrototype>(url, data, this.httpOptions);
  }

  editThreeMs(vcwId: number, projectId: number, data: VCWThreeMs): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/threeMs`;
    return this.http.put<VCWThreeMs>(url, data, this.httpOptions);
  }

  getBusinessModel(vcwId: number, projectId:number): Observable<VCWBusinessModel>{
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/businessModel`;
    return this.http.get<VCWBusinessModel>(url, this.httpOptions);
  }

  editBusinessModel(vcwId: number, projectId: number, data: VCWBusinessModel): Observable<VCWBusinessModel>{ 
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/businessModel`;
    return this.http.put<VCWBusinessModel>(url, data, this.httpOptions);
  }

  // Phase 5b
  getTestAndKpisEvaluation(vcwId: number, projectId: number): Observable<VCWTestAndKpisEvaluation>{
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/testAndKpisEvaluation`;
    return this.http.get<VCWTestAndKpisEvaluation>(url, this.httpOptions);
  }

  createTestAndKpisEvaluation(vcwId: number, projectId: number, data: VCWTestAndKpisEvaluation): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/testAndKpisEvaluation`;
    return this.http.post(url, data, this.httpOptions);
  }

  editTestAndKpisEvaluation(vcwId: number, projectId: number, data: VCWTestAndKpisEvaluation): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/testAndKpisEvaluation`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

  // Phase 5c
  getImplementationAndControl(vcwId: number, projectId: number): Observable<VCWImplementationAndControl>{
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/implementationAndControl`;
    return this.http.get<VCWImplementationAndControl>(url, this.httpOptions);
  }

  createImplementationAndControl(vcwId: number, projectId: number, data: VCWImplementationAndControl): Observable<any>{
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/implementationAndControl`;
    return this.http.post(url, data, this.httpOptions);
  }

  editImplementationAndControl(vcwId: number, projectId: number, data: VCWImplementationAndControl): Observable<any> {
    const url = `${this.baseUrl}/${projectId}/vcws/${vcwId}/implementationAndControl`;
    return this.http.put<any>(url, data, this.httpOptions);
  }

   getAttachment(vcwId: number, projectId: number): Observable<Thumbnail>{
    const url = `${this.baseUrl}/${projectId}/attachments/${vcwId}`;
    return this.http.get<Thumbnail>(url);
  }

  editAttachment(vcwId: number, projectId: number, data: File, attachmentId: number): Observable<Thumbnail>{
    const url = `${this.baseUrl}/${projectId}/attachments/${vcwId}/${attachmentId}`;
    return this.http.put<Thumbnail>(url, data);
  }

  createAttachment( vcwId: number, projectId: number, data: any): Observable<Thumbnail>{
    const url = `${this.baseUrl}/${projectId}/attachments/${vcwId}`;
    return this.http.post< Thumbnail>(url, data);
  }

  deleteAttachment( vcwId: number, projectId: number, attachmentId: Thumbnail){
    const url = `${this.baseUrl}/${projectId}/attachments/${vcwId}/${attachmentId}`;
    return this.http.delete<Thumbnail>(url);
  }
}
