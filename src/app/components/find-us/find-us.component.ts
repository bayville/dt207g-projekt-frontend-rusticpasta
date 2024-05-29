import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-find-us',
  standalone: true,
  imports: [],
  templateUrl: './find-us.component.html',
  styleUrl: './find-us.component.scss'
})
export class FindUsComponent {
  //Class input to decide textcolor
  @Input() class: string = 'white'
}
