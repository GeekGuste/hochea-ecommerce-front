export interface Category{
    id: number;
    label: string;
    image: string;
    is_active: boolean;
    parent: Category|null;
}

export interface CategoryTree{
    id: number;
    label: string;
    is_active: boolean;
    enfants: CategoryTree[];
}