import { mongooseConnect } from './config/mongo.config'
import { ExpressServerConfig } from './config/express-server.config'
import { MessageListenersRegistry } from './config/rabbitMQ/message-listeners.registry'

mongooseConnect()

new MessageListenersRegistry()
    .register()

new ExpressServerConfig()
    .basicConfig()
    .routesRegistry()
    .startServer()