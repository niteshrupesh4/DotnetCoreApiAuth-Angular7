/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExaltuserService } from './exaltuser.service';

describe('Service: Exaltuser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExaltuserService]
    });
  });

  it('should ...', inject([ExaltuserService], (service: ExaltuserService) => {
    expect(service).toBeTruthy();
  }));
});
