import { Typography, Card } from 'antd';
import { FormattedDate, FormattedSize } from './date-and-size';
import type { ArchiveFile, BookLoaderResponse } from '../types/card-types';

const DOWNLOAD_URL = import.meta.env.VITE_DOWNLOAD_URL;

export const FilesDetails = ({
  bookData,
}: {
  bookData: BookLoaderResponse;
}) => {
  const { identifier } = bookData.metadata;

  return (
    <Card>
      <div style={{ display: 'flex', fontWeight: 600 }}>
        <Typography style={{ flex: '1 1 auto' }}>Скачать книгу</Typography>
        <Typography style={{ width: 150, textAlign: 'center' }}>
          Последнее изменение
        </Typography>
        <Typography style={{ width: 100, textAlign: 'right' }}>
          Размер
        </Typography>
      </div>
      <hr />
      {bookData.files?.map((file: ArchiveFile) => (
        <div key={file.name} style={{ display: 'flex' }}>
          <div style={{ flex: '1 1 auto' }}>
            <a href={DOWNLOAD_URL + `${identifier}/${file.name}`} download>
              Скачать {file.name}
            </a>
          </div>
          <div style={{ width: 150, textAlign: 'center' }}>
            <FormattedDate timestamp={file.mtime} />
          </div>
          <div style={{ width: 100, textAlign: 'right' }}>
            <FormattedSize size={Number(file.size)} />
          </div>
        </div>
      ))}
    </Card>
  );
};
