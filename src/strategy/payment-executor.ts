import { PaymentDTO } from '../DTO/payment.dto'

export abstract class PaymentExecutor {
    abstract execute(paymentInstrument: PaymentDTO): Promise<void>;

    
}