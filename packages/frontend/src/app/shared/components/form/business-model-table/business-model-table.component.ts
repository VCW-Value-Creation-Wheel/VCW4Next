import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-business-model-table',
  templateUrl: './business-model-table.component.html',
  styleUrls: ['./business-model-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessModelTableComponent),
      multi: true,
    },
  ],
})
export class BusinessModelTableComponent {

  @Input() icon;
  @Input() label;
  @Input() rows = 5;

  faLink = faLink;


}
