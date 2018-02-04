import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DiaryEntry } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'diary-entry-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-form">
      <p>
        <mat-input-container class="example-full-width">
          <textarea matInput [(ngModel)]="_entry.message" placeholder="Введите запись">1600 Amphitheatre Pkwy</textarea>
        </mat-input-container>
      </p>
      <p>
        <common-date-picker [(date)]="_entry.date"></common-date-picker>
      </p>
      <tags-auto-complete [(selectedTags)]="_entry.tags"></tags-auto-complete>
      <button mat-raised-button (click)="submit.emit(_entry)">{{options.buttonLabel}}</button>
    </div>
  `,
  styles: [
    `
      textarea {
        min-height: 70px;
        min-width: 500px;
      }
    `,
    `.example-form {
      width: 500px;
    }`,
    `.example-full-width {
      width: 100%;
    }`,
  ],
})
export class EntryDetailComponent {
  @Input() options: any;
  @Output() submit = new EventEmitter<DiaryEntry>();

  _entry: DiaryEntry;
  @Input()
  get entry(): DiaryEntry {
    return this._entry;
  }
  set entry(value: DiaryEntry) {
    this._entry = {
      ...value,
    };
  }
}
