import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'

class RateLimiter {
	private limiter: RateLimitRequestHandler

	constructor() {
		this.limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
			message: 'Too many requests, please try again later.',
		})
	}

	public rateLimitMiddleware = (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		this.limiter(req, res, next)
	}
}

const limiter = new RateLimiter().rateLimitMiddleware

export default limiter
