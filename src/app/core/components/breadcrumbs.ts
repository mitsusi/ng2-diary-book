import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-component',
  template: `
    <div>
      <mat-card>
      <span>{{ getBreadcrumbsAsString() }}</span>
      </mat-card>
    </div>
  `,
  styles: [
    `mat-card {
      padding: 10px;
    }`,
  ],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: [{ path: string }];

  getBreadcrumbsAsString(): string {
    return this.breadcrumbs.reduce(
      (acc, { path }) => (acc ? `${acc} > ${path}` : path),
      '',
    );
  }
}
