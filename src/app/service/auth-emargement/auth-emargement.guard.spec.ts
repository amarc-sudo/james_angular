import { TestBed } from '@angular/core/testing';

import { AuthEmargementGuard } from './auth-emargement.guard';

describe('AuthEmargementGuard', () => {
  let guard: AuthEmargementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEmargementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
