import React from 'react';
import type { Book } from '../types/card-types';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'antd';

const IMG_URL = import.meta.env.VITE_IMG_URL;
const { Meta } = Card;

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <Col key={book.identifier} span={'auto'}>
      <Card
        onClick={() => {
          navigate(`book/${book.identifier}`);
        }}
        hoverable
        style={{ width: 212, height: 500 }}
        cover={
          <div style={{ width: '100%', height: 250, overflow: 'hidden' }}>
            <img
              style={{ width: '100%', height: 'auto' }}
              src={IMG_URL + `${book.identifier}`}
            />
          </div>
        }
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: 16,
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            marginBottom: 8,
          }}
        >
          {book.title}
        </div>
        <Meta description={book.creator} />
      </Card>
    </Col>
  );
};

export default React.memo(BookCard);
