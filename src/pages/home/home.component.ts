import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturedImageSliderComponent } from '../../components/featured-images-slider/featured-images-slider.component';
import { MenuSliderComponent } from '../../components/menu-slider/menu-slider.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InfoSectionComponent } from '../../components/info-section/info-section.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturedImageSliderComponent, MenuSliderComponent, CtaComponent, FooterComponent, InfoSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
