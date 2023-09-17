import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../';

export const LoginPage = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  const handleLogin = () => {
    login( 'Juan' );

    navigate('/', {
      replace: true,
    });
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button
        className="btn btn-primary"
        onClick={ handleLogin }
      >
        Login
      </button>
    </div>
  )
}
