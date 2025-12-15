import { useParams, useLoaderData } from 'react-router-dom';
import { Descriptions, Card } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { getBookDescription } from './book-descriptions';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { BookUploader } from '../../components/book-uploader';
import type { BookLoaderResponse } from '../../types/card-types';

const METADATA_URL = import.meta.env.VITE_METADATA_URL;
const EMBED_URL = import.meta.env.VITE_EMBED_URL;

export type BookParams = {
  bookId: string;
};

export async function bookLoader({ params }: LoaderFunctionArgs<BookParams>) {
  const { bookId } = params;
  const res = await fetch(METADATA_URL + `${bookId}`);

  if (!res.ok) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const data = await res.json();

  if (!data || !data.metadata?.title) {
    throw new Response('Not Found', { status: 404 });
  }

  return data;
}

export const Book = () => {
  const { bookId } = useParams();
  const bookData = useLoaderData() as BookLoaderResponse;
  const items = getBookDescription(bookData);

  return (
    <>
      <iframe
        src={EMBED_URL + `${bookId}`}
        width="100%"
        height="800"
        style={{ border: 'none' }}
        allowFullScreen
      ></iframe>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Card
          title={
            <>
              <BookOutlined /> {bookData.metadata.title}
            </>
          }
          style={{
            maxWidth: 600,
          }}
        >
          <Descriptions column={1} items={items} />
        </Card>
        <BookUploader bookData={bookData} />
      </div>
    </>
  );
};
