export default interface TopUpProps {
    userId: string,
    amount: number,
    source: string,
    paymentMethodId: string,
    paymentMethod: string,
}