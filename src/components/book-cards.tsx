import { Row, Col } from 'antd';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { useInView } from 'react-intersection-observer';
import {
  getFilteredBooks,
  getMinYear,
  getMaxYear,
  getBooks,
  getSearchBooks,
} from '../api/booksThunks';
import { useBooksToRender } from '../hooks/fetching-hook';
import { useBooksState } from '../hooks/selector-hook';
import BookCard from './book-card';

export const BookCards = () => {
  const dispatch = useAppDispatch();

  const { books, search, filtered, filter } = useBooksState();
  const {
    booksToRender,
    isFetchingFiltered,
    isFetchingSearch,
    isFetchingFilteredWithDefault,
    isFetchingDefault,
  } = useBooksToRender();

  const isFirstFetchDone = useRef(false);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (!isFirstFetchDone.current) {
      dispatch(getBooks(books.page));
      isFirstFetchDone.current = true;
    }
  }, [dispatch, books.page]);

  useEffect(() => {
    dispatch(getMinYear(filter.title));
    dispatch(getMaxYear(filter.title));
  }, [dispatch, filter.title]);

  useEffect(() => {
    if (!inView) return;

    if (isFetchingFiltered) {
      dispatch(
        getFilteredBooks({
          pageFiltered: filtered.page,
          values: [filter.minYear, filter.maxYear],
          request: filter.title,
        }),
      );
    } else if (isFetchingSearch) {
      dispatch(
        getSearchBooks({
          pageSearch: search.pageSearch,
          title: filter.title,
        }),
      );
    } else if (isFetchingFilteredWithDefault) {
      dispatch(
        getFilteredBooks({
          pageFiltered: books.page,
          values: [filter.minYear, filter.maxYear],
          request: '',
        }),
      );
    } else if (isFirstFetchDone) {
      dispatch(getBooks(books.page));
    }
  }, [
    inView,
    filter.title,
    books.page,
    filtered.page,
    search.pageSearch,
    filter.minYear,
    filter.maxYear,
    isFetchingFiltered,
    isFetchingSearch,
    isFetchingFilteredWithDefault,
    isFetchingDefault,
    dispatch,
  ]);

  const isSearchLoading =
    isFetchingSearch && search.loadingSearch === 'loading';
  const isFilteredDefaultLoading =
    isFetchingFilteredWithDefault && filtered.loading === 'loading';
  const isFilteredLoading =
    isFetchingFiltered && filtered.loading === 'loading';
  const isDefaultLoading =
    isFetchingDefault && search.loadingSearch === 'loading';

  const isAnyLoading =
    isSearchLoading ||
    isFilteredDefaultLoading ||
    isFilteredLoading ||
    isDefaultLoading;

  return (
    <Row
      gutter={[50, 50]}
      justify={'start'}
      style={{ margin: 100, marginLeft: '50%' }}
    >
      {booksToRender.map(book => (
        <BookCard key={book.identifier} book={book} />
      ))}
      {isAnyLoading ? (
        <Col span="24">
          <h4 style={{ textAlign: 'center' }}>Загружаем ещё...</h4>
        </Col>
      ) : (
        <div ref={ref} />
      )}
    </Row>
  );
};
