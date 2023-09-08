import { TestBed } from '@angular/core/testing';
import { Utilitarios } from './utilitarios.component';

describe('Utilitarios', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const utilitarios: Utilitarios = TestBed.get(Utilitarios);
        expect(utilitarios).toBeTruthy();
    });
});