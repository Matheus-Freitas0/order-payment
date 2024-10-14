import { RabbitMQConnection } from './rabbitmq-connection'
import orderPaymentListener from '../../listener/order-payment-listener'
import testMessageListener from '../../listener/test-listener'

export class MessageListenersRegistry {

    register(): void {
        const rabbitConnection = new RabbitMQConnection()
        rabbitConnection.connect().then(() => {
            orderPaymentListener(rabbitConnection)
            testMessageListener(rabbitConnection)
        })
    }

}