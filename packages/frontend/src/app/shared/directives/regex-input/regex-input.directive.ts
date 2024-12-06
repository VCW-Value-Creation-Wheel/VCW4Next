import {
  Directive,
  HostListener,
  Input,
  OnChanges,
  Optional
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { InputEvent } from '@core';

@Directive({
  selector: '[regex-pattern]',
})
export class RegexInputDirective implements OnChanges {
  private pattern: RegExp | null = null;
  @Input('regex-pattern') regexPattern?: string;
  constructor(@Optional() public model: NgModel) {
    if (!model) {
      throw new Error('myCustomDirective requires ngModel.');
    }
  }

  ngOnChanges() {
    if (this.regexPattern) {
      const regParts = this.regexPattern.match(/^\/(.*?)\/([gim]*)$/);

      if (regParts) { this.pattern = new RegExp(regParts[1], regParts[2]); }
      else { this.pattern = new RegExp(this.regexPattern); }
    }
  }

  @HostListener('input', ['$event']) onUserInput(event: InputEvent) {
    if (this.pattern) {
      event.target.value = event.target.value.replace(this.pattern, '');
    }

    if (this.model) { this.model.update.emit(event.target.value); }
  }
}
