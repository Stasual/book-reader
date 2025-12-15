import prettyBytes from 'pretty-bytes';

export const FormattedDate = ({ timestamp }: { timestamp: number }) =>
  timestamp
    ? new Date(timestamp * 1000).toLocaleString('ru-RU', {
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '-';

export const FormattedSize = ({ size }: { size: number }) =>
  size ? prettyBytes(size) : '-';

export const FormattedFullDate = ({ addedDate }: { addedDate: Date }) =>
  addedDate.toLocaleDateString('ru-RU', {
    hour12: false,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
