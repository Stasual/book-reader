import axios from 'axios';
import type { BookListResponse } from '../types/card-types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const paramsForFilteredAndSearchBook = {
  output: 'json',
  rows: 15,
  page: 1,
  sort: ['downloads desc', 'identifier asc'],
};

const paramsForBook = {
  q: 'mediatype:texts AND collection:internetarchivebooks AND language:rus NOT collection:(inlibrary OR lendinglibrary OR printdisabled)',
  'fl[]': ['creator', 'identifier', 'title', 'year'],
  sort: ['downloads desc', 'identifier asc'],
  rows: 15,
  page: 1,
  output: 'json',
};

const paramsForYears = {
  output: 'json',
  'fl[]': ['year'],
  rows: 1,
  page: 1,
};

export const booksAPI = {
  getBooks(page: number): Promise<BookListResponse> {
    return instance
      .get('', {
        params: {
          ...paramsForBook,
          page: page,
        },
      })
      .then(response => response.data);
  },
  getMinYear(value: string): Promise<BookListResponse> {
    const query = value
      ? `mediatype:texts AND title:${value} NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`
      : 'mediatype:texts AND collection:internetarchivebooks AND language:rus NOT collection:(inlibrary OR lendinglibrary OR printdisabled)';

    return instance
      .get('', {
        params: {
          ...paramsForYears,
          q: query,
          sort: 'year asc',
        },
      })
      .then(response => response.data);
  },
  getMaxYear(value: string): Promise<BookListResponse> {
    const query = value
      ? `mediatype:texts AND title:${value} NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`
      : 'mediatype:texts AND collection:internetarchivebooks AND language:rus NOT collection:(inlibrary OR lendinglibrary OR printdisabled)';

    return instance
      .get('', {
        params: {
          ...paramsForYears,
          q: query,
          sort: 'year desc',
        },
      })
      .then(response => response.data);
  },
  getFilteredBooks(
    pageFiltered: number,
    values: [number, number],
    request: string,
  ): Promise<BookListResponse> {
    const [startYear, endYear] = values;
    const query = request
      ? `mediatype:texts AND title:${request} AND year:[${startYear} TO ${endYear}] NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`
      : `mediatype:texts AND collection:internetarchivebooks AND language:rus AND year:[${startYear} TO ${endYear}] NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`;
    return instance
      .get('', {
        params: {
          ...paramsForFilteredAndSearchBook,
          q: query,
          page: pageFiltered,
        },
      })
      .then(response => response.data);
  },
  getSearchBooks(pageSearch: number, value: string): Promise<BookListResponse> {
    const query = value
      ? `mediatype:texts AND title:${value} NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`
      : `mediatype:texts AND collection:internetarchivebooks AND language:rus NOT collection:(inlibrary OR lendinglibrary OR printdisabled)`;
    return instance
      .get('', {
        params: {
          ...paramsForFilteredAndSearchBook,
          q: query,
          page: pageSearch,
        },
      })
      .then(response => response.data);
  },
};
