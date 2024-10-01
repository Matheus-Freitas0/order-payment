import { PaymentDTO } from '../../DTO/payment.dto'
import { PaymentExecutor } from '../payment-executor'

export class PayCash extends PaymentExecutor {
    async execute(paymentInstrument: PaymentDTO): Promise<void> {
        console.log('Executando pagamento via dinheiro');
    }
}