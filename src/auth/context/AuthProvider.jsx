import { useReducer } from 'react';
import { AuthContext, authReducer } from './';

const initialState = {
  logged: false,
}

export const AuthProvider = ({ children }) => {

  const [ authState, dispatch ] = useReducer( authReducer, initialState );

  return (
    <AuthContext.Provider value={{ }}>
      { children }
    </AuthContext.Provider>    
  )
}
