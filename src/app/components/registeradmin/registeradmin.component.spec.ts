import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteradminComponent } from './registeradmin.component';

describe('RegisteradminComponent', () => {
  let component: RegisteradminComponent;
  let fixture: ComponentFixture<RegisteradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteradminComponent]
    });
    fixture = TestBed.createComponent(RegisteradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
