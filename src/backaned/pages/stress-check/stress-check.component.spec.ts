import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StressCheckComponent } from './stress-check.component';

describe('StressCheckComponent', () => {
  let component: StressCheckComponent;
  let fixture: ComponentFixture<StressCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StressCheckComponent]
    });
    fixture = TestBed.createComponent(StressCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
