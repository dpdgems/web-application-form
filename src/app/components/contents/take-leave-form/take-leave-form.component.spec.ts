import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeLeaveFormComponent } from './take-leave-form.component';

describe('TakeLeaveFormComponent', () => {
  let component: TakeLeaveFormComponent;
  let fixture: ComponentFixture<TakeLeaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeLeaveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
