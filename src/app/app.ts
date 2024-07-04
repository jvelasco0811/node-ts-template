import express, { Express } from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app: Express = express()
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: 'Too many requests',
})

app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use(limiter)

app.use(cors())

app.use(express.json())

app.use(cors())

app.use('/api/v1/hello', helloWorld)

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error)
})

export default app
