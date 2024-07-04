import request from 'supertest'
import app from '../src/app/app'
const api = request(app)

describe('Given a user want to hello', () => {
	describe('When the user send a GET request to /api/v1/hello', () => {
		it('Then it return hello message', async () => {
			// Given
			const expectedStatus = 200
			const expectedMessage = { message: 'Hello World!' }

			// When
			const request = await api.get('/api/v1/hello').expect(200)

			// Then
			expect(request.status).toBe(expectedStatus)
			expect(request.body).toEqual(expectedMessage)
		})
	})
})
