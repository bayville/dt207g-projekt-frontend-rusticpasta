export interface MenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    published: boolean;
    category?: {
        name: string;
    };
}
