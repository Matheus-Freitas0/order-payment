import { ExpressServerConfig } from './express-server.config'


const expressServer = new ExpressServerConfig()
expressServer
.basicConfig()
.routesRegistry()
.startServer()

