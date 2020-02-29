import { TestBed } from '@angular/core/testing';

import { CircleGeneratorService } from './circle-generator.service';

describe('CircleGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircleGeneratorService = TestBed.get(CircleGeneratorService);
    expect(service).toBeTruthy();
  });
});
