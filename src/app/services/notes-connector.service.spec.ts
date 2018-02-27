import { TestBed, inject } from '@angular/core/testing';

import { NotesConnectorService } from './notes-connector.service';

describe('NotesConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesConnectorService]
    });
  });

  it('should be created', inject([NotesConnectorService], (service: NotesConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
