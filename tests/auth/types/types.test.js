import { describe, it, expect } from 'vitest';
import { types } from '../../../src/auth/types/types';

describe('Tests in types', () => {

  it('should return correct types', () => {
    
    expect( types ).toEqual({
      login:  '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});
