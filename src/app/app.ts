import express, { Express } from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from '../app/middlewares/RateLimiter'

const app: Express = express()

app.use(rateLimiter)

app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use(cors())

app.use(express.json())

app.use('/api/v1/hello', helloWorld)

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error)
})

export default app
