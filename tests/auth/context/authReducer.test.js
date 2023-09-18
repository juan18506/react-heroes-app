import { describe, it, expect } from 'vitest';
import { authReducer } from '../../../src/auth';
import { types } from '../../../src/auth/types/types';

describe('Tests in authReducer', () => {

  it('should return default state', () => {
    const initialState = { 
      logged: false,
    };
    const newState = authReducer(initialState, {});

    expect( newState ).toBe( initialState );
  });

  it('should update logged and set user on login', () => {
    const initialState = { 
      logged: false,
    };
    const action = {
      type: types.login,
      payload: {
        id: '123',
        name: 'Juan',
      },
    };

    const { logged, user } = authReducer(initialState, action);
    expect( logged ).toBeTruthy();
    expect( user ).toBe( action.payload );
  });

  it('should update logged and remove user on logout', () => {
    const initialState = { 
      logged: true, 
      user: { 
        id: '123', 
        name: 'Juan',
      },
    };
    const action = {
      type: types.logout,
    };

    const { logged, user } = authReducer(initialState, action);
    expect( logged ).toBeFalsy();
    expect( user ).toBeNull();
  });
});
