import { TestBed } from '@angular/core/testing';

import { LayoutComunicationService } from './layout-comunication.service';

describe('LayoutComunicationService', () => {
  let service: LayoutComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
