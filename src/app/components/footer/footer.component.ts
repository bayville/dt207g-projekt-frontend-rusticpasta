import { Component } from '@angular/core';
import { OpenHoursComponent } from '../open-hours/open-hours.component';
import { FindUsComponent } from '../find-us/find-us.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [OpenHoursComponent, FindUsComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
