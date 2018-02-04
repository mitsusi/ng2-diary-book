import { Component } from '@angular/core';

@Component({
  template: `
    <mat-card>
      <h1>Add tag</h1>
      <app-tags-editor></app-tags-editor>
    </mat-card>
  `,
})
export class TagsAddContainer {}
