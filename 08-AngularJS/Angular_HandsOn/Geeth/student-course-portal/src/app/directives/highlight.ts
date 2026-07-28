import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackground(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackground('');
  }

  private setBackground(color: string) {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', color);
  }
}
