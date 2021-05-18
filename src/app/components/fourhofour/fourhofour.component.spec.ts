import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourhofourComponent } from './fourhofour.component';

describe('FourhofourComponent', () => {
  let component: FourhofourComponent;
  let fixture: ComponentFixture<FourhofourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourhofourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourhofourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
