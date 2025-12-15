import { useAppSelector } from './store-hooks';

export function useBooksState() {
  const books = useAppSelector(s => s.books);
  const search = useAppSelector(s => s.booksSearch);
  const filtered = useAppSelector(s => s.booksFiltered);
  const filter = useAppSelector(s => s.filter);
  const years = useAppSelector(s => s.years);

  return {
    books,
    search,
    filtered,
    filter,
    years,
  };
}
