import express, { Request, Response, NextFunction } from 'express'
import request from 'supertest'
import errorHandler from '../../../src/app/middlewares/errorHandler'
import { logger } from '../../../src/Context/Shared/utils/logger'

jest.mock('../../../src/Context/Shared/utils/logger')

describe('errorHandler Middleware', () => {
	let app: express.Express

	beforeAll(() => {
		app = express()

		app.get('/error', (req: Request, res: Response, next: NextFunction) => {
			const error = new Error('Test Error')
			next(error)
		})

		app.use(errorHandler)
	})

	it('should log the error and return 500 status code with appropriate message', async () => {
		const response = await request(app).get('/error')

		expect(logger.error).toHaveBeenCalledWith(
			'Internal_server_error: Error - message: Test Error',
			expect.any(String),
		)
		expect(response.status).toBe(500)
		expect(response.body).toEqual({
			type: 'internal_server_error',
			message: 'Something went wrong! Please try again later.',
		})
	})
})
