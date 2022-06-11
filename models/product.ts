import { Category } from "./category";
import { User } from "./user";

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
    categories: Category[];
    qte_stock: number;
    weight: number;
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
export interface CartItem{
    id: number;
    label: string;
    price: string;
    quantity: number;
    qte_stock: number;
    image: string;
    variant_value: string;
    variant_type: string;
}
export interface OrderProduct{
    id: number;
    product: Product;
    label: string;
    price: number;
    quantity: number;
    image_url: string;
}

export interface Order{
    id: number;
    order_date: Date;
    total: number;
    country: string;
    zone: string;
    last_name: string;
    first_name: string;
    email: string;
    address: string;
    phone_number: string;
    town: string;
    postal_code: string;
    creation_date: Date;
    payment_date: Date;
    delivery_charges: number;
    user: User;
    is_paid: boolean;
    is_delivered: boolean;
    orderProducts: OrderProduct[];
}