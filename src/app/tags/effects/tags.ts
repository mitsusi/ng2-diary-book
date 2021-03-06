import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../reducers';

import * as tagsActions from '../actions/tags';
import * as layoutActions from '../../core/actions/layout';
import { TagsService } from '../../core/services/tags';

@Injectable()
export class TagsEffects {
  @Effect()
  getTagsList$: Observable<Action> = this.actions$
    .ofType(tagsActions.GET_TAGS_LIST)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap(() => {
      return this.tagsService
        .getTagsList()
        .map((data: any) => new tagsActions.GetTagsListSuccessAction(data))
        .catch(() => of(new tagsActions.GetTagsListFailureAction()))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(tagsActions.CREATE_TAG)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap(action => {
      return this.tagsService
        .addTag(action.payload)
        .map(() => new tagsActions.CreateTagSuccess())
        .catch(() => of(new tagsActions.CreateTagFailure()))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  constructor(
    private actions$: Actions,
    private tagsService: TagsService,
    private store: Store<fromRoot.State>,
  ) {}
}
