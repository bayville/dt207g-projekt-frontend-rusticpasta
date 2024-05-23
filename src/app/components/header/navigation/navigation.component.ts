import { Component, HostListener, Renderer2} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3Mini, heroXMarkMini } from '@ng-icons/heroicons/mini';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgIconComponent, RouterLink,RouterLinkActive],
  viewProviders: [provideIcons({ heroBars3Mini, heroXMarkMini })],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})

export class NavigationComponent {
  isMenuOpen: boolean = false;
  isSmallScreen: boolean = false;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])

  ngOnInit(){
    this.isSmallScreen = window.innerWidth <= 768;
  }

  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  toggleMenu(): void {
    if (this.isSmallScreen) {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        this.renderer.addClass(document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
      }
      console.log(this.isMenuOpen);
    }
  }
}
