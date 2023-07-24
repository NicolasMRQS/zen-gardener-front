// ACTION TYPES

// Handled by middleware
export const FETCH_SHEET_BY_ID = 'FETCH_SHEET_BY_ID';
export const FETCH_SHEETS_BY_QUERY = 'FETCH_SHEET_BY_QUERY';
export const FETCH_FAVORITE_SHEETS = 'FETCH_FAVORITE_SHEETS';

// Handled by reducer
export const SAVE_SHEETS = 'SAVE_SHEETS';
export const ADD_TO_SEARCH_RESULTS = 'ADD_TO_SEARCH_RESULTS';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';
export const SHEET_RECEIVED = 'SHEET_RECEIVED';
export const SHEET_FETCH_FAILED = 'SHEET_FETCH_FAILED';
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES';
export const UNSAVE_FROM_FAVORITES = 'UNSAVE_FROM_FAVORITES';
export const CLEAR_SHEETS_STATE = 'CLEAR_SHEETS_STATE';
export const NO_MORE_RESULT = 'NO_MORE_RESULT';

// ACTION CREATORS

/** Action dispatched when fetching a sheet by ID
 * (typically when fetching sheets from task details) */
export const actionFetchSheetById = (id) => ({
  type: FETCH_SHEET_BY_ID,
  id,
});

/** Action dispatched when fetching multiple tasks
 * from sheet page and search bar
 */
export const actionFetchSheetsByQuery = (
  query,
  numberOfSheetsByQuery,
  zeroBasedPageNumber,
) => ({
  type: FETCH_SHEETS_BY_QUERY,
  query,
  numberOfSheetsByQuery,
  zeroBasedPageNumber,
});

export const actionFetchFavoriteSheets = () => ({
  type: FETCH_FAVORITE_SHEETS,
});

/** Action dispatched when multiple sheets have been received */
export const actionSaveSheets = (sheetData) => ({
  type: SAVE_SHEETS,
  sheetData,
});

/** Action dispatched when multiple sheets have been received */
export const actionAddToSearchResults = (sheetIds) => ({
  type: ADD_TO_SEARCH_RESULTS,
  sheetIds,
});

/** Action dispatched when multiple sheets have been received */
export const actionSaveFavorites = (sheetIds) => ({
  type: SAVE_FAVORITES,
  sheetIds,
});

export const actionUnsaveFromFavorites = (sheetId) => ({
  type: UNSAVE_FROM_FAVORITES,
  sheetId,
});

/** Action dispatched when multiple sheets have been received */
export const actionAddToFavorites = (sheetId) => ({
  type: ADD_TO_FAVORITES,
  sheetId,
});

export const actionDeleteFromFavorites = (sheetId) => ({
  type: DELETE_FROM_FAVORITES,
  sheetId,
});

/** Action dispatched to clear search result when user search a new query */
export const actionClearSearchResult = () => ({
  type: CLEAR_SEARCH_RESULT,
});

/** Action dispatched when one sheet has been received */
export const actionSheetReceived = (sheet) => ({
  type: SHEET_RECEIVED,
  sheet,
});

/** Action dispatched when any fetch request fails */
export const actionSheetFetchFailed = (failed = true) => ({
  type: SHEET_FETCH_FAILED,
  failed,
});

export const actionClearSheetsState = () => ({
  type: CLEAR_SHEETS_STATE,
});

export const actionNoMoreResult = () => ({
  type: NO_MORE_RESULT,
});
