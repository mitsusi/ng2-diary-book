import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <mat-card>
      <mat-card-header>
        <h4>Добавление записи</h4><span (click)="goBack();">Назад <mat-icon><i class="material-icons">arrow_back</i></mat-icon></span>
      </mat-card-header>
      <diary-entry-create></diary-entry-create>
    </mat-card>
  `,
})
export class EntryCreateContainer {
  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
}
