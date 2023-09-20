import { describe, it, expect, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { AppRouter } from '../../src/router';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';

describe('Tests in <AppRouter />', () => {

  afterEach(() => {
    cleanup();
  });

  it('should show login if not logged', () => {
    const contextValue = {
      logged: false,
    };

    render( 
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter> 
    );

    expect( screen.getAllByText('Login').length ).toBeGreaterThan( 0 );
  });

  it('should show marvel component if not logged', () => {
    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Juan',
      },
    };

    render( 
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter> 
    );

    expect( screen.getAllByText('Marvel').length ).toBeGreaterThan( 0 );
  });
});
