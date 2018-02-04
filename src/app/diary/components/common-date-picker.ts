import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'common-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-input-container>
      <input disabled matInput [value]="dateValue" [matDatepicker]="picker" placeholder="Choose a date">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker (selectedChanged)="onSelectedChanged($event)" #picker></mat-datepicker>
    </mat-input-container>
  `,
})
export class CommonDatePickerComponent {
  dateValue: any;
  @Output() dateChange = new EventEmitter();

  @Input()
  get date() {
    return this.dateValue;
  }

  set date(val) {
    this.dateValue = val;
    this.dateChange.emit(this.dateValue);
  }

  onSelectedChanged(newDate: object) {
    this.date = newDate;
  }
}
