import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCommonModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DiaryComponent } from './diary';
import { EntryDetailComponent } from './diary-entry-form';
import { CommonDatePickerComponent } from './common-date-picker';
import { EntryListComponent } from './diary-entries-list';
import { EntryListItemComponent } from './diary-entries-list-item';

import { PipesModule } from '../../shared/pipes';
import { CoreModule } from '../../core/core.module';

export const COMPONENTS = [
  DiaryComponent,
  EntryDetailComponent,
  CommonDatePickerComponent,
  EntryListComponent,
  EntryListItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDatepickerModule,
    CoreModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
