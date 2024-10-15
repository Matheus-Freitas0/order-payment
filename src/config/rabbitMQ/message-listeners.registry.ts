import { RabbitMQConnection } from './rabbitmq-connection'
import orderPaymentListener from '../../listener/order-payment-listener'

export class MessageListenersRegistry {

    register(): void {
        const rabbitConnection = new RabbitMQConnection()
        rabbitConnection.connect().then(() => {
            orderPaymentListener(rabbitConnection)
        })
    }

}