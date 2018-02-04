import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-examples-container',
  template: `
    <mat-card>
      <button mat-button (click)="goBack();">Назад</button>
      <hr>
      <ng-content></ng-content>
    </mat-card>
  `,
})
export class ExampleComponentsContainer {
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
