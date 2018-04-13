import * as FileTypes from './SupportedFileTypes';

describe('isValidFile', () => {
    
    it('returns false for text/plain', () => {
        expect(FileTypes.isValidFile("text/plain")).toBe(false);
    });

    it('returns true for image/png', () => {
        expect(FileTypes.isValidFile("image/png")).toBe(true);
    });

    it('returns true for image/jpeg', () => {
        expect(FileTypes.isValidFile("image/jpeg")).toBe(true);
    });

    it('returns true for image/gif', () => {
        expect(FileTypes.isValidFile("image/gif")).toBe(true);
    });

    it('returns true for image/webp', () => {
        expect(FileTypes.isValidFile("image/webp")).toBe(true);
    });

});