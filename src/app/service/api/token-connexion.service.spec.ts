import { TestBed } from '@angular/core/testing';

import { TokenConnexionService } from './token-connexion.service';

describe('TokenConnexionService', () => {
  let service: TokenConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
