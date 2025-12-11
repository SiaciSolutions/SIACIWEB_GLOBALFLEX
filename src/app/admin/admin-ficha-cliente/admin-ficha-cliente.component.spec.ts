import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFichaClienteComponent } from './admin-ficha-cliente.component';

describe('AdminFichaClienteComponent', () => {
  let component: AdminFichaClienteComponent;
  let fixture: ComponentFixture<AdminFichaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFichaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFichaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
