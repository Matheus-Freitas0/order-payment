export type PaymentDTO = {
    amount: number
    cardNumber: string
    partnerId: string
    paymentMethod: 'CREDIT' | 'DEBIT' | 'CASH' | 'PIX'
    clientDocument: string
    orderCode: string
}