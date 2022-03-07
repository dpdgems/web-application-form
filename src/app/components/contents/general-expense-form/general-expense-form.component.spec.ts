import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralExpenseFormComponent } from './general-expense-form.component';

describe('GeneralExpenseFormComponent', () => {
  let component: GeneralExpenseFormComponent;
  let fixture: ComponentFixture<GeneralExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralExpenseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
