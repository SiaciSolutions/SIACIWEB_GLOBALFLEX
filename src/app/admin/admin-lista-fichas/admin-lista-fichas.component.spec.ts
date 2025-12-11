import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaFichasComponent } from './admin-lista-fichas.component';

describe('AdminListaFichasComponent', () => {
  let component: AdminListaFichasComponent;
  let fixture: ComponentFixture<AdminListaFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListaFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
