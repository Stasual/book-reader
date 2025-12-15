import App from '../App';
import { Book, bookLoader } from '../pages/profile/book-details';
import { Error } from '../pages/profile/error-page';
import LoginPage from '../pages/profile/login-page';
import { MainPage } from '../pages/profile/main-page';
import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/profile/register-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/book/:bookId',
        element: <Book />,
        loader: bookLoader,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <Error />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <Error />,
      },
    ],
  },
]);
