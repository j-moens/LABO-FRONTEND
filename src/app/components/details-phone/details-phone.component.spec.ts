import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPhoneComponent } from './details-phone.component';

describe('DetailsPhoneComponent', () => {
  let component: DetailsPhoneComponent;
  let fixture: ComponentFixture<DetailsPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
