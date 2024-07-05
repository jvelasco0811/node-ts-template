class CustomError extends Error {
	constructor(
		readonly type: string,
		readonly message: string,
		readonly statusCode: number,
	) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
		Error.captureStackTrace(this)
	}
}
export class BadRequestError extends CustomError {
	constructor(message = 'Bad request') {
		super('bad_request', message, 400)
	}
}
class NotFoundError extends CustomError {
	constructor(message = 'Resource not found') {
		super('not_found', message, 404)
	}
}
export { NotFoundError }
