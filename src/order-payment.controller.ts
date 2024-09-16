import { Request, Response } from 'express'


export class OrderPaymentController {


    constructor () {
        this.payOrder = this.payOrder.bind(this)
    }

    async payOrder (req: Request, res: Response) {
        res.json('teste inicial orders-payment')
    }

}