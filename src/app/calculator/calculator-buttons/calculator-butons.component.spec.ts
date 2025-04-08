import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorButonsComponent } from './calculator-buttons.component';

describe('CalculatorButonsComponent', () => {
  let component: CalculatorButonsComponent;
  let fixture: ComponentFixture<CalculatorButonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
