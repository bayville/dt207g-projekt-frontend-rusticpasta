import { Category } from "./category";
import { MenuItem } from "./menu-item";

export interface GroupedMenuItems {
    category: Category;
    menuItems: MenuItem[];
}
