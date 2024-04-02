import { TestBed } from '@angular/core/testing';

import { TableTerraComunicationBtnService } from './table-terra-comunication-btn.service';

describe('TableTerraComunicationBtnService', () => {
  let service: TableTerraComunicationBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableTerraComunicationBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
