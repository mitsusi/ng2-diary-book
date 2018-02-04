import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <mat-card>
      <button mat-button (click)="goToTagsAutoComplete()">Tags auto complete</button>
    </mat-card>
  `,
})
export class ComponentsListComponent {
  goToTagsAutoComplete() {
    this.router.navigate(['tags-auto-complete'], { relativeTo: this.route });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
