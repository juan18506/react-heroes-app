import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../src/router';
import { AuthContext } from '../../src/auth';

describe('Tests in <PrivateRoute />', () => {

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should show children if logged', () => {

    Storage.prototype.setItem = vi.fn();

    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Juan',
      },
    };

    render( 
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <AuthContext.Provider value={ contextValue }>
          <PrivateRoute>
            <h1>A private route</h1>
          </PrivateRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    expect( screen.getByText('A private route') ).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
  });
});
