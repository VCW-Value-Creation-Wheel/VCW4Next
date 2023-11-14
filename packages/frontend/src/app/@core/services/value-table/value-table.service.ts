import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueTableService {

  public changeTable$: BehaviorSubject<Boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
