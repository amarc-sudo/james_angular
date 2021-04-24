import { TestBed } from '@angular/core/testing';

import { HistoriqueFicheService } from './historique-fiche.service';

describe('HistoriqueFicheService', () => {
  let service: HistoriqueFicheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueFicheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
