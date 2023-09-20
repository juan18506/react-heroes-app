import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { Navbar } from '../../../src/ui/components/Navbar';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Tests in <Navbar />', () => {

  const contextValue = {
    logged: true, 
    user: {
      id: '123',
      name: 'Juan',
    },
    logout: vi.fn(),
  };


  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should show username', () => {
    render( 
      <MemoryRouter>
        <AuthContext.Provider value={ contextValue }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    expect( screen.getByText(contextValue.user.name) ).toBeTruthy();
  });

  it('should call logout and navigate on button click', () => {
    render( 
      <MemoryRouter>
        <AuthContext.Provider value={ contextValue }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click( logoutButton );


    expect( contextValue.logout ).toHaveBeenCalledOnce();
    expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true });
  });
});