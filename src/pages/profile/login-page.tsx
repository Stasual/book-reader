import { Link } from 'react-router-dom';
import Login from '../../components/login';

const LoginPage = () => {
  console.log('update');
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Логин</h1>
      <Login />
      <p>
        Или <Link to="/register">зарегестрируйтесь</Link>
      </p>
    </div>
  );
};

export default LoginPage;
