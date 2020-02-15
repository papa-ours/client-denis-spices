import { TestBed } from '@angular/core/testing';

import { SpiceService } from './spice.service';

describe('SpiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpiceService = TestBed.get(SpiceService);
    expect(service).toBeTruthy();
  });
});
