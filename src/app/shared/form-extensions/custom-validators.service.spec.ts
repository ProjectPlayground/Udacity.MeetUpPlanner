/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CustomValidatorsService } from './custom-validators.service';

describe('Service: CustomValidators', () => {
  beforeEach(() => {
    addProviders([CustomValidatorsService]);
  });

  it('should ...',
    inject([CustomValidatorsService],
      (service: CustomValidatorsService) => {
        expect(service).toBeTruthy();
      }));
});
