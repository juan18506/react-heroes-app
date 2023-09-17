import { useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { types } from '../types/types';

const init = () => {
  const user = localStorage.getItem('user')
  ? JSON.parse( localStorage.getItem('user') )
  : null

  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {

  const [ authState, dispatch ] = useReducer( authReducer, {}, init );

  const login = ( name = '' ) => {
    const user = { id: 'ABC', name };

    const action = {
      type: types.login,
      payload: user,
    }

    localStorage.setItem('user', JSON.stringify(user));

    dispatch( action );
  }

  const logout = () => {
    localStorage.removeItem('user');

    const action = {
      type: types.logout,
    }

    dispatch( action );
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState,
      login: login,
      logout: logout,
    }}>
      { children }
    </AuthContext.Provider>    
  )
}
