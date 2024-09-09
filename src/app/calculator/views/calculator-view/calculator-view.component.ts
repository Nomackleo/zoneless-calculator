import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export default class CalculatorViewComponent {}
