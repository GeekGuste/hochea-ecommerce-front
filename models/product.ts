import { Category } from "./category";

export interface VariantType{
    id: number;
    label: string;
}
export interface Image{
    id: number;
    photo: string;
}
export interface Product{
    id: number;
    label: string;
    category: Category
    qte_stock: number;
    principal_image: string;
    promo_price: number;
    price: string;
    description: string;
    variant_value: string;
    variant_type: VariantType|null;
    variants: Product[];
    images: Image[];
    is_variant: boolean;
    is_active: boolean;
}