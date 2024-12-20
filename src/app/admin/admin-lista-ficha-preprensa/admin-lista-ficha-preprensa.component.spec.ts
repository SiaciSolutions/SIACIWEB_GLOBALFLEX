import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaFichasPreprensaComponent } from './admin-lista-ficha-preprensa.component';

describe('AdminListaFichasPreprensaComponent', () => {
  let component: AdminListaFichasPreprensaComponent;
  let fixture: ComponentFixture<AdminListaFichasPreprensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListaFichasPreprensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListaFichasPreprensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
