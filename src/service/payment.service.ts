import { PaymentRepository } from "../repository/payment.repository"
import { sleep } from "../utils/utils"
import {PaymentDTO} from "../DTO/payment.dto"
import { PaymentExecutor } from '../strategy/payment-executor'
import { PayPix } from '../strategy/methods/pay-pix'
import { PayDebit } from '../strategy/methods/pay-debit'
import { PayCash } from '../strategy/methods/pay-cash'
import { PayCredit } from '../strategy/methods/pay-credit'

export class PaymentService{

    private paymentRepository: PaymentRepository

    constructor(){
        this.paymentRepository = new PaymentRepository()
    }

    async executePaymentTransaction(paymentInstrument: PaymentDTO): Promise<void>{
        await sleep(5000)
        let paymentExecutor: PaymentExecutor

        switch (paymentInstrument.method) {
            case "PIX":
                paymentExecutor = new PayPix()
                break;
            case "CREDIT":
                paymentExecutor = new PayCredit()
                break;
            case "DEBIT":
                paymentExecutor = new PayDebit()
                break;
            case "CASH":
                paymentExecutor = new PayCash()
                break;
            
            default:
                throw new Error(`Invalid payment method or not implemented yet. method =${paymentInstrument.method}`)
        }

        try {
            await paymentExecutor.execute(paymentInstrument)
            await this.paymentRepository.create(paymentInstrument, 'SUCCESS', 'success')
        } catch(error: any) {
            await this.paymentRepository.create(paymentInstrument, 'FAILED', error.message)
        }
       
    }

    async getPaymentByOrderCode(orderCode: string): Promise<any>{
        const payment = await this.paymentRepository.getPaymentByOrderCode(orderCode)
        const { _id, __v, ...sanitizedPayment } = payment.toObject()
        return sanitizedPayment;
    }
}