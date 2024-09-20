import { mongooseConnect } from './config/mongo.config'
import { ExpressServerConfig } from './config/express-server.config'

mongooseConnect()
const expressServer = new ExpressServerConfig()

expressServer
    .basicConfig()
    .routesRegistry()
    .startServer()