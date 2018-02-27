import { createFeatureSelector } from '@ngrx/store';
import { SearchParamsState } from '../slices/search-params/search-params-state.interface';

export const selectSearchParamsState = createFeatureSelector<SearchParamsState>('searchParams');
