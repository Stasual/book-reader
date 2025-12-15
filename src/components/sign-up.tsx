import { useAppDispatch } from '../hooks/store-hooks';
import { useNavigate } from 'react-router-dom';
import { FormMain } from './form';
import { setUser } from '../store/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };

  return <FormMain title="Зарегестрироваться" handleClick={handleRegister} />;
};

export default SignUp;
