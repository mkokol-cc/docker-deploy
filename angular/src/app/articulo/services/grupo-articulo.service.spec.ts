import { TestBed } from '@angular/core/testing';

import { GrupoArticuloService } from './grupo-articulo.service';

describe('GrupoArticuloService', () => {
  let service: GrupoArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
