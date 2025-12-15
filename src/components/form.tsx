import { Button, Form, Input } from 'antd';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const FormMain = ({ title, handleClick }: FormProps) => {
  const onFinish = (values: { email: string; pass: string }) => {
    handleClick(values.email, values.pass);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Почта"
        name="email"
        rules={[{ required: true, message: 'Введите email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="pass"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {title}
        </Button>
      </Form.Item>
    </Form>
  );
};

export { FormMain };
