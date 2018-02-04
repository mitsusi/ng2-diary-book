import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BreadcrumbsService {
  getBreadcrumbs(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    accumulatedBreadcrumbs: string[] = [],
  ) {
    const { children, data: { breadcrumb, isRoot } } = activatedRouteSnapshot;
    let currentBreadcrumb;
    if (children.length === 0) {
      // TODO должно быть заменено на что-то более логичное
      currentBreadcrumb = breadcrumb || '';
      return [...accumulatedBreadcrumbs, currentBreadcrumb];
    }

    currentBreadcrumb = !isRoot ? breadcrumb || '' : '';

    return this.getBreadcrumbs(children[0], [
      ...accumulatedBreadcrumbs,
      ...(!!currentBreadcrumb ? [currentBreadcrumb] : []),
    ]).filter(br => br !== '');
  }
}
