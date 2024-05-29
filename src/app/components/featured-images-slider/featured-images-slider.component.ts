import {Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { NgOptimizedImage } from '@angular/common'



@Component({
  standalone: true,
  selector: 'app-featured-images-slider',
  templateUrl: './featured-images-slider.component.html',
  styleUrls: ['../../../../node_modules/keen-slider/keen-slider.min.css','./featured-images-slider.component.scss', ],
  imports: [NgOptimizedImage],
})
export class FeaturedImageSliderComponent {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance | null;

  //Inititalize slider
  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      //1 slide on smaller devices and 4 on larger
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 1, spacing: 0 },
        },
        "(min-width: 769px)": {
          slides: { perView: 4, spacing: 0},
          drag: false
        },
      },
      slides: { perView: 1 },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}