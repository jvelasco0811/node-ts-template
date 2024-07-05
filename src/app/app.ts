import express, { Express } from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from '../app/middlewares/RateLimiter'
import unknownEndpoint from './middlewares/unknownEndpoint'
import requestLogger from './middlewares/requestLogger'
import errorHandler from './middlewares/errorHandler'
const app: Express = express()

app.use(rateLimiter)
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use(cors())

app.use(requestLogger)
app.use(express.json())

app.use('/api/v1/hello', helloWorld)
app.use(unknownEndpoint)

app.use(errorHandler)

export default app
