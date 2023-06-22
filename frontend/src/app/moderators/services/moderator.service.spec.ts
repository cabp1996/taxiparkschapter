import { TestBed } from '@angular/core/testing';

import { ModeratorService } from './moderator.service';
import { Moderator } from '../../shared/interfaces';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ModeratorService', () => {
  let service: ModeratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModeratorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createModerator makes a POST request to create moderator', () => {
    const moderator: Moderator = {
      fileUrl: 'url',
      name: 'name',
      id: 1,
    };

    service.createModerator(moderator).subscribe((response: Moderator) => {
      expect(response).toEqual(moderator);
    });

    const req = httpMock.expectOne(service.API_BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(moderator);

    req.flush(moderator);
  });
});
