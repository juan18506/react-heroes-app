import { describe, it, expect, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { PublicRoute } from '../../src/router';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

describe('Tests in <PublicRoute />', () => {

  afterEach(() => {
    cleanup();
  });

  it('should show children if not logged', () => {
    const contextValue = {
      logged: false,
    };

    render( 
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute>
          <h1>A public route</h1>
        </PublicRoute>
      </AuthContext.Provider> 
    );
    
    expect( screen.getByText('A public route') ).toBeTruthy();
  });

  it('should navigate if logged', () => {
    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Juan',
      }
    };

    render( 
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={ contextValue }>

          <Routes>
            <Route path='/login' element={
              <PublicRoute>
                <h1>A public route</h1>
              </PublicRoute>
            } />

            <Route path='/marvel' element={ <h1>Marvel Page</h1> } />
          </Routes>

        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect( screen.getByText('Marvel Page') ).toBeTruthy();
  });
});
