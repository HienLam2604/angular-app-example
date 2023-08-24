import { TestBed } from '@angular/core/testing';

import { UserTableServiceService } from './user-table-service.service';

describe('UserTableServiceService', () => {
  let service: UserTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
