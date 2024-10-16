import { PaymentRepository } from "../repository/payment.repository"
import { sleep, generateUUIDSimple } from "../utils/utils"
import {PaymentDTO} from "../DTO/payment.dto"
import { PaymentExecutor } from '../strategy/payment-executor'
import { PayPix } from '../strategy/methods/pay-pix'
import { PayDebit } from '../strategy/methods/pay-debit'
import { PayCash } from '../strategy/methods/pay-cash'
import { PayCredit } from '../strategy/methods/pay-credit'
import axios from 'axios'

export class PaymentService{

    private paymentRepository: PaymentRepository

    constructor(){
        this.paymentRepository = new PaymentRepository()
    }

    async pay(paymentInstrument: PaymentDTO): Promise<any> {
        await sleep(5000)
        let paymentExecutor: PaymentExecutor

        switch (paymentInstrument.paymentMethod) {
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
                throw new Error(`Invalid payment method or not implemented yet. method =${paymentInstrument.paymentMethod}`)
        }

        try {
            await paymentExecutor.execute(paymentInstrument)
            return await this.paymentRepository.create(paymentInstrument, 'SUCCESS', 'success')
        
        } catch (error: any) {
            await this.paymentRepository.create(paymentInstrument, 'FAILED', error.message)
        }
       
    }

    async getPaymentByOrderCode(orderCode: string): Promise<any>{
        const payment = await this.paymentRepository.getByOrderCode(orderCode)
        
        const { _id, __v, ...sanitizedPayment } = payment.toObject()
        return sanitizedPayment
    }

    async partnerWebhookExecution(payment: any): Promise<void> {
        
        console.log('chamando o webhook');
        
        const url = this.getPartnerWebhookHOST(payment.partnerId) + '/payment-status'

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': this.generatePartnerWebhookToken(payment.partnerId)
        }
         
        try {
            const response = await axios.post(url, payment, { headers })

            if (response.status >= 200 && response.status < 300) {
                console.log('Webhook executed successfully')

                // atualizar algum documento informando que o webhook recebeu o pagamanto

            } else {
                console.log('Erro ao executar o webhook')

                // vai acontecer quando o endpoint existir, mas ocorrer um erro interno (500)
                // deve atualizar algum documento informando que o webhook nao devolveu sucesso
                // incrementa o numero das tentativas

            }
            
        } catch (error: any) {
            console.log(error.message);       
            
            // vai acontecer quando o endpoint do parceiro nao existir ou estiver down
            // deve atualizar algum documento informando que o webhook nao devolveu sucesso
            // incrementa o numero das tentativas

        }
    }

    private getPartnerWebhookHOST(partnerId: string): string {
        return 'http://localhost:3000'
    }

    private generatePartnerWebhookToken(partnerId: string): string {
        return generateUUIDSimple()
    }
}