import { removeUser } from '../store/userSlice';
import { useAppDispatch } from '../hooks/store-hooks';
import { useAuth } from '../hooks/use-auth';
import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const HeaderBar = ({ currentTheme, setTheme }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const isChoiceTheme = currentTheme === 'light' ? 'dark' : 'light';
  const isChoiceThemeIcon =
    currentTheme === 'light' ? <MoonOutlined /> : <SunOutlined />;

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        lineHeight: '64px',
        backgroundColor: '#222',
        fontSize: '24px',
        paddingLeft: '50px',
      }}
    >
      <Link to="/" style={{ color: 'white' }}>
        Internet Archive
      </Link>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginRight: '16px',
        }}
      >
        <Button
          onClick={() => setTheme(isChoiceTheme)}
          icon={isChoiceThemeIcon}
        />
        {isAuth && (
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => dispatch(removeUser())}
          />
        )}
      </div>
    </header>
  );
};
