import { PaymentRepository } from "../repository/payment.repository"
import { sleep } from "../utils/utils"
import {PaymentDTO} from "../DTO/payment.dto"

export class PaymentService{

    private paymentRepository: PaymentRepository

    constructor(){
        this.paymentRepository = new PaymentRepository()
    }

    async executePaymentTransaction(paymentInstrument: PaymentDTO): Promise<void>{
        await sleep(5000)
        
    }

    async getPaymentByOrderCode(orderCode: string): Promise<any>{
        const payment = await this.paymentRepository.getPaymentByOrderCode(orderCode)
        
        // todo - sanitize object

        return payment
    }
}