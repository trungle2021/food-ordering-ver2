export default interface BaseDish {
    _id: string;
    is_active: boolean;
    discount: number;
    created_at: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
