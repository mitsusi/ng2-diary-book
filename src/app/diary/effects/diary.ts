import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store, State } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../reducers';
import * as routerActions from '../../core/actions/router';

import { DiaryEntryService } from '../services/diary-entry';

import * as diaryActions from '../actions/diary-entries';
import * as layoutActions from '../../core/actions/layout';

import { DiaryEntry } from '../../shared/models/diary-entry';
import { DiaryEntrySet } from '../../shared/models/diary-entry-set';

import { DialogFactoryService } from '../services/dialog-factory';

@Injectable()
export class DiaryEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(diaryActions.LOAD_LIST)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .withLatestFrom(this.store)
    .filter(([action, state]) => fromRoot.getUserIsLoggedIn(state))
    .switchMap(() => {
      return this.diaryEntryService
        .retrieveEntries()
        .map(
          (diaryEntries: DiaryEntry[]) =>
            new diaryActions.LoadListSuccessAction(diaryEntries),
        )
        .catch(() => of(new diaryActions.LoadListFailureAction([])))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(diaryActions.CREATE_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .withLatestFrom(this.store)
    .switchMap(
      ([action, state]: [diaryActions.CreateEntryAction, fromRoot.State]) => {
        const uid = fromRoot.getUserUid(state);

        return this.diaryEntryService
          .createEntry(uid, <DiaryEntrySet>action.payload)
          .map(
            (newEntryData: DiaryEntry) =>
              new diaryActions.CreateEntrySuccessAction(newEntryData),
          )
          .catch(() => of(new diaryActions.CreateEntryFailureAction([])))
          .do(({ type }) =>
            this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
          );
      },
    );

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(diaryActions.EDIT_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap((action: diaryActions.EditEntryAction) => {
      return this.diaryEntryService
        .updateEntry(action.payload)
        .map(
          (updatedEntryData: DiaryEntry) =>
            new diaryActions.EditEntrySuccessAction(updatedEntryData),
        )
        .do(() =>
          this.store.dispatch(new routerActions.Go({ path: ['../..'] })),
        )
        .catch(() => of(new diaryActions.EditEntryFailureAction(null)))
        .do(() => this.store.dispatch(new diaryActions.LoadListAction()))
        .do(() =>
          this.store.dispatch(new diaryActions.GetEditEntryClearAction()),
        )
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  @Effect()
  getEntryToEdit$: Observable<Action> = this.actions$
    .ofType(diaryActions.GET_EDIT_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap((action: diaryActions.GetEditEntryAction) => {
      return this.diaryEntryService
        .getEntry(action.payload)
        .map(
          (entryToEdit: DiaryEntry) =>
            new diaryActions.GetEditEntrySuccessAction(entryToEdit),
        )
        .catch(() => of(new diaryActions.GetEditEntryFailureAction()))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  constructor(
    private actions$: Actions,
    private diaryEntryService: DiaryEntryService,
    private dialogFactory: DialogFactoryService,
    private store: Store<fromRoot.State>,
  ) {}
}
