import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VozPage } from './voz.page';

describe('VozPage', () => {
  let component: VozPage;
  let fixture: ComponentFixture<VozPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VozPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
