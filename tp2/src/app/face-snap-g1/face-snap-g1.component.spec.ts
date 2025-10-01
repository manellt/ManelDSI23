import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceSnapG1 } from './face-snap-g1.component';

describe ('FaceSnapG1', () => {
  let component: FaceSnapG1;
  let fixture: ComponentFixture<FaceSnapG1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceSnapG1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceSnapG1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});


