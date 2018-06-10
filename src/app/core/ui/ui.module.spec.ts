import { UIModule } from './ui.module';

describe('UiModule', () => {
    let uiModule: UIModule;

    beforeEach(() => {
        uiModule = new UIModule();
    });

    it('should create an instance', () => {
        expect(uiModule).toBeTruthy();
    });
});
