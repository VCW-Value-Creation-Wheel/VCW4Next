import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criteria, Idea, SwotFieldRow, VCW } from '@core/models/vcw';
import { Observable, of} from 'rxjs';
import { filter, map } from 'rxjs/operators';

const ServiceUrl = 'assets/mocks/vcws.json';

const ideasUrl = 'assets/mocks/ideas.json';
const criteriasUrl = 'assets/mocks/criterias.json';
const swotUrl = 'assets/mocks/swot.json';

@Injectable({
  providedIn: 'root'
})
export class VcwMockService {


  constructor(private http: HttpClient ) { }

  public getVcws(projectId): Observable<VCW[]>{
    let vcwList:VCW[] = [];
    this.http.get<VCW[]>(ServiceUrl).subscribe(data => {
      data.forEach(vcw =>{
        if (vcw.projectId === projectId){
          vcwList.push(vcw)
        }
        return vcwList;
      })
      return vcwList;
    })
    return of(vcwList)
  }

  getVcwById(vcwId: number): Observable<VCW> {
    return this.http.get<VCW[]>(ServiceUrl).pipe(
      map(vcw => vcw.find(v => v.id === vcwId))
    );
  }


  public getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(ideasUrl);
  }

  public getCriterias(): Observable<Criteria[]> {
    return this.http.get<Criteria[]>(criteriasUrl);
  }

  getSwotFieldRows(): Observable<SwotFieldRow[]> {
    return this.http.get<SwotFieldRow[]>(swotUrl);
  }
}
