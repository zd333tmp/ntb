/**
 * Search/filter data.
 * Could be part of notes list due to contains single property :).
 * But was moved to dedicated state slice to show how state should be composed
 * from multiple parts.
 */
export interface SearchParamsState {
  readonly searchByKeywords: Array<string>;
}
