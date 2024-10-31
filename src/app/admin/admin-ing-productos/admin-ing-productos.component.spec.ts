import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngProductosComponent } from './admin-ing-productos.component';

describe('AdminIngProductosComponent', () => {
  let component: AdminIngProductosComponent;
  let fixture: ComponentFixture<AdminIngProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIngProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
