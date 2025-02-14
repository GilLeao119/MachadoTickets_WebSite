import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosComponent } from './graficos.component';

describe('GraficosComponent', () => {
  let component: GraficosComponent;
  let fixture: ComponentFixture<GraficosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficosComponent]
    });
    fixture = TestBed.createComponent(GraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
