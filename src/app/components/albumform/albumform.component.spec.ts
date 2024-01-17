import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumformComponent } from './albumform.component';

describe('AlbumformComponent', () => {
  let component: AlbumformComponent;
  let fixture: ComponentFixture<AlbumformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumformComponent]
    });
    fixture = TestBed.createComponent(AlbumformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
