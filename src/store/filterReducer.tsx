import { createReducer, createAction } from '@reduxjs/toolkit';

export const updateTitle = createAction<string>('TITLE_ADD');
export const updateTitleSearch = createAction<string>('TITLE_SEARCH_ADD');
export const updateMinYear = createAction<number>('MIN_YEAR_ADD');
export const updateMaxYear = createAction<number>('MAX_YEAR_ADD');

type TitleState = {
  title: string;
  titleSearch: string;
  minYear: number;
  maxYear: number;
};

const initialState: TitleState = {
  title: '',
  titleSearch: '',
  minYear: 0,
  maxYear: 0,
};

export default createReducer(initialState, builder => {
  builder.addCase(updateTitle, (state, action) => {
    state.title = action.payload;
  });
  builder.addCase(updateTitleSearch, (state, action) => {
    state.titleSearch = action.payload;
  });
  builder.addCase(updateMinYear, (state, action) => {
    state.minYear = action.payload;
  });
  builder.addCase(updateMaxYear, (state, action) => {
    state.maxYear = action.payload;
  });
});
