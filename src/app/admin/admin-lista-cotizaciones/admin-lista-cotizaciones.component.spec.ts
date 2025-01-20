import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaContizacionesComponent } from './admin-lista-cotizaciones.component';

describe('AdminListaContizacionesComponent', () => {
  let component: AdminListaContizacionesComponent;
  let fixture: ComponentFixture<AdminListaContizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListaContizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaContizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
