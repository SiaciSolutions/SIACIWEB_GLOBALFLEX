import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCotizadorComponent } from './admin-cotizador.component';

describe('AdminCotizadorComponent', () => {
  let component: AdminCotizadorComponent;
  let fixture: ComponentFixture<AdminCotizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCotizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCotizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
