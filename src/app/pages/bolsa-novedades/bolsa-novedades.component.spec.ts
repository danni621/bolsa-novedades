import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaNovedadesComponent } from './bolsa-novedades.component';

describe('BolsaNovedadesComponent', () => {
  let component: BolsaNovedadesComponent;
  let fixture: ComponentFixture<BolsaNovedadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BolsaNovedadesComponent]
    });
    fixture = TestBed.createComponent(BolsaNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
