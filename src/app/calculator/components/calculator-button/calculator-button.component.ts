import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import {
  asNativeElements,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [class.is-command]="isCommand()"
      [class.is-pressed]="isPressed()"
      (click)="handleClick()"
      #calculatorButton
    >
      <ng-content #nameCalculatorButton></ng-content>
    </button>
  `,
  styles: `
  button {
    @apply w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-xl font-light;
  }
  .is-command {
    @apply bg-indigo-700 bg-opacity-10;
  }
  .is-pressed {
    @apply bg-indigo-800 bg-opacity-50;
  }
  `,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contentValue =
    viewChild<ElementRef<HTMLButtonElement>>('calculatorButton');

  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  /**
   * Styles for button command, in this case, it will apply directly in the button.
   * Styles are implmented via hte isCommand() signal directly in the button.
   * Verify how was implemented in styles of this component: {@link CalculatorComponent}
   */
  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  handleClick() {
    if (!this.contentValue()!.nativeElement) return;
    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;
    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
