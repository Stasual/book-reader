import { createSlice } from '@reduxjs/toolkit';
import { getSearchBooks } from '../api/booksThunks';
import type { BookListResponse } from '../types/card-types';

type BooksSearchState = {
  loadingSearch: string;
  books: BookListResponse;
  pageSearch: number;
  checkTitle: string;
  totalCount: number;
};

const initialState: BooksSearchState = {
  loadingSearch: 'idle',
  books: {
    response: {
      docs: [],
      numFound: 0,
      start: 0,
    },
  },
  pageSearch: 1,
  checkTitle: '',
  totalCount: 0,
};

export const booksSearchSlice = createSlice({
  name: 'books',
  initialState,
  reducers: { clearSearchBooks: () => initialState },
  extraReducers: builder => {
    builder.addCase(getSearchBooks.pending, state => {
      state.loadingSearch = 'loading';
    });
    builder.addCase(getSearchBooks.fulfilled, (state, action) => {
      state.loadingSearch = 'succeeded';
      const { title } = action.meta.arg;
      if (state.checkTitle !== title) {
        state.books = action.payload;
        state.pageSearch = 2;
        state.checkTitle = title;
        state.totalCount = action.payload.response.numFound;
      } else {
        state.books.response.docs = [
          ...state.books.response.docs,
          ...action.payload.response.docs,
        ];
        state.pageSearch = state.pageSearch + 1;
      }
    });
  },
});

export const { clearSearchBooks } = booksSearchSlice.actions;
export default booksSearchSlice.reducer;
