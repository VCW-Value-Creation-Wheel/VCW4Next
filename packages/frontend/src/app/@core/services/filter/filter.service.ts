import { Injectable } from '@angular/core';
import { EventOption, GeneralFilter } from '@core';
import { BehaviorSubject } from 'rxjs';
import { isEmpty, serializeParams } from 'shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filters: GeneralFilter = {};
  public categories: string[] = [];
  public subject$ = new BehaviorSubject('');
  constructor(
  ) {}

  public isEmpty = () => isEmpty(this.filters);

  public onCategoryChange(checked: boolean, value: string) {
    if (!checked) { this.categories.splice(this.categories.indexOf(value), 1); }
    else { this.categories.push(value); }

    const categories = this.categories.join(',');

    this.onFilterChange({ id: 'categories', value: categories });

    return this.filters;
  }

  public onSearch( type: string, value?: string) {
    // console.log(value)
    if (value){
      this.filters = {...this.filters, [type]: value};
      this.onFilterChange({id: type, value: this.filters[type]});
    }else if (!value || value.length === 0){
      this.filters[type] = null;
      this.onFilterChange({id: type, value: null});
    }
    return this.filters;
  }

  public onFilterChange(target: EventOption, objectIndex?: string) {
    this.filters[target.id] = target.value;
    if (!this.filters[target.id]) { delete this.filters[target.id]; }
    this.handleFilterChange();
  }

  private handleFilterChange() {
    const queryParam = serializeParams(this.filters);
    this.subject$.next(queryParam);
  }

  onFilterClear() {
    this.filters = {};
    this.handleFilterChange();
  }
}
