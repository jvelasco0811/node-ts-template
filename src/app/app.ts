import express, { Express, Request, Response, NextFunction } from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'
import helmet from 'helmet'
import rateLimiter from '../app/middlewares/RateLimiter'
import { logger } from '../Context/Shared/utils/logger'
import unknownEndpoint from './middlewares/unknownEndpoint'
import requestLogger from './middlewares/requestLogger'
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

app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
	logger.error(
		`Internal_server_error: ${error.name} - message: ${error.message}`,
		`Stack: ${error.stack}`,
	)
	res.status(500).send({
		type: 'internal_server_error',
		message: 'Something went wrong! Please try again later.',
	})
	next()
})

export default app
