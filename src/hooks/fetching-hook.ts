import { useBooksState } from './selector-hook';
import type { Book } from '../types/card-types';

export function useBooksToRender() {
  const { books, search, filtered, filter } = useBooksState();

  const hasTitle = !!filter.title;
  const hasFiltered = filtered.books.response.docs.length > 0;
  const totalFiltered = filtered.totalCount;
  const totalSearch = search.totalCount;
  const totalBooks = books.totalCount;

  let booksToRender: Book[];

  if (hasTitle) {
    booksToRender = hasFiltered
      ? filtered.books.response.docs
      : search.books.response.docs;
  } else {
    booksToRender = hasFiltered
      ? filtered.books.response.docs
      : books.books.response.docs;
  }

  const isFetchingFiltered =
    hasTitle && hasFiltered && totalFiltered > booksToRender.length;

  const isFetchingSearch =
    hasTitle && !hasFiltered && totalSearch > booksToRender.length;

  const isFetchingFilteredWithDefault =
    !hasTitle && hasFiltered && totalFiltered > booksToRender.length;

  const isFetchingDefault =
    !hasTitle && !hasFiltered && totalBooks > booksToRender.length;

  return {
    booksToRender,
    isFetchingFiltered,
    isFetchingSearch,
    isFetchingFilteredWithDefault,
    isFetchingDefault,
  };
}
