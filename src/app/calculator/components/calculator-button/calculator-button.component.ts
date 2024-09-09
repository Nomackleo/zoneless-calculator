import { Component } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  template: `
    <div class="w-1/4 border-r border-b border-indigo-400">
      <button
        class="w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light"
      >
        <ng-content #nameCalculatorButton></ng-content>
      </button>
    </div>
  `,
  styles: ``,
})
export class CalculatorButtonComponent {}
