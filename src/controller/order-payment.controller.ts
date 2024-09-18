import { Request, Response } from 'express'


export class OrderPaymentController {


    constructor () {
        this.payOrder = this.payOrder.bind(this)
    }

    async payOrder (req: Request, res: Response) {
        res.json('teste inicial orders-payment')
    }

}

    // dados para serem retornado
    // nome do cliente
    // valor da compra
    // data da compra
    // documento 
    // 4 ultimos numeros do cartão 
    // data de validade do cartão
    // tipo de cartão
    // codigo do cartão
    // ID da transação
    // status da transação
    // Método de Pagamento
    // Nome da loja 
    // numero do pedido
    // descrição da compra
    // endereço de entrega
    // taxas
