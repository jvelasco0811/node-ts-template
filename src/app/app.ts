import express, { Express, Request, Response, NextFunction } from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from '../app/middlewares/RateLimiter'
import { logger } from './utils/logger'

const app: Express = express()

app.use(rateLimiter)

app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))

app.use(cors())

app.use(express.json())

app.use('/api/v1/hello', helloWorld)

app.use((req: Request, res: Response) => {
	logger.info(`${req.url} - url not found`)
	res.status(404).send({ error: 'oops not found' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err)
	res.status(500).send({
		type: 'internal_server_error',
		message: 'Something went wrong! Please try again later.',
	})
	next()
})

process.on('uncaughtException', (error: Error) => {
	logger.error(
		`Caught exception: ${error.name} - ${error.message}`,
		`Exception origin: ${error.stack}`,
	)
})

process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
	logger.error('Unhandled Rejection at:', p, 'reason:', reason)
})

export default app
