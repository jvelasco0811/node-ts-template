import request from 'supertest'
import app from '../../src/app/app'
const api = request(app)

describe('Given a user want to hello', () => {
	describe('When the user sends a GET request to /api/v1/hello', () => {
		it('Then it returns hello message', async () => {
			// Given
			const expectedStatus = 200
			const expectedMessage = { message: 'Hello World!' }

			// When
			const response = await api.get('/api/v1/hello').expect(200)

			// Then
			expect(response.status).toBe(expectedStatus)
			expect(response.body).toEqual(expectedMessage)
		})

		describe('When the user sends a GET request to /api/v1/notfound', () => {
			it('Then it returns 404 not found', async () => {
				// Given
				const expectedStatus = 404

				// When
				const response = await api.get('/api/v1/notfound').expect(404)

				// Then
				expect(response.status).toBe(expectedStatus)
			})
		})
	})
})

describe('Uncaught Exception Handler', () => {
	let originalProcessOn: NodeJS.Process['on']

	beforeAll(() => {
		originalProcessOn = process.on.bind(process)
	})

	afterAll(() => {
		process.on = originalProcessOn
	})

	it('should handle uncaught exceptions', (done) => {
		const mockError = new Error('Test Uncaught Exception')
		const mockConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		process.on = jest.fn((event: string, handler: (error: Error) => void) => {
			if (event === 'uncaughtException') {
				handler(mockError)
			}
			return process
		}) as unknown as NodeJS.Process['on']

		// Simulate an uncaught exception
		process.emit('uncaughtException', mockError)

		setImmediate(() => {
			try {
				expect(mockConsoleError).toHaveBeenCalledWith(
					'Uncaught Exception:',
					mockError,
				)
				done()
			} catch (error) {
				done(error)
			} finally {
				mockConsoleError.mockRestore()
			}
		})
	})
})
