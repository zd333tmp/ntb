import { Action } from '@ngrx/store';

export const UPDATE_SEARCH_BY_KEYWORDS = '[Search params] Update search by keywords';

export class UpdateSearchByKeywords implements Action {
  readonly type = UPDATE_SEARCH_BY_KEYWORDS;
  constructor(public payload: { searchByKeywords: Array<string> }) { }
}

export type All =
  | UpdateSearchByKeywords
  ;
