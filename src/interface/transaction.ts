export interface Transaction{
    user: string;
    amount: number;
    payment_method: string;
    payment_status: string;
    created_at: Date;
    updated_at: Date;
}