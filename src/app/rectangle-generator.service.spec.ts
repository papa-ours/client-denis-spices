import { TestBed } from '@angular/core/testing';

import { RectangleGeneratorService } from './rectangle-generator.service';

describe('RectangleGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RectangleGeneratorService = TestBed.get(RectangleGeneratorService);
    expect(service).toBeTruthy();
  });
});
