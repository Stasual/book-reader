import { SearchBar } from '../../components/search-window';
import { BookCards } from '../../components/book-cards';
import { Filter } from '../../components/filter';
import { useAuth } from '../../hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { useBooksState } from '../../hooks/selector-hook';

export const MainPage = () => {
  const { books } = useBooksState();
  const { isAuth } = useAuth();
  const isLoading = books.page === 1 && books.loading === 'loading';

  if (isLoading) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Загрузка...</h2>
    );
  }
  return isAuth ? (
    <>
      <SearchBar />
      <Filter />
      <BookCards />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
