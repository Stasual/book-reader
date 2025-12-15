import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'red', fontSize: 100 }}>404</h1>
      <h3>Item cannot be found.</h3>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
};
