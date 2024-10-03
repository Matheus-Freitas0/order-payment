import { Request, Response } from 'express'
import Payment from '../models/payment.model'
import { PaymentService } from '../service/payment.service'

export class OrderPaymentController {

    private paymentService: PaymentService

    constructor () {
        this.getOrder = this.getOrder.bind(this)
        this.paymentService = new PaymentService()
    }

    async getOrder(req: Request, res: Response) {
        const orderCode = req.params.orderCode
        const payment = await this.paymentService.getPaymentByOrderCode(orderCode)
        res.status(200).json(payment)
    }

}
