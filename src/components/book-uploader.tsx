import { FilesDetails } from '../components/book-card-details';
import { FormattedFullDate } from './date-and-size';
import { Card } from 'antd';
import type { BookLoaderResponse } from '../types/card-types';

export const BookUploader = ({
  bookData,
}: {
  bookData: BookLoaderResponse;
}) => {
  const { uploader, addeddate } = bookData.metadata;
  const addedDate = new Date(addeddate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilesDetails bookData={bookData} />
      <Card title="Загружено" style={{ width: 300 }}>
        <p style={{ fontSize: 20 }}>{uploader}</p>
        <FormattedFullDate addedDate={addedDate} />
      </Card>
    </div>
  );
};
