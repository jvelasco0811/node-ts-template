import express, { Request, Response } from 'express'
import request from 'supertest'
import requestLogger from '../../../src/app/middlewares/requestLogger'
import { logger } from '../../../src/Context/Shared/utils/logger'

jest.mock('../../../src/Context/Shared/utils/logger')

describe('requestLogger Middleware', () => {
	let app: express.Express

	beforeAll(() => {
		app = express()

		app.use(requestLogger)

		app.get('/test', (req: Request, res: Response) => {
			res.status(200).send('Test route')
		})

		app.get('/no-content-length', (req: Request, res: Response) => {
			res.removeHeader('Content-Length') // Ensure Content-Length is not set
			res.status(200).send('No Content-Length')
		})

		app.get('/empty-response', (req: Request, res: Response) => {
			res.status(200).end() // End the response without setting Content-Length
		})
	})

	it('should log the request method, URL, and response details', async () => {
		const response = await request(app).get('/test')

		expect(logger.info).toHaveBeenCalledWith(
			expect.stringContaining('GET /test'),
		)
		expect(response.status).toBe(200)
		expect(response.text).toBe('Test route')
	})

	it('should log a request without Content-Length header', async () => {
		const response = await request(app).get('/no-content-length')

		expect(logger.info).toHaveBeenCalledWith(
			expect.stringContaining('GET /no-content-length'),
		)
		expect(response.status).toBe(200)
		expect(response.text).toBe('No Content-Length')
	})

	it('should log a request with an empty response', async () => {
		const response = await request(app).get('/empty-response')

		expect(logger.info).toHaveBeenCalledWith(
			expect.stringContaining('GET /empty-response'),
		)
		expect(response.status).toBe(200)
	})
})
