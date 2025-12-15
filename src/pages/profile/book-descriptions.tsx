import type { DescriptionsProps } from 'antd';
import type { BookLoaderResponse } from '../../types/card-types';

import langs from 'langs';

export function getBookDescription(data: BookLoaderResponse) {
  const { language, isbn, description, imagecount, creator, publisher, date } =
    data.metadata;

  const checkArray = (array: unknown): string[] => {
    const newArray = Array.isArray(array) ? array : array ? [array] : [];
    return newArray;
  };

  const namesLanguage = checkArray(language)
    .map(code => langs.where('3', code)?.name || code)
    .join(' / ');

  const addedDate = new Date(date);

  const dateDescription = addedDate.toLocaleString('ru-RU', {
    hour12: false,
  });

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Автор',
      children: <p>{creator || '—'}</p>,
    },
    {
      key: '2',
      label: 'Год',
      children: <p>{data.metadata.date || '—'}</p>,
    },
    {
      key: '3',
      label: 'Издатель',
      children: <p>{publisher || '—'}</p>,
    },
    {
      key: '4',
      label: 'Язык',
      children: <p>{namesLanguage || '—'}</p>,
    },
    {
      key: '5',
      label: 'Дата добавления',
      children: <p>{dateDescription || '—'}</p>,
    },
    {
      key: '6',
      label: 'ISBN',
      children: <p>{checkArray(isbn).join(' / ') || '—'}</p>,
    },
    {
      key: '7',
      label: 'Кол. страниц',
      children: <p>{imagecount || '—'}</p>,
    },
    {
      key: '8',
      label: 'Описание',
      children: <p>{checkArray(description) || '—'}</p>,
    },
  ];

  return items;
}
