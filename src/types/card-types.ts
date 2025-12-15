export type Year = {
  year: number;
};

export type Book = {
  title: string;
  identifier: string;
  creator: string | string[];
  year: number;
};

export type BookListResponse = {
  response: {
    docs: Book[];
    numFound: number;
    start: number;
  };
};

export type YearResponse = {
  response: {
    docs: Year[];
    numFound: number;
    start: number;
  };
};

export type ArchiveFile = {
  name: string;
  mtime: number;
  size: number | string;
};

interface BookMetadata {
  title: string;
  uploader: string;
  addeddate: string;
  language: string | string[];
  isbn: string | string[];
  description: string | string[];
  creator: string;
  date: string;
  publisher: string;
  imagecount: string | number;
  identifier: string;
}

export interface BookLoaderResponse {
  metadata: BookMetadata;
  files: ArchiveFile[];
}
