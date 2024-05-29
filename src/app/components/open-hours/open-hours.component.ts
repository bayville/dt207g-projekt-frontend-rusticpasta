import { Component } from '@angular/core';
import { OpenHoursService } from '../../services/open-hours.service';
import { NgFor } from '@angular/common';
import { OpenHours } from '../../models/open-hours';

@Component({
  selector: 'app-open-hours',
  standalone: true,
  imports: [NgFor],
  templateUrl: './open-hours.component.html',
  styleUrl: './open-hours.component.scss'
})
export class OpenHoursComponent {
  days: OpenHours[] = [];

  constructor(private openHoursService: OpenHoursService){}

  //Load data using service
  ngOnInit(){
    this.openHoursService.getAllDays().subscribe(days => {
      this.days = days.map(day => ({
        ...day,
        openTime: this.formatOpenTime(day.openTime),
        closeTime: this.formatCloseTime(day.closeTime)
      }));
      console.log(this.days);
    });
  }

  //Format timestring
  formatOpenTime(time: string | null): string {
    if (time) {
      return time.substring(0, 5);
    }
    return '';
  }

  //Format timestring
  formatCloseTime(time: string | null): string {
    if (time) {
      return time.substring(0, 5);
    }
    return 'Stängt';
  }
}

