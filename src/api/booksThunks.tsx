import { booksAPI } from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { BookListResponse } from '../types/card-types';

export type SearchArgs = {
  pageSearch: number;
  title: string;
};

export type FilteredArgs = {
  pageFiltered: number;
  values: [number, number];
  request: string;
};

export const getBooks = createAsyncThunk<BookListResponse, number>(
  'api/getBooks',
  async (page, { rejectWithValue }) => {
    try {
      const data = await booksAPI.getBooks(page);
      return data;
    } catch {
      return rejectWithValue('Ошибка получения списка книг');
    }
  },
);

export const getFilteredBooks = createAsyncThunk<
  BookListResponse,
  FilteredArgs
>(
  'api/getFilteredBooks',
  async ({ pageFiltered, values, request }, { rejectWithValue }) => {
    try {
      const data = await booksAPI.getFilteredBooks(
        pageFiltered,
        values,
        request,
      );
      return data;
    } catch {
      return rejectWithValue('Ошибка получения списка книг');
    }
  },
);

export const getSearchBooks = createAsyncThunk<BookListResponse, SearchArgs>(
  'api/getSearchBooks',
  async ({ pageSearch, title }, { rejectWithValue }) => {
    try {
      const data = await booksAPI.getSearchBooks(pageSearch, title);
      return data;
    } catch {
      return rejectWithValue('Ошибка при поиске книг');
    }
  },
);

export const getMinYear = createAsyncThunk<BookListResponse, string>(
  'api/getMinYear',
  async (title, { rejectWithValue }) => {
    try {
      const data = await booksAPI.getMinYear(title);
      return data;
    } catch {
      return rejectWithValue('Ошибка получения диапазона дат');
    }
  },
);

export const getMaxYear = createAsyncThunk<BookListResponse, string>(
  'api/getMaxYear',
  async (title, { rejectWithValue }) => {
    try {
      const data = await booksAPI.getMaxYear(title);
      return data;
    } catch {
      return rejectWithValue('Ошибка получения диапазона дат');
    }
  },
);
