import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusquedaCodBarraComponent } from './admin-busqueda-codbarra.component';

describe('AdminBusquedaCodBarraComponent', () => {
  let component: AdminBusquedaCodBarraComponent;
  let fixture: ComponentFixture<AdminBusquedaCodBarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBusquedaCodBarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBusquedaCodBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
