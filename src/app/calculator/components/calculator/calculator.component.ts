import {
  Component,
  computed,
  HostListener,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <div
      class="w-full h-40 bg-gradient-to-b from-gray-800 to-gray-700 flex items-end text-right"
      style="min-width: 300px;"
    >
      <div class="w-full py-5 px-6 text-6xl text-white font-thin">
        @if(subResultText()!=='0') {
        <span class="text-4xl">
          {{ subResultText() }} {{ lastOperator() }}
        </span>
        <br />
        }
        {{ resultText() }}
      </div>
    </div>
    <div class="w-full bg-gradient-to-b from-indigo-400 to-indigo-500">
      <div class="flex w-full">
        <calculator-button
          (onClick)="handleClick($event)"
          (onClick)="handleClick($event)"
        >
          C
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          +/-C
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          %
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)" isCommand>
          ÷
        </calculator-button>
      </div>
      <div class="flex w-full">
        <calculator-button (onClick)="handleClick($event)">
          7
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          8
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          9
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)" isCommand>
          x
        </calculator-button>
      </div>
      <div class="flex w-full">
        <calculator-button (onClick)="handleClick($event)">
          4
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          5
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          6
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)" isCommand>
          -
        </calculator-button>
      </div>
      <div class="flex w-full">
        <calculator-button (onClick)="handleClick($event)">
          1
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          2
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          3
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)" isCommand>
          +
        </calculator-button>
      </div>
      <div class="flex w-full">
        <calculator-button (onClick)="handleClick($event)">
          0
        </calculator-button>
        <calculator-button (onClick)="handleClick($event)">
          .
        </calculator-button>
        <calculator-button
          (onClick)="handleClick($event)"
          isCommand
          isDoubleSize
        >
          =
        </calculator-button>
      </div>
    </div>
  `,
  styles: `
  `,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButton = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
    console.log(key);
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      x: '*',
      X: '*',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(event.key);

    this.calculatorButton().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
