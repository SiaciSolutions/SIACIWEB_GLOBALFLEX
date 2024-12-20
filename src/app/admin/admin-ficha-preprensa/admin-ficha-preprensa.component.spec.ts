import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFichaPreprensaComponent } from './admin-ficha-preprensa.component';

describe('AdminFichaPreprensaComponent', () => {
  let component: AdminFichaPreprensaComponent;
  let fixture: ComponentFixture<AdminFichaPreprensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFichaPreprensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFichaPreprensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
