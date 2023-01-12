import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VCW } from '@core/models/vcw';
import { Observable, of} from 'rxjs';

const ServiceUrl = 'assets/mocks/vcws.json'

@Injectable({
  providedIn: 'root'
})
export class VcwMockService {


  constructor(private http: HttpClient ) { }

  public getVcws(projectId): Observable<VCW[]>{
    let vcwList:VCW[] = [];
    this.http.get<VCW[]>(ServiceUrl).subscribe(data => {
      data.forEach(vcw =>{
        if (vcw.projectId==projectId){
          vcwList.push(vcw)
        }
        return vcwList;
      })
      return vcwList;
    })
    return of(vcwList)
  }
}
