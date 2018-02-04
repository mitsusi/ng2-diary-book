import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './modules/http-interceptors/auth-append-token';

import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { NotLoggedInComponent } from './components/not-logged-in';
import { CommonShowIfLoggedInComponent } from './containers/common-show-if-logged-in';
import { LoaderComponent } from './containers/loader';
import { BreadcrumbsComponent } from './components/breadcrumbs';
import { BreadcrumbsContainer } from './containers/breadcrumbs';
import { UserInfoContainer } from './containers/user-info';

import { BreadcrumbsService } from './services/breadcrumbs';

import { PipesModule } from '../shared/pipes';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects/router';
import { FormsModule } from '@angular/forms';
import { TagsAutoCompleteModule } from './features/components/tags-autocomplete/tags-autocomplete.module';
import { TagsViewerModule } from './features/components/tags-viewer/tags-viewer.module';
import { RouterHelperService } from './services/router';
import { UserInfoComponent } from './components/user-info';
import { AuthService } from './services/auth.service';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  NotLoggedInComponent,
  CommonShowIfLoggedInComponent,
  LoaderComponent,
  BreadcrumbsComponent,
  BreadcrumbsContainer,
  UserInfoContainer,
  UserInfoComponent,
];

const MAT_COMPONENTS = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PipesModule,
    HttpClientModule,
    EffectsModule.forRoot([RouterEffects]),
    TagsAutoCompleteModule,
    TagsViewerModule,
    [...MAT_COMPONENTS],
  ],
  declarations: COMPONENTS,
  exports: [
    ...COMPONENTS,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TagsAutoCompleteModule,
    TagsViewerModule,
    [...MAT_COMPONENTS],
  ],
  providers: [
    RouterHelperService,
    BreadcrumbsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
  ],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
