import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DiaryEntry } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'diary-entries-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <div class="edit-button-container" *ngIf="!isEditDisabled">
        <mat-icon class="edit-icon" title="Edit" (click)="edit.emit(entry)">mode_edit</mat-icon>
      </div>
      <div>
        <mat-card-title>{{ entry.date | date:'MMM d' }}</mat-card-title>
        <mat-card-content>
          <div [innerHTML]="entry.message | diaryMarkdown"></div>

          <tags-viewer [tags]="entry.tags" (tagClick)="tagClick.emit($event)"></tags-viewer>

          <div class="content-footer">
            Create date: {{ entry.createDate | date }}
          </div>
        </mat-card-content>
      </div>
    </mat-card>
  `,
  styles: [
    `.edit-icon {
        padding: 2px;
     }`,
    `
      .edit-icon:hover {
        background-color: #d6d6d6;
      }
    `,
    `.edit-button-container {
      position: absolute;
      top: 15px;
      right: 15px;
    }`,
    `.edit-button-container mat-icon {
      cursor: default;
      font-size:20px;
      height:20px;
      width: 20px;
    }`,
    `.content-footer {
      font-size: 80%;
      padding-top: 20px;
      color: #909090;
    }`,
  ],
})
export class EntryListItemComponent {
  @Input() entry: DiaryEntry;
  @Input() isEditDisabled = false;
  @Output() edit = new EventEmitter();
  @Output() tagClick = new EventEmitter();
}
