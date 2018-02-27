import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { NotesListState } from './slices/notes-list/notes-list-state.interface';
import { SearchParamsState } from './slices/search-params/search-params-state.interface';
import { notesListReducer } from './slices/notes-list/notes-list.reducer';
import { searchParamsReducer } from './slices/search-params/search-params.reducer';
import { NotesListEffects } from './slices/notes-list/notes-list.effetcs';

/**
 * Global App state
 */
export interface AppState {
  notesList: NotesListState;
  searchParams: SearchParamsState;
}

const reducers: ActionReducerMap<AppState> = {
  notesList: notesListReducer,
  searchParams: searchParamsReducer,
};

const effects = [ NotesListEffects ];

// Use strict equality in ternary statements below because otherwise Webpack uses incorrect value when assembles bundle
@NgModule({
  imports: [
    StoreModule.forRoot(
      reducers,
      // Freeze state in dev mode to avoid unintentional mutations
      { metaReducers: environment.production === false ? [ storeFreeze ] : [] }
    ),
    environment.production === false ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
  ],
})
export class AppStateModule { }
