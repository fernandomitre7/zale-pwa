import { TestBed, inject } from '@angular/core/testing';

import { UIService } from './ui.service';

describe('UiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UIService]
        });
    });

    it('should be created', inject([UIService], (service: UIService) => {
        expect(service).toBeTruthy();
    }));
});
