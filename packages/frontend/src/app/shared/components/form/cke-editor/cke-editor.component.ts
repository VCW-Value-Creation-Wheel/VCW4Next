import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeEvent, CKEditor5 } from '@ckeditor/ckeditor5-angular';
import Editor from '@ckeditor/ckeditor5-custom/build/ckeditor';

export interface CkeditorConfig {
  language?: string;
  toolbar?: string[];
}

@Component({
  selector: 'app-cke-editor',
  templateUrl: './cke-editor.component.html',
  styleUrls: ['./cke-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkeEditorComponent),
      multi: true,
    },
  ],
})
export class CkeEditorComponent implements OnInit, ControlValueAccessor {
  public Editor = Editor;
  isFocused: boolean = false;

  @Input() config: CkeditorConfig = { language: 'pt' };

  @Input() required: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() id: string = 'ckeID';
  @Input() label?: string;
  @Input() classes?: string;
  @Input('value') _value: string = '';
  @Input() helperText?: string;
  @Input() helperSize: string = 'text-sm';
  @Input() helperColor: string = 'text-gray-400';

  onChange: (args: string) => void = () => {};
  onTouched: () => void = () => {};

  public onReady(editor: CKEditor5.Editor) {
    if (this.isDisabled) editor.enableReadOnlyMode(this.id);
  }

  public onChanges(event: ChangeEvent) {
    if (this.isDisabled) event.editor.enableReadOnlyMode(this.id);
    else event.editor.disableReadOnlyMode(this.id);
  }

  constructor() {}
  ngOnInit(): void {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: string): void {
    if (value) this._value = value;
  }

  registerOnChange(fn: CkeEditorComponent['onChange']): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: CkeEditorComponent['onTouched']): void {
    this.onTouched = fn;
  }
}