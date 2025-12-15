import { Drawer, Button, Tooltip, Form, Slider } from 'antd';
import { useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../hooks/store-hooks';
import { getFilteredBooks, getSearchBooks } from '../api/booksThunks';
import { updateMinYear, updateMaxYear } from '../store/filterReducer';
import { clearFilteredBooks } from '../store/bookFilteredSlice';
import { clearSearchBooks } from '../store/bookSearchSlice';
import { useBooksState } from '../hooks/selector-hook';

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { filter, years } = useBooksState();

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const onFinish = (values: { yearRange: [number, number] }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(updateMinYear(values.yearRange[0]));
    dispatch(updateMaxYear(values.yearRange[1]));
    dispatch(
      getFilteredBooks({
        pageFiltered: 1,
        values: values.yearRange,
        request: filter.title,
      }),
    );
    closeDrawer();
  };

  const ResetFilterButton = () => {
    return (
      <Button
        style={{ marginLeft: '75px' }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          form.resetFields();
          dispatch(clearFilteredBooks());
          dispatch(clearSearchBooks());
          dispatch(updateMinYear(years.minYear));
          dispatch(updateMaxYear(years.maxYear));
          dispatch(getSearchBooks({ pageSearch: 1, title: filter.title }));
        }}
      >
        Сбросить
      </Button>
    );
  };

  return (
    <>
      <Tooltip title="Открыть фильтр">
        <Button
          style={{
            position: 'fixed',
            left: '10px',
            top: '215px',
            zIndex: 1000,
            padding: 55,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
          icon={<ControlOutlined style={{ fontSize: '50px' }} />}
          onClick={showDrawer}
        ></Button>
      </Tooltip>
      <Drawer
        placement={'left'}
        title="Фильтр"
        closable={false}
        onClose={closeDrawer}
        open={open}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="yearRange" label="Выбрать год публикации">
            <Slider
              min={years.minYear}
              max={years.maxYear}
              range={{ draggableTrack: true }}
            ></Slider>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Применить фильтр
            </Button>
            <ResetFilterButton />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
