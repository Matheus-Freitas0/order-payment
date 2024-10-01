import { Request, Response } from 'express'
import Payment from '../models/payment.model'

export class OrderPaymentController {


    constructor () {
        this.payOrder = this.payOrder.bind(this)
    }

    async payOrder (req: Request, res: Response) {
        
        const payment = new Payment({
            amount: 10,
            cardNumber: "5228464330663579",
            transactionNumber: "123456",
            partnerId: "77777",
            paymentMethod: "PIX",
            clientDocument: '30040466677',
            orderCode: 'abcd-4455'
        })

        await payment.save()
        res.status(201).json({message: 'order has been payed'})
    }

}
