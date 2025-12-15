import { Layout } from 'antd';

const { Footer } = Layout;

export const FooterPage = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        color: '#fff',
        lineHeight: '33px',
        backgroundColor: '#222',
        fontSize: '24px',
      }}
    >
      © 2025 Архив Интернета
    </Footer>
  );
};
