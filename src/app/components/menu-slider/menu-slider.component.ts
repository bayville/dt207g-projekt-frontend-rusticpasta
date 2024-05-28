import {Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { NgClass, NgFor, NgIf } from "@angular/common";
import { MenuService } from "../../services/menu.service";
import { MenuItem } from "../../models/menu-item";
import { Category } from "../../models/category";
import { GroupedMenuItems } from "../../models/grouped-menu-item";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-menu-slider',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './menu-slider.component.html',
  styleUrls: ['../../../../node_modules/keen-slider/keen-slider.min.css', './menu-slider.component.scss']
})
export class MenuSliderComponent {
  categoriesWithMenuItems: GroupedMenuItems[] = [];
  activeSlideIndex: number = 0; 

  slider?: KeenSliderInstance | null;
  
  @ViewChild("sliderRefMenu") sliderRef!: ElementRef<HTMLElement>
  constructor(private menuService: MenuService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllPublishedCategories().subscribe((categories) => {
      this.menuService.getAllPublishedMenuItems().subscribe((menuItems) => {
        console.log(menuItems);
        console.log(categories);
       this.categoriesWithMenuItems = this.groupMenuItemsByCategory(menuItems, categories);
       console.log(this.categoriesWithMenuItems);
      })
    })
  }

  private groupMenuItemsByCategory(menuItems: MenuItem[], categories: Category[]): GroupedMenuItems[] {
    const groupedMenuItems: GroupedMenuItems[] = [];
    
    // Sort categories based on order
    categories.sort((a, b) => a.order - b.order);
    
    // Loop each category
    categories.forEach(category => {
      //Empty array for categories
      const categoryMenuItems: MenuItem[] = [];
        
        //Loop each menuitem and add it to its corresponding category
        menuItems.forEach(menuItem => {
            if (menuItem.categoryId === category.id) {
                categoryMenuItems.push(menuItem);
            }
        });
        
        //Add the category and menuitems to array
        if (categoryMenuItems.length > 0) {
            groupedMenuItems.push({
                category: category,
                menuItems: categoryMenuItems
            });
        }
    });
    //Return groupedMenuItems
    return groupedMenuItems;
}


ngAfterViewInit() {
  setTimeout(() => {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 1, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 4, spacing: 10 },
        },
      },
      slides: { perView: 1 },
     
    });
    if(this.slider){
      this.slider.on('slideChanged', (details) => {
        this.activeSlideIndex = details.track.details.rel;
      });
    }
  }, 500); // Delay initialization for 0.5 second (500 milliseconds)

}

//Navigates to slide based on index
navigateToSlide(index: number) {
  if (this.slider) {
    this.slider.moveToIdx(index);
  }
}

ngOnDestroy() {
  if (this.slider) this.slider.destroy()
}


}
