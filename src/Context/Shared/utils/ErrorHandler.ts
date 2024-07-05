export class CustomError extends Error {
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
