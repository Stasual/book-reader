import { createSlice } from '@reduxjs/toolkit';
import type { BookListResponse } from '../types/card-types';
import { getFilteredBooks } from '../api/booksThunks';

type BooksFilteredState = {
  loading: string;
  page: number;
  books: BookListResponse;
  totalCount: number;
};

const initialState: BooksFilteredState = {
  loading: 'idle',
  books: {
    response: {
      docs: [],
      numFound: 0,
      start: 0,
    },
  },
  page: 1,
  totalCount: 0,
};

export const booksFilteredSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearFilteredBooks: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getFilteredBooks.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(getFilteredBooks.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const { pageFiltered } = action.meta.arg;
      if (pageFiltered === 1) {
        state.books = action.payload;
        state.page = 2;
        state.totalCount = action.payload.response.numFound;
      } else {
        state.books.response.docs = [
          ...state.books.response.docs,
          ...action.payload.response.docs,
        ];
        state.page = state.page + 1;
      }
    });
  },
});

export const { clearFilteredBooks } = booksFilteredSlice.actions;
export default booksFilteredSlice.reducer;
