export class ErrorHandler extends Error {
	constructor(
		readonly statusCode: number,
		message: string,
	) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
		this.name = 'ErrorHandler'
		Error.captureStackTrace(this)
		this.statusCode = statusCode
		this.message = message
		this.stack = Error().stack
	}
}
