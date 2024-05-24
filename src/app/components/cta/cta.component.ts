import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  @Input() title: string = 'Default Title';
  @Input() ctaText: string = 'Default CTA-text';
  @Input() ctaClass: string = 'cta'
  @Input() buttonText: string = 'Default Button Text';
  @Input() buttonLink: string = '#';
}
