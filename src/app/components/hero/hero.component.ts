import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  //Heroimage links
  imgLink: string = '../../assets/img/hero';
  imgLinkJPG: string = '../../assets/img/hero.jpg';
  imgLinkAVIF: string = '../../assets/img/hero.avif';
  


  }
