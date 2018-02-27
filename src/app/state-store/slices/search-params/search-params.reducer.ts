import { SearchParamsState } from './search-params-state.interface';
import { searchParamsInitialState } from './search-params-initial-state';
import * as SearchParamsActions from './search-params.actions';

export function searchParamsReducer(
  state: SearchParamsState = searchParamsInitialState,
  action: SearchParamsActions.All
): SearchParamsState {
  switch (action.type) {
    case SearchParamsActions.UPDATE_SEARCH_BY_KEYWORDS: {
      const searchByKeywords = action.payload.searchByKeywords;

      return {
        ...state,
        searchByKeywords,
      };
    }
    default: {
      return state;
    }
  }
}
