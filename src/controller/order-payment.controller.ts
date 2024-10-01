import { Request, Response } from 'express'
import Payment from '../models/payment.model'
import { PaymentService } from '../service/payment.service'

export class OrderPaymentController {

    private paymentService: PaymentService

    constructor () {
        this.payOrder = this.payOrder.bind(this)
        this.paymentService = new PaymentService()
    }

    async payOrder (req: Request, res: Response) {
        
        const payment = await this.paymentService.getPaymentByOrderCode('abcd-4455')

        res.status(201).json(payment)
    }

}
