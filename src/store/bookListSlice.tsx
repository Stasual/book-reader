import { createSlice } from '@reduxjs/toolkit';
import { getBooks } from '../api/booksThunks';
import type { BookListResponse } from '../types/card-types';

type BooksState = {
  loading: string;
  books: BookListResponse;
  page: number;
  totalCount: number;
};

const initialState: BooksState = {
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

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBooks.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      if (state.books.response.docs.length === 0) {
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

export default booksSlice.reducer;
