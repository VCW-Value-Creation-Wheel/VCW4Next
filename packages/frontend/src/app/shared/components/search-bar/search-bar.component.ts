import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { advancedSearchForm, EventOption, FilterService, searchForm } from '@core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGlobeEurope, faSearch, faICursor, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Output() searchEvent = new EventEmitter<string>();
  @Output() loadingEvent = new EventEmitter<boolean>();

  faSearch: IconDefinition = faSearch;
  faGlobeEurope: IconDefinition = faGlobeEurope;
  faICursor: IconDefinition = faICursor;


  isAdvancedSearch = false;

  form!: UntypedFormGroup;
  freeTextForm!: UntypedFormGroup;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private filterService: FilterService
  ) {
    this.form = formBuilder.group(advancedSearchForm);
    this.freeTextForm = formBuilder.group(searchForm);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  onInputChange(event: EventOption) {
    setTimeout(() => {
      if (typeof event.value == 'string') {
        if (event.value.length >= 3 || event.value.length === 0) {
          this.filterService.onSearch('search', event.value);
          this.searchEvent.emit('');
        }
      }
    }, 2000);
  }

  onSubmit() {
    const values: {[key: string]: string} = this.form.value;
    for (const key in values){
      if (values[key]){
        this.filterService.onSearch(key, values[key]);
      }else{
        this.filterService.onSearch(key, undefined);
      }
    }
    this.searchEvent.emit('');
  }

  handleSearchType() {
    this.clearFilter();
    this.isAdvancedSearch = !this.isAdvancedSearch;
  }

  clearFilter(){
    this.form.reset();
    this.freeTextForm.reset();
    this.filterService.onFilterClear();
    this.searchEvent.emit('');
  }
}
