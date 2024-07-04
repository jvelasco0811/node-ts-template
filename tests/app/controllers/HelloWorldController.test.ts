import { Request, Response } from 'express'
import { HelloWorldController } from '../../../src/app/controllers/HelloWorldController'

// Test suite for the HelloWorldController
describe('Given Testing HelloWorldController', () => {
	let req: Partial<Request>
	let res: Partial<Response>

	beforeEach(() => {
		req = {}
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		}
	})

	describe('When a GET request is made', () => {
		it('should return 200 with "Hello World!"', () => {
			HelloWorldController(req as Request, res as Response)

			expect(res.status).toHaveBeenCalledWith(200)
			expect(res.json).toHaveBeenCalledWith({ message: 'Hello World!' })
		})
	})
})

// Test suite for handling errors in the HelloWorldController
describe('Given Testing HelloWorldController for errors', () => {
	let req: Partial<Request>
	let res: Partial<Response>

	beforeEach(() => {
		req = {}
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		}
	})

	describe('When an error is thrown', () => {
		it('should return 500 with error message when an error is thrown', () => {
			const error = new Error('Test error')
			;(res.status as jest.Mock).mockImplementationOnce(() => {
				throw error
			})

			HelloWorldController(req as Request, res as Response)

			expect(res.status).toHaveBeenCalledWith(500)
			expect(res.json).toHaveBeenCalledWith({ error: 'Test error' })
		})

		it('should return 500 with default error message when an unknown error is thrown', () => {
			const error = 'Unknown error'
			;(res.status as jest.Mock).mockImplementationOnce(() => {
				throw error
			})

			HelloWorldController(req as Request, res as Response)

			expect(res.status).toHaveBeenCalledWith(500)
			expect(res.json).toHaveBeenCalledWith({
				error: 'Unexpected error occurred',
				details: error,
			})
		})
	})
})
