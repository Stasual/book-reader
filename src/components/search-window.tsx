import { Button, Input, message } from 'antd';
import { getSearchBooks, getMinYear, getMaxYear } from '../api/booksThunks';
import { updateTitle, updateTitleSearch } from '../store/filterReducer';
import { useAppDispatch } from '../hooks/store-hooks';
import { clearFilteredBooks } from '../store/bookFilteredSlice';
import { useBooksState } from '../hooks/selector-hook';

const { Search } = Input;

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { filter } = useBooksState();
  const [messageApi, contextHolder] = message.useMessage();

  function validateAndSearch(title: string) {
    const isEmpty = !title?.trim();
    const isInvalidFormat = !/^[\p{L}0-9._\-\s'!?,]+$/u.test(title);
    const isSameTitle = title === filter.title;
    if (isEmpty || isInvalidFormat || isSameTitle) {
      messageApi.info(
        'Поисковой запрос пуст, имеет неверный формат или идентичен предыдущему',
      );
      return;
    }
    dispatch(clearFilteredBooks());
    dispatch(updateTitle(title));
    dispatch(getSearchBooks({ pageSearch: 1, title }));
    dispatch(getMinYear(title));
    dispatch(getMaxYear(title));
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}
    >
      {contextHolder}
      <Search
        value={filter.titleSearch}
        allowClear
        style={{ width: '100%', maxWidth: 960 }}
        placeholder="Поиск книги"
        onChange={event => {
          dispatch(updateTitleSearch(event.target.value));
        }}
        onSearch={value => {
          validateAndSearch(value);
        }}
        enterButton={
          <Button
            type="primary"
            style={{ backgroundColor: '#222', borderColor: '#222' }}
          >
            Найти
          </Button>
        }
        size="large"
      />
    </div>
  );
};
