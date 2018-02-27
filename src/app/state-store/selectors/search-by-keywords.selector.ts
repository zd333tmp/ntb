import { createSelector } from '@ngrx/store';
import { SearchParamsState } from '../slices/search-params/search-params-state.interface';
import * as fromApp from '.';

export function getSearchByKeywords(searchParamsState: SearchParamsState): Array<string> {
  if (!searchParamsState || !searchParamsState.searchByKeywords) {
    return [];
  }
  return searchParamsState.searchByKeywords;
}

export const selectSearchByKeywords = createSelector(
  fromApp.selectSearchParamsState,
  getSearchByKeywords
);
