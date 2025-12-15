import { Outlet } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { FooterPage } from './components/footer';
import { HeaderBar } from './components/header';
import { useState } from 'react';

const { Content } = Layout;

function App() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const isTheme =
    currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm: isTheme,
      }}
    >
      <Layout
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderBar setTheme={setCurrentTheme} currentTheme={currentTheme} />
        <Content>
          <Outlet />
        </Content>
        <FooterPage />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
