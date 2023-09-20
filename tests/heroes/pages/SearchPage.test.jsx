import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';
import { MemoryRouter } from 'react-router-dom';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Tests in <SearchPage />', () => {

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should match snapshot', () => {
    const { container } = render( 
      <MemoryRouter>
        <SearchPage /> 
      </MemoryRouter>
    );
    
    expect( container ).toMatchSnapshot();
  });

  it('should show batman and input with queryString value', () => {
    render( 
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage /> 
      </MemoryRouter>
    );
    
    const input = screen.getByRole('textbox');
    const image = screen.getByRole('img');
    const alert = screen.getByTestId('alert-danger');

    expect( input.value ).toBe('batman');
    expect( image.src ).toContain('/heroes/dc-batman.jpg');
    expect( alert.style.display ).toBe('none');
  });

  it('should show error if hero not found', () => {
    render( 
      <MemoryRouter initialEntries={['/search?q=randomhero']}>
        <SearchPage /> 
      </MemoryRouter>
    );
    
    const alert = screen.getByTestId('alert-danger');
    expect( alert.style.display ).not.toBe('none');
  });

  it('should call navigate with new screen', () => {
    const inputValue = 'batman';

    render( 
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage /> 
      </MemoryRouter>
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: inputValue } })

    const form = screen.getByLabelText('form');
    fireEvent.submit( form );

    expect( navigateMock ).toHaveBeenCalledWith(`?q=${ inputValue }`);
  });
});
